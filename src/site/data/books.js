import Airtable from "airtable";
import { DateTime } from "luxon";
import Fetch from "@11ty/eleventy-fetch";
import Dotenv from "dotenv";

Dotenv.config({ quiet: true });

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});

Array.prototype.uniqued = function () {
  var output = [];
  for (const val of this) {
    if (output.indexOf(val) === -1) {
      output.push(val);
    }
  }
  return output;
};

const booksBaseKey = "appktTl97d89xOZQa";
var base = Airtable.base(booksBaseKey);

const getAirtableEntries = new Promise((resolve, reject) => {
  var books = [];

  base("Reading List")
    .select()
    .eachPage(
      (records, fetchNextPage) => {
        try {
          for (const record of records) {
            if (!record.get("Completion Date")) {
              break;
            }
            const completedString = record.get("Completion Date");

            const completed = DateTime.fromISO(completedString);
            const year = completed.toFormat("yyyy");

            const datum = {
              title: record.get("Title"),
              author: record.get("Author"),
              completed,
              year,
            };
            books.push(datum);
          }

          fetchNextPage();
        } catch (e) {
          console.error(e);
        }
      },
      (err) => {
        if (err) reject(err);
        else {
          resolve(books);
        }
      },
    );
});

const processAirtableEntries = (data) => {
  const years = data
    .map((d) => d.year)
    .uniqued()
    .sort((a, b) => b - a); // reverse sort years

  const yearListings = years.map((year) => {
    const books = data
      .filter((d) => d.year === year)
      .sort((a, b) => new Date(b.completed) - new Date(a.completed)); // reverse completion date; most recent first,

    return { year, books };
  });

  return {
    count: data.length,
    yearListings,
  };
};

async function fetchBookData() {
  const airtableEntries = await Fetch(() => getAirtableEntries, {
    requestId: "airtable-entries",
  });
  const processedEntries = processAirtableEntries(airtableEntries);
  console.log(`Found ${processedEntries.count} books read`);
  return processedEntries;
}

export default async function () {
  return await fetchBookData();
}
