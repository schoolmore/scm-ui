import * as React from "react";
import { useState } from "react";
import styles from "./SToggle.module.css";
import 'material-symbols';
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols";


export interface ISToggle {
    /** État actuel de la coche */
    state?      : boolean,
    /** Méthode exécutée au clic sur le toggle */
    onClick?    : (v : boolean) => void,
    /** Indique si le toggle est désactivé ou non */
    disabled?   : boolean,
}

const SToggle = ( {
    state=false,onClick,disabled,
}: ISToggle ) => {

    const [value,setValue] = useState<boolean>(state);

    const triggerClick = () : void => {
        if (disabled) return;
        const nextValue : boolean = !value;
        setValue(nextValue);
        onClick?.(nextValue);
    }

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (disabled) return;
        if (e.key === " ") triggerClick();
    }

    return (
        <div role="checkbox" tabIndex={disabled?-1:0} onKeyDown={onKeyDown} aria-disabled={disabled}
                className={`${styles.tglPrt} ${value?styles.checked:''} ${disabled?styles.disabled:''}`} onClick={triggerClick}
        >
            <div className={styles.toggle}>
                {value&&<SMaterialSymbols size="lg" icon="check" />}
                {!value&&<SMaterialSymbols size="lg" icon="close" />}
            </div>
        </div>
    );

}

export default SToggle;