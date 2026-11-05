import * as React from "react";
import styles from "./SInnerSideBar.module.css";

export interface ISInnerSideBar {
    /** Onglets */
    children    : React.ReactNode,
    /** Nom accessible de la navigation (lu par les lecteurs d'écran) */
    label?      : string,
}

const SInnerSideBar = ( {
    children,label,
}: ISInnerSideBar ) => {

    return (
        <nav className={styles.innerSideBar} aria-label={label}>
            {children}
        </nav>
    );

}

export default SInnerSideBar;