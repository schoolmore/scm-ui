import type { Meta, StoryObj } from "@storybook/react-vite";
import SToast from "./SToast.js";
import SButton from "../SButton/SButton.js";
import SToastClose from "./SToastClose/SToastClose.js";


const meta = {
    title       : "Components/SToast",
    component   : SToast,
    tags        : ["autodocs"],
    args        : {
        title: "Titre de l'action", details: "Détails sur l'action effectuée par l'utilisateur",
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher un toast permettant d'afficher un retour sur l'action effectuée par l'utilisateur"
            }
        }
    }
} satisfies Meta<typeof SToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info : Story = {
    args: {
        variant: "info"
    },
    argTypes: {
        variant: {control: false}
    }
}
export const Success : Story = {
    args: {
        variant: "success"
    },
    argTypes: {
        variant: {control: false}
    }
}
export const Warning : Story = {
    args: {
        variant: "warning"
    },
    argTypes: {
        variant: {control: false}
    }
}
export const Delete : Story = {
    args: {
        variant: "delete"
    },
    argTypes: {
        variant: {control: false}
    }
}
export const Error : Story = {
    args: {
        variant: "error"
    },
    argTypes: {
        variant: {control: false}
    }
}
export const NoDelay : Story = {
    args: {
        delay: -1, variant: "info",
    }
}
export const Action : Story = {
    args: {
        variant: "warning", children: <SToastClose>
            <SButton variant={"secondary"} text={"Annuler"} size="xs" />
        </SToastClose>,delay: -1
    }
}