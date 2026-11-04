import * as React from "react";
import { useCallback, useState } from "react";
import {
    autoUpdate, flip, offset, shift, size,
    useDismiss, useFloating, useInteractions,
} from "@floating-ui/react";
import { SDropDownContext } from "../../context/SDropDown/SDropDownContext.js";


export interface ISDropDown {
    /** Contenu du DropDown */
    children        : React.ReactNode,
    /** Méthode exécutée au changement de valeur */
    onValueChange?  : (v : string|undefined) => void,
    /** Indique si le dropdown est désactivé */
    disabled?       : boolean,
}

const SDropDown = ( {
    children,onValueChange,disabled=false,
}: ISDropDown ) => {

    const [open,setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string|undefined>(undefined);
    const [text,setText] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");

    const values : Set<string> = new Set();

    const toggle = useCallback((v : boolean) => {
        setSearchValue("");
        setOpen(v);
    }, [])

    const updatedValue = ( v? : string ) : void => {
        if (disabled) return;
        setValue(v);
        onValueChange?.(v);
    }

    const updateText = ( s? : string ) : void => {
        if (disabled || !s) return;
        setText(s);
    }

    const register = (v : string) : void => {values.add(v);}

    const searchUpdated = (v? : string) : void => {
        if (!v) return setSearchValue("");
        setSearchValue(v);
    }

    const { refs, floatingStyles, context, placement } = useFloating({
        open,
        onOpenChange    : toggle,
        placement       : "bottom-start",
        whileElementsMounted : autoUpdate,
        middleware      : [
            offset(4),
            flip({ padding: 8 }),
            shift({ padding: 8 }),
            size({
                padding : 8,
                apply({ rects, elements, availableHeight }) {
                    // Même largeur que le trigger, hauteur limitée à la place disponible
                    elements.floating.style.width = `${rects.reference.width}px`;
                    elements.floating.style.setProperty("--scm-ui-dropdown-available-height", `${availableHeight}px`);
                },
            }),
        ],
    });

    // Fermeture au clic extérieur (trigger + contenu en portal) et à Échap
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    return (
        <SDropDownContext.Provider value={
            {toggle,isOpen:open,setValue:updatedValue,value,text,setText:updateText,register,values,searchUpdated,searchValue,
             setReference:refs.setReference,setFloating:refs.setFloating,
             floatingStyles,placement,getReferenceProps,getFloatingProps}
        }>
            {children}
        </SDropDownContext.Provider>
    );

}

export default SDropDown;