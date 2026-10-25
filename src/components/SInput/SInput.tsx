import styles from "./SInput.module.css";
import type { MaterialSymbol } from "material-symbols";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols";
import SInputErrorMessage from "../SInputErrorMessage/SInputErrorMessage";
import { useId, useState } from "react";
import 'material-symbols';


/** Taille disponible pour l'input */
export type T_SInputSize = "lg" | "default" | "sm";
/** Couleur de fond disponible pour l'input */
export type T_SInputBackground = "muted" | "white";

export interface ISInput {
    /** Label affiché au dessus de l'input */
    label?          : string,
    /** Placeholder affiché derrière l'input */
    placeholder     : string,
    /** Taille du champ de saisie */
    size?           : T_SInputSize,
    /** Valeur prédéfinie du champ */
    value?          : string,
    /** Icône devant l'input */
    icon            : MaterialSymbol,
    /** Méthode remontée à chaque appuie sur une touche */
    onChange?       : (v? : string) => void,
    /** Méthode exécutée à l'appuie sur la touche entrée */
    onEnter?        : (v? : string) => void,
    /** Méthode exécutée au focus du champ */
    onFocus?        : (v? : string) => void,
    /** Méthode exécutée à la perte de focus du champ */
    onBlur?         : (v? : string) => void,
    /** Méthode permettant de valider, ou non le formulaire. Si non valide
     * alors, on affiche le message d'erreur, et passe le formulaire en "error" variant */
    validate?       : (v? : string) => string | undefined,
    /** Indique si le champ est désactivé */
    disabled?       : boolean,
    /** Couleur de fond de l'input */
    background?     : T_SInputBackground,
}

const SInput = ( {
    placeholder,size="default",icon="title",value,disabled=false,label,background="muted",
    onChange,validate,onBlur,onEnter,onFocus,
}: ISInput ) => {

    const [error, setError] = useState<string>();

    const idForm  : string = useId();
    const idError : string = useId();

    return (
        <>
            {label&&<label className={styles.label} htmlFor={idForm}>{label}</label>}
            <div className={`${styles.inputPrt} ${error&&styles.error} ${styles[size]} ${disabled?styles.disabled:''} ${background==="white"?styles.white:''}`}>
                <div className={styles.icon}>
                    <SMaterialSymbols icon={icon} size="lg" color="var(--scm-ui-fg-placeholder)" />
                </div>
                <input
                    onChange={(e) => {
                        onChange?.(e.target.value);
                        if (error) setError(validate?.(e.target.value));
                    }}
                    onBlur={(e) => {
                        onBlur?.(e.target.value);
                        setError(validate?.(e.target.value));
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") onEnter?.(e.currentTarget.value)
                        setError(validate?.(e.currentTarget.value))
                    }}
                    onFocus={(e) => {
                        onFocus?.(e.target.value);
                    }}
                    aria-invalid={!!error}
                    id={idForm}
                    aria-describedby={idError}
                    aria-label={placeholder} disabled={disabled}
                    placeholder={placeholder} type="text" value={value}/>
            </div>
            {error&&<SInputErrorMessage idMsg={idError} message={error} />}
        </>
    );

}

export default SInput;