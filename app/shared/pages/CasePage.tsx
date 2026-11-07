import { useEffect } from "react";
import type { ReactNode } from "react";
import { ListTree } from "lucide-react";
import { Button } from "@/components/button/button";
import { CopyButton } from "@/components/copy-button/copy-button";
import { useAtlas } from "../lib/atlas-context";
import { Link, useRouter } from "../lib/router";
import type { AtlasEntry } from "../types";
import {
  allPatternsForCase,
  formatDate,
  formatDuration,
  formatTimecode,
  entryHref
} from "../lib/format";
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
  AttributionList,
  BeatTable,
  ConstraintColumns,
  EnergySegments,
  LinkChips,
  MigrationList,
  ObservationList,
  PathLink,
  SourceList,
  TokenSection
} from "../components/DetailParts";
import { FavoriteButton } from "../components/EntryCard";
import { CompareButton } from "../components/EntryCard";
import { WebDemo } from "../components/WebDemo";
import { MotionPlayer } from "../components/MotionPlayer";
import { NotFoundPage } from "./NotFoundPage";

function documentLinks(entry: AtlasEntry, kind: "cases" | "patterns" | "materials") {
  const links: { path: string; label: string }[] = [];
  if (entry.research) links.push({ path: entry.research, label: "研究说明" });
  if (entry.fidelity) links.push({ path: entry.fidelity, label: "复刻对照" });
  if (!entry.research && kind === "cases") links.push({ path: `docs/cases/${entry.id}.md`, label: "研究说明" });
  links.push({ path: `prompts/${kind}/${entry.id}.md`, label: "Prompt 原文" });
  if (kind !== "patterns") links.push({ path: `demos/${kind}/${entry.id}/LICENSES.md`, label: "许可索引" });
  if (kind === "cases" && entry.assetManifest) links.push({ path: entry.assetManifest, label: "素材清单" });
  return links;
}

function RelatedPatternLinks({ entry }: { entry: AtlasEntry }) {
  const { meta, site } = useAtlas();
  const patterns =
    site.library === "web"
      ? allPatternsForCase(meta.entries.patterns, entry)
      : (entry.patternIds ?? [])
          .map((id) => meta.entries.patterns.find((pattern) => pattern.id === id))
          .filter((pattern): pattern is AtlasEntry => Boolean(pattern));
  if (!patterns.length) return null;
  const shown = patterns.slice(0, 8);
  return (
    <div className="asideRelated">
      <LinkChips
        items={shown.map((pattern) => ({
          to: entryHref("patterns", pattern.id),
          label: pattern.title,
          sub: pattern.category
        }))}
      />
      {patterns.length > shown.length && (
        <Link className="asideMoreLink" to={`/browse?type=patterns&caseId=${encodeURIComponent(entry.id)}`}>
          查看全部 {patterns.length} 个关联巧思 ↗
        </Link>
      )}
    </div>
  );
}

function RelatedEntryLinks({ entry }: { entry: AtlasEntry }) {
  const { meta } = useAtlas();
  const related = (entry.relatedEntries ?? [])
    .map((item) => {
      if (item.kind !== "case" && item.kind !== "pattern" && item.kind !== "material") return null;
      const kind = item.kind === "case" ? "cases" : item.kind === "pattern" ? "patterns" : "materials";
      const target = meta.entries[kind].find((candidate) => candidate.id === item.id);
      if (!target) return null;
      return { kind, id: target.id, title: target.title, note: item.note, href: entryHref(kind, target.id) };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  if (!related.length) return null;
  return (
    <div className="asideRelated">
      {related.map((item) => (
        <Link className="asideRelatedItem" key={`${item.kind}-${item.id}`} to={item.href}>
          <span>{item.title}</span>
          <small>{item.note}</small>
        </Link>
      ))}
    </div>
  );
}

function CaseAside({ entry, kind }: { entry: AtlasEntry; kind: "cases" | "patterns" | "materials" }) {
  const { meta, site } = useAtlas();
  const links = documentLinks(entry, "cases").filter((link) => meta.docs.some((doc) => doc.path === link.path) || !link.path.endsWith(".md"));
  const sourceFiles = entry.sourceFiles ?? [];
  return (
    <aside className="detailAside">
      <div className="asideSection">
        <span className="monoLabel">DOCUMENTS</span>
        <h2>资料</h2>
        <div className="asideLinks">
          {links.map((link) => <PathLink key={link.path} path={link.path} label={link.label} />)}
        </div>
      </div>

      <div className="asideSection">
        <span className="monoLabel">AGENT BUNDLE</span>
        <h2>交给 Agent</h2>
        <p className="asideCopy">下载该条目的结构化 JSON 资料包，含说明、文档、Prompt 与文件清单。</p>
        <AgentDownload kind="cases" id={entry.id} />
      </div>

      <div className="asideSection">
        <span className="monoLabel">RELATED</span>
        <h2>关联巧思</h2>
        <RelatedPatternLinks entry={entry} />
        {(entry.relatedEntries?.length ?? 0) > 0 && (
          <>
            <h3 className="asideSubhead">关联条目</h3>
            <RelatedEntryLinks entry={entry} />
          </>
        )}
      </div>

      <div className="asideSection">
        <span className="monoLabel">RECORD</span>
        <h2>条目记录</h2>
        <dl className="asideMeta">
          {entry.capturedAt && <div><dt>采集日期</dt><dd>{formatDate(entry.capturedAt)}</dd></div>}
          {entry.implementation && <div><dt>实现类别</dt><dd>{entry.implementation}</dd></div>}
          {entry.studyScope && <div><dt>研究范围</dt><dd>{entry.studyScope}</dd></div>}
          {entry.edition && <div><dt>版本</dt><dd>{entry.edition}</dd></div>}
          {entry.theoryVerifiedAt && <div><dt>理论核验</dt><dd>{formatDate(entry.theoryVerifiedAt)}</dd></div>}
          {entry.referenceUrl && <div><dt>原始参考</dt><dd><ExternalLink href={entry.referenceUrl}>打开参考页</ExternalLink></dd></div>}
          {entry.referencePreview && (
            <div>
              <dt>原站截图</dt>
              <dd><PathLink path={entry.referencePreview} label="打开截图" /></dd>
            </div>
          )}
          {entry.referencePreviewNote && <div><dt>截图说明</dt><dd>{entry.referencePreviewNote}</dd></div>}
          {site.library === "motion" && entry.en && <div><dt>英文名</dt><dd>{entry.en}</dd></div>}
          {site.library === "motion" && entry.timeline !== undefined && <div><dt>时间轴</dt><dd>{entry.timeline ? "可定位" : "不可定位"}</dd></div>}
          {site.library === "motion" && entry.kit !== undefined && <div><dt>MotionKit</dt><dd>{entry.kit ? "使用" : "不使用"}</dd></div>}
          {site.library === "motion" && entry.renderer && <div><dt>渲染器</dt><dd>{entry.renderer}</dd></div>}
          {site.library === "motion" && entry.previewAt !== undefined && <div><dt>预览截帧</dt><dd>{formatTimecode(entry.previewAt)}</dd></div>}
          {site.library === "motion" && entry.previewAtPortrait !== undefined && <div><dt>竖屏截帧</dt><dd>{formatTimecode(entry.previewAtPortrait)}</dd></div>}
        </dl>
        {sourceFiles.length > 0 && (
          <>
            <h3 className="asideSubhead">取材文件</h3>
            <div className="asideFileList">
              {sourceFiles.map((path) => <PathLink key={path} path={path} label={path.split("/").pop() ?? path} />)}
            </div>
          </>
        )}
      </div>

      <div className="asideSection asideSectionQuiet">
        <span className="monoLabel">{site.brand}</span>
        <p className="asideCopy">条目编号 {String(entry.order).padStart(3, "0")}。链接和筛选状态可以直接分享。</p>
        <CopyPageLink label="复制本页链接" />
      </div>
    </aside>
  );
}

function WebCaseAnalysis({ entry }: { entry: AtlasEntry }) {
  const { meta } = useAtlas();
  const labels = meta.labels;
  return (
    <>
      <AnalysisSection index="01" title="设计机制">
        {entry.productFocus && <p className="leadParagraph">{entry.productFocus}</p>}
        <BulletList items={entry.principles} />
      </AnalysisSection>
      <AnalysisSection index="02" title="交互与响应">
        <BulletList items={entry.interaction} className="interactionList" />
      </AnalysisSection>
      <AnalysisSection index="03" title="构成拆解">
        <DefinitionGrid
          items={Object.entries(entry.composition ?? {}).map(([key, value]) => ({
            label: labelFor(labels, "cases", "composition", key),
            value
          }))}
        />
      </AnalysisSection>
      <AnalysisSection index="04" title="主题与声音">
        {entry.theme && <p className="leadParagraph">{entry.theme}</p>}
        <div className="twoColumnNotes">
          <div className="noteBlock">
            <span className="monoLabel">THEME / 主题</span>
            <DefinitionGrid
              items={[
                { label: "模式", value: labelFor(labels, "cases", "themeBehavior.mode", entry.themeBehavior?.mode ?? "") },
                { label: "默认", value: entry.themeBehavior?.default },
                { label: "控制", value: entry.themeBehavior?.control },
                { label: "设计理由", value: entry.themeBehavior?.designReason }
              ]}
            />
          </div>
          <div className="noteBlock">
            <span className="monoLabel">SOUND / 声音</span>
            <DefinitionGrid
              items={[
                { label: "类别", value: labelFor(labels, "cases", "soundBehavior.kind", entry.soundBehavior?.kind ?? "") },
                { label: "控制", value: entry.soundBehavior?.control },
                { label: "交互作用", value: entry.soundBehavior?.interactionRole }
              ]}
            />
          </div>
        </div>
      </AnalysisSection>
      <AnalysisSection index="05" title="色板与 Token">
        <TokenSection entry={entry} />
      </AnalysisSection>
      <AnalysisSection index="06" title="适用与限制">
        <ConstraintColumns entry={entry} />
      </AnalysisSection>
      <AnalysisSection index="07" title="来源与证据">
        <SourceList entry={entry} kind="cases" />
      </AnalysisSection>
      <AnalysisSection index="08" title="改造练习与迁移">
        {entry.exercise && <p className="exerciseText">{entry.exercise}</p>}
        <MigrationList entry={entry} />
      </AnalysisSection>
      <AnalysisSection index="09" title="实现 Prompt">
        <div className="promptStack">
          <PromptBlock title="实现与复用 Prompt" text={entry.prompt} />
          <PromptBlock title="负向约束" text={entry.negativePrompt} tone="negative" />
        </div>
      </AnalysisSection>
    </>
  );
}

function MotionCaseAnalysis({ entry }: { entry: AtlasEntry }) {
  const { meta } = useAtlas();
  const labels = meta.labels;
  return (
    <>
      <AnalysisSection index="01" title="视觉重点与观察">
        {entry.focus && <p className="leadParagraph">{entry.focus}</p>}
        <ObservationList entry={entry} />
      </AnalysisSection>
      <AnalysisSection index="02" title="节奏结构">
        <div className="rhythmSummary">
          <div>
            <span className="monoLabel">DURATION</span>
            <strong>{formatDuration(entry.rhythm?.duration ?? 0)}</strong>
          </div>
          <div>
            <span className="monoLabel">BPM</span>
            <strong>{entry.rhythm?.bpm ?? "—"}</strong>
          </div>
          <div>
            <span className="monoLabel">BEATS</span>
            <strong>{entry.rhythm?.beats.length ?? 0}</strong>
          </div>
          <div>
            <span className="monoLabel">ORIENTS</span>
            <strong>{(entry.orients ?? []).map((value) => value === "landscape" ? "横屏" : "竖屏").join(" / ") || "自适应"}</strong>
          </div>
        </div>
        <BeatTable entry={entry} />
        <EnergySegments entry={entry} />
        {!entry.energySegments?.length && entry.energyNote && <p className="energyNoteText">{entry.energyNote}</p>}
      </AnalysisSection>
      <AnalysisSection index="03" title="画面分层">
        {entry.layers?.length ? (
          <ol className="layerList">
            {entry.layers.map((layer, index) => (
              <li key={`${layer.name}-${index}`}>
                <span className="layerIndex">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{layer.name}</h3><p>{layer.role}</p></div>
              </li>
            ))}
          </ol>
        ) : null}
      </AnalysisSection>
      <AnalysisSection index="04" title="构成拆解">
        <DefinitionGrid
          items={Object.entries(entry.composition ?? {}).map(([key, value]) => ({
            label: labelFor(labels, "cases", "composition", key),
            value
          }))}
        />
      </AnalysisSection>
      <AnalysisSection index="05" title="色板与 Token">
        <TokenSection entry={entry} />
      </AnalysisSection>
      <AnalysisSection index="06" title="适用与限制">
        <ConstraintColumns entry={entry} />
      </AnalysisSection>
      <AnalysisSection index="07" title="实现 Prompt">
        <div className="promptStack">
          <PromptBlock title="实现与复用 Prompt" text={entry.prompt} />
          <PromptBlock title="视频生成 Prompt" text={entry.videoPrompt} eyebrow="VIDEO PROMPT" />
          <PromptBlock title="负向约束" text={entry.negativePrompt} tone="negative" />
        </div>
      </AnalysisSection>
      <AnalysisSection index="08" title="迁移指南">
        <MigrationList entry={entry} />
      </AnalysisSection>
      <AnalysisSection index="09" title="来源与署名">
        <SourceList entry={entry} kind="cases" />
        <AttributionList entry={entry} />
      </AnalysisSection>
    </>
  );
}

function ExternalLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return null;
  return <a className="externalInline" href={href} target="_blank" rel="noreferrer noopener">{children} ↗</a>;
}

export function CasePage({ id }: { id: string }) {
  const { meta, site } = useAtlas();
  const entry = meta.entries.cases.find((item) => item.id === id);
  const { navigate } = useRouter();

  useEffect(() => {
    if (entry) document.title = `${entry.title} · ${site.brand}`;
  }, [entry, site.brand]);

  if (!entry) return <NotFoundPage />;

  const facts = (
    site.library === "web"
      ? [
          { label: "分类", value: labelFor(meta.labels, "cases", "category", entry.category ?? "") },
          { label: "地区", value: entry.country },
          { label: "采集", value: entry.capturedAt ? formatDate(entry.capturedAt) : "" },
          { label: "主题", value: labelFor(meta.labels, "cases", "themeBehavior.mode", entry.themeBehavior?.mode ?? "") }
        ]
      : [
          { label: "画面风格", value: labelFor(meta.labels, "cases", "style", entry.style ?? "") },
          { label: "用途", value: labelFor(meta.labels, "cases", "purpose", entry.purpose ?? "") },
          { label: "载体", value: (entry.carriers ?? []).map((value) => labelFor(meta.labels, "cases", "carriers", value)).join(" · ") },
          { label: "技术", value: (entry.tech ?? []).map((value) => labelFor(meta.labels, "cases", "tech", value)).join(" · ") }
        ]
  ).filter((fact) => Boolean(fact.value));

  const promptValue =
    site.library === "web" && entry.negativePrompt
      ? `${entry.prompt}\n\n---\n负向约束\n${entry.negativePrompt}`
      : entry.prompt;

  return (
    <div className="detailPage casePage">
      <Breadcrumbs kind="cases" current={entry.title} />
      <DetailHero
        kind="cases"
        title={entry.title}
        subtitle={entry.subtitle}
        summary={entry.summary}
        tags={entry.tags}
        facts={facts}
        actions={
          <>
            <FavoriteButton kind="cases" id={entry.id} />
            <CompareButton id={entry.id} />
            <CopyPageLink label="分享" />
            {promptValue && <CopyButton value={promptValue} label="复制 Prompt" />}
            <AgentDownload kind="cases" id={entry.id} />
            {entry.research && (
              <Button variant="ghost" size="sm" onClick={() => navigate(`/docs?path=${encodeURIComponent(entry.research!)}`)}>
                <ListTree size={15} strokeWidth={1.7} aria-hidden="true" />
                研究报告
              </Button>
            )}
          </>
        }
        metaNote={
          <div className="heroAccentNote">
            <span className="accentChip" style={{ background: entry.accent }} aria-hidden="true" />
            <span>强调色 {entry.accent}</span>
            {site.library === "motion" && <span>时长 {formatDuration(entry.rhythm?.duration ?? 0)}</span>}
          </div>
        }
      />

      {site.library === "web" ? <WebDemo entry={entry} /> : <MotionPlayer entry={entry} kind="cases" />}

      <div className="detailBodyLayout">
        <div className="detailContent">
          <SectionTitle index="00" title="完整拆解" aside={<span className="sectionAsideText">字段来自条目原文</span>} />
          {site.library === "web" ? <WebCaseAnalysis entry={entry} /> : <MotionCaseAnalysis entry={entry} />}
        </div>
        <CaseAside entry={entry} kind="cases" />
      </div>
    </div>
  );
}