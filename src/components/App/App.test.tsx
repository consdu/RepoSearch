import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Given a App component", () => {
  describe("When mounted", () => {
    test("Then it should show the text RepoSearch", () => {
      render(<App />);

      const text = screen.getByText(/RepoSearch/i);

      expect(text).toBeInTheDocument();
    });
  });
});
