const { utcToZonedTime, format } = require("date-fns-tz");
const { formatDistanceToNow, differenceInDays } = require("date-fns");

function dateFormat(value, fmtstring = "yyyy-MM-dd") {
  let zonedDate = utcToZonedTime(value, "UTC");
  return format(zonedDate, fmtstring);
}

function relativeDate(value) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

function dateOlderThan1y(value) {
  return differenceInDays(new Date(), new Date(value)) > 365;
}

module.exports = { dateFormat, relativeDate, dateOlderThan1y };
