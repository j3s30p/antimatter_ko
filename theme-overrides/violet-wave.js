// Deform the Violet background in narrow columns so the wave flows without moving the UI.
(() => {
  const image = new Image();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let canvas;
  let context;
  let sparkleCanvas;
  let sparkleContext;
  let crunchCanvas;
  let crunchContext;
  let imageReady = false;
  let frameId = 0;
  let sparkleFrameId = 0;
  let crunchFrameId = 0;
  let lastFrame = -Infinity;
  let lastSparkleFrame = -Infinity;
  let lastCrunchFrame = -Infinity;
  let crunchStart = null;
  const sparkles = [
    [0.13, 0.40], [0.21, 0.70], [0.28, 0.54], [0.34, 0.83],
    [0.42, 0.64], [0.49, 0.90], [0.57, 0.72], [0.65, 0.85],
    [0.73, 0.61], [0.80, 0.77], [0.87, 0.42], [0.93, 0.66],
    [0.18, 0.87], [0.38, 0.73], [0.69, 0.91], [0.84, 0.88]
  ];


  function resize() {
    if (!canvas || !sparkleCanvas || !crunchCanvas) return;
    const width = Math.max(1, Math.round(window.innerWidth));
    const height = Math.max(1, Math.round(window.innerHeight));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = false;
    }
    if (sparkleCanvas.width !== width || sparkleCanvas.height !== height) {
      sparkleCanvas.width = width;
      sparkleCanvas.height = height;
      sparkleContext.imageSmoothingEnabled = false;
    }
    const crunchResolution = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const crunchWidth = Math.max(1, Math.round(width * crunchResolution));
    const crunchHeight = Math.max(1, Math.round(height * crunchResolution));
    if (crunchCanvas.width !== crunchWidth || crunchCanvas.height !== crunchHeight) {
      crunchCanvas.width = crunchWidth;
      crunchCanvas.height = crunchHeight;
      crunchContext.imageSmoothingEnabled = true;
      crunchContext.imageSmoothingQuality = "high";
    }
    if (imageReady && document.body.classList.contains("t-violet")) {
      paint(reducedMotion.matches ? 0 : performance.now());
      paintSparkles(reducedMotion.matches ? 0 : performance.now());
      if (crunchStart !== null) paintCrunch(performance.now());
    }
  }

  function paint(time) {
    const width = canvas.width;
    const height = canvas.height;
    const stripWidth = 6;
    const overscan = 12;
    const scale = 1;
    context.clearRect(0, 0, width, height);

    for (let x = 0; x < width; x += stripWidth) {
      const drawnWidth = Math.min(stripWidth, width - x);
      const sourceX = image.width * x / width;
      const sourceWidth = image.width * drawnWidth / width;
      const crest = 6 * Math.sin(x * 0.012 - time * 0.00055);
      const detail = 2 * Math.sin(x * 0.024 + time * 0.00032);
      const shiftedX = width / 2 + (x - width / 2) * scale;
      const shiftedY = height / 2 + (crest + detail - overscan - height / 2) * scale;
      context.drawImage(
        image, sourceX, 0, sourceWidth, image.height,
        shiftedX, shiftedY, drawnWidth * scale + 0.5, (height + 2 * overscan) * scale
      );
    }
  }

  function animate(time) {
    if (!document.body.classList.contains("t-violet") || reducedMotion.matches) {
      frameId = 0;
      return;
    }
    if (time - lastFrame >= 1000 / 24) {
      paint(time);
      lastFrame = time;
    }
    frameId = requestAnimationFrame(animate);
  }

  function paintSparkles(time) {
    const width = sparkleCanvas.width;
    const height = sparkleCanvas.height;
    const scale = 1;
    sparkleContext.clearRect(0, 0, width, height);
    sparkleContext.fillStyle = "#e7b9ff";

    sparkles.forEach(([baseX, baseY], index) => {
      const phase = index * 2.37;
      const speed = 0.0011 + index % 4 * 0.00016;
      const glow = Math.pow((Math.sin(time * speed + phase) + 1) / 2, 4);
      const orbit = (1 - scale) * Math.PI * 2.5;
      const baseDx = (baseX - 0.5) * width;
      const baseDy = (baseY - 0.5) * height;
      const x = Math.round(width / 2 + (baseDx * Math.cos(orbit) - baseDy * Math.sin(orbit)) * scale +
        Math.sin(time * 0.00019 + phase) * (3 + index % 3));
      const y = Math.round(height / 2 + (baseDx * Math.sin(orbit) + baseDy * Math.cos(orbit)) * scale +
        Math.cos(time * 0.00023 + phase) * (3 + index % 4));
      const radius = index % 5 === 0 ? 4 : 3;

      sparkleContext.globalAlpha = 0.10 + glow * 0.75;
      sparkleContext.fillRect(x - 1, y - 1, 3, 3);
      if (glow > 0.3) {
        sparkleContext.fillRect(x, y - radius, 1, radius * 2 + 1);
        sparkleContext.fillRect(x - radius, y, radius * 2 + 1, 1);
      }
    });
    sparkleContext.globalAlpha = 1;
  }

  function animateSparkles(time) {
    if (!document.body.classList.contains("t-violet") || reducedMotion.matches) {
      sparkleFrameId = 0;
      return;
    }
    if (time - lastSparkleFrame >= 1000 / 30) {
      paintSparkles(time);
      lastSparkleFrame = time;
    }
    sparkleFrameId = requestAnimationFrame(animateSparkles);
  }

  function paintCrunch(time) {
    window.__violetFracture.paint(crunchContext, time - crunchStart);
  }

  function stopCrunch() {
    if (crunchFrameId) cancelAnimationFrame(crunchFrameId);
    crunchFrameId = 0;
    crunchStart = null;
    window.__violetFracture.stop();
    crunchCanvas.hidden = true;
    crunchContext.clearRect(0, 0, crunchCanvas.width, crunchCanvas.height);
    if (imageReady && document.body.classList.contains("t-violet")) {
      paint(performance.now());
      paintSparkles(performance.now());
    }
  }

  function animateCrunch(time) {
    if (!document.body.classList.contains("t-violet") || time - crunchStart >= 2000) {
      stopCrunch();
      return;
    }
    if (time - lastCrunchFrame >= 1000 / 30) {
      paintCrunch(time);
      lastCrunchFrame = time;
    }
    crunchFrameId = requestAnimationFrame(animateCrunch);
  }

  function startCrunch() {
    if (reducedMotion.matches || !crunchContext) return;
    if (crunchFrameId) cancelAnimationFrame(crunchFrameId);
    crunchCanvas.hidden = true;
    window.__violetFracture.start(window.innerWidth, window.innerHeight);
    crunchStart = performance.now();
    lastCrunchFrame = -Infinity;
    crunchCanvas.hidden = false;
    crunchFrameId = requestAnimationFrame(animateCrunch);
  }

  function sync() {
    if (!canvas || !sparkleCanvas) return;
    const active = imageReady && document.body.classList.contains("t-violet");
    canvas.hidden = !active;
    sparkleCanvas.hidden = !active;
    document.body.classList.toggle("violet-wave-ready", active);
    if (frameId) cancelAnimationFrame(frameId);
    if (sparkleFrameId) cancelAnimationFrame(sparkleFrameId);
    frameId = 0;
    sparkleFrameId = 0;
    if (!active) {
      if (crunchStart !== null) stopCrunch();
      return;
    }
    resize();
    if (!reducedMotion.matches) {
      lastFrame = -Infinity;
      lastSparkleFrame = -Infinity;
      frameId = requestAnimationFrame(animate);
      sparkleFrameId = requestAnimationFrame(animateSparkles);
    }
  }

  function install() {
    const container = document.getElementById("ui-container");
    if (!container) {
      setTimeout(install, 100);
      return;
    }
    canvas = document.createElement("canvas");
    canvas.id = "violet-wave-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.hidden = true;
    container.appendChild(canvas);
    sparkleCanvas = document.createElement("canvas");
    sparkleCanvas.id = "violet-sparkle-canvas";
    sparkleCanvas.setAttribute("aria-hidden", "true");
    sparkleCanvas.hidden = true;
    container.appendChild(sparkleCanvas);
    crunchCanvas = document.createElement("canvas");
    crunchCanvas.id = "violet-crunch-canvas";
    crunchCanvas.setAttribute("aria-hidden", "true");
    crunchCanvas.hidden = true;
    document.body.appendChild(crunchCanvas);
    context = canvas.getContext("2d", { alpha: true });
    sparkleContext = sparkleCanvas.getContext("2d", { alpha: true });
    crunchContext = crunchCanvas.getContext("2d", { alpha: true });
    if (!context || !sparkleContext || !crunchContext) return;
    window.__violetBigCrunch = { start: startCrunch };
    resize();
    new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize, { passive: true });
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", sync);
    else reducedMotion.addListener(sync);
    image.onload = () => {
      imageReady = true;
      sync();
    };
    image.src = new URL("images/violet-pixel-wave.png", document.baseURI).href;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();
})();
