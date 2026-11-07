export type Library = "web" | "motion";
export type EntryKind = "cases" | "patterns" | "materials";

export interface TokenMotion {
  name?: string;
  value?: string;
}

export interface RhythmBeat {
  t: number;
  label: string;
  note?: string;
}

export interface Rhythm {
  duration: number;
  bpm?: number;
  beats: RhythmBeat[];
}

export interface Layer {
  name: string;
  role: string;
}

export interface SourceRecord {
  title?: string;
  label?: string;
  url?: string;
  type?: string;
  note?: string;
  evidence?: string;
  caseId?: string;
  locator?: string;
  observation?: string;
  referenceUrl?: string;
  capturedAt?: string;
  focus?: FocusRecord;
}

export interface FocusPrepare {
  scroll?: string;
  waitFor?: string;
  click?: string;
  key?: string;
  input?: string;
  value?: string;
  images?: string;
  video?: string;
  minWidth?: number;
  maxWidth?: number;
}

export interface FocusRecord {
  target: string;
  label: string;
  instruction: string;
  entrypoint?: string;
  prepare?: FocusPrepare[];
  viewport?: "wide" | "mobile";
  replay?: string;
  phase?: "loading";
}

export interface GalleryItem {
  path?: string;
  caption?: string;
  kind?: string;
  sourceUrl?: string;
  license?: string;
  width?: number;
  height?: number;
  replicaPage?: string;
  compare?: {
    piece?: string;
    original?: string;
    sound?: boolean;
  };
}

export interface DemoItem {
  id?: string;
  title?: string;
  component?: string;
  summary?: string;
  entrypoint?: string;
  group?: string;
  parameters?: { name?: string; value?: string; note?: string }[];
}

export interface RelatedEntry {
  kind?: string;
  id?: string;
  note?: string;
}

export interface MigrationInstruction {
  field?: string;
  how?: string;
  entrypoint?: string;
  files?: string[];
  editGuide?: string;
}

export type Composition = Record<string, string | string[] | undefined>;

export interface AtlasEntry {
  id: string;
  order: number;
  title: string;
  en?: string;
  subtitle?: string;
  summary: string;
  tags?: string[];
  category?: string;
  type?: string;
  country?: string;
  carriers?: string[];
  style?: string;
  purpose?: string;
  tech?: string[];
  experienceTypes?: string[];
  types?: string[];
  cover?: string | null;
  coverMobile?: string | null;
  coverPortrait?: string | null;
  preview?: string;
  previewMobile?: string;
  previewAt?: number;
  previewAtPortrait?: number;
  capturedAt?: string;
  referenceUrl?: string;
  edition?: string;
  implementation?: string;
  demo?: string;
  research?: string;
  fidelity?: string;
  assetManifest?: string;
  referencePreview?: string;
  referencePreviewNote?: string;
  patternIds?: string[];
  relatedEntries?: RelatedEntry[];
  sources?: SourceRecord[];
  sourceFiles?: string[];
  principles?: string[];
  interaction?: string[];
  productFocus?: string;
  focus?: string;
  theme?: string;
  accent?: string;
  background?: string;
  themeBehavior?: Record<string, string>;
  soundBehavior?: Record<string, string>;
  composition?: Composition;
  tokens?: Record<string, unknown>;
  useCases?: string[];
  avoid?: string[];
  constraints?: string[];
  prompt?: string;
  negativePrompt?: string;
  videoPrompt?: string;
  exercise?: string;
  migration?: MigrationInstruction | MigrationInstruction[];
  mechanism?: string;
  trigger?: string;
  effect?: string;
  parameters?: { name?: string; value?: string; note?: string; source?: string }[];
  timing?: { name: string; value: string }[];
  markers?: { t: number; label: string }[];
  sound?: { voices?: string[]; score?: string; description?: string };
  rhythm?: Rhythm;
  energy?: number[];
  energySegments?: { t0?: number; t1?: number; from?: number; to?: number; label?: string }[];
  energyNote?: string;
  layers?: Layer[];
  observations?: (string | { at?: number | string; what?: string })[];
  attribution?: { scope?: string; notes?: string; name?: string; author?: string; url?: string; version?: string; license?: string }[];
  orients?: string[];
  timeline?: boolean;
  kit?: boolean;
  renderer?: string;
  installer?: string;
  install?: string;
  workflow?: string[];
  demos?: DemoItem[];
  demoNote?: string;
  gallery?: GalleryItem[];
  galleryRatio?: string;
  galleryFit?: string;
  upstream?: Record<string, string>;
  license?: Record<string, string>;
  snapshotPath?: string;
  snapshotEntry?: string;
  skillGuide?: unknown[];
  carrierNote?: string;
  locator?: string;
  studyScope?: string;
  theoryVerifiedAt?: string;
}

export interface EntrySet {
  cases: AtlasEntry[];
  patterns: AtlasEntry[];
  materials: AtlasEntry[];
}

export interface DocMeta {
  path: string;
  title: string;
  group: string;
  excerpt: string;
  bytes: number;
  hidden: boolean;
}

export interface DocContent extends DocMeta {
  content: string;
}

export interface AtlasMeta {
  library: Library;
  counts: Record<EntryKind, number>;
  entries: EntrySet;
  labels: Record<string, unknown>;
  docs: DocMeta[];
  docGroups: string[];
}

export interface DocsBundle {
  docs: DocContent[];
}