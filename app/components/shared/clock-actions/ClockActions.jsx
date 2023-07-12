import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useStoreActions, useStoreState } from "easy-peasy";
import ClockForm from "../clock-form/ClockForm";
import FolderForm from "../folder-form/FolderForm";

const ClockActions = ({
  clock,
  updateClock,
  local = false,
  folderButtons = false,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  /** ===================================================
   *     All state and actions from easy-peasy - start
   ===================================================== */
  const clocks = useStoreState((state) => state.clockModel.clocks);

  const createClock = useStoreActions(
    (actions) => actions.clockModel.createClock
  );

  // const updateClock = useStoreActions(
  //   (actions) => actions.clockModel.updateClock
  // );

  const deleteClock = useStoreActions(
    (actions) => actions.clockModel.deleteClock
  );

  const clearAllClocks = useStoreActions(
    (actions) => actions.clockModel.clearAllClocks
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
  };

  const openCreateForm = () => {
    setIsEdit(false);
    setIsCreate(!isCreate);
  };

  const openCreateClock = () => {
    setShowForm(!showForm);
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
            <button onClick={clearAllClocks} style={{ marginRight: "0.5rem" }}>
              Clear All Clocks
            </button>
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
            <button
              onClick={() => deleteClock(clock.id)}
              style={{ marginLeft: "0.5rem" }}
            >
              Delete
            </button>
          )}

          {/* Add your event button */}
          {local ? null : (
            <button
              onClick={() => router.push(`/event-page/${clock.id}`)}
              style={{ marginLeft: "0.5rem" }}
            >
              Add Event
            </button>
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
                // local={true}
                handleClock={updateClock}
                values={clock}
              />
            </>
          )}

          {isCreate && (
            <>
              <h3>Create New Folder</h3>
              <FolderForm />
              {/* <FolderForm local={false} /> */}
            </>
          )}
        </div>
      )}

      {/* If isCreateClock is true, then show the form of clock */}
      {showForm && <ClockForm handleClock={createClock} />}
    </div>
  );
};

export default ClockActions;
