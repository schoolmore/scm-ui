import styles from "./SInputErrorMessage.module.css";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols";

interface ISInputErrorMessage {
    /** Message affiché sous l'input */
    message : string,
    /** Identifiant du message pour aria-describedby */
    idMsg   : string,
}

const SInputErrorMessage = ( {message,idMsg}: ISInputErrorMessage ) => {

    return (
        <div id={idMsg} className={styles.message}>
            <SMaterialSymbols icon="error" size="sm" weight="medium" />
            <p>{message}</p>
        </div>
    );

}

export default SInputErrorMessage;