document.body.insertAdjacentHTML('afterbegin', "\n<canvas id=\"c\"></canvas>\n\n\n\n");

  const { init, render, W, H, FPS } = await import('./scene.js');
  window.DEMO = { width: W, height: H, fps: FPS, duration: 10, motionBlur: { samples: 1, shutter: 0.5 } };

    await document.fonts.load('64px "LXGW Marker Gothic"', '星火牌安全火柴');
    await document.fonts.load('600 34px "Caveat"', 'No. 0123456789 on 1s 2s 3s SC.');
    await document.fonts.load('700 80px "Caveat"', 'No. 0123456789');
    await document.fonts.load('74px "Long Cang"', '张');
    await document.fonts.ready;
    await init(document.getElementById('c'), window.devicePixelRatio || 1);
    window.renderAt = async (t) => { render(t); };
    render(0);
    window.__ready = true;

