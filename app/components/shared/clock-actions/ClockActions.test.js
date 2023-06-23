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
      handleClock={handleClock}
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

  it("should renders correctly when local is false", () => {
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

  it("should renders correctly when local is true", () => {
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

  it("should toggles clock form when clicked edit clock button", () => {});

  it("should update clock title on input change", () => {});

  it("should updates clock timezone on select change", () => {});
});
