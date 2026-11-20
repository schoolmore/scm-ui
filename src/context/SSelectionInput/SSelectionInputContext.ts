import { createContext, useContext } from "react";
import type { ISSelectionInputValue } from "../../components/SSelectionCard/SSelectionInput/SSelectionInput.js";


export interface ISSelectionInputContext {
    /** Lorsqu'une valeur est sélectionnée */
    onValueChange   : (v : ISSelectionInputValue) => void,
    /** Valeur actuellement sélectionnée */
    values          : ISSelectionInputValue[],
}

export const SSelectionInputContext = createContext<ISSelectionInputContext | undefined>(undefined);

export const useSelectionInput = () : ISSelectionInputContext => {
    const ctx = useContext(SSelectionInputContext);
    if (!ctx)
        throw new Error("La carte doit être inclus avec le champ parent");
    return ctx;
}