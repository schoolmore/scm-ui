import styles from "./SSideBarItem.module.css";
import SNotificationIndicator from "../../SNotificationIndicator/SNotificationIndicator.js";

export interface ISSideBarItem {
    /** Nom de la catégorie */
    name        : string,
    /** Indique si la catégorie est sélectionnée */
    selected?   : boolean,
    /** Indique si la catégorie est désactivée */
    disabled?   : boolean,
    /** Nombre de notifications */
    notif?      : number,
    /** Indique si la barre de navigation est fermée */
    collapsed?  : boolean,
}

const SSideBarItem = ( {
    name,selected=false,disabled=false,notif=0,collapsed=false,
}: ISSideBarItem ) => {

    if (collapsed) return null;

    return (
        <div aria-disabled={disabled} tabIndex={disabled?-1:0}
                className={`${styles.item} ${disabled?styles.disabled:''} ${selected?styles.selected:''}`}>
            <p>{name}</p>
            <SNotificationIndicator size="xs" number={notif} />
        </div>
    );

}

export default SSideBarItem;