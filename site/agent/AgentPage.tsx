import { href } from "@/core/router";
import { WorkflowSteps } from "./WorkflowSteps";
import { Generator } from "./Generator";
import { ReferenceTables } from "./ReferenceTables";
import "./agent.css";

export function AgentPage() {
  return <div className="page agent-page">
    <header className="page-head"><div>
      <p className="eyebrow">FOR AGENTS · INDEX / BUNDLE / CLI / RENDER</p>
      <h1>同一套资料，机器也能读。</h1>
      <p className="detail-sub">人看站点，Agent 读 JSON。每个条目都有结构化索引、完整资料包（条目、Prompt、带 SHA256 的文件清单）和可运行的 Demo；CLI 负责检索、查看与导出，渲染脚本负责把结果变成视频。</p>
      <div className="agent-links"><a className="pill-button" href="agent/catalog.json">打开 agent/catalog.json</a><a className="pill-button" href={href('/docs', { path: 'docs/agent.md' })}>Agent 取材说明</a><a className="pill-button" href={href('/docs', { path: 'docs/pipeline.md' })}>render(t) 协议</a></div>
    </div></header>
    <div className="agent-sections"><WorkflowSteps /><Generator /><ReferenceTables /></div>
  </div>;
}
