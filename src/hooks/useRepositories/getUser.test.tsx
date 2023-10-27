import { renderHook } from "@testing-library/react";
import useRepositories from "./useRepositories";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";

describe("Given a getUser function", () => {
  describe("When called with an existing user 'gaearon'", () => {
    test("Then it should return the user data", async () => {
      const username = "gaearon";
      const expectedResponse = repositoriesStoreMock.user;

      const { result } = renderHook(() => useRepositories());
      const { getUser } = result.current;

      const response = await getUser(username);

      expect(response).toStrictEqual(expectedResponse);
    });
  });

  describe("When called with a non existing user 'nonexistinguser'", () => {
    test("Then it should return undefined", async () => {
      server.resetHandlers(...errorHandlers);

      const username = "nonexistinguser";
      const expectedResponse = undefined;

      const { result } = renderHook(() => useRepositories());
      const { getUser } = result.current;

      const response = await getUser(username);

      expect(response).toStrictEqual(expectedResponse);
    });
  });
});
