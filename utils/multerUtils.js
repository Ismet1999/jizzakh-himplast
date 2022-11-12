const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = "static/images/";
    cb(null, path);
  },
  filename: function (req, file, cb) {
    let path = "static/images/";
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, file.originalname);
      let fileName = file.originalname;
      const timestamp = Date.now();
      const name = [timestamp, "-", fileName].join("");
      // multer adds a field called "file" to the request object
      if (req.body[file.fieldname]) {
        req.body[file.fieldname].push([path, name].join(""));
      } else {
        req.body[file.fieldname] = [[path, name].join("")];
      }
      cb(null, name);
    } else {
      cb(new Error("File type is not supported"), false);
    }
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
