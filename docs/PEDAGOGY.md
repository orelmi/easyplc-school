# Contenu Pédagogique

> Documentation complète du contenu éducatif d'EasyPLC School

**Langues :** Français | [English](PEDAGOGY.en.md) | [Español](PEDAGOGY.es.md)

## Table des matières

- [Public cible](#public-cible)
- [Parcours d'apprentissage](#parcours-dapprentissage)
- [Types d'exercices](#types-dexercices)
- [Modules fondamentaux](#modules-fondamentaux)
- [Modules Automatisme](#modules-automatisme)
- [Modules CNC](#modules-cnc)
- [Modules Siemens](#modules-siemens)
- [Modules VFD et Positionnement](#modules-vfd-et-positionnement)
- [Simulateurs interactifs](#simulateurs-interactifs)
- [Système de gamification](#système-de-gamification)

---

## Public cible

EasyPLC School s'adresse à :

- **Étudiants** en génie électrique, maintenance industrielle ou automatisme
- **Techniciens** souhaitant se reconvertir vers l'automatisme
- **Professionnels** cherchant à consolider leurs bases
- **Formateurs** recherchant une plateforme pédagogique complète

---

## Parcours d'apprentissage

EasyPLC School propose quatre parcours de spécialisation avec un socle commun de modules fondamentaux :

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         PARCOURS D'APPRENTISSAGE                                                     │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                                      │
│  🏭 AUTOMATISME INDUSTRIEL    🔧 COMMANDE NUMÉRIQUE     🔷 AUTOMATISME SIEMENS    ⚡ VFD ET POSITIONNEMENT          │
│  ━━━━━━━━━━━━━━━━━━━━━━━     ━━━━━━━━━━━━━━━━━━━━      ━━━━━━━━━━━━━━━━━━━━━    ━━━━━━━━━━━━━━━━━━━━━━━           │
│                                                                                                                      │
│  ├── Introduction *           ├── Introduction *        ├── Introduction *        ├── Introduction *                │
│  ├── Logique combinatoire *   ├── Logique combinatoire* ├── Logique combinatoire* ├── Logique combinatoire *        │
│  ├── Capteurs/actionneurs *   ├── Capteurs/actionneurs* ├── Le langage LADDER     ├── Capteurs/actionneurs *        │
│  ├── Le langage LADDER        ├── Introduction CNC      ├── Introduction S7-1500  ├── Introduction aux VFD          │
│  └── GRAFCET                  ├── Programmation G-Code  ├── TIA Portal            ├── Configuration VFD             │
│                               └── Axes et interpolation └── Blocs de données S7   ├── Communication VFD             │
│                                                                                   ├── Intro Positionnement          │
│                                                                                   ├── Moteurs pas à pas/servo       │
│                                                                                   └── Programmation mouvement       │
│                                                                                                                      │
│  * Modules fondamentaux partagés entre les parcours                                                                 │
│                                                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Parcours Automatisme industriel 🏭

Ce parcours couvre les bases de l'automatisation industrielle avec les automates programmables (PLC) :
- 5 modules progressifs (35 leçons)
- Focus sur le LADDER et le GRAFCET
- Quiz de validation pour chaque leçon

### Parcours Commande numérique (CNC) 🔧

Ce parcours se spécialise dans la programmation des machines à commande numérique :
- 6 modules (3 fondamentaux + 3 spécialisés)
- Apprentissage du G-Code
- Maîtrise des systèmes d'axes

### Parcours Automatisme Siemens 🔷

Ce parcours est dédié aux automates Siemens S7-1500 et à l'environnement TIA Portal :
- 6 modules (3 fondamentaux + 3 spécialisés Siemens)
- Programmation LAD, FBD, SCL
- Maîtrise des blocs de données (DB)

### Parcours VFD et Positionnement ⚡

Ce parcours se spécialise dans les variateurs de vitesse et le contrôle de mouvement :
- 9 modules (3 fondamentaux + 6 spécialisés)
- 36 leçons avec 180 quiz
- Variateurs de vitesse (VFD) : principes, configuration, communication
- Positionnement : moteurs pas à pas, servomoteurs, programmation PLCopen

---

## Types d'exercices

EasyPLC School propose **10 types d'exercices interactifs** pour renforcer l'apprentissage :

| Type | Description | Utilisation |
|------|-------------|-------------|
| `fill_blank` | Remplir les blancs dans un texte technique | Paramètres, calculs, formules |
| `matching` | Associer des éléments deux à deux | Symboles/fonctions, termes/définitions |
| `ordering` | Remettre des étapes dans l'ordre | Procédures, séquences d'opérations |
| `drag_drop` | Glisser-déposer dans des zones | Classification, schémas à compléter |
| `wiring` | Réaliser un câblage électrique | Connexions capteurs, VFD, moteurs |
| `code_input` | Saisir du code (G-Code, SCL) | Programmation CNC, automates |
| `timing` | Créer des chronogrammes | Séquences temporelles, signaux |
| `ladder_builder` | Construire des programmes LADDER | Circuits logiques, automatismes |
| `plc_simulator` | Simuler un programme PLC complet | Validation de programmes |

---

## Modules fondamentaux

Ces modules constituent le socle commun des parcours d'apprentissage.

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

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Qu'est-ce qu'un automate programmable ? | 10 min | 50 |
| 2 | Les entrées et sorties (E/S) | 12 min | 60 |
| 3 | Le cycle automate | 15 min | 70 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Introduction aux PLC | `fill_blank` | Débutant |
| Composants d'un automate | `matching` | Débutant |
| Cycle automate | `ordering` | Intermédiaire |

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

| A | B | A ET B | A OU B |
|:-:|:-:|:------:|:------:|
| 0 | 0 | **0**  | **0**  |
| 0 | 1 | **0**  | **1**  |
| 1 | 0 | **0**  | **1**  |
| 1 | 1 | **1**  | **1**  |

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | La porte ET (AND) | 12 min | 60 |
| 2 | La porte OU (OR) | 12 min | 60 |
| 3 | La porte NON (NOT) | 10 min | 50 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Tables de vérité | `fill_blank` | Débutant |
| Symboles logiques | `matching` | Débutant |

---

### Module 3 : Le langage LADDER 🪜

> **Objectif** : Lire et écrire des programmes en langage LADDER

#### Principe du LADDER

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

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Introduction au langage LADDER | 15 min | 70 |
| 2 | Contacts et bobines | 18 min | 80 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Circuit marche/arrêt | `ladder_builder` | Débutant |
| Symboles LADDER | `matching` | Débutant |
| Équations logiques | `fill_blank` | Intermédiaire |
| Séquence de démarrage | `ordering` | Intermédiaire |

---

### Module 4 : Capteurs et actionneurs 📡

> **Objectif** : Connecter un automate au monde physique

#### Types de capteurs

```
CAPTEURS MÉCANIQUES                    CAPTEURS DE PROXIMITÉ
━━━━━━━━━━━━━━━━━━━                    ━━━━━━━━━━━━━━━━━━━━━

┌─────────────────┐                    ┌─────────────────┐
│  FIN DE COURSE  │                    │    INDUCTIF     │
│    ┌────┐       │                    │   ┌───────┐     │  Détecte
│  ──┤    ├──     │                    │   │  ○    │◀────│  les MÉTAUX
│    └────┘       │                    │   └───────┘     │
└─────────────────┘                    └─────────────────┘

┌─────────────────┐                    ┌─────────────────┐
│ BOUTON POUSSOIR │                    │   CAPACITIF     │
│      ┌─┐        │                    │   ┌───────┐     │  Détecte
│    ──┤ ├──      │                    │   │  ○    │◀────│  TOUT matériau
│      └─┘        │                    │   └───────┘     │
└─────────────────┘                    └─────────────────┘
```

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Les capteurs TOR | 15 min | 70 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Types de capteurs | `matching` | Débutant |
| Câblage capteur 3 fils | `wiring` | Intermédiaire |
| Caractéristiques capteurs | `fill_blank` | Intermédiaire |

---

## Modules Automatisme

### Module 5 : GRAFCET 📊

> **Objectif** : Modéliser et programmer des systèmes séquentiels

#### Structure du GRAFCET

```
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

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Introduction au GRAFCET | 20 min | 80 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Éléments du GRAFCET | `matching` | Débutant |
| Équations GRAFCET | `fill_blank` | Intermédiaire |
| Actions et réceptivités | `drag_drop` | Intermédiaire |
| Séquence GRAFCET | `ordering` | Avancé |

---

## Modules CNC

### Module 6 : Introduction à la CNC 🔧

> **Objectif** : Découvrir les machines à commande numérique

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Qu'est-ce qu'une machine CNC ? | 12 min | 60 |
| 2 | Types de machines CNC | 15 min | 70 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Composants CNC | `matching` | Débutant |
| Types de machines | `drag_drop` | Débutant |
| Caractéristiques CNC | `fill_blank` | Intermédiaire |

---

### Module 7 : Programmation G-Code 📝

> **Objectif** : Maîtriser le langage de programmation des machines CNC

#### Codes G essentiels

| Code | Fonction | Exemple |
|------|----------|---------|
| G00 | Déplacement rapide | `G00 X50 Y30` |
| G01 | Interpolation linéaire | `G01 X100 F200` |
| G02 | Arc horaire | `G02 X50 Y50 R25` |
| G03 | Arc anti-horaire | `G03 X50 Y50 R25` |
| G90 | Mode absolu | Coordonnées depuis l'origine |
| G91 | Mode relatif | Coordonnées depuis position actuelle |

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Structure d'un programme G-Code | 15 min | 70 |
| 2 | Codes G et M essentiels | 18 min | 80 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Programme carré | `code_input` | Débutant |
| Codes G et M | `matching` | Débutant |
| Coordonnées | `fill_blank` | Intermédiaire |

---

### Module 8 : Axes et interpolation 📐

> **Objectif** : Comprendre les systèmes de coordonnées et les mouvements

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Système de coordonnées | 12 min | 60 |
| 2 | Interpolation linéaire et circulaire | 18 min | 80 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Programme arc de cercle | `code_input` | Intermédiaire |
| Types d'interpolation | `matching` | Débutant |
| Calcul de coordonnées | `fill_blank` | Avancé |

---

## Modules Siemens

### Module 9 : Introduction au Siemens S7-1500 🔷

> **Objectif** : Découvrir l'automate Siemens S7-1500 et TIA Portal

#### Gamme de CPUs S7-1500

| CPU | Mémoire | Performance |
|-----|---------|-------------|
| 1511 | 150 KB | Entrée de gamme |
| 1513 | 300 KB | Standard |
| 1515 | 500 KB | Avancé |
| 1517 | 2 MB | Haute performance |
| 1518 | 4 MB | Maximum |

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Présentation du S7-1500 | 15 min | 70 |
| 2 | L'environnement TIA Portal | 18 min | 80 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Gamme S7-1500 | `matching` | Débutant |
| Adressage E/S | `fill_blank` | Intermédiaire |
| Types de modules | `drag_drop` | Intermédiaire |

---

### Module 10 : Programmation TIA Portal 💻

> **Objectif** : Créer des projets et programmer avec TIA Portal

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

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Créer un projet TIA Portal | 15 min | 70 |
| 2 | Langages de programmation S7 | 18 min | 80 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Création projet | `ordering` | Débutant |
| Types de blocs | `matching` | Débutant |
| Programme LADDER TIA | `ladder_builder` | Intermédiaire |

---

### Module 11 : Blocs de données S7-1500 📦

> **Objectif** : Maîtriser les blocs de données et la programmation structurée

#### Types de blocs en S7

| Bloc | Description | Mémoire |
|------|-------------|---------|
| OB | Point d'entrée du programme | Non |
| FB | Bloc avec mémoire | DB d'instance |
| FC | Bloc sans mémoire | Non |
| DB | Stockage de données | Oui |

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Les blocs de données (DB) | 15 min | 70 |
| 2 | Programmation structurée | 18 min | 80 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Types de DB | `matching` | Débutant |
| Création DB global | `fill_blank` | Intermédiaire |
| DB d'instance FB | `drag_drop` | Avancé |

---

## Modules VFD et Positionnement

### Module 12 : Introduction aux variateurs ⚡

> **Objectif** : Comprendre les principes des variateurs de fréquence

#### Principe de fonctionnement

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    VARIATEUR DE VITESSE (VFD)                            │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌─────────┐  │  │
│  │  │           │    │           │    │           │    │         │  │  │
│  │  │REDRESSEUR │───▶│ BUS DC    │───▶│ ONDULEUR  │───▶│ MOTEUR  │  │  │
│  │  │   (AC→DC) │    │ (Filtrage)│    │  (DC→AC)  │    │   AC    │  │  │
│  │  └───────────┘    └───────────┘    └───────────┘    └─────────┘  │  │
│  │       ▲                                   │                       │  │
│  │       │                              ┌────┴────┐                  │  │
│  │  Réseau AC                           │ Contrôle│                  │  │
│  │  (50/60 Hz)                          │   PWM   │                  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Qu'est-ce qu'un variateur de vitesse ? | 12 min | 60 |
| 2 | Types de moteurs et variateurs | 15 min | 70 |
| 3 | Schémas de câblage | 15 min | 70 |
| 4 | Protections et sécurité | 12 min | 60 |
| 5 | Économie d'énergie | 12 min | 60 |
| 6 | Marques et modèles courants | 10 min | 50 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Configuration basique VFD | `fill_blank` | Débutant |
| Lecture plaque signalétique | `matching` | Débutant |
| Schéma de câblage VFD | `wiring` | Intermédiaire |

---

### Module 13 : Configuration des variateurs 🔧

> **Objectif** : Maîtriser le paramétrage des variateurs

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Paramètres moteur | 15 min | 70 |
| 2 | Rampes et limites | 15 min | 70 |
| 3 | Modes de commande | 18 min | 80 |
| 4 | Régulation PID intégrée | 18 min | 80 |
| 5 | Gestion des défauts | 15 min | 70 |
| 6 | Sauvegarde et restauration | 12 min | 60 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Paramétrage moteur | `fill_blank` | Intermédiaire |
| Configuration des rampes | `matching` | Débutant |
| Modes de contrôle VFD | `drag_drop` | Intermédiaire |

---

### Module 14 : Communication des variateurs 🌐

> **Objectif** : Intégrer les variateurs dans un système automatisé

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Protocoles de communication | 15 min | 70 |
| 2 | Communication Modbus | 18 min | 80 |
| 3 | Intégration automate | 18 min | 80 |
| 4 | Diagnostic et monitoring | 15 min | 70 |
| 5 | Dépannage | 15 min | 70 |
| 6 | Maintenance préventive | 12 min | 60 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Configuration Modbus RTU | `fill_blank` | Intermédiaire |
| Registres Modbus | `matching` | Avancé |
| Trame Modbus RTU | `drag_drop` | Avancé |

---

### Module 15 : Introduction au positionnement 📐

> **Objectif** : Découvrir les fondamentaux du contrôle de mouvement

#### Boucles de régulation en cascade

```
   Consigne    ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
   Position ──▶│Position│──▶│Vitesse │──▶│Courant │──▶│ MOTEUR │
               │  PID   │   │  PID   │   │  PID   │   │        │
               └────────┘   └────────┘   └────────┘   └───┬────┘
                    ▲            ▲            ▲           │
                    │            │            │           │
               ┌────┴────┐  ┌────┴────┐  ┌───┴────┐     │
               │ Codeur  │  │ Codeur  │  │Capteur │◀────┘
               │Position │  │Vitesse  │  │Courant │
               └─────────┘  └─────────┘  └────────┘
```

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Principes du contrôle de mouvement | 15 min | 70 |
| 2 | Notions de mécanique | 15 min | 70 |
| 3 | Codeurs et capteurs de position | 18 min | 80 |
| 4 | Boucles de régulation | 18 min | 80 |
| 5 | Prise d'origine (homing) | 15 min | 70 |
| 6 | Limites et sécurités | 15 min | 70 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Calcul résolution encodeur | `fill_blank` | Intermédiaire |
| Profil trapézoïdal | `fill_blank` | Avancé |
| Types de boucles de contrôle | `matching` | Intermédiaire |

---

### Module 16 : Moteurs pas à pas et servomoteurs ⚙️

> **Objectif** : Choisir et dimensionner un système d'entraînement

#### Comparaison des technologies

| Caractéristique | Moteur pas à pas | Servomoteur |
|-----------------|------------------|-------------|
| Boucle de contrôle | Ouverte | Fermée |
| Couple à basse vitesse | Élevé | Constant |
| Dynamique | Moyenne | Haute |
| Coût | Économique | Plus élevé |
| Application type | Positionnement simple | Haute performance |

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Moteurs pas à pas | 18 min | 80 |
| 2 | Servomoteurs synchrones | 18 min | 80 |
| 3 | Comparaison et choix | 15 min | 70 |
| 4 | Dimensionnement moteur | 20 min | 90 |
| 5 | Drivers et servo-variateurs | 18 min | 80 |
| 6 | Moteurs linéaires | 15 min | 70 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Choix du type de moteur | `matching` | Débutant |
| Dimensionnement moteur | `fill_blank` | Avancé |
| Caractéristiques des moteurs | `drag_drop` | Intermédiaire |

---

### Module 17 : Programmation de mouvement 🎯

> **Objectif** : Programmer des mouvements avec les blocs PLCopen

#### Blocs fonction PLCopen Motion

| Bloc | Fonction |
|------|----------|
| MC_Power | Active/désactive l'axe |
| MC_Home | Prise d'origine |
| MC_MoveAbsolute | Déplacement vers position absolue |
| MC_MoveRelative | Déplacement d'une distance relative |
| MC_MoveVelocity | Mouvement à vitesse constante |
| MC_Stop | Arrêt du mouvement |
| MC_GearIn | Couplage électronique |

#### Contenu du module

| # | Leçon | Durée | XP |
|---|-------|-------|-----|
| 1 | Profils de mouvement | 18 min | 80 |
| 2 | Mouvements absolus et relatifs | 15 min | 70 |
| 3 | Synchronisation d'axes | 20 min | 90 |
| 4 | Interpolation multi-axes | 20 min | 90 |
| 5 | Blocs fonction PLCopen | 18 min | 80 |
| 6 | Diagnostic et optimisation | 15 min | 70 |

#### Exercices

| Exercice | Type | Difficulté |
|----------|------|------------|
| Synchronisation d'axes | `fill_blank` | Avancé |
| Came électronique | `ordering` | Avancé |
| Profil de came | `fill_blank` | Avancé |
| Blocs motion PLCopen | `matching` | Intermédiaire |

---

## Simulateurs interactifs

### Simulateur PLC / LADDER ⚡

Un simulateur d'automate programmable complet avec visualisation LADDER en temps réel.

**Fonctionnalités :**
- Programmes exemples : Marche/Arrêt, Feux de circulation, Séquenceur
- Mode impulsionnel/interrupteur pour chaque entrée
- Visualisation du flux de puissance en temps réel
- Temporisateurs avec barre de progression
- Différents types de sorties : lampes, moteurs, vannes

### Éditeur GRAFCET 📐

Un éditeur visuel pour créer et simuler des diagrammes GRAFCET.

**Fonctionnalités :**
- Création d'étapes et de transitions par glisser-déposer
- Liaison des éléments (étape → transition → étape)
- Simulation en temps réel avec visualisation des étapes actives
- Édition des conditions de transition
- Exemples pré-chargés

### Simulateur G-Code / CNC 🔧

Un simulateur de programmation CNC avec visualisation 2D et 3D.

**Fonctionnalités :**
- Éditeur de code avec coloration syntaxique
- Visualisation 2D (dessus, face, côté) et 3D isométrique
- Animation de la trajectoire d'outil
- Statistiques : distance totale, temps estimé
- Contrôle de vitesse d'animation

---

## Système de gamification

### Points XP

| Action | XP gagné |
|--------|----------|
| Compléter une leçon | 50-80 XP (selon score) |
| Compléter un exercice | 75-250 XP (selon difficulté) |
| Badge débloqué | 25-100 XP bonus |
| Trophée obtenu | 150-200 XP bonus |

### Niveaux

Le niveau est calculé selon la formule : XP total = 50 × niveau × (niveau + 1)

| Niveau | XP requis |
|--------|-----------|
| 1 | 0 |
| 2 | 100 |
| 3 | 300 |
| 4 | 600 |
| 5 | 1000 |
| 10 | 5500 |

### Récompenses

- **Badges** : Débloqués en complétant des modules
- **Trophées** : Débloqués pour des accomplissements spéciaux
- **Série quotidienne** : Bonus pour les connexions consécutives
