import * as React from "react";
import styles from "./SInnerSideBar.module.css";

export interface ISInnerSideBar {
    /** Onglets */
    children    : React.ReactNode,
}

const SInnerSideBar = ( {
    children,
}: ISInnerSideBar ) => {

    return (
        <nav className={styles.innerSideBar}>
            {children}
        </nav>
    );

}

export default SInnerSideBar;