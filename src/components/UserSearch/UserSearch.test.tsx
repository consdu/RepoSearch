import { render, screen } from "@testing-library/react";
import UserSearch from "./UserSearch";
import userEvent from "@testing-library/user-event";

const onFormSubmitMock = vi.fn();

describe("Given a UserSearch component", () => {
  const inputRole = "search";
  const labelText = "search user";

  describe("When rendered", () => {
    test("Then it should show a search input", () => {
      const inputName = "username";

      render(<UserSearch onFormSubmit={onFormSubmitMock} isLoading={false} />);

      const searchInput = screen.getByRole(inputRole, { name: inputName });

      expect(searchInput).toBeInTheDocument();
    });

    test("Then it should show a submit button", () => {
      render(<UserSearch onFormSubmit={onFormSubmitMock} isLoading={false} />);

      const button = screen.getByLabelText(labelText);

      expect(button).toBeInTheDocument();
    });
  });

  describe("When rendered and the user types a 'test' username", () => {
    test("Then it should show a 'test' in the input", async () => {
      const username = "test";

      render(<UserSearch onFormSubmit={onFormSubmitMock} isLoading={false} />);

      const searchInput = screen.getByRole(inputRole);
      await userEvent.type(searchInput, username);

      expect(searchInput).toHaveValue(username);
    });
  });

  describe("When rendered and the user types a 'test' username and submits", () => {
    test("Then it should call the received onFormSubmit function with the username", async () => {
      const username = "test";

      render(<UserSearch onFormSubmit={onFormSubmitMock} isLoading={false} />);

      const searchInput = screen.getByRole(inputRole);
      await userEvent.type(searchInput, username);
      await userEvent.type(searchInput, "{enter}");

      expect(onFormSubmitMock).toHaveBeenCalledWith(username);
    });
  });
});
