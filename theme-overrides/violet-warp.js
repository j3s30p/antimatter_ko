// Two-second, purely visual dilation transit. Prestige timing stays in the game.
(() => {
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const x = clamp(value); return x * x * (3 - 2 * x); };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const artwork = new Image();
  artwork.src = new URL("images/violet-warp-art.png", document.baseURI).href;
  let animation = null;

  function stop() {
    if (!animation) return;
    cancelAnimationFrame(animation.frame);
    animation.canvas.remove();
    animation = null;
  }

  function resize(state) {
    const pixel = Math.max(1, Math.floor(window.innerWidth / 900));
    const w = Math.ceil(window.innerWidth / pixel);
    const h = Math.ceil(window.innerHeight / pixel);
    if (state.canvas.width !== w || state.canvas.height !== h) {
      state.canvas.width = w;
      state.canvas.height = h;
      state.ctx.imageSmoothingEnabled = false;
    }
  }

  function draw(time) {
    const state = animation;
    if (!state) return;
    const elapsed = time - state.start;
    if (elapsed >= 2000 || !document.body.classList.contains("t-violet") || reducedMotion.matches) {
      stop();
      return;
    }
    state.frame = requestAnimationFrame(draw);
    if (time - state.lastPaint < 1000 / 60) return;
    const dt = Math.min(0.1, (time - state.lastPaint) / 1000);
    state.lastPaint = time;
    resize(state);
    const ctx = state.ctx;
    const w = state.canvas.width, h = state.canvas.height;
    const cx = w / 2, cy = h / 2;
    const radius = Math.hypot(w, h) * 0.62;
    // Outward flight accelerates on entry, then decelerates when leaving dilation.
    const speed = state.exiting
      ? 0.035 + 1.85 * (1 - smooth((elapsed - 120) / 1530))
      : 0.035 + 1.85 * smooth((elapsed - 100) / 850);
    state.travel += speed * dt;
    const visibility = smooth(elapsed / 260) * (1 - smooth((elapsed - 1470) / 530));
    const darkness = smooth(elapsed / 600) * (1 - smooth((elapsed - 1230) / 770));
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = `rgba(1, 3, 10, ${darkness})`;
    ctx.fillRect(0, 0, w, h);
    const artReady = artwork.complete && artwork.naturalWidth > 0;
    if (artReady) {
      // Independently approaching artwork layers give painted light real depth.
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < 2; i++) {
        const phase = (state.travel * 0.28 + i / 2 + 0.17) % 1;
        const scale = Math.pow(2, phase * 2.6 - 0.85);
        const envelope = smooth(phase / 0.18) * (1 - smooth((phase - 0.72) / 0.28));
        const dw = Math.max(w, h) * 1.10 * scale;
        const dh = dw * artwork.naturalHeight / artwork.naturalWidth;
        ctx.globalAlpha = visibility * envelope * (i === 0 ? 0.85 : 0.24);
        ctx.save();
        ctx.translate(cx, cy);
        // Fixed reflections vary the composition without spinning the flight path.
        ctx.scale(i === 1 ? -1 : 1, 1);
        ctx.drawImage(artwork, -dw / 2, -dh / 2, dw, dh);
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.lineCap = "butt";
    for (const star of state.stars) {
      const phase = (star.phase + state.travel * star.rate) % 1;
      const distance = radius * (0.038 + phase * phase * 1.28);
      const tailPhase = Math.max(0, phase - (0.008 + speed * 0.057) * star.length);
      const tailDistance = radius * (0.038 + tailPhase * tailPhase * 1.28);
      const dx = Math.cos(star.angle), dy = Math.sin(star.angle);
      const x1 = Math.round(cx + dx * tailDistance), y1 = Math.round(cy + dy * tailDistance);
      const x2 = Math.round(cx + dx * distance), y2 = Math.round(cy + dy * distance);
      const alpha = visibility * smooth(phase / 0.13) * (0.45 + phase * 0.55) * (artReady ? 0.22 : 1);
      if (alpha < 0.01) continue;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      // Nested crisp strokes keep the icy glow and the theme's pixel texture.
      ctx.globalAlpha = alpha * 0.16;
      ctx.strokeStyle = star.violet ? "#9164ed" : "#168fff";
      ctx.lineWidth = star.width + 4;
      ctx.stroke();
      ctx.globalAlpha = alpha * 0.70;
      ctx.strokeStyle = star.violet ? "#b99aff" : "#62caff";
      ctx.lineWidth = star.width + 1;
      ctx.stroke();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = star.violet ? "#e7dcff" : "#d0f2ff";
      ctx.lineWidth = star.width;
      ctx.stroke();
      if (phase > 0.45) {
        ctx.fillStyle = "#e8fbff";
        ctx.fillRect(x2, y2, star.width, star.width);
      }
    }
    ctx.globalAlpha = 1;
  }

  window.__violetDilation = {
    start(exiting) {
      stop();
      if (reducedMotion.matches || !document.body.classList.contains("t-violet")) return;
      const canvas = document.createElement("canvas");
      canvas.id = "violet-dilation-canvas";
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText = "position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" +
        "z-index:2147483641;pointer-events:none;image-rendering:pixelated;";
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;
      const start = performance.now();
      animation = { canvas, ctx, start, lastPaint: start - 25, travel: 0, exiting: Boolean(exiting), frame: 0,
        stars: Array.from({ length: 30 }, (_, i) => ({
          angle: Math.random() * Math.PI * 2, phase: Math.random(), rate: 0.4 + Math.random() * 0.55,
          length: 0.5 + Math.random() * 1.2, width: i % 11 === 0 ? 2 : 1, violet: i % 13 === 0
        })) };
      resize(animation);
      document.body.appendChild(canvas);
      animation.frame = requestAnimationFrame(draw);
    },
    stop
  };
})();
