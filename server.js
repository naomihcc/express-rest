const http = require("http");
const app = require("./app");

require("dotenv").config();

const port = process.env.APP_PORT || 3000;
const server = http.createServer(app);


server.listen(port);