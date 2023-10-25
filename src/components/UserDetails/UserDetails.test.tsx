import { render, screen } from "@testing-library/react";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import UserDetails from "./UserDetails";

const user = repositoriesStoreMock.user;

describe("Given a UserDetails component", () => {
  describe("When it receives a user", () => {
    test("Then it should show the user avatar", () => {
      const avatarAlt = `${user.name}'s avatar`;

      render(<UserDetails user={user} />);

      const avatar = screen.getByAltText(avatarAlt);

      expect(avatar).toBeInTheDocument();
    });

    test("Then it should show the user name and username", () => {
      const name = user.name;
      const username = user.login;

      render(<UserDetails user={user} />);

      const nameElement = screen.getByText(name);
      const usernameElement = screen.getByText(username);

      expect(nameElement).toBeInTheDocument();
      expect(usernameElement).toBeInTheDocument();
    });

    test("Then it should show the followers and following", () => {
      const followers = user.followers;
      const following = user.following;

      render(<UserDetails user={user} />);

      const followersElement = screen.getByText(followers);
      const followingElement = screen.getByText(following);

      [followersElement, followingElement].forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });

    test("Then it should show the user bio if he has one", () => {
      const bio = user.bio?.trim();

      if (bio) {
        render(<UserDetails user={user} />);

        const bioElement = screen.getByText(bio);

        expect(bioElement).toBeInTheDocument();
      }
    });

    test("Then it should show the user company if he has one", () => {
      const company = user.company?.trim();

      if (company) {
        render(<UserDetails user={user} />);

        const companyElement = screen.getByText(company);

        expect(companyElement).toBeInTheDocument();
      }
    });
  });
});
