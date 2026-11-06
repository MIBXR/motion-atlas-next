import atlas from "../../data/atlas.json";
import { mountAtlas } from "@/ui/App";
import { AudioWaveform, Workflow } from "@/ui/icons";
import { byId } from "@/ui/context";
import { Bullets, KV, Palette, ParamTable, Prose } from "@/ui/blocks";
import { KINDS, type AtlasConfig, type AtlasData, type Entry, type Kind } from "@/core/types";
import { CaseDetail, MaterialDetail, PatternDetail } from "./details";
import "./motion.css";

const data: AtlasData = { ...atlas.entries, docs: atlas.docs, labels: atlas.labels };
const L = data.labels;
const label = (dict: Record<string, string> | undefined) => (v: string) => dict?.[v] ?? v;
const C = L.cases;

const config: AtlasConfig = {
  name: "Motion Atlas",
  tagline: "影像与操作台动效参考工作台",
  data,
  facets: {
    cases: [
      { key: "style", label: "画面风格", values: e => [e.style], display: label(C.style), order: Object.keys(C.style) },
      { key: "carriers", label: "载体", values: e => e.carriers, display: label(C.carriers), order: Object.keys(C.carriers) },
      { key: "purpose", label: "用途", values: e => [e.purpose], display: label(C.purpose), order: Object.keys(C.purpose) },
      { key: "tech", label: "技术", values: e => e.tech, display: label(C.tech), order: Object.keys(C.tech) },
    ],
    patterns: [
      { key: "types", label: "巧思类型", values: e => e.types, display: label(L.patterns.types), order: Object.keys(L.patterns.types) },
      { key: "carriers", label: "载体", values: e => e.carriers, display: label(L.patterns.carriers), order: Object.keys(L.patterns.carriers) },
      // 所属案例的选项由全部案例构造，没有巧思的案例计数为 0。
      { key: "source", label: "所属案例", values: e => e.sources.map((s: Entry) => s.caseId), display: id => byId(data.cases, id)?.title ?? id, order: data.cases.map((c: Entry) => c.id) },
    ],
    materials: [
      { key: "type", label: "类型", values: e => [e.type], display: label(L.materials.type), order: Object.keys(L.materials.type) },
    ],
  },
  cardMeta: (kind, e) =>
    kind === "cases" ? { subtitle: e.subtitle, chips: [C.style[e.style] ?? e.style, C.purpose[e.purpose] ?? e.purpose, ...e.tech.map((t: string) => C.tech[t] ?? t)] }
      : kind === "patterns" ? { chips: [...e.types.map((t: string) => L.patterns.types[t] ?? t), L.ROLE_NAME.role[e.composition.role] ?? e.composition.role] }
        : { chips: [L.materials.type[e.type] ?? e.type, ...(e.category ? [e.category] : [])] },
  compareRows: [
    { label: "摘要", render: e => e.summary },
    { label: "信息重点", render: e => e.focus },
    { label: "风格 · 用途", render: e => `${C.style[e.style]} · ${C.purpose[e.purpose]}` },
    { label: "载体 · 技术", render: e => [...e.carriers.map((c: string) => C.carriers[c]), ...e.tech.map((t: string) => C.tech[t])].join("、") },
    { label: "时长 · BPM", render: e => `${e.rhythm?.duration ?? "—"} 秒${e.rhythm?.bpm ? ` · ${e.rhythm.bpm} BPM` : ""} · ${e.rhythm?.beats?.length ?? 0} 个节拍` },
    { label: "节拍", render: e => <Bullets items={e.rhythm?.beats?.map((b: Entry) => `${b.t}s ${b.label}${b.note ? `：${b.note}` : ""}`)} /> },
    ...Object.entries(C.composition as Record<string, string>).map(([k, name]) => ({ label: `构成 · ${name}`, render: (e: Entry) => e.composition?.[k] })),
    { label: "画面分层", render: e => <ParamTable rows={e.layers} cols={[["name", "层"], ["role", "职责"]]} /> },
    { label: "色板", render: e => <Palette colors={e.tokens?.palette} /> },
    { label: "字体", render: e => e.tokens?.type },
    { label: "动效 Token", render: e => <KV data={Object.fromEntries((e.tokens?.motion ?? []).map((m: Entry) => [m.name, m.value]))} /> },
    { label: "画面观察", render: e => <Bullets items={e.observations} /> },
    { label: "适用场景", render: e => <Bullets items={e.useCases} /> },
    { label: "避用", render: e => <Bullets items={e.avoid} /> },
    { label: "约束", render: e => <Bullets items={e.constraints} /> },
    { label: "能量口径", render: e => <Prose text={e.energyNote} /> },
  ],
  favorites: {
    storageKey: "ma-favorites",
    fileName: "motion-atlas-favorites.json",
    serialize: fav => fav,
    exportJson: fav => ({ app: "motion-atlas", version: 1, exportedAt: new Date().toISOString(), favorites: fav }),
    // 兼容完整导出对象与直接保存三数组的旧格式；缺省类别按空数组处理。
    parse: json => {
      const o = json as Record<string, any>;
      if (!o || typeof o !== "object") throw new Error("不是 JSON 对象");
      const src = o.favorites || o;
      return Object.fromEntries(KINDS.map(k => [k, Array.isArray(src[k]) ? src[k].filter((x: unknown) => typeof x === "string") : []])) as Record<Kind, string[]>;
    },
  },
  detail: {
    cases: e => <CaseDetail e={e} />,
    patterns: e => <PatternDetail e={e} />,
    materials: e => <MaterialDetail e={e} />,
  },
  tools: [
    { id: "rhythm-lab", title: "节奏实验室", description: "节拍器、A/B 吸附对比、打拍录入、曲线、时长与错峰", icon: <AudioWaveform /> },
    { id: "workflow", title: "Agent 工作流", description: "选条目、生成任务说明、获取结构化资料", icon: <Workflow /> },
  ],
  legacyHash: hash => {
    const id = hash.split(/[/?&=]/).filter(Boolean).find(part => KINDS.some(k => byId(data[k], part)));
    if (!id) return null;
    const kind = KINDS.find(k => byId(data[k], id))!;
    return `/${kind}/${id}`;
  },
};

mountAtlas(config);
