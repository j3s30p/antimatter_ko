const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const [sourcePath, overridePath, wavePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !overridePath || !wavePath || !outputPath) {
  throw new Error('Usage: node build-violet-asar.js <original app.asar> <override.css> <wave.png> <output app.asar>');
}
if (path.resolve(sourcePath) === path.resolve(outputPath)) {
  throw new Error('Source and output must be different files');
}

const source = fs.readFileSync(sourcePath);
const originalHeaderLength = source.readUInt32LE(4);
const originalJsonLength = source.readUInt32LE(12);
const payloadStart = 8 + originalHeaderLength;
const header = JSON.parse(source.toString('utf8', 16, 16 + originalJsonLength));
const payload = source.subarray(payloadStart);
const appEntry = header.files.AppFiles.files.js.files['app.js'];
const mainEntry = header.files['main.js'];
const styleFiles = header.files.AppFiles.files.stylesheets.files;
const imageFiles = header.files.AppFiles.files.images.files;
const darkEntry = styleFiles['theme-Dark.css'];
const referenceImageEntry = imageFiles['dark-bg.png'];
if (!appEntry?.integrity || !darkEntry?.integrity || !referenceImageEntry?.integrity ||
    styleFiles['theme-Violet.css'] || imageFiles['violet-pixel-wave.png'] || imageFiles['violet-crunch-vortex.png'] ||
    imageFiles['violet-warp-art.png'] || imageFiles['violet-crunch-impact.png']) {
  throw new Error('Unexpected archive entries or Violet already exists');
}

function readEntry(entry) {
  const start = payloadStart + Number(entry.offset);
  return source.subarray(start, start + entry.size);
}
function replaceOnce(input, oldText, newText) {
  const first = input.indexOf(oldText);
  if (first < 0 || input.indexOf(oldText, first + oldText.length) >= 0) {
    throw new Error(`Expected exactly one match for: ${oldText.slice(0, 70)}`);
  }
  return input.slice(0, first) + newText + input.slice(first + oldText.length);
}
function updateEntry(entry, bytes, offset) {
  const hash = data => crypto.createHash('sha256').update(data).digest('hex');
  entry.offset = String(offset);
  entry.size = bytes.length;
  entry.integrity.hash = hash(bytes);
  entry.integrity.blocks = [];
  for (let i = 0; i < bytes.length; i += entry.integrity.blockSize) {
    entry.integrity.blocks.push(hash(bytes.subarray(i, i + entry.integrity.blockSize)));
  }
}

let appJs = readEntry(appEntry).toString('utf8');
appJs = replaceOnce(appJs,
  'attrs: { config: _vm.costConfig, name: "Reality Machine" }',
  'attrs: { config: _vm.costConfig, name: "현실 머신" }');
for (const [english, korean] of [
  ['Logged in to PlayFab Cloud', 'PlayFab 클라우드에 로그인했습니다.'],
  ["Couldn't log in to PlayFab Cloud.", 'PlayFab 클라우드에 로그인하지 못했습니다.']
]) {
  appJs = replaceOnce(appJs, JSON.stringify(english), JSON.stringify(korean));
}
appJs = replaceOnce(
  appJs,
  'if (!this.isSecret || !this.isAvailable()) return name;',
  'if (name === "Violet") return "바이올렛";\n    if (!this.isSecret || !this.isAvailable()) return name;'
);
appJs = replaceOnce(
  appJs,
  'document.body.classList.add(this.cssClass());',
  'document.body.classList.add(this.cssClass());\n    if (name === "Violet") document.body.classList.add("t-dark");'
);
appJs = replaceOnce(
  appJs,
  'Theme.create("Dark", {\n    dark: true\n  }), Theme.create("Dark Metro", {',
  'Theme.create("Dark", {\n    dark: true\n  }), Theme.create("Violet", {\n    dark: true\n  }), Theme.create("Dark Metro", {'
);
appJs = replaceOnce(
  appJs,
  'function bigCrunchAnimation() {\n  _full_screen_animation_handler__WEBPACK_IMPORTED_MODULE_1__["default"].display("a-implode", 2);\n}',
  'function bigCrunchAnimation() {\n  if (document.body.classList.contains("t-violet") && window.__violetBigCrunch) {\n    _full_screen_animation_handler__WEBPACK_IMPORTED_MODULE_1__["default"].display("a-violet-crunch-still", 2);\n    window.__violetBigCrunch.start();\n  } else {\n    _full_screen_animation_handler__WEBPACK_IMPORTED_MODULE_1__["default"].display("a-implode", 2);\n  }\n}'
);
appJs = replaceOnce(
  appJs,
  '      this.planet.update(this.totalPhase(), this.eccentricity, this.period);',
  `      if (document.body.classList.contains("t-violet") && window.__violetBlackHole &&
          window.__violetBlackHole.draw(this.context, delta, {
            active: BlackHole(1).isActive, paused: BlackHoles.arePaused, negative: BlackHoles.areNegative,
            blob: player.options.animations.blobHole
          })) return;
      this.planet.update(this.totalPhase(), this.eccentricity, this.period);`
);
for (const [originalAnimation, exiting] of [['a-dilate', false], ['a-undilate', true]]) {
  const originalCall = `_full_screen_animation_handler__WEBPACK_IMPORTED_MODULE_2__["default"].display("${originalAnimation}", 2);`;
  appJs = replaceOnce(appJs, originalCall,
    `if (document.body.classList.contains("t-violet") && window.__violetDilation) {
    _full_screen_animation_handler__WEBPACK_IMPORTED_MODULE_2__["default"].display("a-violet-crunch-still", 2);
    window.__violetDilation.start(${exiting});
  } else {
    ${originalCall}
  }`);
}
appJs += `\n;\n${fs.readFileSync(path.join(__dirname, 'violet-warp.js'), 'utf8')}\n`;
appJs += `\n;\n${fs.readFileSync(path.join(__dirname, 'violet-effects.js'), 'utf8')}\n`;
appJs += `\n;\n${fs.readFileSync(path.join(__dirname, 'violet-accretion-flow.js'), 'utf8')}\n`;
appJs += `\n;\n${fs.readFileSync(path.join(__dirname, 'violet-black-hole-real.js'), 'utf8')}\n`;
appJs += `\n;\n${fs.readFileSync(path.join(__dirname, 'violet-wave.js'), 'utf8')}\n`;

let mainJs = readEntry(mainEntry).toString('utf8');
mainJs = replaceOnce(mainJs,
  "const {app, Menu, BrowserWindow, globalShortcut} = require('electron')",
  "const {app, Menu, BrowserWindow, globalShortcut, ipcMain} = require('electron')");
mainJs = replaceOnce(mainJs,
  "  // and load the index.html of the app.",
  `  // One in-memory snapshot for Violet's glass shards, restricted to this window.
  ipcMain.removeHandler('violet:capture-frame');
  ipcMain.handle('violet:capture-frame', async event => {
    if (mainWindow.isDestroyed() || event.sender !== mainWindow.webContents) return null;
    const frame = await mainWindow.webContents.capturePage();
    return frame.toDataURL();
  });

  // and load the index.html of the app.`);
const patchedMain = Buffer.from(mainJs, 'utf8');

const violetCss = Buffer.from(
  `${readEntry(darkEntry).toString('utf8')}\n\n/* Violet theme */\n${fs.readFileSync(overridePath, 'utf8')}\n`,
  'utf8'
);
const wavePng = fs.readFileSync(wavePath);
const vortexPng = fs.readFileSync(path.join(path.dirname(wavePath), 'violet-black-hole-real-v1.png'));
const warpPng = fs.readFileSync(path.join(path.dirname(wavePath), 'violet-warp-original.png'));
const impactPng = fs.readFileSync(path.join(path.dirname(wavePath), 'violet-crunch-wide-v3.png'));
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
if ([wavePng, vortexPng, warpPng, impactPng].some(bytes => !bytes.subarray(0, 8).equals(pngSignature))) {
  throw new Error('Violet asset is not a PNG');
}
const patchedJs = Buffer.from(appJs, 'utf8');
const violetEntry = structuredClone(darkEntry);
const waveEntry = structuredClone(referenceImageEntry);
const vortexEntry = structuredClone(referenceImageEntry);
const warpEntry = structuredClone(referenceImageEntry);
const impactEntry = structuredClone(referenceImageEntry);
updateEntry(appEntry, patchedJs, payload.length);
updateEntry(violetEntry, violetCss, payload.length + patchedJs.length);
updateEntry(waveEntry, wavePng, payload.length + patchedJs.length + violetCss.length);
updateEntry(vortexEntry, vortexPng, payload.length + patchedJs.length + violetCss.length + wavePng.length);
updateEntry(mainEntry, patchedMain, payload.length + patchedJs.length + violetCss.length + wavePng.length + vortexPng.length);
updateEntry(warpEntry, warpPng, payload.length + patchedJs.length + violetCss.length + wavePng.length + vortexPng.length + patchedMain.length);
updateEntry(impactEntry, impactPng, payload.length + patchedJs.length + violetCss.length + wavePng.length + vortexPng.length + patchedMain.length + warpPng.length);
styleFiles['theme-Violet.css'] = violetEntry;
imageFiles['violet-pixel-wave.png'] = waveEntry;
imageFiles['violet-crunch-vortex.png'] = vortexEntry;
imageFiles['violet-warp-art.png'] = warpEntry;
imageFiles['violet-crunch-impact.png'] = impactEntry;

const json = Buffer.from(JSON.stringify(header), 'utf8');
const headerLength = 8 + Math.ceil(json.length / 4) * 4;
const prefix = Buffer.alloc(8 + headerLength);
prefix.writeUInt32LE(4, 0);
prefix.writeUInt32LE(headerLength, 4);
prefix.writeUInt32LE(headerLength - 4, 8);
prefix.writeUInt32LE(json.length, 12);
json.copy(prefix, 16);
const output = Buffer.concat([prefix, payload, patchedJs, violetCss, wavePng, vortexPng, patchedMain, warpPng, impactPng]);

const checkPayloadStart = 8 + output.readUInt32LE(4);
const checkHeader = JSON.parse(output.toString('utf8', 16, 16 + output.readUInt32LE(12)));
const checkApp = checkHeader.files.AppFiles.files.js.files['app.js'];
const checkViolet = checkHeader.files.AppFiles.files.stylesheets.files['theme-Violet.css'];
const checkWave = checkHeader.files.AppFiles.files.images.files['violet-pixel-wave.png'];
const checkVortex = checkHeader.files.AppFiles.files.images.files['violet-crunch-vortex.png'];
const checkMain = checkHeader.files['main.js'];
const checkWarp = checkHeader.files.AppFiles.files.images.files['violet-warp-art.png'];
const checkImpact = checkHeader.files.AppFiles.files.images.files['violet-crunch-impact.png'];
if (!output.subarray(checkPayloadStart + Number(checkImpact.offset), checkPayloadStart + Number(checkImpact.offset) + checkImpact.size).equals(impactPng)) {
  throw new Error('Impact artwork packaging failed');
}
if (!output.subarray(checkPayloadStart + Number(checkWarp.offset), checkPayloadStart + Number(checkWarp.offset) + checkWarp.size).equals(warpPng)) {
  throw new Error('Warp artwork packaging failed');
}
if (!output.subarray(checkPayloadStart + Number(checkMain.offset), checkPayloadStart + Number(checkMain.offset) + checkMain.size).equals(patchedMain)) {
  throw new Error('Main process capture bridge packaging failed');
}
if (!output.subarray(checkPayloadStart, checkPayloadStart + payload.length).equals(payload)) {
  throw new Error('Original archive payload changed');
}
if (!output.subarray(checkPayloadStart + Number(checkApp.offset), checkPayloadStart + Number(checkApp.offset) + checkApp.size).equals(patchedJs)) {
  throw new Error('Patched app.js verification failed');
}
if (!output.subarray(checkPayloadStart + Number(checkViolet.offset), checkPayloadStart + Number(checkViolet.offset) + checkViolet.size).equals(violetCss)) {
  throw new Error('Violet stylesheet verification failed');
}
if (!output.subarray(checkPayloadStart + Number(checkWave.offset), checkPayloadStart + Number(checkWave.offset) + checkWave.size).equals(wavePng)) {
  throw new Error('Wave asset verification failed');
}
if (!output.subarray(checkPayloadStart + Number(checkVortex.offset), checkPayloadStart + Number(checkVortex.offset) + checkVortex.size).equals(vortexPng)) {
  throw new Error('Vortex asset verification failed');
}
fs.writeFileSync(outputPath, output);
console.log(JSON.stringify({outputPath, bytes: output.length, appJsBytes: patchedJs.length, violetCssBytes: violetCss.length, wavePngBytes: wavePng.length, vortexPngBytes: vortexPng.length, originalPayloadPreserved: true}));
