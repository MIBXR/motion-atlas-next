import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, FlaskConical, Layers3 } from "lucide-react";
import { SearchField } from "@/components/search-field/search-field";
import SegmentedControl from "@/components/segmented-control/segmented-control";
import { Button } from "@/components/button/button";
import { useAtlas } from "../lib/atlas-context";
import { Link, useRouter } from "../lib/router";
import type { EntryKind } from "../types";
import { EntryCard, EntryRow, CoverImage } from "../components/EntryCard";
import { SectionTitle } from "../components/PageBits";
import { atlasUrl, entryHref, formatNumber, padNumber } from "../lib/format";

function IndexStamp() {
  const { site } = useAtlas();
  return (
    <svg className="indexStamp" viewBox="0 0 132 132" aria-hidden="true">
      <defs>
        <path id="atlas-stamp-path" d="M 66,66 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" />
      </defs>
      <circle cx="66" cy="66" r="62" fill="none" stroke="currentColor" strokeOpacity=".4" strokeDasharray="2 5" />
      <circle cx="66" cy="66" r="54" fill="none" stroke="currentColor" strokeOpacity=".25" />
      <text className="stampText">
        <textPath href="#atlas-stamp-path" startOffset="2%">
          设计参考 · {site.brand} · 第 {site.volume} 卷
        </textPath>
      </text>
      <circle cx="66" cy="66" r="24" fill="var(--accent)" />
      <text x="66" y="73" textAnchor="middle" className="stampNumber">{site.volume}</text>
      <path d="M66 6v9M66 117v9M6 66h9M117 66h9" stroke="currentColor" strokeWidth="1" opacity=".5" />
    </svg>
  );
}

function HeroSearch() {
  const { site, meta } = useAtlas();
  const { navigate } = useRouter();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<EntryKind>("cases");

  function submit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams({ type: scope });
    if (query.trim()) params.set("q", query.trim());
    navigate(`/browse?${params.toString()}`);
  }

  return (
    <form className="heroSearch" onSubmit={submit} role="search">
      <div className="heroSearchRow">
        <SearchField
          label="搜索参考库"
          value={query}
          onValueChange={setQuery}
          placeholder={site.searchPlaceholder}
          autoComplete="off"
        />
        <Button type="submit" variant="primary" size="md">检索</Button>
      </div>
      <div className="heroSearchMeta">
        <SegmentedControl
          label="搜索范围"
          options={[
            { value: "cases", label: "案例" },
            { value: "patterns", label: "巧思" },
            { value: "materials", label: "素材" }
          ]}
          value={scope}
          onValueChange={(value) => setScope(value as EntryKind)}
        />
        <span className="searchHint">多个词以空格分隔，全部命中才显示</span>
      </div>
    </form>
  );
}

export function HomePage() {
  const { site, meta } = useAtlas();
  const featured = useMemo(
    () =>
      site.featuredCases
        .map((id) => meta.entries.cases.find((entry) => entry.id === id))
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
    [meta.entries.cases, site.featuredCases]
  );
  const hero = featured[0];
  const floating = featured[1];
  const caseCards = featured.slice(2, 5);
  const patterns = useMemo(() => meta.entries.patterns.slice(0, 4), [meta.entries.patterns]);
  const docs = useMemo(() => {
    const wanted =
      site.library === "web"
        ? ["docs/guide.md", "docs/overview.md", "docs/agent.md"]
        : ["docs/guide.md", "docs/rhythm.md", "docs/methodology.md"];
    return wanted
      .map((path) => meta.docs.find((doc) => doc.path === path))
      .filter((doc): doc is NonNullable<typeof doc> => Boolean(doc));
  }, [meta.docs, site.library]);

  const categories: { kind: EntryKind; label: string; description: string }[] = [
    { kind: "cases", label: "案例", description: site.caseLead },
    { kind: "patterns", label: "巧思", description: site.patternLead },
    { kind: "materials", label: "素材", description: site.materialLead }
  ];

  return (
    <div className="homePage">
      <section className="homeHero">
        <div className="homeUtility">
          <span className="monoLabel">ATLAS / {site.volume} / INDEX</span>
          <span className="homeUtilityCenter">观察 · 拆解 · 复用</span>
          <span className="monoLabel">{site.snapshot}</span>
        </div>

        <div className="homeHeroGrid">
          <div className="homeCopy">
            <p className="homeEyebrow">
              <span className="eyebrowDot" aria-hidden="true" />
              <span>{site.brand}</span>
              <span className="eyebrowDivider" aria-hidden="true">/</span>
              <span>{site.kicker}</span>
            </p>
            <h1 className="homeHeadline">
              {site.headline.map((line, index) => (
                <span className={`headlineLine ${index === site.headlineEmphasis ? "is-emphasis" : ""}`} key={line}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="homeIntro">{site.intro}</p>
            <HeroSearch />
            <div className="homeQuickLinks">
              {site.quickLinks.map((item) => (
                <Link key={item.to} to={item.to} className="textArrowLink">
                  {item.label}
                  <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="heroCanvas" aria-label="精选案例">
            {hero && (
              <div className="heroPrimaryCard">
                <Link to={entryHref("cases", hero.id)} className="heroImageLink">
                  <CoverImage src={hero.cover} alt={`${hero.title} 封面`} fallbackLabel={hero.title} />
                  <span className="heroImageIndex">NO. {padNumber(hero.order)}</span>
                  <span className="heroOpenMark" aria-hidden="true">
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                  </span>
                </Link>
                <div className="heroCaption">
                  <span className="monoLabel">SELECTED CASE / {site.volume}</span>
                  <h2>{hero.title}</h2>
                  <div className="heroCaptionFoot">
                    <span>{hero.category ?? hero.style}</span>
                    <Link to={entryHref("cases", hero.id)}>打开案例</Link>
                  </div>
                </div>
              </div>
            )}
            {floating && (
              <Link to={entryHref("cases", floating.id)} className="heroSecondaryCard">
                <CoverImage src={floating.cover} alt={`${floating.title} 封面`} fallbackLabel={floating.title} />
                <span className="heroSecondaryLabel">
                  <span className="monoLabel">ALSO / {padNumber(floating.order)}</span>
                  <span>{floating.title}</span>
                </span>
              </Link>
            )}
            <div className="heroStampWrap">
              <IndexStamp />
            </div>
            <div className="heroFieldNote">
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              <p>案例看实现，巧思看机制，素材看取用方式。</p>
            </div>
          </div>
        </div>

        <div className="homeStatBar">
          {(["cases", "patterns", "materials"] as EntryKind[]).map((kind) => (
            <Link to={`/browse?type=${kind}`} className="heroStat" key={kind}>
              <span className="heroStatNumber">{String(meta.counts[kind]).padStart(3, "0")}</span>
              <span className="heroStatMeta">
                <strong>{kind === "cases" ? "案例" : kind === "patterns" ? "巧思" : "素材"}</strong>
                <small>{kind === "cases" ? "可运行复刻" : kind === "patterns" ? "可单独借用" : "可取走复用"}</small>
              </span>
              <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          ))}
          <div className="heroStatAside">
            <span className="monoLabel">FIXED SNAPSHOT</span>
            <p>按编号与名称检索，筛选条件保留在链接里。</p>
            <Link className="textArrowLink" to="/browse?type=cases">
              打开全部索引 <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="homeIndexSection">
        <SectionTitle
          index="00"
          title="从哪里开始"
          aside={<span className="sectionAsideText">三条入口，共用同一套内容与资料</span>}
        />
        <div className="indexTiles">
          {categories.map((category, index) => {
            const cover = meta.entries[category.kind].find((entry) => entry.cover)?.cover;
            return (
              <Link to={`/browse?type=${category.kind}`} className={`indexTile kind-${category.kind}`} key={category.kind}>
                <span className="indexTileNumber">{padNumber(index + 1, 2)}</span>
                <div className="indexTileMain">
                  <div className="indexTileTop">
                    <h2>{category.label}</h2>
                    <span className="indexTileCount">{formatNumber(meta.counts[category.kind])}</span>
                  </div>
                  <p>{category.description}</p>
                  <span className="indexTileAction">
                    进入{category.label}索引 <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
                {cover && (
                  <span className="indexTileCover" aria-hidden="true">
                    <CoverImage src={cover} alt="" fallbackLabel="" />
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="homeSection">
        <SectionTitle
          index="01"
          title={site.library === "web" ? "值得先看的案例" : "先看这几条时间线"}
          aside={
            <Link className="textArrowLink" to="/browse?type=cases">
              全部案例 <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          }
        />
        <div className="featuredCaseGrid">
          {caseCards.map((entry) => (
            <EntryCard entry={entry} kind="cases" key={entry.id} />
          ))}
        </div>
      </section>

      <section className="homeSplit">
        <div className="homeSplitMain">
          <SectionTitle
            index="02"
            title="机制摘录"
            aside={
              <Link className="textArrowLink" to="/browse?type=patterns">
                全部巧思 <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            }
          />
          <div className="patternRows">
            {patterns.map((entry) => (
              <EntryRow entry={entry} kind="patterns" key={entry.id} />
            ))}
          </div>
        </div>
        <aside className="homeDocsPanel">
          <SectionTitle
            index="03"
            title="阅读室"
            aside={
              <Link className="iconLink" to="/docs" aria-label="打开文档库">
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            }
          />
          <div className="homeDocsList">
            {docs.map((doc) => (
              <Link to={`/docs?path=${encodeURIComponent(doc.path)}`} className="homeDocItem" key={doc.path}>
                <span className="homeDocGroup">{doc.group}</span>
                <strong>{doc.title}</strong>
                <small>{doc.excerpt}</small>
              </Link>
            ))}
          </div>
          <Link className="docsPanelButton" to="/docs">
            <BookOpen size={15} strokeWidth={1.7} aria-hidden="true" />
            浏览 {meta.docs.length} 份文档
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section className="homeToolStrip">
        <Link to="/lab" className="toolCard">
          <span className="toolIcon"><FlaskConical size={20} strokeWidth={1.5} aria-hidden="true" /></span>
          <div>
            <span className="monoLabel">ROOM / 预留</span>
            <h3>{site.labTitle}</h3>
            <p>{site.labDescription}</p>
          </div>
          <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" className="toolArrow" />
        </Link>
        <Link to="/workflow" className="toolCard">
          <span className="toolIcon"><Layers3 size={20} strokeWidth={1.5} aria-hidden="true" /></span>
          <div>
            <span className="monoLabel">AGENT / 预留</span>
            <h3>{site.workflowTitle}</h3>
            <p>{site.workflowDescription}</p>
          </div>
          <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" className="toolArrow" />
        </Link>
      </section>
    </div>
  );
}