import { createSlice } from "@reduxjs/toolkit";
import { RepositoriesStoreStructure } from "../../types";
import { repositoriesStoreMock } from "../../mocks/repositoriesStoreMock";

const initialRepositoriesState =
  repositoriesStoreMock as RepositoriesStoreStructure;

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: initialRepositoriesState,
  reducers: {},
});

export const repositoriesReducer = repositoriesSlice.reducer;
