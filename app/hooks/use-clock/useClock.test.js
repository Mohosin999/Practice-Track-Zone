import { renderHook } from "@testing-library/react-hooks";
import { addMinutes, startOfMinute } from "date-fns";
import useClock from "./useClock";

// jest.mock("date-fns");

describe("useClock", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should set default local date based on local timezone and offset", () => {
    const { result, rerender } = renderHook(() => useClock());

    expect(result.current.date).not.toBeNull();
    expect(result.current.dateUtc).not.toBeNull();
    expect(result.current.offset).not.toBe(0);
    expect(result.current.timezone).not.toBeNull();
  });

  it("should update local date when timezone is provided", () => {
    jest
      .spyOn(Date.prototype, "toISOString")
      .mockReturnValueOnce("2023-06-17T12:11:15.555Z");
    const mockOffset = 300;
    const mockTimezone = "PST";
    const mockLocalDate = new Date("2023-06-17T12:11:15.555Z");

    jest
      .spyOn(Date.prototype, "getTimezoneOffset")
      .mockReturnValueOnce(mockOffset);
    addMinutes.mockReturnValueOnce(mockLocalDate);

    const { result, rerender } = renderHook(
      ({ timezone, offset }) => useClock(timezone, offset),
      {
        initialProps: { timezone: null, offset: null },
      }
    );

    rerender({ timezone: mockTimezone, offset: null });

    expect(result.current.date).toEqual(mockLocalDate);
    expect(result.current.timezone).toEqual(mockTimezone);
    // const mockUtc = new Date("2023-06-17T12:11:15.555Z");
    // const mockOffset = 300;
    // const mockTimezone = "PST";
    // const mockLocalDate = addMinutes(mockUtc, mockOffset);

    // const { result, rerender } = renderHook(
    //   ({ timezone, offset }) => useClock(timezone, offset),
    //   {
    //     initialProps: { timezone: null, offset: null },
    //   }
    // );

    // rerender({ timezone: mockTimezone, offset: null });

    // expect(result.current.date).toEqual(mockLocalDate);
    // expect(result.current.timezone).toEqual(mockTimezone);
  });

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
