import React from "react";
import FolderDisplay from "../shared/folder-display/FolderDisplay";

const FolderLists = ({ folders }) => {
  return (
    <div>
      <h3>All Folder Lists</h3>
      <hr />

      {folders.length === 0 ? (
        <p>There is no folder, please create one</p>
      ) : (
        <div>
          {folders.map((folder) => (
            <FolderDisplay key={folder.id} folderName={folder.folderName} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderLists;
