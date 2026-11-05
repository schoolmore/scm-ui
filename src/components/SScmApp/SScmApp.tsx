import * as React from "react";
import { useId, useState } from "react";
import styles from "./SScmApp.module.css";
import { SSideBarContext } from "../../context/SSideBar/SSideBarContext.js";
import type { ISideBarCreator, ISideBarOngletCreator } from "../SSideBar/SSideBar.js";

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
            <div className={styles.app}>
                {children}
            </div>
        </SSideBarContext.Provider>
    );

}

export default SScmApp;
