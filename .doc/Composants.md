# Créer un composant

Ce guide décrit les étapes pour qu'un nouveau composant soit visible dans Storybook **et** publié dans la lib npm `@schoolmore/scm-ui`.

Exemple utilisé : un composant `SCard`.

## 1. Créer le dossier du composant

```
src/components/Card/
  SCard.tsx            le composant
  SCard.module.css     ses styles
  SCard.stories.tsx    ses stories Storybook
```

Conventions : préfixe `S` pour les composants, `IS` pour l'interface des props, export par défaut du composant.

## 2. Écrire le composant : `SCard.tsx`

```tsx
import type { ReactNode } from "react";
import styles from "./SCard.module.css";

export interface ISCard {
    title    : string,
    children : ReactNode
}

const SCard = ( {title, children}: ISCard ) => {

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            {children}
        </div>
    );

}

export default SCard;
```

**Exporte toujours l'interface des props.** Sinon, les projets qui utilisent la lib ne peuvent pas typer ce qu'ils passent au composant.

## 3. Écrire les styles : `SCard.module.css`

```css
.card {
  padding: var(--scm-space-4);
  border: 1px solid var(--scm-color-border);
  border-radius: var(--scm-radius);
  font-family: var(--scm-font-family);
}

.title {
  color: var(--scm-color-text);
}
```

- Utilise toujours un fichier `.module.css`. Les noms de classe sont rendus uniques automatiquement, donc ils n'entrent pas en conflit avec le CSS des projets consommateurs.
- Utilise les variables `--scm-*` plutôt que des couleurs ou des tailles en dur. Pour une nouvelle variable, ajoute-la dans `src/styles/tokens.css`.
- N'importe jamais un fichier `.css` global depuis un composant. Tout le CSS global passe par `tokens.css`.

## 4. Écrire les stories : `SCard.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import SCard from "./SCard";

const meta = {
    title     : "Components/SCard",
    component : SCard,
    tags      : ["autodocs"],
    args      : { title : "Titre", children : "Contenu de la carte" },
} satisfies Meta<typeof SCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default : Story = {};
```

Rien d'autre à faire pour Storybook : il trouve automatiquement tous les fichiers `*.stories.tsx` dans `src/`. Le tag `autodocs` génère une page de documentation à partir des props.

## 5. Exporter le composant dans `src/index.ts`

> ⚠️ **Un composant absent de `src/index.ts` n'est pas publié dans la lib npm**, même s'il fonctionne dans Storybook.

```ts
export { default as SButton } from "./components/Button/SButton";
export { default as SCard } from "./components/Card/SCard";
export type { ISCard } from "./components/Card/SCard";
```

Ne modifie pas `src/main.ts` : il réexporte déjà tout `index.ts` et ajoute les styles globaux au bundle.

## 6. Vérifier

```sh
npm run dev                                         # tester le composant dans Storybook
npm run typecheck && npm run lint && npm run build
```

Ensuite, vérifie que `dist/index.d.ts` contient bien `SCard` et `ISCard`.

## 7. Publier

```sh
npm version minor    # nouveau composant = minor ; correction de bug = patch ; changement cassant = major
npm publish          # lance typecheck + lint + build via prepublishOnly
```

Dans les projets qui utilisent la lib : `npm update @schoolmore/scm-ui`.

## Règles à garder en tête

- **Imports entre composants :** si `SCard` utilise `SButton`, importe-le directement depuis son fichier (`../Button/SButton`). N'importe jamais depuis `src/index.ts` à l'intérieur de la lib, ça crée des imports circulaires.
- **Dépendances :** si un composant a besoin d'un paquet npm (une lib d'icônes, par exemple), ajoute-le dans `dependencies`, pas dans `devDependencies`. Sinon il manquera chez les projets qui utilisent la lib.
- **React :** n'ajoute jamais `react` ou `react-dom` aux `dependencies`. Ils restent des `peerDependencies`, fournis par le projet consommateur.

## Checklist

- [ ] `src/components/<Nom>/S<Nom>.tsx` avec l'interface `IS<Nom>` exportée
- [ ] `S<Nom>.module.css` qui utilise les variables `--scm-*`
- [ ] `S<Nom>.stories.tsx`
- [ ] Composant et type exportés dans `src/index.ts`
- [ ] `npm run typecheck && npm run lint && npm run build` OK
- [ ] `npm version` + `npm publish`
