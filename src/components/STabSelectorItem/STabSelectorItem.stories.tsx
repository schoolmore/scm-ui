import type { Meta, StoryObj } from "@storybook/react-vite";
import STabSelectorItem from "./STabSelectorItem.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/TabSelector/STabSelectorItem",
    component   : STabSelectorItem,
    tags        : ["autodocs"],
    args        : {
        texte       : "Élèves", icon : "person",enabled:true,
    },
    parameters : {
        docs : {
            description : {
                component : "Onglet faisant parti du composant parent **STabSelector**. Ce composant permet de " +
                    "changer l'onglet affiché."
            }
        }
    }
} satisfies Meta<typeof STabSelectorItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item : Story = {}
export const Selected : Story = {
    args : {selected : true}
}
export const Disabled : Story = {
    args : {enabled : false}
}
export const Action : Story = {
    args : {onClick:() => {
            console.log("OnClick");
            action("onClick")();
        }}
}