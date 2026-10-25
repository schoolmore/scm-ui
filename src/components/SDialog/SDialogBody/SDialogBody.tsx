import * as React from "react";
import styles from "./SDialogBody.module.css";

export interface ISDialogBody {
    /** Contenu du dialogue */
    children : React.ReactNode,
}

const SDialogBody = ( {
    children,
}: ISDialogBody ) => {

    return (
        <div className={styles.content}>
            {children}
        </div>
    );

}

export default SDialogBody;