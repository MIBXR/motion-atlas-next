import { useEffect } from "react";
import { Boxes, FileText } from "lucide-react";
import { CopyButton } from "@/components/copy-button/copy-button";
import { useAtlas } from "../lib/atlas-context";
import { Link } from "../lib/router";
import type { AtlasEntry } from "../types";
import { atlasUrl, entryHref, formatDate } from "../lib/format";
import { labelFor } from "../lib/filters";
import {
  AnalysisSection,
  AgentDownload,
  Breadcrumbs,
  BulletList,
  CopyPageLink,
  DetailHero,
  PromptBlock,
  SectionTitle
} from "../components/PageBits";
import {
  AttributionList,
  ConstraintColumns,
  LinkChips,
  PathLink,
  SourceList
} from "../components/DetailParts";
import { FavoriteButton, CoverImage } from "../components/EntryCard";
import { Gallery } from "../components/Gallery";
import { MaterialDemo } from "../components/MaterialDemo";
import { OriginalReplicaCompare } from "../components/OriginalReplicaCompare";
import { NotFoundPage } from "./NotFoundPage";

function snapshotDocument(entry: AtlasEntry) {
  if (!entry.snapshotPath || !entry.snapshotEntry) return "";
  return `${entry.snapshotPath.replace(/\/?$/, "/")}${entry.snapshotEntry}`.replaceAll("//", "/").replace(":/", "://");
}

function relatedItems(entry: AtlasEntry, meta: ReturnType<typeof useAtlas>["meta"]) {
  return (entry.relatedEntries ?? [])
    .map((item) => {
      if (item.kind !== "case" && item.kind !== "pattern" && item.kind !== "material") return null;
      const kind = item.kind === "case" ? "cases" : item.kind === "pattern" ? "patterns" : "materials";
      const target = meta.entries[kind].find((candidate) => candidate.id === item.id);
      return target ? { to: entryHref(kind, target.id), label: target.title, sub: item.note } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

function MaterialAside({ entry }: { entry: AtlasEntry }) {
  const { meta, site } = useAtlas();
  const snapshot = snapshotDocument(entry);
  const docs = [
    { path: entry.research, label: "研究说明" },
    { path: entry.fidelity, label: "复刻对照" },
    { path: `prompts/materials/${entry.id}.md`, label: "Prompt 原文" },
    { path: snapshot, label: "素材原文" },
    { path: entry.snapshotPath ? `${entry.snapshotPath.replace(/\/?$/, "/")}LICENSES.md` : "", label: "许可原文" }
  ].filter((doc): doc is { path: string; label: string } => Boolean(doc.path) && meta.docs.some((item) => item.path === doc.path));
  const related = relatedItems(entry, meta);
  return (
    <aside className="detailAside">
      <div className="asideSection">
        <span className="monoLabel">DOCUMENTS</span>
        <h2>资料</h2>
        <div className="asideLinks">
          {docs.map((doc) => <PathLink key={doc.path} path={doc.path} label={doc.label} />)}
          {entry.preview && <PathLink path={entry.preview} label="封面原图" />}
          {entry.demo && <PathLink path={entry.demo} label="运行入口" />}
        </div>
      </div>
      <div className="asideSection">
        <span className="monoLabel">AGENT BUNDLE</span>
        <h2>交给 Agent</h2>
        <p className="asideCopy">资料包保留素材条款、安装方式、文件清单与原文。</p>
        <AgentDownload kind="materials" id={entry.id} />
      </div>
      <div className="asideSection">
        <span className="monoLabel">RELATED</span>
        <h2>关联条目</h2>
        <LinkChips items={related} empty={<p className="asideCopy">没有记录关联条目。</p>} />
      </div>
      <div className="asideSection">
        <span className="monoLabel">RECORD</span>
        <h2>素材记录</h2>
        <dl className="asideMeta">
          <div><dt>编号</dt><dd>{String(entry.order).padStart(3, "0")}</dd></div>
          <div><dt>素材类型</dt><dd>{entry.type ? labelFor(meta.labels, "materials", "type", entry.type) : "—"}</dd></div>
          {entry.capturedAt && <div><dt>采集日期</dt><dd>{formatDate(entry.capturedAt)}</dd></div>}
          {snapshot && <div><dt>快照主文档</dt><dd>{entry.snapshotEntry}</dd></div>}
          {entry.galleryRatio && <div><dt>画廊比例</dt><dd>{entry.galleryRatio}</dd></div>}
          {entry.galleryFit && <div><dt>画廊适配</dt><dd>{entry.galleryFit}</dd></div>}
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
        <span className="monoLabel">{site.brand}</span>
        <CopyPageLink label="复制本页链接" />
      </div>
    </aside>
  );
}

function InstallBlock({ entry }: { entry: AtlasEntry }) {
  if (!entry.install) return null;
  return (
    <div className="installBlock">
      <div className="installHead">
        <div>
          <span className="monoLabel">INSTALL / 安装与取材</span>
          <p>可以直接复制的命令或取材说明。</p>
        </div>
        <CopyButton value={entry.install} label="复制安装命令" />
      </div>
      <pre><code>{entry.install}</code></pre>
    </div>
  );
}

function SnapshotPanel({ entry }: { entry: AtlasEntry }) {
  const snapshot = snapshotDocument(entry);
  return (
    <section className="snapshotPanel">
      <div className="snapshotIcon" aria-hidden="true"><FileText size={22} strokeWidth={1.5} /></div>
      <div className="snapshotBody">
        <span className="monoLabel">SNAPSHOT / 无独立可运行 Demo</span>
        <h2>以原文快照和资料为主</h2>
        <p>这个素材没有独立可运行入口，完整说明、文件清单与许可保存在快照原文中。</p>
        <div className="snapshotActions">
          {snapshot && <PathLink path={snapshot} label="阅读原文快照" />}
          {entry.research && <PathLink path={entry.research} label="阅读研究说明" />}
        </div>
      </div>
      {entry.cover && (
        <div className="snapshotCover">
          <CoverImage src={entry.cover} alt={`${entry.title} 封面`} fallbackLabel={entry.title} />
        </div>
      )}
    </section>
  );
}

function SkillGuide({ entry }: { entry: AtlasEntry }) {
  if (!entry.skillGuide?.length) return null;
  return (
    <div className="skillGuide">
      {(entry.skillGuide as { title?: string; skills?: { id?: string; title?: string; description?: string }[] }[]).map((group) => (
        <div className="skillGroup" key={group.title}>
          <span className="monoLabel">{group.title}</span>
          {group.skills?.map((skill) => {
            const path = skill.id && entry.snapshotPath ? `${entry.snapshotPath}skills/${skill.id}/SKILL.md` : "";
            return (
              <div className="skillItem" key={skill.id}>
                <div>
                  <h3>{skill.title ?? skill.id}</h3>
                  <p>{skill.description}</p>
                </div>
                {path && <PathLink path={path} label="打开 SKILL" />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function MaterialPage({ id }: { id: string }) {
  const { meta, site } = useAtlas();
  const entry = meta.entries.materials.find((item) => item.id === id);
  const labels = meta.labels;

  useEffect(() => {
    if (entry) document.title = `${entry.title} · ${site.brand}`;
  }, [entry, site.brand]);

  if (!entry) return <NotFoundPage />;

  const snapshot = snapshotDocument(entry);
  const hasDemo = Boolean(entry.demo || entry.demos?.length);
  const hasCompare = Boolean(entry.gallery?.some((item) => item.compare?.piece));
  const workflow = entry.workflow ?? [];
  let section = 1;
  const n = () => String(section++).padStart(2, "0");
  const facts = [
    {
      label: "素材类型",
      value: entry.type ? labelFor(labels, "materials", "type", entry.type) : undefined
    },
    { label: "分类", value: entry.category },
    { label: "上游版本", value: entry.upstream?.version ?? entry.upstream?.commit?.slice(0, 7) },
    { label: "许可", value: entry.license?.name }
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <div className="detailPage materialPage">
      <Breadcrumbs kind="materials" current={entry.title} />
      <DetailHero
        kind="materials"
        title={entry.title}
        summary={entry.summary}
        tags={entry.tags}
        facts={facts}
        actions={
          <>
            <FavoriteButton kind="materials" id={entry.id} />
            <CopyPageLink label="分享" />
            {entry.prompt && <CopyButton value={entry.prompt} label="复制 Prompt" />}
            <AgentDownload kind="materials" id={entry.id} />
          </>
        }
        metaNote={
          <span className="heroMetaInline">
            <Boxes size={14} strokeWidth={1.7} aria-hidden="true" />
            {hasDemo ? "可运行样例与画廊" : "原文快照与画廊"}
          </span>
        }
      />

      {hasDemo ? <MaterialDemo entry={entry} /> : hasCompare ? <OriginalReplicaCompare entry={entry} /> : !hasCompare && snapshot ? <SnapshotPanel entry={entry} /> : null}

      <div className="detailBodyLayout materialBody">
        <div className="detailContent">
          <SectionTitle index="00" title="使用资料" aside={<span className="sectionAsideText">安装、工作流与来源</span>} />
          <AnalysisSection index={n()} title="使用方式">
            {entry.carrierNote && <p className="leadParagraph">{entry.carrierNote}</p>}
            {workflow.length ? (
              <ol className="workflowList">
                {workflow.map((step, index) => (
                  <li key={`${step.slice(0, 24)}-${index}`}>
                    <span className="workflowNumber">{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="leadParagraph">此素材以可运行样例、组件或资源文件为入口，按安装说明取用。</p>
            )}
          </AnalysisSection>
          <AnalysisSection index={n()} title="安装命令">
            <InstallBlock entry={entry} />
          </AnalysisSection>
          {(entry.useCases?.length || entry.avoid?.length || entry.constraints?.length) && (
            <AnalysisSection index={n()} title="适用与限制">
              <ConstraintColumns entry={entry} />
            </AnalysisSection>
          )}
          {entry.prompt && (
            <AnalysisSection index={n()} title="实现 Prompt">
              <PromptBlock title="实现与复用 Prompt" text={entry.prompt} />
            </AnalysisSection>
          )}
          {entry.skillGuide?.length ? (
            <AnalysisSection index={n()} title="Skill 指引">
              <SkillGuide entry={entry} />
            </AnalysisSection>
          ) : null}
          {entry.attribution?.length || entry.upstream || entry.license ? (
            <AnalysisSection index={n()} title="上游与许可">
              <AttributionList entry={entry} />
            </AnalysisSection>
          ) : null}
          {entry.sources?.length ? (
            <AnalysisSection index={n()} title="来源记录">
              <SourceList entry={entry} kind="materials" />
            </AnalysisSection>
          ) : null}
        </div>
        <MaterialAside entry={entry} />
      </div>

      {entry.gallery?.length ? <Gallery entry={entry} /> : null}
    </div>
  );
}