import type { ISSelectionInputValue } from "../../components/SSelectionCard/SSelectionInput/SSelectionInput.js";
import { createContext, useContext } from "react";


export interface ISSelectionDialogContext {
    /** Valeurs sélectionnées */
    values  : ISSelectionInputValue[],
}

export const SSelectionDialogContext = createContext<ISSelectionDialogContext | undefined>(undefined);
export const useOptionalSelectionDialog = () => useContext(SSelectionDialogContext);