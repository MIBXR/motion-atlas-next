from pathlib import Path
import argparse
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]
ANALYSIS = ROOT / 'source' / 'analysis'
edits = json.loads((ANALYSIS / 'edits.json').read_text(encoding='utf-8'))['segments']
required = sorted({e['trackFile'] for e in edits})
parser = argparse.ArgumentParser(description='需要的 OST 文件：\n' + '\n'.join(required), formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument('ost', type=Path, help='包含上述原始 MP3 的目录')
args = parser.parse_args()
tempo = json.loads((ANALYSIS / 'tempo.json').read_text(encoding='utf-8'))
durations = {}
for name in required:
    path = args.ost / name
    if not path.is_file():
        raise FileNotFoundError(path)
    durations[name] = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', str(path)], text=True))
for track in tempo['tracks']:
    track['ostDuration'] = durations[track['trackFile']]
(ANALYSIS / 'tempo.json').write_text(json.dumps(tempo, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
counts = {}
out = ROOT / 'demo' / 'audio'
out.mkdir(parents=True, exist_ok=True)
for edit in edits:
    no = edit['track']
    counts[no] = counts.get(no, 0) + 1
    target = out / f'{no}-{counts[no]}.mp3'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(edit['trackT0']), '-i', str(args.ost / edit['trackFile']), '-t', str(edit['trackT1'] - edit['trackT0']), '-map', '0:a:0', '-c', 'copy', str(target)], check=True)
    print(target.name)
