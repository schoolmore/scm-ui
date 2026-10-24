import type { Meta, StoryObj } from "@storybook/react-vite";
import SLink from "./SLink.js";
import 'material-symbols';
import { action } from "storybook/actions";


const meta = {
    title       : "Components/SLink",
    component   : SLink,
    tags        : ["autodocs"],
    args        : {
        texte : "Consulter la documentation scm-app"
    },
    parameters : {
        docs : {
            description : {
                component : "Composant permettant de gérer les liens. Le lien doit cependant être géré par la " +
                    "méthode `onClick`, le composant gère uniquement l'affichage du lien"
            }
        }
    }
} satisfies Meta<typeof SLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Link : Story = {}

export const Context : Story = {
    parameters : { controls : { include : ["blank"]}},
    render  : (args) => (
        <p>Vous pouvez choisir de <SLink {...args} /> sur le site officiel. Pour toutes demandes concernant
        le logiciel serveur <i>(scm-serv)</i>, merci de faire la demande via le &nbsp;
        <SLink texte="formulaire" blank={true} /> sur la page dédiée.</p>
    )
}

export const Action : Story = {
    args : {
        onClick : (e) => {
            console.log("onClick");
            action("onClick")(e)
        }
    }
}