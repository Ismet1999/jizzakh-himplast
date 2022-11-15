const Router = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware.js");
const router = new Router();
const userController = require("./../controllers/userController.js");

router.get("/", userController.getAll);
router.post("/", authenticateToken, userController.create);
router.get("/:id", userController.getOne);
router.put("/:id", authenticateToken, userController.edit);
router.delete("/:id", authenticateToken, userController.delete);

module.exports = router;
