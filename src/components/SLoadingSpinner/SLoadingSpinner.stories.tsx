import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import SLoadingSpinner, { type T_SLoadingSpinnerSize } from "./SLoadingSpinner.js";
import SGrid from "../../layout/SGrid/SGrid.js";


const meta = {
    title       : "Components/SLoadingSpinner",
    component   : SLoadingSpinner,
    tags        : ["autodocs"],
    args        : {
        size: "default",variant: "primary"
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher un élément permettant d'indiquer à l'utilisateur qu'un chargement est en cours " +
                    "sur un élément de l'interface. Ne bloque pas l'utilisateur, sinon utiliser `SLoadingDialog` pour " +
                    "afficher en page entière"
            }
        }
    }
} satisfies Meta<typeof SLoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner : Story = {}

const sizes = ["xxl","xl","lg","default","sm","xs","xxs"] as T_SLoadingSpinnerSize[];
const dispCenter : CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

export const Sizes : Story = {
    args : {
        variant : "primary"
    },
    parameters : {
        controls : { include : ["variant"]}
    },
    render: (args) => (
        <SGrid columns={sizes.length}>
            {sizes.map(s => <div key={s} style={dispCenter}><p>{s}</p></div>)}
            {sizes.map(s => <div style={dispCenter}><SLoadingSpinner {...args} size={s} /></div>)}
        </SGrid>
    )
}