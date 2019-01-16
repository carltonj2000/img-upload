const { locations, Images } = require("../src/tileData");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const imgsSrc = Images(locations.macBookProExtSSD);
const imgsDst = Images(locations.local);

for (let i = 0; i < imgsSrc.length; i++) {
  imgSrc = imgsSrc[i].img;
  imgDst = imgsDst[i].img;

  const dirDst = path.dirname(imgDst);
  if (!fs.existsSync(dirDst)) fs.mkdirSync(dirDst, { recursive: true });
  execSync(`ln -s ${imgSrc} ${imgDst}`, { stdio: "inherit" });
}
