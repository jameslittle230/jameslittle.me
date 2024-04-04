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
  {
    title: "Zion National Park",
    slug: "2024-03-zion",
    date: "2024-03-30",
    description:
      "A trip to Zion and Bryce Canyon National Parks in March 2024 to celebrate our recent wedding.",
    photos: [
      { slug: "DSC02401" },
      { slug: "DSC02403" },
      { slug: "DSC02414" },
      { slug: "DSC02416" },
      { slug: "DSC02418" },
      { slug: "DSC02420" },
      { slug: "DSC02421" },
      { slug: "DSC02435" },
      { slug: "DSC02437" },
      { slug: "DSC02496" },
      { slug: "DSC02516" },
      { slug: "DSC02535" },
      { slug: "DSC02554" },
      { slug: "DSC02568" },
      { slug: "DSC02573" },
      { slug: "DSC02578" },
      { slug: "DSC02585" },
      { slug: "DSC02592" },
      { slug: "DSC02595" },
      { slug: "DSC02596" },
      { slug: "DSC02601" },
      { slug: "DSC02609" },
      { slug: "DSC02612" },
      { slug: "DSC02616" },
      { slug: "DSC02633" },
      { slug: "DSC02638" },
      { slug: "DSC02639" },
      { slug: "DSC02645" },
      { slug: "DSC02655" },
      { slug: "DSC02658" },
      { slug: "DSC02669" },
      { slug: "DSC02671" },
      { slug: "DSC02673" },
      { slug: "DSC02682" },
      { slug: "DSC02685" },
      { slug: "DSC02688" },
      { slug: "DSC02694" },
      { slug: "DSC02697" },
      { slug: "DSC02702" },
      { slug: "DSC02703" },
      { slug: "DSC02709" },
      { slug: "DSC02710" },
      { slug: "DSC02715" },
      { slug: "DSC02718" },
      { slug: "DSC02721" },
      { slug: "DSC02725" },
      { slug: "DSC02740" },
      { slug: "DSC02746" },
      { slug: "DSC02748" },
      { slug: "DSC02771" },
      { slug: "DSC02773" },
      { slug: "DSC02775" },
      { slug: "DSC02778" },
      { slug: "DSC02781" },
      { slug: "DSC02787" },
      { slug: "DSC02790" },
      { slug: "DSC02792" },
      { slug: "DSC02794" },
      { slug: "DSC02798" },
      { slug: "DSC02801" },
      { slug: "DSC02809" },
      { slug: "DSC02812" },
      { slug: "DSC02813" },
      { slug: "DSC02814" },
      { slug: "DSC02815" },
      { slug: "DSC02816" },
      { slug: "DSC02818" },
      { slug: "DSC02820" },
      { slug: "DSC02823" },
      { slug: "DSC02825" },
      { slug: "DSC02827" },
      { slug: "DSC02829" },
      { slug: "DSC02831" },
      { slug: "DSC02850" },
      { slug: "DSC02853" },
      { slug: "DSC02859" },
      { slug: "DSC02860" },
      { slug: "DSC02869" },
      { slug: "DSC02872" },
      { slug: "DSC02875" },
      { slug: "DSC02878-Enhanced-NR" },
      { slug: "DSC02883" },
      { slug: "DSC02885" },
      { slug: "DSC02887" },
      { slug: "DSC02888" },
      { slug: "DSC02889" },
      { slug: "DSC02890" },
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
