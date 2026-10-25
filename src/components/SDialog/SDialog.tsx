import * as React from "react";
import { useState } from "react";
import { SDialogContext } from "../../context/SDialog/SDialogContext.js";


export interface ISDialog {
    /** Contenu du dialogue */
    children        : React.ReactNode,
    /** État ouvert, en mode contrôlé */
    open?           : boolean,
    /** État initial, en mode non contrôlé */
    defaultOpen?    : boolean,
    /** Méthode exécutée au changement d'état */
    onOpenChange?   : (v : boolean) => void,
}

const SDialog = ( {
    open,children,defaultOpen=false,onOpenChange,
}: ISDialog ) => {

    const [isOpen,setIsOpen] = useState<boolean>(defaultOpen);
    const isControlled = open !== undefined;
    const currentOpen = isControlled ? open : isOpen;

    const setOpen = (v : boolean) => {
        if (!isControlled) setIsOpen(v);
        onOpenChange?.(v);
    }


    return (
        <SDialogContext.Provider value={{isOpen : currentOpen, toggle : setOpen}}>
            {children}
        </SDialogContext.Provider>
    );

}

export default SDialog;