import { GitCompareArrows, X } from "lucide-react";
import { useCompare } from "../lib/compare";
import { Link, useRouter } from "../lib/router";

export function CompareDock() {
  const { ids, clear } = useCompare();
  const { pathname } = useRouter();
  if (!ids.length || pathname === "/compare") return null;
  const to = `/compare?ids=${encodeURIComponent(ids.join(","))}`;
  return (
    <div className="compareDock" role="status">
      <span className="compareDockIcon" aria-hidden="true"><GitCompareArrows size={16} strokeWidth={1.7} /></span>
      <span className="compareDockText">
        已选 <strong>{ids.length}</strong> / 3 个案例
      </span>
      <Link className="compareDockAction" to={to}>{ids.length >= 2 ? "开始比较" : "继续选择"}</Link>
      <button type="button" className="compareDockClear" onClick={clear} aria-label="清空比较选择" title="清空比较选择">
        <X size={14} strokeWidth={1.9} />
      </button>
    </div>
  );
}