export interface LabState {
  v: number; bpm: number; meter: string; div: number; swing: number; offset: number;
  kit: string; vol: number; lv: { bar: number; beat: number; sub: number }; sound: boolean;
  bars: number; strength: number; mode: string; evVoice: string; startCue: boolean;
  ev: number[]; example: string; lat: number; curve: number[]; preset: string;
  dur: number; stag: number; dist: number; count: number; sync: boolean; align: string;
  cue: boolean; trail: boolean; ghost: boolean; tab: string; wavCycles: number;
}
export type LabPatch = Omit<Partial<LabState>, "lv"> & { lv?: Partial<LabState["lv"]> };
export interface Meter { n: number; unit: number; groups: number[]; hint: string }
export interface Clip { m: Meter; bpb: number; spb: number; loopBeats: number; L: number; bars: number; o: number; acc: Set<number> }
export interface GridPoint { p: number; n: number; k: number }
export interface EventDetail {
  i: number; t: number; x: number; q: GridPoint; full: number; snap: number; dev: number;
  devFull: number; kind: string; label: string; inLoop: boolean; dup: number;
}
export type VoiceParams = Record<string, string | number>;
export type Kit = { name: string } & Record<"bar" | "acc" | "beat" | "sub", [string, VoiceParams][]>;
export interface EventVoice { name: string; v: string; p: VoiceParams }
export interface Example {
  name: string; desc: string; tip: string; tries: [string, LabPatch][];
  make: (c: Clip) => { t?: number; x?: number; dev?: number }[];
}
export interface SoundEvent { kind: string; lv?: string | number; pos: number; v: string; p: VoiceParams; gain: number; pan?: number; seed: number; cyc?: number }
export interface SoundLog { k: string; lv?: string | number; v: string; pos: number; when: number; at: number; cyc?: number; x?: number }
export interface Recording { state: string; taps: number[]; start: number }
export interface ClockState {
  run: boolean; src: string; t0: number; p0: number; bar: number; cursor: number;
  pend: { when: number; h: { stop: () => void }; log: SoundLog }[];
  rec: Recording | null; abPhase: number; vis?: { heard: number | null; beat: number | null };
}
export interface OfflineResult {
  data: Float32Array[]; sampleRate: number; channels: number; duration: number;
  peakDb: number; rmsDb: number; clipped: number; events: number;
  wav: () => ArrayBuffer; base64: () => Promise<string>;
}
export interface MotionAudio {
  state: string; enabled: boolean; ctx: AudioContext | null;
  voices: Record<string, (ctx: AudioContext, out: AudioNode, when: number, p: VoiceParams) => number>;
  meta: Record<string, { bus?: string; send?: number; level?: number }>;
  define: (name: string, fn: (ctx: AudioContext, out: AudioNode, when: number, p: VoiceParams) => number, meta: Record<string, unknown>) => void;
  play: (voice: string, params: Record<string, unknown>) => { stop: () => void } | null;
  enable: () => void; disable: () => void;
  on: (event: string, cb: () => void) => () => void;
  renderOffline: (score: Record<string, unknown>[], duration: number, options: Record<string, number>) => Promise<OfflineResult>;
}
declare global {
  interface Window {
    MotionKit: { bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => number; audio: MotionAudio };
  }
}
