import { render, screen } from "@testing-library/react";
import BrandLogo from "./BrandLogo";

describe("Given a BrandLogo component", () => {
  describe("When rendered", () => {
    test("Then it should show the text RepoSearch", () => {
      const brandLogoWords = ["Repo", "Search"];

      render(<BrandLogo />);

      brandLogoWords.forEach((word) => {
        const text = screen.getByText(word);
        expect(text).toBeInTheDocument();
      });
    });
  });
});
