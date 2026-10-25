import type { Meta, StoryObj } from "@storybook/react-vite";
import SDialogTitle from "./SDialogTitle.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/Dialog/SDialogTitle",
    component   : SDialogTitle,
    tags        : ["autodocs"],
    args        : {
        title : "Sélectionner les classe", close : true,
    },
    parameters : {
        docs : {
            description : {
                component : "Barre de titre des dialogues"
            }
        }
    }
} satisfies Meta<typeof SDialogTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title : Story = {};
export const Action : Story = {
    args : {
        onClick: () => {
            console.log("onClick ");
            action("onClick")({name : "onClick"})
        }
    }
}
export const Movable : Story = {
    args : {
        isMovable : true,
    }
}