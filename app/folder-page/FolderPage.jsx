import React from "react";

const FolderPage = ({ folder }) => {
  return (
    <div>
      <h2>{folder.name}</h2>
      {/* Render the contents of the folder */}
    </div>
  );
};

export default FolderPage;
