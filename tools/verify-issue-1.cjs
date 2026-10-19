// Run against extracted release AppFiles. Playwright may be supplied by the caller without changing game dependencies.
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const assert = require("node:assert/strict");
const [runtimePath, playwrightPath, reportPath] = process.argv.slice(2);
if (!runtimePath || !playwrightPath) throw new Error("Usage: node tools/verify-issue-1.cjs <AppFiles> <playwright module> [report.json]");
const { chromium } = require(path.resolve(playwrightPath));
const root = path.resolve(runtimePath);
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml" };
const server = http.createServer((req, res) => {
  const relative = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const file = path.resolve(root, "." + (relative === "/" ? "/index.html" : relative));
  if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
  try {
    let content = fs.readFileSync(file);
    if (file.endsWith(path.join("js", "app.js"))) {
      content = content.toString().replace("var __webpack_exports__ = __webpack_require__.O(", "window.__testRequire = __webpack_require__; var __webpack_exports__ = __webpack_require__.O(");
    }
    res.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
    res.end(content);
  } catch { res.writeHead(404).end(); }
});
let browser;
(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || "msedge" });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.waitForFunction(() => typeof player === "object" && typeof GameIntervals === "object");
  const result = await page.evaluate(async () => {
    GameIntervals.stop();
    let assertions = 0;
    function check(condition, description) {
      assertions++;
      if (!condition) throw new Error(description);
    }
    const component = name => __testRequire(`./src/components/${name}.vue`).default;
    const tooltip = component("GlyphTooltip");
    const baseKeys = ["power", "infinity", "time", "replication", "dilation", "effarig"];
    check(AlchemyResources.all.length === 21 && AlchemyResources.all.every(r => Number.isFinite(r.cap)), "All 21 caps start finite");
    check(AlchemyResources.base.every(r => baseKeys.includes(r._name)), "Save keys remain English");
    check(AlchemyResources.all.every(r => typeof r.displayName === "string" && r.displayName.length > 0), "All resource display names exist");
    let tooltipCases = 0;
    for (const type of generatedTypes) for (const rarity of GlyphRarities) {
      const text = tooltip.computed.description.call({ type, rarityInfo: rarity });
      check(text.includes("글리프") && !text.includes("undefined"), `${type}/${rarity.name} tooltip description`);
      tooltipCases++;
    }
    const specialDescriptions = Object.fromEntries(["reality", "cursed", "companion"].map(type => {
      const text = tooltip.computed.description.call({ type });
      check(text.includes("글리프"), `${type} special tooltip`);
      return [type, text];
    }));
    const thresholds = { power: 2, infinity: 3, time: 4, replication: 5, dilation: 6, effarig: 7 };
    for (let level = 1; level <= 25; level++) {
      player.celestials.ra.unlockBits = level === 1 ? 0x7fffffff & ~(1 << Ra.unlocks.unlockGlyphAlchemy.id) : 0x7fffffff;
      Ra.pets.effarig.level = level;
      for (const type of generatedTypes) {
        const gain = GlyphSacrificeHandler.glyphRefinementGain({ type, level: 5000, strength: 2 });
        check(gain === (level < thresholds[type] ? 0 : 25), `${type} unlock boundary at Effarig ${level}`);
      }
    }
    const refinements = [];
    for (const type of generatedTypes) {
      for (const r of AlchemyResources.all) r.amount = 0;
      player.celestials.ra.highestRefinementValue = Object.fromEntries(baseKeys.map(key => [key, 0]));
      const glyph = { type, level: 5000, rawLevel: 5000, strength: 2, effects: 1 };
      Glyphs.addToInventory(glyph);
      GlyphSacrificeHandler.attemptRefineGlyph(glyph, true);
      const resource = GlyphSacrificeHandler.glyphAlchemyResource(glyph);
      check(resource.amount === 25, `${type} actual amount is 25`);
      check(resource.cap === 500 && resource.highestRefinementValue === 500, `${type} actual cap is 500`);
      check(AlchemyResources.base.filter(r => r !== resource).every(r => r.amount === 0), `${type} leaves other resources unchanged`);
      check(!Glyphs.findById(glyph.id), `${type} consumes exactly the refined glyph`);
      check(Object.keys(player.celestials.ra.highestRefinementValue).length === 6, "No translated save keys added");
      const restored = GameSaveSerializer.deserialize(GameSaveSerializer.serialize(player));
      check(restored.celestials.ra.alchemy[resource.id].amount === 25, `${type} save roundtrip preserves 25`);
      check(GameStorage.checkPlayerObject(restored) === "", "Serialized player passes validation");
      refinements.push({ type, gain: 25, cap: 500, savedAmount: restored.celestials.ra.alchemy[resource.id].amount });
    }
    // Exercise the existing-cap branch and hard cap, not only the first refinement branch.
    for (const r of AlchemyResources.all) r.amount = 0;
    player.celestials.ra.highestRefinementValue = Object.fromEntries(baseKeys.map(key => [key, 0]));
    AlchemyResource.power.highestRefinementValue = 1000;
    AlchemyResource.power.amount = 100;
    check(GlyphSacrificeHandler.glyphRefinementGain({ type: "power", level: 5000, strength: 2 }) === 25, "Previously refined resource keeps valid gain");
    check(AlchemyResource.power.cap === 1000, "Existing English cap preserved");
    player.celestials.ra.highestRefinementValue.power = 25000;
    AlchemyResource.power.amount = 24990;
    const cappedGlyph = { type: "power", level: 100000, rawLevel: 100000, strength: 3.5, effects: makeGlyphEffectBitmask(["powerpow"]) };
    check(GlyphSacrificeHandler.glyphRefinementGain(cappedGlyph) === 10, "Hard cap limits gain to remaining 10");
    Glyphs.addToInventory(cappedGlyph);
    GlyphSacrificeHandler.attemptRefineGlyph(cappedGlyph, true);
    check(AlchemyResource.power.amount === 25000 && AlchemyResource.power.cap === 25000, "Refinement respects 25000 hard cap");
    check(component("modals/glyph-management/RefineGlyphModal").computed.resourceName.call({ resource: AlchemyResource.power }) === "힘", "Refine modal displays resource name");
    const levelBar = component("tabs/celestial-ra/RaPetLevelBar");
    check(levelBar.computed.nextScalingUpgrade.call({ pet: Ra.pets.effarig, level: 1 }).includes("힘 자원"), "Effarig reward names resource");
    check(levelBar.computed.displayName.call({ pet: Ra.pets.enslaved }) === "이름 없는 자들", "Ra level-up tooltip names pet");
    check(levelBar.computed.showNextScalingUpgrade.call({ pet: Ra.pets.enslaved, level: 10 }), "Enslaved level reward remains visible");
    const migrate = __testRequire("./src/core/storage/korean-migrations.js").migrateKoreanRemembrance;
    for (const initial of ["", "Teresa", "Effarig", "V", "Enslaved", "이름 없는 자들"]) {
      const save = { celestials: { ra: { petWithRemembrance: initial } } };
      const expected = initial === "이름 없는 자들" ? "Enslaved" : initial;
      migrate(save); migrate(save);
      check(save.celestials.ra.petWithRemembrance === expected, `${initial} migration is compatible and idempotent`);
    }
    migrate({});
    player.celestials.ra.petWithRemembrance = "Enslaved";
    check(Ra.pets.enslaved.hasRemembrance, "Original English save remembrance is applied");
    const style = component("tabs/celestial-ra/RaTab").computed.petStyle.call({ petWithRemembrance: "Enslaved", pets: [{ pet: Ra.pets.enslaved }] });
    check(style.color === "#f1aa7f", "Ra tab renders selected remembrance style");
    player.celestials.ra.petWithRemembrance = "";
    const renderErrors = [];
    Vue.config.errorHandler = (e, vm, info) => renderErrors.push({ error: String(e), component: vm.$options.name, info });
    const host = document.createElement("div"); document.body.appendChild(host);
    const glyph = GlyphGenerator.startingGlyph({ actualLevel: 5000, rawLevel: 5000 }); glyph.strength = 2;
    const vm = new (Vue.extend(component("GlyphComponent")))({ propsData: { glyph } });
    vm.$mount(host);
    await new Promise(resolve => setTimeout(resolve, 30));
    vm.tooltipEnabled = true;
    vm.$refs.over.dispatchEvent(new MouseEvent("mouseenter", { clientX: 100, clientY: 100 }));
    await Vue.nextTick();
    check(renderErrors.length === 0, "Real Vue tooltip renders without error");
    check(document.querySelector(".c-glyph-tooltip")?.innerText.includes("희귀 힘 글리프"), "Real rendered tooltip includes localized type and rarity");
    vm.$destroy();
    check(component("tabs/korean-patch/KoreanPatchTab").data().patchVersion === "1.1.1", "In-game patch version is 1.1.1");
    check(!document.querySelector('script[src*="demo-setup"]') && !window.__koreanDemo, "Release contains no demo fixture");
    return { assertions, tooltipCases, boundaryCases: 150, refinements, specialDescriptions, renderErrors, version: "1.1.1" };
  });
  assert.deepEqual(errors, [], "Game boot must not emit page errors");
  const report = { status: "passed", ...result, pageErrors: errors, scope: "Extracted Steam release code in isolated headless browser; native Steam integration not tested" };
  if (reportPath) fs.writeFileSync(path.resolve(reportPath), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(async () => {
  if (browser) await browser.close();
  server.close();
});
