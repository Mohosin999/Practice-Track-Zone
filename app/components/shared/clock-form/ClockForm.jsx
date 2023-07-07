import React, { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";
import { getOffset } from "@/app/utils/timezone";
import { TIMEZONE_OFFSET } from "@/app/constants/timezone";

const ClockForm = ({
  values = { title: "", timezone: "UTC", offset: 0 },
  title = true,
  edit = false,
  local,
  ref,
}) => {
  const [formValues, setFormValues] = useState({ ...values });

  /** ===================================================
   *     All state and actions from easy-peasy - start
   ===================================================== */
  const updateLocalClock = useStoreActions(
    (actions) => actions.clockModel.updateLocalClock
  );

  const createClock = useStoreActions(
    (actions) => actions.clockModel.createClock
  );

  // const updateClock = useStoreActions(
  //   (actions) => actions.clockModel.updateClock
  // );

  // const deleteClock = useStoreActions(
  //   (actions) => actions.clockModel.deleteClock
  // );
  /** ===================================================
    *     All state and actions from easy-peasy - end
    ===================================================== */

  // useEffect to set offset according to timezone
  useEffect(() => {
    if (TIMEZONE_OFFSET[formValues.timezone]) {
      setFormValues((prev) => ({
        ...prev,
        offset: TIMEZONE_OFFSET[formValues.timezone],
      }));
    }
  }, [formValues.timezone]);

  /** ===================================================
   *           All handler functions - start
   ===================================================== */
  // handleChange function
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "offset") {
      value = Number(value) * 60;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    // {local === true ? updateLocalClock(formValues) : createClock(formValues)}

    // updateLocalClock(formValues);
    createClock(formValues);
  };

  // This function is used to control the form by pressing the keyboard
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();

      const formElements = Array.from(
        document.querySelectorAll(
          ".clock-form input:not([disabled]), .clock-form select:not([disabled]), .clock-form button:not([disabled])"
        )
      );

      const currentElement = document.activeElement;
      const currentIndex = formElements.indexOf(currentElement);

      let nextIndex;

      if (e.key === "ArrowUp") {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = formElements.length - 1;
        }
      } else if (e.key === "ArrowDown") {
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

  /** ===================================================
   *           All handler functions - end
   ===================================================== */

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="clock-form"
    >
      <div>
        <label htmlFor="title">Enter Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          disabled={!title}
        />
      </div>

      {/* Timezones */}
      <div>
        <label htmlFor="timezone">Enter Timezone</label>
        <select
          id="timezone"
          name="timezone"
          value={formValues.timezone}
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

      {/* Offsets */}
      {(formValues.timezone === "GMT" || formValues.timezone === "UTC") && (
        <div>
          <label htmlFor="offset">Enter Offset</label>
          <select
            id="offset"
            name="offset"
            value={formValues.offset / 60}
            onChange={handleChange}
          >
            {getOffset().map((offset) => (
              <option key={offset} value={offset}>
                {offset}
              </option>
            ))}
          </select>
        </div>
      )}
      <button>{edit ? "Update" : "Create"}</button>
    </form>
  );
};

export default ClockForm;
