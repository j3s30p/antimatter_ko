const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const compiler = require("vue-template-compiler");

const repoRoot = path.resolve(__dirname, "..");
const sourceRoot = path.join(repoRoot, "src");
const abbreviations = ["AM", "AD", "AG", "IP", "ID", "IC", "EP", "EC", "TT", "DT", "TP", "RM", "iM",
  "DM", "DE", "RS", "TD"];
const numberedAbbreviations = ["AD", "ID", "IC", "EC", "TD"];
const abbreviationPattern = new RegExp(
  `(?<![A-Za-z0-9])(?:(?:${numberedAbbreviations.join("|")})\\s*\\d+|` +
  `(?:${abbreviations.join("|")}))s?(?![A-Za-z0-9])`, "gu"
);

function extractTokens(value) {
  const normalized = value.replace(/(?<=\d)x(?=(?:AM|AD|AG|IP|ID|IC|EP|EC|TT|DT|TP|RM|iM|DM|DE|RS|TD)\b)/gu, " ");
  return (normalized.match(abbreviationPattern) ?? []).map(token =>
    abbreviations.find(abbreviation => token.startsWith(abbreviation)) ?? token);
}

function tokenCounts(values) {
  const counts = new Map();
  for (const value of values) {
    for (const token of extractTokens(value)) {
      const baseToken = token.replace(/\d+$/u, "");
      counts.set(baseToken, (counts.get(baseToken) ?? 0) + 1);
    }
  }
  return counts;
}

function exactTokenCounts(value) {
  const counts = new Map();
  for (const token of extractTokens(value)) counts.set(token, (counts.get(token) ?? 0) + 1);
  return counts;
}

function compareTokenCounts(original, current) {
  const expected = exactTokenCounts(original);
  const actual = exactTokenCounts(current);
  const missing = [];
  const unexpected = [];
  for (const token of new Set([...expected.keys(), ...actual.keys()])) {
    const difference = (actual.get(token) ?? 0) - (expected.get(token) ?? 0);
    if (difference < 0) missing.push({ token, count: -difference });
    if (difference > 0) unexpected.push({ token, count: difference });
  }
  return { missing, unexpected };
}

function git(...args) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function structuralPath(nodePath) {
  return nodePath.getAncestry().reverse().slice(1).map(entry => {
    if (entry.listKey === "properties" && entry.parentPath?.isObjectExpression() && entry.isObjectProperty()) {
      const propertyKey = entry.node.computed
        ? `[${entry.node.key.name ?? entry.node.key.value ?? entry.key}]`
        : (entry.node.key.name ?? entry.node.key.value ?? entry.key);
      return `ObjectExpression.properties.${propertyKey}`;
    }
    const container = entry.listKey ?? "field";
    return `${entry.parentPath?.type ?? "root"}.${container}.${entry.key}`;
  }).join("/");
}

function collectScriptStrings(code, file) {
  const values = new Map();
  if (!code.trim()) return values;
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["dynamicImport", "optionalChaining", "nullishCoalescingOperator", "objectRestSpread"]
  });
  traverse(ast, {
    StringLiteral(nodePath) {
      values.set(`string:${structuralPath(nodePath)}`, {
        value: nodePath.node.value,
        line: nodePath.node.loc?.start.line,
        kind: "js-string",
        file
      });
    },
    TemplateLiteral(nodePath) {
      values.set(`template:${structuralPath(nodePath)}`, {
        value: nodePath.node.quasis.map(quasi => quasi.value.raw).join(" "),
        line: nodePath.node.loc?.start.line,
        kind: "template-part",
        file
      });
    }
  });
  return values;
}

function collectTemplateStrings(template, file) {
  const values = new Map();
  if (!template?.trim()) return values;
  const compiled = compiler.compile(template, { comments: false });

  function walk(node, nodePath) {
    if (!node) return;
    if (node.type === 3 && node.text && !node.isComment) {
      values.set(`vue:${nodePath}`, { value: node.text, line: undefined, kind: "vue-text", file });
    }
    for (let index = 0; index < (node.children ?? []).length; index++) {
      walk(node.children[index], `${nodePath}/children.${index}`);
    }
    for (let index = 1; index < (node.ifConditions ?? []).length; index++) {
      walk(node.ifConditions[index].block, `${nodePath}/ifConditions.${index}`);
    }
  }

  walk(compiled.ast, "root");
  return values;
}

function collectFileStrings(code, file) {
  if (!file.endsWith(".vue")) return collectScriptStrings(code, file);
  const component = compiler.parseComponent(code);
  return new Map([
    ...collectScriptStrings(component.script?.content ?? "", file),
    ...collectTemplateStrings(component.template?.content ?? "", file)
  ]);
}

function containsToken(value, token) {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const spaced = escaped.replace(/(?<=\D)(?=\d)/gu, "\\s*");
  return new RegExp(`(?<![A-Za-z0-9])${spaced}(?![A-Za-z0-9])`, "u").test(value);
}

const files = git("ls-tree", "-r", "--name-only", "origin/master", "--", "src")
  .trim().split(/\r?\n/gu)
  .filter(file => /\.(?:js|vue)$/u.test(file) && fs.existsSync(path.join(repoRoot, file)));
const findings = [];
const fileCountFindings = [];
const parseFailures = [];

for (const file of files) {
  try {
    const official = collectFileStrings(git("show", `origin/master:${file}`), file);
    const current = collectFileStrings(fs.readFileSync(path.join(repoRoot, file), "utf8"), file);
    const officialCounts = tokenCounts([...official.values()].map(entry => entry.value));
    const currentCounts = tokenCounts([...current.values()].map(entry => entry.value));
    for (const [token, expected] of officialCounts) {
      const actual = currentCounts.get(token) ?? 0;
      if (actual < expected) fileCountFindings.push({ file, token, expected, actual, missing: expected - actual });
    }
    for (const [key, originalEntry] of official) {
      const currentEntry = current.get(key);
      if (!currentEntry) continue;
      const comparison = compareTokenCounts(originalEntry.value, currentEntry.value);
      const missing = comparison.missing;
      const unexpected = comparison.unexpected.filter(({ token }) =>
        !(token === "ID" && /(?<![A-Za-z])ids?(?![A-Za-z])/iu.test(originalEntry.value)));
      if (missing.length === 0 && unexpected.length === 0) continue;
      findings.push({
        file,
        line: currentEntry.line,
        kind: currentEntry.kind,
        missing,
        unexpected,
        original: originalEntry.value.trim().replace(/\s+/gu, " "),
        current: currentEntry.value.trim().replace(/\s+/gu, " ")
      });
    }
  } catch (error) {
    parseFailures.push({ file, error: error.message });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  upstream: git("rev-parse", "origin/master").trim(),
  scannedFiles: files.length,
  findingFiles: new Set(findings.map(entry => entry.file)).size,
  findings: findings.length,
  fileCountFindings: fileCountFindings.length,
  fileCountMissing: fileCountFindings.reduce((sum, entry) => sum + entry.missing, 0),
  parseFailures,
  entries: findings,
  fileCountEntries: fileCountFindings
};
const outputPath = path.join(repoRoot, "abbreviation-audit.json");
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`Scanned ${report.scannedFiles} files; found ${report.findings} structural abbreviation mismatches ` +
  `in ${report.findingFiles} files; file-count audit found ${report.fileCountMissing} missing tokens in ` +
  `${new Set(fileCountFindings.map(entry => entry.file)).size} files; ${parseFailures.length} parse failures.\n` +
  `Report: ${outputPath}\n`);
