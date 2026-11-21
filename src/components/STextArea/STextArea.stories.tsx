import type { Meta, StoryObj } from "@storybook/react-vite";
import STextArea, { type T_STextAreaSize } from "./STextArea.js";
import { action } from "storybook/actions";
import SGrid from "../../layout/SGrid/SGrid.js";
import type { CSSProperties } from "react";


const meta = {
    title       : "Components/STextArea",
    component   : STextArea,
    tags        : ["autodocs"],
    args        : {
        name: "textarea", placeholder: "Tapez la raison de la création du dossier", background: "muted",
    },
    argTypes: {
        onChange : {control: false}, validate : { control : false}, onBlur : {control: false},
        onFocus : {control : false}, onEnter : {control : false},
    },
    parameters : {
        docs : {
            description : {
                component : "Boîte permettant à un utilisateur de taper plusieurs caractères sur plusieurs lignes"
            }
        }
    }
} satisfies Meta<typeof STextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextArea : Story = {
}
export const Disabled : Story = {
    args: {
        disabled: true,
    }
}
export const Action : Story = {
    args: {
        onEnter : (v? : string) : void => {
            console.log("onEnter ", v);
            action("onEnter")(v);
        },
        onFocus: (v? : string) : void => {
            console.log("onFocus ", v);
            action("onFocus")(v);
        },
        onBlur: (v? : string) : void => {
            console.log("onBlur ", v);
            action("onBlur")(v);
        },
        onChange: (v? : string) : void => {
            console.log("onChange ", v);
            action("onChange")(v);
        },
        validate: (v? : string) : string | undefined => {
            if (!v || v.length < 5) return "La raison doit contenir au moins 5 caractères";
        }
    }
}

const sizes = ["lg","default","sm"] as T_STextAreaSize[];

const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    render: (args) => (
        <SGrid columns={sizes.length}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {sizes.map(s => (
                <STextArea {...args} size={s} key={s} />
            ))}
        </SGrid>
    )
}