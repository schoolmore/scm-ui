import * as React from "react";
import type { MaterialSymbol } from "material-symbols";
import 'material-symbols';
import styles from "./SBadge.module.css";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols";


/** Variantes disponibles pour le badge */
export type T_SBadgeVariant = "danger" | "warning" | "infos" | "success" | "muted";
/** Liste des tailles disponibles pour le badge */
export type T_SBadgeSize = "lg" | "default" | "sm" | "xs";

export interface ISBadge {
    /** Texte affiché sur le badge */
    texte   : string,
    /** Variante du badge */
    variant : T_SBadgeVariant,
    /** Style personnalisé */
    custom? : React.CSSProperties,
    /** Taille d'affichage du badge */
    size?   : T_SBadgeSize,
    /** Icône affichée devant le badge */
    frontIcon?  : MaterialSymbol,
    /** Icône affichée derrière le badge */
    backIcon?   : MaterialSymbol,
}

const SBadge = ( {
    texte,variant,custom,size = "default",frontIcon,backIcon,
}: ISBadge ) => {

    return (
        <div style={custom} className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
            {frontIcon&&<SMaterialSymbols icon={frontIcon} size={size} />}
            <span className={styles.texte}>{texte}</span>
            {backIcon&&<SMaterialSymbols icon={backIcon} size={size} />}
        </div>
    );

}

export default SBadge;