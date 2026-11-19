import styles from "./SToast.module.css";
import * as React from "react";
import SMaterialSymbols from "../SMaterialSymbols/SMaterialSymbols.js";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SToastContext } from "../../context/SToast/SToastContext.js";
import useIsMobile from "../../hooks/useMobile.js";

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
    delay?      : number,
    /** Méthode exécutée à la fermeture du toast */
    onClose?    : () => void,
}

const SToast = ( {
    variant,title,details,children,delay=7500,onClose,
}: ISToast ) => {

    const [isShown, setIsShown] = useState<boolean>(true);
    const isMobile : boolean = useIsMobile();

    const closeIfMobile = () : void => {
        if (!isMobile) return;
        closeToast();
    }

    const closeToast = () : void => {
        setIsShown(false);
        onClose?.()
    }

    useEffect(() => {
        if (delay < 0) return;
        const t = setTimeout(() => {
            closeToast();
        }, delay);

        return () => clearTimeout(t);
    }, [])

    return (
        <SToastContext value={{close : closeToast}}>
            <AnimatePresence>
                {isShown&&(
                    <motion.div onClick={closeIfMobile} animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity:0}} className={`${styles.toast} ${styles[variant]}`}>
                        <div className={styles.start}>
                            <div className={styles.details}>
                                <h1>{title}</h1>
                                {details&&<p>{details}</p>}
                            </div>
                        </div>
                        {(!children&&!isMobile)&&(
                            <div className={styles.close} onClick={closeToast}>
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