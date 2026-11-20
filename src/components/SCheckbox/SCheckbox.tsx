import styles from "./SCheckbox.module.css";
import { useId, useState } from "react";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols.js";
import 'material-symbols';


/** Liste des états possibles pour une checkbox */
export type T_SCheckboxState = "off" | "on" | "indeterminate";
/** Liste des tailles pour la checkbox */
export type T_SCheckboxSize = "lg" | "default" | "sm" | "xs";

export interface ISCheckbox {
    /** Texte associée à la checkbox */
    label?          : string,
    /** État par défaut, sans mode contrôlé, "off" par défaut */
    defaultState?   : T_SCheckboxState,
    /** État de la checkbox en mode contrôlé */
    state?          : T_SCheckboxState,
    /** Indique si la checkbox est désactivée ou non */
    disabled?       : boolean,
    /** Fonction de callback au changement d'état */
    onChange?       : (v : boolean) => void,
    /** Taille d'affichage de la checkbox */
    size?           : T_SCheckboxSize,
    /** Clé de la checkbox pour le formulaire, "none" pour ne pas retourner la valeur */
    name            : string | "none",
    /** Désactivé le focus */
    disableFocus?   : boolean,
}

const SCheckbox = ( {
    label,state,disabled,onChange,size = "default",name,defaultState="off",disableFocus=false,
}: ISCheckbox ) => {

    const [etat,setEtat] = useState<T_SCheckboxState>(defaultState);
    const isControlled = state !== undefined;
    const currentState : T_SCheckboxState = isControlled ? state : etat;

    const idLabel : string = useId();

    const toggle = () => {
        if (disabled) return;
        const next : T_SCheckboxState = currentState === "on" ? "off" : "on";
        setEtat(next);
        onChange?.(next === "on");
    };

    return (
        <div onClick={toggle}
                tabIndex={(disabled||disableFocus)?-1:0}
                onKeyDown={(e) => {
                    if (e.key === " ") {
                        e.preventDefault();
                        toggle();
                    }
                }}
                className={`${styles.cbParent} ${disabled?styles.disabled:''} ${styles[size]}`}>
            <div role="checkbox"
                    aria-labelledby={label ? idLabel : undefined}
                    aria-checked={currentState==="indeterminate"?"mixed":currentState==="on"} aria-disabled={disabled}
                    className={`${styles.checkbox} ${currentState!=="off"?styles.checked:''}`}
            >
                {currentState==="on" && <SMaterialSymbols weight="medium" icon="check" size="default" />}
                {currentState==="indeterminate"&&<SMaterialSymbols icon="remove" weight="medium" size="default" />}
            </div>
            {label&&<p id={idLabel} className={styles.label}>{label}</p>}
            {name!=="none"&&(
                <input type="hidden" name={name} value={(currentState!=="off")+""}/>
            )}
        </div>
    );

}

export default SCheckbox;