import { useEffect, useId, useRef, useState } from "react";
import SInputErrorMessage from "../SInputErrorMessage/SInputErrorMessage.js";
import { type ISFieldContext, useOptionalField } from "../../context/SField/SFieldContext.js";
import { useOptionalForm } from "../../context/SForm/SFormContext.js";
import type { T_SInputBackground } from "../SInput/SInput.js";
import styles from "./STextArea.module.css";

/** Tailles disponibles pour la boîte */
export type T_STextAreaSize = "lg" | "default" | "sm";

export interface ISTextArea {
    /** Nom du champ */
    name            : string,
    /** Texte par défaut */
    value?          : string,
    /** Placeholder de la boîte */
    placeholder     : string,
    /** Indique si la boîte est désactivée */
    disabled?       : boolean,
    /** Méthode de validation de la boîte */
    validate?       : (v? : string) => string | undefined,
    /** Nombre de caractères maximal */
    maxLength?      : number,
    /** Méthode remontée à chaque appuie sur une touche */
    onChange?       : (v? : string) => void,
    /** Méthode exécutée à l'appui sur la touche entrée */
    onEnter?        : (v? : string) => void,
    /** Méthode exécutée au focus du champ */
    onFocus?        : (v? : string) => void,
    /** Méthode exécutée à la perte de focus du champ */
    onBlur?         : (v? : string) => void,
    /** Couleur de fond de l'input */
    background?     : T_SInputBackground,
    /** Taille d'affichage */
    size?           : T_STextAreaSize,
}

const STextArea = ( {
    value,placeholder,disabled=false,validate,maxLength,onChange,onEnter,onFocus,onBlur,background,name,size="default",
}: ISTextArea ) => {

    const [error, setError] = useState<string|undefined>(undefined);
    const idMsg : string = useId();
    const form = useOptionalForm();
    const inputRef = useRef<HTMLInputElement>(null);

    /** ID du label parent */
    const fieldCtx   : ISFieldContext | undefined  = useOptionalField();
    const ownId : string = useId();

    const idForm  : string = fieldCtx?.id ?? ownId;

    useEffect(() => {
        if (!form) return;
        form.register(idForm, () => {
            const err = validate?.(inputRef.current?.value);
            setError(err);
            return err;
        });
        return () => form.unregister(idForm);
    }, [form,inputRef,validate,idForm]);

    return (
        <>
            <textarea
                name={name}
                className={`${styles.text} ${background==="white"?styles.white:''} ${error?styles.error:''} ${styles[size]}`}
                placeholder={placeholder} disabled={disabled} aria-disabled={disabled}
                aria-describedby={idMsg} aria-errormessage={idMsg} id={idForm} aria-label={placeholder}
                maxLength={maxLength} defaultValue={value}
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
            >
                {value}
            </textarea>
            {error&&(
                <SInputErrorMessage message={error} idMsg={idMsg} />
            )}
        </>
    );

}

export default STextArea;