import type { Meta, StoryObj } from "@storybook/react-vite";
import SButton from "./SButton";

const meta = {
    title     : "Components/SButton",
    component : SButton,
    tags      : ["autodocs"],
    args      : { text : "Bouton", size: "md" },
} satisfies Meta<typeof SButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary   : Story = { args : { variant : "primary", text: "Bouton primaire" } };
export const Secondary : Story = { args : { variant : "secondary", text: "Bouton secondaire" } };
export const Outline   : Story = { args : { variant : "outline", text: "Bouton outline" } };
export const Ghost     : Story = { args : { variant : "ghost", text : "Bouton ghost" } };
