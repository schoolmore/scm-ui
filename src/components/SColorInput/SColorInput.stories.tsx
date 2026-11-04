import type { Meta, StoryObj } from "@storybook/react-vite";
import SColorInput from "./SColorInput.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/SColorInput",
    component   : SColorInput,
    tags        : ["autodocs"],
    args        : {
        name : "color", disabled : false,
    },
    parameters : {
        docs : {
            description : {
                component : "Champ permettant à un utilisateur de sélectionner la couleur d'affichage d'une ressource"
            }
        }
    }
} satisfies Meta<typeof SColorInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorInput : Story = {
}

export const Action : Story = {
    args : {
        onChange : (s? : string) : void => {
            console.log("onChange ", s);
            action("onChange")(s);
        },
        validate : (s? : string) : string|undefined => {
            if (!s || s === "#000000") return "Cette valeur n'est pas autorisée";
        }
    }
}

export const Disabled : Story = {
    args : {
        disabled : true
    }
}