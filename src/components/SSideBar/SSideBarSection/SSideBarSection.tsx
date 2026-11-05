import styles from "./SSideBarSection.module.css";
import type { MaterialSymbol } from "material-symbols";
import * as React from "react";
import SMaterialSymbols from "../../SMaterialSymbols/SMaterialSymbols.js";
import { useState } from "react";

export interface ISSideBarSection {
    /** Icône de la section */
    icon            : MaterialSymbol,
    /** Nom de la section */
    name            : string,
    /** Catégories de la section */
    children        : React.ReactNode,
    /** Indique si la barre est rétractée */
    collapsed?      : boolean,
    /** Indique l'état en mode contrôlé */
    opened?         : boolean,
    /** Ouverture par défaut, oui par défaut */
    defaultOpen?    : boolean,
    /** Indique si la section est désactivée */
    disabled?       : boolean,
    /** Appelé lors de l'ouverture / fermeture de la section */
    onOpenChange?   : (open : boolean) => void,
    /** Indique si la section a un élément sélectionné */
    selected?       : boolean,
}

const SSideBarSection = ( {
    icon="123",name,children,collapsed=false,opened,defaultOpen=true,disabled=false,onOpenChange,selected=false,
}: ISSideBarSection ) => {

    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    const isControlled = opened !== undefined;
    const currentOpen : boolean = isControlled ? opened : isOpen;

    const triggeredClick = () : void => {
        if (disabled) return;
        const next = !currentOpen;
        if (!isControlled) setIsOpen(next);
        onOpenChange?.(next);
    }

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        if (disabled) return;
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            triggeredClick();
        }
    }

    return (
        <div
            className={`${styles.parent} ${collapsed?styles.collapsed:''} ${(collapsed&&selected)?styles.selected:''}`}>
            <div role="button" aria-expanded={currentOpen} aria-disabled={disabled}
                    tabIndex={disabled?-1:0} onKeyDown={onKeyDown} onClick={triggeredClick}
                    className={`${styles.item} ${disabled?styles.disabled:''}`}>
                <div className={styles.first}>
                    <SMaterialSymbols size="lg" icon={icon} />
                    {!collapsed&&(
                        <p>{name}</p>
                    )}
                </div>
                {(!disabled && !collapsed)&&(
                    <div className={styles.end} style={{transform : `rotate(${currentOpen?'180deg':'0deg'})`}}>
                        <SMaterialSymbols size="lg" icon={"arrow_drop_down"} />
                    </div>
                )}
            </div>
            <div className={`${styles.content} ${currentOpen&&!disabled?styles.expanded:''}`} inert={!currentOpen}>
                <div className={styles.inner}>
                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SSideBarSection;