import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RepositoriesStoreStructure, RepositoryStructure } from "../../types";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";

const initialRepositoriesState =
  repositoriesStoreMock as RepositoriesStoreStructure;

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
    loadSearchTerm: (
      currentRepositoriesState: RepositoriesStoreStructure,
      action: PayloadAction<string>,
    ) => ({
      ...currentRepositoriesState,
      searchTerm: action.payload,
    }),
  },
});

export const {
  loadRepositories: loadRepositoriesActionCreator,
  loadSearchedRepositories: loadSearchedRepositoriesActionCreator,
  loadSearchTerm: loadSearchTermActionCreator,
} = repositoriesSlice.actions;

export const repositoriesReducer = repositoriesSlice.reducer;
