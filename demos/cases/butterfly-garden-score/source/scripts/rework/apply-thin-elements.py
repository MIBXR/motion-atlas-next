from pathlib import Path
import json

CASE = Path(__file__).resolve().parents[3]
DATA = CASE / 'film/data'
MODEL = json.loads((CASE / 'source/analysis/rework/thin-element-measurements.json').read_text(encoding='utf8'))
annotations = json.loads((DATA / 'annotations.json').read_text(encoding='utf8'))
for patch in MODEL['annotations']:
    element = annotations[patch['group']][patch['index']]
    element.update(patch['fields'])
    for field in patch['removed']:
        element.pop(field, None)
notes = json.loads((DATA / 'notes.json').read_text(encoding='utf8'))
def key(note):
    return [note['row'], note['x0'], note['x1'], note['yOffset']]
notes['notes'] = [note for note in notes['notes'] if key(note) not in MODEL['notes']['removed']]
for patch in MODEL['notes']['changes']:
    next(note for note in notes['notes'] if key(note) == patch['key']).update(patch['fields'])
rows = json.loads((DATA / 'rowStates.json').read_text(encoding='utf8'))
rows['rows'].update(MODEL['rows'])
for name, value in [('annotations', annotations), ('notes', notes), ('rowStates', rows)]:
    (DATA / f'{name}.json').write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':')), encoding='utf8')
