import SDialog from "../SDialog/SDialog.js";
import * as React from "react";
import SDialogTrigger from "../SDialog/SDialogTrigger/SDialogTrigger.js";
import SDialogContent from "../SDialog/SDialogContent/SDialogContent.js";
import SDialogFooter from "../SDialog/SDialogFooter/SDialogFooter.js";
import SDialogClose from "../SDialog/SDialogClose/SDialogClose.js";
import SButton from "../SButton/SButton.js";


export interface ISConfirmDialog {
    /** Titre de la confirmation */
    title       : string,
    /** Description détaillée de l'action */
    description : string,
    /** Texte des boutons */
    buttons?    : string[],
    /** Méthode exécutée à la fermeture du dialogue */
    onCancel?   : () => void,
    /** Méthode exécutée à la validation du dialogue */
    onConfirm?  : () => void,
    /** Élément déclencheur */
    children?   : React.ReactNode,
    /** État ouvert, en mode contrôlé */
    open?           : boolean,
    /** Méthode exécutée au changement d'état */
    onOpenChange?   : (v : boolean) => void,
}

const SConfirmDialog = ( {
    title,description,buttons=["Annuler","Confirmer"],onCancel,onConfirm,children,open,onOpenChange,
}: ISConfirmDialog ) => {

    return (
        <SDialog open={open} onOpenChange={onOpenChange}>
            {children&&(
                <SDialogTrigger>
                    {children}
                </SDialogTrigger>
            )}
            <SDialogContent close={false} title={title} isMovable={false}>
                <p>{description}</p>
                <SDialogFooter>
                    <SDialogClose>
                        <SButton variant={"secondary"} text={buttons[0]} onClick={onCancel} />
                    </SDialogClose>
                    <SDialogClose>
                        <SButton variant={"primary"} text={buttons[1]} onClick={onConfirm} />
                    </SDialogClose>
                </SDialogFooter>
            </SDialogContent>
        </SDialog>
    );

}

export default SConfirmDialog;