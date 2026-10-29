import type { Meta, StoryObj } from "@storybook/react-vite";
import STest from "./STest.js";


const meta = {
    title       : "Components/STest",
    component   : STest,
    tags        : ["autodocs"],
    args        : {
        text : "Test d'un texte"
    },
    parameters : {
        docs : {
            description : {
                component : "Test d'un composant"
            }
        }
    }
} satisfies Meta<typeof STest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test : Story = {}