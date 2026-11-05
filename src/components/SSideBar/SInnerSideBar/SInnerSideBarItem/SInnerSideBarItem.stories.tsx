import type { Meta, StoryObj } from "@storybook/react-vite";
import SInnerSideBarItem from "./SInnerSideBarItem.js";


const meta = {
    title       : "Components/SideBar/InnerSideBar/SInnerSideBarItem",
    component   : SInnerSideBarItem,
    tags        : ["autodocs"],
    args        : {
        name: "Onglet"
    },
    parameters : {
        docs : {
            description : {
                component : "Onglet permettant de changer la page. Cet onglet appartient à une catégorie parent"
            }
        }
    }
} satisfies Meta<typeof SInnerSideBarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Onglet : Story = {
    args : {}
}

export const OngletSelected : Story = {
    args : {
        selected : true
    }
}
export const OngletNotification : Story = {
    args : {
        notif : 99
    }
}

export const OngletDisabled : Story = {
    args: {
        disabled : true,
    }
}