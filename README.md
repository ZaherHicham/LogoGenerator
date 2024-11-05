# Projet : Logo Generator

## Description

Le projet **Logo Generator** consiste à créer un composant Web `<logo-generator>` entièrement personnalisé qui accepte divers attributs pour générer un logo animé. Ce composant permet d’afficher un texte avec des options de couleur et d’animation configurables. L’objectif est de fournir un composant flexible et facilement intégrable dans d'autres projets.

## Fonctionnalités Réalisées

### [x] 1. Création d'un Web Component `<logo-generator>`
- Mise en place d'un composant Web `<logo-generator>` en partant de zéro, en utilisant les standards modernes de **Web Components** (Shadow DOM, Custom Elements).
- Définition d'un élément `<logo-generator>` dans lequel les utilisateurs peuvent spécifier divers attributs pour personnaliser l’apparence et l’animation du logo.

### [x] 2. Acceptation d'Attributs Personnalisés
- Le composant accepte les attributs suivants :
  - **`text`** : Définit le texte qui s’affiche dans le logo. Par exemple : `text="Coucou les amis"`.
  - **`animation`** : Applique une animation CSS au logo. Par exemple : `animation="flip-horizontal-infinite"`. Les animations disponibles sont définies dans le CSS du composant.
  - **`color`** : Change la couleur du texte. Par exemple : `color="red"`.

### [x] 3. Affichage de Texte et Application de Styles de Base
- Le texte spécifié dans l’attribut `text` est affiché dynamiquement dans le logo.
- Application de la couleur définie par l'utilisateur via l'attribut `color`.

### [x] 4. Ajout d'Animations CSS
- Intégration d'animations CSS pour rendre le logo dynamique et attractif.
- Les animations sont appliquées en fonction de la valeur de l’attribut `animation` (par exemple, `flip-horizontal-infinite` pour une rotation horizontale infinie).

---

[x] : Fonctionnalités faites