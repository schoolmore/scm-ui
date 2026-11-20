import styles from "./SSelectionInput.module.css";
import SSelectionCard from "../SSelectionCard.js";
import { SSelectionInputContext } from "../../../context/SSelectionInput/SSelectionInputContext.js";
import { useEffect, useRef, useState } from "react";

export interface ISSelectionInputValue {
    /** Couleur de la ressource */
    color?      : string,
    /** Valeur affichée */
    label       : string,
    /** Valeur cachée et retournée */
    id          : string,
    /** Indique si le choix est désactivé */
    disabled?   : boolean,
}

export interface ISSelectionInput {
    /** Nom du champ pour récupérer les valeurs */
    name                : string,
    /** Valeurs des champs */
    values              : ISSelectionInputValue[],
    /** Liste des identifiants déjà sélectionnée par défaut */
    defaultSelected?    : string[],
    /** Indique si le champ doit retourner plusieurs valeurs */
    multiple            : boolean,
    /** Lorsqu'une valeur est modifiée */
    onChange?           : (v : ISSelectionInputValue[]) => void,
}

const SSelectionInput = ( {
    name,values,multiple,onChange,defaultSelected,
}: ISSelectionInput ) => {

    if (defaultSelected === undefined) return;
    let lstSelected : ISSelectionInputValue[] = [];
    for (const id of defaultSelected) {
        const found = values.find(vl => vl.id === id);
        if (found)
            if (multiple) lstSelected.push(found); else lstSelected = [found];
    }

    const [selected,setSelected] = useState<ISSelectionInputValue[]>(lstSelected);


    const onValueChange = (v : ISSelectionInputValue) : void => {
        let nextValue : ISSelectionInputValue[] = [];
        if (multiple) {
            const exist : boolean = selected.includes(v);
            if (exist)
                nextValue = selected.filter(vle => vle !== v);
            else
                nextValue = [...selected, v];
        } else {
            nextValue = [v];
        }
        setSelected(nextValue)
        onChange?.(nextValue);
    }

    // TODO : Naviguer avec les flèches

    /*const itemsRef = useRef<(HTMLDivElement|null)[]>([]);
    const firstEnabled : number = values.findIndex(v => !v.disabled);

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        let dir : number = 0;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") dir = 1;
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") dir = -1;
        else return;
        e.preventDefault();

        const start : number = value >= 0 ? value : (dir === 1 ? -1 : 0);
        for (let k = 1; k <= values.length; k++) {
            const i : number = (start + dir * k + values.length) % values.length;
            if (!values[i].disabled) {
                triggeredClick(i);
                itemsRef.current[i]?.focus();
                return;
            }
        }
    }*/

    return (
        <SSelectionInputContext.Provider value={{onValueChange,values:selected}}>
            <section className={styles.section}>
                {values.map(v => (
                    <SSelectionCard key={v.id} value={v} type={multiple?"checkbox":"radio"} />
                ))}
                <input type="hidden" name={name} value={selected.map(v =>  v.id).join(", ")} />
            </section>
        </SSelectionInputContext.Provider>
    );

}

export default SSelectionInput;