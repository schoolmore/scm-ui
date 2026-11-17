import * as React from "react";
import styles from "./SCenter.module.css";

/** Taille de l'espacement entre les éléments */
export type T_SCenterGap = "lg" | "default" | "sm";

export interface ISCenter {
    /** Contenu de l'élément */
    children    : React.ReactNode,
    /** Espacement entre les éléments */
    gap?        : T_SCenterGap,
    /** CSS personnalisé */
    custom?     : React.CSSProperties,
}

const SCenter = ( {
    children,custom,gap="default",
}: ISCenter ) => {

    return (
        <div className={`${styles.center} ${styles[gap]}`} style={custom}>
            {children}
        </div>
    );

}

export default SCenter;