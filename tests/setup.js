// tests/setup.js ( it's for jest )

import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// Extend Jest's expect method with matchers from react-testing-library
expect.extend(matchers);

// Run cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});
