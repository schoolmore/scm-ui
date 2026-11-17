import type { Meta, StoryObj } from "@storybook/react-vite";
import SCenter from "./SCenter.js";
import SPastille from "../../components/SPastille/SPastille.js";


const meta = {
    title       : "Layout/SCenter",
    component   : SCenter,
    tags        : ["autodocs"],
    args        : {
        children : <><SPastille color="#45fc1a" /><p>Élément à centrer</p></>, gap : "default",
    },
    argTypes : {
        children : {
            control : false
        }
    },
    parameters : {
        docs : {
            description : {
                component : "Composant permettant de centrer un élément en `x` et `y`"
            }
        }
    }
} satisfies Meta<typeof SCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Center : Story = {}

export const Custom : Story = {
    args: {
        custom : {
            background: "#4704ff",
            gap: "50px",
            justifyContent: "start"
        }
    }
}