# ![Logo ui](./public/icn_ui_mini.png) Bibliothèque de composants Schoolmore UI
## Scm-ui

![Scm-ui](https://img.shields.io/badge/School_More-Scm_ui-red)
![Node_version](https://img.shields.io/node/v/react)
![Issues](https://img.shields.io/github/issues/schoolmore/scm-ui)

---
Bienvenue sur le repository de la bibliothèque de composants React de Schoolmore !

![Image couverture](./public/ui.svg)

Cette bibliothèque permet de construire les interfaces des applications Schoolmore. Elle est encore aujourd'hui
en cours de développement. Attention : l'application scm-app *(gestion)* **n'utilise pas les composants React**.

> [!NOTE]
> Bibliothèque disponible publiquement

## Storybook

Lien vers le Storybook : [Storybook](https://ui.schoolmore.fr)

## Informations développement

> [!WARNING]
> Pour un accès interne uniquement. Pour un accès externe, cloner le repository.

### Utilisation dans un projet

1. Ajouter le fichier **.npmrc** à la racine du projet :
```text
@schoolmore:registry=https://npm.int.schoolmore.fr/
```
2. Installer :
```shell
npm i @schoolmore/scm-ui
```

3. Importer les styles une seule fois *(par exemple dans un `main.ts`)*, puis les composants :
```typescript
import "@schoolmore/scm-ui/styles.css";
import { SButton } from "@schoolmore/scm-ui";
```

### En développement

```shell
npm run dev       # Lancer le Storybook
npm run build     # Construire avant la publication
npm pack          # Créer une archive pour tester dans un autre projet avant le déploiement
npm version patch # Modifier la version (ou minor/major)
npm publish       # Publier sur le registre interne
```
