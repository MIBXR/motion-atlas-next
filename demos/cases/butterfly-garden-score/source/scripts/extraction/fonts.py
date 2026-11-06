from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor
import json
OUT=Path(__file__).parent/'fonts-candidates'
def get(url):
    return urlopen(Request(url,headers={'User-Agent':'local-frame-analysis'}),timeout=90).read()
commit=json.loads(get('https://api.github.com/repos/google/fonts/commits/main'))['sha']
families=['notoserifsc','notoserifjp','shipporimincho','cormorantgaramond','cormorantinfant','playfairdisplay','ebgaramond','bodonimoda','notosanssc']
records=[]
def download(family):
    entries=json.loads(get(f'https://api.github.com/repos/google/fonts/contents/ofl/{family}?ref={commit}'))
    out=OUT/family;out.mkdir(exist_ok=True)
    for e in entries:
        if e['name'].endswith(('.ttf','.otf')) or e['name']=='OFL.txt':
            url=f'https://raw.githubusercontent.com/google/fonts/{commit}/ofl/{family}/'+quote(e['name'])
            (out/e['name']).write_bytes(get(url))
            records.append(dict(family=family,file=f'{family}/{e["name"]}',source=url,commit=commit))
    print(family,flush=True)
with ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(download,families))
(OUT/'sources.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf8')
print(commit,flush=True)
