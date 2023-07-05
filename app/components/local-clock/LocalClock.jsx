import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import useClock from "@/app/hooks/use-clock/useClock";
import useTimer from "@/app/hooks/use-timer/useTimer";
import ClockDisplay from "../shared/clock-display/ClockDisplay";
import ClockActions from "../shared/clock-actions/ClockActions";

const LocalClock = () => {
  const localClock = useStoreState((state) => state.clockModel.localClock);
  const updateLocalClock = useStoreActions(
    (actions) => actions.clockModel.updateLocalClock
  );

  const { date, timezone, offset } = useClock(
    localClock?.timezone || "",
    localClock?.offset || 0
  );
  const timer = useTimer(date);

  useEffect(() => {
    updateLocalClock({
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
          title={localClock.title}
        />
      )}
      <ClockActions local={true} />
    </div>
  );
};

export default LocalClock;
