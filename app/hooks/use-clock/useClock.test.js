import { renderHook } from "@testing-library/react";
import { addMinutes } from "date-fns";
import useClock from "./useClock";

jest.mock("date-fns");

describe("useClock", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update local date when timezone is provided", () => {});

  it("should update local date when timezone is not provided", () => {
    // const mockUtc = new Date("2023-06-17T12:00:00Z");
    // const mockOffset = 300;
    // const mockLocalDate = addMinutes(mockUtc, -mockOffset);
    // const mockLocalTimezone = "PST";
    // addMinutes.mockReturnValueOnce(mockLocalDate);
    // const { result } = renderHook(() => useClock(null, null));
    // expect(result.current.date).toEqual(mockLocalDate);
    // expect(result.current.timezone).toEqual(mockLocalTimezone);
  });
});
