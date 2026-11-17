import { createContext, useContext } from "react";


export interface ISLoadingDialogContext {
    /** Indique si le chargement est actif */
    isOpen          : boolean,
    /** Titre court du chargement */
    title           : string,
    /** Description facultative du chargement */
    description     : string | undefined,
    /** Modifier le statut d'ouverture */
    toggle          : (v : boolean) => void,
    /** Modifier la valeur du titre */
    setTitle        : (s: string) => void,
    /** Modifier la description */
    setDescription  : (d? : string) => void,
}

export const SLoadingDialogContext = createContext<ISLoadingDialogContext | undefined>(undefined);

export const useLoadingDialog = () : ISLoadingDialogContext => {
    const ctx = useContext(SLoadingDialogContext);
    if (!ctx)
        throw new Error("Le context du loading dialog n'est pas défini");
    return ctx;
}