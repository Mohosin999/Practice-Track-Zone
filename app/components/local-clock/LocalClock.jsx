import React, { useEffect } from "react";
import useClock from "@/app/hooks/use-clock/useClock";
import useTimer from "@/app/hooks/use-timer/useTimer";
import ClockDisplay from "../shared/clock-display/ClockDisplay";
import ClockActions from "../shared/clock-actions/ClockActions";

const LocalClock = ({
  clock,
  updateClock,
  createClock,
  deleteClock,
  createFolder,
}) => {
  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  useEffect(() => {
    updateClock({
      date,
      timezone,
      offset,
    });
  }, [date]);

  return (
    <div>
      {timer && (
        <ClockDisplay
          date={timer}
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
        createFolder={createFolder}
      />
    </div>
  );
};

export default LocalClock;
