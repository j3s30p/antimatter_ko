// Visual effects only. Screen capture stays in memory and never reads a save.
(() => {
  const clamp = x => Math.max(0, Math.min(1, x));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const vortex = new Image();
  vortex.src = new URL("images/violet-crunch-vortex.png", document.baseURI).href;
  const holes = new WeakMap();

  window.__violetBlackHole = {
    draw(ctx, delta, status) {
      if (!vortex.complete || !vortex.naturalWidth) return false;
      let state = holes.get(ctx.canvas);
      if (!state) {
        const layer = document.createElement("canvas");
        layer.width = layer.height = 200;
        state = { layer, ctx: layer.getContext("2d"), time: 0 };
        holes.set(ctx.canvas, state);
      }
      const frozen = reducedMotion.matches || (status.paused && !status.negative);
      if (!frozen) state.time += Math.min(delta, 80) * (status.active ? 1 : 0.18);
      const t = state.time / 1000;
      const direction = status.negative ? -1 : 1;
      const c = state.ctx;
      c.clearRect(0, 0, 200, 200);
      c.imageSmoothingEnabled = false;
      const radius = (status.active ? 88 : 78) + Math.sin(t * 1.6) * 1.5;
      c.save();
      c.translate(100, 100);
      c.rotate(direction * t * 0.55);
      c.globalAlpha = status.active ? 0.94 : 0.48;
      if (status.negative) c.filter = "saturate(0.45) brightness(1.5)";
      c.drawImage(vortex, -radius, -radius, radius * 2, radius * 2);
      c.restore();
      // Independent pixel motes spiral into the core (outward when inverted).
      for (let i = 0; i < 52; i++) {
        let phase = (i * 0.6180339 + t * 0.16) % 1;
        if (!status.negative) phase = 1 - phase;
        const r = 9 + phase * 86;
        const a = i * 2.39996 + direction * (t * 0.8 + (1 - phase) * 4);
        const x = Math.round(100 + Math.cos(a) * r);
        const y = Math.round(100 + Math.sin(a) * r);
        c.globalAlpha = Math.sin(phase * Math.PI) * (status.active ? 0.9 : 0.32);
        c.fillStyle = i % 4 === 0 ? "#f6dfff" : "#b379ef";
        c.fillRect(x, y, i % 9 === 0 ? 2 : 1, i % 9 === 0 ? 2 : 1);
      }
      c.globalAlpha = 1;
      c.fillStyle = status.negative ? "#eadcff" : "#040109";
      c.beginPath();
      c.arc(100, 100, 7, 0, Math.PI * 2);
      c.fill();
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(state.layer, 0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
      return true;
    }
  };

  let run = null;
  let captureGeneration = 0;
  const impactArt = new Image();
  impactArt.src = new URL("images/violet-crunch-impact.png", document.baseURI).href;
  const BREAK_AT = 760;
  // Shared contours traced in the wide artwork's original 1672 x 941 coordinates.
  // Minor branches stay within a large shard; the eight long cracks separate it.
  const crackRays = [
    [[830,414],[819,374],[812,327],[810,282],[799,239],[792,208],[779,188],[777,122],[759,101],[749,65],[735,16]],
    [[890,443],[944,405],[995,388],[1045,374],[1106,354],[1145,325],[1192,311],[1238,282],[1290,251],[1318,226],[1359,220],[1402,186],[1448,158],[1455,125],[1496,111],[1552,73],[1604,44],[1649,23]],
    [[916,486],[975,501],[1008,503],[1063,490],[1128,478],[1176,484],[1236,506],[1293,497],[1360,496],[1427,491],[1497,491],[1556,477],[1605,462],[1656,458]],
    [[895,529],[946,563],[987,594],[1053,632],[1134,674],[1191,701],[1247,733],[1277,757],[1290,780],[1350,795],[1406,824],[1460,837],[1510,865],[1580,886],[1655,907]],
    [[857,550],[873,603],[884,647],[895,690],[898,746],[918,779],[929,800],[929,841],[949,885],[970,927]],
    [[813,533],[774,538],[734,554],[681,582],[632,608],[584,627],[539,646],[490,670],[441,693],[374,718],[337,744],[329,764],[278,790],[219,817],[151,851],[89,881],[23,915]],
    [[798,492],[749,484],[692,473],[642,473],[583,494],[508,494],[457,493],[422,487],[358,480],[306,475],[275,464],[241,472],[193,499],[148,491],[106,479],[64,474],[17,468]],
    [[798,457],[767,421],[723,390],[682,372],[651,345],[622,334],[579,319],[536,301],[499,285],[466,278],[424,257],[390,240],[368,215],[323,207],[285,185],[248,170],[216,151],[190,119],[177,105],[130,97],[101,77],[68,52],[35,28]]
  ];
  const holeRims = [
    [[838,406],[856,398],[872,407],[879,431]],
    [[903,456],[907,469]], [[910,501],[899,515]],
    [[878,531],[867,546]], [[845,538],[830,537]],
    [[808,518],[799,507]], [[803,481],[792,470]],
    [[812,445],[822,429]]
  ];
  function artLayout(w, h) {
    const sourceWidth = impactArt.naturalWidth || 1672;
    const sourceHeight = impactArt.naturalHeight || 941;
    const scale = Math.max(w / sourceWidth, h / sourceHeight) * 1.14;
    return { impact: { x: w * 0.5, y: h * 0.44 },
      artWidth: sourceWidth * scale, artHeight: sourceHeight * scale };
  }
  function pixelPolyline(poly, pixel) {
    const result = [];
    for (let i = 0; i < poly.length - 1; i++) {
      const a = poly[i], b = poly[i + 1];
      const ax = Math.round(a.x / pixel), ay = Math.round(a.y / pixel);
      const bx = Math.round(b.x / pixel), by = Math.round(b.y / pixel);
      const steps = Math.max(Math.abs(bx - ax), Math.abs(by - ay), 1);
      let y = ay;
      result.push({ x: ax * pixel, y: ay * pixel });
      for (let step = 1; step <= steps; step++) {
        const x = Math.round(ax + (bx - ax) * step / steps);
        const nextY = Math.round(ay + (by - ay) * step / steps);
        result.push({ x: x * pixel, y: y * pixel });
        if (nextY !== y) result.push({ x: x * pixel, y: nextY * pixel });
        y = nextY;
      }
    }
    return result;
  }
  function makeGlass(w, h, pixel) {
    const layout = artLayout(w, h);
    const { impact, artWidth, artHeight } = layout;
    const mapPoint = ([x, y]) => ({
      x: impact.x + (x / 1672 - 0.5) * artWidth,
      y: impact.y + (y / 941 - 0.5) * artHeight
    });
    const size = Math.min(w, h);
    const rays = crackRays.map(points => {
      const mapped = points.map(mapPoint);
      const tip = mapped[mapped.length - 1];
      const dx = tip.x - impact.x, dy = tip.y - impact.y;
      const extension = Math.hypot(w, h) * 4 / Math.hypot(dx, dy);
      mapped.push({ x: tip.x + dx * extension, y: tip.y + dy * extension });
      return pixelPolyline(mapped, pixel);
    });
    // Both neighbors reuse the exact same stepped edge, including every bend.
    const cells = rays.map((ray, i) => {
      const nextIndex = (i + 1) % rays.length;
      const next = rays[nextIndex];
      const rim = pixelPolyline([crackRays[i][0], ...holeRims[i], crackRays[nextIndex][0]].map(mapPoint), pixel);
      const angle = Math.atan2((ray[0].y + next[0].y) / 2 - impact.y,
        (ray[0].x + next[0].x) / 2 - impact.x);
      const cx = impact.x + Math.cos(angle) * size * 0.3;
      const cy = impact.y + Math.sin(angle) * size * 0.3;
      return { poly: [...ray, ...next.slice().reverse(), ...rim.slice().reverse()], cx, cy,
        delay: 20 + (i % 4) * 22 + Math.random() * 30,
        vx: Math.cos(angle) * size * (0.22 + Math.random() * 0.14),
        vy: Math.sin(angle) * size * 0.21 - h * 0.10,
        spin: (Math.random() - 0.5) * 1.1, tilt: (Math.random() - 0.5) * 1.6,
        gravity: h * (1.6 + Math.random() * 0.7) };
    });
    return { cells, ...layout };
  }
  function path(ctx, poly) {
    ctx.beginPath();
    poly.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.closePath();
  }
  function paintImpactArt(ctx, impact, width, height, alpha, reveal = 1) {
    if (!impactArt.complete || !impactArt.naturalWidth) return;
    ctx.save();
    ctx.globalAlpha *= alpha;
    // Preserve the artist's pixel clusters only on the VFX sprite, not on the UI.
    ctx.imageSmoothingEnabled = false;
    if (reveal < 1) {
      ctx.beginPath();
      ctx.ellipse(impact.x, impact.y, width * 0.72 * reveal, height * 0.72 * reveal, 0, 0, Math.PI * 2);
      ctx.clip();
    }
    ctx.drawImage(impactArt, impact.x - width / 2, impact.y - height / 2, width, height);
    ctx.restore();
  }
  window.__violetFracture = {
    start(width, height) {
      const generation = ++captureGeneration;
      // Pixel styling belongs to the shard contour, never the screen texture.
      const pixel = Math.max(2, Math.round(Math.min(width, height) / 300));
      const resolution = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const layer = document.createElement("canvas");
      layer.width = Math.ceil(width * resolution);
      layer.height = Math.ceil(height * resolution);
      const current = { width, height, resolution, layer, context: layer.getContext("2d"),
        ...makeGlass(width, height, pixel), snapshot: null };
      run = current;
      // Electron captures only this game window, once, before any visible cracks.
      try {
        if (!window.require) return;
        window.require("electron").ipcRenderer.invoke("violet:capture-frame").then(data => {
          if (!data || generation !== captureGeneration) return;
          const shot = new Image();
          shot.onload = () => { if (generation === captureGeneration) current.snapshot = shot; };
          shot.src = data;
        }).catch(() => {});
      } catch (_) { /* A translucent glass effect remains available without capture. */ }
    },
    stop() { run = null; captureGeneration++; },
    paint(target, elapsed) {
      if (!run) return;
      const { width: w, height: h, resolution, layer, context: ctx,
        cells, impact, artWidth, artHeight, snapshot } = run;
      const snap = value => Math.round(value * resolution) / resolution;
      target.clearRect(0, 0, target.canvas.width, target.canvas.height);
      ctx.clearRect(0, 0, layer.width, layer.height);
      ctx.save();
      ctx.scale(resolution, resolution);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      const fracture = clamp((elapsed - 100) / 430);
      const broken = elapsed >= BREAK_AT;
      // Artwork and shard masks use one layout fixed at the start of the effect.
      if (broken) {
        const fade = clamp((elapsed - 1280) / 650);
        const darkness = 1 - fade * fade * (3 - 2 * fade);
        ctx.fillStyle = `rgba(7, 3, 13, ${darkness})`;
        ctx.fillRect(0, 0, w, h);
      } else if (snapshot) {
        // The intact screen and the falling pieces both retain native detail.
        target.imageSmoothingEnabled = true;
        target.imageSmoothingQuality = "high";
        target.drawImage(snapshot, 0, 0, target.canvas.width, target.canvas.height);
      }

      if (!broken && fracture > 0) {
        const stress = 0.70 + 0.15 * clamp((elapsed - 540) / 180);
        paintImpactArt(ctx, impact, artWidth, artHeight, stress, clamp(Math.pow(fracture, 0.72) * 1.35));
      }
      for (const cell of broken ? cells : []) {
        const q = Math.max(0, (elapsed - BREAK_AT - cell.delay) / 550);
        if (q > 1.35) continue;
        ctx.save();
        if (broken) {
          ctx.translate(snap(cell.cx + cell.vx * q), snap(cell.cy + cell.vy * q + cell.gravity * q * q));
          ctx.rotate(Math.round(cell.spin * q / (Math.PI / 180)) * Math.PI / 180);
          ctx.scale(Math.cos(cell.tilt * q) * (1 - q * 0.15), 1 - q * 0.08);
          ctx.translate(-cell.cx, -cell.cy);
          ctx.globalAlpha = 1 - clamp((elapsed - 1180) / 240);
          path(ctx, cell.poly);
          ctx.clip();
          if (snapshot) ctx.drawImage(snapshot, 0, 0, w, h);
          else {
            ctx.fillStyle = "rgba(112, 77, 146, 0.48)";
            ctx.fillRect(0, 0, w, h);
          }
          paintImpactArt(ctx, impact, artWidth, artHeight, 0.85);
        }
        ctx.restore();
      }
      ctx.restore();
      target.save();
      target.imageSmoothingEnabled = true;
      target.imageSmoothingQuality = "high";
      target.drawImage(layer, 0, 0, target.canvas.width, target.canvas.height);
      target.restore();
    }
  };
})();
