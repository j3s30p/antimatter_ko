// Rebuild the Steam payload from the published v1.0.0 baseline, then reapply the existing Violet theme.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");

const [baselinePath, buildPath, outputPath] = process.argv.slice(2).map(p => path.resolve(p));
if (!baselinePath || !buildPath || !outputPath) throw new Error("Usage: node tools/build-korean-release.cjs <v1.0.0.asar> <AppFiles build> <output.asar>");
if (baselinePath === outputPath) throw new Error("Baseline and output must be different files");
const sha256 = b => crypto.createHash("sha256").update(b).digest("hex");
const baseline = fs.readFileSync(baselinePath);
if (sha256(baseline) !== "d3df8a16d618d7548adde7da10a97050afa8ff357d20446d855381f91018f0a4") {
  throw new Error("Expected the published Korean v1.0.0 baseline");
}
function parse(buffer) {
  return { header: JSON.parse(buffer.toString("utf8", 16, 16 + buffer.readUInt32LE(12))), start: 8 + buffer.readUInt32LE(4) };
}
function entries(header, prefix = "") {
  return Object.entries(header.files).flatMap(([name, entry]) => {
    const key = prefix + name;
    return entry.files ? entries(entry, key + "/") : [[key, entry]];
  });
}
function bytes(buffer, archive, entry) {
  const start = archive.start + Number(entry.offset);
  return buffer.subarray(start, start + entry.size);
}
function repack(buffer, replacements = new Map()) {
  const archive = parse(buffer);
  const template = archive.header.files.AppFiles.files.js.files["app.js"];
  for (const [key, value] of replacements) {
    const parts = key.split("/");
    let node = archive.header;
    for (const name of parts.slice(0, -1)) node = node.files[name] ??= { files: {} };
    if (!node.files[parts.at(-1)]) node.files[parts.at(-1)] = { size: value.length, offset: "0", integrity: structuredClone(template.integrity) };
  }
  const chunks = [];
  let offset = 0;
  for (const [key, entry] of entries(archive.header)) {
    if (entry.unpacked || entry.link) continue;
    const value = replacements.get(key) ?? bytes(buffer, archive, entry);
    if (replacements.has(key) && entry.integrity) {
      entry.integrity.hash = sha256(value);
      entry.integrity.blocks = [];
      for (let at = 0; at < value.length; at += entry.integrity.blockSize) {
        entry.integrity.blocks.push(sha256(value.subarray(at, at + entry.integrity.blockSize)));
      }
    }
    entry.offset = String(offset);
    entry.size = value.length;
    chunks.push(value);
    offset += value.length;
  }
  const json = Buffer.from(JSON.stringify(archive.header));
  const length = 8 + Math.ceil(json.length / 4) * 4;
  const prefix = Buffer.alloc(8 + length);
  prefix.writeUInt32LE(4, 0);
  prefix.writeUInt32LE(length, 4);
  prefix.writeUInt32LE(length - 4, 8);
  prefix.writeUInt32LE(json.length, 12);
  json.copy(prefix, 16);
  const output = Buffer.concat([prefix, ...chunks]);
  const verified = parse(output);
  for (const [key, entry] of entries(verified.header)) {
    if (entry.unpacked || entry.link) continue;
    const content = bytes(output, verified, entry);
    if (entry.integrity && sha256(content) !== entry.integrity.hash) throw new Error(`Integrity mismatch: ${key}`);
  }
  return output;
}
const replacements = new Map();
function walk(dir, prefix = "AppFiles/") {
  for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, file.name);
    if (file.isDirectory()) walk(full, prefix + file.name + "/");
    else replacements.set(prefix + file.name, fs.readFileSync(full));
  }
}
walk(buildPath);
if (!replacements.has("AppFiles/js/app.js")) throw new Error("Build must use development NODE_ENV and steam-release mode, matching the existing Steam bundle layout");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
const scratchRoot = path.join(path.dirname(outputPath), "release");
fs.mkdirSync(scratchRoot, { recursive: true });
const scratch = fs.mkdtempSync(path.join(scratchRoot, "build-"));
const mergedPath = path.join(scratch, "base.asar");
const themedPath = path.join(scratch, "violet.asar");
fs.writeFileSync(mergedPath, repack(baseline, replacements));
const repo = path.resolve(__dirname, "..");
execFileSync(process.execPath, [path.join(repo, "theme-overrides/build-violet-asar.js"), mergedPath,
  path.join(repo, "theme-overrides/violet.css"), path.join(repo, "theme-overrides/assets/violet-pixel-wave.png"), themedPath], { stdio: "inherit" });
const finalBuffer = repack(fs.readFileSync(themedPath));
fs.writeFileSync(outputPath, finalBuffer);
const original = parse(baseline);
const final = parse(finalBuffer);
const nativeEntries = entries(final.header).filter(([, entry]) => entry.unpacked);
const originalNative = entries(original.header).filter(([, entry]) => entry.unpacked);
if (JSON.stringify(nativeEntries) !== JSON.stringify(originalNative)) throw new Error("Native sidecar metadata changed");
if (nativeEntries.length !== 304) throw new Error(`Expected 304 Greenworks sidecar entries, got ${nativeEntries.length}`);
const manifestPath = path.join(repo, "distribution/patch-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath));
manifest.patchedSha256 = sha256(finalBuffer).toUpperCase();
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify({ outputPath, bytes: finalBuffer.length, sha256: manifest.patchedSha256, nativeEntries: nativeEntries.length, buildFiles: replacements.size }, null, 2));
