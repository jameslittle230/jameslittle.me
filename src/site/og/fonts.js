const fs = require("fs");
const path = require("path");

const getOgFonts = () => [
  {
    name: "Inter",
    data: fs.readFileSync(path.join(__dirname, "./Inter-Light.ttf")),
    weight: 400,
    style: "normal",
  },
  {
    name: "Inter",
    data: fs.readFileSync(path.join(__dirname, "./Inter-SemiBold.ttf")),
    weight: 600,
    style: "normal",
  },
];

module.exports = {
  getOgFonts,
};
