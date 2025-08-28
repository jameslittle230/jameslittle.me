const TIME_ZONE = "America/New_York";

const datesPlugin = async (eleventyConfig) => {
  eleventyConfig.addDateParsing(function (dateValue) {
    let localDate;
    if (dateValue instanceof Date) {
      // and YAML
      localDate = eleventyConfig.DateTime.fromJSDate(dateValue, {
        zone: "utc",
      }).setZone(TIME_ZONE, { keepLocalTime: true });
    } else if (typeof dateValue === "string") {
      localDate = eleventyConfig.DateTime.fromISO(dateValue, {
        zone: TIME_ZONE,
      });
    }
    if (localDate?.isValid === false) {
      throw new Error(
        `Invalid \`date\` value (${dateValue}) is invalid for ${this.page.inputPath}: ${localDate.invalidReason}`,
      );
    }
    return localDate;
  });

  eleventyConfig.addFilter("format", (dateObj, format, zone) => {
    return eleventyConfig.DateTime.fromJSDate(dateObj, {
      zone: zone || TIME_ZONE,
    }).toFormat(format || "DDD");
  });
};

export default datesPlugin;
