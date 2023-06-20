// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import ClockActions from "./ClockActions";

// describe("ClockActions", () => {
//   const mockClock = {
//     title: "Test Clock",
//     timezone: "GMT",
//     offset: 0,
//   };

//   const mockUpdateClock = jest.fn();

//   test("renders ClockActions without errors", () => {
//     render(<ClockActions clock={mockClock} updateClock={mockUpdateClock} />);
//   });

//   test('toggles edit mode when "Edit" button is clicked', () => {
//     const { getByText } = render(
//       <ClockActions clock={mockClock} updateClock={mockUpdateClock} />
//     );
//     const editButton = getByText("Edit");

//     fireEvent.click(editButton);

//     expect(editButton).toHaveTextContent("Cancel");
//   });

//   test("invokes updateClock with new title when input value changes", () => {
//     const { getByLabelText } = render(
//       <ClockActions clock={mockClock} updateClock={mockUpdateClock} />
//     );
//     const titleInput = getByLabelText("Title");

//     fireEvent.change(titleInput, { target: { value: "New Title" } });

//     expect(mockUpdateClock).toHaveBeenCalledWith({
//       title: "New Title",
//     });
//   });

//   test("invokes updateClock with new timezone when select value changes", () => {
//     const { getByLabelText } = render(
//       <ClockActions clock={mockClock} updateClock={mockUpdateClock} />
//     );
//     const timezoneSelect = getByLabelText("Timezone");

//     fireEvent.change(timezoneSelect, { target: { value: "UTC" } });

//     expect(mockUpdateClock).toHaveBeenCalledWith({
//       timezone: "UTC",
//     });
//   });

//   test("invokes updateClock with new offset when select value changes (GMT/UTC timezone)", () => {
//     const { getByLabelText } = render(
//       <ClockActions clock={mockClock} updateClock={mockUpdateClock} />
//     );
//     const offsetSelect = getByLabelText("Offset");

//     fireEvent.change(offsetSelect, { target: { value: "-11.5" } });

//     expect(mockUpdateClock).toHaveBeenCalledWith({
//       offset: -690,
//     });
//   });
// });
