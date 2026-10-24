import { useState } from "react";
import styles from "./SRadioButton.module.css";
import SRadioButtonItem, { type ISRadioButtonItem } from "../SRadtioButtonItem/SRadioButtonItem";


export interface ISRadioButton {
    /** Liste des valeurs possibles */
    values      : ISRadioButtonItem[],
    /** Méthode exécutée au changement de valeur */
    onChange?   : (newValue : string, oldValue?: string) => void,
    /** Indique si le changement est désactivé */
    disabled?   : boolean,
    /** Indique le choix déjà sélectionné */
    selected?   : number,
}

const SRadioButton = ( {
    values,onChange,disabled=false,selected
}: ISRadioButton ) => {

    const [value,setValue] = useState<number>(selected ?? -1);

    const triggeredClick = (i : number) : void => {
        const oldValue : number = value;
        setValue(i);
        onChange?.(values[i].value, values[oldValue]?.value);
    }

    return (
        <div className={styles.rbParent}>
            {values.map((v : ISRadioButtonItem,i : number) => (
                <SRadioButtonItem selected={value===i} disabled={v.disabled || disabled}
                                    onClick={() => triggeredClick(i)} value={v.value} key={i} />
            ))}
        </div>
    );

}

export default SRadioButton;