import React, { useEffect } from "react";
import ClockListItem from "./ClockListItem";
import { useStoreState, useStoreActions } from "easy-peasy";

const ClockLists = () => {
  const clocks = useStoreState((state) => state.clockModel.clocks);
  const setClocks = useStoreActions((actions) => actions.clockModel.setClocks);

  // Get created clocks from local storage
  useEffect(() => {
    const storedClocks = localStorage.getItem("clocks");
    if (storedClocks) {
      setClocks(JSON.parse(storedClocks));
    }
  }, [setClocks]);

  return (
    <div>
      <h3>Other Clocks</h3>
      <hr />
      {clocks.length === 0 ? (
        <p>There is no clock, please create one</p>
      ) : (
        <div>
          {clocks.map((clock) => (
            <ClockListItem key={clock.id} clock={clock} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClockLists;
