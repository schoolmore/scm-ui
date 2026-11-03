import * as React from "react";
import styles from "./SDialogHandle.module.css"
import useIsMobile from "../../../hooks/useMobile.js";

export interface ISDialogHandle {
    /** Méthode exécutée lorsque l'utilisateur appuie sur la poignée */
    onPointerDown? : React.PointerEventHandler<HTMLDivElement>,
}

const SDialogHandle = ( {
    onPointerDown,
}: ISDialogHandle ) => {

    const isMobile = useIsMobile();

    if (!isMobile) return null;

    return (
        <div className={styles.handlePrt} onPointerDown={onPointerDown}>
            <div className={styles.handle}></div>
        </div>
    );

}

export default SDialogHandle;
