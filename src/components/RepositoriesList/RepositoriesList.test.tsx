import { render, screen } from "@testing-library/react";
import RepositoriesList from "./RepositoriesList";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";

const repositoriesMock = repositoriesStoreMock.repositories;

describe("Given a RepositoriesList component", () => {
  describe("When it is rendered with a list of repositories", () => {
    test("Then it should display the list of repositories", () => {
      const repositoriesNames = repositoriesMock.map(
        (repository) => repository.name,
      );

      render(<RepositoriesList repositories={repositoriesMock} />);

      repositoriesNames.forEach((repositoryName) => {
        const repository = screen.getByRole("heading", {
          name: repositoryName,
        });
        expect(repository).toBeInTheDocument();
      });
    });
  });
});
