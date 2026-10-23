import type { Meta, StoryObj } from "@storybook/react-vite";
import SMaterialSymbols, { type T_SMaterialSymbolsSize, type T_SMaterialSymbolsWeight } from "./SMaterialSymbols";
import type { CSSProperties } from "react";


const meta = {
    title       : "Components/SMaterialSymbols",
    component   : SMaterialSymbols,
    tags        : ["autodocs"],
    args        : {
        size : "xl", weight: "normal", icon : "home"
    },
    parameters : {
        docs : {
            description : {
                component : "Composant permettant de gérer les différents états d'une icône. Utilisation de la " +
                    "bibliothèque de Google, Material Symbols"
            }
        }
    }
} satisfies Meta<typeof SMaterialSymbols>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaterialSymbols : Story = {
    args    : { icon : "home" }
}

const size = ["xxl", "xl", "lg", "default", "sm", "xs"] as T_SMaterialSymbolsSize[];
const weight = ["extrabold", "bold", "semibold", "medium", "normal", "light", "thin"] as T_SMaterialSymbolsWeight[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    args : { icon : "home" },
    parameters : { controls : { include : ["icon","weight","color","fill"]}},
    render : (args) => (
        <div style={gridStyle(size.length)}>
            {size.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {size.map(s => (
                <div style={dispCenter}>
                    <SMaterialSymbols {...args} size={s} />
                </div>
            ))}
        </div>
    )
}

export const Weights: Story = {
    args : { icon : "home" },
    parameters : { controls : { include : ["icon","size","color","fill"]}},
    render : (args) => (
        <div style={gridStyle(weight.length)}>
            {weight.map(w => <div key={w} style={dispCenter}><p>{w}</p></div>)}
            {weight.map(w => (
                <div style={dispCenter}>
                    <SMaterialSymbols {...args} weight={w} />
                </div>
            ))}
        </div>
    )
}