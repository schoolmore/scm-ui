import * as React from "react";
import styles from "./SButtonSSO.module.css";
import SAppIcon from "../SAppIcon/SAppIcon";
import SLoadingSpinner from "../SLoadingSpinner/SLoadingSpinner.js";


export interface ISButtonSSO {
    /** Méthode exécutée au clic sur le bouton */
    onClick?    : (e : React.MouseEvent) => void,
    /** Indique si le bouton est actif */
    disabled?   : boolean,
    /** Indique si l'état du bouton est en chargement */
    isLoading?  : boolean,
    /** Texte de remplacement affiché sur le bouton */
    text?       : string,
}

const SButtonSSO = ( {
    onClick,disabled=false,isLoading=false,text="Connexion avec SchoolMore SSO",
}: ISButtonSSO ) => {

    return (
        <button
            disabled={disabled}
            className={`${styles.button} ${disabled?styles.disabled:''} ${isLoading?styles.loading:''}`}
            onClick={onClick}
        >
            {isLoading&&<SLoadingSpinner size="sm" />}
            {!isLoading&&<SAppIcon variant="scm-app" size="xs" />}
            <p>{text}</p>
        </button>
    );

}

export default SButtonSSO;