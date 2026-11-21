# Scm-ui 0.0.8
## Nouvelle version

---

### SAvatar

- Correction de la taille afin d'éviter les déformations

### SLoadingDialog

- Adaptation du dialogue pour l'affichage mobile
- Correction de la police du commentaire

### SMaterialSymbols

- Ajout d'une action `onClick` sur l'icône

### SToast

- Ajout du composant SToast pour afficher un retour sur les actions des utilisateurs
- Plusieurs variantes : `Info`, `Success`, `Danger`, `Warning` et `Delete`

### SToastClose

- Composant permettant de commander la fermeture du parent grâce à une action enfant
- Vérification de l'autorisation de fermeture possible

### SSelectionInput

- Champ de formulaire permettant de sélection un ou plusieurs éléments
- Retourne la valeur si mis dans un `<SForm>`

### SSelectionDialog

- Dialogue permettant de mettre la valeur de la sélection dans un `<SInput>`
- Utilisation du `<SSelectionInput>`

### SInput

- Prise en charge du dialogue de sélection

### SSelectionCard

- Ajout du composant de carte de sélection
- Associé au parent avec `SSelectionInput`

### SRadioButton

- Ajout de la prise en charge des cartes parents
- Possibilité de ne rien retourner avec le mot clé *"none"*

### SCheckbox, 

- Ajout de la prise en charge des cartes parents
- Ajout d'un paramètre d'affichage du label
- Ajout du mode contrôlé pour la checkbox

### SToggleButton

- Correction du problème de sélection/désélection lorsqu'il n'y a aucun élément "all"

### STextArea

- Ajout du composant de TextArea

### SDialog

- Correction : Ajout du prop `close` pour afficher les boutons de fermeture
- Ajout d'un style sur le titre pour les dialogues non fermable

### SConfirmDialog

- Ajout du composant SConfirmDialog pour demander une confirmation à l'utilisateur
- Peut-être appeler depuis un script extérieur à React avec `confirmation()` *(comme les toast)* via un `await`
- Le composant `<SConfirmer />`, inclus dans `SScmApp`, affiche les confirmations demandées par `confirmation()`