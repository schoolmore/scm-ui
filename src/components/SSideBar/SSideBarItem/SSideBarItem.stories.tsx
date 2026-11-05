import type { Meta, StoryObj } from "@storybook/react-vite";
import SSideBarItem from "./SSideBarItem.js";


const meta = {
    title       : "Components/SideBar/SSideBarItem",
    component   : SSideBarItem,
    tags        : ["autodocs"],
    args        : {
        disabled : false, selected : false, icon: "database", label : "Notes et compétences",
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
export const ItemDisabled : Story = {
    args : {
        disabled : true,
    }
}