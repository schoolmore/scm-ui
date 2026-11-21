import type { ISConfirmDialog } from "../../components/SConfirmDialog/SConfirmDialog.js";


type Listener = () => void;

export type IConfirmation = Omit<ISConfirmDialog, "children" | "open" | "onOpenChange">;

export interface IConfirmEntry extends IConfirmation {
    id      : number,
    /** Faux une fois la réponse donnée : le dialogue reste affiché le temps de l'animation de fermeture */
    open    : boolean,
}

let confirmations : IConfirmEntry[] = [];
let idConfirm : number = 0;
const resolvers : Map<number, (v : boolean) => void> = new Map();
const listeners : Set<Listener> = new Set<Listener>();

const emit = () => listeners.forEach(l => l());

/**
 * Répondre à une confirmation. Seule la première réponse est prise en compte.
 * @param {number} id
 * @param {boolean} value
 */
const settle = (id : number, value : boolean) : void => {
    const entry = confirmations.find(c => c.id === id);
    const resolve = resolvers.get(id);
    if (!entry || !entry.open || !resolve) return;

    resolvers.delete(id);
    // On ne garde qu'une seule confirmation fermée : la dernière, pour son animation de sortie
    confirmations = confirmations
        .filter(c => c.open)
        .map(c => c.id === id ? {...c, open : false} : c);
    emit();

    if (value) entry.onConfirm?.();
    else entry.onCancel?.();
    resolve(value);
}

export const confirmStore = {
    subscribe   : (l : Listener) => { listeners.add(l); return () => listeners.delete(l); },
    getSnapshot : () => confirmations,
    settle,
};

/**
 * Ouvrir un dialogue de confirmation, utilisable en dehors des composants React.
 * Nécessite un `<SConfirmer />` monté (inclus dans `SScmApp`).
 * @param {IConfirmation} details
 * @returns {Promise<boolean>} Vrai si l'utilisateur confirme, faux s'il annule ou ferme le dialogue
 */
export const confirmation = (details : IConfirmation) : Promise<boolean> =>
    new Promise<boolean>(resolve => {
        const id = idConfirm++;
        resolvers.set(id, resolve);
        confirmations = [...confirmations.filter(c => c.open), {...details, id, open : true}];
        emit();
    });
