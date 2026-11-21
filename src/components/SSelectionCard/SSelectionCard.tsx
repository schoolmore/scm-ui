import styles from "./SSelectionCard.module.css";
import * as React from "react";
import type { ISSelectionInputValue } from "./SSelectionInput/SSelectionInput.js";
import SCheckbox from "../SCheckbox/SCheckbox.js";
import SPastille from "../SPastille/SPastille.js";
import SRadioButtonItem from "../SRadtioButtonItem/SRadioButtonItem.js";
import { useSelectionInput } from "../../context/SSelectionInput/SSelectionInputContext.js";
import { useEffect, useState } from "react";


export interface ISSelectionCard {
    /** Contenu de la carte */
    value       : ISSelectionInputValue,
    /** Type solo ou multiple */
    type        : "checkbox" | "radio",
    /** Vrai pour la carte qui reçoit le focus */
    focusable?  : boolean,
    /** Référence du parent */
    ref?        : React.Ref<HTMLElement>,
}

const SSelectionCard = ( {
    value,type,ref,focusable=false,
}: ISSelectionCard ) => {

    const [selected,setSelected] = useState<boolean>(false);

    const {onValueChange,values} = useSelectionInput();

    const triggeredSelected = () : void => {
        if (value.disabled) return;
        onValueChange?.(value);
    }

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (e.key !== " ") return;
        e.preventDefault();
        triggeredSelected();
    }

    useEffect(() => {
        setSelected(values.includes(value));
        return () => {};
    }, [values]);

    return (
        <article ref={ref} onClick={triggeredSelected} tabIndex={(focusable && !value.disabled)?0:-1} onKeyDown={onKeyDown}
                    className={`${styles.card} ${selected?styles.selected:''} ${value.disabled?styles.disabled:''}`}>
            {type==="checkbox"&&(
                <SCheckbox name="none" disabled={value.disabled} state={selected?"on":undefined}
                            onChange={triggeredSelected} disableFocus={true} />
            )}
            {type==="radio"&&(
                <SRadioButtonItem value={value.id||value.label} selected={selected} showLabel={false}
                                    disabled={value.disabled} onClick={triggeredSelected} />
            )}
            {value.color&&(
                <SPastille color={value.color} />
            )}
            <p>{value.label}</p>
        </article>
    );

}

export default SSelectionCard;