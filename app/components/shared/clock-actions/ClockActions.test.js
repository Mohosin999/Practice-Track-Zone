import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClockActions from "./ClockActions";

jest.mock("../clock-form/ClockForm", () => {
  return jest.fn(({ type, id, name, value, handleClock, disabled }) => (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={(e) => handleClock(e.target.value)}
      disabled={disabled}
    />
  ));
});

describe("ClockActions", () => {
  const clock = {
    title: "Test Clock",
    timezone: "GMT",
    offset: -690,
  };

  const updateClock = jest.fn();
  const createClock = jest.fn();
  const deleteClock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when local is false", () => {
    render(
      <ClockActions
        local={false}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    expect(screen.getByText("Edit Clock")).toBeInTheDocument();
    expect(screen.getByText("Delete Folder")).toBeInTheDocument();
  });

  it("should render correctly when local is true", () => {
    render(
      <ClockActions
        local={true}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    expect(screen.getByText("Edit Clock")).toBeInTheDocument();
    expect(screen.getByText("Create Folder")).toBeInTheDocument();
  });

  it("should toggle clock form when clicked edit clock button", () => {
    render(
      <ClockActions
        local={false}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const editClockButton = screen.getByText("Edit Clock");
    fireEvent.click(editClockButton);

    expect(screen.getByText("Edit Clock Form")).toBeInTheDocument();
  });

  it("should update clock title on input change", () => {
    render(
      <ClockActions
        local={false}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const editClockButton = screen.getByText("Edit Clock");
    fireEvent.click(editClockButton);

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "New Clock Title" } });

    expect(updateClock).toHaveBeenCalledWith({
      title: "New Clock Title",
      timezone: "GMT",
      offset: -690,
    });
  });

  it("should update clock timezone on select change", () => {
    render(
      <ClockActions
        local={false}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const editClockButton = screen.getByText("Edit Clock");
    fireEvent.click(editClockButton);

    const timezoneSelect = screen.getByLabelText("Timezone");
    fireEvent.change(timezoneSelect, { target: { value: "PST" } });

    expect(updateClock).toHaveBeenCalledWith({
      title: "Test Clock",
      timezone: "PST",
      offset: -690,
    });
  });
});

// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import ClockActions from "./ClockActions";

// jest.mock("../clock-form/ClockForm", () => {
//   return jest.fn(({ type, id, name, value, handleClock, disabled }) => (
//     <input
//       type={type}
//       id={id}
//       name={name}
//       value={value}
//       handleClock={handleClock}
//       disabled={disabled}
//     />
//   ));
// });

// describe("ClockActions", () => {
//   const clock = {
//     title: "Test Clock",
//     timezone: "GMT",
//     offset: -690,
//   };

//   const updateClock = jest.fn();
//   const createClock = jest.fn();
//   const deleteClock = jest.fn();

//   it("should renders correctly when local is false", () => {
//     render(
//       <ClockActions
//         local={false}
//         clock={clock}
//         updateClock={updateClock}
//         createClock={createClock}
//         deleteClock={deleteClock}
//       />
//     );

//     expect(screen.getByText("Edit Clock")).toBeInTheDocument();
//     expect(screen.getByText("Delete Folder")).toBeInTheDocument();
//   });

//   it("should renders correctly when local is true", () => {
//     render(
//       <ClockActions
//         local={true}
//         clock={clock}
//         updateClock={updateClock}
//         createClock={createClock}
//         deleteClock={deleteClock}
//       />
//     );

//     expect(screen.getByText("Edit Clock")).toBeInTheDocument();
//     expect(screen.getByText("Create Folder")).toBeInTheDocument();
//   });

//   it("should toggles clock form when clicked edit clock button", () => {});

//   it("should update clock title on input change", () => {});

//   it("should updates clock timezone on select change", () => {});
// });
