import { createContext, useContext } from "react";


export interface ISDialogContext {
    /** Indique si le dialogue est ouvert */
    isOpen  : boolean,
    /** Méthode d'ouverture du dialogue */
    toggle  : (v : boolean) => void,
}

export const SDialogContext = createContext<ISDialogContext | undefined>(undefined);

export const useDialog = () : ISDialogContext => {
    const ctx = useContext(SDialogContext);
    if (!ctx)
        throw new Error("Aucun contexte !");
    return ctx;
}