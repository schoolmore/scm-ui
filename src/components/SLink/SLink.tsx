import styles from "./SLink.module.css";
import * as React from "react";
import 'material-symbols';


export interface ISLink {
    /** Texte affiché sur le lien */
    texte       : string,
    /** Indique si le lien s'ouvre dans un nouvel onglet */
    blank?      : boolean,
    /** Méthode exécutée au clic sur le lien */
    onClick?    : (e? : React.MouseEvent<HTMLAnchorElement>) => void,
}

const SLink = ( {
    texte,blank = false,onClick,
}: ISLink ) => {

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (e.key === " ") onClick?.()
    }

    return (
        <a tabIndex={0} onKeyDown={onKeyDown}
            className={`${styles.link} ${blank?styles.blank:''}`} aria-label={texte} onClick={onClick}>
            <span>{texte}</span>
        </a>
    );

}

export default SLink;