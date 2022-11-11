const Router = require("express");
const router = new Router();
const catalog = require("./catalog.js");

router.use("/catalog", catalog);

module.exports = router;
