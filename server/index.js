const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const moment = require("moment");

app.use((req, res, next) => {
  console.log(moment().format("h:mm:ss"), req.method, req.url);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "/Volumes/cjs/cj/volume_sfo2_02/cjWorking/img-upload-storage");
  },
  filename: function(req, file, cb) {
    cb(null, moment().format("YYYYMMDD-hhmmss") + "-" + file.originalname);
  }
});
const upload = multer({ storage });

app.post("/api/file-upload", upload.single("myFile"), function(req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error("Please choose a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send({ status: "Ok" });
});

app.post("/api/files-upload", upload.array("myFiles", 12), (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send({ status: "ok" });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
