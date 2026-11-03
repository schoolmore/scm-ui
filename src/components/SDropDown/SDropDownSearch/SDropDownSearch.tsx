import * as React from "react";
import { SDropDownContext } from "../../../context/SDropDown/SDropDownContext.js";
import styles from "./SDropDownSearch.module.css";


export interface ISDropDownSearch {
    /** Contenu de la recherche */
    children    : React.ReactNode;
}

const SDropDownSearch = ( {
    children,
}: ISDropDownSearch ) => {

    return (
        <SDropDownContext.Provider value={undefined}>
            <div className={styles.search}>
                {children}
            </div>
        </SDropDownContext.Provider>
    );

}

export default SDropDownSearch;