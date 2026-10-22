import styles from "./SButton.module.css";

export interface ISButton {
    variant : "primary" | "secondary" | "outline" | "ghost",
    text    : string,
    size    : "xs" | "sm" | "md" | "lg"
}

const SButton = ( {variant, text, size}: ISButton ) => {

    return (
        <button className={`${styles.button} ${styles[variant]} ${styles[size]}`}>{text} - {variant}</button>
    );

}

export default SButton;