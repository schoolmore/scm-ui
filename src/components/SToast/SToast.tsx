import styles from "./SToast.module.css";
import * as React from "react";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols.js";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SToastContext } from "../../context/SToast/SToastContext.js";

/** Type disponible pour le toast */
export type T_SToastVariant = "info" | "success" | "error" | "delete" | "warning";

export interface ISToast {
    /** Variante d'affichage */
    variant     : T_SToastVariant,
    /** Titre du toast */
    title       : string,
    /** Description éventuelle */
    details?    : string,
    /** Action affichée à la place du bouton fermer */
    children?   : React.ReactNode,
    /** Durée de fermeture en milliseconde, -1 pour laisser ouvert, 7500 par défaut */
    delay?      : number
}

const SToast = ( {
    variant,title,details,children,delay=7500
}: ISToast ) => {

    const [isShown, setIsShown] = useState<boolean>(true);

    useEffect(() => {
        if (delay < 0) return;
        const t = setTimeout(() => {
            setIsShown(false);
        }, delay);

        return () => clearTimeout(t);
    }, [])

    return (
        <SToastContext value={{close : () => setIsShown(false)}}>
            <AnimatePresence>
                {isShown&&(
                    <motion.div animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity:0}} className={`${styles.toast} ${styles[variant]}`}>
                        <div className={styles.start}>
                            <div className={styles.details}>
                                <h1>{title}</h1>
                                {details&&<p>{details}</p>}
                            </div>
                        </div>
                        {!children&&(
                            <div className={styles.close} onClick={() => setIsShown(false)}>
                                <SMaterialSymbols size="sm" color="var(--scm-ui-fg-muted)"
                                                    icon="close" />
                            </div>
                        )}
                        {children&&children}
                        <motion.div animate={{width: 0}} transition={{duration: delay/1000, ease: "linear"}} className={styles.loadingBar} />
                    </motion.div>
                )}
            </AnimatePresence>
        </SToastContext>
    );

}

export default SToast;