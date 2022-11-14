const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = process.env.UPLOAD_IMAGES_PATH;
    cb(null, path);
  },
  filename: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      let fileName = file.originalname;
      const timestamp = Date.now();
      const name = [timestamp, "-", fileName].join("");
      cb(null, name);
    } else {
      cb(new Error("File type is not supported"), false);
    }
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
