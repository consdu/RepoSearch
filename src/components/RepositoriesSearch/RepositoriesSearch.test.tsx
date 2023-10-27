import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RepositoriesSearch from "./RepositoriesSearch";
import { renderWithProviders } from "../../utils/testUtils";

const onSearchChangeMock = vi.fn();

describe("Given a RepositoriesSearch component", () => {
  const inputRole = "search";

  describe("When it is rendered", () => {
    test("Then it should display a text input", () => {
      renderWithProviders(
        <RepositoriesSearch onSearchChange={onSearchChangeMock} />,
      );

      const inputElement = screen.getByRole(inputRole);

      expect(inputElement).toBeInTheDocument();
    });
  });

  describe("When it is rendered", () => {
    test("Then it should display a select input for the search method", () => {
      const labelText = "search method";

      renderWithProviders(
        <RepositoriesSearch onSearchChange={onSearchChangeMock} />,
      );
      const selectElement = screen.getByLabelText(labelText);

      expect(selectElement).toBeInTheDocument();
    });
  });

  describe("When user types into 'react' in the search bar", () => {
    const typedText = "react";

    test("Then the input value should reflect 'react'", async () => {
      renderWithProviders(
        <RepositoriesSearch onSearchChange={onSearchChangeMock} />,
      );
      const inputElement = screen.getByRole(inputRole);
      await userEvent.type(inputElement, typedText);

      expect(inputElement).toHaveValue(typedText);
    });

    test("Then the input onSearchChange function received should be called with the searchTerm", async () => {
      renderWithProviders(
        <RepositoriesSearch onSearchChange={onSearchChangeMock} />,
      );
      const inputElement = screen.getByRole(inputRole);
      await userEvent.type(inputElement, typedText);

      expect(onSearchChangeMock).toHaveBeenCalledWith(typedText);
    });
  });
});
