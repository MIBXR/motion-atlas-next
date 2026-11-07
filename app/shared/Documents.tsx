import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { ArrowDownToLine, ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronRight, FileText, List, Search } from 'lucide-react';
import { SearchField } from '../arc/registry/components/search-field/search-field';
import { CopyButton } from '../arc/registry/components/copy-button/copy-button';
import { assetUrl, contentBase, docHref, documents, entries, entryHref, files, findEntry, href, isMotion, labels, navigate } from './data';
import type { Document } from './data';

function resource(value: string, source: string) {
  if (!value || /^(data:|blob:|mailto:|tel:)/.test(value)) return value;
  const url = new URL(value.replace(/\\/g, '/'), new URL(source, contentBase));
  if (!url.href.startsWith(contentBase)) return assetUrl(url.href);
  let path = decodeURIComponent(url.pathname.slice(new URL(contentBase).pathname.length));
  if (path.endsWith('/') && files.has(path + 'index.html')) path += 'index.html';
  if (files.has(path)) return assetUrl(path) + url.search + url.hash;
  const owner = entries.find(entry => entry.snapshotPath && source.startsWith(entry.snapshotPath)) || entries.find(entry => source.startsWith(`demos/${entry.kind}/${entry.id}/`));
  const upstream = owner?.upstream;
  const sourceUrl = upstream?.url || owner?.referenceUrl || owner?.sources?.find((item: any) => /github\.com\/.+\/(tree|blob)\/[a-f\d]{40}/.test(item.url))?.url;
  const match = sourceUrl?.match(/github\.com\/([^/]+\/[^/]+)\/(?:tree|blob)\/([a-f\d]{40})\/?(.*)/);
  if (match) {
    const localRoot = owner?.snapshotPath || `demos/${owner?.kind}/${owner?.id}/`;
    const localSource = source.slice(localRoot.length);
    const remoteSource = new URL(localSource, `https://github.com/${match[1]}/blob/${match[2]}/${match[3].replace(/\/$/, '')}/`);
    return new URL(value, remoteSource).href;
  }
  if (/^(README|CONTRIBUTING|AGENTS)\.md$/.test(path)) return `https://github.com/MIBXR/${isMotion ? 'motion-atlas/blob/9713933a' : 'web-atlas/blob/7c4f99a4'}/${path}${url.hash}`;
  return assetUrl(path) + url.search + url.hash;
}
function linkTarget(value: string, source: string) {
  if (value.startsWith('#')) return docHref(source, value.slice(1));
  const original = new URL(value, new URL(source, contentBase));
  if (original.href.startsWith(contentBase)) {
    const file = decodeURIComponent(original.pathname.slice(new URL(contentBase).pathname.length));
    const pages: Record<string, string> = { 'index.html': '/', 'cases.html': '/cases', 'patterns.html': '/patterns', 'materials.html': '/materials', 'lab.html': '/lab', 'docs.html': '/docs', 'agent.html': '/workflow' };
    if (pages[file]) return href(pages[file]);
  }
  const resolved = resource(value, source);
  if (!resolved.startsWith(contentBase)) return resolved;
  const url = new URL(resolved);
  const path = decodeURIComponent(url.pathname.slice(new URL(contentBase).pathname.length));
  if (/\.md$/i.test(path) && files.has(path)) return docHref(path, decodeURIComponent(url.hash.slice(1)));
  const match = path.match(/^entries\/(cases|patterns|materials)\/([^/]+)\.json$/);
  if (match) { const entry = findEntry(match[1], match[2]); if (entry) return entryHref(entry); }
  return resolved;
}
function nodeText(node: any): string { return node.type === 'text' ? node.value : (node.children || []).map(nodeText).join(''); }

export function MarkdownView({ text, source = 'docs/guide.md', className = '' }: { text: string; source?: string; className?: string }) {
  const body = text.replace(/^\uFEFF/, '').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  return <div className={`markdown ${className}`}><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug]} components={{
    a: ({ href: target = '', children, node, ...props }) => { const resolved = linkTarget(target, source); return <a {...props} href={resolved} target={resolved.startsWith('#') ? undefined : '_blank'} rel={resolved.startsWith('#') ? undefined : 'noreferrer'}>{children}</a>; },
    img: ({ src = '', alt = '', node, ...props }) => { const url = resource(src, source); const image = /github\.com\/[^/]+\/[^/]+\/blob\//.test(url) ? url.replace('github.com/', 'raw.githubusercontent.com/').replace('/blob/', '/') : url; const open = () => window.open(image, '_blank', 'noopener,noreferrer'); return <img {...props} className="markdown-clickable-image" src={image} alt={alt} loading="lazy" tabIndex={0} role="link" aria-label={`打开图片 ${alt}`} onClick={event => { if (event.currentTarget.closest('a')) return; event.preventDefault(); event.stopPropagation(); open(); }} onKeyDown={event => { if (event.key === 'Enter') { if (event.currentTarget.closest('a')) return; event.preventDefault(); event.stopPropagation(); open(); } }} />; },
    pre: ({ children, node }) => <div className="code-block"><CopyButton value={nodeText(node)} label="复制代码" variant="plain" /><pre>{children}</pre></div>
  }}>{body}</ReactMarkdown></div>;
}

export default function Documents({ params }: { params: URLSearchParams }) {
  const selectedPath = params.get('file');
  const selected = documents.find(doc => doc.path === selectedPath);
  const query = params.get('dq') || '';
  const group = params.get('group') || '';
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = useMemo(() => documents.filter(doc => (!group || doc.group === group) && terms.every(term => `${doc.title} ${doc.path} ${doc.text}`.toLocaleLowerCase().includes(term))), [query, group]);
  const groupRules = labels.groups?.path || labels.DOC_GROUPS?.path;
  const groups = [...new Set<string>([...Object.values(groupRules || {}) as string[], '素材原文', '条目文档', ...documents.map(doc => doc.group)])].filter(group => documents.some(doc => doc.group === group));
  const [toc, setToc] = useState<{ id: string; text: string; depth: number }[]>([]);
  const article = useRef<HTMLElement>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  useLayoutEffect(() => {
    if (!selected) { setToc([]); return; }
    setToc(Array.from(article.current?.querySelectorAll('h1, h2, h3') || []).filter(node => node.id).map(node => ({ id: node.id, text: node.textContent || '', depth: Number(node.tagName.slice(1)) })));
  }, [selectedPath]);
  useEffect(() => {
    if (params.get('anchor')) requestAnimationFrame(() => document.getElementById(params.get('anchor')!)?.scrollIntoView({ block: 'start' }));
  }, [selectedPath, params.get('anchor')]);
  function openDoc(doc: Document) { setDirectoryOpen(false); navigate('/docs', { file: doc.path, anchor: null }, true); }
  const sorted = [...filtered].sort((a, b) => (a.path === 'docs/guide.md' ? -1 : b.path === 'docs/guide.md' ? 1 : a.title.localeCompare(b.title, 'zh-CN')));
  return <>
    <div className="page-heading"><div><h1>文档</h1><p>指南、研究、Prompt、复刻说明与素材原文。</p></div><span className="pill">{documents.length} 份文档</span></div>
    <div className={`documents-layout ${selected ? 'reading' : ''}`}>
      <aside className={`document-directory ${directoryOpen ? 'directory-open' : ''}`}>
        <div className="document-search"><SearchField label="搜索文档" placeholder="标题、路径与正文" value={query} onValueChange={value => navigate('/docs', { dq: value }, true)} /></div>
        <div className="document-groups"><button className={!group ? 'active' : ''} onClick={() => navigate('/docs', { group: null }, true)}>全部文档<span>{documents.length}</span></button>{groups.map(name => <button key={name} className={group === name ? 'active' : ''} onClick={() => navigate('/docs', { group: name }, true)}>{name}<span>{documents.filter(doc => doc.group === name).length}</span></button>)}</div>
        {selected && <div className="directory-list"><p>{filtered.length} 份匹配文档</p>{sorted.map(doc => <button key={doc.path} className={doc.path === selected.path ? 'active' : ''} onClick={() => openDoc(doc)}><FileText size={14} /><span>{doc.title}</span></button>)}</div>}
      </aside>
      {selected ? <>
        <article className="document-reader" ref={article}>
          <div className="reader-toolbar"><button className="quiet-link" onClick={() => navigate('/docs', { file: null, anchor: null }, true)}><ArrowLeft size={15} />文档列表</button><button className="quiet-link directory-toggle" aria-expanded={directoryOpen} onClick={() => setDirectoryOpen(!directoryOpen)}><List size={16} />文档目录</button><a className="quiet-link" href={assetUrl(selected.path)} download><ArrowDownToLine size={15} />原文</a></div>
          <div className="document-file-meta"><span>{selected.group}</span><span>{selected.path}</span></div>
          {toc.length > 0 && <details className="mobile-document-toc"><summary><List size={15} />本页章节<ChevronDown size={15} /></summary><nav aria-label="文档章节">{toc.map(item => <a key={item.id} className={`depth-${item.depth}`} href={href('/docs', { anchor: item.id }, true)}>{item.text}</a>)}</nav></details>}
          <MarkdownView text={selected.text} source={selected.path} />
          <div className="document-end"><BookOpen size={17} /><span>已读至文档末尾</span><a href={assetUrl(selected.path)} target="_blank" rel="noreferrer">打开原文</a></div>
        </article>
        {toc.length > 0 && <aside className="document-toc"><span>本页章节</span>{toc.map(item => <a key={item.id} className={`depth-${item.depth}`} href={href('/docs', { anchor: item.id }, true)}>{item.text}</a>)}</aside>}
      </> : <div className="document-index"><div className="document-index-heading"><h2>{group || (query ? '搜索结果' : '全部文档')}</h2><span>{filtered.length} 份</span></div>{selectedPath && <p className="inline-error">未找到文档：{selectedPath}</p>}{!filtered.length ? <div className="empty-state"><Search size={30} /><h2>没有匹配的文档</h2><p>尝试更短的搜索词，或切换分组。</p></div> : groups.filter(name => sorted.some(doc => doc.group === name)).map(name => <section className="doc-group-section" key={name}><h3>{name}<span>{sorted.filter(doc => doc.group === name).length}</span></h3>{sorted.filter(doc => doc.group === name).map(doc => <a key={doc.path} className="doc-row" href={href('/docs', { file: doc.path }, true)}><FileText size={18} /><div><strong>{doc.title}</strong><small>{doc.path}</small></div><ArrowRight size={16} /></a>)}</section>)}</div>}
    </div>
  </>;
}
