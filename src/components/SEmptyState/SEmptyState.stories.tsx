import type { Meta, StoryObj } from "@storybook/react-vite";
import SEmptyState from "./SEmptyState.js";
import * as React from "react";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/SEmptyState",
    component   : SEmptyState,
    tags        : ["autodocs"],
    args        : {
        title : "Aucune option", icon : "search_off", description : "Aucune option n'a été trouvée",background : "muted"
    },
    argTypes : {
        icon : { type : "string"}
    },
    parameters : {
        docs : {
            description : {
                component : "Ce composant informe l'utilisateur qu'aucune ressources n'est disponibles, où qu'aucun " +
                    "item n'a été sélectionné."
            }
        }
    }
} satisfies Meta<typeof SEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const fullSize : React.CSSProperties = {
    width           : "100dvw",
    height          : "100dvh",
    display         : "flex",
    alignItems      : "center",
    justifyContent  : "center",
}

const fullSizeWhite : React.CSSProperties = {...fullSize, background: "var(--scm-ui-bg-muted)",}

export const EmptyState : Story = {
    render : (args) => (
        <div style={fullSize}>
            <SEmptyState {...args} />
        </div>
    )
}
export const WhiteBackground : Story = {
    args : {
        background : "white"
    },
    parameters : { controls : { include : ["title","icon","description"]}},
    render : (args) => (
        <div style={fullSizeWhite}>
            <SEmptyState {...args} />
        </div>
    )
}
export const Action : Story = {
    args : {
        onClick : (e) => {
            console.log("onClick ", e);
            action("onClick")(e);
        }
    },
    render : (args) => (
        <div style={fullSize}>
            <SEmptyState {...args} />
        </div>
    )
}