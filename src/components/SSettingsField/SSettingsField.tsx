import styles from "./SSettingsField.module.css";
import * as React from "react";
import { SFieldContext } from "../../context/SField/SFieldContext.js";
import { useId } from "react";

export interface ISSettingsField {
    /** Contenu du paramètre */
    children        : React.ReactNode,
    /** Titre du paramètre */
    label           : string,
    /** Description optionnelle du paramètre */
    description?    : string,
}

const SSettingsField = ( {
    label,description,children,
}: ISSettingsField ) => {

    const labelId : string = useId();
    const id      : string = useId();

    return (
        <SFieldContext.Provider value={{id,labelId}}>
            <div className={styles.settingsField}>
                <div className={styles.start}>
                    <label htmlFor={id} id={labelId}>{label}</label>
                    {description&&(
                        <p>{description}</p>
                    )}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </SFieldContext.Provider>
    );

}

export default SSettingsField;