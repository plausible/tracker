const uglify = require("uglify-js");
const fs = require('fs')
const path = require('path')
const Handlebars = require("handlebars");

const args = process.argv.slice(2);
const destDir = path.join(path.dirname(require.main.filename), 'dest')
const outDir = args[0] || destDir

function outPath(segment) {
  return path.join(outDir, segment)
}

function relPath(segment) {
  return path.join(__dirname, segment)
}

function compilefile(input, output, templateVars = {}) {
  const code = fs.readFileSync(input).toString()
  const template = Handlebars.compile(code)
  const rendered = template(templateVars)
  const result = uglify.minify(rendered)
  fs.writeFileSync(output, result.code)
}

compilefile(relPath('src/plausible.js'), outPath('plausible.js'))
compilefile(relPath('src/plausible.js'), outPath('plausible.hash.js'), {hashMode: true})
compilefile(relPath('src/p.js'), outPath('p.js'))
fs.copyFileSync(outPath('plausible.js'), outPath('analytics.js'))
