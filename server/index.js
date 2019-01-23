const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const upload = multer();
const moment = require("moment");

app.use((req, res, next) => {
  console.log(moment().format("h:mm:ss"), req.method, req.url);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

app.post("/api/file-upload", upload.single("myFile"), function(req, res, next) {
  console.log(req.file);
  console.log(req.file.buffer.toString());
  res.send({ status: "ok" });
});

app.post("/api/files-upload", upload.array("myFiles", 12), (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    console.log(files[i].buffer.toString());
  }
  res.send({ status: "ok" });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
