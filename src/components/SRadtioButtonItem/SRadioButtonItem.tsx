import styles from "./SRadioButtonItem.module.css";
import * as React from "react";
import { useId } from "react";


export interface ISRadioButtonItem {
    /** Valeur de l'élément */
    value       : string,
    /** Indique si l'élément est désactivé */
    disabled?   : boolean,
    /** Indique si l'élément est sélectionné */
    selected?   : boolean,
    /** Méthode exécuté au clic sur la coche */
    onClick?    : () => void
}

const SRadioButtonItem = ( {
    value,disabled = false,selected=false,onClick
}: ISRadioButtonItem ) => {

    const triggeredClick = () : void => {
        if (disabled) return;
        onClick?.()
    }

    const onKeyDonw = (e : React.KeyboardEvent) : void => {
        if (disabled) return;
        if (e.key === " ") triggeredClick();
    }

    const idElm : string = useId();
    const idLabel : string = useId();

    return (
        <div aria-disabled={disabled} role="radio" aria-labelledby={idLabel} tabIndex={disabled?-1:0}
                onKeyDown={onKeyDonw} onClick={triggeredClick}
                className={`${styles.rb} ${disabled?styles.disabled:''} ${selected?styles.checked:''}`}>
            <div id={idElm} className={styles.rbContent}></div>
            <label id={idLabel} htmlFor={idElm}>{value}</label>
        </div>
    );

}

export default SRadioButtonItem;