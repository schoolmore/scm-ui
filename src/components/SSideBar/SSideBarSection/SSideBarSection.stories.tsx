import type { Meta, StoryObj } from "@storybook/react-vite";
import SSideBarSection from "./SSideBarSection.js";
import SSideBarItem from "../SSideBarItem/SSideBarItem.js";


const meta = {
    title       : "Components/SideBar/SSideBarSection",
    component   : SSideBarSection,
    tags        : ["autodocs"],
    args        : {
        children : <>
            <SSideBarItem name={"Classes"} />
            <SSideBarItem name={"Matières"} />
            <SSideBarItem name={"Groupes"} disabled={true} />
            <SSideBarItem name={"Salles"} notif={2} />
        </>, name : "Ressources", icon : "database"
    },
    argTypes : {
        children : {control : false}
    },
    parameters : {
        docs : {
            description : {
                component : "Section d'un onglet comprenant plusieurs catégories"
            }
        }
    }
} satisfies Meta<typeof SSideBarSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Section : Story = {}

export const Disabled : Story = {
    args : {
        disabled : true,
    }
}

export const Collapsed : Story = {
    args : {
        collapsed : true,
    }
}

export const CollapsedSelected : Story = {
    args : {
        collapsed : true, selected : true,
    }
}