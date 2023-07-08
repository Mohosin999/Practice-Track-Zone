import React, { useEffect, useState, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import ClockForm from "../clock-form/ClockForm";
import FolderForm from "../folder-form/FolderForm";

const ClockActions = ({
  updateClock,
  deleteClock,
  clock,
  local = false,
  folderButtons = false,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isCreateClock, setIsCreateClock] = useState(false);
  const [isClearAll, setIsClearAll] = useState();

  /** ===================================================
   *     All state and actions from easy-peasy - start
   ===================================================== */
  const clocks = useStoreState((state) => state.clockModel.clocks);

  const createClock = useStoreActions(
    (actions) => actions.clockModel.createClock
  );
  /** ===================================================
   *     All state and actions from easy-peasy - end
   ===================================================== */

  const editButtonRef = useRef(null);
  const createButtonRef = useRef(null);
  const formRef = useRef(null);

  const openEditForm = () => {
    setIsEdit(!isEdit);
    setIsCreate(false);
    // updateClock(clock);
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
      {/* ===================================================
                  Buttons showing logic here - start 
       ==================================================== */}
      {folderButtons === true ? (
        <div>
          {clocks.length > 0 ? (
            <button style={{ marginRight: "0.5rem" }}>Clear All Clocks</button>
          ) : null}
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
            <button onClick={() => deleteClock(clock.id)}>Delete Folder</button>
          )}
        </div>
      )}
      {/* ===================================================
                  Buttons showing logic here - end 
       ==================================================== */}

      {(isEdit || isCreate) && (
        <div ref={formRef}>
          {isEdit && (
            <>
              <h3>Edit Clock Form</h3>
              <ClockForm
                edit={true}
                title={!local}
                handleClock={updateClock}
                values={clock}
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

      {/* If isCreateClock is true, then show the form of clock */}
      {isCreateClock && <ClockForm handleClock={createClock} />}
    </div>
  );
};

export default ClockActions;
