import styles from "./SSelectionInput.module.css";
import SSelectionCard from "../SSelectionCard.js";
import { SSelectionInputContext } from "../../../context/SSelectionInput/SSelectionInputContext.js";
import { useRef, useState } from "react";


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
    /** Nom du champ pour récupérer les valeurs, ou "none" pour ne pas la récupérer */
    name                : string | "none",
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
    name,values,multiple,onChange,defaultSelected = [],
}: ISSelectionInput ) => {

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

    const itemsRef = useRef<(HTMLElement|null)[]>([]);
    const firstEnabled : number = values.findIndex(v => !v.disabled);
    const [focusIndex, setFocusIndex] = useState<number>(() => {
        const i = values.findIndex(v => selected.includes(v));
        return i >= 0 ? i : firstEnabled;
    });

    const onKeyDown = (e : React.KeyboardEvent) : void => {
        let dir : number;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") dir = 1;
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") dir = -1;
        else return;
        e.preventDefault();

        // On part de la carte qui a le focus (plus fiable que la sélection en mode multiple)
        const current : number = itemsRef.current.indexOf(document.activeElement as HTMLElement);
        const start : number = current >= 0 ? current : (dir === 1 ? -1 : 0);

        for (let k = 1; k <= values.length; k++) {
            const i : number = (start + dir * k + values.length) % values.length;
            if (!values[i].disabled) {
                if (!multiple) onValueChange(values[i]);
                setFocusIndex(i);
                itemsRef.current[i]?.focus();
                return;
            }
        }
    }

    return (
        <SSelectionInputContext.Provider value={{onValueChange,values:selected}}>
            <section onKeyDown={onKeyDown} role={multiple ? "group" : "radiogroup"} className={styles.section}>
                {values.map((v : ISSelectionInputValue,i : number) => (
                    <SSelectionCard key={v.id} focusable={i===focusIndex} ref={el => {itemsRef.current[i] = el}}
                                    value={v} type={multiple?"checkbox":"radio"} />
                ))}
                {name!=="none"&&(
                    <input type="hidden" name={name} value={selected.map(v =>  v.id).join(", ")} />
                )}
            </section>
        </SSelectionInputContext.Provider>
    );

}

export default SSelectionInput;