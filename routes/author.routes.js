const express = require("express");
const router = express.Router();
const { AuthorController } = require("../controllers/index");
const Authorize = require("../middleware/auth/auth");
BASE_ROUTE = "/authors";

router.get("/", Authorize("customer"), AuthorController.getAll);
router.get("/:id", Authorize("customer"), AuthorController.getById);
router.post("/", Authorize("customer"), AuthorController.create);
router.put("/:id", Authorize("customer"), AuthorController.update);
router.delete("/:id", Authorize("customer"), AuthorController.delete);


module.exports = {
    router, 
    BASE_ROUTE,
};