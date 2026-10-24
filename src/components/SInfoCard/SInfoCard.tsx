import styles from "./SInfoCard.module.css";

/** Variantes disponibles pour la carte d'informations */
export type T_SInfoCardVariant = "infos" | "warning" | "danger" | "success";

export interface ISInfoCard {
    /** Type de message affiché */
    variant     : T_SInfoCardVariant,
    /** Message affiché */
    texte       : string,
}

const SInfoCard = ( {
    variant,texte
}: ISInfoCard ) => {

    return (
        <div className={`${styles.card} ${styles[variant]}`}>
            <p>{texte}</p>
        </div>
    );

}

export default SInfoCard;