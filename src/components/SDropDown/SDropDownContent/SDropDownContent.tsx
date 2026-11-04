import styles from "./SDropDownContent.module.css";
import * as React from "react";
import { FloatingPortal } from "@floating-ui/react";
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

    const {isOpen,searchUpdated,setFloating,floatingStyles,placement,getFloatingProps} = useDropDown();

    // Le contenu glisse depuis le trigger, qu'il soit en dessous ou au-dessus
    const fromY : string = placement.startsWith("top") ? "2dvh" : "-2dvh";

    return (
        <AnimatePresence>
            {isOpen&&(
                <FloatingPortal>
                    {/* floating-ui positionne ce div (transform), framer-motion anime l'enfant */}
                    <div ref={setFloating} style={floatingStyles} className={styles.floating} {...getFloatingProps()}>
                        <motion.div animate={{opacity: 1,y:0}} initial={{opacity: 0,y:fromY}} exit={{opacity:0,y:fromY}}
                            className={styles.content}>
                            {hasSearch&&(
                                <SDropDownSearch>
                                    <SInput onChange={searchUpdated} placeholder={"Tapez pour rechercher"} name={"search"} icon={"search"} />
                                </SDropDownSearch>
                            )}
                            {children}
                        </motion.div>
                    </div>
                </FloatingPortal>
            )}
        </AnimatePresence>
    );

}

export default SDropDownContent;
