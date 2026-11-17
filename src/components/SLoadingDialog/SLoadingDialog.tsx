import styles from "./SLoadingDialog.module.css";
import SAppIcon, { type T_SAppIconVariant } from "../SAppIcon/SAppIcon.js";
import { useLoadingDialog } from "../../context/SLoadingDialog/SLoadingDialogContext.js";
import SLoadingSpinner from "../SLoadingSpinner/SLoadingSpinner.js";

export interface ISLoadingDialog {
    /** Icône de l'application */
    app?    : T_SAppIconVariant,
}

const SLoadingDialog = ( {
    app="scm-app",
}: ISLoadingDialog ) => {

    const {isOpen,title,description} = useLoadingDialog();

    if (!isOpen) return null;

    return (
        <div className={styles.parent}>
            <div role="dialog" className={styles.loading}>
                <SAppIcon variant={app} size="lg" />
                <h1>{title}</h1>
                <SLoadingSpinner size="lg" />
                {description&&<p>{description}</p>}
            </div>
        </div>
    );

}

export default SLoadingDialog;