import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClockForm from "./ClockForm";

describe("ClockForm", () => {
  const handleClock = jest.fn();

  beforeEach(() => {
    render(<ClockForm handleClock={handleClock} />);
  });

  test("renders the form with input fields and a submit button", () => {
    const titleInput = screen.getByLabelText("Enter Title");
    const timezoneSelect = screen.getByLabelText("Enter Timezone");
    const submitButton = screen.getByRole("button", { name: "Create" });

    expect(titleInput).toBeInTheDocument();
    expect(timezoneSelect).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("updates the form values when input fields are changed", () => {
    const titleInput = screen.getByLabelText("Enter Title");
    const timezoneSelect = screen.getByLabelText("Enter Timezone");

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(timezoneSelect, { target: { value: "PST" } });

    expect(titleInput.value).toBe("New Title");
    expect(timezoneSelect.value).toBe("PST");
  });

  test("calls handleClock with the correct form values when submitted", () => {
    const titleInput = screen.getByLabelText("Enter Title");
    const timezoneSelect = screen.getByLabelText("Enter Timezone");
    const submitButton = screen.getByRole("button", { name: "Create" });

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(timezoneSelect, { target: { value: "PST" } });
    fireEvent.click(submitButton);

    expect(handleClock).toHaveBeenCalledWith({
      title: "New Title",
      timezone: "PST",
      offset: 0,
    });
  });
});
