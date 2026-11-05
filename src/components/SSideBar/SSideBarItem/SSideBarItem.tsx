import styles from "./SSideBarItem.module.css";
import type { MaterialSymbol } from "material-symbols";
import SMaterialSymbols from "../../SMaterialSymbols/SMaterialSymbols.js";


export interface ISSideBarItem {
    /** Indique si la catégorie est sélectionnée */
    selected?   : boolean,
    /** Indique si la catégorie est désactivée */
    disabled?   : boolean,
    /** Icône affichée sur l'item */
    icon        : MaterialSymbol,
    /** Nom accessible de la catégorie (lu par les lecteurs d'écran) */
    label       : string,
    /** Au clic sur la catégorie */
    onClick?    : () => void,
}

const SSideBarItem = ( {
    selected=false,disabled=false,icon,label,onClick,
}: ISSideBarItem ) => {

    const handleClick = () : void => {
        if (disabled) return;
        onClick?.()
    }

    return (
        <button type="button" disabled={disabled} onClick={handleClick} aria-label={label}
            aria-current={selected ? "true" : undefined} title={label}
            className={`${styles.item} ${selected?styles.selected:''} ${disabled?styles.disabled:''}`}>
            <SMaterialSymbols icon={icon} size="lg" weight={"light"} />
        </button>
    );

}

export default SSideBarItem;