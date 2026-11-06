import type { AgentState } from "./types";

export function readState(ids: Set<string>): AgentState {
  const S: AgentState = { sel: ['map-pilgrimage', 'split-compare-stamp'], kind: 'all', target: 'code', brief: '', ...JSON.parse(localStorage.getItem('ma-agent') || '{}') };
  S.sel = S.sel.filter(id => ids.has(id));
  return S;
}
export function saveState(S: AgentState) { localStorage.setItem('ma-agent', JSON.stringify(S)); }
