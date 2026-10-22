# @schoolmore/scm-ui

Librairie de composants React (React 19) de Schoolmore, publiée sur le registre interne Verdaccio `https://npm.int.schoolmore.fr/`.

## Utilisation dans un projet

1. Ajouter dans le `.npmrc` du projet :

   ```
   @schoolmore:registry=https://npm.int.schoolmore.fr/
   ```

2. Installer :

   ```sh
   npm i @schoolmore/scm-ui
   ```

3. Importer les styles une seule fois (ex. dans `main.tsx`), puis les composants :

   ```tsx
   import "@schoolmore/scm-ui/styles.css";
   import { SButton } from "@schoolmore/scm-ui";
   ```

`react` et `react-dom` (>= 19) sont des `peerDependencies` : ils sont fournis par le projet consommateur.

## Développement

```sh
npm run dev          # Storybook sur http://localhost:6006
npm run typecheck    # vérification TypeScript
npm run lint
npm run build        # génère dist/ (index.js, styles.css, .d.ts)
```

### Structure

```
src/
  index.ts                 API publique : exporter chaque composant ici
  main.ts                  entrée du bundle Vite (styles globaux + index.ts)
  styles/tokens.css        design tokens (variables CSS --scm-*)
  components/<Nom>/
    S<Nom>.tsx
    S<Nom>.module.css      styles du composant (CSS Modules)
    S<Nom>.stories.tsx
```

Un nouveau composant n'est publié que s'il est exporté depuis `src/index.ts`.

## Publication

Prérequis : être authentifié sur le registre (`npm login --registry https://npm.int.schoolmore.fr/`, token stocké dans `~/.npmrc`).

```sh
npm version patch    # ou minor / major
npm publish          # lance typecheck + lint + build via prepublishOnly
```

Le `publishConfig` du `package.json` force la publication sur Verdaccio, jamais sur npmjs.
