import type { Meta, StoryObj } from "@storybook/react-vite";
import { SSideBar } from "../../index.js";
import SSideBarItem from "./SSideBarItem/SSideBarItem.js";
import SAvatar from "../SAvatar/SAvatar.js";


const meta = {
    title       : "Components/SideBar/SSideBar",
    component   : SSideBar,
    tags        : ["autodocs"],
    args        : {
        icon : "https://ui.schoolmore.fr/assets/scm-ui-20txYIBq.svg",
        children : <>
            <SSideBarItem icon={"home"} selected={true} />
            <SSideBarItem icon={"database"} />
            <SSideBarItem icon={"info"} />
            <SSideBarItem icon={"send"} />
            <SSideBarItem icon={"running_with_errors"} disabled={true} />
        </>,
        end : <>
            <SAvatar texte={"JOEY"} />
        </>
    },
    argTypes : {
        children : {control : false}, end : { control : false},
    },
    parameters : {
        docs : {
            description : {
                component : "Barre de navigation permettant de naviguer entre les onglets de l'application"
            }
        },
        layout : 'fullscreen',
    }
} satisfies Meta<typeof SSideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBar : Story = {}