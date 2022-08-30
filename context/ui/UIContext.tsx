import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  /* Metodos */
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

/* El context Props es el estado del contexto*/
export const UIContext = createContext({} as ContextProps);
