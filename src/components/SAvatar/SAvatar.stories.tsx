import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import SAvatar, { type T_SAvatarSize } from "./SAvatar.js";


const meta = {
    title       : "Components/SAvatar",
    component   : SAvatar,
    tags        : ["autodocs"],
    args        : {
        size : "default", texte: "JC"
    },
    parameters : {
        docs : {
            description : {
                component : "Généralement associé à un compte utilisateur. Uniquement les deux premières lettres " +
                    "s'affichent sur le composant."
            }
        }
    }
} satisfies Meta<typeof SAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Avatar : Story = {}

const sizes = ["xl","lg","default","sm","xs"] as T_SAvatarSize[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    parameters : { controls : { include : ['texte']}},
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {sizes.map(s => (
                <div style={dispCenter}>
                    <SAvatar {...args} size={s} key={s} />
                </div>
            ))}
        </div>
    )
}