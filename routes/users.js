var express = require("express");
var router = express.Router({ mergeParams: true });

/* GET users listing. */
router.get("/:name", function (req, res, next) {
  const name = req.params.name;
  console.log("name", req.params.name);
  res.send("Hello " + name);
});

module.exports = router;
