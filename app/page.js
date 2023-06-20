"use client";
import React, { useState } from "react";
import LocalClock from "./components/local-clock/LocalClock";

const LOCAL_CLOCK_INIT = {
  title: "My Clock",
  timezone: "",
  offset: 0,
  date: null,
};

const Home = () => {
  const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });

  const updateClock = (date) => {
    setLocalClock({
      ...localClock,
      ...date,
    });
  };

  return (
    <div>
      <LocalClock clock={localClock} updateClock={updateLocalClock} />
    </div>
  );
};

export default Home;
