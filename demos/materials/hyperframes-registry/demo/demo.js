import '../vendor/@hyperframes/player@0.8.231/dist/hyperframes-player.global.js';

const base = new URL('../', import.meta.url);
const file = name => new URL(name, base).href;
const scrollbars = file('../../../site/runtime/demo-scrollbars.css');
const load = name => fetch(file('demo/' + name)).then(response => response.json());

export async function mountRegistry(root) {
  const [catalog, playable, labels] = await Promise.all([load('catalog-index.json'), load('local-items.json'), load('labels.json')]);
  root.innerHTML = `<div class="hf-layout">
    <aside class="hf-aside">
      <button type="button" class="hf-toggle" aria-expanded="false" aria-controls="hf-tree"></button>
      <div class="hf-brandline"><span class="hf-mark" role="img" aria-label="HeyGen HyperFrames"><img class="hf-day" src="${file('demo/brand-light.svg')}" alt=""><img class="hf-night" src="${file('demo/brand-dark.svg')}" alt=""></span><a href="https://hyperframes.heygen.com/catalog" target="_blank" rel="noopener">官网</a></div>
      <div class="hf-range"><span>精选 55</span><span>模板 8</span><span>全部 456</span><input type="range" min="0" max="2" step="1" aria-label="浏览范围"></div>
      <input hidden class="hf-search" type="search" aria-label="搜索目录" placeholder="搜索名称或分类">
      <nav class="hf-tree" id="hf-tree" aria-label="作品目录"></nav>
    </aside>
    <div class="hf-main"><div class="hf-stage"></div><section class="hf-info" aria-live="polite"></section></div></div>`;
  const aside = root.querySelector('.hf-aside');
  const toggle = root.querySelector('.hf-toggle');
  const range = root.querySelector('.hf-range');
  const slider = range.querySelector('input');
  const tree = root.querySelector('.hf-tree');
  const filter = root.querySelector('.hf-search');
  const stage = root.querySelector('.hf-stage');
  const info = root.querySelector('.hf-info');
  const standalone = location.pathname.startsWith(base.pathname);
  const initial = standalone && catalog.find(item => item.name === new URL(location.href).searchParams.get('demo'));
  slider.value = initial?.kind === 'template' ? 1 : initial && !initial.local ? 2 : 0;
  let selection;

  function updateToggle() {
    const open = aside.classList.contains('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.textContent = open ? '收起作品目录' : '作品目录 · ' + (labels.items[selection] || selection || '全部条目');
  }
  function renderDirectory() {
    const scope = Number(slider.value);
    const tabs = [...range.querySelectorAll('span')];
    range.style.setProperty('--scope',String(scope));
    tabs.forEach((tab,i) => tab.classList.toggle('active',i === scope));
    slider.setAttribute('aria-valuetext',tabs[scope].textContent);
    filter.hidden = scope === 1;
    const query = scope === 1 ? '' : filter.value.trim().toLowerCase();
    const groups = new Map();
    tree.replaceChildren();
    for (const item of catalog) {
      if (scope === 0 && (!item.local || item.kind === 'template')) continue;
      if (scope === 1 && item.kind !== 'template') continue;
      const category = labels.categories[item.category] || item.category;
      const title = labels.items[item.name] || item.name;
      if (query && !(title + ' ' + category + ' ' + item.name).toLowerCase().includes(query)) continue;
      if (!groups.has(category)) {
        const group = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = category;
        group.append(summary);
        group.open = !!query;
        tree.append(group);
        groups.set(category,group);
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.name = item.name;
      button.textContent = title + (item.local ? '' : '（官网）');
      button.setAttribute('aria-current',String(item.name === selection));
      groups.get(category).append(button);
    }
    const current = [...tree.querySelectorAll('button')].find(button => button.dataset.name === selection) || tree.querySelector('button');
    if (current) current.parentElement.open = true;
    else {
      const empty = document.createElement('p');
      empty.className = 'hf-empty';
      empty.textContent = '没有匹配的条目';
      tree.append(empty);
    }
  }
  async function show(name) {
    selection = name;
    for (const button of tree.querySelectorAll('button')) button.setAttribute('aria-current',String(button.dataset.name === name));
    updateToggle();
    stage.querySelector('hyperframes-player')?.pause();
    stage.replaceChildren();
    const item = catalog.find(item => item.name === name);
    const spec = playable[name];
    stage.hidden = !spec;
    if (spec) root.style.setProperty('--hf-ratio',String(spec.width/spec.height));
    info.replaceChildren();
    if (standalone) {
      const url = new URL(location.href);
      url.searchParams.set('demo', name);
      history.replaceState(null, '', url);
    }
    const meta = document.createElement('p');
    meta.className = 'hf-meta';
    meta.textContent = [labels.categories[item.category] || item.category, item.kind === 'template' ? '项目模板' : item.kind === 'block' ? '独立场景' : '场景组件', name, ...(spec ? [spec.duration + ' 秒', spec.width + ' × ' + spec.height] : [])].join(' · ');
    const actions = document.createElement('div');
    actions.className = 'hf-actions';
    if (item.local) {
      const command = item.kind === 'template' ? 'npx hyperframes init <项目> --example ' + name : 'npx hyperframes add ' + name;
      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'hf-command';
      const code = document.createElement('code');
      const state = document.createElement('span');
      code.textContent = command;
      state.textContent = '复制命令';
      copy.append(code,state);
      copy.onclick = async () => {
        if (window.Site) return window.Site.copy(command, '命令已复制');
        try { await navigator.clipboard.writeText(command); state.textContent = '已复制'; } catch { state.textContent = '复制失败'; }
      };
      actions.append(copy);
    }
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = item.kind === 'template' ? '查看模板源码' : '查看官网示例';
    actions.append(link);
    info.append(meta,actions);
    if (!spec) return;
    const src = file(spec.src);
    const html = await fetch(src).then(response => response.text());
    if (selection !== name || !root.isConnected) return;
    const player = document.createElement('hyperframes-player');
    player.setAttribute('controls','');
    player.setAttribute('muted','');
    player.setAttribute('width',spec.width);
    player.setAttribute('height',spec.height);
    player.setAttribute('runtime-src',file('vendor/@hyperframes/core@0.8.231/dist/hyperframe.runtime.iife.js'));
    player.setAttribute('srcdoc',html.replace(/<head\b[^>]*>/i, tag => tag + '<base href="' + src + '"><link rel="stylesheet" href="' + scrollbars + '">'));
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) player.addEventListener('ready',() => player.play(),{once:true});
    stage.replaceChildren(player);
  }
  toggle.onclick = () => { aside.classList.toggle('open'); updateToggle(); };
  tree.onclick = event => {
    const button = event.target.closest('button[data-name]');
    if (!button) return;
    const wasOpen = aside.classList.contains('open');
    aside.classList.remove('open');
    show(button.dataset.name);
    if (wasOpen) toggle.focus({preventScroll:true});
  };
  slider.oninput = renderDirectory;
  filter.oninput = renderDirectory;
  selection = initial?.name || 'product-turntable';
  renderDirectory();
  show(selection);
  root.classList.remove('hf-pending');
  root.inert = false;
}
