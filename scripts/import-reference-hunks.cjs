/* eslint-disable no-console */
// Imports Korean diff hunks only when the removed English lines occur exactly once in both the
// official Steam base and the current source. Endgame-only additions have no Steam-base match and are skipped.

const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const repo = path.resolve(__dirname, "..");
const steamBase = "C:/Users/j3s30/Documents/ad-official-base-5409-v2";
const endgameEnglish = "C:/Users/j3s30/Documents/ad-endgame-reference";
const endgameKorean = "C:/Users/j3s30/Documents/ad-korean-reference";
const apply = process.argv.includes("--apply");
const excluded = new Set([
  "src/core/secret-formula/news.js",
  "src/core/secret-formula/achievements/normal-achievements.js",
  "src/core/secret-formula/h2p.js",
]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function parseHunks(diff) {
  const hunks = [];
  let current;
  for (const line of diff.replaceAll("\r\n", "\n").split("\n")) {
    if (line.startsWith("@@ ")) {
      if (current) hunks.push(current);
      current = { oldLines: [], newLines: [] };
      continue;
    }
    if (!current || line.startsWith("--- ") || line.startsWith("+++ ")) continue;
    if (line.startsWith("-") && !line.startsWith("---")) current.oldLines.push(line.slice(1));
    if (line.startsWith("+") && !line.startsWith("+++")) current.newLines.push(line.slice(1));
  }
  if (current) hunks.push(current);
  return hunks;
}

function findSequences(haystack, needle) {
  const matches = [];
  if (needle.length === 0 || haystack.length < needle.length) return matches;
  outer: for (let index = 0; index <= haystack.length - needle.length; index++) {
    for (let offset = 0; offset < needle.length; offset++) {
      if (haystack[index + offset] !== needle[offset]) continue outer;
    }
    matches.push(index);
  }
  return matches;
}

const candidatesByFile = new Map();
for (const currentFilename of walk(path.join(repo, "src"))) {
  if (!/\.(?:js|vue)$/u.test(currentFilename)) continue;
  const file = path.relative(repo, currentFilename).replaceAll("\\", "/");
  if (excluded.has(file)) continue;
  const baseFilename = path.join(steamBase, file);
  const englishFilename = path.join(endgameEnglish, file);
  const koreanFilename = path.join(endgameKorean, file);
  if (![baseFilename, englishFilename, koreanFilename].every(filename => fs.existsSync(filename))) continue;
  const result = childProcess.spawnSync("git", [
    "diff", "--no-index", "--unified=0", "--", englishFilename, koreanFilename
  ], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (![0, 1].includes(result.status)) throw new Error(result.stderr || `git diff failed for ${file}`);
  const baseLines = fs.readFileSync(baseFilename, "utf8").replaceAll("\r\n", "\n").split("\n");
  let currentLines = fs.readFileSync(currentFilename, "utf8").replaceAll("\r\n", "\n").split("\n");
  const accepted = [];
  for (const hunk of parseHunks(result.stdout)) {
    if (hunk.oldLines.length === 0 || hunk.newLines.length === 0) continue;
    if (!hunk.newLines.some(line => /[가-힣]/u.test(line))) continue;
    if (findSequences(baseLines, hunk.oldLines).length !== 1) continue;
    const currentMatches = findSequences(currentLines, hunk.oldLines);
    if (currentMatches.length !== 1) continue;
    accepted.push(hunk);
    if (apply) {
      const index = currentMatches[0];
      currentLines.splice(index, hunk.oldLines.length, ...hunk.newLines);
    }
  }
  if (accepted.length > 0) {
    candidatesByFile.set(file, accepted.length);
    if (apply) fs.writeFileSync(currentFilename, currentLines.join("\n"));
  }
}

const total = [...candidatesByFile.values()].reduce((sum, count) => sum + count, 0);
console.log(`${apply ? "Imported" : "Found"} ${total} compatible Korean hunks in ${candidatesByFile.size} files.`);
for (const [file, count] of [...candidatesByFile].sort((a, b) => b[1] - a[1]).slice(0, 80)) {
  console.log(`${count.toString().padStart(4)}  ${file}`);
}
