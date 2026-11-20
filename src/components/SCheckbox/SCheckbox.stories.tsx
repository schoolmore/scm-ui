import SCheckbox, { type T_SCheckboxSize, type T_SCheckboxState } from "./SCheckbox.js";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CSSProperties, useState } from "react";
import { action } from "storybook/actions";
import SToggleButton from "../SToggleButton/SToggleButton.js";


const meta = {
    title       : "Components/Checkbox/SCheckbox",
    component   : SCheckbox,
    tags        : ["autodocs"],
    args        : {
        label       : "Autoriser la connexion à l'espace parent", defaultState : "off", size : "default",name:"connect",
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
        defaultState : "indeterminate",
    }
}
export const CheckboxDisabled : Story = {
    args : {
        defaultState : "on", disabled : true,
    }
}

export const CheckboxAction : Story = {
    args : {
        defaultState: "off", onChange : (v) => {
            console.log("Changement checkbox ", v);
            action("onChange")(v);
        }
    }
}

export const Controlled : Story = {
    args : {
        state: "on",
    },
    render: (args) => {

        const [state, setState] = useState<T_SCheckboxState>("off");

        const editStatus = (n : number[]) : void => {
            console.log(n);
            if (n.length === 0) setState("off");
            else setState("on");
        }

        return (
            <>
                <SCheckbox {...args} state={state} />
                <SToggleButton onClick={editStatus} toggles={[
                    {
                        texte: "Activer",
                    }
                ]} />
            </>
        )

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
    args : {defaultState :"on"},
    parameters: {controls: {include : ["label","disabled","defaultState"]}},
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => (<div key={s} style={dispCenter}><p>{s}</p></div>))}
            {sizes.map(s => (
                <SCheckbox key={s} {...args} size={s} />
            ))}
        </div>
    )
}