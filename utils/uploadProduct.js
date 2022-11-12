const upload = require("./multerUtils");

let fields = [
  { name: "main_image", maxCount: 1 },
  { name: "images", maxCount: 8 },
];
let uploadProduct = upload.fields(fields);

module.exports = uploadProduct;
