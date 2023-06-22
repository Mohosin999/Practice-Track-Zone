import React from "react";
import { formatDistance } from "date-fns";
import useClock from "@/app/hooks/use-clock/useClock";
import ClockActions from "../shared/clock-actions/ClockActions";
import ClockDisplay from "../shared/clock-display/ClockDisplay";

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
  const { date } = useClock(clock.timezone, clock.offset);

  if (!date) return null;

  return (
    <div>
      <ClockDisplay
        date={date}
        offset={clock.offset}
        timezone={clock.timezone}
        title={clock.title}
      />
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        deleteClock={deleteClock}
      />
      <h3>Time Difference : {formatDistance(localClock, date)}</h3>
    </div>
  );
};

export default ClockListItem;
