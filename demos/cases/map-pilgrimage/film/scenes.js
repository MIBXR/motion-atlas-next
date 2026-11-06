/*
 * 程序化“照片”：在没有真实素材时为卡片、全屏、回忆与对比生成原创画面（全部由 Canvas 绘制，无外部素材）。
 * paintScene(kind, style, w, h, seed) → canvas
 *   kind:  window（关西机场 · 机窗外的大阪湾）| torii（伏见稻荷 · 千本鸟居）| kamo（鸭川 · 三条大桥，黄昏）
 *          | deer（奈良公园 · 鹿与东大寺大屋顶）| neon（道顿堀 · 运河夜景霓虹）
 *   style: photo（实拍感）| postcard（旧明信片）| illustration（动画回忆感：高饱和、柔光、光斑）
 * 画面按宽高比自适应：横屏 16:9 与竖屏 9:16 各自构图（地平线、主体位置随比例移动）。
 * 每张图里都藏着旅伴“蜜柑”（橘色猫玩偶），与 HUD 的 MIKAN SPOTTED 计数呼应。
 * 换成真实照片：在 config.js 的 cards[].media 填图片路径即可，不需要本文件。
 */
(function (global) {
  'use strict';
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // 一维分形噪声（山脊线、岸线）
  function ridge(r, octaves = 4) {
    const tables = Array.from({ length: octaves }, () => Array.from({ length: 64 }, r));
    return (x) => {
      let v = 0, amp = 1, freq = 1, norm = 0;
      for (let o = 0; o < octaves; o++) {
        const xx = x * freq * 6, i = Math.floor(xx), f = xx - i, s = f * f * (3 - 2 * f), tb = tables[o];
        v += amp * (tb[i & 63] * (1 - s) + tb[(i + 1) & 63] * s);
        norm += amp; amp *= 0.5; freq *= 2;
      }
      return v / norm;
    };
  }
  const grad = (ctx, x0, y0, x1, y1, stops) => { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; };
  const radial = (ctx, x, y, r0, r1, stops) => { const g = ctx.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; };
  const glow = (ctx, x, y, r, color, a = 1) => { ctx.fillStyle = radial(ctx, x, y, 0, r, [[0, color.replace('A', a)], [1, color.replace('A', 0)]]); ctx.fillRect(x - r, y - r, r * 2, r * 2); };
  function poly(ctx, pts, fill) { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }
  function hills(ctx, w, base, amp, color, r, rough = 4, top = 0) {
    const n = ridge(r, rough);
    ctx.beginPath(); ctx.moveTo(0, base + amp + 2000);
    for (let x = 0; x <= w; x += 4) ctx.lineTo(x, base - n(x / w) * amp - top);
    ctx.lineTo(w, base + amp + 2000); ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }

  /* ---------- 旅伴“蜜柑”：橘色猫玩偶（s = 身高） ---------- */
  function mikan(ctx, x, y, s, light = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = 'rgba(0,0,0,.25)';
    ctx.beginPath(); ctx.ellipse(0, 0, s * 0.42, s * 0.08, 0, 0, Math.PI * 2); ctx.fill();
    const body = grad(ctx, -s * 0.4, -s, s * 0.4, 0, [[0, `rgb(${Math.round(250 * light)},${Math.round(176 * light)},${Math.round(84 * light)})`], [1, `rgb(${Math.round(214 * light)},${Math.round(122 * light)},${Math.round(44 * light)})`]]);
    ctx.fillStyle = body;
    ctx.beginPath(); ctx.ellipse(0, -s * 0.3, s * 0.34, s * 0.3, 0, 0, Math.PI * 2); ctx.fill();          // 身体
    ctx.beginPath(); ctx.ellipse(0, -s * 0.72, s * 0.4, s * 0.32, 0, 0, Math.PI * 2); ctx.fill();         // 头
    ctx.beginPath(); ctx.moveTo(-s * 0.36, -s * 0.86); ctx.lineTo(-s * 0.3, -s * 1.12); ctx.lineTo(-s * 0.12, -s * 0.98); ctx.fill(); // 耳
    ctx.beginPath(); ctx.moveTo(s * 0.36, -s * 0.86); ctx.lineTo(s * 0.3, -s * 1.12); ctx.lineTo(s * 0.12, -s * 0.98); ctx.fill();
    ctx.fillStyle = `rgba(255,236,206,${0.9 * light})`;
    ctx.beginPath(); ctx.ellipse(0, -s * 0.24, s * 0.18, s * 0.17, 0, 0, Math.PI * 2); ctx.fill();          // 肚子
    ctx.fillStyle = '#2a1d16';
    ctx.beginPath(); ctx.arc(-s * 0.14, -s * 0.74, s * 0.045, 0, Math.PI * 2); ctx.arc(s * 0.14, -s * 0.74, s * 0.045, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#c9452e';
    ctx.beginPath(); ctx.moveTo(-s * 0.035, -s * 0.66); ctx.lineTo(s * 0.035, -s * 0.66); ctx.lineTo(0, -s * 0.62); ctx.fill();
    ctx.strokeStyle = 'rgba(120,60,20,.55)'; ctx.lineWidth = Math.max(1, s * 0.025);
    for (const k of [-1, 1]) for (const dy of [0, 0.05]) { ctx.beginPath(); ctx.moveTo(k * s * 0.2, -s * (0.66 - dy)); ctx.lineTo(k * s * 0.38, -s * (0.68 - dy * 1.6)); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(160,80,20,.35)'; ctx.lineWidth = Math.max(1, s * 0.03);
    for (const k of [-0.12, 0, 0.12]) { ctx.beginPath(); ctx.moveTo(k * s, -s * 1.0); ctx.lineTo(k * s * 1.2, -s * 0.9); ctx.stroke(); } // 额头条纹
    ctx.restore();
  }

  /* ---------- 机窗：关西机场 ---------- */
  function sceneWindow(ctx, w, h, r) {
    const U = Math.min(w, h), por = h > w;
    // 舱壁
    ctx.fillStyle = grad(ctx, 0, 0, w, h, [[0, '#e9e4da'], [0.5, '#d9d2c4'], [1, '#bdb4a3']]);
    ctx.fillRect(0, 0, w, h);
    const cx = w * (por ? 0.5 : 0.47), cy = h * (por ? 0.45 : 0.5), ww = por ? w * 0.74 : w * 0.46, wh = por ? h * 0.5 : h * 0.8;
    // 窗洞外缘的软阴影与内框
    ctx.save();
    ctx.shadowColor = 'rgba(60,50,35,.35)'; ctx.shadowBlur = U * 0.06; ctx.shadowOffsetY = U * 0.01;
    ctx.fillStyle = '#cfc7b8';
    roundRect(ctx, cx - ww * 0.58, cy - wh * 0.56, ww * 1.16, wh * 1.12, ww * 0.42); ctx.fill();
    ctx.restore();
    ctx.fillStyle = grad(ctx, cx - ww * 0.6, 0, cx + ww * 0.6, 0, [[0, '#b6ad9c'], [0.5, '#e6e0d4'], [1, '#a59b89']]);
    roundRect(ctx, cx - ww * 0.53, cy - wh * 0.52, ww * 1.06, wh * 1.04, ww * 0.4); ctx.fill();
    // 窗外：天空、大阪湾、关西机场人工岛、连络桥、海岸线
    ctx.save();
    roundRect(ctx, cx - ww / 2, cy - wh / 2, ww, wh, ww * 0.36); ctx.clip();
    const x0 = cx - ww / 2, y0 = cy - wh / 2, hz = y0 + wh * 0.26;
    ctx.fillStyle = grad(ctx, 0, y0, 0, hz, [[0, '#6f9ccc'], [0.7, '#b9d3e8'], [1, '#e6eef2']]);
    ctx.fillRect(x0, y0, ww, hz - y0 + 2);
    hills(ctx, w, hz, wh * 0.05, '#93a9b7', r, 3);
    ctx.fillStyle = grad(ctx, 0, hz, 0, y0 + wh, [[0, '#7fa3ba'], [0.4, '#4d7f9e'], [1, '#2f5f80']]);
    ctx.fillRect(x0, hz, ww, wh);
    // 海面反光
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 140; i++) {
      const y = hz + Math.pow(r(), 1.6) * wh * 0.74, x = x0 + r() * ww, l = (6 + r() * 30) * (0.4 + (y - hz) / wh);
      ctx.fillStyle = 'rgba(235,245,255,.6)'; ctx.fillRect(x, y, l, Math.max(1, U * 0.0015));
    }
    ctx.globalAlpha = 1;
    // 人工岛（透视的长方形 + 两条跑道）
    const ix = x0 + ww * 0.18, iy = hz + wh * 0.2, iw = ww * 0.58, ih = wh * 0.12;
    poly(ctx, [[ix, iy + ih], [ix + iw * 0.12, iy], [ix + iw, iy - ih * 0.18], [ix + iw * 0.94, iy + ih * 0.78]], '#cfd2c8');
    poly(ctx, [[ix + iw * 0.06, iy + ih * 0.66], [ix + iw * 0.16, iy + ih * 0.08], [ix + iw * 0.9, iy - ih * 0.06], [ix + iw * 0.86, iy + ih * 0.54]], '#9aa19d');
    ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = Math.max(1, U * 0.002); ctx.setLineDash([U * 0.008, U * 0.008]);
    ctx.beginPath(); ctx.moveTo(ix + iw * 0.1, iy + ih * 0.38); ctx.lineTo(ix + iw * 0.88, iy + ih * 0.22); ctx.stroke(); ctx.setLineDash([]);
    poly(ctx, [[ix + iw * 0.4, iy + ih * 0.7], [ix + iw * 0.44, iy + ih * 0.55], [ix + iw * 0.62, iy + ih * 0.5], [ix + iw * 0.6, iy + ih * 0.66]], '#e8e6df');
    // 连络桥
    ctx.strokeStyle = '#d7d9d4'; ctx.lineWidth = Math.max(2, U * 0.004);
    ctx.beginPath(); ctx.moveTo(ix + iw * 0.98, iy + ih * 0.1); ctx.quadraticCurveTo(x0 + ww * 0.9, iy - ih * 0.1, x0 + ww * 1.02, hz + wh * 0.06); ctx.stroke();
    // 云
    for (let i = 0; i < 9; i++) {
      const cxx = x0 + r() * ww, cyy = hz + wh * (0.42 + r() * 0.4), rr = U * (0.03 + r() * 0.05);
      ctx.fillStyle = radial(ctx, cxx, cyy, 0, rr, [[0, 'rgba(255,255,255,.75)'], [1, 'rgba(255,255,255,0)']]);
      ctx.beginPath(); ctx.ellipse(cxx, cyy, rr * 2.2, rr, 0, 0, Math.PI * 2); ctx.fill();
    }
    // 机翼（右下伸入）+ 翼尖灯
    poly(ctx, [[x0 + ww * 0.32, y0 + wh * 1.02], [x0 + ww * 0.98, y0 + wh * 0.66], [x0 + ww * 1.04, y0 + wh * 0.7], [x0 + ww * 0.62, y0 + wh * 1.06]], grad(ctx, 0, y0 + wh * 0.66, 0, y0 + wh, [[0, '#dfe3e8'], [1, '#9aa3ad']]));
    poly(ctx, [[x0 + ww * 0.9, y0 + wh * 0.7], [x0 + ww * 0.96, y0 + wh * 0.56], [x0 + ww * 0.99, y0 + wh * 0.57], [x0 + ww * 0.97, y0 + wh * 0.69]], '#c7ccd2');
    glow(ctx, x0 + ww * 0.97, y0 + wh * 0.57, U * 0.03, 'rgba(255,90,60,A)', 0.9);
    // 窗玻璃的冷色反光
    ctx.fillStyle = grad(ctx, x0, y0, x0 + ww, y0 + wh, [[0, 'rgba(255,255,255,.18)'], [0.35, 'rgba(255,255,255,0)'], [0.8, 'rgba(180,210,255,.06)'], [1, 'rgba(255,255,255,.12)']]);
    ctx.fillRect(x0, y0, ww, wh);
    ctx.restore();
    // 遮光板（拉起）
    ctx.fillStyle = grad(ctx, 0, cy - wh * 0.5, 0, cy - wh * 0.4, [[0, '#d6cfc1'], [1, '#c4bba9']]);
    roundRect(ctx, cx - ww * 0.48, cy - wh * 0.5 - U * 0.02, ww * 0.96, wh * 0.08, U * 0.02); ctx.fill();
    // 蜜柑趴在窗沿
    mikan(ctx, cx + ww * (por ? 0.26 : 0.36), cy + wh * 0.5 + U * 0.03, U * (por ? 0.17 : 0.2), 0.95);
  }
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  /* ---------- 千本鸟居：伏见稻荷 ---------- */
  function sceneTorii(ctx, w, h, r) {
    const U = Math.min(w, h), por = h > w;
    const vx = w * (por ? 0.52 : 0.56), vy = h * (por ? 0.46 : 0.44);
    // 远处的林间光
    ctx.fillStyle = grad(ctx, 0, 0, 0, h, [[0, '#2f4a2c'], [0.45, '#6b8a4e'], [0.55, '#9eb06c'], [1, '#3b2e22']]);
    ctx.fillRect(0, 0, w, h);
    glow(ctx, vx, vy, U * 0.5, 'rgba(255,244,214,A)', 0.95);
    // 树叶的斑驳（两侧上方）
    for (let i = 0; i < 260; i++) {
      const x = r() * w, y = r() * h * 0.6, rr = U * (0.01 + r() * 0.05);
      const d = Math.hypot(x - vx, y - vy) / U;
      if (d < 0.18) continue;
      ctx.fillStyle = `rgba(${30 + r() * 40},${60 + r() * 50},${25 + r() * 25},${0.35 + r() * 0.4})`;
      ctx.beginPath(); ctx.ellipse(x, y, rr * 1.4, rr, r() * 3, 0, Math.PI * 2); ctx.fill();
    }
    // 石板路
    poly(ctx, [[vx - U * 0.03, vy + U * 0.02], [vx + U * 0.03, vy + U * 0.02], [w * (por ? 1.2 : 0.95), h], [w * (por ? -0.2 : 0.12), h]], grad(ctx, 0, vy, 0, h, [[0, '#a59a86'], [1, '#5b5144']]));
    for (let i = 0; i < 24; i++) {
      const k = Math.pow(i / 24, 2), y = lerp(vy + U * 0.02, h, k);
      ctx.strokeStyle = `rgba(60,50,40,${0.12 + k * 0.25})`; ctx.lineWidth = 1 + k * U * 0.004;
      const half = lerp(U * 0.03, w * (por ? 0.7 : 0.42), k);
      ctx.beginPath(); ctx.moveTo(vx - half, y); ctx.lineTo(vx + half, y); ctx.stroke();
    }
    // 鸟居：从远到近，透视缩放；朱红柱身有圆柱明暗，顶部黑色笠木
    const N = 26;
    for (let i = N; i >= 0; i--) {
      const z = Math.pow(i / N, 1.6), s = lerp(1.25, 0.06, z);
      const half = U * 0.42 * s * (por ? 0.95 : 1.15), top = vy - U * 0.62 * s, base = vy + U * 0.6 * s;
      const pw = U * 0.052 * s, shade = 1 - z * 0.45;
      const pillar = (x) => {
        ctx.fillStyle = grad(ctx, x - pw / 2, 0, x + pw / 2, 0, [[0, `rgb(${Math.round(140 * shade)},${Math.round(30 * shade)},${Math.round(14 * shade)})`], [0.35, `rgb(${Math.round(232 * shade)},${Math.round(84 * shade)},${Math.round(38 * shade)})`], [0.6, `rgb(${Math.round(214 * shade)},${Math.round(64 * shade)},${Math.round(28 * shade)})`], [1, `rgb(${Math.round(110 * shade)},${Math.round(22 * shade)},${Math.round(12 * shade)})`]]);
        ctx.fillRect(x - pw / 2, top, pw, base - top);
        ctx.fillStyle = '#1b1715'; ctx.fillRect(x - pw * 0.6, base - U * 0.05 * s, pw * 1.2, U * 0.05 * s);
        // 柱上的墨书（抽象笔画）
        if (s > 0.18) {
          ctx.fillStyle = `rgba(20,14,12,${0.55 * shade})`;
          for (let k = 0; k < 6; k++) { const yy = top + (base - top) * (0.22 + k * 0.07); ctx.fillRect(x - pw * 0.12, yy, pw * (0.18 + (k % 3) * 0.08), U * 0.012 * s); }
        }
      };
      pillar(vx - half); pillar(vx + half);
      // 贯（nuki）
      ctx.fillStyle = `rgb(${Math.round(196 * shade)},${Math.round(58 * shade)},${Math.round(26 * shade)})`;
      ctx.fillRect(vx - half - pw * 0.7, top + U * 0.1 * s, half * 2 + pw * 1.4, U * 0.028 * s);
      // 笠木（上横梁，两端上翘）+ 黑色顶盖
      ctx.fillStyle = `rgb(${Math.round(214 * shade)},${Math.round(70 * shade)},${Math.round(32 * shade)})`;
      ctx.beginPath();
      ctx.moveTo(vx - half - pw * 1.6, top - U * 0.012 * s);
      ctx.quadraticCurveTo(vx, top + U * 0.012 * s, vx + half + pw * 1.6, top - U * 0.012 * s);
      ctx.lineTo(vx + half + pw * 1.4, top + U * 0.03 * s);
      ctx.quadraticCurveTo(vx, top + U * 0.05 * s, vx - half - pw * 1.4, top + U * 0.03 * s);
      ctx.fill();
      ctx.fillStyle = '#17120f';
      ctx.beginPath();
      ctx.moveTo(vx - half - pw * 1.8, top - U * 0.03 * s);
      ctx.quadraticCurveTo(vx, top - U * 0.002 * s, vx + half + pw * 1.8, top - U * 0.03 * s);
      ctx.lineTo(vx + half + pw * 1.6, top - U * 0.008 * s);
      ctx.quadraticCurveTo(vx, top + U * 0.016 * s, vx - half - pw * 1.6, top - U * 0.008 * s);
      ctx.fill();
    }
    // 穿过缝隙的光柱
    ctx.save(); ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 7; i++) {
      const x = vx + (r() - 0.5) * w * 0.5;
      ctx.fillStyle = grad(ctx, x, 0, x + w * 0.08, h, [[0, 'rgba(255,240,200,.16)'], [1, 'rgba(255,240,200,0)']]);
      poly(ctx, [[x, 0], [x + U * 0.04, 0], [x + U * 0.2, h], [x + U * 0.1, h]], ctx.fillStyle);
    }
    ctx.restore();
    // 地面光斑
    for (let i = 0; i < 40; i++) {
      const y = lerp(vy + U * 0.1, h, Math.pow(r(), 0.7)), x = vx + (r() - 0.5) * (y - vy) * 1.6, rr = U * 0.012 * (0.4 + (y - vy) / h * 3);
      ctx.fillStyle = 'rgba(255,236,190,.22)'; ctx.beginPath(); ctx.ellipse(x, y, rr * 2.2, rr * 0.7, 0, 0, Math.PI * 2); ctx.fill();
    }
    // 石灯笼 + 蜜柑
    const lx = w * (por ? 0.16 : 0.18), ly = h * 0.94, ls = U * 0.26;
    ctx.fillStyle = '#6d675e';
    ctx.fillRect(lx - ls * 0.08, ly - ls, ls * 0.16, ls);
    poly(ctx, [[lx - ls * 0.3, ly - ls * 1.02], [lx + ls * 0.3, ly - ls * 1.02], [lx + ls * 0.2, ly - ls * 1.12], [lx - ls * 0.2, ly - ls * 1.12]], '#5a554d');
    ctx.fillStyle = '#7b756b'; ctx.fillRect(lx - ls * 0.18, ly - ls * 1.32, ls * 0.36, ls * 0.2);
    glow(ctx, lx, ly - ls * 1.22, ls * 0.25, 'rgba(255,200,120,A)', 0.45);
    poly(ctx, [[lx - ls * 0.34, ly - ls * 1.32], [lx + ls * 0.34, ly - ls * 1.32], [lx, ly - ls * 1.52]], '#4f4a43');
    mikan(ctx, w * (por ? 0.74 : 0.8), h * 0.97, U * 0.2, 0.92);
  }

  /* ---------- 鸭川 · 三条大桥（黄昏） ---------- */
  function sceneKamo(ctx, w, h, r, opts = {}) {
    const U = Math.min(w, h), por = h > w, old = !!opts.old;
    const hz = h * (por ? 0.42 : 0.46);
    // 天空：日落后的粉橘渐变
    ctx.fillStyle = grad(ctx, 0, 0, 0, hz, [[0, '#4b5f8e'], [0.45, '#c88d8f'], [0.8, '#f2b27a'], [1, '#f6d1a0']]);
    ctx.fillRect(0, 0, w, hz + 4);
    glow(ctx, w * 0.3, hz - U * 0.02, U * 0.5, 'rgba(255,214,160,A)', 0.55);
    // 云带
    for (let i = 0; i < 12; i++) {
      const y = hz * (0.15 + r() * 0.55), x = r() * w, l = w * (0.15 + r() * 0.3);
      ctx.fillStyle = `rgba(${200 + r() * 40},${120 + r() * 50},${120 + r() * 40},.28)`;
      ctx.beginPath(); ctx.ellipse(x, y, l / 2, U * (0.006 + r() * 0.01), -0.02, 0, Math.PI * 2); ctx.fill();
    }
    // 东山：两层山影
    hills(ctx, w, hz - U * 0.03, U * 0.16, '#6a6d86', r, 3);
    hills(ctx, w, hz + U * 0.005, U * 0.09, '#4f5a6c', r, 4);
    // 对岸的低层街屋（现代版多一些高楼与灯）
    let x = -U * 0.02;
    while (x < w) {
      const bw = U * (0.03 + r() * 0.06), bh = U * (old ? 0.02 + r() * 0.04 : 0.03 + r() * (r() > 0.85 ? 0.16 : 0.07));
      ctx.fillStyle = old ? '#4b4038' : `rgb(${50 + r() * 20},${50 + r() * 18},${64 + r() * 20})`;
      ctx.fillRect(x, hz + U * 0.04 - bh, bw, bh + U * 0.02);
      if (!old) for (let k = 0; k < 4; k++) if (r() > 0.45) { ctx.fillStyle = r() > 0.4 ? 'rgba(255,214,150,.9)' : 'rgba(190,220,255,.8)'; ctx.fillRect(x + r() * bw * 0.8, hz + U * 0.04 - bh + r() * bh * 0.8, U * 0.006, U * 0.008); }
      // 黑瓦屋顶
      ctx.fillStyle = '#2a2a2e';
      poly(ctx, [[x - U * 0.004, hz + U * 0.04 - bh], [x + bw + U * 0.004, hz + U * 0.04 - bh], [x + bw * 0.8, hz + U * 0.04 - bh - U * 0.012], [x + bw * 0.2, hz + U * 0.04 - bh - U * 0.012]], '#2a2a2e');
      x += bw + U * 0.004;
    }
    // 河岸石阶与步道
    const bankY = hz + U * 0.05;
    ctx.fillStyle = grad(ctx, 0, bankY, 0, bankY + U * 0.08, [[0, '#7b7468'], [1, '#5c564c']]);
    ctx.fillRect(0, bankY, w, U * 0.07);
    // 河面
    const rv = bankY + U * 0.06;
    ctx.fillStyle = grad(ctx, 0, rv, 0, h, [[0, '#d4a07f'], [0.3, '#8c7d8a'], [0.7, '#3f5068'], [1, '#26344a']]);
    ctx.fillRect(0, rv, w, h - rv);
    // 倒影与波纹
    for (let i = 0; i < 260; i++) {
      const y = rv + Math.pow(r(), 1.4) * (h - rv), k = (y - rv) / (h - rv), xx = r() * w, l = U * (0.01 + r() * 0.06) * (0.4 + k);
      ctx.fillStyle = `rgba(255,${200 + r() * 40},${160 + r() * 50},${0.25 - k * 0.15})`;
      ctx.fillRect(xx, y, l, Math.max(1, U * 0.002 * (0.5 + k)));
    }
    // 鸭川的“跳石”（等距的石块）
    if (!old) for (let i = 0; i < 9; i++) {
      const k = i / 8, y = lerp(rv + U * 0.05, h * 0.92, Math.pow(k, 1.3)), xx = lerp(w * 0.62, w * (por ? 0.7 : 0.82), k), s = U * (0.02 + k * 0.06);
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(xx + s * 0.1, y + s * 0.18, s, s * 0.3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#9b958a'; ctx.beginPath(); ctx.ellipse(xx, y, s, s * 0.32, 0, 0, Math.PI * 2); ctx.fill();
    }
    // 三条大桥：木栏杆 + 擬宝珠（铜色洋葱头），跨在河上
    const by = rv + U * (por ? 0.1 : 0.07), bx0 = -U * 0.05, bx1 = w * 0.62;
    ctx.fillStyle = '#3b3029';
    ctx.beginPath(); ctx.moveTo(bx0, by); ctx.quadraticCurveTo((bx0 + bx1) / 2, by - U * 0.02, bx1, by + U * 0.01); ctx.lineTo(bx1, by + U * 0.04); ctx.quadraticCurveTo((bx0 + bx1) / 2, by + U * 0.015, bx0, by + U * 0.035); ctx.fill();
    for (let i = 0; i <= 8; i++) {
      const xx = lerp(bx0 + U * 0.04, bx1 - U * 0.02, i / 8), yy = by - U * 0.02 * Math.sin((i / 8) * Math.PI) * 0.9 + (i / 8) * U * 0.01;
      ctx.fillStyle = '#4a3b30'; ctx.fillRect(xx - U * 0.004, yy - U * 0.045, U * 0.008, U * 0.05);
      ctx.fillStyle = old ? '#6f5a40' : '#8a7a4c';
      ctx.beginPath(); ctx.ellipse(xx, yy - U * 0.05, U * 0.008, U * 0.01, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(xx - U * 0.003, yy - U * 0.058); ctx.lineTo(xx, yy - U * 0.068); ctx.lineTo(xx + U * 0.003, yy - U * 0.058); ctx.fill();
    }
    ctx.strokeStyle = '#4a3b30'; ctx.lineWidth = U * 0.006;
    ctx.beginPath(); ctx.moveTo(bx0, by - U * 0.036); ctx.quadraticCurveTo((bx0 + bx1) / 2, by - U * 0.058, bx1, by - U * 0.026); ctx.stroke();
    // 桥墩
    for (let i = 1; i < 5; i++) { const xx = lerp(bx0, bx1, i / 5); ctx.fillStyle = '#2f2823'; ctx.fillRect(xx - U * 0.008, by + U * 0.02, U * 0.016, U * 0.05); }
    // 河堤上等距而坐的人（鸭川的“等间隔”）
    const seatY = bankY + U * 0.012;
    for (let i = 0; i < 11; i++) {
      const xx = w * (0.64 + i * 0.034) + (r() - 0.5) * U * 0.004;
      if (xx > w) break;
      ctx.fillStyle = 'rgba(30,26,30,.85)';
      ctx.beginPath(); ctx.arc(xx, seatY - U * 0.024, U * 0.007, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(xx - U * 0.006, seatY - U * 0.018, U * 0.012, U * 0.016);
      ctx.beginPath(); ctx.arc(xx + U * 0.016, seatY - U * 0.022, U * 0.006, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(xx + U * 0.011, seatY - U * 0.016, U * 0.011, U * 0.014);
    }
    // 先斗町的灯笼（对岸川床，现代版）
    if (!old) for (let i = 0; i < 14; i++) { const xx = w * (0.02 + i * 0.045), yy = hz + U * 0.02; glow(ctx, xx, yy, U * 0.02, 'rgba(255,190,110,A)', 0.8); }
    // 前景：岸边的柳枝
    ctx.strokeStyle = old ? 'rgba(50,46,30,.8)' : 'rgba(40,60,36,.85)'; ctx.lineWidth = U * 0.003;
    for (let i = 0; i < 40; i++) {
      const sx = w * (por ? 0.86 : 0.9) + r() * w * 0.12, sy = -U * 0.02;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx - U * 0.05, sy + U * 0.2, sx - U * (0.02 + r() * 0.08), sy + U * (0.25 + r() * 0.3)); ctx.stroke();
    }
    if (!old) mikan(ctx, w * (por ? 0.3 : 0.24), bankY + U * 0.005, U * 0.07, 0.8);
  }

  /* ---------- 奈良公园：鹿与东大寺大屋顶 ---------- */
  function deer(ctx, x, y, s, flip = 1, bow = 0, r = Math.random) {
    ctx.save(); ctx.translate(x, y); ctx.scale(flip, 1);
    ctx.fillStyle = 'rgba(30,40,20,.25)'; ctx.beginPath(); ctx.ellipse(0, 0, s * 0.5, s * 0.08, 0, 0, Math.PI * 2); ctx.fill();
    const fur = grad(ctx, 0, -s, 0, 0, [[0, '#b77a46'], [1, '#8a552c']]);
    ctx.strokeStyle = '#6b4224'; ctx.lineWidth = s * 0.05; ctx.lineCap = 'round';
    for (const lx of [-0.3, -0.2, 0.2, 0.3]) { ctx.beginPath(); ctx.moveTo(lx * s, -s * 0.42); ctx.lineTo(lx * s * 1.05, 0); ctx.stroke(); }
    ctx.fillStyle = fur;
    ctx.beginPath(); ctx.ellipse(0, -s * 0.5, s * 0.42, s * 0.17, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f0e2cc'; ctx.beginPath(); ctx.ellipse(-s * 0.4, -s * 0.52, s * 0.07, s * 0.06, 0, 0, Math.PI * 2); ctx.fill(); // 尾部白斑
    ctx.fillStyle = 'rgba(245,230,205,.75)';
    for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc((r() - 0.5) * s * 0.6, -s * (0.52 + r() * 0.08), s * 0.018, 0, Math.PI * 2); ctx.fill(); }
    // 脖子与头（bow：鞠躬程度）
    const hx = s * 0.36, hy = -s * 0.6 + bow * s * 0.4;
    ctx.fillStyle = fur;
    ctx.beginPath(); ctx.moveTo(s * 0.26, -s * 0.6); ctx.quadraticCurveTo(s * 0.4, -s * 0.85 + bow * s * 0.3, hx + s * 0.06, hy - s * 0.22); ctx.lineTo(hx + s * 0.16, hy - s * 0.16); ctx.quadraticCurveTo(s * 0.42, -s * 0.6 + bow * s * 0.2, s * 0.36, -s * 0.45); ctx.fill();
    ctx.beginPath(); ctx.ellipse(hx + s * 0.16, hy - s * 0.2, s * 0.13, s * 0.075, 0.5 + bow * 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2a1a10'; ctx.beginPath(); ctx.arc(hx + s * 0.26, hy - s * 0.12 + bow * s * 0.04, s * 0.022, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a06a3a';
    ctx.beginPath(); ctx.ellipse(hx + s * 0.07, hy - s * 0.3, s * 0.07, s * 0.03, -0.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1d140e'; ctx.beginPath(); ctx.arc(hx + s * 0.18, hy - s * 0.25, s * 0.016, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  function sceneDeer(ctx, w, h, r) {
    const U = Math.min(w, h), por = h > w, hz = h * (por ? 0.5 : 0.55);
    ctx.fillStyle = grad(ctx, 0, 0, 0, hz, [[0, '#9cc0d6'], [0.6, '#d7e2df'], [1, '#eef0e4']]);
    ctx.fillRect(0, 0, w, hz + 2);
    glow(ctx, w * 0.15, h * 0.1, U * 0.7, 'rgba(255,246,220,A)', 0.6);
    hills(ctx, w, hz - U * 0.06, U * 0.12, '#9fb3ad', r, 3);   // 若草山
    // 东大寺大佛殿：宽阔的歇山顶 + 金色鸱尾
    const dx = w * (por ? 0.5 : 0.6), dy = hz - U * 0.02, dw = U * (por ? 0.62 : 0.72);
    ctx.fillStyle = '#5b4b3c'; ctx.fillRect(dx - dw * 0.42, dy - U * 0.1, dw * 0.84, U * 0.12);
    ctx.fillStyle = '#e7dfcf';
    for (let i = 0; i < 9; i++) ctx.fillRect(dx - dw * 0.4 + i * dw * 0.1, dy - U * 0.09, dw * 0.035, U * 0.1);
    poly(ctx, [[dx - dw * 0.55, dy - U * 0.1], [dx + dw * 0.55, dy - U * 0.1], [dx + dw * 0.36, dy - U * 0.2], [dx - dw * 0.36, dy - U * 0.2]], '#3b3a3c');
    poly(ctx, [[dx - dw * 0.4, dy - U * 0.2], [dx + dw * 0.4, dy - U * 0.2], [dx + dw * 0.28, dy - U * 0.27], [dx - dw * 0.28, dy - U * 0.27]], '#47464a');
    ctx.fillStyle = '#d8b04a';
    for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(dx + k * dw * 0.28, dy - U * 0.29, U * 0.012, U * 0.024, k * 0.3, 0, Math.PI * 2); ctx.fill(); }
    // 杉树林
    for (let i = 0; i < 26; i++) {
      const xx = r() * w, s = U * (0.12 + r() * 0.16);
      if (Math.abs(xx - dx) < dw * 0.5 && r() > 0.25) continue;
      ctx.fillStyle = `rgb(${46 + r() * 30},${70 + r() * 30},${48 + r() * 20})`;
      poly(ctx, [[xx, hz - s * 1.4], [xx + s * 0.32, hz + U * 0.01], [xx - s * 0.32, hz + U * 0.01]], ctx.fillStyle);
    }
    // 草地（前景更亮）+ 纹理
    ctx.fillStyle = grad(ctx, 0, hz, 0, h, [[0, '#8fa762'], [0.5, '#a9bb6c'], [1, '#6f8a46']]);
    ctx.fillRect(0, hz, w, h - hz);
    for (let i = 0; i < 900; i++) {
      const y = hz + Math.pow(r(), 0.8) * (h - hz), k = (y - hz) / (h - hz), xx = r() * w;
      ctx.strokeStyle = `rgba(${60 + r() * 50},${90 + r() * 50},${30 + r() * 20},${0.3 + k * 0.4})`; ctx.lineWidth = 1 + k * 2;
      ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx + (r() - 0.5) * 6, y - U * 0.008 * (0.5 + k * 2)); ctx.stroke();
    }
    // 近处大树的树冠阴影与早晨的光
    ctx.fillStyle = 'rgba(30,50,20,.22)';
    ctx.beginPath(); ctx.ellipse(w * 0.15, h * 0.86, w * 0.3, U * 0.08, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = grad(ctx, 0, 0, w, 0, [[0, 'rgba(255,240,200,.25)'], [0.5, 'rgba(255,240,200,0)']]);
    ctx.fillRect(0, 0, w, h);
    // 鹿群：远处两只、近处一只在鞠躬
    deer(ctx, w * (por ? 0.2 : 0.3), hz + U * 0.08, U * 0.12, 1, 0, r);
    deer(ctx, w * (por ? 0.84 : 0.78), hz + U * 0.1, U * 0.14, -1, 0.2, r);
    deer(ctx, w * (por ? 0.42 : 0.47), h * (por ? 0.8 : 0.9), U * (por ? 0.36 : 0.4), 1, 0.85, r);
    // 鹿仙贝 + 蜜柑
    const sx = w * (por ? 0.7 : 0.66), sy = h * (por ? 0.86 : 0.93);
    ctx.fillStyle = '#d9b77c'; ctx.beginPath(); ctx.ellipse(sx, sy, U * 0.035, U * 0.012, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(120,80,40,.6)'; ctx.lineWidth = 2; ctx.stroke();
    mikan(ctx, sx + U * 0.09, sy + U * 0.02, U * 0.14, 1);
  }

  /* ---------- 道顿堀：运河夜景 ---------- */
  function sceneNeon(ctx, w, h, r) {
    const U = Math.min(w, h), por = h > w, wl = h * (por ? 0.62 : 0.64);
    ctx.fillStyle = grad(ctx, 0, 0, 0, wl, [[0, '#0b0f22'], [0.6, '#211a3c'], [1, '#3a2340']]);
    ctx.fillRect(0, 0, w, wl + 2);
    // 两岸楼体（左右各一排，向中间收）
    const bank = (dir) => {
      let x = dir < 0 ? -U * 0.02 : w + U * 0.02;
      for (let i = 0; i < 9; i++) {
        const bw = U * (0.12 + r() * 0.16) * (1 - i * 0.07), bh = U * (0.4 + r() * 0.45) * (1 - i * 0.05);
        const x0 = dir < 0 ? x : x - bw, y0 = wl - bh;
        ctx.fillStyle = `rgb(${18 + r() * 14},${16 + r() * 12},${30 + r() * 18})`;
        ctx.fillRect(x0, y0, bw, bh);
        // 窗
        for (let yy = y0 + U * 0.02; yy < wl - U * 0.04; yy += U * 0.028) for (let xx = x0 + U * 0.012; xx < x0 + bw - U * 0.02; xx += U * 0.024) {
          if (r() > 0.55) { ctx.fillStyle = r() > 0.5 ? 'rgba(255,214,150,.55)' : 'rgba(170,200,255,.4)'; ctx.fillRect(xx, yy, U * 0.01, U * 0.012); }
        }
        // 霓虹招牌：竖排灯箱 + 横向灯带（抽象字形，无品牌）
        const cols = ['#ff3d7f', '#ffd23f', '#3df2ff', '#ff6a2a', '#9b6bff', '#7bff8a'];
        for (let k = 0; k < 2 + Math.floor(r() * 3); k++) {
          const c = cols[Math.floor(r() * cols.length)], vertical = r() > 0.4;
          const sw = vertical ? U * (0.035 + r() * 0.02) : bw * (0.5 + r() * 0.4), sh = vertical ? bh * (0.25 + r() * 0.35) : U * (0.03 + r() * 0.02);
          const sx = x0 + r() * (bw - sw), sy = y0 + r() * (bh * 0.7 - sh) + U * 0.02;
          ctx.save();
          ctx.shadowColor = c; ctx.shadowBlur = U * 0.03;
          ctx.fillStyle = 'rgba(10,8,20,.85)'; ctx.fillRect(sx, sy, sw, sh);
          ctx.strokeStyle = c; ctx.lineWidth = U * 0.004; ctx.strokeRect(sx, sy, sw, sh);
          ctx.fillStyle = c;
          const n = vertical ? Math.floor(sh / (sw * 1.1)) : Math.floor(sw / (sh * 1.1));
          for (let g = 0; g < n; g++) {
            const gx = vertical ? sx + sw * 0.2 : sx + g * sh * 1.1 + sh * 0.2, gy = vertical ? sy + g * sw * 1.1 + sw * 0.2 : sy + sh * 0.2, gs = (vertical ? sw : sh) * 0.6;
            // 抽象“字”：随机的横竖笔画
            for (let st = 0; st < 3; st++) {
              if (r() > 0.5) ctx.fillRect(gx, gy + r() * gs, gs, gs * 0.14); else ctx.fillRect(gx + r() * gs, gy, gs * 0.14, gs);
            }
          }
          ctx.restore();
        }
        x += dir < 0 ? bw : -bw;
      }
    };
    bank(-1); bank(1);
    // 大型屏幕光（中远处）
    glow(ctx, w * 0.5, wl - U * 0.32, U * 0.4, 'rgba(255,80,140,A)', 0.35);
    glow(ctx, w * 0.62, wl - U * 0.22, U * 0.3, 'rgba(60,220,255,A)', 0.25);
    // 运河水面与霓虹倒影（竖向拉长的色带 + 波纹切片）
    ctx.fillStyle = grad(ctx, 0, wl, 0, h, [[0, '#1a1430'], [1, '#07060f']]);
    ctx.fillRect(0, wl, w, h - wl);
    const src = ctx.getImageData(0, Math.max(0, wl - (h - wl)), w, Math.min(wl, h - wl));
    const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = src.height; tmp.getContext('2d').putImageData(src, 0, 0);
    ctx.save(); ctx.globalAlpha = 0.55; ctx.translate(0, wl * 2); ctx.scale(1, -1);
    const bands = 60, bh = src.height / bands;
    for (let i = 0; i < bands; i++) ctx.drawImage(tmp, 0, i * bh, w, bh, Math.sin(i * 1.3) * U * 0.012 * (1 - i / bands), wl - src.height + i * bh, w, bh + 1);
    ctx.restore();
    ctx.fillStyle = 'rgba(8,6,16,.35)'; ctx.fillRect(0, wl, w, h - wl);
    // 戎桥：弧形桥面 + 栏杆上的人影
    const by = wl + U * (por ? 0.04 : 0.02);
    ctx.fillStyle = '#16121c';
    ctx.beginPath(); ctx.moveTo(-U * 0.05, by + U * 0.08); ctx.quadraticCurveTo(w / 2, by - U * 0.06, w + U * 0.05, by + U * 0.08); ctx.lineTo(w + U * 0.05, by + U * 0.16); ctx.quadraticCurveTo(w / 2, by + U * 0.02, -U * 0.05, by + U * 0.16); ctx.fill();
    ctx.strokeStyle = 'rgba(255,200,140,.5)'; ctx.lineWidth = U * 0.003;
    ctx.beginPath(); ctx.moveTo(-U * 0.05, by + U * 0.07); ctx.quadraticCurveTo(w / 2, by - U * 0.07, w + U * 0.05, by + U * 0.07); ctx.stroke();
    for (let i = 0; i < 26; i++) {
      const k = i / 25, xx = lerp(w * 0.04, w * 0.96, k) + (r() - 0.5) * U * 0.02, yy = by + U * 0.07 - Math.sin(k * Math.PI) * U * 0.12;
      const s = U * (0.05 + r() * 0.025);
      ctx.fillStyle = 'rgba(8,6,12,.95)';
      ctx.beginPath(); ctx.arc(xx, yy - s * 0.95, s * 0.16, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(xx - s * 0.17, yy - s * 0.8, s * 0.34, s * 0.8);
    }
    // 散景光斑
    ctx.save(); ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 70; i++) {
      const xx = r() * w, yy = r() * h, rr = U * (0.008 + r() * 0.03), c = ['255,80,140', '255,210,80', '80,220,255', '255,120,60'][Math.floor(r() * 4)];
      ctx.fillStyle = radial(ctx, xx, yy, 0, rr, [[0, `rgba(${c},.35)`], [0.7, `rgba(${c},.15)`], [1, `rgba(${c},0)`]]);
      ctx.beginPath(); ctx.arc(xx, yy, rr, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    // 蜜柑坐在桥栏上（被霓虹照亮）
    mikan(ctx, w * (por ? 0.66 : 0.6), by + U * 0.06 - Math.sin(0.6 * Math.PI) * U * 0.12 + U * 0.01, U * 0.1, 0.9);
  }

  const SCENES = { window: sceneWindow, torii: sceneTorii, kamo: sceneKamo, deer: sceneDeer, neon: sceneNeon };

  /* ---------- 后期：颗粒、暗角、调色 ---------- */
  function grainPass(ctx, w, h, r, amount) {
    const img = ctx.getImageData(0, 0, w, h), d = img.data;
    for (let i = 0; i < d.length; i += 4) { const n = (r() + r() - 1) * amount; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
    ctx.putImageData(img, 0, 0);
  }
  function vignette(ctx, w, h, strength) {
    ctx.fillStyle = radial(ctx, w / 2, h / 2, Math.min(w, h) * 0.32, Math.max(w, h) * 0.78, [[0, 'rgba(0,0,0,0)'], [1, `rgba(0,0,0,${strength})`]]);
    ctx.fillRect(0, 0, w, h);
  }

  function paintScene(kind, style = 'photo', w = 1920, h = 1080, seed = 7) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    const r = rng(seed);
    (SCENES[kind] || SCENES.kamo)(ctx, w, h, r, { old: style === 'postcard' });
    const U = Math.min(w, h);
    if (style === 'postcard') {
      // 1930 年代手工上色明信片：棕褐 + 局部淡彩、纸边、划痕、暗角
      const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
      const t = tmp.getContext('2d');
      t.filter = 'sepia(0.82) contrast(0.86) brightness(1.06) saturate(0.95)';
      t.drawImage(c, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#efe3c8'; ctx.fillRect(0, 0, w, h);
      const m = U * 0.045;
      ctx.drawImage(tmp, m, m, w - 2 * m, h - 2 * m);
      ctx.fillStyle = 'rgba(120,150,170,.12)'; ctx.fillRect(m, m, w - 2 * m, (h - 2 * m) * 0.4);   // 手工上色的天空
      grainPass(ctx, w, h, r, 30);
      ctx.strokeStyle = 'rgba(255,250,235,.35)'; ctx.lineWidth = 1;
      for (let i = 0; i < 26; i++) { const x = r() * w; ctx.beginPath(); ctx.moveTo(x, r() * h * 0.3); ctx.lineTo(x + (r() - 0.5) * 30, h * (0.5 + r() * 0.5)); ctx.stroke(); }
      vignette(ctx, w, h, 0.42);
      ctx.strokeStyle = 'rgba(80,60,40,.4)'; ctx.lineWidth = 2; ctx.strokeRect(m, m, w - 2 * m, h - 2 * m);
    } else if (style === 'illustration') {
      // 动画回忆：高饱和、柔光溢出、暖色光斑、柔和高光
      const base = document.createElement('canvas'); base.width = w; base.height = h;
      const b = base.getContext('2d');
      b.filter = 'saturate(1.5) contrast(1.08) brightness(1.06)';
      b.drawImage(c, 0, 0);
      ctx.clearRect(0, 0, w, h); ctx.drawImage(base, 0, 0);
      const gl = document.createElement('canvas'); gl.width = Math.round(w / 4); gl.height = Math.round(h / 4);
      const g = gl.getContext('2d');
      g.filter = 'blur(8px) brightness(1.25)'; g.drawImage(base, 0, 0, gl.width, gl.height);
      ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.5; ctx.drawImage(gl, 0, 0, w, h); ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = radial(ctx, w * 0.82, h * 0.12, 0, U * 0.9, [[0, 'rgba(255,214,170,.5)'], [1, 'rgba(255,214,170,0)']]); ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 26; i++) { // 镜头光斑
        const xx = r() * w, yy = r() * h * 0.7, rr = U * (0.01 + r() * 0.04);
        ctx.fillStyle = radial(ctx, xx, yy, 0, rr, [[0, 'rgba(255,240,210,.3)'], [0.8, 'rgba(255,220,180,.12)'], [1, 'rgba(255,220,180,0)']]);
        ctx.beginPath(); ctx.arc(xx, yy, rr, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      ctx.fillStyle = 'rgba(40,70,190,.06)'; ctx.fillRect(0, 0, w, h);
      grainPass(ctx, w, h, r, 7);
      vignette(ctx, w, h, 0.3);
    } else {
      grainPass(ctx, w, h, r, 12);
      vignette(ctx, w, h, kind === 'neon' ? 0.4 : 0.22);
    }
    return c;
  }

  global.paintScene = paintScene;
})(window);
