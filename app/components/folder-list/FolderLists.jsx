import React, { useEffect, useState } from "react";
import FolderDisplay from "../shared/folder-display/FolderDisplay";
import { useStoreActions, useStoreState } from "easy-peasy";

const FolderLists = ({ clocks, updateClock, deleteClock, localClock }) => {
  const folders = useStoreState((state) => state.clockModel.folders);
  const setFolders = useStoreActions(
    (actions) => actions.clockModel.setFolders
  );

  const itemsPerPage = 10; // Number of folders to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedFolders, setDisplayedFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedFolders = localStorage.getItem("folders");
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
  }, [setFolders]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter folders based on the search term
    const filteredFolders = folders.filter((folder) =>
      folder.folderName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setDisplayedFolders(filteredFolders.slice(startIndex, endIndex));
  }, [folders, currentPage, searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(displayedFolders.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <h3>All Folder Lists</h3>
      <div>
        <input
          type="text"
          placeholder="Search by folder name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <hr />

      {folders.length === 0 ? (
        <p>There is no folder, please create one</p>
      ) : (
        <div>
          {displayedFolders.map((folder) => (
            <FolderDisplay
              key={folder.id}
              id={folder.id}
              folderName={folder.folderName}
            />
          ))}
          <div>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderLists;

// import React, { useEffect, useState } from "react";
// import FolderDisplay from "../shared/folder-display/FolderDisplay";
// import { useStoreActions, useStoreState } from "easy-peasy";

// const FolderLists = () => {
//   const folders = useStoreState((state) => state.clockModel.folders);
//   const setFolders = useStoreActions(
//     (actions) => actions.clockModel.setFolders
//   );

//   const itemsPerPage = 10; // Number of folders to show per page
//   const [currentPage, setCurrentPage] = useState(1);
//   const [displayedFolders, setDisplayedFolders] = useState([]);

//   useEffect(() => {
//     const storedFolders = localStorage.getItem("folders");
//     if (storedFolders) {
//       setFolders(JSON.parse(storedFolders));
//     }
//   }, [setFolders]);

//   useEffect(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     setDisplayedFolders(folders.slice(startIndex, endIndex));
//   }, [folders, currentPage]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalPages = Math.ceil(folders.length / itemsPerPage);
//   const pageNumbers = Array.from(
//     { length: totalPages },
//     (_, index) => index + 1
//   );

//   return (
//     <div>
//       <h3>All Folder Lists</h3>
//       <hr />

//       {folders.length === 0 ? (
//         <p>There is no folder, please create one</p>
//       ) : (
//         <div>
//           {displayedFolders.map((folder) => (
//             <FolderDisplay
//               key={folder.id}
//               id={folder.id}
//               folderName={folder.folderName}
//             />
//           ))}
//           <div>
//             {pageNumbers.map((pageNumber) => (
//               <button
//                 key={pageNumber}
//                 onClick={() => handlePageChange(pageNumber)}
//                 disabled={currentPage === pageNumber}
//               >
//                 {pageNumber}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FolderLists;

// import React, { useEffect } from "react";
// import FolderDisplay from "../shared/folder-display/FolderDisplay";
// import { useStoreActions, useStoreState } from "easy-peasy";

// const FolderLists = ({ clocks, updateClock, deleteClock, localClock }) => {
//   const folders = useStoreState((state) => state.clockModel.folders);
//   const setFolders = useStoreActions(
//     (actions) => actions.clockModel.setFolders
//   );

//   // Get created folder from local storage
//   useEffect(() => {
//     const storedFolders = localStorage.getItem("folders");
//     if (storedFolders) {
//       setFolders(JSON.parse(storedFolders));
//     }
//   }, [setFolders]);

//   return (
//     <div>
//       <h3>All Folder Lists</h3>
//       <hr />

//       {folders.length === 0 ? (
//         <p>There is no folder, please create one</p>
//       ) : (
//         <div>
//           {folders.map((folder) => (
//             <FolderDisplay
//               key={folder.id}
//               id={folder.id}
//               folderName={folder.folderName}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FolderLists;
