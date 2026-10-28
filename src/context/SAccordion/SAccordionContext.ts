import { createContext, useContext } from "react";

/** Liste des tailles disponibles pour l'accordéon */
export type T_SAccordionSize = "default" | "sm" | "xs";

export interface ISAccordionContext {
    /** Savoir si l'accordéon est ouvert */
    isExpanded  : boolean,
    /** Modifier l'état d'ouverture de l'accordéon */
    toggle      : () => void,
    /** Taille d'affichage de l'accordéon */
    size        : T_SAccordionSize,
    /** Indique si l'accordéon est désactivé ou non */
    disabled    : boolean,
}

export const SAccordionContext = createContext<ISAccordionContext | undefined>(undefined);

export const useAccordion = () : ISAccordionContext => {
    const ctx = useContext(SAccordionContext);
    if (!ctx)
        throw new Error("Aucun contexte d'accordéon !");
    return ctx;
}