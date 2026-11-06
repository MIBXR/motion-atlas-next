import { useEffect, useState } from "react";
import Badge from "@/registry/components/badge/badge";
import { Combobox } from "@/registry/components/combobox/combobox";
import { ExternalLink, Play } from "@/ui/icons";
import { href, navigate, useRoute, withParams } from "@/core/router";
import type { Entry } from "@/core/types";
import { Bullets, CodeLine, DocLinks, EntryLinks, has, KV, Palette, ParamTable, PromptBlock, Prose, RelatedEntries, Section, Sources } from "@/ui/blocks";
import { DetailLayout, GalleryStage } from "@/ui/DetailPage";
import { useAtlas } from "@/ui/context";
import { MaterialFrame, MotionPlayer, seekPlayer, type Beat } from "./player";

type L = Record<string, any>;
/** labels.json 没有收录、但页面上会直接显示的枚举值。 */
const ENUM: Record<string, string> = { gpu: "GPU（WebGL / three.js）", video: "视频" };
const lab = (labels: L, path: string[], v: string) => path.reduce<any>((o, k) => o?.[k], labels)?.[v] ?? v;

/** 能量曲线：优先 energySegments，其次等间距 energy 样本（CONTENT.md 6.2 节拍与能量）。 */
export function energyPoints(e: Entry): [number, number][] | undefined {
  const d = e.rhythm?.duration;
  if (has(e.energySegments) && d) return e.energySegments.flatMap((s: L) => [[s.t0 / d, s.from], [s.t1 / d, s.to]] as [number, number][]);
  if (has(e.energy)) return e.energy.map((v: number, i: number, a: number[]) => [i / Math.max(1, a.length - 1), v] as [number, number]);
  return undefined;
}

function FileList({ files }: { files?: string[] }) {
  if (!has(files)) return null;
  return (
    <ul className="file-list">
      {files!.map(f => {
        const p = f.replace(/\\/g, "/");
        return <li key={f}>{p.endsWith(".md") ? <a className="mono" href={href("/docs", { path: p })}>{p}</a> : <a className="mono" href={p} target="_blank" rel="noopener">{p}</a>}</li>;
      })}
    </ul>
  );
}

function BeatTable({ beats }: { beats: Beat[] }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr><th>时刻</th><th>节拍</th><th>内容</th></tr></thead>
        <tbody>
          {beats.map((b, i) => (
            <tr key={i}>
              <td><button className="text-button mono" onClick={() => seekPlayer(b.t)} aria-label={`跳到 ${b.t} 秒`}><Play aria-hidden="true" /> {b.t.toFixed(2)}s</button></td>
              <td>{b.label}</td>
              <td>{b.note ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tokens({ t }: { t?: L }) {
  if (!has(t)) return null;
  return (
    <>
      <Palette colors={t!.palette} />
      <KV data={{ type: t!.type }} labels={{ type: "字体与排版" }} />
      {has(t!.css) ? <ParamTable rows={Object.entries(t!.css).map(([name, value]) => ({ name, value }))} cols={[["name", "CSS 变量"], ["value", "值"]]} /> : null}
      <ParamTable rows={t!.motion} cols={[["name", "动效 Token"], ["value", "值"]]} />
    </>
  );
}

/* ---------- 案例 ---------- */

export function CaseDetail({ e }: { e: Entry }) {
  const { data } = useAtlas();
  const L = data.labels;
  const beats: Beat[] = e.rhythm?.beats ?? [];
  return (
    <DetailLayout
      kind="cases"
      e={e}
      subtitle={[e.subtitle, e.en].filter(Boolean).join(" · ")}
      meta={<>
        <Badge>{lab(L, ["cases", "style"], e.style)}</Badge>
        <Badge>{lab(L, ["cases", "purpose"], e.purpose)}</Badge>
        {e.carriers.map((c: string) => <Badge key={c}>{lab(L, ["cases", "carriers"], c)}</Badge>)}
        {e.tech.map((c: string) => <Badge key={c} tone="info">{lab(L, ["cases", "tech"], c)}</Badge>)}
        <Badge>{e.rhythm?.duration}s{e.rhythm?.bpm ? ` · ${e.rhythm.bpm} BPM` : ""}</Badge>
      </>}
      stage={<MotionPlayer demo={e.demo} title={`${e.title} Demo`} beats={beats} energy={energyPoints(e)} orients={e.orients} />}
    >
      <Section id="overview" title="概览">
        <Prose text={e.summary} />
        <KV data={{ focus: e.focus, accent: e.accent, background: e.background, renderer: ENUM[e.renderer] ?? e.renderer }} labels={{ focus: "信息重点", accent: "强调色", background: "背景色", renderer: "渲染方式" }} />
        {has(e.tags) ? <div className="tag-row">{e.tags.map((t: string) => <a key={t} className="tag" href={href("/cases", { q: t })}>{t}</a>)}</div> : null}
      </Section>
      <Section id="rhythm" title="节奏结构">
        <KV data={{ duration: e.rhythm?.duration ? `${e.rhythm.duration} 秒` : null, bpm: e.rhythm?.bpm, energyNote: e.energyNote }} labels={{ duration: "总时长", bpm: "名义 BPM", energyNote: "能量口径" }} />
        {beats.length ? <BeatTable beats={beats} /> : null}
        {has(e.energySegments) ? <ParamTable rows={e.energySegments.map((s: L) => ({ ...s, range: `${s.t0}–${s.t1}s`, energy: `${s.from} → ${s.to}` }))} cols={[["label", "能量段"], ["range", "时段"], ["energy", "能量"]]} /> : null}
      </Section>
      <Section id="layers" title="画面分层"><ParamTable rows={e.layers} cols={[["name", "层"], ["role", "职责"]]} /></Section>
      <Section id="composition" title="构成"><KV data={e.composition} labels={L.cases.composition} order={Object.keys(L.cases.composition)} /></Section>
      <Section id="tokens" title="色板与 Token"><Tokens t={e.tokens} /></Section>
      <Section id="observations" title="画面观察"><Bullets items={e.observations} /></Section>
      <Section id="fit" title="适用场景与限制">
        <Bullets title="适用" items={e.useCases} />
        <Bullets title="避用" items={e.avoid} />
        <Bullets title="约束" items={e.constraints} />
      </Section>
      <Section id="patterns" title={`关联巧思（${e.patternIds?.length ?? 0}）`}>{has(e.patternIds) ? <EntryLinks kind="patterns" ids={e.patternIds} /> : null}</Section>
      <Section id="related" title="关联素材与条目"><RelatedEntries items={e.relatedEntries} /></Section>
      <Section id="migration" title="迁移指南"><ParamTable rows={e.migration} cols={[["field", "位置"], ["how", "修改方法"]]} /></Section>
      <Section id="prompt" title="Prompt">
        <PromptBlock title="实现 Prompt" text={e.prompt} />
        <PromptBlock title="视频生成 Prompt" text={e.videoPrompt} />
        <PromptBlock title="负向约束" text={e.negativePrompt} />
      </Section>
      <Section id="credits" title="署名、上游与许可">
        <ParamTable rows={e.attribution} cols={[["scope", "范围"], ["notes", "说明"]]} />
        <KV data={{ ...e.upstream, type: ENUM[e.upstream?.type] ?? e.upstream?.type }} labels={{ url: "上游地址", title: "作品", author: "作者", type: "载体", repository: "仓库", commit: "固定提交", path: "子目录", version: "版本" }} />
        <KV data={e.license} labels={{ name: "许可", notes: "说明", url: "许可原文" }} />
      </Section>
      <Section id="sources" title="来源证据"><Sources items={e.sources} /></Section>
      <Section id="docs" title="研究文档与资料">
        <DocLinks docs={[{ label: L.documentLinks.field.research, path: e.$.research }, { label: L.documentLinks.field.fidelity, path: e.$.fidelity }, { label: L.documentLinks.field.licenses, path: e.$.licenses }, { label: "Prompt 原文", path: e.$.prompt }]} />
        <FileList files={e.sourceFiles} />
      </Section>
    </DetailLayout>
  );
}

/* ---------- 巧思 ---------- */

export function PatternDetail({ e }: { e: Entry }) {
  const { data } = useAtlas();
  const L = data.labels;
  return (
    <DetailLayout
      kind="patterns"
      e={e}
      subtitle={e.summary}
      meta={<>
        {e.types.map((t: string) => <Badge key={t}>{lab(L, ["patterns", "types"], t)}</Badge>)}
        {e.carriers.map((c: string) => <Badge key={c}>{lab(L, ["patterns", "carriers"], c)}</Badge>)}
        <Badge tone="info">{lab(L, ["ROLE_NAME", "role"], e.composition.role)}</Badge>
      </>}
      stage={<MotionPlayer demo={e.demo} title={`${e.title} Demo`} fallbackBeats={e.markers} orients={e.orients} />}
    >
      <Section id="mechanism" title="机制">
        <KV data={{ mechanism: e.mechanism, trigger: e.trigger, effect: e.effect }} labels={{ mechanism: "机制", trigger: "触发", effect: "效果" }} />
      </Section>
      <Section id="timing" title="时间与参数">
        <ParamTable rows={e.timing} cols={[["name", "时间参数"], ["value", "值"]]} />
        <ParamTable rows={e.parameters} cols={[["name", "参数"], ["value", "参考值"], ["source", "来源定位"]]} />
        {has(e.markers) ? <BeatTable beats={e.markers} /> : null}
      </Section>
      <Section id="sound" title="声音">
        {has(e.sound) ? <KV data={{ description: e.sound.description, voices: e.sound.voices, score: e.sound.score }} labels={{ description: "声音与画面", voices: "音色", score: "乐谱" }} /> : null}
      </Section>
      <Section id="tokens" title="色板与 Token"><Tokens t={e.tokens} /></Section>
      <Section id="fit" title="适用与限制">
        <Bullets title="适用" items={e.useCases} />
        <Bullets title="避用" items={e.avoid} />
      </Section>
      <Section id="composition" title="组合关系">
        <KV data={{ role: lab(L, ["patterns", "composition.role"], e.composition.role), notes: e.composition.notes }} labels={{ role: "组合职责", notes: "组合说明" }} />
        {has(e.composition.pairsWellWith) ? <><h3 className="sub">适合搭配</h3><EntryLinks kind="patterns" ids={e.composition.pairsWellWith} /></> : null}
        {has(e.composition.conflicts) ? <><h3 className="sub">冲突</h3><EntryLinks kind="patterns" ids={e.composition.conflicts} /></> : null}
      </Section>
      <Section id="sources" title="来源案例"><EntryLinks kind="cases" ids={e.sources.map((s: L) => s.caseId)} /></Section>
      <Section id="migration" title="迁移指南"><ParamTable rows={e.migration} cols={[["field", "位置"], ["how", "修改方法"]]} /></Section>
      <Section id="prompt" title="Prompt">
        <PromptBlock title="实现 Prompt" text={e.prompt} />
        <PromptBlock title="视频生成 Prompt" text={e.videoPrompt} />
        <PromptBlock title="负向约束" text={e.negativePrompt} />
      </Section>
      <Section id="files" title="取材文件与文档">
        <KV data={{ locator: e.locator }} labels={{ locator: "源码定位" }} />
        <DocLinks docs={[{ label: "Prompt 原文", path: e.$.prompt }, { label: "研究文档", path: e.$.research }, { label: "许可说明", path: e.$.licenses }]} />
        <FileList files={e.sourceFiles} />
      </Section>
    </DetailLayout>
  );
}

/* ---------- 素材 ---------- */

/** hyperframes-registry 的本地样例按 ?demo=<name> 切换（CONTENT.md 6.2 素材 Demo）。 */
function RegistryStage({ e }: { e: Entry }) {
  const route = useRoute();
  const [names, setNames] = useState<{ value: string; label: string }[]>([]);
  const base = e.demo.replace(/index\.html$/, "");
  // 样例名称用 Demo 自带的 labels.json 中文名。
  useEffect(() => {
    Promise.all([fetch(base + "demo/local-items.json").then(r => r.json()), fetch(base + "demo/labels.json").then(r => r.json())])
      .then(([items, labels]) => setNames(Object.keys(items).map(k => ({ value: k, label: labels.items?.[k] ? `${labels.items[k]} · ${k}` : k }))))
      .catch(() => setNames([]));
  }, [base]);
  const cur = route.params.get("demo") ?? "product-turntable";
  // 样例选择与“重新加载”“新标签页”放在同一行工具条里。
  const tools = names.length ? (
    <>
      <div className="picker picker-demo">
        <Combobox label="样例" placeholder="搜索样例" value={cur} onValueChange={v => v && navigate(withParams(route, { demo: v }), { replace: true })} options={names} />
      </div>
      <span className="picker-count muted">{names.findIndex(n => n.value === cur) + 1}/{names.length}</span>
    </>
  ) : null;
  return <MaterialFrame src={`${e.demo}?demo=${encodeURIComponent(cur)}`} title={`${e.title} 样例`} tools={tools} />;
}

function Gallery({ e }: { e: Entry }) {
  const { data } = useAtlas();
  const kinds = [...new Set((e.gallery as L[]).map(g => g.kind))];
  return (
    <>
      {kinds.map(k => (
        <div key={k}>
          {kinds.length > 1 ? <h3 className="sub">{lab(data.labels, ["materials", "gallery[].kind"], k)}</h3> : null}
          <ul className="gallery" style={{ ["--ratio" as string]: "16/9", ["--fit" as string]: "cover" }}>
            {(e.gallery as L[]).filter(g => g.kind === k).map(g => (
              <li key={g.path}>
                <a href={g.path} target="_blank" rel="noopener"><img src={g.path} alt={g.caption} loading="lazy" /></a>
                <p>{g.caption}</p>
                {g.sourceUrl ? <div className="gallery-actions"><a className="text-button" href={g.sourceUrl} target="_blank" rel="noopener">出处 <ExternalLink aria-hidden="true" /></a></div> : null}
                {g.license ? <p className="muted small">{g.license}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function MaterialDetail({ e }: { e: Entry }) {
  const { data } = useAtlas();
  const L = data.labels;
  const refs: Record<string, string> = L.references.path;
  const snapshotDocs = e.snapshotPath ? Object.entries(refs).filter(([p]) => !p.endsWith("/")).map(([p, label]) => ({ label, path: data.docs.some(d => d.path === e.snapshotPath + p) ? e.snapshotPath + p : undefined })) : [];
  return (
    <DetailLayout
      kind="materials"
      e={e}
      subtitle={e.summary}
      meta={<>
        <Badge>{lab(L, ["materials", "type"], e.type)}</Badge>
        {e.category ? <Badge>{e.category}</Badge> : null}
        {e.upstream?.version ? <Badge>v{e.upstream.version}</Badge> : null}
        {e.license?.name ? <Badge tone="info">{e.license.name}</Badge> : null}
      </>}
      stage={e.demo ? (e.id === "hyperframes-registry" ? <RegistryStage e={e} /> : <MaterialFrame src={e.demo} title={`${e.title} Demo`} />) : has(e.gallery) ? <GalleryStage e={e}><Gallery e={e} /></GalleryStage> : null}
    >
      {e.demo ? <Section id="gallery" title={`画廊（${e.gallery?.length ?? 0}）`}>{has(e.gallery) ? <Gallery e={e} /> : null}</Section> : null}
      <Section id="install" title="安装与取材"><CodeLine text={e.install} label="复制命令" /><Prose text={e.carrierNote} /></Section>
      <Section id="workflow" title="工作流">{has(e.workflow) ? <ol className="steps">{e.workflow.map((s: string, i: number) => <li key={i}>{s}</li>)}</ol> : null}</Section>
      <Section id="skills" title="Skill 指南">
        {has(e.skillGuide) ? e.skillGuide.map((g: L) => (
          <div key={g.title} className="skill-group">
            <h3 className="sub">{g.title}</h3>
            <ul className="skill-list">
              {g.skills.map((s: L) => (
                <li key={s.id}><a href={href("/docs", { path: `${e.snapshotPath}skills/${s.id}/SKILL.md` })}><strong>{s.title}</strong><span className="mono muted">{s.id}</span></a><p>{s.description}</p></li>
              ))}
            </ul>
          </div>
        )) : null}
      </Section>
      <Section id="fit" title="适用与限制">
        <Bullets title="适用" items={e.useCases} />
        <Bullets title="避用" items={e.avoid} />
        <Bullets title="约束" items={e.constraints} />
      </Section>
      <Section id="upstream" title="上游、版本与许可">
        <KV data={e.upstream} labels={{ url: "上游地址", repository: "仓库", commit: "固定提交", verifiedAt: "核验日期", author: "作者", version: "版本", notes: "说明" }} />
        <KV data={e.license} labels={{ name: "许可", url: "许可原文", notes: "说明" }} />
        <ParamTable rows={e.attribution} cols={[["name", "名称"], ["author", "作者"], ["version", "版本"], ["license", "许可"], ["notes", "说明"]]} />
      </Section>
      <Section id="sources" title="来源"><Sources items={e.sources} /></Section>
      <Section id="related" title="关联条目"><RelatedEntries items={e.relatedEntries} /></Section>
      <Section id="docs" title="文档与原文">
        <DocLinks docs={[{ label: L.documentLinks.field.research, path: e.$.research }, { label: "原文主文档", path: e.$.snapshot }, ...snapshotDocs, { label: L.documentLinks.field.fidelity, path: e.$.fidelity }, { label: L.documentLinks.field.licenses, path: e.$.licenses }]} />
        <FileList files={e.sourceFiles} />
      </Section>
    </DetailLayout>
  );
}
