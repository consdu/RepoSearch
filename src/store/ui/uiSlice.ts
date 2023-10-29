import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UiStoreStructure } from "../../types";

const initialUiState: UiStoreStructure = {
  isUserLoading: false,
  isRepositoriesLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    setIsUserLoading: (
      currentUiState: UiStoreStructure,
      action: PayloadAction<boolean>,
    ) => ({
      ...currentUiState,
      isUserLoading: action.payload,
    }),
    setIsRepositoriesLoading: (
      currentUiState: UiStoreStructure,
      action: PayloadAction<boolean>,
    ) => ({
      ...currentUiState,
      isRepositoriesLoading: action.payload,
    }),
  },
});

export const {
  setIsUserLoading: setIsUserLoadingActionCreator,
  setIsRepositoriesLoading: setIsRepositoriesLoadingActionCreator,
} = uiSlice.actions;
