import styles from "./SAppIcon.module.css";
import scmApp from "../../assets/scm-app.svg";
import scmServ from "../../assets/scm-serv.svg";
import scmUi from "../../assets/scm-ui.svg";
import scmDev from "../../assets/scm-dev.svg";

/** Liste des icônes d'application disponibles */
export type T_SAppIconVariant = "scm-app" | "scm-serv" | "scm-ui" | "scm-dev";
/** Liste des tailles disponibles pour les icônes */
export type T_SAppIconSize = "xxl" | "xl" |"lg" | "default" | "sm" | "xs" | "xxs";

export interface ISAppIcon {
    /** Taille d'affichage de l'icône */
    size?   : T_SAppIconSize,
    /** Application affichée sur l'icône */
    variant : T_SAppIconVariant,
}

const SAppIcon = ( {
    size="default",variant
}: ISAppIcon ) => {

    const path = {
        "scm-app"   : {image:scmApp, name: "Logo de l'application de gestion (scm-app)"},
        "scm-serv"  : {image:scmServ, name: "Logo de l'application serveur (scm-serv)"},
        "scm-ui"    : {image:scmUi, name: "Logo de la bibliothèque de composants d'interface (scm-ui)"},
        "scm-dev"   : {image:scmDev, name: "Logo des applications en développement (scm-dev)"}
    }[variant];

    return (
        <img draggable="false" src={path.image} className={`${styles[size]}`} alt={path.name}/>
    );

}

export default SAppIcon;