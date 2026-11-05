import type { Meta, StoryObj } from "@storybook/react-vite";
import { SSideBar } from "../../index.js";
import type { ISideBarCreator } from "./SSideBar.js";
import SAvatar from "../SAvatar/SAvatar.js";
import SScmApp from "../SScmApp/SScmApp.js";
import SMainApp from "../SMainApp/SMainApp.js";

/** Page de démonstration affichée dans SMainApp */
const DemoPage = ( { title } : { title : string } ) => (
    <div style={{ padding : "2em", fontFamily : "var(--scm-font-family), sans-serif" }}>
        <h1>{title}</h1>
        <p>Contenu de la page « {title} »</p>
    </div>
);

const items : ISideBarCreator[] = [
    {
        id : "accueil", icon : "home", title : "Accueil",
        tabs : [
            { id : "tableau-de-bord", name : "Tableau de bord", page : <DemoPage title="Tableau de bord" /> },
            { id : "actualites", name : "Actualités", page : <DemoPage title="Actualités" />, notif : 3 },
        ],
    },
    {
        id : "notes", icon : "database", title : "Notes et compétences",
        tabs : [
            { id : "moyenne", name : "Ma moyenne", page : <DemoPage title="Ma moyenne" /> },
            { id : "dernieres-notes", name : "Dernières notes", page : <DemoPage title="Dernières notes" />, notif : 2 },
            { id : "calcul", name : "Calculer ma moyenne", page : <DemoPage title="Calculer ma moyenne" />, disabled : true },
            { id : "competences", name : "Dernières compétences", page : <DemoPage title="Dernières compétences" /> },
        ],
    },
    {
        id : "infos", icon : "info", title : "Informations",
        tabs : [
            { id : "etablissement", name : "Mon établissement", page : <DemoPage title="Mon établissement" /> },
        ],
    },
    {
        id : "messagerie", icon : "send", title : "Messagerie",
        tabs : [
            { id : "recus", name : "Messages reçus", page : <DemoPage title="Messages reçus" />, notif : 12 },
            { id : "envoyes", name : "Messages envoyés", page : <DemoPage title="Messages envoyés" /> },
        ],
    },
    {
        id : "erreurs", icon : "running_with_errors", title : "Erreurs", disabled : true,
        tabs : [
            { id : "logs", name : "Journaux", page : <DemoPage title="Journaux" /> },
        ],
    },
];

const meta = {
    title       : "Components/SideBar/SSideBar",
    component   : SSideBar,
    tags        : ["autodocs"],
    args        : {
        icon : "https://ui.schoolmore.fr/assets/scm-ui-20txYIBq.svg",
        items,
        end : <>
            <SAvatar texte={"JOEY"} />
        </>
    },
    argTypes : {
        items : {control : false}, end : { control : false},
    },
    decorators : [
        (Story) => (
            <SScmApp>
                <Story />
                <SMainApp />
            </SScmApp>
        ),
    ],
    parameters : {
        docs : {
            description : {
                component : "Barre de navigation permettant de naviguer entre les onglets de l'application. " +
                    "Elle doit être placée dans un `SScmApp`, les pages des onglets s'affichant dans `SMainApp`."
            }
        },
        layout : 'fullscreen',
    }
} satisfies Meta<typeof SSideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBar : Story = {}
