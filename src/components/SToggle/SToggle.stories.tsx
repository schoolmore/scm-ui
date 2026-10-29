import type { Meta, StoryObj } from "@storybook/react-vite";
import SToggle from "./SToggle.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/SToggle",
    component   : SToggle,
    tags        : ["autodocs"],
    args        : {
        state: false,name:"test",
    },
    parameters : {
        docs : {
            description : {
                component : "Contrairement au `SToggleButton`, ce composant permet d'activer/désactiver une unique " +
                    "valeur. Généralement utilisé pour les actions plus importantes qu'une `SCheckbox`"
            }
        }
    }
} satisfies Meta<typeof SToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggle : Story = {}
export const Action : Story = {
    args : {
        onClick : (v) => {
            console.log("onClick ", v);
            action("onClick")(v);
        }
    }
}