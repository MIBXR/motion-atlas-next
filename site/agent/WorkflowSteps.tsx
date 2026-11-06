export function WorkflowSteps() {
  return <section className="section agent-section" id="agent-steps">
    <header className="section-head"><h2>推荐工作流</h2></header>
    <ol className="agent-steps">
      <li><b>01 检索</b><p>读 <code>agent/catalog.json</code> 的摘要字段，或运行 <code>atlas.mjs search</code>。按载体与类型筛选。</p></li>
      <li><b>02 读取</b><p>打开 <code>agent/&lt;kind&gt;/&lt;id&gt;.json</code>，读取条目全文、Prompt 文档、入口和文件清单。</p></li>
      <li><b>03 组合</b><p>按职责挑选：1 个骨架 + 2–4 个支撑 + 1–2 个点睛；检查 <code>pairsWellWith</code> 与 <code>conflicts</code>。</p></li>
      <li><b>04 导出</b><p><code>atlas.mjs export &lt;id&gt; --out dir</code> 得到可运行 Demo、PROMPT.md 与迁移说明；只改 <code>config.js</code> / <code>CONFIG</code>。</p></li>
      <li><b>05 验证</b><p>按节拍表截图核对；按时间播放的作品用 <code>render.mjs</code> 逐帧出片；遵守 12px 字号与减少动态要求。</p></li>
    </ol>
  </section>;
}
