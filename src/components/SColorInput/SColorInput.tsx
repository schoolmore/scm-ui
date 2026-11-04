import styles from "./SColorInput.module.css";
import { type ChangeEvent, useId, useState } from "react";
import SInputErrorMessage from "../SInputErrorMessage/SInputErrorMessage.js";
import useIsColorTooDark from "../../hooks/useColor.js";


export interface ISColorInput {
    /** Valeur par défaut, par défaut : #000000 */
    defaultValue?   : string,
    /** Indique si la saisie est désactivée */
    disabled?       : boolean,
    /** Nom du champ */
    name            : string,
    /** Méthode permettant de valider la valeur du champ */
    validate?       : ((s? : string) => string | undefined),
    /** Méthode exécutée au changement de valeur */
    onChange?       : (s : string) => void,
}

const SColorInput = ( {
    defaultValue,disabled,name,validate,onChange,
}: ISColorInput ) => {

    const [error, setError] = useState<string>();
    const [color, setColor] = useState<string>("#000000");
    const isTooDark = useIsColorTooDark;

    const idError : string = useId();

    const handleChange = (e : ChangeEvent<HTMLInputElement>) : void => {
        const vle = e.target.value;
        onChange?.(vle);
        setColor(vle);
        setError(validate?.(vle));
    }

    return (
        <div className={styles.parentInput}>
            <div className={styles.inputColor}>
                <div className={styles.input}>
                    <input type="color" defaultValue={defaultValue} className={`${error?styles.error:''}`}
                            onChange={handleChange} name={name} disabled={disabled}
                    />
                </div>
                <div className={styles.bigPastille} style={{backgroundColor: color}}>
                    <p style={{
                        color : isTooDark(color)?"white":"black"
                    }}>TEST</p>
                </div>
            </div>
            {error&&(
                <SInputErrorMessage message={error} idMsg={idError} />
            )}
        </div>
    );

}

export default SColorInput;