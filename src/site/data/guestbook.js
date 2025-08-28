import EleventyFetch from "@11ty/eleventy-fetch";

const getGuestbookUrl = () =>
  `https://api.jameslittle.me/guestbook?qa=${process.env.ELEVENTY_MODE === "development" ? "true" : "false"
  }`;

async function fetchGuestbookEntries() {
  const response = await EleventyFetch(getGuestbookUrl(), {
    duration: "0s",
    type: "json",
  });

  let { items } = response;
  items.forEach((i) => {
    i.created_at = new Date(i.created_at);
  });
  items = items.toSorted((i) => i.created_at).toReversed();

  if (process.env.ELEVENTY_MODE === "development") {
    items = items.slice(1);
  }

  console.log(`Found ${items.length} guestbook entries`);
  return items;
}

export default async function () {
  const entries = await fetchGuestbookEntries();
  return {
    entries,
    url: getGuestbookUrl(),
    lastId: entries[0].id,
  };
}
