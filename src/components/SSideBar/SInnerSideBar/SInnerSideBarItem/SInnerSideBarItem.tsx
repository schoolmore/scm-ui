import styles from "./SInnerSideBarItem.module.css";
import SNotificationIndicator from "../../../SNotificationIndicator/SNotificationIndicator.js";

export interface ISInnerSideBarItem {
    /** Nom de l'onglet */
    name        : string,
    /** Nombre de notifications, 0 par défaut */
    notif?      : number,
    /** Indique si l'onglet est désactivé */
    disabled?   : boolean,
    /** Au clic sur l'onglet */
    onClick?    : () => void,
}

const SInnerSideBarItem = ( {
    name,notif=0,disabled=false,onClick
}: ISInnerSideBarItem ) => {

    const handleClick = () : void => {
        if (disabled) return;
        onClick?.()
    }

    return (
        <div tabIndex={disabled?-1:0} onClick={handleClick} role={"button"} className={`${styles.item}`}>
            <p>{name}</p>
            <SNotificationIndicator number={notif} />
        </div>
    );

}

export default SInnerSideBarItem;