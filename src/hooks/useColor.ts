/**
 * Indiquer si une couleur est trop sombre pour être sur un fond noir
 * @param {string} color Couleur au format #rrggbb
 * @returns {boolean}
 */
const useIsColorTooDark = (color : string) : boolean => {
    const hexColor : string = color.replace(/^#/, '');

    const r : number = parseInt(hexColor.substring(0, 2), 16) / 255;
    const g : number = parseInt(hexColor.substring(2, 4), 16) / 255;
    const b : number = parseInt(hexColor.substring(4, 6), 16) / 255;

    return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 0.5;
}

export default useIsColorTooDark;