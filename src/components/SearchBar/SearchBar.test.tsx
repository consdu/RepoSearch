import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("Given a SearchBar component", () => {
  describe("When it is rendered", () => {
    test("Then it should display a text input", () => {
      render(<SearchBar />);

      const inputElement = screen.getByRole("search");

      expect(inputElement).toBeInTheDocument();
    });
  });

  describe("When user types into 'react' in the search bar", () => {
    test("Then the input value should reflect 'react'", async () => {
      const typedText = "react";

      render(<SearchBar />);

      const inputElement = screen.getByRole("search");

      await userEvent.type(inputElement, typedText);

      expect(inputElement).toHaveValue(typedText);
    });
  });
});
