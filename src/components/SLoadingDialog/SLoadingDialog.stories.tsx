import type { Meta, StoryObj } from "@storybook/react-vite";
import SLoadingDialog from "./SLoadingDialog.js";
import SButton from "../SButton/SButton.js";
import SScmApp from "../SScmApp/SScmApp.js";
import { useLoadingDialog } from "../../context/SLoadingDialog/SLoadingDialogContext.js";


const meta = {
    title       : "Components/SLoadingDialog",
    component   : SLoadingDialog,
    tags        : ["autodocs"],
    args        : {
        app: "scm-app",
    },
    parameters : {
        docs : {
            description : {
                component : "Afficher un dialogue de chargement bloquant l'utilisateur. Utile pour des chargements " +
                    "importants dans l'application. Pour des éléments d'interface utilisez `SLoadingSpinner`"
            }
        }
    }
} satisfies Meta<typeof SLoadingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const OpenButton = () => {
    const { toggle } = useLoadingDialog();
    return (
        <div>
            <SButton
                variant="primary"
                text="Ouvrir le chargement"
                onClick={() => {
                    toggle(true);
                    //setTimeout(() => toggle(false), 3000);
                }}
            />
        </div>
    );
};

const OpenButtonDescription = () => {
    const { toggle, setDescription, setTitle } = useLoadingDialog();

    const handleOpen = () : void => {
        toggle(true);
        setTitle("Suppression de l'élève");
        setDescription("Récupération des informations");
        setTimeout(() => {
            setDescription("Suppression du profil de connexion")
        }, 1200);
        setTimeout(() => {
            setDescription("Suppression du dossier de vie scolaire")
        }, 1800);
        setTimeout(() => {
            setDescription("Finalisation de la suppression")
        }, 2400);
        setTimeout(() => {
            toggle(false);
        }, 2600);
    }

    return (
        <div>
            <SButton
                variant="primary"
                text="Ouvrir le chargement"
                onClick={handleOpen}
            />
        </div>
    );
};

export const Loading : Story = {
    render: (args) => {

        return (
            <SScmApp>
                <OpenButton />
                <SLoadingDialog {...args} />
            </SScmApp>
        )
    }
}

export const Action : Story = {
    render: (args) => {

        return (
            <SScmApp>
                <OpenButtonDescription />
                <SLoadingDialog {...args} />
            </SScmApp>
        )
    }
}
