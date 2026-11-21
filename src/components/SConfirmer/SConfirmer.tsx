import { useSyncExternalStore } from "react";
import { confirmStore } from "../../context/SConfirmDialog/confirmStore.js";
import SConfirmDialog from "../SConfirmDialog/SConfirmDialog.js";


const SConfirmer = () => {

    const confirmations = useSyncExternalStore(confirmStore.subscribe, confirmStore.getSnapshot, confirmStore.getSnapshot);

    // Première confirmation en attente, sinon la dernière fermée (pour l'animation de sortie)
    const current = confirmations.find(c => c.open) ?? confirmations.at(-1);
    if (!current) return null;

    const { id, open, ...details } = current;

    return (
        <SConfirmDialog {...details} open={open}
                        onConfirm={() => confirmStore.settle(id, true)}
                        onCancel={() => confirmStore.settle(id, false)}
                        onOpenChange={(v) => { if (!v) confirmStore.settle(id, false); }} />
    );

}

export default SConfirmer;
