from pathlib import Path
from collections import defaultdict
import copy
import json
import re
import struct

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'source' / 'analysis'
def load(name):
    return json.loads((SOURCE / name).read_text(encoding='utf-8'))

edits = load('edits.json')['segments']
score_data = load('scores.json')
instances = load('motif-instances.json')['instances']
candidate_data = load('no-score-tracks.json')
tempos = {int(t['track']): t for t in load('tempo.json')['tracks']}
video_titles = {2: '星のおどり場', 4: 'halation', 5: 'pied à pied - 一歩ずつ', 7: '少女たちのプレリュード', 9: 'starhood', 10: 'dot to dot', 11: '歯車', 13: 'anti daydream', 19: '暗転', 20: 'カタストロフ', 21: 'Elle est belle - 美しい人', 24: '夢を振りまいて', 26: 'ランチボックス', 30: 'ロンド・ロンド・ロンド', 31: '星摘みの塔', 34: 'dawn of the star'}
roots = {'C': 0, 'Db': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5, 'Gb': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11}
letters = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
degree_by_pc = {0: 1, 2: 2, 4: 3, 5: 4, 7: 5, 9: 6, 11: 7}
def midi(pitch):
    letter, accidental, octave = re.fullmatch(r'([A-G])([#b]?)(-?\d+)', pitch).groups()
    return (int(octave) + 1) * 12 + letters[letter] + {'': 0, '#': 1, 'b': -1}[accidental]

def pitch_name(value):
    names = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    return names[value % 12] + str(value // 12 - 1)

def score_signature(score):
    return (tuple(n['duration'] for n in score['notes']), tuple((r['afterNote'], r['duration']) for r in score['rests']), score['timeSignature'])

cell_by_signature = {}
cell_sources = defaultdict(list)
for score in score_data['scores']:
    signature = score_signature(score)
    if signature not in cell_by_signature:
        cell_by_signature[signature] = f'R{len(cell_by_signature) + 1:02d}'
    cell_sources[cell_by_signature[signature]].append(score)

tracks = []
for no, title in video_titles.items():
    rows = [e for e in edits if int(e['track']) == no]
    filename = rows[0]['trackFile']
    ost_no = int(filename[:2])
    ost_title = filename[4:-4]
    tempo = tempos[no]
    track = {'no': no, 'title': title, 'videoNo': no, 'videoTitle': title, 'ostNo': ost_no, 'ostTitle': ost_title, 'ostFile': filename, 'ostDuration': tempo['ostDuration'], 'tempo': tempo['tempoBpm'], 'tempoConfidence': tempo['confidence'], 'meter': tempo['meter'], 'clips': [], 'scores': [], 'candidates': []}
    for i, row in enumerate(rows, 1):
        track['clips'].append({'file': f'demo/audio/{no:02d}-{i}.mp3', **{k: row[k] for k in ['trackT0', 'trackT1', 'videoT0', 'videoT1']}})
    for original in score_data['scores']:
        if original['track'] is None or int(original['track']) != no:
            continue
        score = copy.deepcopy(original)
        score.pop('sourceFrame', None)
        score['crop'] = f'source/score-crops/{score["id"]}.png'
        score['cellId'] = cell_by_signature[score_signature(score)]
        matched = [i for i in instances if i['scoreId'] == score['id']]
        representative = next((i for i in matched if i['evidence'] == 'score-and-audio'), matched[0])
        for k in ['degrees', 'intervals', 'key', 'evidence']:
            score[k] = representative[k]
        if 'keyByNote' in representative:
            score['keyByNote'] = representative['keyByNote']
        score['windows'] = []
        for clip in track['clips']:
            start = max(score['firstVisibleVideoT'], clip['videoT0'])
            end = min(score['lastVisibleVideoT'] + 1 / 24, clip['videoT1'])
            if end > start:
                offset = clip['trackT0'] - clip['videoT0']
                score['windows'].append({'file': clip['file'], 'trackT0': round(start + offset, 6), 'trackT1': round(end + offset, 6), 'videoT0': start, 'videoT1': end})
        score['occurrences'] = [{k: i[k] for k in ['instanceId', 'trackT0', 'trackT1', 'evidence']} for i in matched]
        track['scores'].append(score)
    track['candidates'] = next((t['candidates'] for t in candidate_data['tracks'] if int(t['track']) == no), [])
    tracks.append(track)

cells = []
for cid, sources in cell_sources.items():
    score = sources[0]
    instance = next((i for i in instances if i['scoreId'] == score['id']), None)
    keys = instance.get('keyByNote') if instance else None
    root = roots[instance['key'].split()[0]] if instance and isinstance(instance['key'], str) else 0
    notes = []
    for i, source in enumerate(score['notes']):
        source_root = roots[keys[i].split()[0]] if keys else root
        note = copy.deepcopy(source)
        value = midi(source['pitch']) - source_root
        note.update(pitch=pitch_name(value), writtenPitch=pitch_name(value), midi=value, degree=degree_by_pc[value % 12], accidentalShown=None)
        notes.append(note)
        for rest in score['rests']:
            if rest['afterNote'] == i:
                notes.append({'pitch': None, 'writtenPitch': None, 'midi': None, 'degree': None, 'duration': rest['duration'], 'rest': True, 'tuplet': None, 'tie': {'fromPrevious': False, 'toNext': False}, 'accidentalShown': None})
    cells.append({'id': cid, 'key': 'C major', 'clef': score['clef'], 'meter': score['timeSignature'], 'notes': notes, 'pitches': [n['pitch'] for n in notes], 'durations': [n['duration'] for n in notes], 'barlines': score['barlines'], 'repeatSigns': score['repeatSigns'], 'sourceTracks': sorted({int(s['track']) for s in sources if s['track'] is not None}), 'sourceScoreIds': [s['id'] for s in sources], 'midi': f'demo/midi/{cid}.mid'})

def vlq(value):
    parts = [value & 127]
    while value >> 7:
        value >>= 7
        parts.insert(0, (value & 127) | 128)
    return bytes(parts)

def write_midi(cell):
    ppq = 480
    events = [(0, 0, b'\xff\x51\x03' + round(60_000_000 / 92).to_bytes(3, 'big')), (0, 0, b'\xff\x59\x02\x00\x00'), (0, 0, b'\xc0\x00')]
    if cell['meter']:
        num, den = map(int, cell['meter'].split('/'))
        events.append((0, 0, bytes([255, 88, 4, num, den.bit_length() - 1, 24, 8])))
    tick = 0
    for note in cell['notes']:
        duration = round(note['duration'] * ppq)
        if not note.get('rest'):
            pitch = note['midi']
            if not note['tie']['fromPrevious']:
                events.append((tick, 2, bytes([144, pitch, 88])))
            if not note['tie']['toNext']:
                events.append((tick + duration, 1, bytes([128, pitch, 0])))
        tick += duration
    events.append((tick, 3, b'\xff\x2f\x00'))
    body = bytearray()
    previous = 0
    for when, order, data in sorted(events, key=lambda e: (e[0], e[1])):
        body += vlq(when - previous) + data
        previous = when
    target = ROOT / 'demo' / 'midi' / (cell['id'] + '.mid')
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(b'MThd' + struct.pack('>IHHH', 6, 0, 1, ppq) + b'MTrk' + struct.pack('>I', len(body)) + body)

for cell in cells:
    write_midi(cell)
intro_scores = [s for s in score_data['scores'] if s['track'] is None]
result = {'tracks': tracks, 'cells': cells, 'intro': {'scores': intro_scores, 'threshold': candidate_data['threshold'], 'evidenceLabels': {'score-and-audio': '谱面＋音频', 'score-only': '谱面', 'audio-analysis': '音频候选'}}}
target = ROOT / 'demo' / 'data' / 'motif.json'
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
print(f'生成 {len(tracks)} 首曲目、{len(cells)} 种节奏型与 MIDI')
