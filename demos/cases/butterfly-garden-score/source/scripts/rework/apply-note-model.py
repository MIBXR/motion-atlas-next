from pathlib import Path
import json, sys

case = Path(sys.argv[2]) / 'demos/cases/butterfly-garden-score'
data = case / 'source/analysis/rework'
read = lambda path: json.loads(path.read_text(encoding='utf8'))
score = read(data / 'note-input/notes.json')
annotations = read(data / 'note-input/annotations.json')
rows = read(data / 'note-input/rowStates.json')
shots = read(data / 'note-input/shots.json')
measured = read(data / 'note-model-measurements.json')
for entry in measured['noteChanges']:
    score['notes'][entry['note']].update(entry['fields'])
removed = set(measured['removedNotes'])
score['notes'] = [note for index, note in enumerate(score['notes']) if index not in removed]
score['notes'].extend(measured['addedNotes'])
score['rowColors'] = measured['rowColors']
for name, change in measured['annotationChanges'].items():
    if 'replace' in change:
        annotations[name] = change['replace']
    else:
        for entry in change['items']:
            target = annotations[name][entry['index']]
            target.update(entry['fields'])
            for key in entry['removedFields']:
                del target[key]
rows['rows'].update(measured['rowCurves'])
shots['cross'] = measured['cross']
for name, value in [('notes', score), ('annotations', annotations), ('rowStates', rows), ('shots', shots)]:
    (case / 'film/data' / f'{name}.json').write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':')), encoding='utf8')
