import * as React from "react";
import { useEffect, useId, useState } from "react";
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

    const toggle = (v : boolean) => {
        setSearchValue("");
        setOpen(v);
    }

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

    const idElm : string = useId();
    useEffect( () => {
        if (!open) return;

        const handleClick = (e: MouseEvent): void => {
            const elm = document.getElementById(idElm);
            if (elm && !elm.contains(e.target as Node)) toggle(false);
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);

    }, [idElm,toggle,open] );

    return (
        <SDropDownContext.Provider value={
            {toggle,isOpen:open,setValue:updatedValue,value,text,setText:updateText,register,values,searchUpdated,searchValue}
        }>
            <span id={idElm}>
                {children}
            </span>
        </SDropDownContext.Provider>
    );

}

export default SDropDown;