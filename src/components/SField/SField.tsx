import * as React from "react";
import styles from "./SField.module.css";
import { useId } from "react";
import { SFieldContext } from "../../context/SField/SFieldContext.js";

export interface ISField {
    /** Libellé du champ */
    label       : string,
    /** Contenu du champ */
    children    : React.ReactNode,
}

const SField = ( {
    label, children,
}: ISField ) => {

    const id        : string = useId();
    const labelId   : string = useId();

    return (
        <SFieldContext.Provider value={{id,labelId}}>
            <div className={styles.field}>
                <label id={labelId} htmlFor={id}>{label}</label>
                {children}
            </div>
        </SFieldContext.Provider>
    );

}

export default SField;