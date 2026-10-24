import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import SButton, { type ISButton } from "./SButton";
import { action } from "storybook/actions";


const meta = {
    title     : "Components/SButton",
    component : SButton,
    tags      : ["autodocs"],
    args      : { text : "Bouton", size: "md", disabled : false, onClick : e => action("onClick")(e) },
    argTypes  : {
        frontIcon   : {type: "string"},
        backIcon    : {type: "string"},
    }
} satisfies Meta<typeof SButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary   : Story = {
    args : { variant : "primary", text: "Bouton primaire" },
    argTypes : {variant: {control:false}}
};
export const Secondary : Story = {
    args : { variant : "secondary", text: "Bouton secondaire" } ,
    argTypes : {variant: {control:false}}
};
export const Outline   : Story = {
    args : { variant : "outline", text: "Bouton outline" },
    argTypes : {variant: {control:false}}
};
export const Ghost     : Story = {
    args : { variant : "ghost", text : "Bouton ghost" },
    argTypes : {variant: {control:false}}
};

export const Action : Story = {
    args : {
        variant : "primary", text : "Cliquez",onClick : (e) => {
            console.log("onClick");
            action("onClick")(e);
        }
    }
}

const variants  = ["primary", "secondary", "outline", "ghost"] as const;
const sizes     = ["lg", "md", "sm", "xs"] as const;
/** Combinaisons d'icônes affichées pour chaque taille dans la story Icons */
const iconPlacements = [
    { frontIcon : "home" },
    { backIcon  : "home" },
    { frontIcon : "home", backIcon : "home" },
] as const satisfies readonly Pick<ISButton, "frontIcon" | "backIcon">[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const headerStyle : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    args       : { variant : "primary" },
    parameters : { controls : { include : ["text", "disabled"] } },
    render     : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(size => <div key={size} style={headerStyle}><p>{size}</p></div>)}
            {variants.map((variant) =>
                sizes.map((size) => (
                    <SButton key={`${variant}-${size}`} {...args} variant={variant} size={size} />
                ))
            )}
        </div>
    ),
};

export const Icons : Story = {
    args        : { variant : "primary" },
    parameters  : { controls : { include : ["text", "disabled","frontIcon","backIcon"] } },
    render      : (args) => (
        <div style={gridStyle(sizes.length * iconPlacements.length)}>
            {sizes.flatMap(size => iconPlacements.map((_, i) => (
                <div key={`${size}-${i}`} style={headerStyle}><p>{size}</p></div>
            )))}
            {variants.flatMap(variant => sizes.flatMap(size => iconPlacements.map((icons, i) => (
                <SButton key={`${variant}-${size}-${i}`} {...args} {...icons} variant={variant} size={size} />
            ))))}
        </div>
    ),
};
