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
}

const SSelectionCard = ( {
    value,type,
}: ISSelectionCard ) => {

    const [selected,setSelected] = useState<boolean>(false);

    const {onValueChange,values} = useSelectionInput();

    const triggeredSelected = () : void => {
        if (value.disabled) return;
        onValueChange?.(value);
    }

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (e.key === " ") triggeredSelected();
    }

    useEffect(() => {
        setSelected(values.includes(value));
        return () => {};
    }, [values]);

    return (
        <article onClick={triggeredSelected} tabIndex={value.disabled?-1:0} onKeyDown={onKeyDown}
                    className={`${styles.card} ${selected?styles.selected:''}`}>
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