import React, { useEffect } from "react";
import FolderDisplay from "../shared/folder-display/FolderDisplay";
import { useStoreActions, useStoreState } from "easy-peasy";

const FolderLists = ({ clocks, updateClock, deleteClock, localClock }) => {
  const folders = useStoreState((state) => state.clockModel.folders);
  const setFolders = useStoreActions(
    (actions) => actions.clockModel.setFolders
  );

  // Get created folder from local storage
  useEffect(() => {
    const storedFolders = localStorage.getItem("folders");
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
  }, [setFolders]);

  return (
    <div>
      <h3>All Folder Lists</h3>
      <hr />

      {folders.length === 0 ? (
        <p>There is no folder, please create one</p>
      ) : (
        <div>
          {folders.map((folder) => (
            <FolderDisplay
              key={folder.id}
              id={folder.id}
              folderName={folder.folderName}
              clocks={clocks}
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

export default FolderLists;
