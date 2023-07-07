import React from "react";
import { formatDistance } from "date-fns";
import { useStoreActions } from "easy-peasy";

import useClock from "@/app/hooks/use-clock/useClock";
import useTimer from "@/app/hooks/use-timer/useTimer";
import ClockActions from "../shared/clock-actions/ClockActions";
import ClockDisplay from "../shared/clock-display/ClockDisplay";

const ClockListItem = ({ clock }) => {
  const { date } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  if (!date || !timer) return null;

  const localClock = useStoreActions(
    (actions) => actions.clockModel.localClock
  );
  const updateClock = useStoreActions(
    (actions) => actions.clockModel.updateClock
  );
  const deleteClock = useStoreActions(
    (actions) => actions.clockModel.deleteClock
  );

  return (
    <div>
      <ClockDisplay
        date={timer}
        offset={clock.offset}
        timezone={clock.timezone}
        title={clock.title}
      />
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        deleteClock={deleteClock}
      />
      {/* <h3>Time Difference : {formatDistance(localClock, date)}</h3> */}
    </div>
  );
};

export default ClockListItem;
