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
  return await fetchGuestbookEntries();
};
