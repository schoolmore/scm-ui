import styles from "./SMainApp.module.css";
import { useSideBar } from "../../context/SSideBar/SSideBarContext.js";

const SMainApp = () => {

    const { activeTab, mainId } = useSideBar();

    return (
        <main className={styles.main} id={mainId} tabIndex={-1} aria-label={activeTab?.name}>
            {activeTab?.page}
        </main>
    );

}

export default SMainApp;
