import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowLeft, ArrowRight, Bookmark, BookOpen, Check, ChevronRight, Columns3, ExternalLink, FileText, Layers3, Link as LinkIcon, Play, Sparkles } from 'lucide-react';
import { Button } from '../arc/registry/components/button/button';
import { CopyButton } from '../arc/registry/components/copy-button/copy-button';
import { Select } from '../arc/registry/components/select/select';
import SegmentedControl from '../arc/registry/components/segmented-control/segmented-control';
import { assetUrl, catalog, displayName, docHref, documents, entryHref, files, findEntry, href, isMotion, kindNames, navigate, nonempty } from './data';
import type { Entry, Kind } from './data';
import { useWorkbench } from './state';
import { MarkdownView } from './Documents';
import { MotionPlayer, WebPlayer } from './Players';

const fieldLabels: Record<string, string> = {
  summary: '摘要', productFocus: '设计重点', focus: '信息重点', theme: '主题与情绪', principles: '设计机制', mechanism: '设计机制', trigger: '触发条件', effect: '可见效果', interaction: '交互', composition: '构成', tokens: '色板与 Token', rhythm: '节奏结构', layers: '画面分层', observations: '观察细节', themeBehavior: '主题行为', soundBehavior: '声音行为', sound: '声音设计', timing: '时序参数', parameters: '可调参数', useCases: '适用场景', avoid: '使用限制', constraints: '内容与实现约束', exercise: '改造练习', migration: '迁移指南', workflow: '工作流步骤', install: '安装与使用', sources: '来源证据', upstream: '上游版本', license: '许可', attribution: '署名', sourceFiles: '源码文件', locator: '来源定位', referenceUrl: '原始参考', capturedAt: '采集日期', theoryVerifiedAt: '理论核验日期', edition: '版本', implementation: '实现类别', studyScope: '研究范围', energy: '能量采样', energySegments: '分段能量', energyNote: '能量曲线说明', markers: '节拍标记', skillGuide: 'Skill 使用指南', carrierNote: '载体说明', demoNote: '样例说明', galleryRatio: '画廊比例', galleryFit: '图片适配', prompt: '实现 Prompt', videoPrompt: '视频生成 Prompt', negativePrompt: '负向约束', relatedEntries: '关联条目', patternIds: '关联巧思', previewAt: '横屏预览时刻', previewAtPortrait: '竖屏预览时刻', renderer: '渲染器', kit: '使用 MotionKit', timeline: '可定位时间轴', orients: '支持画幅', type: '类型', category: '分类', country: '地区', carriers: '载体', style: '画面风格', purpose: '用途', tech: '技术', tags: '标签', types: '巧思类型', experienceTypes: '体验类型',
  color: '配色', typography: '字体排版', layout: '布局留白', imagery: '图像与素材', shape: '线条与形状', hierarchy: '信息层级', motion: '动效', coherence: '协调关系', scroll: '滚动结构', palette: '色板', accentRoles: '强调色角色', light: '浅色主题', dark: '深色主题', css: 'CSS 变量', mode: '模式', default: '默认主题', control: '控制方式', designReason: '设计原因', kind: '类别', interactionRole: '交互作用', role: '组合职责', notes: '说明', note: '说明', pairsWellWith: '适合组合', conflicts: '组合冲突', name: '名称', value: '参考值', source: '来源', title: '标题', url: '来源链接', evidence: '证据类型', caseId: '来源案例', observation: '观察', referencePreviewNote: '原站截图说明', target: '目标选择器', label: '名称', instruction: '观察方法', entrypoint: '运行入口', prepare: '定位准备', viewport: '定位视口', replay: '重播目标', phase: '定位阶段', click: '点击', waitFor: '等待出现', images: '等待图片', video: '等待视频', key: '按键', input: '输入控件', minWidth: '最小宽度', maxWidth: '最大宽度', duration: '总时长（秒）', bpm: '每分钟拍数', beats: '节拍', t: '时刻（秒）', at: '观察位置', what: '观察内容', field: '修改位置', how: '修改方法', scope: '范围', repository: '上游仓库', commit: '固定提交', version: '版本', verifiedAt: '核验日期', threeVersion: 'Three.js 版本', author: '作者', path: '路径', voices: '音色', score: '乐谱文件', description: '说明', from: '起点能量', to: '终点能量', t0: '起始时刻', t1: '结束时刻', files: '文件', editGuide: '修改说明', accent1: '深色强调色', accent2: '强调文字色', accent3: '实心底色', accent3Ink: '实心底文字色', accentMark: '高亮条', accent4: '柔和底色', component: '组件', skills: 'Skill 入口'
};
export const fieldName = (key: string) => fieldLabels[key] || key;
const sections = [
  { id: 'mechanism', title: '设计机制与交互', fields: ['productFocus', 'focus', 'theme', 'principles', 'mechanism', 'trigger', 'effect', 'interaction'] },
  { id: 'composition', title: '画面构成', fields: ['composition'] },
  { id: 'rhythm', title: '节奏与画面分层', fields: ['rhythm', 'layers', 'observations', 'energy', 'energySegments', 'energyNote', 'markers'] },
  { id: 'tokens', title: '色板与参数', fields: ['tokens', 'timing', 'parameters'] },
  { id: 'behavior', title: '主题与声音', fields: ['themeBehavior', 'soundBehavior', 'sound'] },
  { id: 'workflow', title: '使用与迁移', fields: ['workflow', 'install', 'migration', 'exercise', 'skillGuide'] },
  { id: 'use-cases', title: '适用场景与限制', fields: ['useCases', 'avoid', 'constraints'] },
  { id: 'sources', title: '来源与许可', fields: ['sources', 'upstream', 'license', 'attribution', 'sourceFiles', 'locator', 'referenceUrl', 'capturedAt', 'theoryVerifiedAt', 'edition', 'implementation', 'studyScope'] },
  { id: 'technical', title: '技术与内容信息', fields: ['renderer', 'kit', 'timeline', 'orients', 'previewAt', 'previewAtPortrait', 'carrierNote', 'demoNote', 'galleryRatio', 'galleryFit'] }
];
const structural = ['id', 'kind', 'order', 'title', 'subtitle', 'en', 'summary', 'category', 'country', 'carriers', 'style', 'purpose', 'tech', 'tags', 'types', 'experienceTypes', 'preview', 'previewMobile', 'previewPortrait', 'demo', 'demos', 'referencePreview', 'referencePreviewNote', 'background', 'accent', 'research', 'fidelity', 'licenses', 'assetManifest', 'snapshotPath', 'snapshotEntry', 'snapshotFiles', 'documents', 'gallery', 'relatedEntries', 'patternIds', 'prompt', 'negativePrompt', 'videoPrompt'];

export function BreakdownValue({ value, field = '', entry }: { value: any; field?: string; entry: Entry }) {
  if (!nonempty(value)) return null;
  const source = `demos/${entry.kind}/${entry.id}/index.html`;
  if (typeof value === 'boolean') return <span>{value ? '是' : '否'}</span>;
  if (typeof value === 'number') return <span className="numeric">{value}</span>;
  if (typeof value === 'string') {
    if (['pairsWellWith', 'conflicts', 'patternIds'].includes(field)) { const target = findEntry('patterns', value); return target ? <a className="inline-entry-link" href={entryHref(target)}>{target.title}<ArrowRight size={13} /></a> : <span>{value}</span>; }
    if (field === 'caseId') { const target = findEntry('cases', value); return target ? <a className="inline-entry-link" href={entryHref(target)}>{target.title}<ArrowRight size={13} /></a> : <span>{value}</span>; }
    if (field === 'observation' && value.startsWith('{')) { const parsed = JSON.parse(value); return <div><strong>{parsed.title}</strong><p>{parsed.note}</p></div>; }
    if (/^#[a-f\d]{3,8}$/i.test(value) || /^(rgb|hsl|oklch)\(/.test(value)) return <span className="color-value"><i style={{ background: value }} /><code>{value}</code></span>;
    if (/^https?:\/\//.test(value) && !/\s/.test(value)) return <a href={value} target="_blank" rel="noreferrer" className="source-link">{value}<ExternalLink size={13} /></a>;
    if (/^(docs|prompts|demos|entries|agent|previews|kit)\//.test(value.replace(/\\/g, '/')) && !/\s/.test(value)) {
      const path = value.replace(/\\/g, '/');
      return <a href={/\.md(?:#.*)?$/i.test(path) ? docHref(path.split('#')[0], path.split('#')[1]) : assetUrl(path)} target={/\.md$/i.test(path) ? undefined : '_blank'} rel="noreferrer">{documents.find(doc => doc.path === path)?.title || path}</a>;
    }
    if (field === 'install') return <div className="install-block"><CopyButton value={value} label="复制安装命令" /><pre>{value}</pre></div>;
    if (['mode', 'kind', 'evidence', 'role'].includes(field)) {
      const path = field === 'mode' ? 'themeBehavior.mode' : field === 'kind' ? 'soundBehavior.kind' : field === 'role' ? 'composition.role' : 'sources[].evidence';
      return <span>{displayName(entry.kind, path, value)}</span>;
    }
    if (field === 'default') return <span>{{ light: '浅色', dark: '深色', system: '跟随系统' }[value] || value}</span>;
    if (field === 'orients') return <span>{value === 'landscape' ? '横屏' : value === 'portrait' ? '竖屏' : value}</span>;
    return <MarkdownView text={value} source={source} className="inline-markdown" />;
  }
  if (Array.isArray(value)) {
    if (field === 'workflow') return <ol className="workflow-list">{value.map((step, index) => <li key={index}><BreakdownValue value={step} entry={entry} /></li>)}</ol>;
    if (field === 'skillGuide') return <div className="skill-guide">{value.map((group, index) => <div key={index}><h4>{group.title}</h4>{group.skills.map((skill: any) => <a className="skill-link" key={skill.id} href={docHref(`${entry.snapshotPath}skills/${skill.id}/SKILL.md`)}><strong>{skill.title}</strong><span>{skill.description}</span><ArrowRight size={15} /></a>)}</div>)}</div>;
    if (value.every(item => typeof item !== 'object')) return <ul className={field === 'palette' ? 'palette-list' : 'value-list'}>{value.map((item, index) => <li key={index}><BreakdownValue value={item} field={field} entry={entry} /></li>)}</ul>;
    return <div className="object-list">{value.map((item, index) => <div className="object-item" key={index}><BreakdownValue value={item} field={field} entry={entry} /></div>)}</div>;
  }
  return <dl className="value-fields">{Object.entries(value).filter(([, content]) => nonempty(content)).map(([key, content]) => <div key={key}><dt>{fieldName(key)}</dt><dd><BreakdownValue value={content} field={key} entry={entry} /></dd></div>)}</dl>;
}

export default function Details({ entry, params }: { entry: Entry; params: URLSearchParams }) {
  const { favorites, toggleFavorite, comparison, toggleCompare } = useWorkbench();
  const saved = favorites[entry.kind].includes(entry.id);
  const tab = params.get('tab') || 'breakdown';
  const sourceIds = [...new Set<string>((entry.sources || []).map((source: any) => source.caseId).filter(Boolean))];
  const sourceId = sourceIds.includes(params.get('source') || '') ? params.get('source')! : sourceIds[0];
  const source = entry.sources?.find((source: any) => source.caseId === sourceId);
  const sourceCase = sourceId && findEntry('cases', sourceId);
  const example = entry.demos?.find((demo: any) => demo.id === params.get('example')) || entry.demos?.[0];
  const groups = sections.filter(section => section.fields.some(field => nonempty(entry[field])));
  const covered = [...structural, ...sections.flatMap(section => section.fields)];
  const extra = Object.keys(entry).filter(field => !covered.includes(field) && nonempty(entry[field]));
  const combinedPrompt = [entry.prompt, entry.negativePrompt && `负向约束：\n${entry.negativePrompt}`].filter(Boolean).join('\n\n');
  return <>
    <nav className="breadcrumbs" aria-label="当前位置"><a href={href(`/${entry.kind}`, { tab: null, source: null, example: null }, true)}><ArrowLeft size={15} />{kindNames[entry.kind]}</a><ChevronRight size={14} /><span>{String(entry.order).padStart(3, '0')}</span></nav>
    <div className="detail-heading"><div><div className="detail-category"><span>{kindNames[entry.kind]}</span>{(isMotion && entry.kind === 'cases' ? ['style', 'purpose'] : ['category', 'country', 'type']).filter(field => entry[field]).map(field => <span key={field}>{displayName(entry.kind, field, entry[field])}</span>)}</div><h1>{entry.title}</h1>{entry.subtitle && <p className="detail-subtitle">{entry.subtitle}</p>}</div><div className="detail-actions"><Button variant="secondary" size="sm" aria-pressed={saved} onClick={() => toggleFavorite(entry.kind, entry.id)}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />{saved ? '已收藏' : '收藏'}</Button><CopyButton label="分享链接" value={location.href} />{entry.kind === 'cases' && <Button variant="secondary" size="sm" aria-pressed={comparison.includes(entry.id)} onClick={() => toggleCompare(entry.id)}><Columns3 size={16} />{comparison.includes(entry.id) ? '已加入比较' : '加入比较'}</Button>}</div></div>
    <p className="detail-summary">{entry.summary}</p>
    <div className="detail-tags">{['carriers', 'tech', 'types', 'experienceTypes'].flatMap(field => (entry[field] || []).map((value: string) => <span className="pill" key={`${field}-${value}`}>{displayName(entry.kind, field, value)}</span>))}{(entry.tags || []).map((tag: string) => <span className="tag" key={tag}>{tag}</span>)}</div>
    {entry.kind === 'patterns' && !isMotion && sourceCase && <div className="source-switch"><Select label="在来源案例中观察" value={sourceId} onValueChange={value => navigate(`/${entry.kind}/${entry.id}`, { source: value }, true)} options={sourceIds.map(value => ({ value, label: findEntry('cases', value)?.title || value }))} /><a className="text-link" href={entryHref(sourceCase)}>案例拆解<ArrowRight size={15} /></a></div>}
    {entry.kind === 'materials' && entry.demos?.length > 0 && <div className="example-switch"><Select label="切换运行样例" value={example.id} onValueChange={value => navigate(`/${entry.kind}/${entry.id}`, { example: value }, true)} options={entry.demos.map((demo: any) => ({ value: demo.id, label: demo.title }))} />{example.summary && <p>{example.summary}</p>}</div>}
    {entry.kind === 'patterns' && !isMotion ? sourceCase && <WebPlayer key={sourceId} entry={sourceCase} source={source} />
      : entry.demo ? isMotion && entry.kind !== 'materials' ? <MotionPlayer entry={entry} params={params} /> : <WebPlayer entry={entry} demo={example?.entrypoint} material={entry.kind === 'materials'} /> : null}
    {entry.kind === 'materials' && entry.gallery?.length > 0 && <Gallery entry={entry} />}
    {!entry.demo && entry.kind === 'materials' && !entry.gallery?.length && <div className="snapshot-intro"><BookOpen size={30} /><div><h2>素材原文与工作流</h2><p>{entry.snapshotEntry ? '阅读完整原文，按工作流取用资料。' : '阅读研究文档与使用说明。'}</p></div><a className="link-button" href={docHref(entry.snapshotPath && entry.snapshotEntry ? entry.snapshotPath + entry.snapshotEntry : entry.research)}>阅读原文<ArrowRight size={16} /></a></div>}
    <div className="detail-tabbar"><SegmentedControl label="详情内容" value={tab} onValueChange={value => navigate(`/${entry.kind}/${entry.id}`, { tab: value }, true)} options={[{ value: 'breakdown', label: '完整拆解' }, { value: 'prompt', label: 'Prompt' }, { value: 'related', label: '资料与关联' }]} />{combinedPrompt && <CopyButton label="复制实现 Prompt" value={combinedPrompt} />}</div>
    {tab === 'prompt' ? <div className="prompt-layout"><div><div className="section-heading"><h2>Prompt</h2>{files.has(`prompts/${entry.kind}/${entry.id}.md`) && <a className="text-link" href={docHref(`prompts/${entry.kind}/${entry.id}.md`)}>阅读 Prompt 原文<ArrowRight size={15} /></a>}</div>{['prompt', 'videoPrompt', 'negativePrompt'].filter(field => entry[field]).map(field => <section key={field} className="prompt-block"><div><h3>{fieldName(field)}</h3><CopyButton value={field === 'prompt' ? combinedPrompt : entry[field]} label="复制" /></div><MarkdownView text={entry[field]} source={`prompts/${entry.kind}/${entry.id}.md`} /></section>)}{!entry.prompt && <div className="empty-state"><FileText size={30} /><h2>从素材工作流开始</h2><p>这份素材提供安装说明与原文入口。</p><a className="text-link" href={href(`/${entry.kind}/${entry.id}`, { tab: 'breakdown' }, true)}>阅读使用步骤<ArrowRight size={16} /></a></div>}</div><aside className="detail-side-note"><Sparkles size={21} /><h3>带着机制去实现</h3><p>实现 Prompt 用于代码复用，视频生成 Prompt 描述画面。负向约束与条目的内容限制一同保留。</p></aside></div>
      : tab === 'related' ? <Related entry={entry} />
      : <div className="breakdown-layout"><div className="breakdown-content">{groups.map(section => <section className="breakdown-section" key={section.id} id={`section-${section.id}`}><h2>{section.title}</h2>{section.fields.filter(field => nonempty(entry[field])).map(field => <div className="breakdown-field" key={field}>{section.fields.length > 1 && <h3>{fieldName(field)}</h3>}<BreakdownValue value={entry[field]} field={field} entry={entry} /></div>)}</section>)}{extra.length > 0 && <section className="breakdown-section" id="section-extra"><h2>补充内容</h2>{extra.map(field => <div className="breakdown-field" key={field}><h3>{fieldName(field)}</h3><BreakdownValue value={entry[field]} field={field} entry={entry} /></div>)}</section>}<Related entry={entry} compact /></div><aside className="detail-toc"><span>拆解目录</span>{groups.map(section => <a href={`#${location.hash.slice(1).split('?')[0]}?${new URLSearchParams({ ...Object.fromEntries(params), section: section.id })}`} key={section.id} onClick={event => { event.preventDefault(); document.getElementById(`section-${section.id}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' }); }}>{section.title}</a>)}<a className="toc-download" href={assetUrl(`agent/${entry.kind}/${entry.id}.json`)} download={`${entry.id}.json`}><ArrowDownToLine size={16} />Agent 资料包</a></aside></div>}
  </>;
}

function Related({ entry, compact = false }: { entry: Entry; compact?: boolean }) {
  const patternIds: string[] = entry.kind === 'cases' ? isMotion ? entry.patternIds || [] : catalog.patterns.filter(pattern => pattern.sources.some((source: any) => source.caseId === entry.id)).map(pattern => pattern.id) : [];
  const links: { kind: Kind; id: string; note?: string }[] = [
    ...patternIds.map(id => ({ kind: 'patterns' as Kind, id })),
    ...(entry.kind === 'patterns' ? [...new Set<string>(entry.sources.map((source: any) => source.caseId))].map(id => ({ kind: 'cases' as Kind, id })) : []),
    ...(entry.relatedEntries || []).map((item: any) => ({ ...item, kind: (item.kind.endsWith('s') ? item.kind : item.kind + 's') as Kind }))
  ];
  const related = links.map(item => ({ ...item, target: findEntry(item.kind, item.id) })).filter(item => item.target);
  const docs = entry.documents.map(path => documents.find(doc => doc.path === path)).filter(Boolean);
  return <section className={`related-section ${compact ? 'compact' : ''}`} id="section-related"><div className="section-heading"><h2>资料与关联</h2><a className="link-button secondary" href={assetUrl(`agent/${entry.kind}/${entry.id}.json`)} download={`${entry.id}.json`}><ArrowDownToLine size={16} />下载 Agent 资料包</a></div>{related.length > 0 && <><h3>关联条目</h3><div className="related-grid">{related.map(({ target, note }, index) => <a key={`${target!.kind}-${target!.id}-${index}`} href={entryHref(target!)}>{target!.preview && <img src={assetUrl(target!.preview)} alt="" loading="lazy" />}<div><small>{kindNames[target!.kind]}</small><strong>{target!.title}</strong>{note && <p>{note}</p>}</div><ArrowRight size={16} /></a>)}</div></>}{docs.length > 0 && <><h3>关联文档</h3><div className="related-documents">{docs.map(doc => <a key={doc!.path} href={docHref(doc!.path)}><FileText size={17} /><div><strong>{doc!.title}</strong><small>{doc!.path}</small></div><ChevronRight size={16} /></a>)}</div></>}{entry.assetManifest && <a className="text-link" href={assetUrl(entry.assetManifest)} target="_blank" rel="noreferrer">素材来源清单<ExternalLink size={14} /></a>}</section>;
}

function Gallery({ entry }: { entry: Entry }) {
  const [index, setIndex] = useState(0);
  const [compare, setCompare] = useState(true);
  const [error, setError] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const item = entry.gallery[index];
  useEffect(() => {
    if (!item.compare || !compare || !canvas.current) return;
    let cancelled = false, animation = 0, renderer: any;
    const surface = canvas.current;
    setError('');
    Promise.all([import(/* @vite-ignore */ assetUrl(`demos/materials/${entry.id}/demo/renderer.js`)), import(/* @vite-ignore */ assetUrl(`demos/materials/${entry.id}/demo/pieces.js`))]).then(([module, collection]) => {
      if (cancelled) return;
      renderer = module;
      const piece = collection.pieces.find((piece: any) => piece.id === item.compare.piece);
      surface.width = piece.originalWidth; surface.height = piece.originalHeight;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const draw = () => { if (cancelled) return; renderer.renderPiece(surface, piece, reduced ? 0 : video.current?.currentTime || 0); if (!reduced) animation = requestAnimationFrame(draw); };
      draw();
    }).catch(reason => { if (!cancelled) setError(reason.message); });
    return () => { cancelled = true; cancelAnimationFrame(animation); renderer?.releaseRenderer(surface); video.current?.pause(); };
  }, [item, compare, entry.id]);
  const original = item.compare?.original || item.path;
  const hasReplica = item.compare || item.replicaPage;
  return <section className="gallery-section"><div className="section-heading"><h2>素材画廊</h2><div><span>{index + 1} / {entry.gallery.length}</span>{hasReplica && <Button variant="secondary" size="sm" aria-pressed={compare} onClick={() => setCompare(!compare)}>原作与复刻</Button>}</div></div><div className={`gallery-stage ${hasReplica && compare ? 'gallery-compare' : ''}`}><figure><figcaption>{hasReplica ? '原作' : item.caption}</figcaption>{/\.(mp4|webm|m4a)(\?|$)/i.test(original) ? <video key={original} ref={video} src={assetUrl(original)} controls muted playsInline preload="metadata" poster={assetUrl(item.path)} /> : <a href={assetUrl(original)} target="_blank" rel="noreferrer"><img src={assetUrl(original)} alt={item.caption} style={{ objectFit: entry.galleryFit || 'contain' }} /></a>}</figure>{compare && item.compare && <figure><figcaption>复刻</figcaption><canvas ref={canvas} aria-label={`${item.caption} 复刻画面`} /></figure>}{compare && item.replicaPage && <figure><figcaption>复刻</figcaption><iframe title={`${item.caption} 复刻`} src={assetUrl(item.replicaPage)} /></figure>}</div>{error && <p className="inline-error">{error}</p>}<div className="gallery-caption"><p>{item.caption}</p>{item.sourceUrl && <a className="text-link" href={item.sourceUrl} target="_blank" rel="noreferrer">作品来源<ExternalLink size={14} /></a>}</div>{item.license && <p className="gallery-license">{item.license}</p>}<div className="gallery-thumbs">{entry.gallery.map((item: any, itemIndex: number) => <button key={item.path} aria-label={`查看 ${item.caption}`} aria-pressed={itemIndex === index} onClick={() => setIndex(itemIndex)}><img src={assetUrl(item.path)} alt="" loading="lazy" /><span>{item.caption}</span></button>)}</div></section>;
}
