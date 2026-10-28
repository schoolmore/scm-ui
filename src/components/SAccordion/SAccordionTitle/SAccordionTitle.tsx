import * as React from "react";
import { useAccordion } from "../../../context/SAccordion/SAccordionContext.js";
import styles from "./SAccordionTitle.module.css";


export interface ISAccordionTitle {
    /** Méthode exécutée au clic sur le titre */
    onClick?    : (v : boolean) => void,
    /** Contenu du titre */
    children    : React.ReactNode,
}

const SAccordionTitle = ( {
    children,onClick
}: ISAccordionTitle ) => {

    const {disabled,size,isExpanded,toggle} = useAccordion();

    const triggeredClick = () : void => {
        if (disabled) return;
        toggle();
        onClick?.(isExpanded)
    }

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (e.key === " ") triggeredClick();
    }

    return (
        <div onClick={triggeredClick} aria-disabled={disabled} role="region" tabIndex={disabled?-1:0}
                onKeyDown={onKeyDown}
                className={`${styles.title} ${styles[size]} ${isExpanded?styles.expanded:''} ${disabled?styles.disabled:''}`}>
            {children}
        </div>
    );

}

export default SAccordionTitle;