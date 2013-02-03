var yamlParser = require('yamljs');
var rules = {
    'tileTypes': yamlParser.load('./source/rules/tile-types.yaml'),
    'tileFeatures': yamlParser.load('./source/rules/tile-features.yaml'),
    'gameSizes': yamlParser.load('./source/rules/game-sizes.yaml'),
    'bagMixing': yamlParser.load('./source/rules/bag-mixing.yaml')
};
console.log(rules);
