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
}

const SSideBarItem = ( {
    selected=false,disabled=false,icon,
}: ISSideBarItem ) => {

    return (
        <div tabIndex={disabled?-1:0} aria-disabled={disabled}
            className={`${styles.item} ${selected?styles.selected:''} ${disabled?styles.disabled:''}`}>
            <SMaterialSymbols icon={icon} size="lg" weight={"light"} />
        </div>
    );

}

export default SSideBarItem;