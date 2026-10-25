import type { Meta, StoryObj } from "@storybook/react-vite";
import SDialogBody from "./SDialogBody.js";


const meta = {
    title       : "Components/Dialog/SDialogBody",
    component   : SDialogBody,
    tags        : ["autodocs"],
    args        : {
        children  : <h1>CONTENU</h1>
    },
    argTypes : {
        children : { control : false}
    },
    parameters : {
        docs : {
            description : {
                component : "Corps principal du dialogue."
            }
        }
    }
} satisfies Meta<typeof SDialogBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body : Story = {}