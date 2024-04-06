const photosets = require("./photosets");

const photos = [];

photosets.forEach((photoset) => {
  photoset.photos.forEach((photo, index) => {
    photos.push({ ...photo, setTitle: photoset.title, indexWithinSet: index });
  });
});

module.exports = photos;
