import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClockActions from "./ClockActions";

describe("ClockActions", () => {
  const clock = {
    title: "Test Clock",
    timezone: "GMT",
    offset: -690,
  };

  const updateClock = jest.fn();

  it("should renders correctly when local is false", () => {
    render(
      <ClockActions local={false} clock={clock} updateClock={updateClock} />
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should renders correctly when local is true", () => {
    render(
      <ClockActions local={true} clock={clock} updateClock={updateClock} />
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("should toggles edit mode on button click", () => {
    render(<ClockActions clock={clock} updateClock={updateClock} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const labelText = screen.getByLabelText("Title");
    const timezoneText = screen.getByLabelText("Timezone");
    const offsetText = screen.getByLabelText("Offset");

    expect(labelText).toBeInTheDocument();
    expect(timezoneText).toBeInTheDocument();
    expect(offsetText).toBeInTheDocument();
  });

  it("should update clock title on input change", () => {
    render(<ClockActions clock={clock} updateClock={updateClock} />);

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Update Clock" } });

    expect(updateClock).toHaveBeenCalledWith({ title: "Update Clock" });
  });

  it("should updates clock timezone on select change", () => {
    render(<ClockActions clock={clock} updateClock={updateClock} />);

    const timezoneSelect = screen.getByLabelText("Timezone");
    fireEvent.change(timezoneSelect, { target: { value: "UTC" } });

    expect(updateClock).toHaveBeenCalledWith({
      timezone: "UTC",
    });
  });

  it("should updates clock offset on select change", () => {
    render(<ClockActions clock={clock} updateClock={updateClock} />);

    const offsetSelect = screen.getByLabelText("Offset");
    fireEvent.change(offsetSelect, { target: { value: -11.5 } });

    expect(updateClock).toHaveBeenCalledWith({
      offset: -690, // -11.5 * 60 = -690
    });
  });
});
