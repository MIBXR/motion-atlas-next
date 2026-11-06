export function ReferenceTables() {
  return <div className="agent-reference-grid">
    <section className="section agent-section" id="agent-cli"><header className="section-head"><h2>命令行</h2></header>
      <table className="table agent-table"><thead><tr><th>命令</th><th>作用</th></tr></thead><tbody>
        <tr><td><code>{'node scripts/atlas.mjs search "转场 地图" --limit 5'}</code></td><td>检索；支持 <code>--kind</code>、<code>--carrier</code>、<code>--type</code>、<code>--json</code></td></tr>
        <tr><td><code>{"node scripts/atlas.mjs show map-pilgrimage --source"}</code></td><td>条目、节拍、三段 Prompt、迁移字段与源码</td></tr>
        <tr><td><code>{"node scripts/atlas.mjs export split-compare-stamp --out ../my-demo"}</code></td><td>导出可运行 Demo + PROMPT.md + README.md + entry.json；<code>--code-only</code> 只导出代码</td></tr>
        <tr><td><code>{"node scripts/render.mjs demos/cases/map-pilgrimage/index.html --fps 30"}</code></td><td>逐帧渲染；有 ffmpeg 时自动合成 MP4</td></tr>
        <tr><td><code>{"node scripts/frames.mjs reference.mp4 --every 2"}</code></td><td>参考视频取帧，生成带时间码的接触表</td></tr>
      </tbody></table>
    </section>
    <section className="section agent-section" id="agent-format"><header className="section-head"><h2>资料格式</h2></header>
      <table className="table agent-table"><thead><tr><th>文件</th><th>内容</th></tr></thead><tbody>
        <tr><td><code>{"agent/catalog.json"}</code></td><td><code>taxonomy</code>、<code>protocol</code>，以及每个条目的摘要、标签、关联与 <code>bundle</code></td></tr>
        <tr><td><code>{"agent/cases/<id>.json"}</code></td><td><code>entry</code>（完整条目）、<code>documents.prompt</code>、<code>entrypoint</code>、<code>files[]</code>（path、bytes）</td></tr>
        <tr><td><code>{"agent/patterns/<id>.json"}</code></td><td><code>pattern</code>、<code>sourceCases</code>、<code>documents.prompt</code>、<code>entrypoint</code>、<code>files[]</code></td></tr>
        <tr><td><code>{"window.__motion"}</code></td><td>按时间播放 Demo 的运行时协议：<code>duration</code>、<code>markers</code>、<code>seek(t)</code>、<code>play()</code>、<code>pause()</code>、<code>on(fn)</code></td></tr>
      </tbody></table>
    </section>
  </div>;
}
