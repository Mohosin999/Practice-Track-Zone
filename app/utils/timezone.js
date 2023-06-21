const { TIMEZONE_OFFSET } = require("../constants/timezone");

// This function is for offsets
export const getOffset = (start = -11.5, end = 12) => {
  const offsets = [];

  for (let i = start; i <= end; i += 0.5) {
    offsets.push(i);
  }

  return offsets;
};

// This function is for timezones
export const getTimezone = () => {
  return ["UTC", "GMT", ...Object.keys(TIMEZONE_OFFSET)];
};
