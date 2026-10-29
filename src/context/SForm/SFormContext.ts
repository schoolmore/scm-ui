import { createContext, useContext } from "react";


export interface ISFormContext {
    /** Enregistre un champ et sa méthode de validation */
    register    : (id : string, validate : () => string | undefined) => void,
    /** Retire un champ du formulaire */
    unregister  : (id : string) => void,
}

export const SFormContext = createContext<ISFormContext | undefined>(undefined);

export const useForm = () : ISFormContext => {
    const ctx = useContext(SFormContext);
    if (!ctx)
        throw new Error("Aucun contexte pour le formulaire");
    return ctx;
}

export const useOptionalForm = () : ISFormContext | undefined => useContext(SFormContext);