import styles from "./STabSelectorItem.module.css";
import type { MaterialSymbol } from "material-symbols";
import 'material-symbols';
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols";
import { useId } from "react";
import * as React from "react";

export interface ISTabSelectorItem {
    /** Titre de l'onglet */
    texte   : string,
    /** Indique si l'onglet est actif, oui par défaut */
    enabled?    : boolean,
    /** Icône affichée devant le titre de l'onglet */
    icon        : MaterialSymbol,
    /** Indique si l'onglet est sélectionnée */
    selected?   : boolean,
    /** Méthode exécutée au clic sur l'onglet */
    onClick?    : () => void,
}

const STabSelectorItem = ( {
    texte,enabled=true,icon,selected,onClick,
}: ISTabSelectorItem ) => {

    const idElm : string = useId();

    const onClickElm = () : void => {
        if (!enabled) return;
        onClick?.();
    }

    const onKeyUp = (e : React.KeyboardEvent) : void => {
        if (!enabled) return;
        if (e.key === " ") onClick?.()
    }

    return (
        <div role="button" aria-labelledby={idElm} aria-disabled={!enabled} tabIndex={!enabled ? -1 : 0} onClick={onClickElm}
                onKeyUp={onKeyUp}
                className={`${styles.selector} ${!enabled?styles.disabled:''} ${selected?styles.selected:''}`}>
            <SMaterialSymbols fill={selected} icon={icon} />
            <p id={idElm}>{texte}</p>
        </div>
    );

}

export default STabSelectorItem;