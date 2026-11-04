import { createContext, useContext } from "react";
import type * as React from "react";
import type { Placement, UseFloatingReturn, UseInteractionsReturn } from "@floating-ui/react";


export interface ISDropDownContext {
    /** Valeur actuellement sélectionnée */
    value           : string | undefined,
    /** Modifier la valeur sélectionnée */
    setValue        : (v : string) => void,
    /** Texte affiché sur l'input */
    text            : string,
    /** Modifier le texte affiché sur l'input */
    setText         : (s : string) => void,
    /** Indique l'état d'ouverture du dropdown */
    isOpen          : boolean,
    /** Modifier l'état d'ouverture du dropdown */
    toggle          : (v : boolean) => void,
    /** Enregistrer une valeur pour la recherche */
    register        : (v : string) => void,
    /** Récupérer toutes les valeurs pour la recherche */
    values          : Set<string>,
    /** Lorsque la recherche est mise à jour */
    searchUpdated   : (v? : string) => void,
    /** Contenu de la recherche */
    searchValue     : string,
    /** Enregistre l'élément trigger auprès de floating-ui */
    setReference    : UseFloatingReturn["refs"]["setReference"],
    /** Enregistre l'élément contenu auprès de floating-ui */
    setFloating     : UseFloatingReturn["refs"]["setFloating"],
    /** Styles de positionnement du contenu */
    floatingStyles  : React.CSSProperties,
    /** Placement final du contenu (après flip) */
    placement       : Placement,
    /** Props à appliquer sur le trigger */
    getReferenceProps : UseInteractionsReturn["getReferenceProps"],
    /** Props à appliquer sur le contenu */
    getFloatingProps  : UseInteractionsReturn["getFloatingProps"],
}

export const SDropDownContext = createContext<ISDropDownContext | undefined>(undefined);

export const useDropDown = () : ISDropDownContext => {
    const ctx = useContext(SDropDownContext);
    if (!ctx)
        throw new Error("Aucun context pour le DropDown");
    return ctx;
}

export const useOptionalDropDown = () : ISDropDownContext | undefined => useContext(SDropDownContext);