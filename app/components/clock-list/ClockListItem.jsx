import React from "react";
import { formatDistance } from "date-fns";
import useClock from "@/app/hooks/use-clock/useClock";
import useTimer from "@/app/hooks/use-timer/useTimer";
import ClockActions from "../shared/clock-actions/ClockActions";
import ClockDisplay from "../shared/clock-display/ClockDisplay";
import { useStoreActions, useStoreState } from "easy-peasy";

const ClockListItem = ({ clock }) => {
  const { date } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  if (!date || !timer) return null;

  const updateClock = useStoreActions(
    (actions) => actions.clockModel.updateClock
  );

  // const localClock = useStoreState((state) => state.clockModel.localClock);
  // console.log(localClock.date);
  return (
    <div>
      <ClockDisplay
        date={timer}
        offset={clock.offset}
        timezone={clock.timezone}
        title={clock.title}
      />
      <ClockActions clock={clock} updateClock={updateClock} />
      {/* <h3>Time Difference : {formatDistance(localClock, date)}</h3> */}
    </div>
  );
};

export default ClockListItem;
