import styles from "./SAvatar.module.css";

/** Liste des tailles disponibles pour l'avatar */
export type T_SAvatarSize = "xs" | "sm" | "default" | "lg" | "xl";

export interface ISAvatar {
    /** Taille d'affichage du composant */
    size?       : T_SAvatarSize,
    /** Texte affiché sur l'avatar (2 caractères uniquement) */
    texte       : string,
}

const SAvatar = ( {
    size = "default",texte
}: ISAvatar ) => {

    return (
        <div role="img" aria-label={texte} className={`${styles.avatar} ${styles[size]}`}>
            <p aria-hidden="true">{texte.substring(0,2)}</p>
        </div>
    );

}

export default SAvatar;