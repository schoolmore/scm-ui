import type { Meta, StoryObj } from "@storybook/react-vite";
import SInnerSideBar from "./SInnerSideBar.js";
import SInnerSideBarTitle from "./SInnerSideBarTitle/SInnerSideBarTitle.js";
import SInnerSideBarItem from "./SInnerSideBarItem/SInnerSideBarItem.js";


const meta = {
    title       : "Components/SideBar/InnerSideBar/SInnerSideBar",
    component   : SInnerSideBar,
    tags        : ["autodocs"],
    args        : {
    },
    argTypes : {
        children : {control : false},
    },
    parameters : {
        docs : {
            description : {
                component : "Barre de navigation interne permettant de sélectionner l'onglet parmi une catégorie"
            }
        },
        layout : 'fullscreen',
    }
} satisfies Meta<typeof SInnerSideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBar : Story = {
    args : {
        children : <>
            <SInnerSideBarTitle title="Notes et compétences" />
            <SInnerSideBarItem name="Ma moyenne" selected={true} />
            <SInnerSideBarItem name="Dernières notes" notif={2} />
            <SInnerSideBarItem name="Calculer ma moyenne" disabled={true} />
            <SInnerSideBarItem name="Dernières compétences" />
        </>
    }
}