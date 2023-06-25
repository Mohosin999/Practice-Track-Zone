import React, { useState } from "react";

const FolderForm = () => {
  const [folderName, setFolderName] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateFolder = (e) => {
    e.preventDefault();

    // Store folder name and password in local storage
    localStorage.setItem(folderName, password);

    // Clear form inputs
    setFolderName("");
    setPassword("");
  };

  return (
    <form onSubmit={handleCreateFolder}>
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Create Folder</button>
    </form>
  );
};

export default FolderForm;
