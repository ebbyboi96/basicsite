var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

var templatePath = process.argv[2]
var outputPath = process.argv[3]

console.log("Template path: " + templatePath)
console.log("Output path: " + outputPath)

var template = fs.readFileSync(templatePath, 'utf8')
console.log("Template: " + template)

var templateFn = ejs.compile(template, {client: true});
console.log("templateFn: " + templateFn.toString());

var templateExt = path.extname(templatePath)
var templateName = path.basename(templatePath, templateExt);
console.log("templateName: ", templateName)


var output = "window.templates = window.templates || {}\n"
output += "window.templates['" + templateName + "'] = " + templateFn.toString() + ";"

fs.writeFileSync(outputPath, output);