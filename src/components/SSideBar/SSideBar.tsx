import styles from "./SSideBar.module.css";
import useIsMobile from "../../hooks/useMobile.js";
import * as React from "react";

export interface ISSideBar {
    /** Lien vers le logo de l'application */
    icon            : string,
    /** Contenu de la side bar */
    children        : React.ReactNode,
    /** Pied de page de la sidebar */
    end?            : React.ReactNode,
    /** Indique si la barre de navigation est dépliée */
    collapsed?      : boolean,
}

const SSideBar = ( {
    icon,children,end,collapsed=false,
}: ISSideBar ) => {

    const isMobile = useIsMobile();

    if (isMobile) return null;

    return (
        <nav className={styles.sidebar}>
            <div className={styles.first}>
                <img src={icon} alt="Logo de l'application" draggable={false}/>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <div>
                {end}
            </div>
        </nav>
    );

}

export default SSideBar;