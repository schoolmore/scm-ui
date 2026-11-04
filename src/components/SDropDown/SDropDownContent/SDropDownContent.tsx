import styles from "./SDropDownContent.module.css";
import * as React from "react";
import { useDropDown } from "../../../context/SDropDown/SDropDownContext.js";
import { AnimatePresence, motion } from "framer-motion";
import SDropDownSearch from "../SDropDownSearch/SDropDownSearch.js";
import SInput from "../../SInput/SInput.js";


export interface ISDropDownContent {
    /** Contenu de la liste */
    children    : React.ReactNode,
    /** Indique si la recherche doit être active, oui par défaut */
    hasSearch?  : boolean,
}

const SDropDownContent = ( {
    children,hasSearch=true,
}: ISDropDownContent ) => {

    const {isOpen,searchUpdated} = useDropDown();

    return (
        <AnimatePresence>
            <motion.div className={styles.contentPrt}>
                {isOpen&&(
                    <motion.div animate={{opacity: 1,y:0}} initial={{opacity: 0,y:"-2dvh"}} exit={{opacity:0,y:'-2dvh'}}
                        className={styles.content}>
                        {hasSearch&&(
                            <SDropDownSearch>
                                <SInput onChange={searchUpdated} placeholder={"Tapez pour rechercher"} name={"search"} icon={"search"} />
                            </SDropDownSearch>
                        )}
                        {children}
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );

}

export default SDropDownContent;