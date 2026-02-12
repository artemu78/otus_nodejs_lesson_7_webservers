var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var setImageRouter = require("./routes/setImage");
var getImageRouter = require("./routes/getImage");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// curl -v -H "Content-Type: application/octet-stream" --data-binary @<path_to_valid_image.jpg> http://localhost:3000/setImage
app.use("/setImage", setImageRouter);
app.use("/getImage", getImageRouter);

app.get("/names/:name", function (req, res, next) {
  const name = req.params.name;
  console.log("name", req.params.name);
  res.send("Hello " + name);
});



module.exports = app;
