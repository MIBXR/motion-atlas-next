export const BPM = 60;
export const FPS = 30;
export const BEAT = 60 / BPM;
export const BAR = BEAT * 4;
export const b = n => n * BEAT;
export const DUR = 20;
export const BEATS = [0.5, 1.464, 2.428, 3.403, 4.355, 5.446, 6.363, 7.408, 8.337, 9.429, 10.346, 11.344, 12.366, 13.271, 14.34, 15.315, 16.406, 17.3, 18.287, 19.297];
export const EVENTS = { firstStroke: BEATS[0], peak: BEATS[10], source: BEATS[17] };
export const AUDIO = { mode: 'file', file: 'audio/final.wav', musicStart: 7.162, fadeIn: 0.1, fadeStart: 18.5 };
export const ENTRY = { peak: 0.3, source: 0.35 };
export const TIMES = { drawStart: BEATS[2], drawEnd: BEATS[7], zoomIn: BEATS[7], close: BEATS[10], zoomOut: BEATS[12], wide: BEATS[15] };
export const SHOTS = [
  { id: 'hook', t0: 0, t1: TIMES.drawStart },
  { id: 'trend', t0: TIMES.drawStart, t1: TIMES.zoomIn },
  { id: 'zoom-in', t0: TIMES.zoomIn, t1: TIMES.close },
  { id: 'season', t0: TIMES.close, t1: TIMES.zoomOut },
  { id: 'zoom-out', t0: TIMES.zoomOut, t1: TIMES.wide },
  { id: 'ending', t0: TIMES.wide, t1: DUR },
];
export const CUES = [
  { id: 'firstStroke', t: EVENTS.firstStroke, file: '../audio/kenney/impact-sounds/Audio/impactWood_light_001.ogg' },
  { id: 'peak', t: EVENTS.peak, file: '../audio/kenney/impact-sounds/Audio/impactSoft_medium_000.ogg' },
  { id: 'source', t: EVENTS.source, file: '../audio/kenney/ui-audio/Audio/click1.ogg' },
];
export const HOLDS = [[0, EVENTS.firstStroke], [TIMES.close, TIMES.zoomOut], [TIMES.wide, EVENTS.source], [EVENTS.source + ENTRY.source, DUR]];
export const DROPS = [];
