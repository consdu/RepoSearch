import { renderHook } from "@testing-library/react";
import useRepositories from "./useRepositories";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";

describe("Given a getRepositories function", () => {
  describe("When called with an existing github user 'testuser'", () => {
    test("Then it should return an array of repositories", async () => {
      const username = "testuser";
      const expectedResponse = repositoriesStoreMock.repositories;

      const { result } = renderHook(() => useRepositories());
      const { getRepositories } = result.current;

      const response = await getRepositories(username);

      expect(response).toStrictEqual(expectedResponse);
    });
  });

  describe("When called with a non-existing github user 'nouser'", () => {
    test("Then it should return an array of repositories", async () => {
      server.resetHandlers(...errorHandlers);

      const username = "nouser";
      const expectedResponse = undefined;

      const { result } = renderHook(() => useRepositories());
      const { getRepositories } = result.current;

      const response = await getRepositories(username);

      expect(response).toStrictEqual(expectedResponse);
    });
  });
});
