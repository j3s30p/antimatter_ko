const fs = require("fs");
const path = require("path");

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const compiler = require("vue-template-compiler");

const sourceRoot = path.resolve(__dirname, "../src");
const files = [];
const candidatesByFile = new Map();

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(entryPath);
    else if (/\.(js|vue)$/u.test(entry.name)) files.push(entryPath);
  }
}

function addCandidate(file, value, kind) {
  const normalized = value.trim().replace(/\s+/gu, " ");
  if (normalized.length < 2 || !/[A-Za-z]{2,}/u.test(normalized)) return;
  const relativePath = path.relative(sourceRoot, file).replaceAll("\\", "/");
  if (!candidatesByFile.has(relativePath)) candidatesByFile.set(relativePath, new Map());
  candidatesByFile.get(relativePath).set(`${kind}:${normalized}`, { kind, value: normalized });
}

function walkTemplate(node, file) {
  if (!node) return;
  if (node.type === 3 && node.text && !node.isComment) addCandidate(file, node.text, "vue-text");
  for (const child of node.children ?? []) walkTemplate(child, file);
  for (const condition of (node.ifConditions ?? []).slice(1)) walkTemplate(condition.block, file);
}

walk(sourceRoot);

for (const file of files) {
  let code = fs.readFileSync(file, "utf8");
  if (file.endsWith(".vue")) {
    const component = compiler.parseComponent(code);
    if (component.template) {
      const compiled = compiler.compile(component.template.content, { comments: false });
      walkTemplate(compiled.ast, file);
    }
    code = component.script?.content ?? "";
  }
  if (!code.trim()) continue;

  try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["dynamicImport", "optionalChaining", "nullishCoalescingOperator", "objectRestSpread"]
    });
    traverse(ast, {
      StringLiteral(nodePath) {
        if (nodePath.parentPath.isImportDeclaration() ||
            nodePath.parentPath.isExportNamedDeclaration() ||
            nodePath.parentPath.isExportAllDeclaration()) return;
        addCandidate(file, nodePath.node.value, "js-string");
      },
      TemplateElement(nodePath) {
        addCandidate(file, nodePath.node.value.raw, "template-part");
      }
    });
  } catch (error) {
    process.stderr.write(`Could not parse ${path.relative(sourceRoot, file)}: ${error.message}\n`);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  scannedFiles: files.length,
  candidateFiles: candidatesByFile.size,
  candidateStrings: [...candidatesByFile.values()].reduce((sum, values) => sum + values.size, 0),
  files: Object.fromEntries([...candidatesByFile.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([file, values]) => [file, [...values.values()]]))
};

const outputPath = path.resolve(__dirname, "../translation-audit.json");
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`Scanned ${report.scannedFiles} files; found ${report.candidateStrings} candidates ` +
  `in ${report.candidateFiles} files.\nReport: ${outputPath}\n`);
