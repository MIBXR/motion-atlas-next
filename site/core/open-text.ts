import type * as React from "react";

export const TEXT_FILE = /\.(md|json|js|mjs|ts|tsx|css|txt)$|\/(README|LICENSE|LICENCE|COPYING|NOTICE|AUTHORS|PATENTS|COPYRIGHT)(?:[-_][^/.]+)?$/i;

/** 新标签查看同源文本文件：取回文本后用带 utf-8 声明的 Blob 打开，不依赖服务器的 Content-Type。 */
export async function openText(event: React.MouseEvent, anchor = event.currentTarget as HTMLAnchorElement) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  const href = anchor.href;
  const tab = window.open("", "_blank")!;
  try {
    const response = await fetch(href);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const type = new URL(href).pathname.toLowerCase().endsWith(".json") ? "application/json;charset=utf-8" : "text/plain;charset=utf-8";
    tab.opener = null;
    tab.location.href = URL.createObjectURL(new Blob([text], { type }));
  } catch (error) {
    tab.close();
    throw error;
  }
}
