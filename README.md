# EasyPLC School

Plateforme open source d'apprentissage de l'automatisme industriel et des automates programmables (PLC).

> **Projet open source** : Ce projet est ouvert aux contributions ! Que vous soyez développeur, enseignant en automatisme ou professionnel de l'industrie, vos contributions sont les bienvenues pour enrichir le contenu pédagogique et améliorer la plateforme.

## Table des matières

- [Captures d'écran](#captures-décran)
- [Parcours d'apprentissage](#parcours-dapprentissage)
- [Contenu pédagogique](#contenu-pédagogique)
  - [Modules fondamentaux](#modules-fondamentaux-partagés)
  - [Modules Automatisme](#modules-automatisme)
  - [Modules CNC](#modules-cnc)
  - [Modules Siemens](#modules-siemens)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Compte démo](#compte-démo)
- [Stack technique](#stack-technique)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Captures d'écran

### Vue d'ensemble
![Vue d'ensemble de l'application](public/overview.png)

### Module d'apprentissage
![Exemple d'un module](public/module1.png)

### Parcours d'apprentissage
![Parcours d'apprentissage](public/learning-path.png)

---

## Parcours d'apprentissage

EasyPLC School propose trois parcours de spécialisation avec un socle commun de modules fondamentaux :

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PARCOURS D'APPRENTISSAGE                                          │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                │
│   🏭 AUTOMATISME INDUSTRIEL       🔧 COMMANDE NUMÉRIQUE (CNC)      🔷 AUTOMATISME SIEMENS     │
│   ━━━━━━━━━━━━━━━━━━━━━━━━       ━━━━━━━━━━━━━━━━━━━━━━━━━━       ━━━━━━━━━━━━━━━━━━━━━━     │
│                                                                                                │
│   ├── Introduction *              ├── Introduction *              ├── Introduction *          │
│   ├── Logique combinatoire *      ├── Logique combinatoire *      ├── Logique combinatoire *  │
│   ├── Capteurs/actionneurs *      ├── Capteurs/actionneurs *      ├── Le langage LADDER       │
│   ├── Le langage LADDER           ├── Introduction CNC            ├── Introduction S7-1500    │
│   └── GRAFCET                     ├── Programmation G-Code        ├── Programmation TIA Portal│
│                                   └── Axes et interpolation       └── Blocs de données S7     │
│                                                                                                │
│   * Modules fondamentaux partagés entre les parcours                                          │
│                                                                                                │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Parcours Automatisme industriel 🏭

Ce parcours couvre les bases de l'automatisation industrielle avec les automates programmables (PLC). Il inclut :
- 5 modules progressifs
- 10 leçons au total
- Focus sur le LADDER et le GRAFCET

### Parcours Commande numérique (CNC) 🔧

Ce parcours se spécialise dans la programmation des machines à commande numérique :
- 6 modules (3 fondamentaux + 3 spécialisés)
- Apprentissage du G-Code
- Maîtrise des systèmes d'axes

### Parcours Automatisme Siemens 🔷

Ce parcours est dédié aux automates Siemens S7-1500 et à l'environnement TIA Portal :
- 6 modules (3 fondamentaux + 3 spécialisés Siemens)
- 6 leçons spécialisées avec diagrammes ASCII
- Programmation LAD, FBD, SCL
- Maîtrise des blocs de données (DB)

---

## Contenu pédagogique

EasyPLC School propose un parcours complet pour maîtriser les fondamentaux de l'automatisme industriel. Chaque module est conçu pour être progressif, avec des leçons théoriques, des schémas explicatifs et des quiz de validation.

### Public cible

- Étudiants en génie électrique, maintenance industrielle ou automatisme
- Techniciens souhaitant se reconvertir vers l'automatisme
- Professionnels cherchant à consolider leurs bases

---

## Modules fondamentaux (partagés)

Ces modules constituent le socle commun des deux parcours d'apprentissage.

### Module 1 : Introduction à l'automatisme 🔌

> **Objectif** : Comprendre ce qu'est un automate programmable et son rôle dans l'industrie

#### Architecture d'un automate (PLC)

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATE PROGRAMMABLE                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                                                         │  │
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ │  │
│  │  │         │    │             │    │                 │ │  │
│  │  │ ENTRÉES │───▶│     CPU     │───▶│    SORTIES      │ │  │
│  │  │  (I)    │    │  (Programme)│    │      (Q)        │ │  │
│  │  │         │    │             │    │                 │ │  │
│  │  └─────────┘    └─────────────┘    └─────────────────┘ │  │
│  │       ▲               │                    │           │  │
│  │       │          ┌────┴────┐               ▼           │  │
│  │       │          │ MÉMOIRE │         ┌─────────┐       │  │
│  │       │          └─────────┘         │ALIMENT. │       │  │
│  │       │                              └─────────┘       │  │
│  └───────┼──────────────────────────────────────────────┘  │
│          │                                      │           │
└──────────┼──────────────────────────────────────┼───────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  CAPTEURS   │                      │  ACTIONNEURS  │
    │ - Boutons   │                      │ - Moteurs     │
    │ - Détecteurs│                      │ - Vannes      │
    │ - Sondes    │                      │ - Voyants     │
    └─────────────┘                      └───────────────┘
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Qu'est-ce qu'un automate programmable ? | 10 min | 50 | Découverte du PLC et son rôle industriel |
| 2 | Les entrées et sorties (E/S) | 12 min | 60 | Comprendre l'interface avec le monde physique |
| 3 | Le cycle automate | 15 min | 70 | Fonctionnement cyclique : lecture → exécution → écriture |

#### Le cycle automate

```
        ┌────────────────────────────────────────┐
        │                                        │
        ▼                                        │
┌───────────────┐                                │
│   LECTURE     │  Lire l'état de toutes        │
│   ENTRÉES     │  les entrées (capteurs)       │
└───────┬───────┘                                │
        │                                        │
        ▼                                        │
┌───────────────┐                                │
│  EXÉCUTION    │  Exécuter le programme        │
│  PROGRAMME    │  ligne par ligne              │
└───────┬───────┘                                │
        │                                        │
        ▼                                        │
┌───────────────┐                                │
│   ÉCRITURE    │  Mettre à jour les            │
│   SORTIES     │  sorties (actionneurs)        │
└───────┬───────┘                                │
        │                                        │
        └────────────────────────────────────────┘
                  Temps de cycle : 5-20 ms
```

---

### Module 2 : Logique combinatoire 🔀

> **Objectif** : Maîtriser les portes logiques fondamentales ET, OU, NON

#### Les trois portes logiques de base

```
    PORTE ET (AND)              PORTE OU (OR)              PORTE NON (NOT)
    ─────────────               ─────────────               ──────────────

    A ──┐                       A ──┐                            ┌──o── S
        │ ┌───┐                     │ ┌───┐                  A ──┤
    B ──┴─┤ & ├── S             B ──┴─┤≥1 ├── S                  └─────
          └───┘                       └───┘
                                                            S = NON A
    S = A ET B                  S = A OU B                  (inversion)
    (tous à 1)                  (au moins 1)
```

#### Tables de vérité

**Porte ET (AND)**
| A | B | A ET B |
|:-:|:-:|:------:|
| 0 | 0 | **0**  |
| 0 | 1 | **0**  |
| 1 | 0 | **0**  |
| 1 | 1 | **1**  |

**Porte OU (OR)**
| A | B | A OU B |
|:-:|:-:|:------:|
| 0 | 0 | **0**  |
| 0 | 1 | **1**  |
| 1 | 0 | **1**  |
| 1 | 1 | **1**  |

**Porte NON (NOT)**
| A | NON A |
|:-:|:-----:|
| 0 | **1** |
| 1 | **0** |

#### Exemple industriel : Démarrage sécurisé d'un moteur

```
Conditions de démarrage :
━━━━━━━━━━━━━━━━━━━━━━━━

    ┌─────────────────┐
    │  Bouton START   │──┐
    │    (appuyé)     │  │
    └─────────────────┘  │
                         │    ┌─────┐
    ┌─────────────────┐  ├────┤     │
    │ Capot sécurité  │──┤    │ ET  ├───▶ MOTEUR DÉMARRE
    │    (fermé)      │  ├────┤     │
    └─────────────────┘  │    └─────┘
                         │
    ┌─────────────────┐  │
    │  Arrêt urgence  │──┘
    │ (NON enclenché) │
    └─────────────────┘

Le moteur démarre UNIQUEMENT si les 3 conditions sont réunies !
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | La porte ET (AND) | 12 min | 60 | Fonction ET et contacts en série |
| 2 | La porte OU (OR) | 12 min | 60 | Fonction OU et contacts en parallèle |
| 3 | La porte NON (NOT) | 10 min | 50 | Inversion et contacts normalement fermés |

---

### Module 3 : Le langage LADDER 🪜

> **Objectif** : Lire et écrire des programmes en langage LADDER (schéma à contacts)

#### Principe du LADDER

Le LADDER (échelle) est un langage graphique qui ressemble aux schémas électriques. Le "courant" circule de gauche à droite.

```
    Barre         Contacts              Bobine         Barre
    gauche                                            droite
      │                                                 │
      │     ┌─────┐          ┌─────┐         ┌───┐     │
      ├─────┤ I0.0├──────────┤ I0.1├─────────┤Q0.0├────┤
      │     └──┬──┘          └──┬──┘         └─┬─┘     │
      │        │                │              │       │
      │     Contact          Contact        Bobine     │
      │       NO               NO                      │
      │                                                │
```

#### Éléments de base

```
CONTACTS                              BOBINES

  ──┤ ├──   Contact NO               ──( )──   Bobine simple
            (Normalement Ouvert)               (activée si courant)

  ──┤/├──   Contact NF               ──(S)──   Bobine SET
            (Normalement Fermé)                (mémorisation)

                                     ──(R)──   Bobine RESET
                                               (remise à zéro)
```

#### Exemple : Fonction ET en LADDER

```
Équation logique : Q0.0 = I0.0 ET I0.1

      │                                         │
      │     ┌─────┐          ┌─────┐   ┌─────┐  │
      ├─────┤ I0.0├──────────┤ I0.1├───┤ Q0.0├──┤
      │     └─────┘          └─────┘   └─────┘  │
      │    (Bouton 1)       (Bouton 2) (Voyant) │
      │                                         │

Le voyant s'allume si Bouton 1 ET Bouton 2 sont appuyés
```

#### Exemple : Fonction OU en LADDER

```
Équation logique : Q0.0 = I0.0 OU I0.1

      │     ┌─────┐                    ┌─────┐  │
      ├─────┤ I0.0├────────────────────┤ Q0.0├──┤
      │     └─────┘                    └──┬──┘  │
      │         │                         │     │
      │     ┌───┴───┐                     │     │
      ├─────┤  I0.1 ├─────────────────────┘     │
      │     └───────┘                           │
      │                                         │

Le voyant s'allume si Bouton 1 OU Bouton 2 est appuyé
```

#### Exemple : Auto-maintien (mémorisation)

```
Marche/Arrêt d'un moteur avec mémorisation :

      │     ┌─────┐   ┌─────┐          ┌─────┐  │
      ├─────┤START├───┤STOP ├──────────┤MOTOR├──┤
      │     └─────┘   └──/──┘          └──┬──┘  │
      │         │        NF               │     │
      │     ┌───┴────────────────────┐    │     │
      ├─────┤        MOTOR           ├────┘     │
      │     └────────────────────────┘          │
      │          (auto-maintien)                │

1. Appui sur START → MOTOR s'active
2. MOTOR reste actif (auto-maintien)
3. Appui sur STOP → MOTOR se désactive
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Introduction au langage LADDER | 15 min | 70 | Structure et symboles de base |
| 2 | Contacts et bobines | 18 min | 80 | Contacts NO/NF, bobines SET/RESET |

---

### Module 4 : Capteurs et actionneurs 📡

> **Objectif** : Connecter un automate au monde physique

#### Types de capteurs TOR (Tout Ou Rien)

```
CAPTEURS MÉCANIQUES                    CAPTEURS DE PROXIMITÉ
━━━━━━━━━━━━━━━━━━━                    ━━━━━━━━━━━━━━━━━━━━━

┌─────────────────┐                    ┌─────────────────┐
│  FIN DE COURSE  │                    │    INDUCTIF     │
│                 │                    │   ┌───────┐     │
│    ┌────┐       │                    │   │ ~~~   │     │  Détecte
│  ──┤    ├──     │                    │   │  ○    │◀────│  les MÉTAUX
│    └────┘       │                    │   └───────┘     │
└─────────────────┘                    └─────────────────┘

┌─────────────────┐                    ┌─────────────────┐
│ BOUTON POUSSOIR │                    │   CAPACITIF     │
│                 │                    │   ┌───────┐     │
│      ┌─┐        │                    │   │  ≋≋   │     │  Détecte
│    ──┤ ├──      │                    │   │  ○    │◀────│  TOUT matériau
│      └─┘        │                    │   └───────┘     │
└─────────────────┘                    └─────────────────┘

                                       ┌─────────────────┐
                                       │    OPTIQUE      │
                                       │                 │
                                       │  ▶━━━━━━━◀      │  Faisceau
                                       │  Émetteur Récep.│  lumineux
                                       └─────────────────┘
```

#### Câblage type d'un capteur

```
           ┌────────────────────────────────────┐
           │           AUTOMATE                 │
           │                                    │
           │  ┌─────┐  ┌─────┐  ┌─────┐        │
           │  │ I0.0│  │ I0.1│  │ I0.2│  ...   │
           │  └──┬──┘  └──┬──┘  └──┬──┘        │
           │     │        │        │           │
           └─────┼────────┼────────┼───────────┘
                 │        │        │
            ┌────┴───┐ ┌──┴────┐ ┌─┴─────┐
            │Capteur │ │Capteur│ │Capteur│
            │   1    │ │   2   │ │   3   │
            └────────┘ └───────┘ └───────┘

       💡 Chaque capteur est connecté à une entrée de l'automate
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Les capteurs TOR | 15 min | 70 | Capteurs mécaniques et de proximité |

---

## Modules Automatisme

Ces modules sont spécifiques au parcours Automatisme industriel.

### Module 5 : GRAFCET 📊

> **Objectif** : Modéliser et programmer des systèmes séquentiels

#### Structure du GRAFCET

```
    ╔═══════════════════════════════════════════════════════╗
    ║                    GRAFCET                             ║
    ║   Graphe Fonctionnel de Commande Étape-Transition     ║
    ╚═══════════════════════════════════════════════════════╝

         ┌─────┐
         │  0  │◀──── Étape initiale (double carré)
         └──┬──┘
            │
         ───┴───  ◀── Transition (condition)
         départ
            │
         ┌──┴──┐
         │  1  │───── Action : Avancer vérin
         └──┬──┘
            │
         ───┴───
         fin av.
            │
         ┌──┴──┐
         │  2  │───── Action : Reculer vérin
         └──┬──┘
            │
         ───┴───
         fin rec.
            │
            └────────▶ Retour à l'étape 0
```

#### Éléments du GRAFCET

```
ÉTAPE                           TRANSITION                 ACTION
━━━━━                           ━━━━━━━━━━                 ━━━━━━

┌─────┐
│  n  │  Étape normale           ────┬────                │  n  │── Action
└─────┘                         condition                 └─────┘
                                     │
╔═════╗
║  0  ║  Étape initiale         Exemples :
╚═════╝  (active au départ)     - "bouton appuyé"
                                - "capteur = 1"
                                - "tempo écoulée"
```

#### Exemple : Cycle d'un vérin

```
    Vérin simple effet avec 2 capteurs de position

    ┌──────────────────────────────────────────┐
    │  [a]                               [b]   │
    │   ○━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━○    │
    │        ◀══════════════════════▶          │
    │              Piston mobile               │
    └──────────────────────────────────────────┘
        a = capteur rentré       b = capteur sorti


                    GRAFCET

                    ╔═════╗
                    ║  0  ║──── Attente
                    ╚══╤══╝
                       │
                    ───┴─── dcy (départ cycle)
                       │
                    ┌──┴──┐
                    │  1  │──── Sortir vérin (V+)
                    └──┬──┘
                       │
                    ───┴─── b (vérin sorti)
                       │
                    ┌──┴──┐
                    │  2  │──── Rentrer vérin (V-)
                    └──┬──┘
                       │
                    ───┴─── a (vérin rentré)
                       │
                       └────▶ Retour étape 0
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Introduction au GRAFCET | 20 min | 80 | Étapes, transitions, actions |

---

## Modules CNC

Ces modules sont spécifiques au parcours Commande numérique (CNC).

### Module 6 : Introduction à la CNC 🔧

> **Objectif** : Découvrir les machines à commande numérique et leur fonctionnement

#### Qu'est-ce qu'une machine CNC ?

```
┌─────────────────────────────────────────────────────────────────┐
│                    MACHINE À COMMANDE NUMÉRIQUE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌─────────────────┐      ┌─────────────────┐                   │
│   │    COMMANDE     │      │      PARTIE     │                   │
│   │   NUMÉRIQUE     │─────▶│    OPÉRATIVE    │                   │
│   │   (Programme)   │      │   (Mécanique)   │                   │
│   └─────────────────┘      └─────────────────┘                   │
│          │                         │                              │
│          │    Programme G-Code     │                              │
│          │    ─────────────────    │                              │
│          │    G00 X50 Y30          │                              │
│          │    G01 Z-5 F200         │                              │
│          │    G02 X80 Y30 R15      │                              │
│          │                         │                              │
│          ▼                         ▼                              │
│   ┌─────────────────┐      ┌─────────────────┐                   │
│   │ • Trajectoires  │      │ • Axes X, Y, Z  │                   │
│   │ • Vitesses      │      │ • Broche        │                   │
│   │ • Outils        │      │ • Table         │                   │
│   └─────────────────┘      └─────────────────┘                   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

#### Types de machines CNC

```
FRAISEUSE CNC                    TOUR CNC                    DÉCOUPE LASER
━━━━━━━━━━━━━                    ━━━━━━━━                    ━━━━━━━━━━━━━

    Z                               Z                            Faisceau
    ↑                               ↑                            laser
    │  ┌───┐                        │                              │
    │  │ ▼ │ Broche                 │    ─────                     ▼
    │  └───┘                        │   (     )                  ┌───┐
    │    │                          │    ─────  Pièce            │ ○ │
────┼────┼────→ X                   └─────────→ X               ─┴───┴─
    │    │                              Mandrin                   Table
   Table avec                                                     X-Y
   pièce fixée
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Qu'est-ce qu'une machine CNC ? | 12 min | 60 | Découverte des machines à commande numérique |
| 2 | Types de machines CNC | 15 min | 70 | Fraiseuses, tours, découpe laser et plus |

---

### Module 7 : Programmation G-Code 📝

> **Objectif** : Maîtriser le langage de programmation des machines CNC

#### Structure d'un programme G-Code

```
Programme G-Code type :
━━━━━━━━━━━━━━━━━━━━━━

%                          ← Début de programme
O0001                      ← Numéro de programme
(PIECE EXEMPLE)            ← Commentaire

N10 G21 G90                ← Configuration : mm, absolu
N20 G00 X0 Y0 Z5           ← Positionnement rapide
N30 M03 S1200              ← Broche ON, 1200 tr/min
N40 G01 Z-2 F100           ← Plongée à -2mm, avance 100
N50 G01 X50 F200           ← Usinage vers X=50
N60 G01 Y30                ← Usinage vers Y=30
N70 G00 Z5                 ← Remontée rapide
N80 M05                    ← Broche OFF
N90 G00 X0 Y0              ← Retour origine
N100 M30                   ← Fin de programme
%
```

#### Codes G essentiels

| Code | Fonction | Exemple |
|------|----------|---------|
| G00 | Déplacement rapide | `G00 X50 Y30` |
| G01 | Interpolation linéaire | `G01 X100 F200` |
| G02 | Arc horaire | `G02 X50 Y50 R25` |
| G03 | Arc anti-horaire | `G03 X50 Y50 R25` |
| G90 | Mode absolu | Coordonnées depuis l'origine |
| G91 | Mode relatif | Coordonnées depuis position actuelle |

#### Codes M essentiels

| Code | Fonction |
|------|----------|
| M03 | Broche sens horaire |
| M04 | Broche sens anti-horaire |
| M05 | Arrêt broche |
| M30 | Fin de programme |

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Structure d'un programme G-Code | 15 min | 70 | Organisation et syntaxe de base |
| 2 | Codes G et M essentiels | 18 min | 80 | Les commandes fondamentales |

---

### Module 8 : Axes et interpolation 📐

> **Objectif** : Comprendre les systèmes de coordonnées et les mouvements en CNC

#### Système de coordonnées

```
                    Z+
                    │
                    │
                    │
                    │
                    │
     Y+            │
      ╲            │
       ╲           │
        ╲          │
         ╲         │
          ╲        O─────────────── X+
           ╲
            ╲

    Repère cartésien 3 axes
    ━━━━━━━━━━━━━━━━━━━━━━━
    O = Origine pièce (ou machine)
    X = Axe longitudinal
    Y = Axe transversal
    Z = Axe vertical (profondeur)
```

#### Types d'interpolation

```
INTERPOLATION LINÉAIRE (G01)          INTERPOLATION CIRCULAIRE (G02/G03)
━━━━━━━━━━━━━━━━━━━━━━━━━━            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      B●                                      ●B
       ╲                                   ╱     ╲
        ╲                                ╱         ╲
         ╲                              ╱     R     ╲
          ╲                            ●─────────────●
           ╲                          A    Centre    C
            ●A

  Trajectoire en ligne droite         Trajectoire en arc de cercle
  de A vers B                         G02 : sens horaire
  G01 X... Y... F...                  G03 : sens anti-horaire
```

#### Exemple de trajectoire

```
    Y
    ↑
  50├───────────●B
    │          ╱│
    │        ╱  │
  30├──────●A   │
    │      │    │
    │      │    │
    └──────┼────┼────→ X
          30   50

Programme :
G00 X30 Y30     (aller en A rapide)
G01 X50 Y50 F200 (usiner vers B)
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Système de coordonnées | 12 min | 60 | Repères et origines machine/pièce |
| 2 | Interpolation linéaire et circulaire | 18 min | 80 | G01, G02, G03 en détail |

---

## Modules Siemens

Ces modules sont spécifiques au parcours Automatisme Siemens S7-1500.

### Module 9 : Introduction au Siemens S7-1500 🔷

> **Objectif** : Découvrir l'automate Siemens S7-1500 et l'environnement TIA Portal

#### Architecture S7-1500

```
┌─────────────────────────────────────────────────────────────────────┐
│                           S7-1500                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  ││
│  │   │ DISPLAY │ │   CPU   │ │   DI    │ │   DQ    │ │   AI    │  ││
│  │   │         │ │ 1511-1  │ │  16x24V │ │  16x24V │ │   8x    │  ││
│  │   │  [===]  │ │  PN     │ │         │ │         │ │  0-10V  │  ││
│  │   │  [===]  │ │         │ │  ○ ○ ○  │ │  ○ ○ ○  │ │         │  ││
│  │   │  [===]  │ │  RUN    │ │  ○ ○ ○  │ │  ○ ○ ○  │ │  CH0-7  │  ││
│  │   │         │ │  STOP   │ │         │ │         │ │         │  ││
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  ││
│  │                                                                 ││
│  │   ════════════════════════════════════════════════════════════ ││
│  │                        PROFINET / PROFIBUS                      ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

#### Gamme de CPUs S7-1500

| CPU | Mémoire | Performance |
|-----|---------|-------------|
| 1511 | 150 KB | Entrée de gamme |
| 1513 | 300 KB | Standard |
| 1515 | 500 KB | Avancé |
| 1517 | 2 MB | Haute performance |
| 1518 | 4 MB | Maximum |

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Présentation du S7-1500 | 15 min | 70 | Architecture et caractéristiques |
| 2 | L'environnement TIA Portal | 18 min | 80 | Interface et fonctionnalités |

---

### Module 10 : Programmation TIA Portal 💻

> **Objectif** : Créer des projets et programmer avec TIA Portal

#### Interface TIA Portal

```
┌───────────────────────────────────────────────────────────────┐
│  TIA Portal V17                                    [─][□][X]  │
├─────────────┬─────────────────────────────────────────────────┤
│ Projet      │  Blocs de programme                             │
│ ├─ PLC_1    │  ┌───────────────────────────────────────────┐  │
│ │  ├─ Prog  │  │  Main [OB1]                               │  │
│ │  │  ├─OB1 │  │                                           │  │
│ │  │  ├─FB1 │  │  --| |--| |------------------( )--        │  │
│ │  │  └─DB1 │  │   I0.0  I0.1                 Q0.0         │  │
│ │  ├─ Tech  │  │                                           │  │
│ │  └─ HMI   │  │  --| |------------------------( )--       │  │
│ └─ HMI_1    │  │   I0.2                        Q0.1         │  │
│             │  │                                           │  │
├─────────────┴─┴───────────────────────────────────────────────┤
│ Propriétés │ Info │ Diagnostic │ Références croisées          │
└───────────────────────────────────────────────────────────────┘
```

#### Langages de programmation S7

```
┌─────────────────────────────────────────────────────────────────┐
│  Exemple: Q0.0 = I0.0 AND I0.1                                  │
│                                                                  │
│  LAD:     ──| |────| |────────────────────────( )──             │
│             I0.0    I0.1                        Q0.0             │
│                                                                  │
│  FBD:     ┌─────┐                                               │
│           │ AND │                                               │
│     I0.0──┤     ├───Q0.0                                        │
│     I0.1──┤     │                                               │
│           └─────┘                                               │
│                                                                  │
│  SCL:     IF I0.0 AND I0.1 THEN                                 │
│              Q0.0 := TRUE;                                      │
│           END_IF;                                               │
└─────────────────────────────────────────────────────────────────┘
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Créer un projet TIA Portal | 15 min | 70 | Configuration matérielle et projet |
| 2 | Langages de programmation S7 | 18 min | 80 | LAD, FBD, SCL et GRAPH |

---

### Module 11 : Blocs de données S7-1500 📦

> **Objectif** : Maîtriser les blocs de données et la programmation structurée

#### Structure d'un bloc de données (DB)

```
┌─────────────────────────────────────────────────────────────┐
│  DB10 "Données_Moteur"                                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Nom            │ Type    │ Valeur   │ Commentaire      ││
│  │────────────────┼─────────┼──────────┼──────────────────││
│  │  Vitesse        │ REAL    │ 1500.0   │ Vitesse en RPM   ││
│  │  EnMarche       │ BOOL    │ FALSE    │ État de marche   ││
│  │  Defaut         │ BOOL    │ FALSE    │ Défaut présent   ││
│  │  TempsFonct     │ TIME    │ T#0s     │ Temps cumulé     ││
│  │  Parametres     │ STRUCT  │          │ Paramètres moteur││
│  │   ├─ VitesseMax │ REAL    │ 3000.0   │ Vitesse maximum  ││
│  │   └─ Accel      │ REAL    │ 10.0     │ Accélération     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

#### Types de blocs en S7

| Bloc | Description | Mémoire |
|------|-------------|---------|
| OB (Organisation Block) | Point d'entrée du programme | Non |
| FB (Function Block) | Bloc avec mémoire | DB d'instance |
| FC (Function) | Bloc sans mémoire | Non |
| DB (Data Block) | Stockage de données | Oui |

#### Programmation structurée

```
┌───────────────────────────────────────────────────────────┐
│                        OB1 (Main)                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │   CALL "FC_Lecture_Entrees"                         │  │
│  │                                                     │  │
│  │   CALL "FB_Moteur", "DB_Moteur1"                    │  │
│  │        En := I0.0                                   │  │
│  │        Vitesse := 1500                              │  │
│  │                                                     │  │
│  │   CALL "FB_Moteur", "DB_Moteur2"                    │  │
│  │        En := I0.1                                   │  │
│  │        Vitesse := 1200                              │  │
│  │                                                     │  │
│  │   CALL "FC_Ecriture_Sorties"                        │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Les blocs de données (DB) | 15 min | 70 | DB globaux et d'instance |
| 2 | Programmation structurée | 18 min | 80 | Organisation avec OB, FB, FC |

---

## Fonctionnalités

### Système d'utilisateurs
- Inscription et connexion sécurisées (JWT)
- Profil utilisateur personnalisable
- Suivi de progression individuel

### Système de gamification
- **Points XP** : Gagnez des points en complétant les leçons
- **Niveaux** : Progressez et débloquez de nouveaux modules
- **Série quotidienne** : Maintenez votre streak de connexion
- **Récompenses** : Badges et trophées à collectionner

### Classement
- Classement global des utilisateurs
- Filtres par période (semaine, mois, tout temps)
- Visualisation de votre rang

### Système de points XP

| Action | XP gagné |
|--------|----------|
| Compléter une leçon | 50-80 XP (selon score) |
| Badge débloqué | 25-100 XP bonus |
| Trophée obtenu | 150-200 XP bonus |

Le niveau est calculé selon la formule : XP total = 50 × niveau × (niveau + 1)

---

## Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
git clone https://github.com/orelmi/easyplc-school.git
cd easyplc-school
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la base de données**
```bash
npx prisma generate
npx prisma db push
```

4. **Peupler la base de données** (optionnel)
```bash
npm run db:seed
```

5. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend API : http://localhost:3001

## Compte démo

Un compte démo est créé automatiquement lors du seed :

| Champ | Valeur |
|-------|--------|
| Email | `demo@easyplc.fr` |
| Mot de passe | `demo123` |

Ce compte a déjà :
- 255 XP et niveau 2
- 3 leçons complétées
- 3 récompenses débloquées
- Une série de 3 jours

## Stack technique

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router v6
- Zustand (state management)

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite
- JWT (authentification)
- bcrypt (hachage des mots de passe)

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le frontend et le backend en mode développement |
| `npm run dev:client` | Lance uniquement le frontend |
| `npm run dev:server` | Lance uniquement le backend |
| `npm run build` | Build de production |
| `npm run db:push` | Applique le schéma Prisma à la DB |
| `npm run db:seed` | Peuple la DB avec les données initiales |
| `npm run db:studio` | Ouvre Prisma Studio (GUI DB) |

## Structure du projet

```
easyplc-school/
├── prisma/
│   ├── schema.prisma    # Schéma de la base de données
│   ├── seed.ts          # Script de peuplement + contenu pédagogique
│   └── translations.ts  # Traductions des leçons et quiz (EN/ES)
├── server/
│   ├── index.ts         # Point d'entrée du serveur
│   ├── middleware/
│   │   └── auth.ts      # Middleware d'authentification
│   └── routes/
│       ├── auth.ts      # Routes d'authentification
│       ├── users.ts     # Routes utilisateurs
│       ├── modules.ts   # Routes des modules
│       ├── lessons.ts   # Routes des leçons
│       ├── progress.ts  # Routes de progression
│       ├── rewards.ts   # Routes des récompenses
│       ├── leaderboard.ts # Routes du classement
│       └── cursus.ts    # Routes des parcours d'apprentissage
├── src/
│   ├── components/
│   │   ├── Layout.tsx   # Layout principal
│   │   └── LanguageSelector.tsx # Sélecteur de langue
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CursusSelect.tsx  # Sélection du parcours
│   │   ├── CursusDetail.tsx  # Détail d'un parcours
│   │   ├── Modules.tsx
│   │   ├── ModuleDetail.tsx
│   │   ├── Lesson.tsx
│   │   ├── Rewards.tsx
│   │   ├── Leaderboard.tsx
│   │   └── Profile.tsx
│   ├── store/
│   │   └── authStore.ts # Store Zustand
│   ├── lib/
│   │   └── api.ts       # Client API
│   ├── i18n/
│   │   ├── index.ts     # Configuration i18n
│   │   └── locales/     # Fichiers de traduction (fr, en, es)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## API Endpoints

### Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |
| GET | `/api/auth/me` | Utilisateur courant |

### Modules & Leçons
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/modules` | Liste des modules |
| GET | `/api/modules/:id` | Détail d'un module |
| GET | `/api/lessons/:id` | Contenu d'une leçon |
| POST | `/api/lessons/:id/submit` | Soumettre un quiz |

### Parcours (Cursus)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/cursus` | Liste des parcours avec progression |
| GET | `/api/cursus/:id` | Détail d'un parcours avec modules |

### Progression & Récompenses
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/progress` | Progression de l'utilisateur |
| GET | `/api/rewards` | Liste des récompenses |
| GET | `/api/leaderboard` | Classement des utilisateurs |

## Contribuer

Ce projet est open source et accueille les contributions de la communauté !

### Comment contribuer

1. **Fork** le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une **Pull Request**

### Types de contributions recherchées

- **Contenu pédagogique** : Nouveaux modules, leçons, exercices
- **Fonctionnalités** : Simulateur LADDER, éditeur GRAFCET, mode hors-ligne
- **Améliorations UI/UX** : Accessibilité, responsive design, animations
- **Documentation** : Tutoriels, guides d'utilisation, traductions
- **Tests** : Tests unitaires, tests d'intégration
- **Corrections** : Bugs, fautes d'orthographe, optimisations

### Idées de contributions

- [ ] Ajouter un simulateur d'automate interactif
- [ ] Créer un éditeur GRAFCET visuel
- [ ] Ajouter des animations pour les schémas LADDER
- [ ] Implémenter un mode examen
- [x] ~~Ajouter le support multi-langues (EN, ES, DE)~~ ✅ FR, EN, ES disponibles
- [x] ~~Ajouter des parcours d'apprentissage~~ ✅ Automatisme et CNC
- [ ] Créer des exercices de programmation pratiques
- [ ] Ajouter un simulateur G-Code interactif

### Enrichir le contenu pédagogique

Le contenu des leçons est défini dans `prisma/seed.ts`. Pour ajouter du contenu :

1. Ouvrez le fichier `prisma/seed.ts`
2. Ajoutez vos leçons en suivant la structure existante
3. Relancez `npm run db:seed` pour appliquer les changements

## Licence

MIT - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Développé avec passion pour la formation en automatisme industriel.
