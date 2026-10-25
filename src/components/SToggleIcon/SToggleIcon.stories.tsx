import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CSSProperties, useState } from "react";
import SToggleIcon from "./SToggleIcon.js";
import { action } from "storybook/actions";
import type { T_SMaterialSymbolsSize } from "../SMaterialSymbols/SMaterialSymbols.js";


const meta = {
    title       : "Components/SToggleIcon",
    component   : SToggleIcon,
    tags        : ["autodocs"],
    args        : {
        icon : "edit",selected:false,size:"default",disabled:false
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher un bouton permettant d'activer/désactiver un état en affichant une unique icône."
            }
        }
    }
} satisfies Meta<typeof SToggleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggle : Story = {}
export const Action : Story = {
    render: (args) => {
        const [slc, setSlc] = useState(args.selected);
        return <SToggleIcon {...args} selected={slc} onClick={(v: boolean) => { action("onClick")(v); setSlc(v); }} />;
    }
}

const sizes = ["xxl", "xl", "lg", "default", "sm", "xs"] as T_SMaterialSymbolsSize[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    parameters : {
        controls : {
            include : ["icon", "selected"]
        }
    },
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {sizes.map(s => (
                <div style={dispCenter} key={s}>
                    <SToggleIcon key={s} {...args} size={s} />
                </div>
            ))}
        </div>
    )
}