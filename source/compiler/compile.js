
var yamlParser = require('yamljs');

function loadRule(rulename)
{
    return yamlParser.load(__dirname + '/../rules/' + rulename + '.yaml');
}

var rules = {
    'tileTypes': loadRule('tile-types'),
    'tileFeatures': loadRule('tile-features'),
    'gameSizes': loadRule('game-sizes'),
    'bagMixing': loadRule('bag-mixing')
};

var ruleJson = JSON.stringify(rules, null, 2);

var fs = require('fs');
fs.writeFileSync(
    __dirname + '/../simulator/rules.js',
    'var rules = ' + ruleJson + ';'
);
