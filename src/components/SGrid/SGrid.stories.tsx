import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import SGrid from "./SGrid.js";


const styleRect : React.CSSProperties = {
    background: "var(--scm-ui-bg-muted)",
    height: "20dvh",
    width: "100%"
}


const meta = {
    title       : "Components/SGrid",
    component   : SGrid,
    tags        : ["autodocs"],
    args        : {
        children    : <>
            <div style={styleRect}></div>
            <div style={styleRect}></div>
            <div style={styleRect}></div>
        </>, columns: 3
    },
    argTypes : {
        children : { control : false}
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher des éléments sous forme de grille"
            }
        }
    }
} satisfies Meta<typeof SGrid>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Grid : Story = {}
export const CustomCSS : Story = {
    args : {
        custom : {
            gap : "var(--scm-ui-spacing-11)"
        }
    }
}