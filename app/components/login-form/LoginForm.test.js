import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("should have an input for username or email with label", () => {
    render(<LoginForm />);

    const labelElement = screen.getByLabelText("Email or username");
    const inputElement = screen.getByPlaceholderText(
      "Enter your email or username"
    );
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });
});
