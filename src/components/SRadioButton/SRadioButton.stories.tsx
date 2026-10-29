import type { Meta, StoryObj } from "@storybook/react-vite";
import SRadioButton from "./SRadioButton.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/RadioButton/SRadioButton",
    component   : SRadioButton,
    tags        : ["autodocs"],
    args        : {
        values : ["6eme","5eme","4eme","3eme","2nd","1ere","Tie"].map(
            v => ({value:v})), name: "classe",
    },
    parameters : {
        docs : {
            description : {
                component : "Composant d'un formulaire permettant de sélectionner une unique valeur parmi plusieurs " +
                    "valeurs. Pour une liste avec des choix personnalisées, utiliser `SDropDown`"
            }
        }
    }
} satisfies Meta<typeof SRadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioButton : Story = {}
export const Action : Story = {
    args : {
        onChange : (n,o) => {
            console.log("onChange ", n, o);
            action("onChange")(n,o);
        }
    }
}
export const Disabled : Story = {
    args : {
        values : ["6eme","5eme","4eme","3eme","2nd","1ere","Tie"].map(
            (v,i) => ({value:v,disabled:(i===3||i===5)}))
    }
}
export const Selected : Story = {
    args : {
        selected : 1
    }
}
export const Validate : Story = {
    args : {
        validate : (v? : string) : string | undefined => {
            if (!v || v !== "6eme") return "La classe doit respecter la contrainte suivante : \"6eme\""
        }
    }
}