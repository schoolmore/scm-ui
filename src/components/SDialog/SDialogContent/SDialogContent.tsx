import * as React from "react";
import styles from "./SDialogContent.module.css";
import SDialogTitle from "../SDialogTitle/SDialogTitle.js";
import useDraggable from "../../../hooks/SDialog/useDraggable.js";
import { useDialog } from "../../../context/SDialog/SDialogContext.js";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import useIsMobile from "../../../hooks/useMobile.js";
import SDialogHandle from "../SDialogHandle/SDialogHandle.js";


export interface ISDialogContent {
    /** Contenu du dialogue */
    children    : React.ReactNode,
    /** Titre du dialogue */
    title       : string,
    /** Indique si le dialogue doit être movable, non par défaut */
    isMovable?  : boolean,
}

const SDialogContent = ( {
    children,title,isMovable=false,
}: ISDialogContent ) => {

    const { offset, handleProps } = useDraggable({enabled : isMovable});
    const { isOpen, toggle } = useDialog();
    const isMobile = useIsMobile();

    const dragsControls = useDragControls();

    return (
        <AnimatePresence>
            {isOpen && isMobile&&(
                <motion.div key="dialog-mobile" className={styles.dialogPrt}  exit={{opacity: 0}}
                            onClick={(e) => e.target === e.currentTarget && toggle(false)}>
                    <motion.div initial={{y: "100%"}} className={styles.dialog}
                                animate={{y: 0}} exit={{y: "100%"}}
                                transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                                drag="y"
                                dragListener={false}
                                dragControls={dragsControls}
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={{ top: 0, bottom: 1 }}
                                onDragEnd={(_, info) => {
                                    if (info.offset.y > 100 || info.velocity.y > 500) toggle(false);
                                }}>
                        <SDialogHandle onPointerDown={(e) => dragsControls.start(e)} />
                        <SDialogTitle onClick={() => toggle(false)} handleProps={handleProps} title={title} />
                        {children}
                    </motion.div>
                </motion.div>
            )}
            {isOpen && !isMobile&&(
                <motion.div
                    initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                    key="dialog-pc" className={styles.dialogPrt}>
                    {/* Le déplacement est porté par ce div : framer-motion écraserait style.transform en animant y */}
                    <div style={{transform : `translate(${offset.x}px, ${offset.y}px)`}}>
                        <motion.div
                            animate={{opacity: 1,y: 0}} initial={{opacity: 0.5,y: "1.5dvh"}}
                            exit={{opacity: 0, y: "2dvh"}}
                            className={styles.dialog}>
                            <SDialogTitle onClick={() => toggle(false)} handleProps={handleProps} isMovable={isMovable} title={title} />
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

}

export default SDialogContent;