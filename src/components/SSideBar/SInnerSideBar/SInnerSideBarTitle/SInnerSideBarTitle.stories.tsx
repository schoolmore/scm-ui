import type { Meta, StoryObj } from "@storybook/react-vite";
import SInnerSideBarTitle from "./SInnerSideBarTitle.js";


const meta = {
    title       : "Components/SideBar/InnerSideBar/SInnerSideBarTitle",
    component   : SInnerSideBarTitle,
    tags        : ["autodocs"],
    args        : {
        title : "Titre",
    },
    parameters : {
        docs : {
            description : {
                component : "Titre affiché dans la sidebar interne pour un choix des onglets dans une catégorie"
            }
        }
    }
} satisfies Meta<typeof SInnerSideBarTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title : Story = {}
export const Notification : Story = {
    args : {
        notif : 140
    }
}