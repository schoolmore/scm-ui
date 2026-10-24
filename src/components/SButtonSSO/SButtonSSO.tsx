import * as React from "react";
import styles from "./SButtonSSO.module.css";
import SAppIcon from "../SAppIcon/SAppIcon";


export interface ISButtonSSO {
    /** Méthode exécutée au clic sur le bouton */
    onClick?    : (e : React.MouseEvent) => void,
    /** Indique si le bouton est actif */
    disabled?   : boolean,
}

const SButtonSSO = ( {
    onClick,disabled = false,
}: ISButtonSSO ) => {

    return (
        <button
            disabled={disabled}
            className={`${styles.button} ${disabled?styles.disabled:''}`}
            onClick={onClick}
        >
            <SAppIcon variant="scm-app" size="xs" />
            <p>Connexion avec SchoolMore SSO</p>
        </button>
    );

}

export default SButtonSSO;