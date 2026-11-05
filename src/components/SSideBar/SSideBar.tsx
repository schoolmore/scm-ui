import styles from "./SSideBar.module.css";
import useIsMobile from "../../hooks/useMobile.js";
import * as React from "react";
import { useEffect } from "react";
import type { MaterialSymbol } from "material-symbols";
import { useSideBar } from "../../context/SSideBar/SSideBarContext.js";
import SSideBarItem from "./SSideBarItem/SSideBarItem.js";
import SInnerSideBar from "./SInnerSideBar/SInnerSideBar.js";
import SInnerSideBarTitle from "./SInnerSideBar/SInnerSideBarTitle/SInnerSideBarTitle.js";
import SInnerSideBarItem from "./SInnerSideBar/SInnerSideBarItem/SInnerSideBarItem.js";

export interface ISSideBar {
    /** Lien vers le logo de l'application */
    icon            : string,
    /** Catégories et onglets de la navigation */
    items           : ISideBarCreator[],
    /** Pied de page de la sidebar */
    end?            : React.ReactNode,
    /** Indique si la barre de navigation est dépliée */
    collapsed?      : boolean,
}

/**
 * Liste à passer en paramètre pour créer la
 * navigation
 */
export interface ISideBarCreator {
    /** Identifiant unique */
    id          : string,
    /** Icône de l'item */
    icon        : MaterialSymbol,
    /** Désactiver l'entrée */
    disabled?   : boolean,
    /** Titre de la catégorie */
    title       : string,
    /** Liste des onglets */
    tabs        : ISideBarOngletCreator[],
}

/**
 * Onglets disponibles dans l'application. Un onglet
 * appartient à un item parent
 */
export interface ISideBarOngletCreator {
    /** identifiant unique */
    id          : string,
    /** Nom de l'onglet */
    name        : string,
    /** Page affiché sur l'écran à la sélection */
    page        : React.ReactNode,
    /** Désactiver l'onglet */
    disabled?   : boolean,
    /** nombre de notifications */
    notif?      : number,
}

const SSideBar = ( {
    icon,items,end,
}: ISSideBar ) => {

    const isMobile = useIsMobile();
    const { setItems, activeItem, activeTab, selectItem, selectTab, mainId } = useSideBar();

    // Enregistre les catégories dans le contexte de SScmApp
    useEffect(() => {
        setItems(items);
    }, [items, setItems]);

    /** Donne le focus au contenu principal (les identifiants de useId ne sont pas fiables en ancre) */
    const skipToContent = (e : React.MouseEvent<HTMLAnchorElement>) : void => {
        e.preventDefault();
        document.getElementById(mainId)?.focus();
    }

    if (isMobile) return null;

    const titleNotif : number = activeItem?.tabs.reduce((sum, t) => sum + (t.notif ?? 0), 0) ?? 0;

    return (
        <div className={styles.wrapper}>
            <a href={`#${mainId}`} className={styles.skipLink} onClick={skipToContent}>Aller au contenu</a>
            <nav className={styles.sidebar} aria-label="Navigation principale">
                <div className={styles.first}>
                    <img src={icon} alt="Logo de l'application" draggable={false}/>
                    <ul className={styles.content}>
                        {items.map(item => (
                            <li key={item.id}>
                                <SSideBarItem icon={item.icon} label={item.title} disabled={item.disabled}
                                    selected={item.id === activeItem?.id}
                                    onClick={() => selectItem(item.id)} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {end}
                </div>
            </nav>
            {activeItem &&
                <SInnerSideBar label={activeItem.title}>
                    <SInnerSideBarTitle title={activeItem.title} notif={titleNotif} />
                    <ul>
                        {activeItem.tabs.map(tab => (
                            <li key={tab.id}>
                                <SInnerSideBarItem name={tab.name} notif={tab.notif}
                                    disabled={tab.disabled} selected={tab.id === activeTab?.id}
                                    onClick={() => selectTab(tab.id)} />
                            </li>
                        ))}
                    </ul>
                </SInnerSideBar>
            }
        </div>
    );

}

export default SSideBar;
