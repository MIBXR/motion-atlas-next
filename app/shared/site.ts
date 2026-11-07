export type ThemeMode = "light" | "dark" | "system";

export interface SiteConfig {
  library: "web" | "motion";
  volume: string;
  brand: string;
  brandCn: string;
  kicker: string;
  headline: string[];
  headlineEmphasis: number;
  intro: string;
  defaultTheme: ThemeMode;
  snapshot: string;
  browseLead: string;
  caseLead: string;
  patternLead: string;
  materialLead: string;
  labTitle: string;
  labDescription: string;
  workflowTitle: string;
  workflowDescription: string;
  docsTitle: string;
  docsLead: string;
  searchPlaceholder: string;
  featuredCases: string[];
  quickLinks: { label: string; to: string }[];
}

export const SITES: Record<"web" | "motion", SiteConfig> = {
  web: {
    library: "web",
    volume: "01",
    brand: "WEB ATLAS",
    brandCn: "网页设计参考库",
    kicker: "设计参考工作台",
    headline: ["把好网页，", "拆成可用的", "设计动作。"],
    headlineEmphasis: 1,
    intro:
      "在一个地方查找网页案例、拆解机制、复制 Prompt、读取研究与许可。把观察到的设计变成下一次实现可以调用的材料。",
    defaultTheme: "light",
    snapshot: "内容快照 / 2026.11",
    browseLead: "按分类、地区与多个关键词交叉查找，按编号或名称排列。",
    caseLead: "运行复刻 Demo、与原站并排、读取完整拆解和实现 Prompt。",
    patternLead: "从来源案例中定位机制发生的位置，再判断它适合与什么组合。",
    materialLead: "切换可运行样例、查看画廊，取走安装方式、上游版本与许可。",
    labTitle: "设计实验室",
    labDescription: "调配配色、字体、布局、材质与动效，导出设计和 Prompt。原型已为它保留位置，功能暂未开放。",
    workflowTitle: "Agent 工作流",
    workflowDescription: "挑选条目、生成任务说明、打包资料并交给 Agent。原型已为它保留位置，功能暂未开放。",
    docsTitle: "文档库",
    docsLead: "研究、复刻说明、许可、Prompt 与素材原文。",
    searchPlaceholder: "搜索标题、摘要、标签或拆解内容",
    featuredCases: ["apple-product", "hallmark", "stripe-platform", "zelda-world", "persona-kinetic", "design-sight"],
    quickLinks: [
      { label: "全部案例", to: "/browse?type=cases" },
      { label: "巧思索引", to: "/browse?type=patterns" },
      { label: "素材架", to: "/browse?type=materials" }
    ]
  },
  motion: {
    library: "motion",
    volume: "02",
    brand: "MOTION ATLAS",
    brandCn: "影像与交互参考库",
    kicker: "动效参考工作台",
    headline: ["把每一秒，", "拆成可以", "复用的节奏。"],
    headlineEmphasis: 1,
    intro:
      "逐帧查看影像与操作台，定位节拍、能量、镜头、材质和交互。让参考不只停在一张截图，而能进入下一条片子的时间轴。",
    defaultTheme: "dark",
    snapshot: "内容快照 / 2026.11",
    browseLead: "按画面风格、载体、用途、技术与多个关键词交叉查找。",
    caseLead: "播放、拖动时间轴、按节拍定位，并读取完整的节奏与构成拆解。",
    patternLead: "每个巧思都有独立 Demo，时间轴、节拍与来源片段一并呈现。",
    materialLead: "读取工作流、原文与画廊，复制安装方式，核对上游版本和许可。",
    labTitle: "节奏实验室",
    labDescription: "节拍器、打拍吸附、缓动曲线与 CSS／WAV 导出。原型已为它保留位置，功能暂未开放。",
    workflowTitle: "Agent 工作流",
    workflowDescription: "筛选条目、生成视频任务说明、打包资料并交给 Agent。原型已为它保留位置，功能暂未开放。",
    docsTitle: "方法与 Prompt",
    docsLead: "节奏方法、制作流程、Prompt、素材原文与许可。",
    searchPlaceholder: "搜索标题、摘要、标签或拆解内容",
    featuredCases: ["butterfly-garden-score", "map-pilgrimage", "archive-os", "mg-synthwave", "lemo-ukiyoe", "mg-isometric"],
    quickLinks: [
      { label: "全部案例", to: "/browse?type=cases" },
      { label: "巧思索引", to: "/browse?type=patterns" },
      { label: "素材架", to: "/browse?type=materials" }
    ]
  }
};