import type { Entry } from "@/core/types";

export interface AgentState {
  sel: string[];
  kind: "all" | "cases" | "patterns";
  target: "code" | "video";
  brief: string;
}
export interface AgentItem { kind: "cases" | "patterns"; e: Entry; role: string; sub: string }
