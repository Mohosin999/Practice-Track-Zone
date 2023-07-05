"use client";
import React from "react";
import LocalClock from "./components/local-clock/LocalClock";
import FolderLists from "./components/folder-event/FolderLists";

const HomePage = () => {
  return (
    <>
      <div>
        <LocalClock />
      </div>

      <div>
        <FolderLists />
      </div>
    </>
  );
};

export default HomePage;
