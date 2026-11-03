import type { Meta, StoryObj } from "@storybook/react-vite";
import SDropDown from "./SDropDown.js";
import SDropDownTrigger from "./SDropDownTrigger/SDropDownTrigger.js";
import SField from "../SField/SField.js";
import SInput from "../SInput/SInput.js";
import SDropDownContent from "./SDropDownContent/SDropDownContent.js";
import SDropDownItem from "./SDropDownItem/SDropDownItem.js";
import SPastille from "../SPastille/SPastille.js";
import { action } from "storybook/actions";


const meta = {
    title       : "Components/SDropDown",
    component   : SDropDown,
    tags        : ["autodocs"],
    args        : {
        disabled    : false,children: <></>,
    },
    argTypes : {
        children : {control : false},
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher une liste permettant de sélectionner un élément pré-rempli"
            }
        }
    }
} satisfies Meta<typeof SDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const elv : Record<string, string> = {
    "elv-001" : "Élève 01",
    "elv-002" : "Élève 02",
    "elv-003" : "Élève 03",
    "elv-004" : "Élève 04",
    "elv-005" : "Élève 05",
    "elv-006" : "Élève 06",
}

export const DropDown : Story = {
    args : {
        children : <>
            <SDropDownTrigger>
                <SField label="Élève">
                    <SInput placeholder={"Sélectionnez l'élève dans la liste"} name={"eleve"} icon={"person"} />
                </SField>
            </SDropDownTrigger>
            <SDropDownContent>
                {Object.entries(elv).map(([ind, val], i) => (
                    <SDropDownItem text={val} key={i} value={ind}>
                        <p>{val}</p>
                    </SDropDownItem>
                ))}
            </SDropDownContent>
        </>
    }
}

const randomColor = () : string => {
    const chars : string = "0123456789ABCDEF";
    let clr : string = "";
    for (let i = 0; i < 6; i++)
        clr += chars[Math.floor(Math.random() * chars.length)];
    return "#"+clr;
}

export const Pastille : Story = {
    args : {
        children : <>
            <SDropDownTrigger>
                <SField label="Élève">
                    <SInput placeholder={"Sélectionnez l'élève dans la liste"} name={"eleve"} icon={"person"} />
                </SField>
            </SDropDownTrigger>
            <SDropDownContent>
                {Object.entries(elv).map(([ind, val], i) => (
                    <SDropDownItem text={val} key={i} value={ind}>
                        <SPastille color={randomColor()} />
                        <p>{val}</p>
                    </SDropDownItem>
                ))}
            </SDropDownContent>
        </>
    }
}

export const Action : Story = {
    args : {
        children : <>
            <SDropDownTrigger>
                <SField label="Élève">
                    <SInput placeholder={"Sélectionnez l'élève dans la liste"} name={"eleve"} icon={"person"} />
                </SField>
            </SDropDownTrigger>
            <SDropDownContent>
                {Object.entries(elv).map(([ind, val], i) => (
                    <SDropDownItem text={val} key={i} value={ind}>
                        <p>{val}</p>
                    </SDropDownItem>
                ))}
            </SDropDownContent>
        </>,
        onValueChange : (v? : string) : void => {
            console.log("onValueChange ", v);
            action("onValueChange")(v);
        }
    }
}

export const NoSearch : Story = {
    args : {
        children : <>
            <SDropDownTrigger>
                <SField label="Élève">
                    <SInput placeholder={"Sélectionnez l'élève dans la liste"} name={"eleve"} icon={"person"} />
                </SField>
            </SDropDownTrigger>
            <SDropDownContent hasSearch={false}>
                {Object.entries(elv).map(([ind, val], i) => (
                    <SDropDownItem text={val} key={i} value={ind}>
                        <p>{val}</p>
                    </SDropDownItem>
                ))}
            </SDropDownContent>
        </>,
    }
}