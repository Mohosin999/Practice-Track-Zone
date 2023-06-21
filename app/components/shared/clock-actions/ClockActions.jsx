import React, { useState } from "react";
import PropTypes from "prop-types";

// offsets array
const defaultOffsets = [-11.5, -11, 0, 1, 5, 5.5, 6, 6.5];

const ClockActions = ({ local = false, clock, updateClock }) => {
  const [isEdit, setIsEdit] = useState(false);

  // handle change function
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "offset") {
      value = Number(value) * 60;
    }

    updateClock({
      [name]: value,
    });
  };

  return (
    <div>
      <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
      {local ? <button>Create</button> : <button>Delete</button>}
      {isEdit && (
        <>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={clock.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              name="timezone"
              value={clock.timezone}
              onChange={handleChange}
            >
              <option value="GMT">GMT</option>
              <option value="UTC">UTC</option>
              <option value="PST">PST</option>
              <option value="EST">EST</option>
              <option value="EDT">EDT</option>
              <option value="BST">BST</option>
              <option value="MST">MST</option>
            </select>
          </div>
          {(clock.timezone === "GMT" || clock.timezone === "UTC") && (
            <div>
              <label htmlFor="offset">Offset</label>
              <select
                id="offset"
                name="offset"
                value={clock.offset / 60}
                onChange={handleChange}
              >
                {defaultOffsets.map((offset) => (
                  <option key={offset} value={offset}>
                    {offset}
                  </option>
                ))}
              </select>
            </div>
          )}
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
