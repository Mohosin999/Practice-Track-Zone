import React, { useEffect } from "react";
import useClock from "@/app/hooks/use-clock/useClock";
import ClockDisplay from "../shared/clock-display/ClockDisplay";
import ClockActions from "../shared/clock-actions/ClockActions";

const LocalClock = ({ clock, updateClock, createClock, deleteClock }) => {
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
      <ClockActions
        local={true}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    </div>
  );
};

export default LocalClock;
