document.body.insertAdjacentHTML('afterbegin', "\n<canvas id=\"c\" width=\"1920\" height=\"1080\"></canvas>\n\n");
await document.fonts.load('12px "Fusion Pixel 12"', '神秘宝箱欢迎来到像素世界！像素冒险');
await document.fonts.load('8px "Press Start 2P"', 'SCORE PRESS START x0123456789');
await document.fonts.ready;
await import('./film.js');
window.__ready = true;
