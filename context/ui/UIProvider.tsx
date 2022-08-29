import { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  return (
    <UIContext.Provider value={{ sideMenuOpen: false }}>
      {children}
    </UIContext.Provider>
  );
};
