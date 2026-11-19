import type { Meta, StoryObj } from "@storybook/react-vite";
import SSelectionCard from "./SSelectionCard.js";
import SCheckbox from "../SCheckbox/SCheckbox.js";
import SPastille from "../SPastille/SPastille.js";


const meta = {
    title       : "Components/SSelectionCard",
    component   : SSelectionCard,
    tags        : ["autodocs"],
    args        : {
    },
    argTypes : {
        children : {
            control : false,
        },
    },
    parameters : {
        docs : {
            description : {
                component : "Carte généralement affichée dans les dialogues permettant la sélection d'un élément."
            }
        }
    }
} satisfies Meta<typeof SSelectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox : Story = {
    args : {
        children : <>
            <SCheckbox name={"test"} />
            <SPastille color="941104" />
            <p>6eme A</p>
        </>
    }
}