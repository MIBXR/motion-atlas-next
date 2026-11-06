import { Thumbnail } from '@remotion/player';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { ThemedFilm } from './src/themes/ThemedFilm';
import { AIFL_TOTAL } from './src/aifl/Main';

const liveTextures: HTMLImageElement[] = [];

export function mountInk(el: HTMLElement) {
  window.remotion_staticBase = new URL('../assets', import.meta.url).pathname.replace(/\/$/, '');
  window.MotionKit.preload([async () => {
    await Promise.all([
      'card1.png', 'card2.png', 'card3.png', 'card4.png', 'card4-hires.png',
      'card5.png', 'card6.png', 'card7.png', 'card8.png', 'card9.png', 'card10.png',
      'detail-experiments.png', 'detail-full.png',
      'float-filter.png', 'float-search.png', 'float-section.png', 'float-stats.png',
      'nav.png', 'paper1.png', 'paper2.png', 'paper3.png', 'paper4.png', 'paper5.png',
      'papers-full.png', 'projects-empty.png', 'projects-full.png', 'wbr-full.png',
    ].map(async name => {
      const img = new Image();
      liveTextures.push(img);
      img.src = new URL(`../assets/textures/live/${name}`, import.meta.url).href;
      await img.decode();
    }));
  }]);
  if (new URLSearchParams(window.location.search).has('render')) {
    window.process = { env: { NODE_ENV: 'production' } };
    window.remotion_puppeteerTimeout = 30000;
  }
  const root = createRoot(el);
  let lastRender = { frame: -1, complete: false };

  async function renderAt(t: number) {
    const frame = Math.min(AIFL_TOTAL - 1, Math.max(0, Math.round(t * 30)));
    if (frame === lastRender.frame && lastRender.complete) return;
    const rendering = { frame, complete: false };
    lastRender = rendering;
    flushSync(() => root.render(
      <Thumbnail
        component={ThemedFilm}
        inputProps={{ theme: 'ink-press' }}
        compositionWidth={1920}
        compositionHeight={1080}
        durationInFrames={AIFL_TOTAL}
        fps={30}
        frameToDisplay={frame}
        style={{ width: 1920, height: 1080 }}
      />
    ));
    await Promise.all(Array.from(el.querySelectorAll('img'), img => img.decode()));
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    rendering.complete = true;
  }

  return { renderAt, duration: AIFL_TOTAL / 30, width: 1920, height: 1080, fps: 30 };
}
