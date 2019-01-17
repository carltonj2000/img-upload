const antelope = "pics2019/antelope/";

const locations = {
  localstorage: { directory: "/images/" },
  localweb: { directory: "/images/" + antelope },
  local: {
    directory:
      "/Users/carltonjoseph/cj/cj2019/code/react/img-upload/public/images/" +
      antelope
  },
  macBookProExtSSD: {
    directory: "/Volumes/cjs/cj/volume_sfo2_02/cj_pics/" + antelope
  }
};

let public_id = 1;
const ImagesInfo = (location = locations.localstorage) => {
  const dir = location.directory;
  return [
    {
      img: dir + "20190108094950_IMG_4574.jpg",
      title: "20190108094950_IMG_4574.jpg",
      author: "author1",
      cols: 1,
      public_id: public_id++
    },
    {
      img: dir + "20190108095037_IMG_4575.jpg",
      title: "220190108095037_IMG_4575.jpg",
      author: "author2",
      cols: 1,
      public_id: public_id++
    },
    {
      img: dir + "20190108095058_IMG_4576.jpg",
      title: "20190108095058_IMG_4576.jpg",
      author: "author2",
      cols: 1,
      public_id: public_id++
    }
  ];
};

module.exports = {
  ImagesInfo,
  locations
};
