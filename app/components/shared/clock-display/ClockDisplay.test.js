import React from "react";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import ClockDisplay from "./ClockDisplay";

describe("ClockDisplay", () => {
  const mockDate = new Date("2023-06-20T10:00:00");
  const mockTitle = "Test Clock";
  const mockTimezone = "GMT";
  const mockOffset = -120;

  it("renders the ClockDisplay component correctly", () => {
    render(
      <ClockDisplay
        date={mockDate}
        title={mockTitle}
        timezone={mockTimezone}
        offset={mockOffset}
      />
    );

    // Check if the title is rendered correctly
    expect(screen.getByText(`Title: ${mockTitle}`)).toBeInTheDocument();

    // Check if the formatted date is rendered correctly
    const formattedDate = format(mockDate, "yyyy-MM-dd hh:mm:ss aaa");
    expect(screen.getByText(formattedDate)).toBeInTheDocument();

    // Check if the timezone and offset are rendered correctly
    const offsetHr = mockOffset / 60;
    const expectedOffsetText =
      offsetHr > 0 ? `+${Math.abs(offsetHr)}` : `-${Math.abs(offsetHr)}`;
    expect(
      screen.getByText(mockTimezone + expectedOffsetText)
    ).toBeInTheDocument();
  });

  it("validates prop types correctly", () => {
    // Silence prop-type validation warnings in the console
    const originalError = console.error;
    console.error = jest.fn();

    // Render the component with incorrect prop types
    render(
      <ClockDisplay
        date={123} // Invalid date
        title={123} // Invalid title
        timezone={123} // Invalid timezone
        offset="abc" // Invalid offset
      />
    );

    // Expect prop type validation errors to be logged
    expect(console.error).toHaveBeenCalledTimes(4);

    // Restore the console.error function
    console.error = originalError;
  });
});
