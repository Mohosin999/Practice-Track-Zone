import React, { useState, useEffect, useRef } from "react";
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

  const inputRef = useRef(null);

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
      router.push("/folder-page");
    } else {
      alert("Authentication failed!");
    }
  };

  // const handleClickOutside = () => {
  //   if (selectedFolder) {
  //     setSelectedFolder(null);
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSelectedFolder(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();

      const formElements = Array.from(
        document.querySelectorAll("input, button")
      );

      const currentElement = document.activeElement;
      const currentIndex = formElements.indexOf(currentElement);

      let nextIndex;

      if (e.key === "ArrowLeft") {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = formElements.length - 1;
        }
      } else if (e.key === "ArrowRight") {
        nextIndex = currentIndex + 1;
        if (nextIndex >= formElements.length) {
          nextIndex = 0;
        }
      }

      const nextElement = formElements[nextIndex];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  // const handleClick = () => {
  //   setIsClicked(true);
  //   setTimeout(() => {
  //     setIsClicked(false);
  //   }, 20);
  // };

  return (
    <div>
      {selectedFolder ? (
        <div onKeyDown={handleKeyDown} ref={inputRef}>
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
