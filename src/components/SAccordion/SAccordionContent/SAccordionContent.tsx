import * as React from "react";
import { useAccordion } from "../../../context/SAccordion/SAccordionContext.js";
import styles from "./SAccordionContent.module.css";


export interface ISAccordionContent {
    /** Contenu de l'accordéon */
    children    : React.ReactNode,
}

const SAccordionContent = ( {
    children,
}: ISAccordionContent ) => {

    const {isExpanded} = useAccordion();

    return (
        <div className={`${styles.content} ${isExpanded?styles.expanded:''}`} inert={!isExpanded}>
            <div className={styles.inner}>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    );

}

export default SAccordionContent;