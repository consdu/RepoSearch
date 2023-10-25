import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Given a Header component", () => {
  describe("When rendered", () => {
    test("Then it should show the text RepoSearch", () => {
      const brandLogoWords = ["Repo", "Search"];

      render(<Header />);

      brandLogoWords.forEach((word) => {
        const text = screen.getByText(word);
        expect(text).toBeInTheDocument();
      });
    });
  });
});
