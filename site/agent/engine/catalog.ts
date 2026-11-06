import type { AtlasData } from "@/core/types";
import type { AgentItem, AgentState } from "./types";

const ROLE_ORDER: Record<string, number> = { foundation: 0, support: 1, accent: 2 };
export const ROLE_NAME: Record<string, string> = { foundation: '骨架', support: '支撑', accent: '点睛', case: '案例' };

export function createItems(data: AtlasData): AgentItem[] {
  return [
    ...data.cases.map(e => ({ kind: 'cases' as const, e, role: 'case', sub: e.carriers.map((k: string) => data.labels.cases.carriers[k]).join(' / ') })),
    ...data.patterns.map(e => ({ kind: 'patterns' as const, e, role: (e.composition && e.composition.role) || 'support', sub: e.types.map((k: string) => data.labels.patterns.types[k]).join(' / ') })),
  ];
}
export function filterItems(items: AgentItem[], kind: AgentState["kind"], query: string) {
  const q = query.trim().toLowerCase();
  return items.filter(x => (kind === 'all' || x.kind === kind) && (!q || [x.e.id, x.e.title, x.e.summary, x.sub, ...(x.e.tags || [])].join(' ').toLowerCase().includes(q)));
}
export function ordered(S: AgentState, byId: Map<string, AgentItem>) {
  return S.sel.map(id => byId.get(id)!).filter(Boolean).sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'cases' ? -1 : 1) || (ROLE_ORDER[a.role] ?? -1) - (ROLE_ORDER[b.role] ?? -1));
}
