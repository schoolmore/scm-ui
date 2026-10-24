import type { Meta, StoryObj } from "@storybook/react-vite";
import SInfoCard from "./SInfoCard.js";


const meta = {
    title       : "Components/SInfoCard",
    component   : SInfoCard,
    tags        : ["autodocs"],
    args        : {
        texte : "Aucun responsable n'a été trouvé pour l'élève. Certaines actions pourraient être désactivées"
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher sous forme d'une carte un message important à l'utilisateur. Plusieurs " +
                    "variantes sont disponibles en fonction du type de message."
            }
        }
    }
} satisfies Meta<typeof SInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoMessage : Story = {
    args : {
        variant : "infos"
    },
    argTypes : {
        variant : {control:false}
    }
}
export const WarningMessage : Story = {
    args : {
        variant : "warning"
    },
    argTypes : {
        variant : {control:false}
    }
}
export const DangerMessage : Story = {
    args : {
        variant : "danger"
    },
    argTypes : {
        variant : {control:false}
    }
}
export const SuccessMessage : Story = {
    args : {
        variant : "success"
    },
    argTypes : {
        variant : {control:false}
    }
}