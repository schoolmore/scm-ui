import { useEffect, useId, useRef, useState } from "react";
import styles from "./SRadioButton.module.css";
import SRadioButtonItem, { type ISRadioButtonItem } from "../SRadtioButtonItem/SRadioButtonItem";
import SInputErrorMessage from "../SInputErrorMessage/SInputErrorMessage.js";
import { useOptionalForm } from "../../context/SForm/SFormContext.js";
import { useOptionalField } from "../../context/SField/SFieldContext.js";
import * as React from "react";


export interface ISRadioButton {
    /** Liste des valeurs possibles */
    values      : ISRadioButtonItem[],
    /** Méthode exécutée au changement de valeur */
    onChange?   : (newValue : string, oldValue?: string) => void,
    /** Indique si le changement est désactivé */
    disabled?   : boolean,
    /** Indique le choix déjà sélectionné */
    selected?   : number,
    /** Clé du champ pour le formulaire */
    name        : string,
    /** Méthode permettant de valider le choix de l'utilisateur */
    validate?   : (v? : string) => string | undefined,
}

const SRadioButton = ( {
    values,onChange,disabled=false,selected,name,validate,
}: ISRadioButton ) => {

    const [value,setValue] = useState<number>(selected ?? -1);
    const [error, setError] = useState<string>();

    const form = useOptionalForm();
    const field = useOptionalField();

    const idError   : string = useId();
    const ownid     : string = useId();
    const idForm    : string = field?.id ?? ownid;

    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const firstEnabled : number = values.findIndex(v => !v.disabled);
    const focusIndex : number = value > 0 ? value : firstEnabled;

    const triggeredClick = (i : number) : void => {
        const oldValue : number = value;
        setValue(i);
        onChange?.(values[i].value, values[oldValue]?.value);
        setError(validate?.(values[i].value))
    }

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (disabled) return;
        let dir : number;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") dir = 1;
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") dir = -1;
        else return;
        e.preventDefault();

        const start : number = value >= 0 ? value : (dir === 1 ? -1 : 0);
        for (let k = 1; k <= values.length; k++) {
            const i : number = (start + dir * k + values.length) % values.length;
            if (!values[i].disabled) {
                triggeredClick(i);
                itemsRef.current[i]?.focus();
                return;
            }
        }
    }

    useEffect(() => {
        if (!form) return;
        form.register(idForm, () => {
            const err = validate?.(values[value]?.value)
            setError(err);
            return err;
        })
        return () => form.unregister(idForm);
    }, [form, idForm, value, validate, values])

    return (
        <div className={styles.rbParent}>
            <div aria-labelledby={idForm}
                role={"radiogroup"} onKeyDown={onKeyDown} className={styles.rbContent}>
                {values.map((v : ISRadioButtonItem,i : number) => (
                    <SRadioButtonItem selected={value===i} disabled={v.disabled || disabled} focusable={i === focusIndex}
                                        ref={el => { itemsRef.current[i] = el; }}
                                        onClick={() => triggeredClick(i)} value={v.value} key={i} />
                ))}
            </div>
            {error&&<SInputErrorMessage message={error} idMsg={idError} />}
            <input id={idForm} aria-invalid={!!error} aria-labelledby={idError} type="hidden" name={name}
                    value={values[value]?.value ?? ""}/>
        </div>
    );

}

export default SRadioButton;