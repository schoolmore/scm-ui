import * as React from "react";
import { useDialog } from "../../../context/SDialog/SDialogContext.js";


export interface ISDialogTrigger {
    /** Élément qui ouvre le dialogue */
    children    : React.ReactNode,
}

const SDialogTrigger = ( {
    children,
}: ISDialogTrigger ) => {

    const {toggle} = useDialog();

    return (
        <span style={{display:"contents"}} onClick={() => toggle(true)}>
            {children}
        </span>
    );

}

export default SDialogTrigger;