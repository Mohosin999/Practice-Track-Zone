import React from "react";
import ClockListItem from "./ClockListItem";

const ClockLists = ({ clocks, updateClock, deleteClock, localClock }) => {
  return (
    <div>
      <h3>Other Clocks</h3>
      <hr />
      {clocks.length === 0 ? (
        <p>There is no clock, please create one</p>
      ) : (
        <div>
          {clocks.map((clock) => (
            <ClockListItem
              key={clock.id}
              clock={clock}
              updateClock={updateClock}
              deleteClock={deleteClock}
              localClock={localClock}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClockLists;
