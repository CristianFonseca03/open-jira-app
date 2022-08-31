import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];

  /* Methods: hago esto para que en EntriesProvider Typescript no se queje */
  addNewEntry: (description: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);
