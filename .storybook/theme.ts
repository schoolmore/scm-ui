import { create } from 'storybook/theming';

export default create({
    base: 'light',

    // Marque
    brandTitle: 'Schoolmore UI',       // nom affiché (sert aussi pour le titre de l'onglet)
    brandUrl: 'https://www.schoolmore.fr', // lien au clic sur le logo
    brandImage: 'public/icon.svg',           // ton logo à la place de celui de Storybook
    brandTarget: '_self',

    // Couleurs
    colorPrimary: '#C11818',
    colorSecondary: '#C11818',         // CTA, élément sélectionné, onglets actifs

    // UI
    appBg: '#FFF5F5',
    appContentBg: '#FFFFFF',
    appBorderColor: '#EEEEEE',
    appBorderRadius: 6,

    // Typo
    fontBase: '"Outfit Variable", system-ui, sans-serif',
    textColor: '#000000',
    textMutedColor: '#8F8F8F',

    // Barre d'outils
    barTextColor: '#8F8F8F',
    barSelectedColor: '#C11818',
    barHoverColor: '#D22E2E',
    barBg: '#FFFFFF',

    // Champs (panneau Controls)
    inputBg: '#FFFFFF',
    inputBorder: '#D6D6D6',
    inputTextColor: '#000000',
    inputBorderRadius: 4,
});