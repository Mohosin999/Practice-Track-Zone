import React, { useState } from "react";
import { styled } from "styled-components";

const FolderHeading = styled.h2`
  background-color: #efefef;
  cursor: pointer;
`;

const FolderDisplay = ({ folderName }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFolderClick = () => {
    setSelectedFolder(folderName);
  };

  const handleAuthenticate = () => {
    const storedFolders = JSON.parse(localStorage.getItem("folders"));
    const selectedFolderData = storedFolders.find(
      (folder) => folder.folderName === folderName
    );

    if (selectedFolderData && password === selectedFolderData.password) {
      setIsAuthenticated(true);
      // Perform any actions you want when authentication is successful
      alert("Authentication successful!");
      // setPassword("");
    } else {
      setIsAuthenticated(false);
      // Perform any actions you want when authentication fails
      alert("Authentication failed!");
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 20);
  };

  return (
    <div>
      {selectedFolder ? (
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleAuthenticate}>Enter Password</button>
        </div>
      ) : (
        <div>
          <FolderHeading
            isClicked={isClicked}
            onClick={() => {
              handleFolderClick();
              handleClick();
            }}
          >
            {folderName}
          </FolderHeading>
        </div>
      )}
    </div>
  );
};

export default FolderDisplay;
