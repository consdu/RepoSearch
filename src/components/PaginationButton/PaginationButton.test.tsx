import { render, screen } from "@testing-library/react";
import PaginationButton from "./PaginationButton";
import userEvent from "@testing-library/user-event";

const onButtonClickMock = vi.fn();

describe("Given a PaginationButton component", () => {
  describe("When it receives 'Next'", () => {
    test("Then it should show a button with the 'Next' text", () => {
      const buttonName = "Next";

      render(
        <PaginationButton
          name={buttonName}
          onButtonClick={onButtonClickMock}
        />,
      );

      const button = screen.getByRole("button", { name: buttonName });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When it receives 'Next' a handler func and the user clicks", () => {
    test("Then it should called the received function handler", async () => {
      const buttonName = "Next";

      render(
        <PaginationButton
          name={buttonName}
          onButtonClick={onButtonClickMock}
        />,
      );

      const button = screen.getByRole("button", { name: buttonName });
      await userEvent.click(button);

      expect(onButtonClickMock).toHaveBeenCalledOnce();
    });
  });
});
