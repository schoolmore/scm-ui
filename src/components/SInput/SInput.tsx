import styles from "./SInput.module.css";
import type { MaterialSymbol } from "material-symbols";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols";
import SInputErrorMessage from "../SInputErrorMessage/SInputErrorMessage";
import { useEffect, useId, useRef, useState } from "react";
import 'material-symbols';
import { useOptionalForm } from "../../context/SForm/SFormContext.js";
import { type ISFieldContext, useOptionalField } from "../../context/SField/SFieldContext.js";
import * as React from "react";
import { useOptionalDropDown } from "../../context/SDropDown/SDropDownContext.js";


/** Taille disponible pour l'input */
export type T_SInputSize = "lg" | "default" | "sm";
/** Couleur de fond disponible pour l'input */
export type T_SInputBackground = "muted" | "white";

export interface ISInput {
    /** Placeholder affiché derrière l'input */
    placeholder     : string,
    /** Taille du champ de saisie */
    size?           : T_SInputSize,
    /** Valeur du champ en mode contrôlé */
    value?          : string,
    /** Valeur par défaut du champ */
    defaultValue?   : string,
    /** Clé du champ pour le formulaire */
    name            : string,
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
    /** Type de l'input (text par défaut) */
    type?           : React.HTMLInputTypeAttribute,
    /** Taille maximale de saisie d'un input */
    maxLength?      : number,
    /** Pas pour les champs numériques */
    step?           : number,
    /** Valeur minimale pour les champs numériques */
    min?            : number,
    /** Valeur maximale pour les champs numériques */
    max?            : number,
}

const SInput = ( {
    placeholder,size="default",icon="title",value,disabled=false,background="muted",defaultValue,
    onChange,validate,onBlur,onEnter,onFocus,name,type="text",maxLength,step,min,max,
}: ISInput ) => {

    const [error, setError] = useState<string>();
    const form = useOptionalForm();
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdown = useOptionalDropDown();


    /** ID du label parent */
    const fieldCtx   : ISFieldContext | undefined  = useOptionalField();
    const ownId : string = useId();

    const idForm  : string = fieldCtx?.id ?? ownId;
    const idError : string = useId();

    useEffect(() => {
        if (!form) return;
        form.register(idForm, () => {
            const err = validate?.(inputRef.current?.value);
            setError(err);
            return err;
        });
        return () => form.unregister(idForm);
    }, [form,inputRef,validate,idForm]);

    /** Gestion Dropdown */
    const valueDropdown : string | undefined = dropdown?.text ?? dropdown?.value;
    const [prevOpen, setPrevOpen] = useState<boolean | undefined>(dropdown?.isOpen);
    if (dropdown && dropdown.isOpen !== prevOpen) {
        setPrevOpen(dropdown.isOpen);
        if (!dropdown.isOpen) setError(validate?.(valueDropdown));
    }

    return (
        <>
            <div className={`${styles.inputPrt} ${error&&styles.error} ${styles[size]} ${disabled?styles.disabled:''} ${background==="white"?styles.white:''}`}>
                <div className={styles.icon}>
                    <SMaterialSymbols icon={icon} size="lg" color="var(--scm-ui-fg-placeholder)" />
                </div>
                <input
                    className={dropdown!==undefined?styles.dropdown:''}
                    name={name} ref={inputRef}
                    onChange={(e) => {
                        onChange?.(e.target.value);
                        if (error) setError(validate?.(e.target.value));
                    }}
                    readOnly={dropdown!==undefined}
                    onBlur={(e) => {
                        onBlur?.(e.target.value);
                        if (!dropdown) setError(validate?.(e.target.value));
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") onEnter?.(e.currentTarget.value)
                        setError(validate?.(e.currentTarget.value))
                    }}
                    onFocus={(e) => {
                        if (dropdown) dropdown.toggle(true);
                        onFocus?.(e.target.value);
                    }}
                    aria-invalid={!!error}
                    id={idForm} defaultValue={defaultValue}
                    aria-describedby={idError} step={step} min={min} max={max}
                    aria-label={placeholder} disabled={disabled} maxLength={maxLength}
                    placeholder={placeholder} type={type} value={valueDropdown||value}/>
                {dropdown?.value && (
                    <input type="hidden" aria-hidden={true} value={dropdown.value} name={`dropdown-${name}`}/>
                )}
            </div>
            {error&&<SInputErrorMessage idMsg={idError} message={error} />}
        </>
    );

}

export default SInput;