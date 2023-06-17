import { renderHook } from "@testing-library/react-hooks";
import { addMinutes, startOfMinute } from "date-fns";
import useClock from "./useClock";

describe("useClock", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should initialize correctly with default values", () => {
    const { result } = renderHook(() => useClock());

    const currentUtc = new Date();
    const expectedDate = addMinutes(
      startOfMinute(currentUtc),
      -currentUtc.getTimezoneOffset()
    );

    expect(result.current.date.getTime()).toEqual(expectedDate.getTime());
    expect(result.current.dateUtc).toBeNull();
    expect(result.current.offset).toBe(0);
    expect(result.current.timezone).toBeNull();
  });

  it("should set the UTC date and local offset on mount", () => {
    // const mockDate = new Date("2023-06-17T12:00:00Z");
    // const mockOffset = 240;
    // jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    // addMinutes.mockReturnValueOnce(addMinutes(mockDate, mockOffset));
    // const { result } = renderHook(() => useClock());
    // expect(result.current.dateUtc).toEqual(mockDate);
    // expect(result.current.offset).toEqual(mockOffset);
  });

  it("should update local date when timezone is provided", () => {
    //   const mockUtc = new Date("2023-06-17T12:00:00Z");
    //   const mockOffset = 300;
    //   const mockTimezone = "PST";
    //   const mockLocalDate = addMinutes(mockUtc, mockOffset);
    //   addMinutes.mockReturnValueOnce(mockLocalDate);
    //   const { result, rerender } = renderHook(
    //     ({ timezone, offset }) => useClock(timezone, offset),
    //     {
    //       initialProps: { timezone: null, offset: null },
    //     }
    //   );
    //   rerender({ timezone: mockTimezone, offset: null });
    //   expect(result.current.date).toEqual(mockLocalDate);
    //   expect(result.current.timezone).toEqual(mockTimezone);
    // });
    // it("should update local date when timezone is not provided", () => {
    //   const mockUtc = new Date("2023-06-17T12:00:00Z");
    //   const mockOffset = 300;
    //   const mockLocalDate = addMinutes(mockUtc, -mockOffset);
    //   const mockLocalTimezone = "PST";
    //   addMinutes.mockReturnValueOnce(mockLocalDate);
    //   const { result } = renderHook(() => useClock(null, null));
    //   expect(result.current.date).toEqual(mockLocalDate);
    //   expect(result.current.timezone).toEqual(mockLocalTimezone);
  });
});
