import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import { RepositoriesStoreStructure } from "../../types";
import {
  loadRepositoriesActionCreator,
  loadSearchedRepositoriesActionCreator,
  repositoriesReducer,
} from "./repositoriesSlice";

const repositoriesListMock = repositoriesStoreMock.repositories;

describe("Given a repositoriesReducer", () => {
  describe("When called with a currentRepositoriesState and a loadRepositoriesAction with a list of repos as payload", () => {
    test("Then it should return a new state with the loaded repositories list", () => {
      const currentRepositoriesState = {} as RepositoriesStoreStructure;
      const expectedRepositoriesState = {
        repositories: repositoriesListMock,
      } as RepositoriesStoreStructure;

      const newRepositoriesState = repositoriesReducer(
        currentRepositoriesState,
        loadRepositoriesActionCreator(repositoriesListMock),
      );

      expect(newRepositoriesState).toStrictEqual(expectedRepositoriesState);
    });
  });

  describe("When called with a currentRepositoriesState and a loadSearchedRepositoriesAction with a list of repos as payload", () => {
    test("Then it should return a new state with the loaded repositoriesBySearchTerm list", () => {
      const currentRepositoriesState = {} as RepositoriesStoreStructure;
      const expectedRepositoriesState = {
        repositoriesBySearchTerm: repositoriesListMock,
      } as RepositoriesStoreStructure;

      const newRepositoriesState = repositoriesReducer(
        currentRepositoriesState,
        loadSearchedRepositoriesActionCreator(repositoriesListMock),
      );

      expect(newRepositoriesState).toStrictEqual(expectedRepositoriesState);
    });
  });
});
