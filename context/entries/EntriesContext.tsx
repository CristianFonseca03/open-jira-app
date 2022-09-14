import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];

  /* Methods: hago esto para que en EntriesProvider Typescript no se queje */
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackBar?: boolean) => void;
  deleteEntry: (entry: Entry, showSnackBar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);
