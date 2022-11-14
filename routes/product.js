const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController.js");

let uploadProduct = require("../utils/uploadProduct");

router.get("/", productController.getAll);
router.post("/", uploadProduct, productController.create);
router.get("/:id", productController.getOne);
router.put("/:id", productController.edit);
router.delete("/:id", productController.delete);

module.exports = router;
