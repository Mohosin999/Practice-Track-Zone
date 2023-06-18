import { renderHook } from "@testing-library/react";
import { addMinutes } from "date-fns";
import useClock from "./useClock";

jest.mock("date-fns");

describe("useClock", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update local date when timezone is provided", () => {
    const mockUtc = new Date("2023-06-17T12:11:15.555Z");
    const mockOffset = 300;
    const mockTimezone = "PST";
    const mockLocalDate = addMinutes(mockUtc, mockOffset);

    const { result, rerender } = renderHook(
      ({ timezone, offset }) => useClock(timezone, offset),
      {
        initialProps: { timezone: null, offset: null },
      }
    );

    rerender({ timezone: mockTimezone, offset: null });

    expect(result.current.date).toEqual(mockLocalDate);
    expect(result.current.timezone).toEqual(mockTimezone);
  });
});
