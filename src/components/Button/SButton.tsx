interface ISButton {
    variant : "primary" | "secondary" | "outline" | "ghost",
    text    : string
}

const SButton = ( {variant, text}: ISButton ) => {

    return (
        <button>{text} + {variant}</button>
    );

}

export default SButton;