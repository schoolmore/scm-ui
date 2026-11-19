import { createContext, useContext } from "react";


export interface ISSelectionCardContext {
    /** Modifier l'état de la carte parent */
    setSelected : (v : boolean) => void,
    /** Désactiver/activer l'état parent */
    setDisabled : (v : boolean) => void,
    /** Lors de la sélection (clic ou space) sur la carte parent */
    onSelect    : () => void,
}

export const SSelectionCardContext = createContext<ISSelectionCardContext | undefined>(undefined);

export const useSelectionCard = () : ISSelectionCardContext | undefined => useContext(SSelectionCardContext);