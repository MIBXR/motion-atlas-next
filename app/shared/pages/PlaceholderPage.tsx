import { ArrowRight, FlaskConical, Layers3 } from "lucide-react";
import { useAtlas } from "../lib/atlas-context";
import { Link } from "../lib/router";
import { PageHeader } from "../components/PageBits";

const LAB_MODULES = {
  web: ["配色角色", "字体与尺度", "版式与留白", "形状与图形", "层级与质感", "动效与导出"],
  motion: ["拍号与 BPM", "打拍录入", "节拍吸附", "缓动与时长", "错峰与轨迹", "CSS / WAV 导出"]
};

const WORKFLOW_STEPS = {
  web: ["选条目与巧思", "填写目标与约束", "生成任务说明", "打包文档与 Prompt"],
  motion: ["选案例与节奏", "补充交付规格", "生成视频任务", "打包资料与音轨"]
};

export function PlaceholderPage({ kind }: { kind: "lab" | "workflow" }) {
  const { site, meta } = useAtlas();
  const isLab = kind === "lab";
  const title = isLab ? site.labTitle : site.workflowTitle;
  const description = isLab ? site.labDescription : site.workflowDescription;
  const modules = isLab ? LAB_MODULES[site.library] : WORKFLOW_STEPS[site.library];

  return (
    <div className="placeholderPage">
      <PageHeader
        kicker={`RESERVED / ${site.brand}`}
        title={title}
        lead={description}
        topRight="原型入口"
        aside={
          <div className="placeholderBadge">
            <span className="monoLabel">STATUS</span>
            <strong>预留位置</strong>
            <p>本次原型只验证工作台的组织方式，这一页不提供操作。</p>
          </div>
        }
      />
      <div className="placeholderCanvas">
        <div className="placeholderMark" aria-hidden="true">
          {isLab ? <FlaskConical size={42} strokeWidth={1.1} /> : <Layers3 size={42} strokeWidth={1.1} />}
          <span>{isLab ? "LAB" : "AGENT"}</span>
        </div>
        <div className="placeholderPlan">
          <span className="monoLabel">PLANNED / 结构预留</span>
          <h2>{isLab ? "从参考里调配元素" : "把参考整理成一次任务"}</h2>
          <p>
            {isLab
              ? "实验室会停在同一份内容上，让变量的变化可以被直接观察与比较。入口、导航层级和内容关系已经在工作台里留好。"
              : "工作流会从选中条目生成结构化的任务说明与资料包，再把结果交给 Agent。下载与生成能力尚未接入。"}
          </p>
          <div className="placeholderModules">
            {modules.map((module, index) => (
              <span key={module}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {module}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="placeholderLinks">
        <Link className="placeholderLink" to="/browse?type=cases">
          浏览 {meta.counts.cases} 个案例 <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link className="placeholderLink" to="/docs">
          打开文档库 <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link className="placeholderLink" to="/">
          回到总览 <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}