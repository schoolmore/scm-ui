import type { MaterialSymbol } from "material-symbols";
import styles from "./SToggleIcon.module.css";
import SMaterialSymbols, { type T_SMaterialSymbolsSize } from "../SMaterialSymbols/SMaterialSymbols.js";

export interface ISToggleIcon {
    /** Icône affichée sur le bouton */
    icon        : MaterialSymbol,
    /** Indique si le bouton est coché */
    selected?   : boolean,
    /** Indique si le bouton est désactivé ou non */
    disabled?   : boolean,
    /** Méthode exécutée au clic sur le bouton */
    onClick?    : (v:boolean) => void,
    /** Taille d'affichage de l'icône */
    size?       : T_SMaterialSymbolsSize,
}

const SToggleIcon = ( {
    icon,selected=false,disabled=false,onClick,size,
}: ISToggleIcon ) => {

    const triggeredClick = () : void => {
        if (disabled) return;
        onClick?.(!selected);
    }

    return (
        <button
            className={`${styles.toggle} ${selected?styles.active:''} ${disabled?styles.disabled:''}`} tabIndex={disabled?-1:0} aria-disabled={disabled}
            onClick={triggeredClick}
        >
            <SMaterialSymbols size={size} icon={icon} />
        </button>
    );

}

export default SToggleIcon;