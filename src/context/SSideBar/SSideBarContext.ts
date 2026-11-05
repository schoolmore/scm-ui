import { createContext, useContext } from "react";
import type { ISideBarCreator, ISideBarOngletCreator } from "../../components/SSideBar/SSideBar.js";


export interface ISSideBarContext {
    /** Catégories enregistrées par la SSideBar */
    items           : ISideBarCreator[],
    /** Enregistrer les catégories de la navigation */
    setItems        : (items : ISideBarCreator[]) => void,
    /** Catégorie actuellement sélectionnée */
    activeItem      : ISideBarCreator | undefined,
    /** Onglet actuellement sélectionné */
    activeTab       : ISideBarOngletCreator | undefined,
    /** Sélectionner une catégorie (ouvre son premier onglet disponible) */
    selectItem      : (id : string) => void,
    /** Sélectionner un onglet de la catégorie active */
    selectTab       : (id : string) => void,
    /** Identifiant du contenu principal (cible du lien d'évitement) */
    mainId          : string,
}

export const SSideBarContext = createContext<ISSideBarContext | undefined>(undefined);

export const useSideBar = () : ISSideBarContext => {
    const ctx = useContext(SSideBarContext);
    if (!ctx)
        throw new Error("Aucun contexte pour la SideBar : le composant doit être placé dans un SScmApp");
    return ctx;
}
