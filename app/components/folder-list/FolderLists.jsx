import React, { useEffect, useState } from "react";
import FolderDisplay from "../shared/folder-display/FolderDisplay";
import { useStoreActions, useStoreState } from "easy-peasy";

const FolderLists = ({ clocks, updateClock, deleteClock, localClock }) => {
  const folders = useStoreState((state) => state.clockModel.folders);
  const setFolders = useStoreActions(
    (actions) => actions.clockModel.setFolders
  );

  const itemsPerPage = 3; // Number of folders to show per page
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

  const totalPages = Math.ceil(
    folders.filter((folder) =>
      folder.folderName.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / itemsPerPage
  );
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderLists;
