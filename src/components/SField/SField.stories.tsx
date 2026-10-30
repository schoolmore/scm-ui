import type { Meta, StoryObj } from "@storybook/react-vite";
import { SField } from "../../index.js";
import SInput from "../SInput/SInput.js";
import SRadioButton from "../SRadioButton/SRadioButton.js";
import SCheckbox from "../SCheckbox/SCheckbox.js";


const meta = {
    title       : "Components/SField",
    component   : SField,
    tags        : ["autodocs"],
    args        : {
        children: <></>
    },
    argTypes : {
        children : {control : false},
    },
    parameters : {
        docs : {
            description : {
                component : "Champ complet dans un formulaire. Interagit avec ses enfants pour l'accessibilité"
            }
        }
    }
} satisfies Meta<typeof SField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input : Story = {
    args : {
        label : "Nom de famille",
        children : <>
            <SInput placeholder={"Indiquez le nom de famille du professeur"} name={"name"} icon={"title"} />
        </>
    }
}
export const RadioButton : Story = {
    args : {
        label : "Responsabilité du responsable",
        children : <>
            <SRadioButton values={[{value: "Légal"},{value:"En charge"},{value:"Contact"}]} name={"responsibility"} />
        </>
    }
}

export const Checkbox : Story = {
    args : {
        label : "Comptabiliser dans la moyenne",
        children : <>
            <SCheckbox name={"note"} label={"Compter le devoir dans la moyenne de l'élève"} state={"on"} />
        </>
    }
}