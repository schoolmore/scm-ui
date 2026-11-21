import type { Meta, StoryObj } from "@storybook/react-vite";
import SConfirmDialog from "./SConfirmDialog.js";
import SButton from "../SButton/SButton.js";
import { toast } from "../../context/SToast/toastStore.js";
import { action } from "storybook/actions";
import SScmApp from "../SScmApp/SScmApp.js";
import { confirmation } from "../../context/SConfirmDialog/confirmStore.js";


const meta = {
    title       : "Components/SConfirmDialog",
    component   : SConfirmDialog,
    tags        : ["autodocs"],
    args        : {
        title: "Supprimer 7 élèves ?", description: "Les 7 élèves seront définitivement supprimés de l'application.\n" +
            "Voulez-vous continuer ?", children : <SButton variant={"primary"} text={"Supprimer la sélection"} frontIcon="delete" />
    },
    argTypes : {
        children: { control : false }, onConfirm : { control : false}, onCancel : { control : false}
    },
    parameters : {
        docs : {
            description : {
                component : "Ouvrir un dialogue de confirmation à l'utilisateur avec un choix positif et un négatif."
            }
        }
    }
} satisfies Meta<typeof SConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmation : Story = {
    args : {
        buttons: ["Annuler","Supprimer"],
    },
}
export const Action : Story = {
    args : {
        onConfirm : () => {
            toast.delete({title: "7 élèves supprimés", details: "Les 7 élèves sélectionnés ont bien été supprimés"});
            action("onConfirm")("")
        },
        onCancel: () => {
            toast.warning({title: "Aucune suppression"})
            action("onCancel")("")
        },
    },
    render: (args) => (
        <SScmApp>
            <div>
                <SConfirmDialog {...args} />
            </div>
        </SScmApp>
    )
}

const ButtonConfirmation = () => {

    const handleClick = async () : Promise<void> => {
        const confirmed = await confirmation({
            title: "Supprimer 7 élèves ?", buttons: ["Annuler","Supprimer"],
            description: "Les 7 élèves seront définitivement supprimés de l'application.\nVoulez-vous continuer ?",
        });
        if (confirmed) toast.delete({title: "7 élèves supprimés"});
        else toast.warning({title: "Aucune suppression"});
    }

    return <SButton variant={"primary"} text={"Supprimer la sélection"} frontIcon="delete" onClick={handleClick} />;
}

export const Script : Story = {
    parameters : {
        docs : {
            description : {
                story : "Appel depuis un script avec `await confirmation({...})`, qui renvoie `true` si l'utilisateur confirme. Nécessite `SScmApp` (ou un `<SConfirmer />` monté)."
            }
        }
    },
    render: () => (
        <SScmApp>
            <div>
                <ButtonConfirmation />
            </div>
        </SScmApp>
    )
}
