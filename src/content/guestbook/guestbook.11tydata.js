const EleventyFetch = require("@11ty/eleventy-fetch");

async function fetchGuestbookEntries() {
  const url = "https://api.jameslittle.me/guestbook";
  const response = await EleventyFetch(url, {
    duration: "10s",
    type: "json",
  });

  var { items } = response;
  items.forEach((i) => {
    i.created_at = new Date(i.created_at);
  });
  items.sort((i) => i.created_at);
  items.reverse();
  console.log(`Found ${items.length} guestbook entries`);
  return items;
}

module.exports = async function () {
  return {
    guestbook: await fetchGuestbookEntries(),
    responses: {
      "cb7dd163-659d-4867-9ad9-72c4ca839cde": {
        message: "Ha! Just a coincidence, not sure what that is!",
      },

      "caf15481-3f81-48a9-b576-b6a9b818b3a3": {
        message: "Thanks for the kind words! Send me an email and we can chat!",
      },

      "0cd55ddf-06f1-48dc-b553-2503eb7b3870": {
        message: "ooh ahh",
      },

      "fefedb65-0d84-4d96-8b52-162799098cc6": {
        message:
          "Nothing I know of; the intent was that you'd generate the file yourself based on your content.",
      },
    },
  };
};
