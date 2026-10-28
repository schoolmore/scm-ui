import SInput, { type T_SInputSize } from "./SInput";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { type CSSProperties } from "react";


const meta = {
    title       : "Components/Input/SInput",
    component   : SInput,
    tags        : ["autodocs"],
    args        : {
        size    : "default", icon : "title",
        placeholder : "Tapez le nom de la matière",
        label : "Nom de la matière",
    },
    parameters : {
        docs : {
            description : {
                component : "Champ de saisie simple pour un utilisateur. Permets également de gérer les méthodes des " +
                    "différentes actions"
            }
        }
    }
} satisfies Meta<typeof SInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input : Story = {
    args : {size: "default"}
}

export const InputDisabled : Story = {
    args : {disabled:true}
}

const testValidateEmail = (v? : string) : string | undefined => {
    if (v === undefined) return;
    const regEmail : RegExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (regEmail.test(v)) return;
    return "Veuillez indiquer une adresse e-mail valide";
}

export const InputAction : Story = {
    args : {
        label   : "Adresse e-mail",
        icon    : "alternate_email",
        placeholder : "Tapez une adresse e-mail valide",
        validate : testValidateEmail,
        onEnter  : (v? : string) : void => {
            console.log("Enter ", v);
            action("onEnter")(v);
        },
        onBlur  : (v? : string) : void => {
            console.log("Blur ", v);
            action("onBlur")(v);
        },
        onFocus : (v? : string) : void => {
            console.log("Focus ", v);
            action("onFocus")(v);
        },
        onChange : (v? : string) : void => {
            console.log("Change ", v);
            action("onChange")(v);
        }
    }
}

const sizes = ["lg","default","sm"] as T_SInputSize[];
const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };


export const InputSize : Story = {
    parameters : {
        controls : {
            include : ["icon","placeholder","label","value","icon","disabled"]
        }
    },
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {sizes.map(s => (
                <div>
                    <SInput {...args} size={s} />
                </div>
            ))}
        </div>
    )
}