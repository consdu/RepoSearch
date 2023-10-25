import { createSlice } from "@reduxjs/toolkit";
import { RepositoriesStoreStructure } from "../../types";

const initialRepositoriesState = {} as RepositoriesStoreStructure;

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: initialRepositoriesState,
  reducers: {},
});

export const repositoriesReducer = repositoriesSlice.reducer;
