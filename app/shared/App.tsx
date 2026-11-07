import { useEffect, useRef, useState } from 'react';
import { ArrowDownUp, ArrowLeft, ArrowRight, BookOpen, Bookmark, Check, ChevronDown, ChevronLeft, ChevronRight, Columns3, Download, FlaskConical, Grid2X2, Layers3, Menu, Monitor, Moon, Search, SlidersHorizontal, Sparkles, Sun, Upload, Workflow, X } from 'lucide-react';
import { Button } from '../arc/registry/components/button/button';
import { SearchField } from '../arc/registry/components/search-field/search-field';
import { Select } from '../arc/registry/components/select/select';
import SegmentedControl from '../arc/registry/components/segmented-control/segmented-control';
import { assetUrl, catalog, displayName, documents, downloadJSON, entries, entryHref, filterFields, findEntry, href, isMotion, kindNames, kinds, libraryName, navigate, valuesFor } from './data';
import type { Entry, Kind } from './data';
import { useLibraryState, useRoute, useWorkbench, Workbench } from './state';
import Details, { BreakdownValue, fieldName } from './Details';
import Documents from './Documents';

const nav = [
  { path: '/', name: '总览', icon: Grid2X2 },
  { path: '/cases', name: '案例', icon: Layers3 },
  { path: '/patterns', name: '巧思', icon: Sparkles },
  { path: '/materials', name: '素材', icon: SlidersHorizontal },
  { path: '/docs', name: '文档', icon: BookOpen },
  { path: '/favorites', name: '收藏', icon: Bookmark },
  { path: '/compare', name: '案例比较', icon: Columns3 }
];

export default function App() {
  const state = useLibraryState();
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const page = route.parts[0] || '';
  const entry = route.parts[1] && findEntry(page, route.parts[1]);
  const active = nav.find(item => item.path === '/' + page);
  useEffect(() => { setMenuOpen(false); document.title = `${entry ? entry.title : active?.name || libraryName} — ${libraryName}`; }, [route.path]);
  return <Workbench.Provider value={state}>
    <div className="workbench">
      {menuOpen && <button className="menu-backdrop" aria-label="关闭导航" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="主导航">
        <a className="brand" href="#/" aria-label={`${libraryName} 总览`}>
          <span className="brand-mark"><Layers3 size={24} strokeWidth={1.5} /></span>
          <span><strong>{libraryName}</strong><small>{isMotion ? '动态设计参考库' : '网页设计参考库'}</small></span>
        </a>
        <nav className="primary-nav">
          {nav.map(({ path, name, icon: Icon }) => {
            const count = kinds.includes(path.slice(1) as Kind) ? catalog[path.slice(1) as Kind].length : path === '/favorites' ? kinds.reduce((sum, kind) => sum + state.favorites[kind].length, 0) : null;
            return <a key={path} href={'#' + path} aria-current={(path === '/' ? !page : '/' + page === path) ? 'page' : undefined}><Icon size={18} strokeWidth={1.65} /><span>{name}</span>{count != null && <span className="nav-count">{count}</span>}</a>;
          })}
        </nav>
        <div className="nav-divider" />
        <span className="nav-caption">创作工具</span>
        <nav className="primary-nav secondary-nav">
          <a href="#/lab" aria-current={page === 'lab' ? 'page' : undefined}><FlaskConical size={18} /><span>{isMotion ? '节奏实验室' : '设计实验室'}</span><small>预留</small></a>
          <a href="#/workflow" aria-current={page === 'workflow' ? 'page' : undefined}><Workflow size={18} /><span>Agent 工作流</span><small>预留</small></a>
        </nav>
        <div className="sidebar-bottom">
          <p>{entries.length} 个参考条目<br /><span>{documents.length} 份文档可供阅读</span></p>
          <div className="theme-controls" role="group" aria-label="主题">
            {[{ value: 'light', name: '浅色', icon: Sun }, { value: 'dark', name: '深色', icon: Moon }, { value: 'system', name: '系统', icon: Monitor }].map(({ value, name, icon: Icon }) => <button key={value} className={state.theme === value ? 'selected' : ''} aria-pressed={state.theme === value} onClick={() => state.setTheme(value)}><Icon size={15} /><span>{name}</span></button>)}
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="展开导航" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
          <div className="topbar-location"><span>{libraryName}</span><ChevronRight size={14} /><strong>{active?.name || (page === 'lab' ? '实验室' : page === 'workflow' ? 'Agent 工作流' : '总览')}</strong></div>
          <div className="topbar-right"><span className="desktop-only">个人参考工作台</span><a className="icon-button" href="#/cases?q=" aria-label="搜索参考"><Search size={18} /></a><span className="avatar" aria-label="个人工作区">M</span></div>
        </header>
        <main id="main" className={`page-content ${page === 'docs' ? 'document-page' : ''}`}>
          {entry ? <Details key={`${entry.kind}/${entry.id}`} entry={entry} params={route.params} />
            : page === 'docs' ? <Documents params={route.params} />
            : page === 'compare' ? <Compare params={route.params} />
            : page === 'favorites' ? <LibraryList kind={(route.params.get('kind') as Kind) || 'cases'} params={route.params} favoritesOnly />
            : kinds.includes(page as Kind) && !route.parts[1] ? <LibraryList kind={page as Kind} params={route.params} />
            : page === 'lab' || page === 'workflow' ? <Reserved page={page} />
            : route.parts[1] ? <div className="empty-state"><BookOpen /><h1>没有找到这个条目</h1><a className="text-link" href="#/cases">浏览案例<ArrowRight size={16} /></a></div>
            : <Home />}
        </main>
      </div>
    </div>
    {state.comparison.length > 0 && page !== 'compare' && <div className="compare-tray"><Columns3 size={19} /><span>已选 {state.comparison.length} / 3 个案例</span><div className="compare-thumbs">{state.comparison.map(id => { const entry = findEntry('cases', id)!; return <button key={id} title={`移除 ${entry.title}`} aria-label={`移除 ${entry.title}`} onClick={() => state.toggleCompare(id)}>{entry.preview && <img src={assetUrl(entry.preview)} alt="" />}<X size={12} /></button>; })}</div><Button size="sm" disabled={state.comparison.length < 2} onClick={() => navigate('/compare', { ids: state.comparison.join(',') })}>开始比较<ArrowRight size={15} /></Button><button className="icon-button" aria-label="清空比较" onClick={() => state.setComparison([])}><X size={17} /></button></div>}
    {state.notice && <div className="toast" role="status">{state.notice}<button className="icon-button" aria-label="关闭提示" onClick={() => state.setNotice('')}><X size={16} /></button></div>}
  </Workbench.Provider>;
}

function Home() {
  const heroIds = isMotion ? ['mg-bauhaus', 'lemo-risograph', 'mg-aurora-glass'] : ['stripe-platform', 'uiarc-platform', 'swiss-grid'];
  const featured = heroIds.map(id => findEntry('cases', id)).filter(Boolean) as Entry[];
  const [query, setQuery] = useState('');
  return <>
    <div className="home-heading"><div><h1>{isMotion ? '找到画面里的节奏。' : '找到下一次设计的起点。'}</h1><p>{isMotion ? '观察时间、画面与声音，拆解可复用的动态设计。' : '浏览真实案例，理解设计机制，把参考带进创作。'}</p></div><a className="quiet-link desktop-only" href="#/docs">阅读使用指南<BookOpen size={16} /></a></div>
    <form className="home-search" onSubmit={event => { event.preventDefault(); navigate('/cases', { q: query }); }}><SearchField label="搜索参考库" placeholder={isMotion ? '搜索画面风格、节奏、转场或技术…' : '搜索案例、设计机制、标签或拆解内容…'} value={query} onValueChange={setQuery} /><Button type="submit" variant="secondary">查找参考<ArrowRight size={16} /></Button></form>
    <div className="collection-strip">{kinds.map((kind, index) => <a key={kind} href={'#/' + kind}><span className="collection-number">{catalog[kind].length}</span><div><strong>{kindNames[kind]}</strong><small>{['完整作品与设计拆解', '可单独借用的设计机制', '可复用的工具与内容'][index]}</small></div><ArrowRight size={19} /></a>)}</div>
    <div className="section-heading"><h2>参考选集</h2><a className="text-link" href="#/cases">浏览全部案例<ArrowRight size={16} /></a></div>
    <div className="featured-grid">{featured.map((entry, index) => <a className={`featured-item featured-${index}`} href={entryHref(entry)} key={entry.id}>
      {entry.preview && <img src={assetUrl(entry.preview)} alt={entry.title} />}
      <div className="featured-caption"><span>{String(entry.order).padStart(2, '0')}</span><div><strong>{entry.title}</strong><p>{entry.subtitle}</p></div><ArrowRight size={20} /></div>
    </a>)}</div>
    <div className="section-heading"><div><h2>{isMotion ? '从一个动态机制开始' : '从一个设计机制开始'}</h2><p>选择巧思，在 Demo 中观察它如何发生。</p></div><a className="text-link" href="#/patterns">全部巧思<ArrowRight size={16} /></a></div>
    <div className="entry-grid home-patterns">{catalog.patterns.slice(0, 3).map(entry => <EntryCard key={entry.id} entry={entry} />)}</div>
    <div className="home-doc-link"><BookOpen size={25} /><div><h3>参考背后的研究与原文</h3><p>指南、研究、Prompt 与复刻说明，按文档分组阅读。</p></div><a className="text-link" href="#/docs">打开文档<ArrowRight size={16} /></a></div>
  </>;
}

export function EntryCard({ entry }: { entry: Entry }) {
  const { favorites, toggleFavorite, comparison, toggleCompare } = useWorkbench();
  const saved = favorites[entry.kind].includes(entry.id);
  const compared = comparison.includes(entry.id);
  const primary = entry.kind === 'cases' && isMotion ? displayName(entry.kind, 'style', entry.style) : entry.kind === 'patterns' && isMotion ? displayName(entry.kind, 'types', entry.types[0]) : entry.kind === 'materials' ? displayName(entry.kind, 'type', entry.type) : displayName(entry.kind, 'category', entry.category);
  return <article className="entry-card">
    <div className="entry-cover"><a href={entryHref(entry)} tabIndex={-1} aria-hidden="true">{entry.preview ? <img src={assetUrl(entry.preview)} alt="" loading="lazy" /> : <div className="cover-placeholder"><Layers3 size={42} /><span>{entry.title}</span></div>}</a><button className={`save-button ${saved ? 'saved' : ''}`} aria-label={`${saved ? '取消收藏' : '收藏'} ${entry.title}`} aria-pressed={saved} onClick={() => toggleFavorite(entry.kind, entry.id)}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /></button>{isMotion && entry.kind === 'cases' && <span className="duration-badge">{entry.rhythm.duration} 秒</span>}</div>
    <div className="entry-meta"><span>{primary}</span><span>{String(entry.order).padStart(3, '0')}</span></div>
    <h3><a href={entryHref(entry)}>{entry.title}</a></h3><p className="entry-summary">{entry.summary}</p>
    <div className="entry-bottom"><div className="entry-tags">{(entry.tags || valuesFor(entry, isMotion ? 'carriers' : 'experienceTypes')).slice(0, 2).map((tag: string) => <span key={tag}>{displayName(entry.kind, isMotion ? 'carriers' : 'experienceTypes', tag)}</span>)}</div>{entry.kind === 'cases' && <button className={`compare-add ${compared ? 'selected' : ''}`} aria-pressed={compared} onClick={() => toggleCompare(entry.id)}>{compared ? <Check size={14} /> : <Columns3 size={14} />}<span>{compared ? '已选' : '比较'}</span></button>}</div>
  </article>;
}

function LibraryList({ kind, params, favoritesOnly = false }: { kind: Kind; params: URLSearchParams; favoritesOnly?: boolean }) {
  const { favorites, importFavorites } = useWorkbench();
  const input = useRef<HTMLInputElement>(null);
  const path = favoritesOnly ? '/favorites' : `/${kind}`;
  const q = params.get('q') || '';
  const savedOnly = favoritesOnly || params.get('saved') === '1';
  const sort = params.get('sort') || 'order-asc';
  const terms = q.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let filtered = catalog[kind].filter(entry => (!savedOnly || favorites[kind].includes(entry.id)) && terms.every(term => JSON.stringify(entry).toLocaleLowerCase().includes(term)) && filterFields[kind].every(field => !params.get(field.key) || valuesFor(entry, field.key).includes(params.get(field.key)!)));
  const [sortBy, direction] = sort.split('-');
  filtered = [...filtered].sort((a, b) => (sortBy === 'title' ? a.title.localeCompare(b.title, 'zh-CN') : a.order - b.order) * (direction === 'desc' ? -1 : 1));
  const pages = Math.max(1, Math.ceil(filtered.length / 24));
  const page = Math.min(Number(params.get('page') || 1), pages);
  const visible = filtered.slice((page - 1) * 24, page * 24);
  const change = (patch: Record<string, string | null>) => navigate(path, { page: null, ...patch }, true);
  const hasFilters = q || filterFields[kind].some(field => params.has(field.key)) || params.has('saved');
  function exportFavorites() {
    const value = isMotion ? { app: 'motion-atlas', version: 1, exportedAt: new Date().toISOString(), favorites } : { format: 'web-atlas-favorites', ...favorites };
    downloadJSON(value, `${isMotion ? 'motion' : 'web'}-atlas-favorites.json`);
  }
  return <>
    <div className="page-heading"><div><h1>{favoritesOnly ? '收藏' : kindNames[kind]}</h1><p>{favoritesOnly ? '保存常用参考，在自己的收藏中继续查找。' : kind === 'cases' ? '运行完整作品，阅读设计拆解，比较不同方案。' : kind === 'patterns' ? '理解一个机制的触发、效果与使用条件。' : '直接使用组件、工具、字体与创作资料。'}</p></div>{favoritesOnly && <div className="heading-actions"><Button variant="secondary" size="sm" onClick={() => input.current?.click()}><Upload size={15} />导入</Button><Button variant="secondary" size="sm" onClick={exportFavorites}><Download size={15} />导出</Button><input ref={input} type="file" accept=".json,application/json" hidden onChange={event => { if (event.target.files?.[0]) void importFavorites(event.target.files[0]); event.target.value = ''; }} /></div>}</div>
    {favoritesOnly && <SegmentedControl className="kind-tabs" label="收藏类型" value={kind} onValueChange={value => navigate('/favorites', { kind: value })} options={kinds.map(kind => ({ value: kind, label: kindNames[kind], accessory: <span className="tab-count">{favorites[kind].length}</span> }))} />}
    <div className="list-toolbar"><div className="list-search"><SearchField label="搜索条目" value={q} onValueChange={value => change({ q: value })} placeholder="多个词用空格分隔，所有词都需匹配" /></div><div className="sort-select"><Select label="排序" value={sort} onValueChange={value => change({ sort: value })} options={[{ value: 'order-asc', label: '编号：从小到大' }, { value: 'order-desc', label: '编号：从大到小' }, { value: 'title-asc', label: '名称：正序' }, { value: 'title-desc', label: '名称：反序' }]} /></div></div>
    <div className="filters">{filterFields[kind].map(field => {
      const values = [...new Set(catalog[kind].flatMap(entry => valuesFor(entry, field.key)))].sort((a, b) => displayName(kind, field.key, a).localeCompare(displayName(kind, field.key, b), 'zh-CN'));
      return <div className="filter-select" key={field.key}><Select label={field.label} value={params.get(field.key) || '_all'} onValueChange={value => change({ [field.key]: value === '_all' ? null : value })} options={[{ value: '_all', label: `全部${field.label}` }, ...values.map(value => ({ value, label: `${displayName(kind, field.key, value)}（${catalog[kind].filter(entry => valuesFor(entry, field.key).includes(value)).length}）` }))]} /></div>;
    })}{!favoritesOnly && <button className={`favorite-filter ${savedOnly ? 'selected' : ''}`} aria-pressed={savedOnly} onClick={() => change({ saved: savedOnly ? null : '1' })}><Bookmark size={15} />只看收藏</button>}</div>
    <div className="list-results"><span>共 <strong>{filtered.length}</strong> 个{kindNames[kind]}{filtered.length !== catalog[kind].length && `，本库 ${catalog[kind].length} 个`}</span><div>{hasFilters && <button className="quiet-link" onClick={() => navigate(path, favoritesOnly ? { kind } : {})}>清除条件<X size={14} /></button>}<Grid2X2 size={15} /><span>封面视图</span></div></div>
    {visible.length ? <div className="entry-grid">{visible.map(entry => <EntryCard key={entry.id} entry={entry} />)}</div> : <div className="empty-state"><Search size={32} /><h2>{savedOnly && !q && !hasFilters ? '这里还没有收藏' : '没有匹配的条目'}</h2><p>{savedOnly ? '在条目封面或详情中点击收藏。' : '减少搜索词，或清除筛选条件。'}</p><a className="text-link" href={'#/' + kind}>浏览全部{kindNames[kind]}<ArrowRight size={16} /></a></div>}
    {pages > 1 && <nav className="pagination" aria-label="列表翻页"><Button variant="secondary" size="sm" disabled={page === 1} onClick={() => navigate(path, { page: String(page - 1) }, true)}><ChevronLeft size={15} />上一页</Button><span>第 {page} / {pages} 页</span><Button variant="secondary" size="sm" disabled={page === pages} onClick={() => navigate(path, { page: String(page + 1) }, true)}>下一页<ChevronRight size={15} /></Button></nav>}
  </>;
}

function Compare({ params }: { params: URLSearchParams }) {
  const { comparison, setComparison } = useWorkbench();
  const ids = (params.get('ids')?.split(',') || comparison).slice(0, 3);
  const items = ids.map(id => findEntry('cases', id)).filter(Boolean) as Entry[];
  const fields = ['summary', 'productFocus', 'focus', 'principles', 'interaction', 'composition', 'tokens', 'rhythm', 'layers', 'observations', 'themeBehavior', 'soundBehavior', 'useCases', 'avoid', 'constraints', 'exercise', 'migration', 'prompt', 'videoPrompt', 'negativePrompt', 'sources', 'license'];
  function remove(id: string) { const next = ids.filter(item => item !== id); setComparison(next); navigate('/compare', { ids: next.join(',') }); }
  return <><div className="page-heading"><div><h1>案例比较</h1><p>选择 2–3 个案例，按同一拆解字段逐项对照。</p></div><a className="text-link" href="#/cases">继续选案例<ArrowRight size={16} /></a></div>{items.length < 2 ? <div className="empty-state"><Columns3 size={34} /><h2>选择至少 2 个案例</h2><p>在案例封面的「比较」按钮中加入作品。</p><a className="link-button" href="#/cases">浏览案例<ArrowRight size={16} /></a></div> : <div className="comparison-scroll"><table className="comparison-table"><thead><tr><th>拆解字段</th>{items.map(entry => <th key={entry.id}><div>{entry.preview && <img src={assetUrl(entry.preview)} alt="" />}<button className="icon-button" aria-label={`移除 ${entry.title}`} onClick={() => remove(entry.id)}><X size={16} /></button></div><a href={entryHref(entry)}>{entry.title}</a></th>)}</tr></thead><tbody>{fields.filter(field => items.some(entry => entry[field] != null)).map(field => <tr key={field}><th scope="row">{fieldName(field)}</th>{items.map(entry => <td key={entry.id}>{entry[field] != null ? <BreakdownValue value={entry[field]} field={field} entry={entry} /> : <span className="muted">无此字段</span>}</td>)}</tr>)}</tbody></table></div>}</>;
}

function Reserved({ page }: { page: string }) {
  return <><div className="page-heading"><div><h1>{page === 'workflow' ? 'Agent 工作流' : isMotion ? '节奏实验室' : '设计实验室'}</h1><p>此入口为后续工具预留。</p></div><span className="pill">原型预留</span></div><div className="reserved-panel">{page === 'workflow' ? <Workflow size={42} /> : <FlaskConical size={42} />}<h2>{page === 'workflow' ? '从案例资料开始' : '先观察，再尝试'}</h2><p>{page === 'workflow' ? '案例详情已提供 Prompt 和 Agent 资料包。工作流页将集中组织取材与实现步骤。' : isMotion ? '节奏实验室将提供节拍器、吸附、缓动曲线，以及 CSS 和 WAV 导出。' : '设计实验室将提供配色、字体与布局调配，以及配置和 Prompt 导出。'}</p><a className="link-button" href="#/cases">浏览案例<ArrowRight size={16} /></a></div></>;
}
