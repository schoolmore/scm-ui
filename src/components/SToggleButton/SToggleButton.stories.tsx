import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import SToggleButton, { type T_SToggleButtonSize } from "./SToggleButton.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/SToggleButton",
    component   : SToggleButton,
    tags        : ["autodocs"],
    args        : {
        toggles     : [
            {
                texte       : "Toutes les séances",
                all         : true,
                selected    : true,
            },
            {
                texte   : "Séance modifiées",
            },
            {
                texte   : "Séance supprimée"
            },
            {
                texte   : "Séance à placer"
            },
            {
                texte   : "Séance à modifier"
            },
            {
                texte   : "Séance sans catégorie"
            }
        ], size : "default",
    },
    parameters : {
        docs : {
            description : {
                component : "Liste de boutons permettant d'avoir un état on/off. Utile notamment pour les filtres " +
                    "ou l'affichage de condition de certaines ressources."
            }
        }
    }
} satisfies Meta<typeof SToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleButtons : Story = {}
export const Action : Story = {
    args : {
        onClick : (n,i) => {
            console.log("onClick ", n, i);
            action("onClick")(n, i);
        }
    }
}

const sizes = ["lg","default","sm","xs"] as T_SToggleButtonSize[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    args : {
        toggles : [{texte:"Toggle"}]
    },
    parameters : {
        controls : {
            include : []
        }
    },
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {sizes.map(s => (
                <SToggleButton {...args} size={s} />
            ))}
        </div>
    )
}