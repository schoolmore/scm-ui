import type { Meta, StoryObj } from "@storybook/react-vite";
import SButtonSSO from "./SButtonSSO.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/SButtonSSO",
    component   : SButtonSSO,
    tags        : ["autodocs"],
    args        : {

    },
    parameters : {
        docs : {
            description : {
                component : "Bouton permettant aux applications de se connecter via le compte unique SchoolMore SSO."
            }
        }
    }
} satisfies Meta<typeof SButtonSSO>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonSSO : Story = {}
export const Action : Story = {
    args : {
        onClick : (e) => {
            console.log("onClick ", e);
            action("onClick")(e);
        }
    }
}