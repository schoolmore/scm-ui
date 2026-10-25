import * as React from "react";
import styles from "./SButtonGroup.module.css";

export interface ISButtonGroup {
    /** Boutons enfants */
    children    : React.ReactNode,
    /** Indique si le groupe doit remplir 100% ou non (par défaut non) */
    fitWidth?   : boolean,
}

const SButtonGroup = ( {
    children,fitWidth=false,
}: ISButtonGroup ) => {

    return (
        <div className={`${styles.group} ${fitWidth?styles.fitWidth:''}`}>
            {children}
        </div>
    );

}

export default SButtonGroup;