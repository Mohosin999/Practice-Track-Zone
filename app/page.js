"use client";
import React from "react";
import useClock from "./hooks/use-clock/useClock";

const Home = () => {
  const { date, dateUtc, offset, timezone } = useClock();

  return (
    <div>
      <h2>Root Page</h2>
    </div>
  );
};

export default Home;
