import { createContext, useContext } from "react";


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
}

export const SDropDownContext = createContext<ISDropDownContext | undefined>(undefined);

export const useDropDown = () : ISDropDownContext => {
    const ctx = useContext(SDropDownContext);
    if (!ctx)
        throw new Error("Aucun context pour le DropDown");
    return ctx;
}

export const useOptionalDropDown = () : ISDropDownContext | undefined => useContext(SDropDownContext);