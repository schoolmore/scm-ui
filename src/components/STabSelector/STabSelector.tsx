import STabSelectorItem, { type ISTabSelectorItem } from "../STabSelectorItem/STabSelectorItem.js";
import styles from "./STabSelector.module.css";
import 'material-symbols';
import { useState } from "react";

export interface ISTabSelector {
    /** Onglets disponibles */
    tabs        : ISTabSelectorItem[],
    /** méthode exécutée au changement d'onglet */
    onChange?   : (i : number) => void,
    /** Index de l'onglet déjà sélectionné */
    selected?   : number,
}

const STabSelector = ( {
    tabs = [],onChange,selected,
}: ISTabSelector ) => {

    const [numSelected,setNumSelected] = useState<number>(selected?selected:0);

    const triggeredClick = (n : number) : void => {
        setNumSelected(n);
        onChange?.(n);
    }

    return (
        <div role="region" className={styles.tabPrt}>
            {tabs.map(((t : ISTabSelectorItem,i : number)=> (
                <STabSelectorItem key={i} {...t} onClick={() => triggeredClick(i)} selected={numSelected===i} />
            )))}
        </div>
    );

}

export default STabSelector;