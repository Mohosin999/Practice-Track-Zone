import { useEffect, useState } from "react";
import { addMinutes } from "date-fns";
import { TIMEZONE_OFFSET } from "@/app/constants/timezone";

// Custom hook for managing clock state
const useClock = (timezone, offset) => {
  // State variables
  const [localDate, setLocalDate] = useState(null); // Local date and time
  const [localTimezone, setLocalTimezone] = useState(null); // Local timezone
  const [localOffset, setLocalOffset] = useState(0); // Local timezone offset
  const [utc, setUtc] = useState(null); // Coordinated Universal Time (UTC)

  // Effect to set initial UTC and local offset values
  useEffect(() => {
    let d = new Date();
    const lo = d.getTimezoneOffset(); // now lo is -360
    d = addMinutes(d, lo);
    setUtc(d);
    setLocalOffset(lo);
  }, []);

  // Effect to update the local date and timezone based on UTC and user-selected timezone offset
  useEffect(() => {
    if (utc !== null) {
      if (timezone) {
        offset = TIMEZONE_OFFSET[timezone] ?? offset;
        const newUtc = addMinutes(utc, offset); // Adjusting UTC based on the selected timezone/offset
        setLocalDate(newUtc);
      } else {
        const newUtc = addMinutes(utc, -localOffset); // Adjusting UTC based on the local offset (-360)
        const dateStrArr = newUtc.toUTCString().split(" "); // Splitting the UTC date string to extract timezone like - ['Sat,', '17', 'Jun', '2023', '10:31:08', 'GMT']
        setLocalDate(newUtc);
        setLocalTimezone(dateStrArr.pop()); // Updating the local timezone
      }
    }
  }, [utc, timezone, offset]);

  // Returning the clock state
  return {
    date: localDate, // Local date and time
    dateUtc: utc, // Coordinated Universal Time (UTC)
    offset: offset || -localOffset, // Selected offset or fallback to local offset
    timezone: timezone || localTimezone, // Selected timezone or fallback to local timezone
  };
};

export default useClock;
