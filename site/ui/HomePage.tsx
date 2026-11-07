import { LinkButton } from "@/ui/LinkButton";
import { useMemo } from "react";
import { Badge } from "@/registry/components/badge/badge";
import { SearchField } from "@/registry/components/search-field/search-field";
import { BookOpen, ChevronRight } from "./icons";
import { href, navigate, useRoute, withParams } from "../core/router";
import { matches, terms } from "../core/search";
import { useFavorites } from "../core/store";
import { KINDS, KIND_NAME } from "../core/types";
import { EntryCard } from "./blocks";
import { useAtlas } from "./context";

export function HomePage() {
  const { data, name, tagline, facets, tools } = useAtlas();
  const route = useRoute();
  const fav = useFavorites();
  const q = route.params.get("q") ?? "";
  const results = useMemo(() => {
    const ts = terms(q);
    return ts.length ? KINDS.map(k => ({ kind: k, items: data[k].filter(e => matches(e, ts)) })) : null;
  }, [q, data]);
  const guides = data.docs.filter(d => d.path.startsWith("docs/") && !d.path.slice(5).includes("/")).slice(0, 6);
  const favEntries = KINDS.flatMap(k => fav[k].slice(-4).map(id => ({ kind: k, e: data[k].find(x => x.id === id) }))).filter(x => x.e).slice(0, 8);

  return (
    <div className="page home-page">
      <header className="home-hero">
        <p className="eyebrow">{tagline}</p>
        <h1>{name}</h1>
        <p className="home-lede">
          {KINDS.map(k => `${data[k].length} 个${KIND_NAME[k]}`).join(" · ")} · {data.docs.length} 份文档
        </p>
        <div className="search-wrap home-search"><SearchField label="搜索全部条目" placeholder="搜索标题、摘要、标签与拆解，多个词用空格分隔" value={q} onValueChange={v => navigate(withParams(route, { q: v }), { replace: true })} /></div>
      </header>

      {results ? (
        <div className="home-results">
          {results.map(r => (
            <section key={r.kind} className="home-block">
              <header className="block-head">
                <h2>{KIND_NAME[r.kind]} <span className="muted">{r.items.length}</span></h2>
                {r.items.length ? <LinkButton variant="ghost" size="sm" href={href(`/${r.kind}`, { q })}>在{KIND_NAME[r.kind]}中查看全部 <ChevronRight aria-hidden="true" /></LinkButton> : null}
              </header>
              {r.items.length ? <div className="card-grid">{r.items.slice(0, 4).map(e => <EntryCard key={e.id} kind={r.kind} e={e} layout="grid" />)}</div> : <p className="muted">没有匹配项。</p>}
            </section>
          ))}
        </div>
      ) : (
        <>
          <section className="home-kinds">
            {KINDS.map(k => {
              const f = facets[k][0]!;
              const values = [...new Set(data[k].flatMap(f.values))];
              return (
                <article key={k} className="kind-tile">
                  <a className="kind-tile-main" href={`#/${k}`}>
                    <div className="kind-covers">
                      {data[k].filter(e => e.$.preview).slice(0, 3).map(e => <img key={e.id} src={e.$.preview!} alt="" loading="lazy" />)}
                    </div>
                    <h2>{KIND_NAME[k]} <span className="muted">{data[k].length}</span></h2>
                  </a>
                  <p className="muted">按{f.label}</p>
                  <div className="tile-chips">
                    {values.slice(0, 8).map(v => <a key={v} className="badge-link" href={href(`/${k}`, { [f.key]: v })}><Badge size="md">{f.display(v)}</Badge></a>)}
                  </div>
                </article>
              );
            })}
          </section>

          {favEntries.length ? (
            <section className="home-block">
              <header className="block-head"><h2>最近收藏</h2><LinkButton variant="ghost" size="sm" href="#/favorites">全部收藏 <ChevronRight aria-hidden="true" /></LinkButton></header>
              <div className="card-grid">{favEntries.map(({ kind, e }) => <EntryCard key={kind + e!.id} kind={kind} e={e!} layout="grid" />)}</div>
            </section>
          ) : null}

          <div className="home-split">
            <section className="home-block">
              <header className="block-head"><h2>指南</h2><LinkButton variant="ghost" size="sm" href="#/docs">全部文档 <ChevronRight aria-hidden="true" /></LinkButton></header>
              <ul className="link-list">
                {guides.map(d => <li key={d.path}><a href={href("/docs", { path: d.path })}><BookOpen aria-hidden="true" /> <span>{d.title}</span></a></li>)}
              </ul>
            </section>
            <section className="home-block">
              <header className="block-head"><h2>工具</h2></header>
              <ul className="tool-list">
                {tools.map(t => (
                  <li key={t.id}>
                    <a href={`#/tools/${t.id}`}><span className="nav-icon" aria-hidden="true">{t.icon}</span><span><strong>{t.title}</strong><span className="muted">{t.description}</span></span></a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
