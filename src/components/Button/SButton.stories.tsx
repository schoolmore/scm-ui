import type { Meta, StoryObj } from "@storybook/react-vite";
import SButton from "./SButton";

const meta = {
    title     : "Components/SButton",
    component : SButton,
    tags      : ["autodocs"],
    args      : { text : "Bouton" },
} satisfies Meta<typeof SButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary   : Story = { args : { variant : "primary" } };
export const Secondary : Story = { args : { variant : "secondary" } };
export const Outline   : Story = { args : { variant : "outline" } };
export const Ghost     : Story = { args : { variant : "ghost" } };
