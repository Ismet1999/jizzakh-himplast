const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

let uploadProduct = require("../utils/uploadProduct");

router.get("/", productController.getAll);
router.post("/", authenticateToken, uploadProduct, productController.create);
router.get("/:id", productController.getOne);
router.put("/:id", authenticateToken, uploadProduct, productController.edit);
router.delete("/:id", authenticateToken, productController.delete);

module.exports = router;
