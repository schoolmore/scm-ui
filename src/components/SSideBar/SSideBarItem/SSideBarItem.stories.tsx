import type { Meta, StoryObj } from "@storybook/react-vite";
import SSideBarItem from "./SSideBarItem.js";


const meta = {
    title       : "Components/SideBar/SSideBarItem",
    component   : SSideBarItem,
    tags        : ["autodocs"],
    args        : {
        notif : 0, disabled : false, selected : false, name : "Catégorie"
    },
    parameters : {
        docs : {
            description : {
                component : "Catégorie principale contenant plusieurs onglets"
            }
        }
    }
} satisfies Meta<typeof SSideBarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item : Story = {}
export const ItemSelected : Story = {
    args : {
        selected : true,
    }
}
export const ItemNotification : Story = {
    args : {
        notif : 42
    }
}
export const ItemDisabled : Story = {
    args : {
        disabled : true,
    }
}