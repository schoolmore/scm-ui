import { createContext, useContext } from "react";


export interface ISFieldContext {
    /** Identifiant à placer sur le contrôle (ID de l'input) */
    id      : string,
    /** Identifiant du label, pour les contrôles non natifs (aria-labellledby) */
    labelId : string,
}

export const SFieldContext = createContext<ISFieldContext | undefined>(undefined);

export const useOptionalField = () : ISFieldContext | undefined => useContext(SFieldContext);