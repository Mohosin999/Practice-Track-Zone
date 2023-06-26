import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { styled } from "styled-components";

// const FolderHeading = styled.h2`
//   background-color: #efefef;
//   cursor: pointer;
// `;

const FolderDisplay = ({ folderName }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [password, setPassword] = useState("");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("selected folder ->> ", selectedFolder);

  const router = useRouter();

  const handleFolderClick = () => {
    setSelectedFolder(folderName);
  };

  const handleAuthenticate = () => {
    const storedFolders = JSON.parse(localStorage.getItem("folders"));
    const selectedFolderData = storedFolders.find(
      (folder) => folder.folderName === folderName
    );

    if (selectedFolderData && password === selectedFolderData.password) {
      // setIsAuthenticated(true);
      // Perform any actions you want when authentication is successful
      // alert("Authentication successful!");
      router.push("/folder-page");
      // setPassword("");
    } else {
      // setIsAuthenticated(false);
      // Perform any actions you want when authentication fails
      alert("Authentication failed!");
    }
  };

  const handleClickOutside = () => {
    // Close the folder when clicked outside
    if (selectedFolder) {
      setSelectedFolder(null);
    }
  };

  // const handleClick = () => {
  //   setIsClicked(true);
  //   setTimeout(() => {
  //     setIsClicked(false);
  //   }, 20);
  // };

  return (
    <div onClick={handleClickOutside}>
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
          <div isClicked={isClicked} onClick={handleFolderClick}>
            {folderName}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderDisplay;
