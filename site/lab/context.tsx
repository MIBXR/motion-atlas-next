import { createContext, useContext, useSyncExternalStore } from "react";
import type { Lab } from "./engine/lab";
export const LabContext = createContext<Lab>(null!);
export function useLab() {
  const lab = useContext(LabContext);
  useSyncExternalStore(lab.subscribe, lab.snapshot);
  return lab;
}
export function useLabFrame() {
  const lab = useContext(LabContext);
  return useSyncExternalStore(lab.subscribeFrame, lab.frame);
}
