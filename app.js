const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes/index");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", function(req, res) {
    res.send("Hello, world");
});

routes.forEach((route) => {
    app.use(route.BASE_ROUTE, route.router);
});


module.exports = app;