// MOTION-ATLAS: §3.3 / §4.2 expose resource readiness without adding application UI.
export const filmMode = new URLSearchParams(location.search).get("film") === "1";

export const filmProgress = {
  fonts: 0,
  cassette: 0,
  assembly: 0,
  frame: 0,
};

type FilmProgress = typeof filmProgress;
type FilmApp = {
  ready: Promise<void>;
  progress: FilmProgress;
  stats: () => Record<string, unknown>;
  error?: string;
};

declare global {
  interface Window {
    __filmSkipRender?: boolean;
    __filmApp?: FilmApp;
  }
}

let resolveReady: () => void;
let rejectReady: (error: unknown) => void;
const ready = new Promise<void>((resolve, reject) => {
  resolveReady = resolve;
  rejectReady = reject;
});

export function installFilmApp(extraStats: () => Record<string, unknown>) {
  if (!filmMode) return;
  window.__filmApp = {
    ready,
    progress: filmProgress,
    stats: () => ({ ...Reflect.get(window, "rhine").stats(), ...extraStats() }),
  };
}

export function filmLoaded(part: keyof FilmProgress) {
  if (!filmMode) return;
  filmProgress[part] = 1;
  window.dispatchEvent(new CustomEvent("film:progress", { detail: filmProgress }));
}

export async function preloadFilmFonts(text: string) {
  const load = Reflect.get(window.parent, "MotionKit").load;
  const sheets = Reflect.get(window, "__filmStylesheets") as string[];
  await Promise.all(sheets.map(url => load.stylesheet(url, { document, fontText: text })));
  await Promise.all(
    [300, 400, 600, 700].map((weight) =>
      document.fonts.load(`${weight} 20px MiSans`, text),
    ),
  );
  await document.fonts.ready;
  filmLoaded("fonts");
}

export function finishFilmReady() {
  filmLoaded("frame");
  resolveReady();
}

export function failFilmReady(error: unknown) {
  if (!filmMode) return;
  window.__filmApp!.error = String(error);
  rejectReady(error);
}
