import SInputErrorMessage from "./SInputErrorMessage.js";
import type { Meta, StoryObj } from "@storybook/react-vite";


const meta = {
    title       : "Components/SInput/SInputErrorMessage",
    component   : SInputErrorMessage,
    tags        : ["autodocs"],
    args        : {
        message : "L'adresse e-mail indiquée n'est pas valide."
    },
    parameters : {
        docs : {
            description : {
                component : "Composant permettant de décrire une erreur sur un champ de saisie.<br>" +
                    "Permets de notifier l’utilisateur pourquoi le formulaire n'est pas valide."
            }
        }
    }
} satisfies Meta<typeof SInputErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputErrorMessage : Story = {
    args : {
        idMsg : "yes"
    }
}