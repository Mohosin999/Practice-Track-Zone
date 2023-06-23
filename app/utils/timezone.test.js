import { getOffset, getTimezone } from "./timezone";

jest.mock("../constants/timezone", () => ({
  TIMEZONE_OFFSET: {
    "America/New_York": -4,
    "Europe/London": 0,
    "Asia/Tokyo": 9,
  },
}));

describe("getOffset", () => {
  it("should return an array of offsets", () => {
    const start = -11.5;
    const end = 12;
    const expectedOffsets = [
      -11.5, -11, -10.5, -10, -9.5, -9, -8.5, -8, -7.5, -7, -6.5, -6, -5.5, -5,
      -4.5, -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3,
      3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
      12,
    ];

    const offsets = getOffset(start, end);

    expect(offsets).toEqual(expectedOffsets);
  });

  it("should return an array of offsets with default start and end values", () => {
    const expectedOffsets = [
      -11.5, -11, -10.5, -10, -9.5, -9, -8.5, -8, -7.5, -7, -6.5, -6, -5.5, -5,
      -4.5, -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3,
      3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
      12,
    ];

    const offsets = getOffset();

    expect(offsets).toEqual(expectedOffsets);
  });
});

describe("getTimezone", () => {
  it("should return an array of timezones", () => {
    const expectedTimezones = [
      "UTC",
      "GMT",
      "America/New_York",
      "Europe/London",
      "Asia/Tokyo",
    ];

    const timezones = getTimezone();

    expect(timezones).toEqual(expectedTimezones);
  });
});
