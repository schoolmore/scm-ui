import * as React from "react";
import { useId, useState } from "react";
import styles from "./SScmApp.module.css";
import { SSideBarContext } from "../../context/SSideBar/SSideBarContext.js";
import type { ISideBarCreator, ISideBarOngletCreator } from "../SSideBar/SSideBar.js";
import { SLoadingDialogContext } from "../../context/SLoadingDialog/SLoadingDialogContext.js";

export interface ISScmApp {
    /** Contenu de l'application (SSideBar et SMainApp) */
    children    : React.ReactNode,
}

/** Premier élément non désactivé d'une liste */
const firstEnabled = <T extends { disabled? : boolean }>(list : T[]) : T | undefined =>
    list.find(e => !e.disabled);

const SScmApp = ( {
    children,
}: ISScmApp ) => {

    /** Loading dialog **/
    const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
    const [titleLoading, setTitleLoading] = useState<string>("Chargement en cours ...");
    const [descrLoading, setDescrLoading] = useState<string|undefined>(undefined);

    /**
     * Modifier la valeur d'ouverture du dialogue
     * Remettre à 0 les valeurs des titres et description du modal
     * @param {boolean} v
     */
    const toggleDialogLoading = (v : boolean) : void => {
        setIsLoadingOpen(v);
        if (v) return;
        setTitleLoading("Chargement en cours ...");
        setDescrLoading(undefined);
    }

    const [items, setItems] = useState<ISideBarCreator[]>([]);
    const [itemId, setItemId] = useState<string | undefined>(undefined);
    const [tabId, setTabId] = useState<string | undefined>(undefined);
    const mainId = useId();

    // Sélection effective : celle choisie si elle est valide, sinon le premier élément disponible
    const activeItem : ISideBarCreator | undefined =
        items.find(i => i.id === itemId && !i.disabled) ?? firstEnabled(items);
    const activeTab : ISideBarOngletCreator | undefined = activeItem
        ? activeItem.tabs.find(t => t.id === tabId && !t.disabled) ?? firstEnabled(activeItem.tabs)
        : undefined;

    const selectItem = (id : string) : void => {
        if (id === activeItem?.id) return;
        const item = items.find(i => i.id === id);
        if (!item || item.disabled) return;
        setItemId(id);
        setTabId(undefined);
    }

    const selectTab = (id : string) : void => {
        const tab = activeItem?.tabs.find(t => t.id === id);
        if (!tab || tab.disabled) return;
        setTabId(id);
    }

    return (
        <SSideBarContext.Provider value={{ items, setItems, activeItem, activeTab, selectItem, selectTab, mainId }}>
            <SLoadingDialogContext.Provider value={{
                isOpen: isLoadingOpen, toggle : toggleDialogLoading,description: descrLoading, title: titleLoading,
                setDescription: setDescrLoading, setTitle: setTitleLoading
            }}>
                <div className={styles.app}>
                    {children}
                </div>
            </SLoadingDialogContext.Provider>
        </SSideBarContext.Provider>
    );

}

export default SScmApp;
