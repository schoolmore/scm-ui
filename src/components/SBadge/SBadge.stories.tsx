import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import SBadge, { type ISBadge, type T_SBadgeSize, type T_SBadgeVariant } from "./SBadge.js";


const meta = {
    title       : "Components/SBadge",
    component   : SBadge,
    tags        : ["autodocs"],
    args        : {
        variant  : "infos", texte : "Informations", size : "default",
    },
    argTypes : {
        frontIcon : {type:"string"}, backIcon : {type : "string"}
    },
    parameters : {
        docs : {
            description : {
                component : "Le badge permet d'afficher les détails d'un élément. Il est par exemple utilisé pour " +
                    "différencier les types de matières, afficher les caractéristiques d'une salle ou encore pour " +
                    "ordonner certaines ressources dans l'emploi du temps."
            }
        }
    }
} satisfies Meta<typeof SBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger : Story = {
    args: {variant : "danger"}
}
export const Warning : Story = {
    args:  {variant : "warning"}
}
export const Informations : Story = {}
export const Success : Story = {
    args : {variant : "success"}
}
export const Muted : Story = {
    args : {variant : "muted"}
}


const sizes = ["lg","default","sm","xs"] as T_SBadgeSize[];

const gridStyle = (columns: number): CSSProperties => ({
    display             : "grid",
    gridTemplateColumns : `repeat(${columns}, max-content)`,
    gap                 : "1em",
    alignItems          : "center",
});
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    args : { texte : "Taille" },
    parameters : {
        controls : { include : ["variant","texte","frontIcon","backIcon","custom"]}
    },
    render : (args) => (
        <div style={gridStyle(sizes.length)}>
            {sizes.map(s => <div style={dispCenter} key={s}><p>{s}</p></div>)}
            {sizes.map(s => (
                <div style={dispCenter}>
                    <SBadge {...args} size={s} />
                </div>
            ))}
        </div>
    )
}

const variants = ["danger","warning","infos","success","muted"] as T_SBadgeVariant[];

const iconPlacements = [
    {frontIcon : "home"}, {backIcon : "home"},
    {frontIcon : "home", backIcon : "home"}
] as const satisfies readonly Pick<ISBadge, "frontIcon" | "backIcon">[];

export const Icons : Story = {
    args : { texte : "Taille" },
    parameters : {
        controls : { include : ["texte","size","custom"]}
    },
    render : (args) => (
        <div style={gridStyle(sizes.length*iconPlacements.length)}>
            {sizes.flatMap(s => iconPlacements.map((_,i) => (
                <div style={dispCenter} key={`${s}-${i}`}><p>{s}</p></div>
            )))}
            {variants.flatMap(v => sizes.flatMap(s => iconPlacements.map((ic, i) => (
                <SBadge {...args} size={s} variant={v} key={`${v}-${s}-${i}`} {...ic} />
            ))))}
        </div>
    )
}

export const CustomCss : Story = {
    args : {custom : {background: "purple"}},
    argTypes : {
        variant : {control : false}
    }
}