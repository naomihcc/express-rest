const fs = require("fs");

const controllers = {};

fs.readdirSync(__dirname)
    .filter(file => file != "index.js")
    .forEach((file) => {
        let module = require(`./${file}`);
        let { controllerName } = module;
        controllers[controllerName] = module[controllerName];
    });

    
module.exports = controllers;