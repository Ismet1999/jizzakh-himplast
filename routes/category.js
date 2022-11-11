const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController.js");

router.get("/", categoryController.getAll);
router.post("/", categoryController.create);
router.get("/:id", categoryController.getOne);
router.put("/:id", categoryController.edit);
router.delete("/:id", categoryController.delete);

module.exports = router;
