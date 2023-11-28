const photosets = [
  {
    title: "New York City",
    slug: "2023-11-nyc",
    date: "2023-11-01",
    description:
      "A trip to New York City in November 2023, mostly around Lower Manhattan.",
    photos: [
      { slug: "DSC02315" },
      { slug: "DSC02320" },
      { slug: "DSC02322" },
      { slug: "DSC02326" },
      { slug: "DSC02328" },
      { slug: "DSC02332" },
      { slug: "DSC02333" },
      { slug: "DSC02335" },
      { slug: "DSC02339" },
      { slug: "DSC02341" },
      { slug: "DSC02336" },
      { slug: "DSC02337" },
      { slug: "DSC02346" },
      { slug: "DSC02351" },
      { slug: "DSC02353" },
      { slug: "DSC02354" },
      { slug: "DSC02356" },
      { slug: "DSC02359" },
      { slug: "DSC02365" },
      { slug: "DSC02367" },
    ],
  },
];

const photos = [];

photosets.forEach((photoset) => {
  photoset.photos.forEach((photo) => {
    if (!photo.src && !photo.thumb) {
      photo.src = `https://img.jameslittle.me/photos/${photoset.slug}/${photo.slug}_1200.jpg`;
      photo.thumb = `https://img.jameslittle.me/photos/${photoset.slug}/${photo.slug}_400.jpg`;
    }

    if (!photo.thumb) {
      photo.thumb = photo.src;
    }

    photo.photoset = photoset.slug;
    photos.push({ ...photo });
  });
});

module.exports = { photosets, photos };
