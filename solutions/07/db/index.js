var mongoose = require('mongoose');
var fs = require('fs');
var config = require(__base + 'config');
var modelsPath = __base + 'db/models/';
var path = require('path');

var files = fs.readdirSync(modelsPath);

mongoose.connect(config.db.url);

module.exports.createModel = (name, schema) => mongoose.model(name, schema);

module.exports.createSchema = schemaObj => mongoose.Schema(schemaObj);

module.exports.models = (function() {
    var files = fs.readdirSync(modelsPath);
    return files.reduce((obj, fileName) => {
        var name = path.parse(fileName).name;
        obj[name.replace(/^./, name[0].toUpperCase())] = require(modelsPath + fileName);
        return obj;
    }, {});
}());