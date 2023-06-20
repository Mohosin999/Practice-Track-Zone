import React, { useEffect } from "react";
import useClock from "@/app/hooks/use-clock/useClock";
import ClockDisplay from "../shared/clock-display/ClockDisplay";

const LocalClock = ({ clock, updateClock }) => {
  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);

  useEffect(() => {
    updateClock({
      date,
      timezone,
      offset,
    });
  }, [date]);

  return (
    <div>
      {date && (
        <ClockDisplay
          date={date}
          offset={offset}
          timezone={timezone}
          title={clock.title}
        />
      )}
    </div>
  );
};

export default LocalClock;
