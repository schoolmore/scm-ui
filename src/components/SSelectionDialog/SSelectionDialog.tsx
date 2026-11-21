import * as React from "react";
import SSelectionInput, {
    type ISSelectionInput,
    type ISSelectionInputValue
} from "../SSelectionCard/SSelectionInput/SSelectionInput.js";
import SDialogFooter from "../SDialog/SDialogFooter/SDialogFooter.js";
import SDialog from "../SDialog/SDialog.js";
import SDialogTrigger from "../SDialog/SDialogTrigger/SDialogTrigger.js";
import SDialogContent from "../SDialog/SDialogContent/SDialogContent.js";
import SDialogBody from "../SDialog/SDialogBody/SDialogBody.js";
import SDialogClose from "../SDialog/SDialogClose/SDialogClose.js";
import SButton from "../SButton/SButton.js";
import { useState } from "react";
import { SSelectionDialogContext } from "../../context/SSelectionDialog/SSelectionDialogContext.js";


export type ISSelectionDialog = ISSelectionInput & {
    /** Élément déclencheur, si `<SInput>`, récupérera la valeur */
    children    : React.ReactNode,
    /** Titre du dialogue */
    title       : string,
    /** Indique si le dialogue est movable (oui par défaut) */
    isMovable?  : boolean,
}

const SSelectionDialog = ( {
    children,values,multiple,name,defaultSelected=[],onChange,title,isMovable=true,
}: ISSelectionDialog ) => {

    let lstSelected : ISSelectionInputValue[] = [];
    for (const id of defaultSelected) {
        const found = values.find(vl => vl.id === id);
        if (found)
            if (multiple) lstSelected.push(found); else lstSelected = [found];
    }

    const [draft, setDraft] = useState<ISSelectionInputValue[]>([]);
    const [value, setValue] = useState<ISSelectionInputValue[]>(lstSelected);

    const handleChange = (v : ISSelectionInputValue[]) : void => {
        setDraft(v);
        onChange?.(v);
    }

    return (
        <SDialog>
            <SSelectionDialogContext.Provider value={{values: value}}>
                <SDialogTrigger>
                    {children}
                </SDialogTrigger>
            </SSelectionDialogContext.Provider>
            <SDialogContent isMovable={isMovable} title={title}>
                <SDialogBody>
                    <SSelectionInput defaultSelected={value.map(v => v.id)} onChange={handleChange}
                                        name={name} values={values} multiple={multiple} />
                </SDialogBody>
                <SDialogFooter>
                    <SDialogClose>
                        <SButton variant="secondary" text="Fermer" />
                    </SDialogClose>
                    <SDialogClose>
                        <SButton onClick={() => setValue(draft)} variant="primary" text="Valider" />
                    </SDialogClose>
                </SDialogFooter>
            </SDialogContent>
        </SDialog>
    );

}

export default SSelectionDialog;