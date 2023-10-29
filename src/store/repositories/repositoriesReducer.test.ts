import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";
import { RepositoriesStoreStructure } from "../../types";
import {
  loadRepositoriesActionCreator,
  loadSearchedRepositoriesActionCreator,
  loadUserActionCreator,
  repositoriesReducer,
  setSearchMethodActionCreator,
  setSearchTermActionCreator,
  setTotalPagesActionCreator,
} from "./repositoriesSlice";

const repositoriesListMock = repositoriesStoreMock.repositories;
const userMock = repositoriesStoreMock.user;

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

  describe("When called with a currentRepositoriesState and a loadUserAction with a user as payload", () => {
    test("Then it should return a new state with the loaded user", () => {
      const currentRepositoriesState = {} as RepositoriesStoreStructure;
      const expectedRepositoriesState = {
        user: userMock,
      } as RepositoriesStoreStructure;

      const newRepositoriesState = repositoriesReducer(
        currentRepositoriesState,
        loadUserActionCreator(userMock),
      );

      expect(newRepositoriesState).toStrictEqual(expectedRepositoriesState);
    });
  });

  describe("When called with a currentRepositoriesState and a setSearchTermAction with 'test' payload", () => {
    test("Then it should return a new state with the 'test' as searchTerm property", () => {
      const searchTerm = "test";
      const currentRepositoriesState = {} as RepositoriesStoreStructure;
      const expectedRepositoriesState = {
        searchTerm: searchTerm,
      } as RepositoriesStoreStructure;

      const newRepositoriesState = repositoriesReducer(
        currentRepositoriesState,
        setSearchTermActionCreator(searchTerm),
      );

      expect(newRepositoriesState).toStrictEqual(expectedRepositoriesState);
    });
  });

  describe("When called with a currentRepositoriesState and a setSearchMethodAction with 'language' payload", () => {
    test("Then it should return a new state with the 'language' as searchMethod property", () => {
      const searchMethod = "language";
      const currentRepositoriesState = {} as RepositoriesStoreStructure;
      const expectedRepositoriesState = {
        searchMethod: searchMethod,
      } as RepositoriesStoreStructure;

      const newRepositoriesState = repositoriesReducer(
        currentRepositoriesState,
        setSearchMethodActionCreator(searchMethod),
      );

      expect(newRepositoriesState).toStrictEqual(expectedRepositoriesState);
    });
  });

  describe("When called with a currentRepositoriesState and a setTotalPagesAction with '23' payload", () => {
    test("Then it should return a new state with the '3' as totalPages property", () => {
      const totalUserRepositories = 23;
      const repositoriesPerPage = 10;
      const expectedTotalPages = Math.ceil(
        totalUserRepositories / repositoriesPerPage,
      );

      const currentRepositoriesState = {
        perPage: repositoriesPerPage,
      } as RepositoriesStoreStructure;
      const expectedRepositoriesState = {
        ...currentRepositoriesState,
        totalPages: expectedTotalPages,
      } as RepositoriesStoreStructure;

      const newRepositoriesState = repositoriesReducer(
        currentRepositoriesState,
        setTotalPagesActionCreator(totalUserRepositories),
      );

      expect(newRepositoriesState).toStrictEqual(expectedRepositoriesState);
    });
  });
});
