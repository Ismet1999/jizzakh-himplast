const Router = require("express");
const router = new Router();
const catalogController = require("../controllers/catalogController.js");

router.get("/", catalogController.getAll);
router.post("/", catalogController.create);
router.get("/:id", catalogController.getOne);
router.put("/:id", catalogController.edit);
router.delete("/:id", catalogController.delete);

module.exports = router;
