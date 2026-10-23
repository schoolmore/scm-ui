import SPastille, { type T_SPastilleSize } from "./SPastille.js";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";


const meta = {
    title       : "Components/SPastille",
    component   : SPastille,
    tags        : ["autodocs"],
    args        : {
        size        : "default"
    },
    parameters : {
        docs : {
            description : {
                component : "La pastille permet de différencier à l'aide de couleur les différentes ressources disponibles. " +
                    "Elle s'affiche dans les listes, les tableaux et sur les différentes interfaces de l'utilisateur."
            }
        }
    }
} satisfies Meta<typeof SPastille>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pastille : Story = {
    args : {
        color   : "#0074B5"
    }
}

const sizes = ["xl","lg","default","sm"] as T_SPastilleSize[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    args    : {color : "#0074B5"},
    parameters : {controle : {include : ["color"]}},
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {sizes.map(s => (
                <div style={dispCenter}>
                    <SPastille  {...args} size={s} />
                </div>
            ))}
        </div>
    )
}