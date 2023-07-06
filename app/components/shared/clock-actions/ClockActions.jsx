import React, { useEffect, useState, useRef } from "react";
import { useStoreActions } from "easy-peasy";
import ClockForm from "../clock-form/ClockForm";
import FolderForm from "../folder-form/FolderForm";

const ClockActions = ({ local = false, folderButtons = false }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isCreateClock, setIsCreateClock] = useState(false);
  const [isClearAll, setIsClearAll] = useState(false);
  console.log(isCreateClock);

  const updateClock = useStoreActions(
    (actions) => actions.clockModel.updateClock
  );

  const deleteClock = useStoreActions(
    (actions) => actions.clockModel.deleteClock
  );

  const editButtonRef = useRef(null);
  const createButtonRef = useRef(null);
  const formRef = useRef(null);

  const openEditForm = () => {
    setIsEdit(!isEdit);
    setIsCreate(false);
  };

  const openCreateForm = () => {
    setIsEdit(false);
    setIsCreate(!isCreate);
  };

  const openCreateClock = () => {
    setIsCreateClock(!isCreateClock);
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
      {/* <button onClick={openEditForm} ref={editButtonRef}>
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
        <button onClick={() => deleteClock()}>Delete Folder</button>
      )} */}

      {folderButtons === true ? (
        <div>
          <button style={{ marginRight: "0.5rem" }}>Clear All Clocks</button>
          <button onClick={openCreateClock}>Create New Clock</button>
        </div>
      ) : (
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
            <button onClick={() => deleteClock()}>Delete Folder</button>
          )}
        </div>
      )}

      {(isEdit || isCreate) && (
        <div ref={formRef}>
          {isEdit && (
            <>
              <h3>Edit Clock Form</h3>
              <ClockForm
                // values={clock}
                edit={true}
                title={!local}
              />
            </>
          )}

          {isCreate && (
            <>
              <h3>Create New Folder</h3>
              <FolderForm />
            </>
          )}
        </div>
      )}

      {isCreateClock && <ClockForm />}
    </div>
  );
};

export default ClockActions;
