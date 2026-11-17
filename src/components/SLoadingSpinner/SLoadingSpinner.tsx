import styles from "./SLoadingSpinner.module.css";

/** Tailles disponibles pour le spinner */
export type T_SLoadingSpinnerSize = "xxl" | "xl" | "lg" | "default" | "sm" | "xs" | "xxs";
/** Variante d'affichage */
export type T_SLoadingSpinnerVariant = "primary" | "secondary";

export interface ISLoadingSpinner {
    /** Taille d'affichage, `default` de base */
    size?       : T_SLoadingSpinnerSize,
    /** Affichage de la variante, primary par défaut */
    variant?    : T_SLoadingSpinnerVariant,
}

const SLoadingSpinner = ( {
    size="default",variant="primary"
}: ISLoadingSpinner ) => {

    return (
        <span className={`${styles.loading} ${styles[variant]} ${styles[size]}`}></span>
    );

}

export default SLoadingSpinner;