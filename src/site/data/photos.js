import photosets from "./photosets.js";

export default (() => {
  const photos = [];

  photosets.forEach((photoset) => {
    photoset.photos.forEach((photo, index) => {
      photos.push({
        ...photo,
        setTitle: photoset.title,
        indexWithinSet: index,
      });
    });
  });

  return photos;
})();
