import styles from "./SCheckbox.module.css";
import { useId, useState } from "react";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols.js";


/** Liste des états possibles pour une checkbox */
export type T_SCheckboxState = "off" | "on" | "indeterminate";
/** Liste des tailles pour la checkbox */
export type T_SCheckboxSize = "lg" | "default" | "sm" | "xs";

export interface ISCheckbox {
    /** Texte associée à la checkbox */
    label?      : string,
    /** État de la checkbox, par défaut off */
    state?      : T_SCheckboxState,
    /** Indique si la checkbox est désactivée ou non */
    disabled?   : boolean,
    /** Fonction de callback au changement d'état */
    onChange?   : (v : boolean) => void,
    /** Taille d'affichage de la checkbox */
    size?       : T_SCheckboxSize,
}

const SCheckbox = ( {
    label,state,disabled,onChange,size = "default",
}: ISCheckbox ) => {

    const [etat,setEtat] = useState<T_SCheckboxState>(state ?? "off");

    const idLabel : string = useId();

    const toggle = () => {
        if (disabled) return;
        const next : T_SCheckboxState = etat === "on" ? "off" : "on";
        setEtat(next);
        onChange?.(next === "on");
    };

    return (
        <div onClick={toggle}
                tabIndex={disabled?-1:0}
                onKeyDown={(e) => {
                    if (e.key === " ") {
                        e.preventDefault();
                        toggle();
                    }
                }}
                className={`${styles.cbParent} ${disabled?styles.disabled:''} ${styles[size]}`}>
            <div role="checkbox"
                    aria-labelledby={label ? idLabel : undefined}
                    aria-checked={etat==="indeterminate"?"mixed":etat==="on"} aria-disabled={disabled}
                    className={`${styles.checkbox} ${etat!=="off"?styles.checked:''}`}
            >
                {etat==="on" && <SMaterialSymbols weight="medium" icon="check" size="default" />}
                {etat==="indeterminate"&&<SMaterialSymbols icon="remove" weight="medium" size="default" />}
            </div>
            {label&&<p id={idLabel} className={styles.label}>{label}</p>}
        </div>
    );

}

export default SCheckbox;