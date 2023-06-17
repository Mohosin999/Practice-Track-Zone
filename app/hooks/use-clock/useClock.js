import { useEffect, useState } from "react";
import { addMinutes } from "date-fns";
import { TIMEZONE_OFFSET } from "@/app/constants/timezone";

// Custom hook for managing clock state
const useClock = (timezone, offset) => {
  const [localDate, setLocalDate] = useState(null);
  const [localTimezone, setLocalTimezone] = useState(null);
  const [localOffset, setLocalOffset] = useState(0);
  const [utc, setUtc] = useState(null);

  // Effect to set initial UTC and local offset values
  useEffect(() => {
    let d = new Date();
    const lo = d.getTimezoneOffset(); // lo (localOffset) = -360
    d = addMinutes(d, lo);
    setUtc(d);
    setLocalOffset(lo);
  }, []);

  // Effect to update the local date and timezone based on UTC and user-selected timezone offset
  useEffect(() => {
    if (utc !== null) {
      if (timezone) {
        offset = TIMEZONE_OFFSET[timezone] ?? offset;
        // newUtc = Adjusting UTC based on the user input timezone/offset
        const newUtc = addMinutes(utc, offset);
        setLocalDate(newUtc);
      } else {
        // newUtc = Adjusting UTC based on the local offset (-360)
        const newUtc = addMinutes(utc, -localOffset);
        /**
         * dateStrArr = Splitting the UTC date string to extract timezone
         * like - ['Sat,', '17', 'Jun', '2023', '10:31:08', 'GMT']
         * dateStrArr.pop() = 'GMT'
         */
        const dateStrArr = newUtc.toUTCString().split(" ");
        setLocalDate(newUtc);
        setLocalTimezone(dateStrArr.pop());
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
