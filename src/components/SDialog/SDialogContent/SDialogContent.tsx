import * as React from "react";
import styles from "./SDialogContent.module.css";
import SDialogTitle from "../SDialogTitle/SDialogTitle.js";
import useDraggable from "../../../hooks/SDialog/useDraggable.js";
import { useDialog } from "../../../context/SDialog/SDialogContext.js";


export interface ISDialogContent {
    /** Contenu du dialogue */
    children    : React.ReactNode,
    /** Titre du dialogue */
    title       : string,
    /** Indique si le dialogue doit être movable, non par défaut */
    isMovable?  : boolean,
}

const SDialogContent = ( {
    children,title,isMovable=false,
}: ISDialogContent ) => {

    const { offset, handleProps } = useDraggable({enabled : isMovable});
    const { isOpen, toggle } = useDialog();

    if (!isOpen) return null;

    return (
        <div className={styles.dialogPrt}>
            <div style={{transform : `translate(${offset.x}px, ${offset.y}px)`}} className={styles.dialog}>
                <SDialogTitle onClick={() => toggle(false)} handleProps={handleProps} isMovable={isMovable} title={title} />
                {children}
            </div>
        </div>
    );

}

export default SDialogContent;