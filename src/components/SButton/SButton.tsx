import styles from "./SButton.module.css";
import 'material-symbols';
import type { MaterialSymbol } from "material-symbols";
import * as React from "react";
import SLoadingSpinner, { type T_SLoadingSpinnerSize } from "../SLoadingSpinner/SLoadingSpinner.js";

/** Variantes du bouton disponibles */
export type T_SButton_variant   = "primary" | "secondary" | "outline" | "ghost";
/** Taille d'affichage du bouton */
export type T_SButton_size      = "xs" | "sm" | "default" | "lg";

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
    /** Identifiant du formulaire à soumettre */
    formId?     : string,
    /** Indique si le bouton est associé à une action en chargement */
    isLoading?  : boolean,
    /** Style personnalisé pour le bouton */
    custom?     : React.CSSProperties,
}

const SButton = ( {
        variant, text, size = "default", disabled = false,onClick,frontIcon,backIcon,formId,isLoading=false,custom,
}: ISButton ) => {

    const sizeSpinner : T_SLoadingSpinnerSize = {
        lg      : "xs",
        default : "xs",
        sm      : "xxs",
        xs      : "xxs"
    }[size] as T_SLoadingSpinnerSize;

    return (
        <button aria-label={text} onClick={onClick} disabled={disabled||isLoading}
                type={formId?'submit':'button'} form={formId}
                style={custom}
                className={`${styles.button} ${disabled?styles.disabled:""} ${styles[variant]} `+
                    `${isLoading?styles.loading:''} ${styles[size]} ${(frontIcon||backIcon)?styles.icon:''}`}>
            {(isLoading&&!disabled)&&<SLoadingSpinner variant={variant==="secondary"?'secondary':"primary"} size={sizeSpinner} />}
            {frontIcon&&<span className="material-symbols-rounded">{frontIcon}</span>}
            {text}
            {backIcon&&<span className="material-symbols-rounded">{backIcon}</span>}
        </button>
    );

}

export default SButton;