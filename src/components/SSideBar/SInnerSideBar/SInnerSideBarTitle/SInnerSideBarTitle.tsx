import styles from "./SInnerSideBarTitle.module.css";
import SNotificationIndicator from "../../../SNotificationIndicator/SNotificationIndicator.js";

export interface ISInnerSideBarTitle {
    /** Titre de la section */
    title   : string,
    /** Nombre de notifications, aucune par défaut */
    notif?  : number,
}

const SInnerSideBarTitle = ( {
    title,notif=0
}: ISInnerSideBarTitle ) => {

    return (
        <div className={styles.title}>
            <h2>{title}</h2>
            <SNotificationIndicator number={notif} />
        </div>
    );

}

export default SInnerSideBarTitle;