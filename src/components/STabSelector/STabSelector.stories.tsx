import type { Meta, StoryObj } from "@storybook/react-vite";
import STabSelector from "./STabSelector.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/TabSelector/STabSelector",
    component   : STabSelector,
    tags        : ["autodocs"],
    args        : {
        tabs : [
            {
                texte   : "Informations principales",
                icon    : "info"
            },
            {
                texte   : "Options",
                icon    : "stars"
            },
            {
                texte   : "Emploi du temps",
                icon    : "view_week",
                enabled : false,
            },
            {
                texte   : "Vie scolaire",
                icon    : "school"
            },
            {
                texte   : "Parcours scolaire",
                icon    : "route",
                enabled : false,
            },
            {
                texte   : "Responsables",
                icon    : "supervisor_account"
            }
        ]
    },
    argTypes : {
        tabs : {control : false}
    },
    parameters : {
        docs : {
            description : {
                component : "Gérer l'affichage de plusieurs onglets. Ce composant crée automatiquement les enfants " +
                    "en fonction de la liste passée en paramètres."
            }
        }
    }
} satisfies Meta<typeof STabSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabSelector : Story = {}
export const Action : Story = {
    args : {
        selected: 3,
        onChange : (i) => {
            console.log("onChange ", i);
            action("onChange")(i);
        }
    }
}