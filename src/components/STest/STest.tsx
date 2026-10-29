export interface ISTest {
    text : string,
}

const STest = ( {
    text
}: ISTest ) => {

    return (
        <p>{text}</p>
    );

}

export default STest;