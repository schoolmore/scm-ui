import * as React from "react";
import { useDialog } from "../../../context/SDialog/SDialogContext.js";


export interface ISDialogClose {
    /** Bouton déclenchant la fermeture */
    children        : React.ReactNode,
    /** Méthode permettant de vérifier la fermeture du dialogue */
    onBeforeClose?  : () => (boolean | void | Promise<boolean | void>),
}

const SDialogClose = ( {
    children,onBeforeClose,
}: ISDialogClose ) => {

    const { toggle } = useDialog();

    const handleClick = async () : Promise<void> => {
        if (await onBeforeClose?.() === false) return;
        toggle(false);
    }

    return (
        <span style={{display:"contents"}} onClick={handleClick}>{children}</span>
    );

}

export default SDialogClose;