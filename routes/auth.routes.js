const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers/index");
BASE_ROUTE = "/auth";

router.post("/login", AuthController.login);


module.exports = {
    router, 
    BASE_ROUTE,
};