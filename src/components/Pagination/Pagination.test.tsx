import { screen } from "@testing-library/react";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import { renderWithProviders } from "../../utils/testUtils";
import Pagination from "./Pagination";

describe("Given a Pagination component", () => {
  describe("When rendered with a store with current page 1 and total pages 2", () => {
    test("Then it should show a Next button", () => {
      const nextButtonText = "Next";

      renderWithProviders(<Pagination isLoading={false} />, {
        repositoriesStore: repositoriesStoreMock,
      });

      const nextButton = screen.getByRole("button", { name: nextButtonText });

      expect(nextButton).toBeInTheDocument();
    });
  });

  describe("When rendered with a store with current page 2 and total pages 2", () => {
    test("Then it should show a Previous", () => {
      const previousButtonText = "Previous";

      renderWithProviders(<Pagination isLoading={false} />, {
        repositoriesStore: {
          ...repositoriesStoreMock,
          currentPage: 2,
        },
      });

      const previousButton = screen.getByRole("button", {
        name: previousButtonText,
      });

      expect(previousButton).toBeInTheDocument();
    });
  });

  describe("When rendered with a store with current page 2 and total pages 3", () => {
    test("Then it should show a Previous", () => {
      const nextButtonText = "Next";
      const previousButtonText = "Previous";

      renderWithProviders(<Pagination isLoading={false} />, {
        repositoriesStore: {
          ...repositoriesStoreMock,
          currentPage: 2,
          totalPages: 3,
        },
      });

      const nextButton = screen.getByRole("button", { name: nextButtonText });
      const previousButton = screen.getByRole("button", {
        name: previousButtonText,
      });

      expect(nextButton).toBeInTheDocument();
      expect(previousButton).toBeInTheDocument();
    });
  });
});
