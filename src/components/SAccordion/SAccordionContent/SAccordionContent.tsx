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
        <div className={`${styles.content} ${isExpanded?styles.expanded:''}`}>
            {children}
        </div>
    );

}

export default SAccordionContent;