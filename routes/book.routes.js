const express = require("express");
const router = express.Router();
const { BookController } = require("../controllers/index");
BASE_ROUTE = "/books";

router.get("/", BookController.getAll);
router.get("/:id", BookController.getById);
router.post("/", BookController.create);
router.put("/:id", BookController.update);
router.delete("/:id", BookController.delete);


module.exports = {
    router, 
    BASE_ROUTE,
};