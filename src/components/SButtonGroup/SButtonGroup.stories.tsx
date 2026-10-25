import type { Meta, StoryObj } from "@storybook/react-vite";
import SButtonGroup from "./SButtonGroup.js";
import SButton from "../SButton/SButton.js";


const meta = {
    title       : "Components/SButtonGroup",
    component   : SButtonGroup,
    tags        : ["autodocs"],
    args        : {
        children : <>
            <SButton variant="secondary" text="Annuler" />
            <SButton variant="primary" text="Sauvegarder" />
        </>, fitWidth : false,
    },
    argTypes : {
        children : { control : false}
    },
    parameters : {
        docs : {
            description : {
                component : "Composant permettant de grouper plusieurs boutons ensembles."
            }
        }
    }
} satisfies Meta<typeof SButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group : Story = {};
export const FitWidth : Story = {
    args : {
        fitWidth : true,
    }
}