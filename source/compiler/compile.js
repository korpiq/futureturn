

function RuleLoader()
{
    this.fs = require('fs');
    this.yamlParser = require('yamljs');
}

RuleLoader.prototype = {
    loadRulesFromDirectory: function (directoryname)
    {
        var result = {};
        var directoryEntries = this.fs.readdirSync(directoryname);
        for (var i in directoryEntries)
        {
            var directoryEntry = directoryEntries[i];
            var fullname = directoryname + '/' + directoryEntry;
            console.log("Loading " + fullname);
            var rulename = directoryEntry.replace(/\.\w*$/, '');
            result[rulename] = this.loadRulesFrom(fullname);
        }
        return result;
    },

    loadRulesFrom: function (directoryOrRuleFilename)
    {
        return this.fs.statSync(directoryOrRuleFilename).isDirectory() ?
            this.loadRulesFromDirectory(directoryOrRuleFilename)
            : this.loadRuleFile(directoryOrRuleFilename);
    },

    loadRuleFile: function (ruleFilename)
    {
        return this.yamlParser.load(ruleFilename);
    }
}

var ruleLoader = new RuleLoader();
var rules = ruleLoader.loadRulesFromDirectory(__dirname + '/../rules');
var ruleJson = JSON.stringify(rules, null, 2);

var fs = require('fs');
fs.writeFileSync(
    __dirname + '/../simulator/rules.js',
    'var rules = ' + ruleJson + ';'
);
