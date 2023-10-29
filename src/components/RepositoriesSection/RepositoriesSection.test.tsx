import { screen } from "@testing-library/react";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import { renderWithProviders } from "../../utils/testUtils";
import RepositoriesSection from "./RepositoriesSection";

const repositoriesMock = repositoriesStoreMock.repositories;

describe("Given a RepositoriesSection component", () => {
  describe("When rendered with user with 10 repositories", () => {
    test("Then it should show 10 repositories", () => {
      renderWithProviders(<RepositoriesSection />, {
        repositoriesStore: repositoriesStoreMock,
        uiStore: { isRepositoriesLoading: false, isUserLoading: false },
      });

      repositoriesMock.forEach((repository) => {
        const repositoryName = screen.getByRole("heading", {
          name: repository.name,
        });

        expect(repositoryName).toBeInTheDocument();
      });
    });
  });
});
