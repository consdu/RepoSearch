import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GithubUserStructure,
  RepositoriesStoreStructure,
  RepositoryStructure,
} from "../../types";

const initialRepositoriesState = {
  initialGithubUsername: "consdu",
  searchMethod: "name",
  perPage: 10,
  currentPage: 1,
} as RepositoriesStoreStructure;

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: initialRepositoriesState,
  reducers: {
    loadRepositories: (
      currentRepositoriesState: RepositoriesStoreStructure,
      action: PayloadAction<RepositoryStructure[]>,
    ) => ({
      ...currentRepositoriesState,
      repositories: action.payload,
    }),
    loadSearchedRepositories: (
      currentRepositoriesState: RepositoriesStoreStructure,
      action: PayloadAction<RepositoryStructure[]>,
    ) => ({
      ...currentRepositoriesState,
      repositoriesBySearchTerm: action.payload,
    }),
    loadUser: (
      currentRepositoriesState: RepositoriesStoreStructure,
      action: PayloadAction<GithubUserStructure>,
    ) => ({
      ...currentRepositoriesState,
      user: action.payload,
    }),
    setSearchTerm: (
      currentRepositoriesState: RepositoriesStoreStructure,
      action: PayloadAction<string>,
    ) => ({
      ...currentRepositoriesState,
      searchTerm: action.payload,
    }),
    setSearchMethod: (
      currentRepositoriesState: RepositoriesStoreStructure,
      action: PayloadAction<string>,
    ) => ({
      ...currentRepositoriesState,
      searchMethod: action.payload,
    }),
    setTotalPages: (
      currentRepositoriesState: RepositoriesStoreStructure,
      action: PayloadAction<number>,
    ) => ({
      ...currentRepositoriesState,
      totalPages: Math.ceil(action.payload / currentRepositoriesState.perPage),
    }),
  },
});

export const {
  loadRepositories: loadRepositoriesActionCreator,
  loadSearchedRepositories: loadSearchedRepositoriesActionCreator,
  loadUser: loadUserActionCreator,
  setSearchTerm: setSearchTermActionCreator,
  setSearchMethod: setSearchMethodActionCreator,
  setTotalPages: setTotalPagesActionCreator,
} = repositoriesSlice.actions;

export const repositoriesReducer = repositoriesSlice.reducer;
