import { Link } from "../lib/router";
import { useAtlas } from "../lib/atlas-context";

export function NotFoundPage() {
  const { site } = useAtlas();
  return (
    <div className="notFoundPage">
      <span className="monoLabel">404 / NOT IN THIS ATLAS</span>
      <h1>没有找到这一条</h1>
      <p>链接可能指向了另一套库，或这个条目不在当前内容快照中。</p>
      <div className="notFoundLinks">
        <Link className="inlineButtonLink" to="/">回到总览</Link>
        <Link className="inlineButtonLink is-quiet" to="/browse?type=cases">浏览 {site.brand}</Link>
      </div>
    </div>
  );
}