const fs = require('fs');
const models = {};

fs.readdirSync(__dirname)
  .filter(file => file != 'index.js')
  .forEach(function (file) {
    let module = require(`./${file}`);
    models[module.modelName] = module[module.modelName];
  });


module.exports = models;