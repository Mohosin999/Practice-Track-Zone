import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button Testing", () => {
  it("should cantain text named My Button", () => {
    render(<Button />);

    const btn = screen.getByRole("button");
    const btnText = "My Button";

    expect(btn).toHaveTextContent(btnText);
  });
});
