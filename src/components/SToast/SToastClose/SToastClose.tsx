import * as React from "react";
import { useToast } from "../../../context/SToast/SToastContext.js";


export interface ISToastClose {
    /** Contenu du bouton fermer */
    children            : React.ReactNode,
    /** Autorisation ou non de fermer le toast */
    onBeforeClose?      : () => (boolean | Promise<boolean>),
}

const SToastClose = ( {
    children,onBeforeClose
}: ISToastClose ) => {

    const {close} = useToast();

    const handleClick = async () : Promise<void> => {
        if (await onBeforeClose?.() === false) return;
        close();
    }

    return (
        <span style={{display:"contents"}} onClick={handleClick}>
            {children}
        </span>
    );

}

export default SToastClose;