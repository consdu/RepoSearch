import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../utils/testUtils";
import App from "./App";

const username = "gaearon";

const preloadedState = {
  repositoriesStore: {
    initialGithubUsername: username,
    perPage: 10,
    currentPage: 1,
    repositories: [],
    repositoriesBySearchTerm: [],
    searchMethod: "name",
    searchTerm: "",
    totalPages: 1,
    totalRepositories: 20,
    user: null,
  },
  uiStore: {
    isRepositoriesLoading: false,
    isUserLoading: false,
  },
};

describe("Given an App component", () => {
  describe("When it is rendered with some user", () => {
    test("Then it should show 10 repos of the user", async () => {
      const expectedLength = 10;

      renderWithProviders(<App />, preloadedState);

      const repos = await screen.findAllByRole("heading", {
        level: 2,
      });

      expect(repos).toHaveLength(expectedLength);
    });
  });

  describe("When it is rendered and the user search repos with 'test' search term", () => {
    test("Then it should show 3 repos matching the search", async () => {
      const searchTerm = "test";
      const expectedLength = 3;

      renderWithProviders(<App />, preloadedState);

      const searchInput = screen.getByLabelText("search");
      await userEvent.type(searchInput, searchTerm);

      await waitFor(async () =>
        expect(
          await screen.findAllByRole("heading", {
            level: 2,
          }),
        ).toHaveLength(expectedLength),
      );
    });
  });
});
