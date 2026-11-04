import { useDropDown } from "../../../context/SDropDown/SDropDownContext.js";
import * as React from "react";


export interface ISDropDownTrigger {
    /** Contenu du trigger */
    children    : React.ReactNode,
}

const SDropDownTrigger = ( {
    children
}: ISDropDownTrigger ) => {

    const {toggle,setReference,getReferenceProps} = useDropDown();

    return (
        <div ref={setReference} {...getReferenceProps({ onClick: () => toggle(true) })}>
            {children}
        </div>
    );

}

export default SDropDownTrigger;