import SCheckbox, { type T_SCheckboxSize } from "./SCheckbox.js";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/Checkbox/SCheckbox",
    component   : SCheckbox,
    tags        : ["autodocs"],
    args        : {
        label       : "Autoriser la connexion à l'espace parent", state : "off", size : "default",name:"connect",
    },
    parameters : {
        docs : {
            description : {
                component : ""
            }
        }
    }
} satisfies Meta<typeof SCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox : Story = {}
export const CheckboxIndetermindate : Story = {
    args : {
        state : "indeterminate",
    }
}
export const CheckboxDisabled : Story = {
    args : {
        state : "on", disabled : true,
    }
}

export const CheckboxAction : Story = {
    args : {
        state: "off", onChange : (v) => {
            console.log("Changement checkbox ", v);
            action("onChange")(v);
        }
    }
}

const sizes = ["lg","default","sm","xs"] as T_SCheckboxSize[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };


export const Sizes : Story = {
    args : {state :"on"},
    parameters: {controls: {include : ["label","disabled","state"]}},
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => (<div key={s} style={dispCenter}><p>{s}</p></div>))}
            {sizes.map(s => (
                <SCheckbox key={s} {...args} size={s} />
            ))}
        </div>
    )
}