import styles from "./SNotificationIndicator.module.css";

/** Tailles d'affichages disponibles pour les notifications */
export type T_SNotificationIndicatorSize = "default" | "sm" | "xs";
/** Variantes d'affichage pour les notifications */
export type T_SNotificationIndicatorVariant = "primary" | "secondary";

export interface ISNotificationIndicator {
    /** Nombre de notifications */
    number      : number,
    /** Taille d'affichage de la notification */
    size?       : T_SNotificationIndicatorSize,
    /** Variante d'affichage de la notification */
    variant?    : T_SNotificationIndicatorVariant,
}

const SNotificationIndicator = ( {
    number,size="default",variant="primary",
}: ISNotificationIndicator ) => {

    if (number <= 0) return null;

    const txtNotif : string = number >= 10 ? "9+" : number+"";

    return (
        <div className={`${styles.notification} ${styles[variant]} ${styles[size]}`}>
            <p>{txtNotif}</p>
        </div>
    );

}

export default SNotificationIndicator;