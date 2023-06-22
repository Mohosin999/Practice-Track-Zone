"use client";
import React, { useState } from "react";
import { generate } from "shortid";
import LocalClock from "./components/local-clock/LocalClock";

const LOCAL_CLOCK_INIT = {
  title: "My Clock",
  timezone: "",
  offset: 0,
  date: null,
};

const Home = () => {
  const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });
  const [clocks, setClocks] = useState([]);

  // This function is for local clock update
  function updateLocalClock(date) {
    setLocalClock({
      ...localClock,
      ...date,
    });
  }

  // This function is for create clock
  const createClock = (clock) => {
    clock.id = generate();
    setClocks([...clocks, clock]);
  };

  // This function is for created clock updates
  const updateClock = (updatedClock) => {
    const updatedClocks = clocks.map((clock) => {
      if (clock.id === updatedClock.id) {
        return updatedClock;
      }
      return clock;
    });
    setClocks(updatedClocks);
  };

  // This function is for clock delete
  const deleteClock = (id) => {
    const updatedClocks = clocks.filter((clock) => clock.id !== id);
    setClocks(updatedClocks);
  };

  return (
    <div>
      <LocalClock clock={localClock} updateClock={updateLocalClock} />
    </div>
  );
};

export default Home;
