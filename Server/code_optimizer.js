var fs = require('fs');
var esprima = require('esprima');
var escodegen = require('escodegen');
var esmangle = require('esmangle');

var file_name = process.argv[2]
var script = fs.readFileSync(file_name,'utf-8')
var ast = esprima.parse(script);
var mangled = esmangle.mangle(ast);
var optimized = esmangle.optimize(mangled, null);
var final_code = escodegen.generate(optimized)
fs.writeFileSync(file_name,final_code)