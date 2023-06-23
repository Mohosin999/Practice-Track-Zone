import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClockActions from "./ClockActions";
import ClockForm from "../clock-form/ClockForm";

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

  it("should toggles edit mode on button click", () => {
    render(
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const editButton = screen.getByText("Edit Clock");
    fireEvent.click(editButton);

    const labelText = screen.getByLabelText("Title");
    const timezoneText = screen.getByLabelText("Timezone");
    const offsetText = screen.getByLabelText("Offset");

    expect(labelText).toBeInTheDocument();
    expect(timezoneText).toBeInTheDocument();
    expect(offsetText).toBeInTheDocument();
  });

  it("should update clock title on input change", () => {
    render(
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Update Clock" } });

    expect(updateClock).toHaveBeenCalledWith({ title: "Update Clock" });
  });

  it("should updates clock timezone on select change", () => {
    render(
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const timezoneSelect = screen.getByLabelText("Timezone");
    fireEvent.change(timezoneSelect, { target: { value: "UTC" } });

    expect(updateClock).toHaveBeenCalledWith({
      timezone: "UTC",
    });
  });

  it("should updates clock offset on select change", () => {
    render(
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        deleteClock={deleteClock}
      />
    );

    const offsetSelect = screen.getByLabelText("Offset");
    fireEvent.change(offsetSelect, { target: { value: -11.5 } });

    expect(updateClock).toHaveBeenCalledWith({
      offset: -690, // -11.5 * 60 = -690
    });
  });
});
