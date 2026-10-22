import styles from "./SButton.module.css";
import 'material-symbols';
import type { MaterialSymbol } from "material-symbols";
import * as React from "react";

/** Variantes du bouton disponibles */
export type T_SButton_variant   = "primary" | "secondary" | "outline" | "ghost";
/** Taille d'affichage du bouton */
export type T_SButton_size      = "xs" | "sm" | "md" | "lg";

export interface ISButton {
    /** Différente variante du bouton, entre primaire, secondaire, outline ou ghost */
    variant     : T_SButton_variant,
    /** Texte affiché sur le bouton */
    text        : string,
    /** Taille du bouton entre large, medium, small ou extra-small */
    size?       : T_SButton_size,
    /** Indique si le bouton est désactivé ou non */
    disabled?   : boolean,
    /** Méthod exécutée au clic sur le bouton */
    onClick?    : (event : React.MouseEvent<HTMLButtonElement>) => void,
    /** Icône front, si vide, aucun */
    frontIcon?  : MaterialSymbol,
    /** Icône back, si vide, aucun */
    backIcon?   : MaterialSymbol,
}

const SButton = ( {variant, text, size = "md", disabled = false,onClick,frontIcon,backIcon}: ISButton ) => {

    return (
        <button onClick={onClick} disabled={disabled} className={`${styles.button} ${disabled?styles.disabled:""} ${styles[variant]} ${styles[size]}`}>
            {frontIcon&&<span className="material-symbols-rounded">{frontIcon}</span>}
            {text}
            {backIcon&&<span className="material-symbols-rounded">{backIcon}</span>}
        </button>
    );

}

export default SButton;