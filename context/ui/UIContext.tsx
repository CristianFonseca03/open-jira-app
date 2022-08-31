import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  /* Metodos */
  openSideMenu: () => void;
  closeSideMenu: () => void;

  setIsAddingEntry: (isAdding: boolean) => void;

  startDragging: () => void;
  endDragging: () => void;
}

/* El context Props es el estado del contexto*/
export const UIContext = createContext({} as ContextProps);
