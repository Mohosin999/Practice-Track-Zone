import React, { useState } from "react";
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

  // handle change function
  const handleClock = (values) => {
    createClock(values);
  };

  return (
    <div>
      {/* Edit, Create or Delete Buttons */}
      <button onClick={() => setIsEdit(!isEdit)}>Edit Clock</button>
      {local ? (
        <button
          style={{ marginLeft: "0.5rem" }}
          onClick={() => setIsCreate(!isCreate)}
        >
          Create Folder
        </button>
      ) : (
        <button onClick={() => deleteClock(clock.id)}>Delete Folder</button>
      )}

      {/* Form display logic */}
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
