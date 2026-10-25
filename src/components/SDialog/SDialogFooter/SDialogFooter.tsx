import * as React from "react";
import styles from "./SDialogFooter.module.css";
import SToggleIcon from "../../SToggleIcon/SToggleIcon.js";
import type { MaterialSymbol } from "material-symbols";
import { useState } from "react";
import SButtonGroup from "../../SButtonGroup/SButtonGroup.js";


export interface ISDialogFooter {
    /** Boutons d'action */
    children        : React.ReactNode,
    /** Icône de modification, par défaut `edit` */
    iconEdit?       : MaterialSymbol,
    /** Afficher le bouton pour activer l'édition des éléments */
    toggleEdit?     : boolean,
    /** Action lorsque la vue est en mode édition */
    onEdit?         : (v : boolean) => void,
    /** Indique si l'édition doit être désactivée ou non */
    disabledEdit?   : boolean,
}

const SDialogFooter = ( {
    children,toggleEdit,onEdit,iconEdit="edit",disabledEdit=false,
}: ISDialogFooter ) => {

    const [edit, setEdit] = useState<boolean>(false);

    const triggeredClick = () : void => {
        if (disabledEdit) return;
        const nextValue : boolean = !edit;
        setEdit(nextValue);
        onEdit?.(nextValue);
    }

    return (
        <footer className={`${styles.footer} ${toggleEdit?styles.noEdit:''}`}>
            {toggleEdit&&(
                <SToggleIcon disabled={disabledEdit} selected={edit} onClick={triggeredClick} icon={iconEdit} />
            )}
            <SButtonGroup fitWidth={toggleEdit}>
                {children}
            </SButtonGroup>
        </footer>
    );

}

export default SDialogFooter;