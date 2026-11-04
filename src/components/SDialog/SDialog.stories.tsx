import type { Meta, StoryObj } from "@storybook/react-vite";
import SDialog from "./SDialog";
import SDialogTrigger from "./SDialogTrigger/SDialogTrigger.js";
import SButton from "../SButton/SButton.js";
import SDialogContent from "./SDialogContent/SDialogContent.js";
import SDialogBody from "./SDialogBody/SDialogBody.js";
import SDialogFooter from "./SDialogFooter/SDialogFooter.js";
import { useState } from "react";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols.js";
import SDialogClose from "./SDialogClose/SDialogClose.js";
import SInput from "../SInput/SInput.js";
import SField from "../SField/SField.js";
import useIsMobile from "../../hooks/useMobile.js";
import SForm from "../SForm/SForm.js";
import { action } from "storybook/actions";
import SDropDown from "../SDropDown/SDropDown.js";
import SDropDownTrigger from "../SDropDown/SDropDownTrigger/SDropDownTrigger.js";
import SDropDownContent from "../SDropDown/SDropDownContent/SDropDownContent.js";
import SDropDownItem from "../SDropDown/SDropDownItem/SDropDownItem.js";
import SSettingsField from "../SSettingsField/SSettingsField.js";
import SToggle from "../SToggle/SToggle.js";
import SPastille from "../SPastille/SPastille.js";


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
                        <SDialogClose>
                            <SButton variant={"secondary"} text={"Annuler"} />
                        </SDialogClose>
                        <SDialogClose>
                            <SButton onClick={save} variant={"primary"} text={"Sauvegarder"} />
                        </SDialogClose>
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

        const isMobile = useIsMobile();

        return <>
            <SDialog>
                <SDialogTrigger>
                    <SButton variant={"primary"} text={"Ouvrir le dialogue"} />
                </SDialogTrigger>
                <SDialogContent title={"Sélectionner les classes"} isMovable={false}>
                    <SDialogBody>
                        <h1>CONTENU</h1>
                        {inEdit&&(
                            <SField label={"Votre texte"}>
                                <SInput placeholder={"Tapez du texte"} background={isMobile?"muted":"white"} validate={validateForm} name={"text"}
                                        onChange={(v) => setInEditValue(v)} icon={"title"} />
                            </SField>
                        )}
                    </SDialogBody>
                    <SDialogFooter onEdit={setInEdit} toggleEdit={true}>
                        <SDialogClose>
                            <SButton onClick={() => setInEdit(false)} variant={"secondary"} text={"Annuler"} />
                        </SDialogClose>
                        <SDialogClose onBeforeClose={validateSave}>
                            <SButton onClick={save} variant={"primary"} text={"Sauvegarder"} />
                        </SDialogClose>
                    </SDialogFooter>
                </SDialogContent>
            </SDialog>
            <p>Données sauvegardées : {value}</p>
        </>
    }
}

const niveauxClasse : string[] = [
    "6eme","5eme","4eme","3eme","2nd","1ere","Tie"
];

const periodes : {id:string,color:string,name:string}[] = [
    {id : "tri", color : "#55cd59", name : "Trimestres"},
    {id : "sem", color : "#c15951", name : "Semestres"},
    {id : "off", color : "#5d2723", name : "Hors-période"},
    {id : "per", color : "#efaf3e", name : "Périodes"},
]

export const DialogueMobile : Story = {
    args : {
        children : <></>
    },
    globals: {
        viewport: { value: 'mobile2', isRotated: false },
    },
    render : () => {

        const [modalOpen, setModalOpen] = useState<boolean>(false);

        const handleSubmit = (d:  Record<string, FormDataEntryValue>) : void => {
            console.log("onSubmit ", d);
            action("onSubmit")(d);
            setModalOpen(false);
        }

        const validateInput = (v? : string) : string | undefined => {
            if (!v || v.length < 2) return "Veuillez indiquer une valeur valide !"
        }

        return (
            <SDialog open={modalOpen} onOpenChange={setModalOpen}>
                <SDialogTrigger>
                    <SButton onClick={() => setModalOpen(true)} variant={"primary"} size="sm" text={"Nouvelle classe"} frontIcon="add_circle" />
                </SDialogTrigger>
                <SDialogContent title={"Créer une classe"}>
                    <SDialogBody>
                        <SForm onSubmit={handleSubmit} id={"createClasse"}>
                            <SField label={"Nom de la classe"}>
                                <SInput placeholder={"Tapez le nom complet de la classe"} name={"name"}
                                        validate={validateInput}
                                        icon={"title"} />
                            </SField>
                            <SField label={"Code de la classe"}>
                                <SInput placeholder={"Tapez le code de 2 à 6 caractères de la classe"} name={"code"}
                                        maxLength={6} validate={validateInput}
                                        icon={"tag"} />
                            </SField>
                            <SField label={"Niveau de la classe"}>
                                <SDropDown>
                                    <SDropDownTrigger>
                                        <SInput placeholder={"Sélectionnez le niveau de la classe"}
                                                name={"niveau"} icon={"school"} validate={validateInput} />
                                    </SDropDownTrigger>
                                    <SDropDownContent>
                                        {niveauxClasse.map((n,i) => (
                                            <SDropDownItem text={n} key={i} value={n}>
                                                <p>{n}</p>
                                            </SDropDownItem>
                                        ))}
                                    </SDropDownContent>
                                </SDropDown>
                            </SField>
                            <SSettingsField label={"Classe variable"}
                                            description={"Autoriser les effectifs à varier pendant l'année"}>
                                <SToggle name={"variable"} />
                            </SSettingsField>
                            <SField label={"Période de notation"}>
                                <SDropDown>
                                    <SDropDownTrigger>
                                        <SInput placeholder={"Sélectionnez la période de notation de la classe"}
                                                name={"notation"} icon={"123"} validate={validateInput} />
                                    </SDropDownTrigger>
                                    <SDropDownContent hasSearch={false}>
                                        {periodes.map((n,i) => (
                                            <SDropDownItem text={n.name} value={n.id} key={i}>
                                                <SPastille color={n.color} />
                                                <p>{n.name}</p>
                                            </SDropDownItem>
                                        ))}
                                    </SDropDownContent>
                                </SDropDown>
                            </SField>
                        </SForm>
                    </SDialogBody>
                    <SDialogFooter>
                        <SDialogClose>
                            <SButton variant={"secondary"} text={"Annuler"} backIcon={"close"} />
                        </SDialogClose>
                        <SButton formId="createClasse" variant={"primary"} text={"Créer"} backIcon={"check"} />
                    </SDialogFooter>
                </SDialogContent>
            </SDialog>
        )

    }
}