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

  it("should update clock on input change", () => {
    render(<ClockActions clock={clock} updateClock={updateClock} />);
  });
});
