import { renderHook } from "@testing-library/react";
import { addMinutes } from "date-fns";
import useClock from "./useClock";

jest.mock("date-fns", () => ({
  addMinutes: jest.fn(
    (date, minutes) => new Date(date.getTime() + minutes * 60000)
  ),
}));

describe("useClock", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the local date and timezone when timezone is provided", () => {
    const mockUtc = new Date("2023-06-18T05:36:07.371Z");

    const mockOffset = 300;
    const mockLocalDate = addMinutes(mockUtc, mockOffset);
    const mockTimezone = "PST";

    const { result, rerender } = renderHook((props) => useClock(...props), {
      initialProps: [mockTimezone, null],
    });

    expect(result.current.date).toEqual(mockLocalDate);
    expect(result.current.timezone).toEqual(mockTimezone);

    const newOffset = 420;
    const newLocalDate = addMinutes(mockUtc, newOffset);
    const newTimezone = "EST";

    rerender([newTimezone, null]);

    expect(result.current.date).toEqual(newLocalDate);
    expect(result.current.timezone).toEqual(newTimezone);
  });

  it("should update local date when timezone is not provided", () => {
    // let d = new Date();
    // const lo = d.getTimezoneOffset();
    // d = addMinutes(d, lo);
    // const mockUtc = new Date("2023-06-18T05:36:07.371Z");
    // const mockOffset = -360;
    // const mockLocalDate = addMinutes(mockUtc, -mockOffset);
    // const mockLocalTimezone = "GMT";
    // addMinutes.mockReturnValueOnce(mockLocalDate);
    // const { result } = renderHook(() => useClock());
    // expect(result.current.date).toBe(d);
    // expect(result.current.timezone).toBe();
    // expect(result.current.timezone).toEqual();
  });
});
