import { render, screen } from "@testing-library/react";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import Repository from "./Repository";
import getDateFromString from "../../utils/getDateFromString";

const repository = repositoriesStoreMock.repositories[1];
describe("Given a Repository Component", () => {
  describe("When rendered with a repository", () => {
    test("Then it should show the repository name", () => {
      const repositoryName = repository.name;

      render(<Repository repository={repository} />);

      const repositoryNameElement = screen.getByRole("heading", {
        name: repositoryName,
      });

      expect(repositoryNameElement).toBeInTheDocument();
    });

    test("Then it should show the repository description", () => {
      const repositoryDescription = repository.description as string;

      render(<Repository repository={repository} />);

      const repositoryDescriptionElement = screen.getByText(
        repositoryDescription,
      );

      expect(repositoryDescriptionElement).toBeInTheDocument();
    });

    test("Then it should show the repository programming language", () => {
      const repositoryLanguage = repository.language as string;

      render(<Repository repository={repository} />);

      const repositoryLanguageElement = screen.getByText(repositoryLanguage);

      expect(repositoryLanguageElement).toBeInTheDocument();
    });

    test("Then it should show the repository stars number", () => {
      const repositoryStars = repository.stargazers_count.toString();
      const labelText = "stars count";

      render(<Repository repository={repository} />);

      const repositoryStarsElement = screen.getByLabelText(labelText);

      expect(repositoryStarsElement).toBeInTheDocument();
      expect(repositoryStarsElement).toHaveTextContent(repositoryStars);
    });

    test("Then it should show the repository forks number", () => {
      const repositoryForks = repository.forks_count.toString();
      const labelText = "forks count";

      render(<Repository repository={repository} />);

      const repositoryForksElement = screen.getByLabelText(labelText);

      expect(repositoryForksElement).toBeInTheDocument();
      expect(repositoryForksElement).toHaveTextContent(repositoryForks);
    });

    test("Then it should show the repository updated on date", () => {
      const expectedDate = `Updated on ${getDateFromString(
        repository.updated_at,
      )}`;
      const labelText = "updated on";

      render(<Repository repository={repository} />);

      const updateOnDateElement = screen.getByLabelText(labelText);

      expect(updateOnDateElement).toBeInTheDocument();
      expect(updateOnDateElement).toHaveTextContent(expectedDate);
    });
  });
});
