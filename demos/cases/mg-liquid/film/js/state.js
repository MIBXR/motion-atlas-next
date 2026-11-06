export function baseState(t) {
  return {
    t, frame: Math.round(t * 30), k: 0.1, floorY: 872, horizon: 786,
    cam: { zoom: 1, px: 960, py: 540, ox: 0, oy: 0 },
    balls: [], segs: [], letters: [],
    flood: { on: false, front: 0, back: 0, phase: 0, amp: 0, freq: 0, lean: 0, u: 0 },
    overlays: [{ on: false, front: 0, back: 0, phase: 0, amp: 0, freq: 0, lean: 0, u: 0 }, { on: false, front: 0, back: 0, phase: 0, amp: 0, freq: 0, lean: 0, u: 0 }, { on: false, front: 0, back: 0, phase: 0, amp: 0, freq: 0, lean: 0, u: 0 }],
    rip: { x: 0, y: 0, age: 0, amp: 0 },
    key: { x: -0.78, y: -0.95, glint: -9999, glintAmp: 0 },
    bloom: 0.55, flash: 0,
  };
}
