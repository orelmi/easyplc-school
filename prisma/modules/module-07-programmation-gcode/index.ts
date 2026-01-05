import type { ModuleData } from '../types.js'

export const module07Data: ModuleData = {
  // Module info
  moduleOrder: 7,
  moduleTitle: "Programmation G-Code",
  moduleDescription: "Apprenez a programmer les machines CNC avec le G-Code",
  moduleTranslations: {
    en: {
      title: "G-Code Programming",
      description: "Learn to program CNC machines with G-Code"
    },
    es: {
      title: "Programacion G-Code",
      description: "Aprenda a programar maquinas CNC con codigo G"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Structure d'un programme G-Code",
      description: "Apprenez comment est organise un programme CNC",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Structure d'un programme G-Code\n\nUn programme G-code est une serie d'instructions qui indiquent a la machine CNC ce qu'elle doit faire."
          },
          {
            type: "text",
            content: "## Lignes et blocs\n\nChaque ligne d'un programme s'appelle un **bloc**. Un bloc peut contenir :\n\n- Un numero de ligne (N)\n- Des codes preparatoires (G)\n- Des coordonnees (X, Y, Z)\n- Une vitesse d'avance (F)\n- Une vitesse de broche (S)\n- Un outil (T)\n- Une fonction auxiliaire (M)"
          },
          {
            type: "text",
            content: "## Exemple de programme\n\n```gcode\nN10 G21 G90       ; Mode metrique, absolu\nN20 G0 X0 Y0 Z10  ; Positionnement rapide\nN30 M3 S1500      ; Broche ON, 1500 tr/min\nN40 G1 Z-5 F100   ; Plongee a 100 mm/min\nN50 G1 X50 F200   ; Deplacement lineaire\nN60 G0 Z10        ; Remontee\nN70 M5            ; Broche OFF\nN80 M30           ; Fin du programme\n```"
          },
          {
            type: "info",
            content: "Les commentaires sont generalement indiques par un point-virgule (;) ou des parentheses."
          }
        ]
      })
    },
    {
      title: "Codes G et M essentiels",
      description: "Maitrisez les codes fondamentaux pour la programmation CNC",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Codes G et M essentiels\n\nLes codes G (preparatoires) et codes M (auxiliaires) sont la base de la programmation CNC."
          },
          {
            type: "text",
            content: "## Principaux codes G\n\n| Code | Fonction |\n|------|----------|\n| G0 | Positionnement rapide |\n| G1 | Interpolation lineaire |\n| G2 | Interpolation circulaire horaire |\n| G3 | Interpolation circulaire anti-horaire |\n| G17 | Selection plan XY |\n| G20 | Mode pouces |\n| G21 | Mode metrique |\n| G28 | Retour a l'origine |\n| G90 | Mode absolu |\n| G91 | Mode incremental |"
          },
          {
            type: "text",
            content: "## Principaux codes M\n\n| Code | Fonction |\n|------|----------|\n| M0 | Arret programme |\n| M3 | Broche ON (horaire) |\n| M4 | Broche ON (anti-horaire) |\n| M5 | Broche OFF |\n| M6 | Changement d'outil |\n| M8 | Arrosage ON |\n| M9 | Arrosage OFF |\n| M30 | Fin du programme |"
          },
          {
            type: "warning",
            content: "Les codes peuvent varier legerement selon les fabricants de machines. Verifiez toujours la documentation specifique."
          }
        ]
      })
    },
    {
      title: "Cycles preprogrammes",
      description: "Utiliser les cycles de percage, taraudage et poches",
      order: 3,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Cycles preprogrammes (Canned Cycles)\n\nLes cycles preprogrammes simplifient la programmation d'operations repetitives comme le percage."
          },
          {
            type: "text",
            content: "## Cycles de percage\n\n| Code | Cycle | Description |\n|------|-------|-------------|\n| G81 | Percage simple | Plongee puis remontee rapide |\n| G82 | Percage avec temporisation | Pause au fond du trou |\n| G83 | Percage avec debourrage | Evacuation des copeaux |\n| G84 | Taraudage | Filetage interieur |\n| G85 | Alesage | Finition de trous |"
          },
          {
            type: "text",
            content: "## Exemple G83 (Debourrage)\n\n```gcode\nG83 X50 Y30 Z-25 R2 Q5 F100\n```\n\n- **X, Y** : Position du trou\n- **Z** : Profondeur finale\n- **R** : Plan de retrait\n- **Q** : Profondeur de chaque passe\n- **F** : Vitesse d'avance"
          },
          {
            type: "diagram",
            title: "Cycle de debourrage G83",
            content: `+---------------------------------------------+
|          CYCLE G83 - DEBOURRAGE             |
+---------------------------------------------+
|                                             |
|    R=2 ---------------------- Plan retrait  |
|         |   |   |   |                       |
|    Z=0  |   |   |   |  Surface piece        |
|         v   |   |   |                       |
|    -5   o   |   |   |  Passe 1 (Q=5)        |
|             v   |   |                       |
|    -10      o   |   |  Passe 2              |
|                 v   |                       |
|    -15          o   |  Passe 3              |
|                     v                       |
|    -25              o  Profondeur finale    |
|                                             |
|    Remontee rapide entre chaque passe       |
|                                             |
+---------------------------------------------+`
          },
          {
            type: "info",
            content: "G80 annule tous les cycles actifs. Toujours terminer une serie de percages par G80."
          }
        ]
      })
    },
    {
      title: "Sous-programmes et repetitions",
      description: "Organiser le code avec des sous-programmes et boucles",
      order: 4,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sous-programmes et repetitions\n\nLes sous-programmes permettent de reutiliser du code et de simplifier les programmes complexes."
          },
          {
            type: "text",
            content: "## Appel de sous-programme\n\n```gcode\n; Programme principal\nN10 G0 X0 Y0\nN20 M98 P1000 L4  ; Appel du sous-prog 1000, 4 fois\nN30 M30\n\n; Sous-programme 1000\nO1000\nN100 G1 X10 F100\nN110 G1 Y10\nN120 G1 X0\nN130 G1 Y0\nN140 M99  ; Retour au programme principal\n```"
          },
          {
            type: "text",
            content: "## Syntaxe selon les controleurs\n\n| Controleur | Appel | Definition | Retour |\n|------------|-------|------------|--------|\n| Fanuc | M98 P | O | M99 |\n| Siemens | CALL | PROC | RET |\n| Heidenhain | CALL LBL | LBL | LBL 0 |"
          },
          {
            type: "text",
            content: "## Avantages\n\n- **Reduction du code** : Eviter les repetitions\n- **Lisibilite** : Programme principal simplifie\n- **Maintenance** : Modifier a un seul endroit\n- **Modularite** : Reutiliser entre programmes"
          },
          {
            type: "warning",
            content: "Attention a la profondeur d'imbrication ! Trop de sous-programmes appelant d'autres sous-programmes peut causer des erreurs."
          }
        ]
      })
    },
    {
      title: "Compensation d'outil",
      description: "Comprendre et utiliser la compensation de rayon d'outil",
      order: 5,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Compensation d'outil\n\nLa compensation d'outil permet de programmer le contour de la piece plutot que la trajectoire du centre de l'outil."
          },
          {
            type: "diagram",
            title: "Compensation de rayon",
            content: `+---------------------------------------------------------+
|              COMPENSATION DE RAYON                       |
+----------------------------------------------------------+
|                                                          |
|     Sans compensation        Avec compensation G41       |
|                                                          |
|     +---------------+       +---------------+            |
|     |               |       |               |            |
|     |    ---o---    |       |    ---------  | <- Contour |
|     |    Centre     |       |  o            |   piece    |
|     |    outil      |       |  | Outil      |            |
|     |               |       |  | decale     |            |
|     +---------------+       +---------------+            |
|                                                          |
|     Erreur = rayon outil    Contour exact                |
|                                                          |
+----------------------------------------------------------+`
          },
          {
            type: "text",
            content: "## Codes de compensation\n\n| Code | Fonction |\n|------|----------|\n| G40 | Annulation de compensation |\n| G41 | Compensation a gauche (outil a gauche du contour) |\n| G42 | Compensation a droite (outil a droite du contour) |\n| G43 | Compensation de longueur d'outil (Z) |"
          },
          {
            type: "text",
            content: "## Exemple\n\n```gcode\nG0 X-10 Y0      ; Position d'approche\nG41 D1          ; Activer compensation, outil D1\nG1 X0 Y0 F200   ; Entree en matiere\nG1 X100         ; Usinage du contour\nG1 Y50\nG1 X0\nG1 Y0\nG40             ; Annuler compensation\nG0 X-10         ; Degagement\n```"
          },
          {
            type: "warning",
            content: "Toujours activer/desactiver la compensation sur un mouvement lineaire (G1), jamais sur un arc (G2/G3) !"
          }
        ]
      })
    },
    {
      title: "Exemple complet : usinage d'une poche",
      description: "Programmation pas a pas d'une poche rectangulaire",
      order: 6,
      xpReward: 90,
      duration: 22,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Exemple : Usinage d'une poche rectangulaire\n\nCet exemple montre la programmation complete d'une poche 80x50 mm, profondeur 10 mm."
          },
          {
            type: "text",
            content: "## Donnees de la piece\n\n- Poche : 80 x 50 mm\n- Profondeur : 10 mm\n- Coin inferieur gauche : X10, Y10\n- Outil : Fraise O10 mm\n- Materiau : Aluminium"
          },
          {
            type: "text",
            content: "## Programme complet\n\n```gcode\n%\nO0001 (POCHE RECTANGULAIRE)\n(Outil: Fraise D10)\n(Materiau: Aluminium)\n\nN10 G21 G90 G40     (Metrique, absolu, sans comp.)\nN20 G54             (Origine piece)\nN30 T1 M6           (Outil 1)\nN40 S3000 M3        (Broche 3000 tr/min)\nN50 G43 H1 Z50      (Comp. longueur, securite)\n\n(Passe 1: Z-3)\nN60 G0 X15 Y15      (Position depart)\nN70 G0 Z2           (Approche rapide)\nN80 G1 Z-3 F100     (Plongee)\nN90 G1 X85 F500     (Usinage)\nN100 G1 Y55\nN110 G1 X15\nN120 G1 Y15\n\n(Passe 2: Z-6)\nN130 G1 Z-6 F100\nN140 G1 X85 F500\nN150 G1 Y55\nN160 G1 X15\nN170 G1 Y15\n\n(Passe 3: Z-10)\nN180 G1 Z-10 F100\nN190 G1 X85 F500\nN200 G1 Y55\nN210 G1 X15\nN220 G1 Y15\n\n(Fin)\nN230 G0 Z50         (Degagement)\nN240 M5             (Broche OFF)\nN250 G28            (Retour origine)\nN260 M30            (Fin programme)\n%\n```"
          },
          {
            type: "info",
            content: "En production, on utiliserait un cycle de poche automatique (G73 sur certains controleurs) plutot que cette programmation manuelle."
          }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Structure d'un programme G-Code": {
        title: "Structure of a G-Code Program",
        description: "Learn how a CNC program is organized",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# G-Code Program Structure\n\nA G-code program is a series of instructions that tell the CNC machine what to do."
            },
            {
              type: "text",
              content: "## Lines and Blocks\n\nEach line of a program is called a **block**. A block can contain:\n\n- A line number (N)\n- Preparatory codes (G)\n- Coordinates (X, Y, Z)\n- Feed rate (F)\n- Spindle speed (S)\n- Tool (T)\n- Miscellaneous function (M)"
            },
            {
              type: "text",
              content: "## Example Program\n\n```gcode\nN10 G21 G90       ; Metric mode, absolute\nN20 G0 X0 Y0 Z10  ; Rapid positioning\nN30 M3 S1500      ; Spindle ON, 1500 RPM\nN40 G1 Z-5 F100   ; Plunge at 100 mm/min\nN50 G1 X50 F200   ; Linear move\nN60 G0 Z10        ; Retract\nN70 M5            ; Spindle OFF\nN80 M30           ; End of program\n```"
            },
            {
              type: "info",
              content: "Comments are usually indicated by a semicolon (;) or parentheses."
            }
          ]
        })
      },
      "Codes G et M essentiels": {
        title: "Essential G and M Codes",
        description: "Master the fundamental codes for CNC programming",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Essential G and M Codes\n\nG codes (Preparatory) and M codes (Miscellaneous) are the basis of CNC programming."
            },
            {
              type: "text",
              content: "## Main G Codes\n\n| Code | Function |\n|------|----------|\n| G0 | Rapid positioning |\n| G1 | Linear interpolation |\n| G2 | Circular interpolation CW |\n| G3 | Circular interpolation CCW |\n| G17 | XY plane selection |\n| G20 | Inch mode |\n| G21 | Metric mode |\n| G28 | Return to home |\n| G90 | Absolute mode |\n| G91 | Incremental mode |"
            },
            {
              type: "text",
              content: "## Main M Codes\n\n| Code | Function |\n|------|----------|\n| M0 | Program stop |\n| M3 | Spindle ON (CW) |\n| M4 | Spindle ON (CCW) |\n| M5 | Spindle OFF |\n| M6 | Tool change |\n| M8 | Coolant ON |\n| M9 | Coolant OFF |\n| M30 | End of program |"
            },
            {
              type: "warning",
              content: "Codes may vary slightly between machine manufacturers. Always check the specific documentation."
            }
          ]
        })
      },
      "Cycles preprogrammes": {
        title: "Canned Cycles",
        description: "Use drilling, tapping and pocket cycles",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Canned Cycles\n\nCanned cycles simplify programming of repetitive operations like drilling."
            },
            {
              type: "text",
              content: "## Drilling Cycles\n\n| Code | Cycle | Description |\n|------|-------|-------------|\n| G81 | Simple drilling | Plunge then rapid retract |\n| G82 | Drilling with dwell | Pause at bottom of hole |\n| G83 | Peck drilling | Chip evacuation |\n| G84 | Tapping | Internal threading |\n| G85 | Boring | Hole finishing |"
            },
            {
              type: "text",
              content: "## G83 Example (Peck Drilling)\n\n```gcode\nG83 X50 Y30 Z-25 R2 Q5 F100\n```\n\n- **X, Y** : Hole position\n- **Z** : Final depth\n- **R** : Retract plane\n- **Q** : Depth of each peck\n- **F** : Feed rate"
            },
            {
              type: "diagram",
              title: "G83 Peck Drilling Cycle",
              content: `+---------------------------------------------+
|          G83 CYCLE - PECK DRILLING          |
+---------------------------------------------+
|                                             |
|    R=2 ---------------------- Retract plane |
|         |   |   |   |                       |
|    Z=0  |   |   |   |  Part surface         |
|         v   |   |   |                       |
|    -5   o   |   |   |  Peck 1 (Q=5)         |
|             v   |   |                       |
|    -10      o   |   |  Peck 2               |
|                 v   |                       |
|    -15          o   |  Peck 3               |
|                     v                       |
|    -25              o  Final depth          |
|                                             |
|    Rapid retract between each peck          |
|                                             |
+---------------------------------------------+`
            },
            {
              type: "info",
              content: "G80 cancels all active cycles. Always end a series of drilling operations with G80."
            }
          ]
        })
      },
      "Sous-programmes et repetitions": {
        title: "Subprograms and Loops",
        description: "Organize code with subprograms and loops",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Subprograms and Loops\n\nSubprograms allow code reuse and simplify complex programs."
            },
            {
              type: "text",
              content: "## Subprogram Call\n\n```gcode\n; Main program\nN10 G0 X0 Y0\nN20 M98 P1000 L4  ; Call subprogram 1000, 4 times\nN30 M30\n\n; Subprogram 1000\nO1000\nN100 G1 X10 F100\nN110 G1 Y10\nN120 G1 X0\nN130 G1 Y0\nN140 M99  ; Return to main program\n```"
            },
            {
              type: "text",
              content: "## Syntax by Controller\n\n| Controller | Call | Definition | Return |\n|------------|------|------------|--------|\n| Fanuc | M98 P | O | M99 |\n| Siemens | CALL | PROC | RET |\n| Heidenhain | CALL LBL | LBL | LBL 0 |"
            },
            {
              type: "text",
              content: "## Advantages\n\n- **Code reduction** : Avoid repetitions\n- **Readability** : Simplified main program\n- **Maintenance** : Modify in one place\n- **Modularity** : Reuse between programs"
            },
            {
              type: "warning",
              content: "Watch the nesting depth! Too many subprograms calling other subprograms can cause errors."
            }
          ]
        })
      },
      "Compensation d'outil": {
        title: "Tool Compensation",
        description: "Understand and use tool radius compensation",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Tool Compensation\n\nTool compensation allows you to program the part contour rather than the tool center path."
            },
            {
              type: "diagram",
              title: "Radius Compensation",
              content: `+---------------------------------------------------------+
|              RADIUS COMPENSATION                         |
+----------------------------------------------------------+
|                                                          |
|     Without compensation     With G41 compensation       |
|                                                          |
|     +---------------+       +---------------+            |
|     |               |       |               |            |
|     |    ---o---    |       |    ---------  | <- Part    |
|     |    Tool       |       |  o            |   contour  |
|     |    center     |       |  | Tool       |            |
|     |               |       |  | offset     |            |
|     +---------------+       +---------------+            |
|                                                          |
|     Error = tool radius     Exact contour                |
|                                                          |
+----------------------------------------------------------+`
            },
            {
              type: "text",
              content: "## Compensation Codes\n\n| Code | Function |\n|------|----------|\n| G40 | Cancel compensation |\n| G41 | Left compensation (tool left of contour) |\n| G42 | Right compensation (tool right of contour) |\n| G43 | Tool length compensation (Z) |"
            },
            {
              type: "text",
              content: "## Example\n\n```gcode\nG0 X-10 Y0      ; Approach position\nG41 D1          ; Activate compensation, tool D1\nG1 X0 Y0 F200   ; Enter material\nG1 X100         ; Machine contour\nG1 Y50\nG1 X0\nG1 Y0\nG40             ; Cancel compensation\nG0 X-10         ; Retract\n```"
            },
            {
              type: "warning",
              content: "Always activate/deactivate compensation on a linear move (G1), never on an arc (G2/G3)!"
            }
          ]
        })
      },
      "Exemple complet : usinage d'une poche": {
        title: "Complete Example: Pocket Machining",
        description: "Step-by-step programming of a rectangular pocket",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Example: Machining a Rectangular Pocket\n\nThis example shows the complete programming of an 80x50 mm pocket, 10 mm deep."
            },
            {
              type: "text",
              content: "## Part Data\n\n- Pocket: 80 x 50 mm\n- Depth: 10 mm\n- Lower left corner: X10, Y10\n- Tool: 10 mm end mill\n- Material: Aluminum"
            },
            {
              type: "text",
              content: "## Complete Program\n\n```gcode\n%\nO0001 (RECTANGULAR POCKET)\n(Tool: D10 End Mill)\n(Material: Aluminum)\n\nN10 G21 G90 G40     (Metric, absolute, no comp.)\nN20 G54             (Work offset)\nN30 T1 M6           (Tool 1)\nN40 S3000 M3        (Spindle 3000 RPM)\nN50 G43 H1 Z50      (Length comp., safety)\n\n(Pass 1: Z-3)\nN60 G0 X15 Y15      (Start position)\nN70 G0 Z2           (Rapid approach)\nN80 G1 Z-3 F100     (Plunge)\nN90 G1 X85 F500     (Machining)\nN100 G1 Y55\nN110 G1 X15\nN120 G1 Y15\n\n(Pass 2: Z-6)\nN130 G1 Z-6 F100\nN140 G1 X85 F500\nN150 G1 Y55\nN160 G1 X15\nN170 G1 Y15\n\n(Pass 3: Z-10)\nN180 G1 Z-10 F100\nN190 G1 X85 F500\nN200 G1 Y55\nN210 G1 X15\nN220 G1 Y15\n\n(End)\nN230 G0 Z50         (Retract)\nN240 M5             (Spindle OFF)\nN250 G28            (Return home)\nN260 M30            (End program)\n%\n```"
            },
            {
              type: "info",
              content: "In production, you would use an automatic pocket cycle (G73 on some controllers) rather than this manual programming."
            }
          ]
        })
      }
    },
    es: {
      "Structure d'un programme G-Code": {
        title: "Estructura de un programa G-Code",
        description: "Aprenda como se organiza un programa CNC",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Estructura de un programa G-Code\n\nUn programa G-code es una serie de instrucciones que le dicen a la maquina CNC que hacer."
            },
            {
              type: "text",
              content: "## Lineas y bloques\n\nCada linea de un programa se llama **bloque**. Un bloque puede contener:\n\n- Un numero de linea (N)\n- Codigos preparatorios (G)\n- Coordenadas (X, Y, Z)\n- Velocidad de avance (F)\n- Velocidad del husillo (S)\n- Herramienta (T)\n- Funcion auxiliar (M)"
            },
            {
              type: "text",
              content: "## Programa de ejemplo\n\n```gcode\nN10 G21 G90       ; Modo metrico, absoluto\nN20 G0 X0 Y0 Z10  ; Posicionamiento rapido\nN30 M3 S1500      ; Husillo ON, 1500 RPM\nN40 G1 Z-5 F100   ; Penetracion a 100 mm/min\nN50 G1 X50 F200   ; Movimiento lineal\nN60 G0 Z10        ; Retraccion\nN70 M5            ; Husillo OFF\nN80 M30           ; Fin del programa\n```"
            },
            {
              type: "info",
              content: "Los comentarios generalmente se indican con un punto y coma (;) o parentesis."
            }
          ]
        })
      },
      "Codes G et M essentiels": {
        title: "Codigos G y M esenciales",
        description: "Domine los codigos fundamentales para la programacion CNC",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Codigos G y M esenciales\n\nLos codigos G (Preparatorios) y codigos M (Auxiliares) son la base de la programacion CNC."
            },
            {
              type: "text",
              content: "## Principales codigos G\n\n| Codigo | Funcion |\n|------|----------|\n| G0 | Posicionamiento rapido |\n| G1 | Interpolacion lineal |\n| G2 | Interpolacion circular horaria |\n| G3 | Interpolacion circular antihoraria |\n| G17 | Seleccion plano XY |\n| G20 | Modo pulgadas |\n| G21 | Modo metrico |\n| G28 | Retorno a origen |\n| G90 | Modo absoluto |\n| G91 | Modo incremental |"
            },
            {
              type: "text",
              content: "## Principales codigos M\n\n| Codigo | Funcion |\n|------|----------|\n| M0 | Parada del programa |\n| M3 | Husillo ON (horario) |\n| M4 | Husillo ON (antihorario) |\n| M5 | Husillo OFF |\n| M6 | Cambio de herramienta |\n| M8 | Refrigerante ON |\n| M9 | Refrigerante OFF |\n| M30 | Fin del programa |"
            },
            {
              type: "warning",
              content: "Los codigos pueden variar ligeramente entre fabricantes de maquinas. Siempre verifique la documentacion especifica."
            }
          ]
        })
      },
      "Cycles preprogrammes": {
        title: "Ciclos preprogramados",
        description: "Usar ciclos de taladrado, roscado y cajeras",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Ciclos preprogramados (Canned Cycles)\n\nLos ciclos preprogramados simplifican la programacion de operaciones repetitivas como el taladrado."
            },
            {
              type: "text",
              content: "## Ciclos de taladrado\n\n| Codigo | Ciclo | Descripcion |\n|------|-------|-------------|\n| G81 | Taladrado simple | Penetracion y retraccion rapida |\n| G82 | Taladrado con temporiz. | Pausa en el fondo |\n| G83 | Taladrado con rompevirutas | Evacuacion de virutas |\n| G84 | Roscado | Roscado interior |\n| G85 | Mandrinado | Acabado de agujeros |"
            },
            {
              type: "text",
              content: "## Ejemplo G83 (Rompevirutas)\n\n```gcode\nG83 X50 Y30 Z-25 R2 Q5 F100\n```\n\n- **X, Y** : Posicion del agujero\n- **Z** : Profundidad final\n- **R** : Plano de retraccion\n- **Q** : Profundidad de cada pasada\n- **F** : Velocidad de avance"
            },
            {
              type: "diagram",
              title: "Ciclo de rompevirutas G83",
              content: `+---------------------------------------------+
|          CICLO G83 - ROMPEVIRUTAS           |
+---------------------------------------------+
|                                             |
|    R=2 ---------------------- Plano retrac. |
|         |   |   |   |                       |
|    Z=0  |   |   |   |  Superficie pieza     |
|         v   |   |   |                       |
|    -5   o   |   |   |  Pasada 1 (Q=5)       |
|             v   |   |                       |
|    -10      o   |   |  Pasada 2             |
|                 v   |                       |
|    -15          o   |  Pasada 3             |
|                     v                       |
|    -25              o  Profundidad final    |
|                                             |
|    Retraccion rapida entre cada pasada      |
|                                             |
+---------------------------------------------+`
            },
            {
              type: "info",
              content: "G80 cancela todos los ciclos activos. Siempre termine una serie de taladrados con G80."
            }
          ]
        })
      },
      "Sous-programmes et repetitions": {
        title: "Subprogramas y repeticiones",
        description: "Organizar el codigo con subprogramas y bucles",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Subprogramas y repeticiones\n\nLos subprogramas permiten reutilizar codigo y simplificar programas complejos."
            },
            {
              type: "text",
              content: "## Llamada a subprograma\n\n```gcode\n; Programa principal\nN10 G0 X0 Y0\nN20 M98 P1000 L4  ; Llamar subprog 1000, 4 veces\nN30 M30\n\n; Subprograma 1000\nO1000\nN100 G1 X10 F100\nN110 G1 Y10\nN120 G1 X0\nN130 G1 Y0\nN140 M99  ; Retorno al programa principal\n```"
            },
            {
              type: "text",
              content: "## Sintaxis segun controladores\n\n| Controlador | Llamada | Definicion | Retorno |\n|-------------|---------|------------|--------|\n| Fanuc | M98 P | O | M99 |\n| Siemens | CALL | PROC | RET |\n| Heidenhain | CALL LBL | LBL | LBL 0 |"
            },
            {
              type: "text",
              content: "## Ventajas\n\n- **Reduccion de codigo** : Evitar repeticiones\n- **Legibilidad** : Programa principal simplificado\n- **Mantenimiento** : Modificar en un solo lugar\n- **Modularidad** : Reutilizar entre programas"
            },
            {
              type: "warning",
              content: "Cuidado con la profundidad de anidamiento! Demasiados subprogramas llamando a otros puede causar errores."
            }
          ]
        })
      },
      "Compensation d'outil": {
        title: "Compensacion de herramienta",
        description: "Comprender y usar la compensacion de radio de herramienta",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Compensacion de herramienta\n\nLa compensacion de herramienta permite programar el contorno de la pieza en lugar de la trayectoria del centro de la herramienta."
            },
            {
              type: "diagram",
              title: "Compensacion de radio",
              content: `+---------------------------------------------------------+
|              COMPENSACION DE RADIO                       |
+----------------------------------------------------------+
|                                                          |
|     Sin compensacion         Con compensacion G41        |
|                                                          |
|     +---------------+       +---------------+            |
|     |               |       |               |            |
|     |    ---o---    |       |    ---------  | <- Contorno|
|     |    Centro     |       |  o            |   pieza    |
|     |    herram.    |       |  | Herram.    |            |
|     |               |       |  | desplaz.   |            |
|     +---------------+       +---------------+            |
|                                                          |
|     Error = radio herram.   Contorno exacto              |
|                                                          |
+----------------------------------------------------------+`
            },
            {
              type: "text",
              content: "## Codigos de compensacion\n\n| Codigo | Funcion |\n|------|----------|\n| G40 | Cancelar compensacion |\n| G41 | Compensacion izquierda (herram. a izq. del contorno) |\n| G42 | Compensacion derecha (herram. a der. del contorno) |\n| G43 | Compensacion de longitud de herramienta (Z) |"
            },
            {
              type: "text",
              content: "## Ejemplo\n\n```gcode\nG0 X-10 Y0      ; Posicion de aproximacion\nG41 D1          ; Activar compensacion, herram. D1\nG1 X0 Y0 F200   ; Entrada en material\nG1 X100         ; Mecanizado del contorno\nG1 Y50\nG1 X0\nG1 Y0\nG40             ; Cancelar compensacion\nG0 X-10         ; Retraccion\n```"
            },
            {
              type: "warning",
              content: "Siempre activar/desactivar la compensacion en un movimiento lineal (G1), nunca en un arco (G2/G3)!"
            }
          ]
        })
      },
      "Exemple complet : usinage d'une poche": {
        title: "Ejemplo completo: mecanizado de una cajera",
        description: "Programacion paso a paso de una cajera rectangular",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Ejemplo: Mecanizado de una cajera rectangular\n\nEste ejemplo muestra la programacion completa de una cajera de 80x50 mm, 10 mm de profundidad."
            },
            {
              type: "text",
              content: "## Datos de la pieza\n\n- Cajera: 80 x 50 mm\n- Profundidad: 10 mm\n- Esquina inferior izquierda: X10, Y10\n- Herramienta: Fresa D10 mm\n- Material: Aluminio"
            },
            {
              type: "text",
              content: "## Programa completo\n\n```gcode\n%\nO0001 (CAJERA RECTANGULAR)\n(Herramienta: Fresa D10)\n(Material: Aluminio)\n\nN10 G21 G90 G40     (Metrico, absoluto, sin comp.)\nN20 G54             (Origen pieza)\nN30 T1 M6           (Herramienta 1)\nN40 S3000 M3        (Husillo 3000 RPM)\nN50 G43 H1 Z50      (Comp. longitud, seguridad)\n\n(Pasada 1: Z-3)\nN60 G0 X15 Y15      (Posicion inicio)\nN70 G0 Z2           (Aproximacion rapida)\nN80 G1 Z-3 F100     (Penetracion)\nN90 G1 X85 F500     (Mecanizado)\nN100 G1 Y55\nN110 G1 X15\nN120 G1 Y15\n\n(Pasada 2: Z-6)\nN130 G1 Z-6 F100\nN140 G1 X85 F500\nN150 G1 Y55\nN160 G1 X15\nN170 G1 Y15\n\n(Pasada 3: Z-10)\nN180 G1 Z-10 F100\nN190 G1 X85 F500\nN200 G1 Y55\nN210 G1 X15\nN220 G1 Y15\n\n(Fin)\nN230 G0 Z50         (Retraccion)\nN240 M5             (Husillo OFF)\nN250 G28            (Retorno origen)\nN260 M30            (Fin programa)\n%\n```"
            },
            {
              type: "info",
              content: "En produccion, se usaria un ciclo de cajera automatico (G73 en algunos controladores) en lugar de esta programacion manual."
            }
          ]
        })
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Structure d'un programme G-Code (5 questions)
    [
      {
        question: "Quel code est utilise pour le positionnement rapide ?",
        options: ["G1", "G0", "M3", "G2"],
        correctIndex: 1,
        explanation: "G0 est le code de positionnement rapide. Il deplace l'outil le plus vite possible sans usinage.",
        order: 1
      },
      {
        question: "Comment s'appelle une ligne de programme G-Code ?",
        options: ["Une instruction", "Un bloc", "Une commande", "Un segment"],
        correctIndex: 1,
        explanation: "Chaque ligne d'un programme G-Code s'appelle un bloc.",
        order: 2
      },
      {
        question: "Que represente la lettre F dans un programme G-Code ?",
        options: ["La fonction auxiliaire", "La vitesse d'avance (Feed)", "La frequence", "Le format de fichier"],
        correctIndex: 1,
        explanation: "F represente la vitesse d'avance (Feed rate), exprimee en mm/min ou pouces/min.",
        order: 3
      },
      {
        question: "Que represente la lettre S dans un programme G-Code ?",
        options: ["La sortie", "La vitesse de broche (Spindle)", "Le systeme de coordonnees", "La securite"],
        correctIndex: 1,
        explanation: "S represente la vitesse de rotation de la broche (Spindle speed), exprimee en tr/min.",
        order: 4
      },
      {
        question: "Que signifie M30 en G-Code ?",
        options: ["Demarrage du programme", "Fin du programme", "Changement d'outil", "Activation de l'arrosage"],
        correctIndex: 1,
        explanation: "M30 signifie fin du programme et rembobinage au debut.",
        order: 5
      }
    ],
    // Lesson 2: Codes G et M essentiels (5 questions)
    [
      {
        question: "Que fait le code M3 ?",
        options: ["Arrete le programme", "Met la broche en marche (sens horaire)", "Active l'arrosage", "Deplace l'axe Z"],
        correctIndex: 1,
        explanation: "M3 met la broche en rotation dans le sens horaire.",
        order: 1
      },
      {
        question: "Quelle est la difference entre G90 et G91 ?",
        options: ["Vitesse rapide vs lente", "Mode absolu vs incremental", "Mode metrique vs pouces", "Broche ON vs OFF"],
        correctIndex: 1,
        explanation: "G90 active le mode absolu (coordonnees par rapport a l'origine), G91 le mode incremental (par rapport a la position actuelle).",
        order: 2
      },
      {
        question: "Quel code active le mode metrique ?",
        options: ["G20", "G21", "G90", "G91"],
        correctIndex: 1,
        explanation: "G21 active le mode metrique (millimetres), G20 active le mode pouces.",
        order: 3
      },
      {
        question: "Que fait le code M5 ?",
        options: ["Demarre la broche", "Arrete la broche", "Active l'arrosage", "Change l'outil"],
        correctIndex: 1,
        explanation: "M5 arrete la rotation de la broche.",
        order: 4
      },
      {
        question: "Que fait le code M8 ?",
        options: ["Arrete l'arrosage", "Active l'arrosage", "Change l'outil", "Fin du programme"],
        correctIndex: 1,
        explanation: "M8 active le systeme d'arrosage (coolant ON). M9 le desactive.",
        order: 5
      }
    ],
    // Lesson 3: Cycles preprogrammes (5 questions)
    [
      {
        question: "Quel cycle est utilise pour le percage avec evacuation des copeaux ?",
        options: ["G81", "G82", "G83", "G84"],
        correctIndex: 2,
        explanation: "G83 est le cycle de debourrage qui remonte periodiquement l'outil pour evacuer les copeaux des trous profonds.",
        order: 1
      },
      {
        question: "Que represente le parametre 'Q' dans G83 ?",
        options: ["La profondeur totale", "La vitesse d'avance", "La profondeur de chaque passe", "Le diametre du trou"],
        correctIndex: 2,
        explanation: "Q definit la profondeur incrementale de chaque passe avant que l'outil ne remonte pour evacuer les copeaux.",
        order: 2
      },
      {
        question: "Quel code annule tous les cycles actifs ?",
        options: ["G79", "G80", "G81", "G00"],
        correctIndex: 1,
        explanation: "G80 annule tous les cycles de percage actifs et doit etre utilise apres une serie d'operations de percage.",
        order: 3
      },
      {
        question: "Que represente le parametre 'R' dans les cycles de percage ?",
        options: ["Le rayon du trou", "La vitesse de rotation", "Le plan de retrait", "Le rayon de l'outil"],
        correctIndex: 2,
        explanation: "R definit le plan de retrait, niveau auquel l'outil se positionne entre les trous et pour l'evacuation des copeaux.",
        order: 4
      },
      {
        question: "Quel cycle est utilise pour le taraudage ?",
        options: ["G81", "G82", "G83", "G84"],
        correctIndex: 3,
        explanation: "G84 est le cycle de taraudage qui synchronise la rotation de la broche avec l'avance pour creer un filetage.",
        order: 5
      }
    ],
    // Lesson 4: Sous-programmes et repetitions (5 questions)
    [
      {
        question: "Quel code Fanuc appelle un sous-programme ?",
        options: ["M97", "M98", "M99", "M30"],
        correctIndex: 1,
        explanation: "M98 suivi de P (numero) et optionnellement L (repetitions) appelle un sous-programme en controleur Fanuc.",
        order: 1
      },
      {
        question: "Quel code marque la fin d'un sous-programme Fanuc ?",
        options: ["M98", "M99", "M30", "M00"],
        correctIndex: 1,
        explanation: "M99 termine le sous-programme et retourne l'execution au programme principal, a la ligne suivant l'appel.",
        order: 2
      },
      {
        question: "Quel est l'avantage principal des sous-programmes ?",
        options: ["Ils accelerent l'usinage", "Ils evitent les repetitions de code", "Ils reduisent l'usure des outils", "Ils ameliorent la precision"],
        correctIndex: 1,
        explanation: "Les sous-programmes permettent de reutiliser du code, reduisant la taille du programme et facilitant la maintenance.",
        order: 3
      },
      {
        question: "Que signifie L4 dans M98 P1000 L4 ?",
        options: ["Longueur de l'outil 4", "Appeler le sous-programme 4 fois", "Ligne 4 du sous-programme", "Label numero 4"],
        correctIndex: 1,
        explanation: "L4 indique que le sous-programme P1000 sera execute 4 fois avant de continuer le programme principal.",
        order: 4
      },
      {
        question: "Quel est le risque d'une imbrication trop profonde de sous-programmes ?",
        options: ["Usinage plus lent", "Erreur de depassement de pile", "Usure de la broche", "Perte de precision"],
        correctIndex: 1,
        explanation: "Trop de sous-programmes appelant d'autres sous-programmes peut depasser la capacite de la pile memoire du controleur.",
        order: 5
      }
    ],
    // Lesson 5: Compensation d'outil (5 questions)
    [
      {
        question: "Quel code active la compensation de rayon a gauche ?",
        options: ["G40", "G41", "G42", "G43"],
        correctIndex: 1,
        explanation: "G41 active la compensation de rayon avec l'outil a gauche du contour (sens de deplacement).",
        order: 1
      },
      {
        question: "Quel code annule la compensation de rayon ?",
        options: ["G40", "G41", "G42", "G49"],
        correctIndex: 0,
        explanation: "G40 annule la compensation de rayon d'outil et doit etre appele avant les mouvements rapides de degagement.",
        order: 2
      },
      {
        question: "Pourquoi utiliser la compensation de rayon ?",
        options: ["Pour accelerer l'usinage", "Pour programmer le contour de la piece directement", "Pour reduire l'usure de l'outil", "Pour economiser la memoire"],
        correctIndex: 1,
        explanation: "La compensation permet de programmer le contour final de la piece, le controleur calculant la trajectoire du centre outil.",
        order: 3
      },
      {
        question: "Sur quel type de mouvement doit-on activer/desactiver la compensation ?",
        options: ["Mouvement rapide G0", "Mouvement lineaire G1", "Mouvement circulaire G2", "N'importe quel mouvement"],
        correctIndex: 1,
        explanation: "La compensation doit etre activee/desactivee sur un mouvement lineaire G1, jamais sur un arc ou un rapide.",
        order: 4
      },
      {
        question: "Quel code active la compensation de longueur d'outil ?",
        options: ["G41", "G42", "G43", "G44"],
        correctIndex: 2,
        explanation: "G43 active la compensation de longueur d'outil sur l'axe Z, permettant de gerer des outils de differentes longueurs.",
        order: 5
      }
    ],
    // Lesson 6: Exemple complet : usinage d'une poche (5 questions)
    [
      {
        question: "Pourquoi usine-t-on une poche en plusieurs passes ?",
        options: ["Pour economiser l'outil", "Pour eviter de surcharger l'outil en profondeur", "Pour faciliter la programmation", "Pour ameliorer la vitesse"],
        correctIndex: 1,
        explanation: "Usiner en plusieurs passes reduit les efforts de coupe et evite la casse de l'outil ou les vibrations excessives.",
        order: 1
      },
      {
        question: "Que signifie G21 en debut de programme ?",
        options: ["Mode absolu", "Mode metrique", "Mode incremental", "Mode pouces"],
        correctIndex: 1,
        explanation: "G21 selectionne le mode metrique (millimetres), par opposition a G20 qui selectionne le mode pouces.",
        order: 2
      },
      {
        question: "Quel code demarre la broche en sens horaire ?",
        options: ["M3", "M4", "M5", "M6"],
        correctIndex: 0,
        explanation: "M3 demarre la broche en rotation horaire (sens conventionnel pour le fraisage), M4 serait antihoraire.",
        order: 3
      },
      {
        question: "Pourquoi utiliser G43 H1 Z50 au debut ?",
        options: ["Pour positionner l'outil", "Pour activer la compensation de longueur et aller en securite", "Pour selectionner l'outil", "Pour definir l'avance"],
        correctIndex: 1,
        explanation: "G43 H1 active la compensation de longueur de l'outil 1, et Z50 positionne l'outil en hauteur de securite.",
        order: 4
      },
      {
        question: "Que fait M30 a la fin du programme ?",
        options: ["Arrete la broche", "Change d'outil", "Termine le programme et rembobine", "Active l'arrosage"],
        correctIndex: 2,
        explanation: "M30 termine le programme, arrete l'execution et remet le pointeur au debut pour un eventuel redemarrage.",
        order: 5
      }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1
      "Quel code est utilise pour le positionnement rapide ?": {
        question: "Which code is used for rapid positioning?",
        options: ["G1", "G0", "M3", "G2"],
        explanation: "G0 is the rapid positioning code. It moves the tool as fast as possible without machining."
      },
      "Comment s'appelle une ligne de programme G-Code ?": {
        question: "What is a line of G-Code program called?",
        options: ["An instruction", "A block", "A command", "A segment"],
        explanation: "Each line of a G-Code program is called a block."
      },
      "Que represente la lettre F dans un programme G-Code ?": {
        question: "What does the letter F represent in a G-Code program?",
        options: ["The auxiliary function", "The feed rate", "The frequency", "The file format"],
        explanation: "F represents the feed rate, expressed in mm/min or inches/min."
      },
      "Que represente la lettre S dans un programme G-Code ?": {
        question: "What does the letter S represent in a G-Code program?",
        options: ["The output", "The spindle speed", "The coordinate system", "The safety"],
        explanation: "S represents the spindle rotation speed, expressed in RPM."
      },
      "Que signifie M30 en G-Code ?": {
        question: "What does M30 mean in G-Code?",
        options: ["Program start", "End of program", "Tool change", "Coolant activation"],
        explanation: "M30 means end of program and rewind to the beginning."
      },
      // Lesson 2
      "Que fait le code M3 ?": {
        question: "What does the M3 code do?",
        options: ["Stops the program", "Turns the spindle ON clockwise", "Activates coolant", "Moves the Z axis"],
        explanation: "M3 turns the spindle ON in the clockwise direction."
      },
      "Quelle est la difference entre G90 et G91 ?": {
        question: "What is the difference between G90 and G91?",
        options: ["Fast vs slow speed", "Absolute vs incremental mode", "Metric vs inch mode", "Spindle ON vs OFF"],
        explanation: "G90 activates absolute mode (coordinates relative to origin), G91 incremental mode (relative to current position)."
      },
      "Quel code active le mode metrique ?": {
        question: "Which code activates metric mode?",
        options: ["G20", "G21", "G90", "G91"],
        explanation: "G21 activates metric mode (millimeters), G20 activates inch mode."
      },
      "Que fait le code M5 ?": {
        question: "What does the M5 code do?",
        options: ["Starts the spindle", "Stops the spindle", "Activates coolant", "Changes the tool"],
        explanation: "M5 stops spindle rotation."
      },
      "Que fait le code M8 ?": {
        question: "What does the M8 code do?",
        options: ["Turns coolant OFF", "Turns coolant ON", "Changes the tool", "End of program"],
        explanation: "M8 activates the coolant system. M9 deactivates it."
      },
      // Lesson 3
      "Quel cycle est utilise pour le percage avec evacuation des copeaux ?": {
        question: "Which cycle is used for drilling with chip evacuation?",
        options: ["G81", "G82", "G83", "G84"],
        explanation: "G83 is the peck drilling cycle that periodically retracts the tool to evacuate chips from deep holes."
      },
      "Que represente le parametre 'Q' dans G83 ?": {
        question: "What does the 'Q' parameter represent in G83?",
        options: ["Total depth", "Feed rate", "Depth of each peck", "Hole diameter"],
        explanation: "Q defines the incremental depth of each peck before the tool retracts to evacuate chips."
      },
      "Quel code annule tous les cycles actifs ?": {
        question: "Which code cancels all active cycles?",
        options: ["G79", "G80", "G81", "G00"],
        explanation: "G80 cancels all active drilling cycles and should be used after a series of drilling operations."
      },
      "Que represente le parametre 'R' dans les cycles de percage ?": {
        question: "What does the 'R' parameter represent in drilling cycles?",
        options: ["Hole radius", "Rotation speed", "Retract plane", "Tool radius"],
        explanation: "R defines the retract plane, the level at which the tool positions between holes and for chip evacuation."
      },
      "Quel cycle est utilise pour le taraudage ?": {
        question: "Which cycle is used for tapping?",
        options: ["G81", "G82", "G83", "G84"],
        explanation: "G84 is the tapping cycle that synchronizes spindle rotation with feed to create threads."
      },
      // Lesson 4
      "Quel code Fanuc appelle un sous-programme ?": {
        question: "Which Fanuc code calls a subprogram?",
        options: ["M97", "M98", "M99", "M30"],
        explanation: "M98 followed by P (number) and optionally L (repetitions) calls a subprogram on Fanuc controllers."
      },
      "Quel code marque la fin d'un sous-programme Fanuc ?": {
        question: "Which code marks the end of a Fanuc subprogram?",
        options: ["M98", "M99", "M30", "M00"],
        explanation: "M99 ends the subprogram and returns execution to the main program, at the line following the call."
      },
      "Quel est l'avantage principal des sous-programmes ?": {
        question: "What is the main advantage of subprograms?",
        options: ["They speed up machining", "They avoid code repetition", "They reduce tool wear", "They improve precision"],
        explanation: "Subprograms allow code reuse, reducing program size and facilitating maintenance."
      },
      "Que signifie L4 dans M98 P1000 L4 ?": {
        question: "What does L4 mean in M98 P1000 L4?",
        options: ["Tool length 4", "Call the subprogram 4 times", "Line 4 of the subprogram", "Label number 4"],
        explanation: "L4 indicates that subprogram P1000 will be executed 4 times before continuing the main program."
      },
      "Quel est le risque d'une imbrication trop profonde de sous-programmes ?": {
        question: "What is the risk of too deep nesting of subprograms?",
        options: ["Slower machining", "Stack overflow error", "Spindle wear", "Loss of precision"],
        explanation: "Too many subprograms calling other subprograms can exceed the controller's memory stack capacity."
      },
      // Lesson 5
      "Quel code active la compensation de rayon a gauche ?": {
        question: "Which code activates left radius compensation?",
        options: ["G40", "G41", "G42", "G43"],
        explanation: "G41 activates radius compensation with the tool to the left of the contour (direction of travel)."
      },
      "Quel code annule la compensation de rayon ?": {
        question: "Which code cancels radius compensation?",
        options: ["G40", "G41", "G42", "G49"],
        explanation: "G40 cancels tool radius compensation and should be called before rapid retract moves."
      },
      "Pourquoi utiliser la compensation de rayon ?": {
        question: "Why use radius compensation?",
        options: ["To speed up machining", "To program the part contour directly", "To reduce tool wear", "To save memory"],
        explanation: "Compensation allows programming the final part contour, with the controller calculating the tool center path."
      },
      "Sur quel type de mouvement doit-on activer/desactiver la compensation ?": {
        question: "On what type of move should compensation be activated/deactivated?",
        options: ["Rapid move G0", "Linear move G1", "Circular move G2", "Any move"],
        explanation: "Compensation must be activated/deactivated on a linear G1 move, never on an arc or rapid."
      },
      "Quel code active la compensation de longueur d'outil ?": {
        question: "Which code activates tool length compensation?",
        options: ["G41", "G42", "G43", "G44"],
        explanation: "G43 activates tool length compensation on the Z axis, allowing management of tools of different lengths."
      },
      // Lesson 6
      "Pourquoi usine-t-on une poche en plusieurs passes ?": {
        question: "Why is a pocket machined in multiple passes?",
        options: ["To save the tool", "To avoid overloading the tool in depth", "To facilitate programming", "To improve speed"],
        explanation: "Machining in multiple passes reduces cutting forces and avoids tool breakage or excessive vibration."
      },
      "Que signifie G21 en debut de programme ?": {
        question: "What does G21 mean at the start of a program?",
        options: ["Absolute mode", "Metric mode", "Incremental mode", "Inch mode"],
        explanation: "G21 selects metric mode (millimeters), as opposed to G20 which selects inch mode."
      },
      "Quel code demarre la broche en sens horaire ?": {
        question: "Which code starts the spindle clockwise?",
        options: ["M3", "M4", "M5", "M6"],
        explanation: "M3 starts the spindle in clockwise rotation (conventional direction for milling), M4 would be counter-clockwise."
      },
      "Pourquoi utiliser G43 H1 Z50 au debut ?": {
        question: "Why use G43 H1 Z50 at the start?",
        options: ["To position the tool", "To activate length compensation and go to safety height", "To select the tool", "To set the feed rate"],
        explanation: "G43 H1 activates length compensation for tool 1, and Z50 positions the tool at safety height."
      },
      "Que fait M30 a la fin du programme ?": {
        question: "What does M30 do at the end of the program?",
        options: ["Stops the spindle", "Changes the tool", "Ends the program and rewinds", "Activates coolant"],
        explanation: "M30 ends the program, stops execution and resets the pointer to the beginning for possible restart."
      }
    },
    es: {
      // Lesson 1
      "Quel code est utilise pour le positionnement rapide ?": {
        question: "Que codigo se usa para el posicionamiento rapido?",
        options: ["G1", "G0", "M3", "G2"],
        explanation: "G0 es el codigo de posicionamiento rapido. Mueve la herramienta lo mas rapido posible sin mecanizar."
      },
      "Comment s'appelle une ligne de programme G-Code ?": {
        question: "Como se llama una linea de programa G-Code?",
        options: ["Una instruccion", "Un bloque", "Un comando", "Un segmento"],
        explanation: "Cada linea de un programa G-Code se llama bloque."
      },
      "Que represente la lettre F dans un programme G-Code ?": {
        question: "Que representa la letra F en un programa G-Code?",
        options: ["La funcion auxiliar", "La velocidad de avance (Feed)", "La frecuencia", "El formato de archivo"],
        explanation: "F representa la velocidad de avance (Feed rate), expresada en mm/min o pulgadas/min."
      },
      "Que represente la lettre S dans un programme G-Code ?": {
        question: "Que representa la letra S en un programa G-Code?",
        options: ["La salida", "La velocidad del husillo (Spindle)", "El sistema de coordenadas", "La seguridad"],
        explanation: "S representa la velocidad de rotacion del husillo (Spindle speed), expresada en RPM."
      },
      "Que signifie M30 en G-Code ?": {
        question: "Que significa M30 en G-Code?",
        options: ["Inicio del programa", "Fin del programa", "Cambio de herramienta", "Activacion del refrigerante"],
        explanation: "M30 significa fin del programa y rebobinado al inicio."
      },
      // Lesson 2
      "Que fait le code M3 ?": {
        question: "Que hace el codigo M3?",
        options: ["Detiene el programa", "Enciende el husillo en sentido horario", "Activa el refrigerante", "Mueve el eje Z"],
        explanation: "M3 enciende el husillo en sentido horario."
      },
      "Quelle est la difference entre G90 et G91 ?": {
        question: "Cual es la diferencia entre G90 y G91?",
        options: ["Velocidad rapida vs lenta", "Modo absoluto vs incremental", "Modo metrico vs pulgadas", "Husillo ON vs OFF"],
        explanation: "G90 activa el modo absoluto (coordenadas relativas al origen), G91 el modo incremental (relativo a la posicion actual)."
      },
      "Quel code active le mode metrique ?": {
        question: "Que codigo activa el modo metrico?",
        options: ["G20", "G21", "G90", "G91"],
        explanation: "G21 activa el modo metrico (milimetros), G20 activa el modo pulgadas."
      },
      "Que fait le code M5 ?": {
        question: "Que hace el codigo M5?",
        options: ["Arranca el husillo", "Detiene el husillo", "Activa el refrigerante", "Cambia la herramienta"],
        explanation: "M5 detiene la rotacion del husillo."
      },
      "Que fait le code M8 ?": {
        question: "Que hace el codigo M8?",
        options: ["Apaga el refrigerante", "Activa el refrigerante", "Cambia la herramienta", "Fin del programa"],
        explanation: "M8 activa el sistema de refrigerante. M9 lo desactiva."
      },
      // Lesson 3
      "Quel cycle est utilise pour le percage avec evacuation des copeaux ?": {
        question: "Que ciclo se usa para taladrado con evacuacion de virutas?",
        options: ["G81", "G82", "G83", "G84"],
        explanation: "G83 es el ciclo de rompevirutas que retrae periodicamente la herramienta para evacuar las virutas de agujeros profundos."
      },
      "Que represente le parametre 'Q' dans G83 ?": {
        question: "Que representa el parametro 'Q' en G83?",
        options: ["La profundidad total", "La velocidad de avance", "La profundidad de cada pasada", "El diametro del agujero"],
        explanation: "Q define la profundidad incremental de cada pasada antes de que la herramienta retroceda para evacuar virutas."
      },
      "Quel code annule tous les cycles actifs ?": {
        question: "Que codigo cancela todos los ciclos activos?",
        options: ["G79", "G80", "G81", "G00"],
        explanation: "G80 cancela todos los ciclos de taladrado activos y debe usarse despues de una serie de operaciones de taladrado."
      },
      "Que represente le parametre 'R' dans les cycles de percage ?": {
        question: "Que representa el parametro 'R' en los ciclos de taladrado?",
        options: ["El radio del agujero", "La velocidad de rotacion", "El plano de retraccion", "El radio de la herramienta"],
        explanation: "R define el plano de retraccion, nivel al que se posiciona la herramienta entre agujeros y para evacuacion de virutas."
      },
      "Quel cycle est utilise pour le taraudage ?": {
        question: "Que ciclo se usa para el roscado?",
        options: ["G81", "G82", "G83", "G84"],
        explanation: "G84 es el ciclo de roscado que sincroniza la rotacion del husillo con el avance para crear roscas."
      },
      // Lesson 4
      "Quel code Fanuc appelle un sous-programme ?": {
        question: "Que codigo Fanuc llama a un subprograma?",
        options: ["M97", "M98", "M99", "M30"],
        explanation: "M98 seguido de P (numero) y opcionalmente L (repeticiones) llama a un subprograma en controladores Fanuc."
      },
      "Quel code marque la fin d'un sous-programme Fanuc ?": {
        question: "Que codigo marca el fin de un subprograma Fanuc?",
        options: ["M98", "M99", "M30", "M00"],
        explanation: "M99 termina el subprograma y retorna la ejecucion al programa principal, en la linea siguiente a la llamada."
      },
      "Quel est l'avantage principal des sous-programmes ?": {
        question: "Cual es la principal ventaja de los subprogramas?",
        options: ["Aceleran el mecanizado", "Evitan la repeticion de codigo", "Reducen el desgaste de herramientas", "Mejoran la precision"],
        explanation: "Los subprogramas permiten reutilizar codigo, reduciendo el tamano del programa y facilitando el mantenimiento."
      },
      "Que signifie L4 dans M98 P1000 L4 ?": {
        question: "Que significa L4 en M98 P1000 L4?",
        options: ["Longitud de herramienta 4", "Llamar al subprograma 4 veces", "Linea 4 del subprograma", "Etiqueta numero 4"],
        explanation: "L4 indica que el subprograma P1000 se ejecutara 4 veces antes de continuar el programa principal."
      },
      "Quel est le risque d'une imbrication trop profonde de sous-programmes ?": {
        question: "Cual es el riesgo de un anidamiento demasiado profundo de subprogramas?",
        options: ["Mecanizado mas lento", "Error de desbordamiento de pila", "Desgaste del husillo", "Perdida de precision"],
        explanation: "Demasiados subprogramas llamando a otros puede exceder la capacidad de la pila de memoria del controlador."
      },
      // Lesson 5
      "Quel code active la compensation de rayon a gauche ?": {
        question: "Que codigo activa la compensacion de radio a la izquierda?",
        options: ["G40", "G41", "G42", "G43"],
        explanation: "G41 activa la compensacion de radio con la herramienta a la izquierda del contorno (direccion de desplazamiento)."
      },
      "Quel code annule la compensation de rayon ?": {
        question: "Que codigo cancela la compensacion de radio?",
        options: ["G40", "G41", "G42", "G49"],
        explanation: "G40 cancela la compensacion de radio de herramienta y debe llamarse antes de los movimientos rapidos de retraccion."
      },
      "Pourquoi utiliser la compensation de rayon ?": {
        question: "Por que usar la compensacion de radio?",
        options: ["Para acelerar el mecanizado", "Para programar el contorno de la pieza directamente", "Para reducir el desgaste de la herramienta", "Para ahorrar memoria"],
        explanation: "La compensacion permite programar el contorno final de la pieza, calculando el controlador la trayectoria del centro de la herramienta."
      },
      "Sur quel type de mouvement doit-on activer/desactiver la compensation ?": {
        question: "En que tipo de movimiento se debe activar/desactivar la compensacion?",
        options: ["Movimiento rapido G0", "Movimiento lineal G1", "Movimiento circular G2", "Cualquier movimiento"],
        explanation: "La compensacion debe activarse/desactivarse en un movimiento lineal G1, nunca en un arco o rapido."
      },
      "Quel code active la compensation de longueur d'outil ?": {
        question: "Que codigo activa la compensacion de longitud de herramienta?",
        options: ["G41", "G42", "G43", "G44"],
        explanation: "G43 activa la compensacion de longitud de herramienta en el eje Z, permitiendo gestionar herramientas de diferentes longitudes."
      },
      // Lesson 6
      "Pourquoi usine-t-on une poche en plusieurs passes ?": {
        question: "Por que se mecaniza una cajera en varias pasadas?",
        options: ["Para ahorrar la herramienta", "Para evitar sobrecargar la herramienta en profundidad", "Para facilitar la programacion", "Para mejorar la velocidad"],
        explanation: "Mecanizar en varias pasadas reduce los esfuerzos de corte y evita la rotura de la herramienta o vibraciones excesivas."
      },
      "Que signifie G21 en debut de programme ?": {
        question: "Que significa G21 al inicio del programa?",
        options: ["Modo absoluto", "Modo metrico", "Modo incremental", "Modo pulgadas"],
        explanation: "G21 selecciona el modo metrico (milimetros), a diferencia de G20 que selecciona el modo pulgadas."
      },
      "Quel code demarre la broche en sens horaire ?": {
        question: "Que codigo arranca el husillo en sentido horario?",
        options: ["M3", "M4", "M5", "M6"],
        explanation: "M3 arranca el husillo en rotacion horaria (sentido convencional para fresado), M4 seria antihorario."
      },
      "Pourquoi utiliser G43 H1 Z50 au debut ?": {
        question: "Por que usar G43 H1 Z50 al inicio?",
        options: ["Para posicionar la herramienta", "Para activar la compensacion de longitud e ir a altura de seguridad", "Para seleccionar la herramienta", "Para definir el avance"],
        explanation: "G43 H1 activa la compensacion de longitud de la herramienta 1, y Z50 posiciona la herramienta en altura de seguridad."
      },
      "Que fait M30 a la fin du programme ?": {
        question: "Que hace M30 al final del programa?",
        options: ["Detiene el husillo", "Cambia de herramienta", "Termina el programa y rebobina", "Activa el refrigerante"],
        explanation: "M30 termina el programa, detiene la ejecucion y reinicia el puntero al inicio para un posible reinicio."
      }
    }
  }
}
