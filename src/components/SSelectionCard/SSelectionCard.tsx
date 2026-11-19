import styles from "./SSelectionCard.module.css";
import * as React from "react";

export interface ISSelectionCard {
    /** Contenu de la carte */
    children    : React.ReactNode,
}

const SSelectionCard = ( {
    children,
}: ISSelectionCard ) => {

    // TODO : Mettre contexte

    return (
        <article className={styles.card}>
            {children}
        </article>
    );

}

export default SSelectionCard;