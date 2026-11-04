import type { Meta, StoryObj } from "@storybook/react-vite";
import { SForm } from "../../index.js";
import { action } from "storybook/actions";
import SInput from "../SInput/SInput.js";
import { useCallback, useState } from "react";
import SField from "../SField/SField.js";
import SRadioButton from "../SRadioButton/SRadioButton.js";
import SCheckbox from "../SCheckbox/SCheckbox.js";
import SButtonGroup from "../SButtonGroup/SButtonGroup.js";
import SButton from "../SButton/SButton.js";
import SDialog from "../SDialog/SDialog.js";
import SDialogTrigger from "../SDialog/SDialogTrigger/SDialogTrigger.js";
import SDialogContent from "../SDialog/SDialogContent/SDialogContent.js";
import SDialogBody from "../SDialog/SDialogBody/SDialogBody.js";
import SDialogFooter from "../SDialog/SDialogFooter/SDialogFooter.js";
import SDialogClose from "../SDialog/SDialogClose/SDialogClose.js";
import SInfoCard from "../SInfoCard/SInfoCard.js";
import useIsMobile from "../../hooks/useMobile.js";
import SDropDown from "../SDropDown/SDropDown.js";
import SDropDownTrigger from "../SDropDown/SDropDownTrigger/SDropDownTrigger.js";
import SDropDownContent from "../SDropDown/SDropDownContent/SDropDownContent.js";
import SDropDownItem from "../SDropDown/SDropDownItem/SDropDownItem.js";
import SPastille from "../SPastille/SPastille.js";


const meta = {
    title       : "Components/SForm",
    component   : SForm,
    tags        : ["autodocs"],
    args        : {
        onSubmit : (v) => {
            console.log(v);
            action("onSubmit")(v);
        }, children : <></>
    },
    argTypes : {
        children : {control: false}, onSubmit : {control: false},
    },
    parameters : {
        docs : {
            description : {
                component : "Formulaire permettant de récupérer sous forme d'objet les données des champs."
            }
        }
    }
} satisfies Meta<typeof SForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const classes = [
    {id: "6eA", name: "6eme A", color: "#3b53ff"},
    {id: "6eB", name: "6eme B", color: "#3044d6"},
    {id: "6eC", name: "6eme C", color: "#4c58aa"},
    {id: "5eA", name: "5eme A", color: "#e1005b"},
    {id: "5eB", name: "5eme B", color: "#d25789"},
    {id: "5eC", name: "5eme C", color: "#9a2655"},
]

export const Form : Story = {
    args : {
        children : <>
        </>
    },
    render : (args) => {

        const validateField = useCallback(( v? : string) : string | undefined => {
            if (!v || v.length < 2) return "Le champ doit contenir au moins deux (2) caractères";
        }, []);

        const validateEmail = useCallback((v? : string) : string | undefined => {
            if (!v || v.length < 5) return "L'adresse e-mail n'est pas valide !";
        }, []);

        const validateRadio = useCallback((v? : string) : string | undefined => {
            if (!v) return "Veuillez sélectionner le sexe de l'élève"
        }, [])

        return(
            <SForm id={"t"} {...args}>
                <SField label="Nom de famille de l'élève">
                    <SInput placeholder={"Nom de famille"} name={"lastname"} icon={"title"} validate={validateField}/>
                </SField>
                <SField label="Prénom de l'élève">
                    <SInput placeholder={"Prénom"} name={"firstname"} icon={"title"} validate={validateField} />
                </SField>
                <SField label="Sexe de l'élève">
                    <SRadioButton validate={validateRadio} values={[{value:"Masculin"},{value:"Féminin"}]} name={"sexe"} />
                </SField>
                <SField label={"Connexion Schoolmore"}>
                    <SCheckbox name={"connect"} label={"Autoriser la connexion à l'espace Schoolmore sur le web"} />
                </SField>
                <SField label={"Adresse e-mail de l'élève"}>
                    <SInput type={"email"} placeholder={"Tapez l'adresse e-mail de l'élève"} name={"email"}
                            icon={"alternate_email"} validate={validateEmail} />
                </SField>
                <SDropDown>
                    <SDropDownTrigger>
                        <SField label={"Classe de l'élève"}>
                            <SInput placeholder={"Sélectionnez la classe de l'élève"} name="classe" icon="school" />
                        </SField>
                    </SDropDownTrigger>
                    <SDropDownContent>
                        {classes.map((c,i) => (
                            <SDropDownItem value={c.id} text={c.name} key={i}>
                                <SPastille color={c.color} />
                                <p>{c.name}</p>
                            </SDropDownItem>
                        ))}
                    </SDropDownContent>
                </SDropDown>
                <SButtonGroup>
                    <SButton variant={"secondary"} text={"Annuler"} />
                    <SButton variant={"primary"} text={"Valider"} formId={"t"} />
                </SButtonGroup>
            </SForm>
        );
    }
}

export const FormDialog : Story = {
    render: (args) => {

        const [open, setOpen] = useState(false);
        const [isConnected, setIsConnected] = useState<boolean>(false);
        const [error, setError] = useState<boolean>(false);

        const handleSubmit = (v : Record<string, FormDataEntryValue>) : void => {
            action("onSubmit")(v);
            if (!v.username || !v.password) return;
            if (v.username !== "user.admin" || v.password !== "admin") return setError(true);
            setError(false);
            setIsConnected(true);
            setOpen(false);
        }

        const validateField = useCallback((v? : string) : string | undefined => {
            if (!v || v.length < 4) return "Veuillez indiquer une valeur valide"
        }, []);

        const openDialog = () : void => setOpen(true);
        const isMobile = useIsMobile();

        return (
            <>
                <h1>Formulaire de connexion</h1>
                <p style={{display:"flex",alignItems:"center"}}>Connectez-vous avec le compte : <pre> user.admin </pre>
                    et le mot de passe <pre> admin </pre></p>
                <p>Actuellement connecté : {isConnected?'oui':'non'}</p>
                <SDialog open={open} onOpenChange={setOpen}>
                    <SDialogTrigger>
                        <SButton onClick={openDialog} variant={"primary"} text={"Se connecter"} frontIcon={"login"} />
                    </SDialogTrigger>
                    <SDialogContent isMovable={true} title={"Connexion à votre compte"}>
                        <SDialogBody>
                            {error&&<SInfoCard variant={"danger"} texte={"Mot de passe ou nom d'utilisateur invalide"} />}
                            <SForm id={"connect"} {...args} onSubmit={handleSubmit}>
                                <SField label={"Nom d'utilisateur"}>
                                    <SInput placeholder={"Tapez le nom d'utilisateur"} name={"username"} onChange={() => setError(false)}
                                            icon={"person"} validate={validateField} background={isMobile?"muted":"white"}  />
                                </SField>
                                <SField label={"Mot de passe"}>
                                    <SInput placeholder={"Tapez le mot de passe"} name={"password"} onChange={() => setError(false)} type={"password"}
                                            icon={"password"} background={isMobile?"muted":"white"} validate={validateField} />
                                </SField>
                                <SField label={"Rester connecté"}>
                                    <SCheckbox name={"stayConnected"} label={"Rester connecté pendant 1 mois"} />
                                </SField>
                            </SForm>
                        </SDialogBody>
                        <SDialogFooter>
                            <SDialogClose>
                                <SButton variant={"secondary"} text={"Annuler"} />
                            </SDialogClose>
                            <SButton formId={"connect"} variant={"primary"} text={"Se connecter"} />
                        </SDialogFooter>
                    </SDialogContent>
                </SDialog>
            </>
        );
    }
}