import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import SNotificationIndicator, { type T_SNotificationIndicatorSize } from "./SNotificationIndicator.js";


const meta = {
    title       : "Components/SNotificationIndicator",
    component   : SNotificationIndicator,
    tags        : ["autodocs"],
    args        : {
        size: "default", variant: "primary", number : 5
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher un indicateur de notifications dans un composant"
            }
        }
    }
} satisfies Meta<typeof SNotificationIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Notification : Story = {}
export const Number : Story = {
    args : {
        number : 140
    }
}
export const Secondary : Story = {
    args : {
        variant : "secondary"
    }
}

const sizes = ["default", "sm", "xs"] as T_SNotificationIndicatorSize[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {sizes.map(s => (
                <SNotificationIndicator {...args} size={s} />
            ))}
        </div>
    )
}