import styles from "./SDropDownItem.module.css";
import * as React from "react";
import { useDropDown } from "../../../context/SDropDown/SDropDownContext.js";


export interface ISDropDownItem {
    /** Contenu de l'item */
    children    : React.ReactNode,
    /** Valeur de l'élément */
    value       : string,
    /** Texte affiché dans l'input, par défaut affiche value */
    text?       : string,
    /** Indique si le choix est désactivé */
    disabled?   : boolean,
}

const SDropDownItem = ( {
    children,value,disabled=false,text,
}: ISDropDownItem ) => {

    const {toggle,setValue,value:vle,setText,searchValue} = useDropDown()

    const selected = value===vle;

    const triggeredSelected = () : void => {
        if (disabled) return;
        setValue(value);
        toggle(false);
        if (text) setText(text);
    }

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (disabled) return;
        if (e.key === " ") triggeredSelected();
    }

    if (searchValue && searchValue.length > 0) {
        if (searchValue && !(text ?? value).toLowerCase().includes(searchValue.toLowerCase()))
            return null;
    }

    return (
        <div role="listitem" onKeyDown={onKeyDown} tabIndex={disabled?-1:0} aria-disabled={disabled} aria-label={value}
                className={`${styles.item} ${disabled?styles.disabled:''} ${selected?styles.selected:''}`}
                onClick={triggeredSelected}
        >
            {children}
        </div>
    );

}

export default SDropDownItem;