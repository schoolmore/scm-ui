import styles from "./SDialogTitle.module.css";
import SMaterialSymbols from "../../SMaterialSymbols/SMaterialSymbols.js";
import * as React from "react";

export interface ISDialogTitle {
    /** Titre du dialogue */
    title           : string,
    /** Afficher le bouton de fermeture, oui par défaut */
    close?          : boolean,
    /** Méthode exécutée au clic sur le bouton de fermeture */
    onClick?        : () => void,
    /** Indique si le modale est movable, non par défaut */
    isMovable?      : boolean,
    /** Méthodes exécutées lors que l'utilisateur clic sur le titre */
    handleProps?    : React.HTMLAttributes<HTMLElement>,
}

const SDialogTitle = ( {
    title,close = true,onClick,isMovable=false,handleProps,
}: ISDialogTitle ) => {

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (e.key === " ") onClick?.()
    }

    return (
        <header {...handleProps} className={`${styles.title} ${isMovable?styles.movable:''}`}>
            <p>{title}</p>
            {close&&(
                <div tabIndex={0} onKeyDown={onKeyDown}
                        onPointerDown={e => e.stopPropagation()} onClick={onClick}
                        className={styles.closeBtn}>
                    <SMaterialSymbols weight="bold" icon="close" size="lg" />
                </div>
            )}
        </header>
    );

}

export default SDialogTitle;