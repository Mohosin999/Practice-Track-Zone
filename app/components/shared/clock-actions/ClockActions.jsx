import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ClockForm from "../clock-form/ClockForm";

const ClockActions = ({
  local = false,
  clock,
  updateClock,
  createClock,
  deleteClock,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    console.log("edit button --> ", isEdit);
    console.log(isCreate);
  }, [isEdit, isCreate]);

  const handleClock = (values) => {
    createClock(values);
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
    let handler = () => {
      setIsEdit(false);
      setIsCreate(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div>
      <button onClick={openEditForm}>Edit Clock</button>
      {local ? (
        <button style={{ marginLeft: "0.5rem" }} onClick={openCreateForm}>
          Create Folder
        </button>
      ) : (
        <button onClick={() => deleteClock(clock.id)}>Delete Folder</button>
      )}

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

      {isCreate && (
        <>
          <h3>Create New Folder</h3>
          <ClockForm handleClock={handleClock} />
        </>
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
