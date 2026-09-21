/* eslint-disable no-console */
// Imports translated display properties only when the current value is still identical to the
// official Steam source and the Endgame English reference has the same AST structure.

const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");

const repo = path.resolve(__dirname, "..");
const steamBase = "C:/Users/j3s30/Documents/ad-official-base-5409-v2";
const endgameEnglish = "C:/Users/j3s30/Documents/ad-endgame-reference";
const endgameKorean = "C:/Users/j3s30/Documents/ad-korean-reference";

const jobs = [
  {
    file: "src/core/secret-formula/news.js",
    properties: new Set(["text"]),
  },
  {
    file: "src/core/secret-formula/achievements/normal-achievements.js",
    properties: new Set(["name", "description", "reward"]),
  },
];

const semanticJobs = fs.readdirSync(path.join(repo, "src/core/secret-formula/multiplier-tab"))
  .filter(filename => filename.endsWith(".js"))
  .map(filename => ({
    file: `src/core/secret-formula/multiplier-tab/${filename}`,
    properties: new Set(["name", "displayOverride"]),
  }));

function parse(source) {
  return parser.parse(source, {
    sourceType: "module",
    plugins: ["classProperties", "objectRestSpread", "optionalChaining"],
  });
}

function cleanAst(value) {
  if (Array.isArray(value)) return value.map(cleanAst);
  if (!value || typeof value !== "object") return value;
  const ignored = new Set([
    "start", "end", "loc", "extra", "errors",
    "leadingComments", "trailingComments", "innerComments"
  ]);
  return Object.fromEntries(Object.entries(value)
    .filter(([key]) => !ignored.has(key))
    .map(([key, child]) => [key, cleanAst(child)]));
}

function signature(node) {
  return JSON.stringify(cleanAst(node));
}

function propertyName(node) {
  if (!node || !node.key || node.computed) return undefined;
  return node.key.name ?? node.key.value;
}

function literalId(node) {
  const id = node.properties.find(prop => propertyName(prop) === "id" && prop.type === "ObjectProperty");
  if (!id) return undefined;
  if (id.value.type === "StringLiteral" || id.value.type === "NumericLiteral") return String(id.value.value);
  return undefined;
}

function collectObjects(ast) {
  const result = new Map();
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (node.type === "ObjectExpression") {
      const id = literalId(node);
      if (id !== undefined && !result.has(id)) result.set(id, node);
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === "object" && value.type) visit(value);
    }
  }
  visit(ast.program);
  return result;
}

function propertiesByName(object, allowed) {
  const result = new Map();
  for (const prop of object.properties) {
    const name = propertyName(prop);
    if (allowed.has(name)) result.set(name, prop);
  }
  return result;
}

function collectSemanticProperties(ast, allowed) {
  const result = new Map();
  function visit(node, semanticPath) {
    if (!node || typeof node !== "object") return;
    if (node.type === "VariableDeclarator" && node.id.type === "Identifier") {
      visit(node.init, node.id.name);
      return;
    }
    if (node.type === "ObjectExpression") {
      for (const prop of node.properties) {
        const name = propertyName(prop);
        if (name === undefined) continue;
        const childPath = `${semanticPath}.${name}`;
        if (allowed.has(name)) result.set(childPath, prop);
        if (prop.type === "ObjectProperty") visit(prop.value, childPath);
      }
      return;
    }
    if (node.type === "ArrayExpression") {
      node.elements.forEach((element, index) => visit(element, `${semanticPath}[${index}]`));
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      if (["loc", "start", "end", "extra"].includes(key)) continue;
      if (Array.isArray(value)) value.forEach(child => visit(child, `${semanticPath}.${key}`));
      else if (value && typeof value === "object" && value.type) visit(value, `${semanticPath}.${key}`);
    }
  }
  visit(ast.program, "program");
  return result;
}

for (const job of jobs) {
  const locations = {
    current: path.join(repo, job.file),
    base: path.join(steamBase, job.file),
    english: path.join(endgameEnglish, job.file),
    korean: path.join(endgameKorean, job.file),
  };
  const source = Object.fromEntries(Object.entries(locations)
    .map(([key, filename]) => [key, fs.readFileSync(filename, "utf8")]));
  const objects = Object.fromEntries(Object.entries(source)
    .map(([key, text]) => [key, collectObjects(parse(text))]));
  const replacements = [];

  for (const [id, currentObject] of objects.current) {
    const baseObject = objects.base.get(id);
    const englishObject = objects.english.get(id);
    const koreanObject = objects.korean.get(id);
    if (!baseObject || !englishObject || !koreanObject) continue;
    const props = {
      current: propertiesByName(currentObject, job.properties),
      base: propertiesByName(baseObject, job.properties),
      english: propertiesByName(englishObject, job.properties),
      korean: propertiesByName(koreanObject, job.properties),
    };
    for (const name of job.properties) {
      const nodes = Object.fromEntries(Object.entries(props).map(([key, values]) => [key, values.get(name)]));
      if (!nodes.current || !nodes.base || !nodes.english || !nodes.korean) continue;
      if (signature(nodes.current) !== signature(nodes.base)) continue;
      if (signature(nodes.english) !== signature(nodes.base)) continue;
      if (signature(nodes.korean) === signature(nodes.english)) continue;
      replacements.push({
        start: nodes.current.start,
        end: nodes.current.end,
        text: source.korean.slice(nodes.korean.start, nodes.korean.end),
        id,
        name,
      });
    }
  }

  let output = source.current;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    output = output.slice(0, replacement.start) + replacement.text + output.slice(replacement.end);
  }
  fs.writeFileSync(locations.current, output);
  console.log(`${job.file}: imported ${replacements.length} properties`);
}

for (const job of semanticJobs) {
  const locations = {
    current: path.join(repo, job.file),
    base: path.join(steamBase, job.file),
    english: path.join(endgameEnglish, job.file),
    korean: path.join(endgameKorean, job.file),
  };
  if (Object.values(locations).some(filename => !fs.existsSync(filename))) continue;
  const source = Object.fromEntries(Object.entries(locations)
    .map(([key, filename]) => [key, fs.readFileSync(filename, "utf8")]));
  const properties = Object.fromEntries(Object.entries(source)
    .map(([key, text]) => [key, collectSemanticProperties(parse(text), job.properties)]));
  const replacements = [];
  for (const [semanticPath, current] of properties.current) {
    const base = properties.base.get(semanticPath);
    const english = properties.english.get(semanticPath);
    const korean = properties.korean.get(semanticPath);
    if (!base || !english || !korean) continue;
    if (signature(current) !== signature(base)) continue;
    if (signature(english) !== signature(base)) continue;
    if (signature(korean) === signature(english)) continue;
    replacements.push({ start: current.start, end: current.end, text: source.korean.slice(korean.start, korean.end) });
  }
  let output = source.current;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    output = output.slice(0, replacement.start) + replacement.text + output.slice(replacement.end);
  }
  fs.writeFileSync(locations.current, output);
  if (replacements.length > 0) console.log(`${job.file}: imported ${replacements.length} semantic properties`);
}
