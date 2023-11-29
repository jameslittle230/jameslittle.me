const photosets = [
  {
    title: "January 2022 Snow Day",
    slug: "2022-01-snowday",
    date: "2022-01-31",
    description:
      "A snowy day in January 2021. Shot on iPhone, edited in Darkroom.",
    photos: [{ slug: "IMG_5886" }, { slug: "IMG_5893" }],
  },
  {
    title: "Boston in the Fall",
    slug: "2022-fall-boston",
    date: "2022-10-01",
    description:
      "Photos around Boston and Cambridge in the fall of 2022. Some were shot on film, others on a Sony mirrorless camera.",
    photos: [
      { slug: "CamN28890003813-R1-007-2" },
      { slug: "CamN28890003813-R1-021-9" },
      { slug: "CamN28890003813-R1-041-19" },
      { slug: "CamN28890003814-R1-E009" },
      { slug: "CamN28890003814-R1-E010" },
      { slug: "CamN28890003814-R1-E011" },
      { slug: "CamN28890003814-R1-E012" },
      { slug: "CamN28890003814-R1-E013" },
      { slug: "CamN28890003814-R1-E015" },
      { slug: "CamN28890003814-R1-E016" },
      { slug: "CamN28890003814-R1-E019" },
      { slug: "CamN28890003814-R1-E024" },
      { slug: "CamN28890003814-R1-E027" },
      { slug: "CamN28890003814-R1-E029" },
      { slug: "DSC05819" },
      { slug: "DSC05859" },
      { slug: "DSC05900" },
      { slug: "DSC05907" },
      { slug: "DSC05911" },
      { slug: "DSC05923" },
      { slug: "DSC05935" },
    ],
  },
  {
    title: "New York City",
    slug: "2023-11-nyc",
    date: "2023-11-01",
    description:
      "A trip to New York City in November 2023, mostly around Lower Manhattan. Shot on a Sony A7Riii with a 24mm f/2.8 lens.",
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

photosets.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

module.exports = { photosets, photos };
