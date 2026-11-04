import type { Meta, StoryObj } from "@storybook/react-vite";
import SSettingsField from "./SSettingsField.js";
import SToggle from "../SToggle/SToggle.js";
import SInput from "../SInput/SInput.js";
import SButton from "../SButton/SButton.js";


const meta = {
    title       : "Components/SSettingsField",
    component   : SSettingsField,
    tags        : ["autodocs"],
    args        : {

    },
    argTypes : {
        children : { control : false },
    },
    parameters : {
        docs : {
            description : {
                component : "Champ de modification d'un paramètre. Peut également être utilisé pour certains paramètre " +
                    "dans un formulaire."
            }
        }
    }
} satisfies Meta<typeof SSettingsField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggle : Story = {
    args : {
        label : "Autoriser la connexion",
        description : "Autoriser les responsable à se connecter à l'application Schoolmore",
        children : <SToggle name={"connect"} />
    }
}

const validateInput = (s? : string) : string | undefined => {
    if (!s || Number.isNaN(s)) return "Veuillez indiquer un coefficient valide !";
    const num : number = Number(s);
    if (num < 0.05 || num > 5) return "Veuillez indiquer un coefficient entre 0.05 et 5 !";
}

export const Input : Story = {
    args : {
        label : "Coefficient de la matière",
        description : "Veuillez indiquer un coefficient entre 0.05 et 5 pour votre matière",
        children : <SInput placeholder={"Coefficient de la matière"} name={"coef"} icon={"123"} type={"number"}
        validate={validateInput} step={0.01} min={0.05} max={5} />
    }
}

export const Button : Story = {
    args : {
        label : "Paramètres de connexion",
        children : <>
            <SButton variant={"primary"} text={"Ouvrir les paramètres"} />
        </>
    }
}