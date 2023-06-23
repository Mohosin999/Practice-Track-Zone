import React, { useEffect, useState } from "react";
import { getOffset } from "@/app/utils/timezone";
import { TIMEZONE_OFFSET } from "@/app/constants/timezone";

const ClockForm = ({
  values = { title: "", timezone: "UTC", offset: 0 },
  handleClock,
  title = true,
  edit = false,
  ref,
}) => {
  const [formValues, setFormValues] = useState({ ...values });

  // useEffect to set offset according to timezone
  useEffect(() => {
    if (TIMEZONE_OFFSET[formValues.timezone]) {
      setFormValues((prev) => ({
        ...prev,
        offset: TIMEZONE_OFFSET[formValues.timezone],
      }));
    }
  }, [formValues.timezone]);

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

  // This function is used to control the form by pressing the keyboard
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();

      const formElements = Array.from(
        document.querySelectorAll(
          ".clock-form input, .clock-form select, .clock-form button"
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

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClock(formValues); // state lifting
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="clock-form"
      // ref={ref}
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
          // ref={ref}
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
