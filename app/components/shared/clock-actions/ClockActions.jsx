import React, { useState, useEffect, useRef } from "react";
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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();

      const formElements = Array.from(
        document.querySelectorAll(".edit-button button, .create-button button")
      );

      const currentElement = document.activeElement;
      const currentIndex = formElements.indexOf(currentElement);

      let nextIndex;

      if (e.key === "ArrowLeft") {
        setIsEdit(true);
        setIsCreate(false);
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = formElements.length - 1;
        }
      } else if (e.key === "ArrowRight") {
        setIsEdit(false);
        setIsCreate(true);
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

  return (
    <div onKeyDown={handleKeyDown}>
      <button className="edit-button" onClick={openEditForm}>
        Edit Clock
      </button>
      {local ? (
        <button
          style={{ marginLeft: "0.5rem" }}
          className="create-button"
          onClick={openCreateForm}
        >
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

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import ClockForm from "../clock-form/ClockForm";

// const ClockActions = ({
//   local = false,
//   clock,
//   updateClock,
//   createClock,
//   deleteClock,
// }) => {
//   const [isEdit, setIsEdit] = useState(false);
//   const [isCreate, setIsCreate] = useState(false);

//   // handle change function
//   const handleClock = (values) => {
//     createClock(values);
//   };

//   // This function handled open edit form only
//   const openEditForm = () => {
//     setIsEdit(true);
//     setIsCreate(false);
//   };

//   // This function handled open create form only
//   const openCreateForm = () => {
//     setIsEdit(false);
//     setIsCreate(true);
//   };

//   return (
//     <div>
//       {/* Edit, Create or Delete Buttons */}
//       <button onClick={openEditForm}>Edit Clock</button>
//       {local ? (
//         <button style={{ marginLeft: "0.5rem" }} onClick={openCreateForm}>
//           Create Folder
//         </button>
//       ) : (
//         <button onClick={() => deleteClock(clock.id)}>Delete Folder</button>
//       )}

//       {/* Form display logic */}
//       {isEdit && (
//         <>
//           <h3>Edit Clock Form</h3>
//           <ClockForm
//             values={clock}
//             handleClock={updateClock}
//             edit={true}
//             title={!local}
//           />
//         </>
//       )}

//       {isCreate && (
//         <>
//           <h3>Create New Folder</h3>
//           <ClockForm handleClock={handleClock} />
//         </>
//       )}
//     </div>
//   );
// };

// ClockActions.propTypes = {
//   local: PropTypes.bool,
//   clock: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     timezone: PropTypes.string.isRequired,
//     offset: PropTypes.number.isRequired,
//   }).isRequired,
//   updateClock: PropTypes.func.isRequired,
// };

// export default ClockActions;
