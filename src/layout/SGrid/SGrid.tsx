import styles from "./SGrid.module.css";
import * as React from "react";

export interface ISGrid {
    /** Nombre de colonnes, 1 par défaut */
    columns     : number,
    /** CSS personnalisé des colonnes */
    custom?     : React.CSSProperties,
    /** Contenu de la grille */
    children    : React.ReactNode,
}

const SGrid = ( {
    columns = 1,custom,children
}: ISGrid ) => {

    const columnsStyle : React.CSSProperties = {
        gridTemplateColumns: `repeat(${columns}, 1fr)`
    }

    return (
        <div style={{...columnsStyle, ...custom}} className={styles.grid}>
            {children}
        </div>
    );

}

export default SGrid;