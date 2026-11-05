import type { Meta, StoryObj } from "@storybook/react-vite";
import { SSideBar } from "../../index.js";
import SSideBarSection from "./SSideBarSection/SSideBarSection.js";
import SSideBarItem from "./SSideBarItem/SSideBarItem.js";


const meta = {
    title       : "Components/SideBar/SSideBar",
    component   : SSideBar,
    tags        : ["autodocs"],
    args        : {
        icon : "https://ui.schoolmore.fr/assets/scm-ui-20txYIBq.svg",
        children : <>
            <SSideBarSection icon="home" name="Menu" >
                <SSideBarItem name="Récapitulatif des données" />
            </SSideBarSection>
            <SSideBarSection icon="info" name="Informations" >
                <SSideBarItem name="Informations" />
                <SSideBarItem name="Archives" />
                <SSideBarItem name="File d'attente" disabled={true} />
            </SSideBarSection>
            <SSideBarSection defaultOpen={false} icon="database" name="Ressources">
                <SSideBarItem name={"Classes"} />
                <SSideBarItem name={"Matières"} />
                <SSideBarItem name={"Groupes"} disabled={true} />
                <SSideBarItem name={"Salles"} notif={2} />
                <SSideBarItem name={"Options"} />
            </SSideBarSection>
            <SSideBarSection icon="send" name="Messages">
                <SSideBarItem name="Mes messages" />
                <SSideBarItem name="Modération des messages" notif={94} />
            </SSideBarSection>
            <SSideBarSection defaultOpen={false} icon="running_with_errors" name="Conflits">
                <SSideBarItem name="Gérer les conflits" />
            </SSideBarSection>
            <SSideBarSection icon="update" disabled={true} name="Mises à jour">
                <SSideBarItem name="Mettre à jour"/>
            </SSideBarSection>
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