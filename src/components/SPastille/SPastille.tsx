import styles from "./SPastille.module.css"

/** Tailles disponibles pour la pastille */
export type T_SPastilleSize = "xl" | "lg"| "default" | "sm";

export interface ISPastille {
    /** Couleur d'affichage de la pastille */
    color   : string,
    /** Taille de la pastille */
    size?   : T_SPastilleSize,
}

const SPastille = ( {
    color,size = "default"
}: ISPastille ) => {

    return (
        <div style={{background : color}} className={`${styles.pastille} ${styles[size]}`}></div>
    );

}

export default SPastille;