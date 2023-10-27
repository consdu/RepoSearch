import { render, screen } from "@testing-library/react";
import NoRepositoriesFound from "./NoRepositoriesFound";

describe("Given a NoRepositoriesFound component", () => {
  describe("When it is rendered", () => {
    test("Then it should display 'No repositories found...' message", () => {
      const message = "No repositories found...";

      render(<NoRepositoriesFound />);

      const messageElement = screen.getByText(message);

      expect(messageElement).toBeInTheDocument();
    });
  });
});
