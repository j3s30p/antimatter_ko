// Cinematic accretion disk: the silhouette stays fixed while the gas and motes flow.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const art = new Image();
  art.src = new URL('images/violet-crunch-vortex.png', document.baseURI).href;
  const blobFont = new FontFace('VioletBlob', `url("${new URL('stylesheets/BlobEmoji-Bold.ttf', document.baseURI).href}")`);
  document.fonts.add(blobFont); blobFont.load().catch(() => {});
  const states = new WeakMap();
  const N = 400, CX = 200, CY = 202, TAU = Math.PI * 2;
  const smooth = x => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };
  let texture;
  function prepare() {
    if (texture) return true;
    if (!art.complete || !art.naturalWidth) return false;
    texture = document.createElement('canvas'); texture.width = texture.height = N;
    const ctx = texture.getContext('2d');
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art, 0, 0, N, N);
    return true;
  }
  function orbit(radius, angle) {
    const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius * 0.205;
    return { x: CX + x * 0.998 + y * 0.063, y: CY - x * 0.063 + y * 0.998, front: Math.sin(angle) >= 0 };
  }
  function drawMotes(ctx, motes, front, strength, blob, negative) {
    for (const mote of motes) {
      if (mote.front !== front) continue;
      const opacity = mote.alpha * (0.30 + strength * 0.65);
      if (blob && blobFont.status === 'loaded') {
        ctx.save(); ctx.translate(mote.x, mote.y); ctx.rotate(Math.sin(mote.angle) * 0.4);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = negative ? '#ffe6bc' : '#ffbe4a';
        ctx.font = `${Math.min(17, 8 + (mote.radius - 43) * 0.14)}px VioletBlob`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String.fromCharCode(0xe010 + mote.id % 25), 0, 0); ctx.restore();
      } else {
        ctx.save();
        for (let j = 5; j >= 0; j--) {
          const tail = orbit(mote.radius + j * 0.25, mote.angle - (negative ? -1 : 1) * j * 0.025);
          ctx.globalAlpha = opacity * (1 - j / 6) * 0.7;
          ctx.fillStyle = mote.id % 4 ? '#d3b3ff' : '#ffe6bd';
          ctx.beginPath(); ctx.arc(tail.x, tail.y, j === 0 ? 0.85 : 0.55, 0, TAU); ctx.fill();
        }
        ctx.restore();
      }
    }
  }
  window.__violetBlackHole = {
    draw(target, delta, status) {
      if (!prepare()) return false;
      let state = states.get(target.canvas);
      if (!state) {
        const layer = document.createElement('canvas'); layer.width = layer.height = N;
        state = { layer, ctx: layer.getContext('2d'), time: 0, active: status.active ? 1 : 0,
          wasActive: Boolean(status.active), activationAge: 2 };
        states.set(target.canvas, state);
      }
      const dt = Math.max(0, Math.min(delta, 80)) / 1000;
      const frozen = reducedMotion.matches || (status.paused && !status.negative);
      if (status.active && !state.wasActive && !frozen && !status.negative) state.activationAge = 0;
      state.wasActive = Boolean(status.active);
      if (!frozen) {
        state.activationAge = Math.min(2, state.activationAge + dt);
        state.active += ((status.active ? 1 : 0) - state.active) * Math.min(1, dt * 4);
        const rush = Math.max(0, 1 - state.activationAge / 1.15);
        state.time += dt * (0.18 + state.active * 0.82 + rush * 1.7);
      }
      const { ctx, time: t, active: strength } = state;
      const age = state.activationAge;
      const flash = reducedMotion.matches ? 0 : Math.sin(Math.PI * Math.min(1, age / 0.38));
      const pull = reducedMotion.matches ? 0 : smooth(age / 0.20) * (1 - smooth((age - 0.28) / 0.72));
      const direction = status.negative ? -1 : 1;
      ctx.clearRect(0, 0, N, N);
      const motes = Array.from({length:status.blob ? 26 : 44}, (_, id) => {
        const life = (id * 0.618033989 + t * (0.075 + id % 4 * 0.008)) % 1;
        const radial = status.negative ? life : 1 - life;
        const radius = 43 + Math.pow(radial, 0.82) * 145 * (1 - pull * 0.32);
        const angle = id * 2.399963 + direction * (t * 0.38 + (1 - radial) * 6.4);
        return { ...orbit(radius, angle), id, angle, radius, alpha:Math.sin(life * Math.PI) };
      });
      drawMotes(ctx, motes, false, strength, status.blob, status.negative);
      ctx.save();
      ctx.globalAlpha = 0.47 + strength * 0.51;
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      const flowing = window.__violetAccretionFlow &&
        window.__violetAccretionFlow.draw(ctx, texture, t, strength, direction, pull, flash);
      // Keep the canvas fallback for devices without WebGL.
      for (let x = 0; !flowing && x < N; x += 2) {
        const outside = Math.max(0, Math.min(1, (Math.abs(x - CX) - 48) / 65));
        const shift = outside * (0.18 + strength * 0.62) * Math.sin(x * 0.09 - direction * t * 2.8);
        ctx.drawImage(texture, x, 0, 2, N, x, shift, 2, N);
      }
      ctx.restore();
      if (status.negative) {
        // The inverted state remains recognizable as the game's white-hole state.
        const glow = ctx.createRadialGradient(CX, CY, 0, CX, CY, 46);
        glow.addColorStop(0, '#fff6ff'); glow.addColorStop(0.76, '#e2d8fa'); glow.addColorStop(1, '#bba9e7');
        ctx.save(); ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(CX, CY, 44.5, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.moveTo(145,211);ctx.lineTo(254,204);ctx.lineTo(254,214);ctx.lineTo(145,221);ctx.closePath();ctx.clip();
        ctx.drawImage(texture,0,0);ctx.restore();
      }
      drawMotes(ctx, motes, true, strength, status.blob, status.negative);
      if (flash > 0.001 && !status.negative) {
        ctx.save(); ctx.globalCompositeOperation = 'screen';
        const halo = ctx.createRadialGradient(CX, CY, 43, CX, CY, 67);
        halo.addColorStop(0, 'rgba(205, 169, 255, 0)');
        halo.addColorStop(0.18, `rgba(255, 227, 199, ${flash * 0.52})`);
        halo.addColorStop(0.45, `rgba(197, 154, 255, ${flash * 0.23})`);
        halo.addColorStop(1, 'rgba(154, 123, 255, 0)');
        ctx.fillStyle = halo; ctx.fillRect(0, 0, N, N);
        ctx.globalAlpha = flash * 0.82; ctx.strokeStyle = '#ffe7ca'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(CX, CY, 46.2, 0, TAU); ctx.stroke(); ctx.restore();
      }
      ctx.globalAlpha = 1;
      target.clearRect(0, 0, target.canvas.width, target.canvas.height);
      target.save(); target.imageSmoothingEnabled = true; target.imageSmoothingQuality = 'high';
      target.drawImage(state.layer, 0, 0, target.canvas.width, target.canvas.height); target.restore();
      return true;
    }
  };
})();
