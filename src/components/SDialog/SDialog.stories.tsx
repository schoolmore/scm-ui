import type { Meta, StoryObj } from "@storybook/react-vite";
import SDialog from "./SDialog";
import SDialogTrigger from "./SDialogTrigger/SDialogTrigger.js";
import SButton from "../SButton/SButton.js";
import SDialogContent from "./SDialogContent/SDialogContent.js";
import SDialogBody from "./SDialogBody/SDialogBody.js";
import SDialogFooter from "./SDialogFooter/SDialogFooter.js";
import { useState } from "react";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols.js";
import SCloseDialog from "./SCloseDialog/SCloseDialog.js";
import SInput from "../SInput/SInput.js";


const meta = {
    title       : "Components/Dialog/SDialog",
    component   : SDialog,
    tags        : ["autodocs"],
    args        : {
        defaultOpen : false,
    },
    argTypes : {
        children : {control : false}
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher un dialogue complet à l'utilisateur"
            }
        }
    }
} satisfies Meta<typeof SDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dialogue : Story = {
    args : {
        children : <>
            <SDialogTrigger>
                <SButton variant={"primary"} text={"Ouvrir le dialogue"} />
            </SDialogTrigger>
            <SDialogContent title={"Sélectionner les classes"} isMovable={false}>
                <SDialogBody>
                    <h1>CONTENU</h1>
                </SDialogBody>
                <SDialogFooter>
                    <SButton variant={"secondary"} text={"Annuler"} />
                    <SButton variant={"primary"} text={"Sauvegarder"} />
                </SDialogFooter>
            </SDialogContent>
        </>
    }
}
export const DialogueMovable : Story = {
    args : {
        children : <>
            <SDialogTrigger>
                <SButton variant={"primary"} text={"Ouvrir le dialogue"} />
            </SDialogTrigger>
            <SDialogContent title={"Sélectionner les classes"} isMovable={true}>
                <SDialogBody>
                    <h1>CONTENU</h1>
                </SDialogBody>
                <SDialogFooter>
                    <SButton variant={"secondary"} text={"Annuler"} />
                    <SButton variant={"primary"} text={"Sauvegarder"} />
                </SDialogFooter>
            </SDialogContent>
        </>
    }
}
export const DialogueAction : Story = {
    args : {
        children : <></>
    },
    render : () => {

        const [isSaved, setIsSaved] = useState<boolean>(false);

        const save = () : void => setIsSaved(true);

        return <>
            <SDialog>
                <SDialogTrigger>
                    <SButton variant={"primary"} text={"Ouvrir le dialogue"} />
                </SDialogTrigger>
                <SDialogContent title={"Sélectionner les classes"} isMovable={false}>
                    <SDialogBody>
                        <h1>CONTENU</h1>
                    </SDialogBody>
                    <SDialogFooter>
                        <SCloseDialog>
                            <SButton variant={"secondary"} text={"Annuler"} />
                        </SCloseDialog>
                        <SCloseDialog>
                            <SButton onClick={save} variant={"primary"} text={"Sauvegarder"} />
                        </SCloseDialog>
                    </SDialogFooter>
                </SDialogContent>
            </SDialog>
            <p>Données sauvegardées : {isSaved?<SMaterialSymbols icon={"check"} />:<SMaterialSymbols icon={"close"} />}</p>
        </>
    }
}
export const DialogueEdition : Story = {
    args : {
        children : <></>
    },
    render : () => {

        const [inEditValue, setInEditValue] = useState<string | undefined>();
        const [value, setValue] = useState<string>("");
        const [inEdit, setInEdit] = useState<boolean>(false);

        const validateSave = ()
            : boolean => inEditValue !== undefined && inEditValue.length >= 5;

        const save = () : void => {
            if (inEditValue === undefined || inEditValue.length < 5) return;
            setInEdit(false);
            setValue(inEditValue);
        }

        const validateForm = (v? : string) : string | undefined => {
            if (v === undefined || v.length < 5) return "Le champ doit faire au moins 5 caractères !";
            return;
        }

        return <>
            <SDialog>
                <SDialogTrigger>
                    <SButton variant={"primary"} text={"Ouvrir le dialogue"} />
                </SDialogTrigger>
                <SDialogContent title={"Sélectionner les classes"} isMovable={false}>
                    <SDialogBody>
                        <h1>CONTENU</h1>
                        {inEdit&&(
                            <SInput placeholder={"Tapez du texte"} background="white" validate={validateForm}
                                    onChange={(v) => setInEditValue(v)} icon={"title"} label="Votre texte" />
                        )}
                    </SDialogBody>
                    <SDialogFooter onEdit={setInEdit} toggleEdit={true}>
                        <SCloseDialog>
                            <SButton onClick={() => setInEdit(false)} variant={"secondary"} text={"Annuler"} />
                        </SCloseDialog>
                        <SCloseDialog onBeforeClose={validateSave}>
                            <SButton onClick={save} variant={"primary"} text={"Sauvegarder"} />
                        </SCloseDialog>
                    </SDialogFooter>
                </SDialogContent>
            </SDialog>
            <p>Données sauvegardées : {value}</p>
        </>
    }
}