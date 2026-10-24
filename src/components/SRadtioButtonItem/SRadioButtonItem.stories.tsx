import type { Meta, StoryObj } from "@storybook/react-vite";
import SRadioButtonItem from "./SRadioButtonItem.js";


const meta = {
    title       : "Components/RadioButton/SRadioButtonItem",
    component   : SRadioButtonItem,
    tags        : ["autodocs"],
    args        : {
        value : "Choix 1",
    },
    parameters : {
        docs : {
            description : {
                component : "Item composant un champ de `SRadioButton`. Les items sont générés automatiquement"
            }
        }
    }
} satisfies Meta<typeof SRadioButtonItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item : Story = {}