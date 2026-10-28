import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import SAccordion from "./SAccordion.js";
import SAccordionTitle from "./SAccordionTitle/SAccordionTitle.js";
import SPastille from "../SPastille/SPastille.js";
import { action } from "storybook/actions";
import SAccordionContent from "./SAccordionContent/SAccordionContent.js";
import SEmptyState from "../SEmptyState/SEmptyState.js";
import type { T_SAccordionSize } from "../../context/SAccordion/SAccordionContext.js";


const meta = {
    title       : "Components/SAccordion",
    component   : SAccordion,
    tags        : ["autodocs"],
    args        : {
        size : "default", disabled : false,children : <></>,
    },
    argTypes : {
        children : {control : false},
    },
    parameters : {
        docs : {
            description : {
                component : "Accordéon permettant d'afficher ou cacher des données au clic sur le composant"
            }
        }
    }
} satisfies Meta<typeof SAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accordion : Story = {
    args : {
        children : <>

        </>
    },
    render: (args) => (
        <SAccordion {...args}>
            <SAccordionTitle>
                <SPastille color="#0074B5" />
                <p>Dossier particulier</p>
            </SAccordionTitle>
            <SAccordionContent>
                <h1>Contenu</h1>
            </SAccordionContent>
        </SAccordion>
    )
}
export const Action : Story = {
    args : {
        onExpandChange : (v : boolean) : void => {
            console.log("onExpandChange ", v);
            action("onExpandChange")(v)
        }
    },
    render : (args) => (
        <SAccordion {...args}>
            <SAccordionTitle>
                <SPastille color="#0074B5" />
                <p>Dossier particulier</p>
            </SAccordionTitle>
            <SAccordionContent>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "5em 0"}}>
                    <SEmptyState background={"white"} title={"Aucun contenu"} icon={"title"} />
                </div>
            </SAccordionContent>
        </SAccordion>
    )
}

const sizes = ["default","sm","xs"] as T_SAccordionSize[];

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
                <>
                    <SAccordion {...args} size={s}>
                        <SAccordionTitle>
                            <SPastille color="#0074B5" />
                            <p>Dossier particulier</p>
                        </SAccordionTitle>
                        <SAccordionContent>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "5em 0"}}>
                                <SEmptyState background={"white"} title={"Aucun contenu"} icon={"title"} />
                            </div>
                        </SAccordionContent>
                    </SAccordion>
                </>
            ))}
        </div>
    )
}