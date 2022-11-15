const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

router.get("/", categoryController.getAll);
router.post("/", authenticateToken, categoryController.create);
router.get("/:id", categoryController.getOne);
router.put("/:id", authenticateToken, categoryController.edit);
router.delete("/:id", authenticateToken, categoryController.delete);

module.exports = router;
