"use client";
import React from "react";

const FolderPage = ({ folder }) => {
  return (
    <div>
      <h1>Title: akash mia</h1>
      <h2>{folder.name}</h2>
      {/* Render the contents of the folder */}
    </div>
  );
};

export default FolderPage;
