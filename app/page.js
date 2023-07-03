"use client";
import React, { useState, useEffect } from "react";
// import { generate } from "shortid";
import LocalClock from "./components/local-clock/LocalClock";
// import ClockLists from "./components/clock-list";
import FolderLists from "./components/folder-event/FolderLists";
import { useStoreState } from "easy-peasy";

// const LOCAL_CLOCK_INIT = {
//   title: "My Clock",
//   timezone: "",
//   offset: 0,
//   date: null,
// };

const HomePage = () => {
  const localClock = useStoreState((state) => state.localClock);
  const clocks = useStoreState((state) => state.clocks);
  const folders = useStoreState((state) => state.folders);

  const updateLocalClock = useStoreActions(
    (actions) => actions.localClock.update
  );
  const createClock = useStoreActions((actions) => actions.createClock);
  const createFolder = useStoreActions((actions) => actions.createFolder);
  const updateClock = useStoreActions((actions) => actions.updateClock);
  const deleteClock = useStoreActions((actions) => actions.deleteClock);
  // const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });
  // const [clocks, setClocks] = useState([]);
  // const [folders, setFolders] = useState([]);

  // // Folder Displaying on screen although browser reloaded - start
  // useEffect(() => {
  //   const storedFolders = localStorage.getItem("folders");
  //   if (storedFolders) {
  //     setFolders(JSON.parse(storedFolders));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("folders", JSON.stringify(folders));
  // }, [folders]);
  // // Folder Displaying on screen although browser reloaded - end

  // // This function is for local clock update
  // function updateLocalClock(date) {
  //   setLocalClock({
  //     ...localClock,
  //     ...date,
  //   });
  // }

  // // This function is for create clock
  // const createClock = (clock) => {
  //   clock.id = generate();
  //   setClocks([...clocks, clock]);
  // };

  // // This function is for create folder
  // const createFolder = (folder) => {
  //   folder.id = generate();
  //   setFolders([...folders, folder]);
  // };

  // // This function is for created clock updates
  // const updateClock = (updatedClock) => {
  //   const updatedClocks = clocks.map((clock) => {
  //     if (clock.id === updatedClock.id) {
  //       return updatedClock;
  //     }
  //     return clock;
  //   });
  //   setClocks(updatedClocks);
  // };

  // // This function is for clock delete
  // const deleteClock = (id) => {
  //   const updatedClocks = clocks.filter((clock) => clock.id !== id);
  //   setClocks(updatedClocks);
  // };

  return (
    <>
      <div>
        <LocalClock
        // clock={localClock}
        // updateClock={updateLocalClock}
        // createClock={createClock}
        // deleteClock={deleteClock}
        // createFolder={createFolder}
        />
      </div>
      {/* <div>
        <ClockLists
          localClock={localClock.date}
          clocks={clocks}
          updateClock={updateClock}
          deleteClock={deleteClock}
        />
      </div> */}

      <div>
        <FolderLists />
      </div>
    </>
  );
};

export default HomePage;
