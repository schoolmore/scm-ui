import type { MaterialSymbol } from "material-symbols";
import 'material-symbols';
import styles from "./SEmptyState.module.css";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols";
import SButton from "../SButton/SButton";
import * as React from "react";

/** Options pour les couleurs de fond de l'icône */
export type T_SEmptyStateBackground = "muted" | "white";

export interface ISEmptyState {
    /** Gros titre */
    title           : string,
    /** Icône affichée */
    icon            : MaterialSymbol,
    /** Courte description */
    description?    : string,
    /** Couleur de fond derrière l'icône, muted (base) ou blanc */
    background?     : T_SEmptyStateBackground,
    /** Afficher un bouton, et exécuter une action au clic */
    onClick?        : (e : React.MouseEvent) => void,
    /** Texte affiché sur le bouton */
    buttonText?     : string,
}

const SEmptyState = ( {
    title,icon="deployed_code",description,background="muted",onClick,buttonText="Recharger"
}: ISEmptyState ) => {

    return (
        <div className={styles.emptyState}>
            <div className={`${styles.emptyIcon} ${background==="white"?styles.white:''}`}>
                <SMaterialSymbols icon={icon} size="xxl" />
            </div>
            <div className={styles.infos}>
                <h1>{title}</h1>
                {description&&<h2>{description}</h2>}
            </div>
            {onClick&&<SButton variant="secondary" text={buttonText} onClick={onClick} size="default" />}
        </div>
    );

}

export default SEmptyState;