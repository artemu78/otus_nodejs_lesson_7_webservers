var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });

/* POST new image. */
router.post("/", upload.single("image"), function (req, res, next) {
    res.send("Image uploaded");
});

module.exports = router;
