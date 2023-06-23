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

  it("should toggle clock-form when clicked edit-clock button ", () => {
    render(
      <ClockActions
        local={false}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const editClockButton = screen.getByRole("button", { name: "Edit Clock" });
    fireEvent.click(editClockButton);

    expect(screen.getByText("Edit Clock Form")).toBeInTheDocument();
  });

  it("should toggle clock-form when clicked create-folder button and local is true", () => {
    render(
      <ClockActions
        local={true}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const createFolderButton = screen.getByRole("button", {
      name: "Create Folder",
    });
    fireEvent.click(createFolderButton);

    expect(screen.getByText("Create New Folder")).toBeInTheDocument();
  });

  it("should toggle clock-form when clicked create-folder button and local is false", () => {
    render(
      <ClockActions
        local={false}
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const createFolderButton = screen.getByRole("button", {
      name: "Delete Folder",
    });
    fireEvent.click(createFolderButton);
  });
});
