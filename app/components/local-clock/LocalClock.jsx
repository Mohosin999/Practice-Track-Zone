import React, { useEffect } from "react";
import useClock from "@/app/hooks/use-clock/useClock";
import CLockDisplay from "../shared/clock-display/CLockDisplay";

const LocalClock = ({ clock, updateClock }) => {
  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);

  useEffect(() => {
    updateClock({
      date,
      timezone,
      offset,
    });
  }, [date]);

  return <div>{date && <CLockDisplay date={date} />}</div>;
};

export default LocalClock;
