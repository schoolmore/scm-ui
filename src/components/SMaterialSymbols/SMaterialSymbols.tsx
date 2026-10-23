import type { MaterialSymbol } from "material-symbols";
import styles from './SMaterialSymbols.module.css';

/** Taille disponible pour l'affiche d'une icône */
export type T_SMaterialSymbolsSize = "xxl" | "xl" | "lg" | "default" | "sm" | "xs";
/** Graisse disponible pour l'icône, entre 700 et 100 */
export type T_SMaterialSymbolsWeight = "extrabold" | "bold" | "semibold" | "medium" | "normal" | "light" | "thin";

export interface ISMaterialSymbols {
    /** Icône affichée */
    icon    : MaterialSymbol,
    /** Taille d'affichage de l'icône */
    size?   : T_SMaterialSymbolsSize,
    /** Indique si l'icône doit être remplie ou non */
    fill?   : boolean,
    /** Couleur d'affichage de l'icône */
    color?  : string,
    /** Graisse de l'icône, par défaut medium */
    weight? : T_SMaterialSymbolsWeight,
}

const SMaterialSymbols = ( {
        icon,size="default",fill=false,color="#000",weight="normal"
}: ISMaterialSymbols ) => {

    return (
        <span
            aria-hidden="true"
            style={{color}}
            className={`material-symbols-rounded ${styles.icon} ${styles[size]} ${fill?styles.fill:''} ${styles[weight]}`}
        >
            {icon}
        </span>
    );

}

export default SMaterialSymbols;