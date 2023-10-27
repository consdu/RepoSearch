import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import { renderWithProviders } from "../../utils/testUtils";

const onSearchChange = vi.fn();

describe("Given a SearchBar component", () => {
  describe("When it is rendered", () => {
    test("Then it should display a text input", () => {
      renderWithProviders(<SearchBar onSearchChange={onSearchChange} />);

      const inputElement = screen.getByRole("search");

      expect(inputElement).toBeInTheDocument();
    });
  });

  describe("When user types into 'react' in the search bar", () => {
    test("Then the input value should reflect 'react'", async () => {
      const typedText = "react";

      renderWithProviders(<SearchBar onSearchChange={onSearchChange} />);

      const inputElement = screen.getByRole("search");

      await userEvent.type(inputElement, typedText);

      expect(inputElement).toHaveValue(typedText);
    });
  });
});
