const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = process.env.UPLOAD_IMAGES_PATH;
    cb(null, path);
  },
  filename: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      let originalName = file.originalname;
      const name = [Date.now(), "-", originalName].join("");
      let fileName = Buffer.from(name, "latin1").toString("utf8");
      cb(null, fileName);
    } else {
      cb(new Error("File type is not supported"), false);
    }
  },
});
const upload = multer({ storage: storage });

let fields = [
  { name: "main_image", maxCount: 1 },
  { name: "images", maxCount: 20 },
];
let uploadProduct = upload.fields(fields);

module.exports = uploadProduct;
