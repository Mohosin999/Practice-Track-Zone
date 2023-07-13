import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const FolderDisplay = ({ folderName, id, deleteFolder }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folderName);
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);

  const router = useRouter();

  const handleFolderClick = () => {
    setIsClicked(!isClicked);
  };

  const handleAuthenticate = () => {
    const storedFolders = JSON.parse(localStorage.getItem("folders"));
    const selectedFolderData = storedFolders.find((folder) => folder.id === id);

    if (selectedFolderData && password === selectedFolderData.password) {
      router.push(`/folder-page/${id}`);
    } else {
      alert("Authentication failed!");
    }
  };

  const handleEditFolderName = () => {
    if (newFolderName.trim() !== "") {
      const storedFolders = JSON.parse(localStorage.getItem("folders"));
      const updatedFolders = storedFolders.map((folder) => {
        if (folder.id === id) {
          folder.folderName = newFolderName;
          if (password.trim() !== "") {
            folder.password = password;
          }
        }
        return folder;
      });
      localStorage.setItem("folders", JSON.stringify(updatedFolders));
      setIsEditing(false);
    }
  };

  const handleDeleteFolder = () => {
    const storedFolders = JSON.parse(localStorage.getItem("folders"));
    const updatedFolders = storedFolders.filter((folder) => folder.id !== id);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    deleteFolder(id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEditing(false);
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

  useEffect(() => {
    setNewFolderName(folderName);
  }, [folderName]);

  return (
    <div>
      {isEditing ? (
        <div onKeyDown={handleKeyDown} ref={inputRef}>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button onClick={handleEditFolderName}>Save</button>
        </div>
      ) : (
        <div>
          <div onClick={handleFolderClick}>{newFolderName}</div>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDeleteFolder}>Delete</button>
          </div>
        </div>
      )}
      {isClicked && (
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleAuthenticate}>Enter Password</button>
        </div>
      )}
    </div>
  );
};

export default FolderDisplay;

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";

// const FolderDisplay = ({ folderName, id }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [password, setPassword] = useState("");

//   const inputRef = useRef(null);

//   const router = useRouter();

//   const handleFolderClick = () => {
//     setSelectedFolder(folderName);
//   };

//   const handleAuthenticate = () => {
//     const storedFolders = JSON.parse(localStorage.getItem("folders"));
//     const selectedFolderData = storedFolders.find(
//       (folder) => folder.folderName === folderName
//     );

//     if (selectedFolderData && password === selectedFolderData.password) {
//       router.push(`/folder-page/${id}`);
//     } else {
//       alert("Authentication failed!");
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (inputRef.current && !inputRef.current.contains(event.target)) {
//         setSelectedFolder(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleKeyDown = (e) => {
//     if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
//       e.preventDefault();

//       const formElements = Array.from(
//         document.querySelectorAll("input, button")
//       );

//       const currentElement = document.activeElement;
//       const currentIndex = formElements.indexOf(currentElement);

//       let nextIndex;

//       if (e.key === "ArrowLeft") {
//         nextIndex = currentIndex - 1;
//         if (nextIndex < 0) {
//           nextIndex = formElements.length - 1;
//         }
//       } else if (e.key === "ArrowRight") {
//         nextIndex = currentIndex + 1;
//         if (nextIndex >= formElements.length) {
//           nextIndex = 0;
//         }
//       }

//       const nextElement = formElements[nextIndex];
//       if (nextElement) {
//         nextElement.focus();
//       }
//     }
//   };

//   return (
//     <div>
//       {selectedFolder ? (
//         <div onKeyDown={handleKeyDown} ref={inputRef}>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleAuthenticate}>Enter Password</button>
//         </div>
//       ) : (
//         <div>
//           <div isClicked={isClicked} onClick={handleFolderClick}>
//             {folderName}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FolderDisplay;
