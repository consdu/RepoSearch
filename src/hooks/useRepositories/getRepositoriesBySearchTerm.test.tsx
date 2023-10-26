import { renderHook } from "@testing-library/react";
import useRepositories from "./useRepositories";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import { RepositoryStructure } from "../../types";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";

const searchedRepositories = repositoriesStoreMock.repositories.slice(0, 3);

describe("Given a getRepositoriesBySearchTerm function", () => {
  const username = "testuser";

  describe("When called with an existing github user 'testuser' and a search term 'example'", () => {
    test("Then it should return an array of repositories", async () => {
      const searchTerm = "example";

      const expectedResponse = searchedRepositories;

      const { result } = renderHook(() => useRepositories());
      const { getRepositoriesBySearchTerm } = result.current;

      const response = await getRepositoriesBySearchTerm(username, searchTerm);

      expect(response).toStrictEqual(expectedResponse);
    });
  });

  describe("When called with a search term that doesn't match any repos", () => {
    test("Then it should return an empty array", async () => {
      server.resetHandlers(...errorHandlers);
      const expectedResponse: RepositoryStructure[] = [];
      const searchTerm = "nonexisting";

      const { result } = renderHook(() => useRepositories());
      const { getRepositoriesBySearchTerm } = result.current;

      const response = await getRepositoriesBySearchTerm(username, searchTerm);

      expect(response).toStrictEqual(expectedResponse);
    });
  });
});
