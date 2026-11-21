import type { Meta, StoryObj } from "@storybook/react-vite";
import SSelectionInput, { type ISSelectionInputValue } from "./SSelectionInput.js";
import { action } from "storybook/actions";
import SDialog from "../../SDialog/SDialog.js";
import SDialogTrigger from "../../SDialog/SDialogTrigger/SDialogTrigger.js";
import SButton from "../../SButton/SButton.js";
import SDialogContent from "../../SDialog/SDialogContent/SDialogContent.js";
import SDialogBody from "../../SDialog/SDialogBody/SDialogBody.js";
import SForm from "../../SForm/SForm.js";
import { useState } from "react";
import SPastille from "../../SPastille/SPastille.js";
import SGrid from "../../../layout/SGrid/SGrid.js";
import SDialogFooter from "../../SDialog/SDialogFooter/SDialogFooter.js";
import SDialogClose from "../../SDialog/SDialogClose/SDialogClose.js";
import SScmApp from "../../SScmApp/SScmApp.js";
import { toast } from "../../../context/SToast/toastStore.js";

const classes : ISSelectionInputValue[] = [
    {id: "6eA", label: "6eme A", color: "#3b53ff"},
    {id: "6eB", label: "6eme B", color: "#3044d6"},
    {id: "6eC", label: "6eme C", color: "#4c58aa"},
    {id: "5eA", label: "5eme A", color: "#e1005b"},
    {id: "5eB", label: "5eme B", color: "#d25789"},
    {id: "5eC", label: "5eme C", color: "#9a2655"},
]

const meta = {
    title       : "Components/SSelectionInput",
    component   : SSelectionInput,
    tags        : ["autodocs"],
    args        : {
        name: "selection", multiple: true, values: classes,
    },
    parameters : {
        docs : {
            description : {
                component : "Composant permettant de proposer une sélection parmi plusieurs choix à l'utilisateur. Ce " +
                    "choix peut être unique ou multiple. La valeur est récupérable dans un `<SForm>`"
            }
        }
    }
} satisfies Meta<typeof SSelectionInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiple : Story = {
}
export const Single : Story = {
    args : {
        multiple: false,
    }
}
export const Action : Story = {
    args: {
        multiple: false,onChange: (v : ISSelectionInputValue[]) : void => {
            console.log("onChange ", v);
            action("onChange")(v);
        }
    }
}
export const Form : Story = {
    render: (args) => {

        const [classe,setClasse] = useState<ISSelectionInputValue[]>([]);
        const [selected, setSelected] = useState<ISSelectionInputValue[]>([]);

        const handleSubmit = (v : Record<string, FormDataEntryValue>) : void => {
            action("onSubmit")(v);
            setClasse(selected);
            setSelected([]);
            const endS : string = selected.length > 1 ? 's' : '';
            toast.success({title: `${selected.length} classe${endS} sélectionnée${endS}`});
        }

        return (
            <>
                <SScmApp>
                    <div>
                        <div>
                            <p>Classes :</p>
                            <SGrid columns={5}>{classe.map(c => (
                            <>
                                <div>
                                    <SPastille color={c.color!} />
                                    <p>{c.label}</p>
                                </div>
                            </>
                            ))}</SGrid>
                        </div>
                        <SDialog>
                            <SDialogTrigger>
                                <SButton variant={"primary"} text={"Sélectionner une classe"} />
                            </SDialogTrigger>
                            <SDialogContent title={"Sélectionner une classe"}>
                                <SDialogBody>
                                    <SForm id="classes" onSubmit={handleSubmit}>
                                        <SSelectionInput {...args} defaultSelected={classe.map(c => c.id)} onChange={setSelected} />
                                    </SForm>
                                </SDialogBody>
                                <SDialogFooter>
                                    <SDialogClose>
                                        <SButton variant="secondary" text="Annuler" />
                                    </SDialogClose>
                                    <SDialogClose>
                                        <SButton variant={"primary"} text="Valider" formId="classes" />
                                    </SDialogClose>
                                </SDialogFooter>
                            </SDialogContent>
                        </SDialog>
                    </div>
                </SScmApp>
            </>
        )

    }
}

export const Disabled : Story = {
    args: {
        values:  [
            {id: "6eA", label: "6eme A", color: "#3b53ff"},
            {id: "6eB", label: "6eme B", color: "#3044d6"},
            {id: "6eC", label: "6eme C", color: "#4c58aa", disabled: true},
            {id: "5eA", label: "5eme A", color: "#e1005b"},
            {id: "5eB", label: "5eme B", color: "#d25789", disabled: true},
            {id: "5eC", label: "5eme C", color: "#9a2655", disabled: true},
        ]
    }
}