import React, { useState, useEffect } from "react";
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

  // This function handled open edit form only
  const openEditForm = () => {
    setIsEdit(!isEdit);
    setIsCreate(false);
  };

  // This function handled open create form only
  const openCreateForm = () => {
    setIsEdit(false);
    setIsCreate(!isCreate);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isEdit || isCreate) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setIsEdit(false);
          setIsCreate(true);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setIsEdit(true);
          setIsCreate(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEdit, isCreate]);

  return (
    <div>
      {/* Edit, Create or Delete Buttons */}
      <button onClick={openEditForm}>Edit Clock</button>
      {local ? (
        <button style={{ marginLeft: "0.5rem" }} onClick={openCreateForm}>
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
