const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer();

const morgan = require("morgan");
app.use(morgan(":method :url"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

app.post("/api/image-upload", upload.array("avatar", 12), (req, res) => {
  console.log(req.file);
  console.log(req.file.buffer.toString());
  res.send({ status: "OK" });
});

app.post("/api/profile", upload.single("avatar"), function(req, res, next) {
  console.log(req.file);
  console.log(req.file.buffer.toString());
  res.send({ status: "OK" });
});
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
