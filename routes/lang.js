const Router = require("express");
const router = new Router();
const langController = require("../controllers/langController.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

router.get("/", langController.getAll);
router.post("/", authenticateToken, langController.create);
router.get("/:id", langController.getOne);
router.put("/:id", authenticateToken, langController.edit);
router.delete("/:id", authenticateToken, langController.delete);

module.exports = router;
