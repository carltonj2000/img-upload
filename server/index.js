const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const moment = require("moment");
const fs = require("fs");

const imgStrLocation =
  "/Volumes/cjs/cj/volume_sfo2_02/cjWorking/img-upload-storage";

app.use((req, res, next) => {
  console.log(moment().format("h:mm:ss"), req.method, req.url);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imgStrLocation);
  },
  filename: function(req, file, cb) {
    cb(null, moment().format("YYYYMMDD-hhmmss") + "-" + file.originalname);
  }
});
const upload = multer({ storage });

app.post("/api/files-upload", upload.array("myFiles", 12), (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    /*
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
    */
    return res.send({ status: "Fail", msg: "No files selected." });
  }
  const fileIds = files.map(file => ({
    img: file.filename
  }));
  res.send({ status: "Ok", fileIds });
});

app.get("/api/images/remove", (req, res) => {
  if (!req.query.file) return res.send({ error: "file parameter required" });
  const file = path.join(imgStrLocation, req.query.file);
  if (!fs.existsSync(file))
    return res.send({ error: `file not found => ${file}` });
  fs.unlinkSync(file);
  res.send({ status: "Ok", file, details: "file removed" });
});

app.get("/api/images", (req, res) => {
  fs.readdir(imgStrLocation, (err, items) => {
    const files = [];
    if (err) return res.send({ error: `failed reading ${imgStrLocation}` });
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (/\.(gif|jpe?g|tiff|png)$/i.test(item)) files.push(item);
    }
    res.send({ status: "Ok", files, items }); // TODO send extra db info with file
  });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
