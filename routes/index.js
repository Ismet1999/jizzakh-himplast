const Router = require("express");
const router = new Router();
const auth = require("./auth.js");
const user = require("./user.js");
const category = require("./category.js");
const product = require("./product.js");
const lang = require("./lang.js");

router.use("/auth", auth);
router.use("/user", user);
router.use("/category", category);
router.use("/product", product);
router.use("/lang", lang);

module.exports = router;
