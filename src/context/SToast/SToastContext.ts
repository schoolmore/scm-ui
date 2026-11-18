import { createContext, useContext } from "react";


export interface ISToastContext {
    /** Modifier l'affichage ou non du toast */
    close: () => void,
}

export const SToastContext = createContext<ISToastContext | undefined>(undefined);

export const useToast = () : ISToastContext => {
    const ctx = useContext(SToastContext);
    if (!ctx)
        throw new Error("Le context du toast n'est pas défini");
    return ctx;
}