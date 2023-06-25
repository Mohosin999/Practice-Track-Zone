import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import ClockForm from "../clock-form/ClockForm";
import FolderForm from "../folder-form/FolderForm";

const ClockActions = ({
  local = false,
  clock,
  updateClock,
  createClock,
  deleteClock,
  createFolder,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const editButtonRef = useRef(null);
  const createButtonRef = useRef(null);
  const formRef = useRef(null);

  // const handleClock = (values) => {
  //   createClock(values);
  // };

  const handleCreatedFolder = (values) => {
    createFolder(values);
  };

  const openEditForm = () => {
    setIsEdit(!isEdit);
    setIsCreate(false);
  };

  const openCreateForm = () => {
    setIsEdit(false);
    setIsCreate(!isCreate);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        editButtonRef.current &&
        !editButtonRef.current.contains(event.target) &&
        createButtonRef.current &&
        !createButtonRef.current.contains(event.target)
      ) {
        setIsEdit(false);
        setIsCreate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button onClick={openEditForm} ref={editButtonRef}>
        Edit Clock
      </button>
      {local ? (
        <button
          style={{ marginLeft: "0.5rem" }}
          onClick={openCreateForm}
          ref={createButtonRef}
        >
          Create Folder
        </button>
      ) : (
        <button onClick={() => deleteClock(clock.id)}>Delete Folder</button>
      )}

      {(isEdit || isCreate) && (
        <div ref={formRef}>
          {isEdit && (
            <>
              <h3>Edit Clock Form</h3>
              <ClockForm
                values={clock}
                handleClock={updateClock}
                edit={true}
                title={!local}
              />
            </>
          )}

          {/* {isCreate && (
            <>
              <h3>Create New Folder</h3>
              <ClockForm handleClock={handleClock} />
            </>
          )} */}

          {isCreate && (
            <>
              <h3>Create New Folder</h3>
              <FolderForm handleCreatedFolder={handleCreatedFolder} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

ClockActions.propTypes = {
  local: PropTypes.bool,
  clock: PropTypes.shape({
    title: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
  }).isRequired,
  updateClock: PropTypes.func.isRequired,
};

export default ClockActions;
