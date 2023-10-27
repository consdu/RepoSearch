import { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { RootState, setupStore, store } from "../store";

export const renderWithProviders = (
  ui: React.ReactElement,
  preloadedState?: PreloadedState<RootState>,
) => {
  const testStore = preloadedState ? setupStore(preloadedState) : store;

  const Wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    return <Provider store={testStore}>{children}</Provider>;
  };

  render(ui, { wrapper: Wrapper });
};
