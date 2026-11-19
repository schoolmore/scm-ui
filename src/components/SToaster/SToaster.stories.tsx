import type { Meta, StoryObj } from "@storybook/react-vite";
import SToaster from "./SToaster.js";
import SScmApp from "../SScmApp/SScmApp.js";
import SButton from "../SButton/SButton.js";
import { toast } from "../../context/SToast/toastStore.js";
import SButtonGroup from "../SButtonGroup/SButtonGroup.js";


const meta = {
    title       : "Components/SToaster",
    component   : SToaster,
    tags        : ["autodocs"],
    args        : {

    },
    parameters : {
        docs : {
            description : {
                component : "Toaster permettant d'afficher les Toast à l'écran. Inclus de base dans `SScmApp`"
            }
        }
    }
} satisfies Meta<typeof SToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const ButtonToast = () => {

    const handleClickSuccess = () :void => {
        toast.success({title: "Succès de l'exécution"});
    }

    const handleClickError = () : void => {
        toast.error({title: "Erreur de l'exécution", details: "Veuillez essayer à nouveau !"})
    }

    return (
        <SButtonGroup>
            <SButton variant={"primary"} text={"Déclencher le succès"} onClick={handleClickSuccess} />
            <SButton variant="secondary" text={"Déclencher l'erreur"} onClick={handleClickError} />
        </SButtonGroup>
    )
}

export const Toaster : Story = {
    render: () => (
        <SScmApp>
            <div>
                <ButtonToast />
            </div>
        </SScmApp>
    )
}

export const Mobile : Story = {
    globals: {
        viewport: { value: 'mobile2', isRotated: false },
    },
    render: () => (
        <SScmApp>
            <div>
                <ButtonToast />
            </div>
        </SScmApp>
    ),
}