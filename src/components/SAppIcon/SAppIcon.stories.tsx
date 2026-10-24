import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import SAppIcon, { type T_SAppIconSize, type T_SAppIconVariant } from "./SAppIcon.js";


const meta = {
    title       : "Components/SAppIcon",
    component   : SAppIcon,
    tags        : ["autodocs"],
    args        : {
        size : "default"
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher les icônes des applications SchoolMore."
            }
        }
    }
} satisfies Meta<typeof SAppIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScmApp : Story = {
    args : {
        variant : "scm-app"
    },
    parameters : { controls : { include : ["size"]}}
}
export const ScmServ : Story = {
    args : {
        variant : "scm-serv"
    },
    parameters : { controls : { include : ["size"]}}
}
export const ScmUi : Story = {
    args : {
        variant : "scm-ui"
    },
    parameters : { controls : { include : ["size"]}}
}
export const ScmDev : Story = {
    args : {
        variant : "scm-dev"
    },
    parameters : { controls : { include : ["size"]}}
}

const sizes = ["xxl","xl","lg","default","sm","xs","xxs"] as T_SAppIconSize[];
const variant = ["scm-app","scm-serv","scm-ui",'scm-dev'] as T_SAppIconVariant[];


const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    args : {variant:"scm-app"},
    parameters : { controls : { include : []}},
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {variant.flatMap(v => sizes.map(s => (
                <SAppIcon {...args} size={s} variant={v} />
            )))}
        </div>
    )
}