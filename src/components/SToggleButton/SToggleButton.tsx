import styles from "./SToggleButton.module.css";
import 'material-symbols';
import SButton from "../SButton/SButton";
import { useState } from "react";

/** Liste des tailles disponibles pour les boutons */
export type T_SToggleButtonSize = "lg" | "default" | "sm" | "xs";

export interface ISToggleButtonItem {
    /** Texte affiché sur le bouton */
    texte       : string,
    /** Indique si l'option est désactivé ou non */
    disabled?   : boolean,
    /** Indique si le choix est sélectionné ou non */
    selected?   : boolean,
    /** Si ce bouton est coché, tous les autres choix se décocheront,
     * De plus, il n'est pas possible de désélectionner cet élément
     */
    all?        : boolean,
}

export interface ISToggleButton {
    /** Liste des options disponibles */
    toggles     : ISToggleButtonItem[],
    /** Méthode exécutée au clic sur un bouton */
    onClick?    : (n : number[], i : number) => void,
    /** Indique les boutons déjà sélectionnés */
    selected?   : number[],
    /** Taille d'affichage des boutons */
    size?       : T_SToggleButtonSize,
}

const SToggleButton = ( {
    toggles,onClick,selected,size="default",
}: ISToggleButton ) => {

    const selectedItems : number[] = toggles.map((t,i) => {
        if (t.selected) return i;
        return -1;
    })

    const [numSelected, setNumSelected] = useState<number[]>(selected??selectedItems??[]);

    const triggerClick = (i : number) : void => {
        let copy : number[] = [...numSelected];
        if(copy.includes(i) && copy.length > 1) copy = copy.filter(n => n !== i);
        else if (!copy.includes(i)) copy.push(i);

        const allElement : ISToggleButtonItem | undefined = toggles.find(t => t.all);
        const indexAllElement : number = toggles.findIndex(t => t.all);
        if (allElement) {
            if (toggles[i] === allElement) copy = [i];
            else copy = copy.filter(n => n !== indexAllElement);
        }
        copy = copy.filter(n => n!==-1);
        setNumSelected(copy);
        onClick?.(copy, i)
    }

    return (
        <div className={styles.tglParent}>
            {toggles.map((t : ISToggleButtonItem,i : number) => (
                <SButton variant={numSelected.includes(i)?"primary":"outline"}
                        text={t.texte} frontIcon={numSelected.includes(i)?'check':undefined}
                        onClick={() => triggerClick(i)} size={size}
                />
            ))}
        </div>
    );

}

export default SToggleButton;