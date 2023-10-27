import { screen } from "@testing-library/react";
import Header from "./Header";
import { renderWithProviders } from "../../utils/testUtils";

describe("Given a Header component", () => {
  describe("When rendered", () => {
    test("Then it should show the text RepoSearch", () => {
      const brandLogoWords = ["Repo", "Search"];

      renderWithProviders(<Header />);

      brandLogoWords.forEach((word) => {
        const text = screen.getByText(word);
        expect(text).toBeInTheDocument();
      });
    });
  });
});
