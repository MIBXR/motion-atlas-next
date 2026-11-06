import { EmptyState } from "@/registry/components/empty-state/empty-state";
import { useAtlas } from "./context";

/** 实验室与工作流在原型阶段只占位，路由 #/tools/<id> 已固定，后续直接替换本页内容。 */
export function FuturePage({ id }: { id: string }) {
  const { futureTools } = useAtlas();
  const tool = futureTools.find(t => t.id === id);
  return (
    <div className="page">
      <header className="page-head"><div><h1>{tool?.title ?? id} <span className="muted">规划中</span></h1></div></header>
      <EmptyState icon={tool?.icon} title="原型阶段尚未实现" description={tool?.description ?? ""} action={<a className="pill-button" href="#/">返回总览</a>} />
    </div>
  );
}
