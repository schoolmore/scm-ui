import styles from "./SToaster.module.css";
import { useSyncExternalStore } from "react";
import { toast, toastStore } from "../../context/SToast/toastStore.js";
import SToast from "../SToast/SToast.js";


const SToaster = () => {

    const toasts = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, toastStore.getSnapshot);

    if (toasts.length === 0) return null;

    return (
        <section className={styles.toaster} aria-live="polite" aria-label="Notifications">
            {toasts.map(t => (
                <SToast key={t.id} {...t} variant={t.type} onClose={() => toast.dismiss(t.id)} />
            ))}
        </section>
    );

}

export default SToaster;