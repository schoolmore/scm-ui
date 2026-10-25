import type { Meta, StoryObj } from "@storybook/react-vite";
import SDialogFooter from "./SDialogFooter.js";
import SButton from "../../SButton/SButton.js";


const meta = {
    title       : "Components/Dialog/SDialogFooter",
    component   : SDialogFooter,
    tags        : ["autodocs"],
    args        : {
        children : <>
            <SButton variant={"secondary"} text={"Annuler"} />
            <SButton variant={"primary"} text={"Valider"} />
        </>
    },
    argTypes : {
        children : { control : false }, iconEdit : {type :"string"},
    },
    parameters : {
        docs : {
            description : {
                component : "Pied de page du dialogue. Afficher les actions disponibles ainsi que l'édition, si " +
                    "disponible."
            }
        }
    }
} satisfies Meta<typeof SDialogFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Footer : Story = {}
export const Edition : Story = {
    args : {
        toggleEdit : true,
    }
}