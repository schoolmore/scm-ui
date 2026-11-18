import type { T_SToastVariant } from "../../components/SToast/SToast.js";


type Listener = () => void;

export interface IToast {
    /** Titre du toast */
    title       : string,
    /** Description éventuelle */
    details?    : string,
    /** Durée de fermeture en milliseconde, -1 pour laisser ouvert, 7500 par défaut */
    delay?      : number,
}

let toasts : (IToast & {type : T_SToastVariant,id:number})[] = [];
let idToast : number = 0;
const listeners : Set<Listener> = new Set<Listener>();

const emit = () => listeners.forEach(l => l());

const add = (type : T_SToastVariant, details : IToast) : number => {
    const id = idToast++;
    const delay : number = details.delay ?? 7500;
    toasts = [...toasts,{
        id      : id,
        title   : details.title,
        delay   : delay,
        details : details.details,
        type,
    }];
    emit();
    return id;
}

const dismiss = (id : number) : void => {
    toasts = toasts.filter(t => t.id !== id);
    emit();
}

export const toastStore = {
    subscribe   : (l : Listener) => { listeners.add(l); return () => listeners.delete(l); },
    getSnapshot : () => toasts,
};

export const toast = {
    info    : (details : IToast) => add("info", details),
    success : (details : IToast) => add("success", details),
    warning : (details : IToast) => add("warning", details),
    delete  : (details: IToast) => add("delete", details),
    error   : (details : IToast) => add("error", details),
    dismiss
}