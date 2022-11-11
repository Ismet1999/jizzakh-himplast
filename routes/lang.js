const Router = require("express");
const router = new Router();
const langController = require("../controllers/langController.js");

router.get("/", langController.getAll);
router.post("/", langController.create);
router.get("/:id", langController.getOne);
router.put("/:id", langController.edit);
router.delete("/:id", langController.delete);

module.exports = router;
