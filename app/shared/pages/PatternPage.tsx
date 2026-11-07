import { useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight, Link2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button/copy-button";
import { useAtlas } from "../lib/atlas-context";
import { Link } from "../lib/router";
import type { AtlasEntry } from "../types";
import { entryHref, formatTimecode } from "../lib/format";
import { labelFor } from "../lib/filters";
import {
  AnalysisSection,
  AgentDownload,
  Breadcrumbs,
  BulletList,
  CopyPageLink,
  DefinitionGrid,
  DetailHero,
  PromptBlock,
  SectionTitle
} from "../components/PageBits";
import {
  ConstraintColumns,
  LinkChips,
  MigrationList,
  PathLink,
  SourceList,
  TokenSection
} from "../components/DetailParts";
import { FavoriteButton } from "../components/EntryCard";
import { MotionPlayer } from "../components/MotionPlayer";
import { WebPatternLocator } from "../components/WebPatternLocator";
import { NotFoundPage } from "./NotFoundPage";

function relatedPatternItems(entry: AtlasEntry, meta: ReturnType<typeof useAtlas>["meta"], relation: "pairs" | "conflicts") {
  const value = relation === "pairs" ? entry.composition?.pairsWellWith : entry.composition?.conflicts;
  const ids = Array.isArray(value) ? value : [];
  return ids
    .map((id) => {
      const pattern = meta.entries.patterns.find((item) => item.id === id);
      return pattern ? { to: entryHref("patterns", pattern.id), label: pattern.title, sub: pattern.category } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

function sourceCaseItems(entry: AtlasEntry, meta: ReturnType<typeof useAtlas>["meta"]) {
  const unique = [...new Set((entry.sources ?? []).map((source) => source.caseId).filter(Boolean))] as string[];
  return unique
    .map((id) => meta.entries.cases.find((item) => item.id === id))
    .filter((item): item is AtlasEntry => Boolean(item))
    .map((item) => ({ to: entryHref("cases", item.id), label: item.title }));
}

function PatternAside({ entry }: { entry: AtlasEntry }) {
  const { meta, site } = useAtlas();
  const documents = [
    { path: `prompts/patterns/${entry.id}.md`, label: "Prompt 原文" },
    ...(meta.docs.some((doc) => doc.path === `docs/patterns/${entry.id}.md`) ? [{ path: `docs/patterns/${entry.id}.md`, label: "巧思研究" }] : []),
    ...(meta.docs.some((doc) => doc.path === `demos/patterns/${entry.id}/LICENSES.md`) ? [{ path: `demos/patterns/${entry.id}/LICENSES.md`, label: "许可索引" }] : [])
  ].filter((doc) => meta.docs.some((item) => item.path === doc.path));
  const pairs = relatedPatternItems(entry, meta, "pairs");
  const conflicts = relatedPatternItems(entry, meta, "conflicts");
  const sources = sourceCaseItems(entry, meta);
  return (
    <aside className="detailAside">
      <div className="asideSection">
        <span className="monoLabel">DOCUMENTS</span>
        <h2>资料</h2>
        <div className="asideLinks">
          {documents.map((doc) => <PathLink key={doc.path} path={doc.path} label={doc.label} />)}
        </div>
      </div>
      <div className="asideSection">
        <span className="monoLabel">{site.library === "web" ? "SOURCE CASES" : "SOURCE"}</span>
        <h2>来源案例</h2>
        <LinkChips items={sources} empty={<p className="asideCopy">未记录来源案例。</p>} />
        {site.library === "motion" && entry.locator && <p className="asideCodeNote">源码定位：<code>{entry.locator}</code></p>}
      </div>
      <div className="asideSection">
        <span className="monoLabel">RELATIONS</span>
        <h2>组合关系</h2>
        {pairs.length > 0 && <><h3 className="asideSubhead">适合组合</h3><LinkChips items={pairs} /></>}
        {conflicts.length > 0 && <><h3 className="asideSubhead">相冲</h3><LinkChips items={conflicts} /></>}
        {!pairs.length && !conflicts.length && <p className="asideCopy">暂无其他巧思的组合记录。</p>}
      </div>
      <div className="asideSection">
        <span className="monoLabel">AGENT BUNDLE</span>
        <h2>交给 Agent</h2>
        <p className="asideCopy">资料包包含机制、参数、来源、文档与原 Prompt。</p>
        <AgentDownload kind="patterns" id={entry.id} />
      </div>
      <div className="asideSection">
        <span className="monoLabel">RECORD</span>
        <h2>条目记录</h2>
        <dl className="asideMeta">
          <div><dt>编号</dt><dd>{String(entry.order).padStart(3, "0")}</dd></div>
          <div><dt>来源案例</dt><dd>{new Set((entry.sources ?? []).map((source) => source.caseId)).size} 个</dd></div>
          {entry.previewAt !== undefined && <div><dt>预览截帧</dt><dd>{formatTimecode(entry.previewAt)}</dd></div>}
          {entry.previewAtPortrait !== undefined && <div><dt>竖屏截帧</dt><dd>{formatTimecode(entry.previewAtPortrait)}</dd></div>}
          {site.library === "motion" && entry.renderer && <div><dt>渲染器</dt><dd>{entry.renderer}</dd></div>}
          {site.library === "motion" && entry.timeline !== undefined && <div><dt>时间轴</dt><dd>{entry.timeline ? "可定位" : "不可定位"}</dd></div>}
          {site.library === "motion" && entry.kit !== undefined && <div><dt>MotionKit</dt><dd>{entry.kit ? "使用" : "不使用"}</dd></div>}
          {entry.orients?.length ? <div><dt>画幅</dt><dd>{entry.orients.map((value) => value === "landscape" ? "横屏" : "竖屏").join(" / ")}</dd></div> : null}
          {(entry.markers?.length ?? 0) > 0 && <div><dt>节拍标记</dt><dd>{entry.markers?.length} 个</dd></div>}
        </dl>
        {entry.sourceFiles?.length ? (
          <>
            <h3 className="asideSubhead">取材文件</h3>
            <div className="asideFileList">
              {entry.sourceFiles.map((path) => <PathLink key={path} path={path} label={path.split("/").pop() ?? path} />)}
            </div>
          </>
        ) : null}
      </div>
      <div className="asideSection asideSectionQuiet">
        <span className="monoLabel">SHARE</span>
        <CopyPageLink label="复制本页链接" />
      </div>
    </aside>
  );
}

function SourceCaseStrip({ entry }: { entry: AtlasEntry }) {
  const { meta } = useAtlas();
  const sources = sourceCaseItems(entry, meta);
  if (!sources.length) return null;
  return (
    <div className="sourceCaseStrip">
      <span className="monoLabel">SOURCE CASES</span>
      {sources.map((source, index) => (
        <Link className="sourceCaseLink" to={source.to} key={source.to}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {source.label}
          <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

export function PatternPage({ id }: { id: string }) {
  const { meta, site } = useAtlas();
  const entry = meta.entries.patterns.find((item) => item.id === id);
  const labels = meta.labels;

  useEffect(() => {
    if (entry) document.title = `${entry.title} · ${site.brand}`;
  }, [entry, site.brand]);

  if (!entry) return <NotFoundPage />;

  const web = site.library === "web";
  const sourceCases = [...new Set((entry.sources ?? []).map((source) => source.caseId).filter(Boolean))];
  const facts = web
    ? [
        { label: "分类", value: entry.category },
        {
          label: "体验类型",
          value: (entry.experienceTypes ?? []).map((value) => labelFor(labels, "patterns", "experienceTypes", value)).join(" · ")
        },
        {
          label: "组合职责",
          value:
            typeof entry.composition?.role === "string"
              ? labelFor(labels, "patterns", "composition.role", entry.composition.role)
              : ""
        },
        { label: "来源案例", value: `${sourceCases.length} 个` }
      ]
    : [
        {
          label: "巧思类型",
          value: (entry.types ?? []).map((value) => labelFor(labels, "patterns", "types", value)).join(" · ")
        },
        {
          label: "载体",
          value: (entry.carriers ?? []).map((value) => labelFor(labels, "patterns", "carriers", value)).join(" · ")
        },
        {
          label: "组合职责",
          value:
            typeof entry.composition?.role === "string"
              ? labelFor(labels, "patterns", "composition.role", entry.composition.role)
              : ""
        },
        {
          label: "来源案例",
          value: sourceCaseItems(entry, meta)[0]?.label ?? ""
        }
      ];
  let sectionNumber = 1;
  const nextIndex = () => String(sectionNumber++).padStart(2, "0");
  const hasParameters = Boolean(entry.timing?.length || entry.parameters?.length);

  return (
    <div className="detailPage patternPage">
      <Breadcrumbs kind="patterns" current={entry.title} />
      <DetailHero
        kind="patterns"
        title={entry.title}
        summary={entry.summary}
        tags={entry.tags}
        facts={facts}
        actions={
          <>
            <FavoriteButton kind="patterns" id={entry.id} />
            <CopyPageLink label="分享" />
            {entry.prompt && <CopyButton value={entry.prompt} label="复制 Prompt" />}
            <AgentDownload kind="patterns" id={entry.id} />
          </>
        }
        metaNote={
          web ? (
            <span className="heroMetaInline"><span className="accentChip" style={{ background: entry.cover ? "var(--accent)" : "var(--line)" }} />在来源 Demo 中定位机制</span>
          ) : (
            <span className="heroMetaInline"><span className="accentChip" style={{ background: entry.cover ? "var(--accent)" : "var(--line)" }} />独立 Demo · 可按节拍定位</span>
          )
        }
      />

      {web ? <WebPatternLocator entry={entry} /> : <MotionPlayer entry={entry} kind="patterns" />}

      <div className="detailBodyLayout">
        <div className="detailContent">
          <SectionTitle index="00" title="机制拆解" aside={<span className="sectionAsideText">{web ? "含来源定位与组合关系" : "含时间参数与来源片段"}</span>} />
          <AnalysisSection index={nextIndex()} title="机制与触发">
            <p className="leadParagraph mechanismLead">{entry.mechanism}</p>
            <DefinitionGrid
              items={[
                { label: "触发", value: entry.trigger },
                { label: "效果", value: entry.effect }
              ]}
            />
            <SourceCaseStrip entry={entry} />
          </AnalysisSection>
          {hasParameters && (
            <AnalysisSection index={nextIndex()} title="参数与时序">
              {entry.timing?.length ? (
                <div className="parameterTable">
                  <span className="monoLabel">TIMING</span>
                  {entry.timing.map((item, index) => (
                    <div key={`${item.name}-${index}`}>
                      <span>{item.name}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              ) : null}
              {entry.parameters?.length ? (
                <div className="parameterTable">
                  <span className="monoLabel">PARAMETERS</span>
                  {entry.parameters.map((parameter, index) => (
                    <div key={`${parameter.name}-${index}`}>
                      <span>{parameter.name}</span>
                      <strong>{parameter.value}</strong>
                      {parameter.note && <p>{parameter.note}</p>}
                      {parameter.source && <code>{parameter.source}</code>}
                    </div>
                  ))}
                </div>
              ) : null}
            </AnalysisSection>
          )}
          <AnalysisSection index={nextIndex()} title="适用与限制">
            <ConstraintColumns entry={entry} />
          </AnalysisSection>
          <AnalysisSection index={nextIndex()} title="组合关系">
            <DefinitionGrid
              items={[
                {
                  label: "组合职责",
                  value:
                    typeof entry.composition?.role === "string"
                      ? labelFor(labels, "patterns", "composition.role", entry.composition.role)
                      : ""
                },
                { label: "说明", value: typeof entry.composition?.notes === "string" ? entry.composition.notes : "" }
              ]}
            />
            <div className="relationColumns">
              {relatedPatternItems(entry, meta, "pairs").length > 0 && (
                <div>
                  <span className="monoLabel">PAIRS WELL WITH / 适合组合</span>
                  <LinkChips items={relatedPatternItems(entry, meta, "pairs")} />
                </div>
              )}
              {relatedPatternItems(entry, meta, "conflicts").length > 0 && (
                <div>
                  <span className="monoLabel">CONFLICTS / 相冲</span>
                  <LinkChips items={relatedPatternItems(entry, meta, "conflicts")} />
                </div>
              )}
            </div>
          </AnalysisSection>
          {entry.tokens && (
            <AnalysisSection index={nextIndex()} title="色板与 Token">
              <TokenSection entry={entry} />
            </AnalysisSection>
          )}
          {!web && entry.sound && (
            <AnalysisSection index={nextIndex()} title="声音构成">
              <p className="leadParagraph">{entry.sound.description}</p>
              {entry.sound.voices?.length ? (
                <div className="voiceList">
                  <span className="monoLabel">VOICES</span>
                  {entry.sound.voices.map((voice) => <code key={voice}>{voice}</code>)}
                </div>
              ) : null}
              {entry.sound.score && <PathLink path={entry.sound.score} label="查看乐谱 JSON" />}
            </AnalysisSection>
          )}
          <AnalysisSection index={nextIndex()} title="实现 Prompt">
            <div className="promptStack">
              <PromptBlock title="实现与复用 Prompt" text={entry.prompt} />
              <PromptBlock title="视频生成 Prompt" text={entry.videoPrompt} eyebrow="VIDEO PROMPT" />
              <PromptBlock title="负向约束" text={entry.negativePrompt} tone="negative" />
            </div>
          </AnalysisSection>
          {!web && Array.isArray(entry.migration) && entry.migration.length ? (
            <AnalysisSection index={nextIndex()} title="迁移指南">
              <MigrationList entry={entry} />
            </AnalysisSection>
          ) : null}
          {entry.sources?.length ? (
            <AnalysisSection index={nextIndex()} title="来源与证据">
              <SourceList entry={entry} kind="patterns" showObservation />
            </AnalysisSection>
          ) : null}
        </div>
        <PatternAside entry={entry} />
      </div>
    </div>
  );
}