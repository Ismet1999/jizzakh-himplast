const Router = require("express");
const router = new Router();
const category = require("./category.js");
const product = require("./product.js");
const lang = require("./lang.js");

router.use("/category", category);
router.use("/product", product);
router.use("/lang", lang);

module.exports = router;
