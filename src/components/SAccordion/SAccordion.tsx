import * as React from "react";
import { useState } from "react";
import { SAccordionContext, type T_SAccordionSize } from "../../context/SAccordion/SAccordionContext.js";

export interface ISAccordion {
    /** Taille d'affichage de l'accordéon */
    size?                   : T_SAccordionSize,
    /** Contenu de l'accordéon */
    children                : React.ReactNode,
    /** Ouvert par défaut, en mode non contrôlé */
    defaultExpanded?        : boolean,
    /** Indique l'état en mode contrôlé */
    expand?                 : boolean,
    /** Méthode exécutée au changement d'état de l'accordéon */
    onExpandChange?         : (v : boolean) => void,
    /** Indique si l'accordéon est désactivé ou non */
    disabled?               : boolean,
}

const SAccordion = ( {
    size="default",children,defaultExpanded=false,onExpandChange,expand,disabled=false,
}: ISAccordion ) => {

    const [isOpen, setIsOpen] = useState<boolean>(defaultExpanded);
    const isControlled = expand !== undefined;
    const currentOpen : boolean = isControlled ? expand : isOpen;

    const toggleExpand = () : void => {
        const nextState : boolean = !currentOpen;
        if (!isControlled) setIsOpen(nextState);
        onExpandChange?.(nextState);
    }

    return (
        <SAccordionContext.Provider value={{isExpanded : currentOpen, toggle : toggleExpand, size,disabled}}>
            <div>
                {children}
            </div>
        </SAccordionContext.Provider>
    );

}

export default SAccordion;