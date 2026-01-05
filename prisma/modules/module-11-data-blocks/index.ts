import type { ModuleData } from '../types.js'

export const module11Data: ModuleData = {
  moduleOrder: 11,
  moduleTitle: "Blocs de données S7-1500",
  moduleDescription: "Maîtrisez les blocs de données (DB) et la programmation structurée",
  moduleTranslations: {
    en: {
      title: "S7-1500 Data Blocks",
      description: "Master data blocks (DB) and structured programming"
    },
    es: {
      title: "Bloques de Datos S7-1500",
      description: "Domine los bloques de datos (DB) y la programación estructurada"
    }
  },
  lessons: [
    // Lesson 1: Les blocs de données (DB)
    {
      title: "Les blocs de données (DB)",
      description: "Comprenez les différents types de blocs de données S7",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les blocs de données (DB)\n\nLes **Data Blocks** (DB) permettent de stocker des données dans l'automate S7-1500."
          },
          {
            type: "text",
            content: "## Types de blocs de données\n\n### DB Global\nAccessible depuis n'importe quel bloc du programme.\n\n### DB d'instance\nAssocié à un bloc fonctionnel (FB) spécifique.\n\n### DB de recette\nPour stocker des paramètres de production."
          },
          {
            type: "diagram",
            title: "Structure d'un DB",
            content: `┌─────────────────────────────────────────────┐
│  DB1 - Données_Production                   │
├─────────────────────────────────────────────┤
│  Nom              │ Type    │ Valeur       │
├───────────────────┼─────────┼──────────────┤
│  Compteur_Pieces  │ Int     │ 0            │
│  Vitesse_Consigne │ Real    │ 1500.0       │
│  Mode_Auto        │ Bool    │ FALSE        │
│  Nom_Produit      │ String  │ 'Pièce A'    │
│  Temps_Cycle      │ Time    │ T#5s         │
└───────────────────┴─────────┴──────────────┘`
          },
          {
            type: "info",
            content: "Le S7-1500 utilise par défaut l'accès optimisé aux DB, ce qui améliore les performances mais change la façon d'accéder aux données."
          }
        ]
      })
    },
    // Lesson 2: Programmation structurée
    {
      title: "Programmation structurée",
      description: "Organisez votre code avec FB, FC et DB",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Programmation structurée\n\nLa programmation structurée permet d'organiser le code en blocs réutilisables."
          },
          {
            type: "text",
            content: "## Types de blocs\n\n| Bloc | Description |\n|------|-------------|\n| OB (Organisation Block) | Point d'entrée du programme |\n| FB (Function Block) | Bloc avec mémoire (DB d'instance) |\n| FC (Function) | Bloc sans mémoire |\n| DB (Data Block) | Stockage de données |"
          },
          {
            type: "diagram",
            title: "Appel de blocs",
            content: `┌───────────────────────────────────────────────────────────┐
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
└───────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Avantages\n\n- **Réutilisation** : Un FB peut être appelé plusieurs fois avec des DB différents\n- **Lisibilité** : Code organisé et documenté\n- **Maintenance** : Modifications localisées\n- **Tests** : Blocs testables individuellement"
          },
          {
            type: "warning",
            content: "Évitez de programmer tout dans OB1 ! Utilisez des FB et FC pour structurer votre code."
          }
        ]
      })
    },
    // Lesson 3: Types de données utilisateur (UDT)
    {
      title: "Types de données utilisateur (UDT)",
      description: "Créer et utiliser des types de données personnalisés",
      order: 3,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Types de données utilisateur (UDT)\n\nLes **UDT** (User Defined Types) permettent de créer des structures de données personnalisées."
          },
          {
            type: "text",
            content: "## Pourquoi utiliser des UDT ?\n\n- **Regrouper** des données liées (ex: toutes les infos d'un moteur)\n- **Standardiser** la structure des données dans le projet\n- **Réutiliser** la même structure pour plusieurs instances\n- **Simplifier** la programmation et la maintenance"
          },
          {
            type: "text",
            content: "## Exemple : Structure Moteur\n\n```\nTYPE \"UDT_Moteur\"\nVERSION : 0.1\n   STRUCT\n      Commande     : Bool;     // Ordre de marche\n      Retour_Info  : Bool;     // Retour contacteur\n      Defaut       : Bool;     // Défaut thermique\n      Vitesse_Cons : Int;      // Consigne vitesse\n      Vitesse_Act  : Int;      // Vitesse actuelle\n      Temps_Marche : Time;     // Temps de fonctionnement\n      Nom          : String[32]; // Nom du moteur\n   END_STRUCT;\nEND_TYPE\n```"
          },
          {
            type: "text",
            content: "## Utilisation dans un DB\n\n```\nDATA_BLOCK \"DB_Moteurs\"\nVERSION : 0.1\n   VAR\n      Moteur_Convoyeur : \"UDT_Moteur\";\n      Moteur_Broche    : \"UDT_Moteur\";\n      Moteur_Pompe     : \"UDT_Moteur\";\n   END_VAR\nEND_DATA_BLOCK\n```\n\nAccès : `\"DB_Moteurs\".Moteur_Convoyeur.Vitesse_Cons`"
          },
          {
            type: "info",
            content: "Les UDT sont particulièrement utiles pour les machines répétitives : plusieurs moteurs identiques, plusieurs stations, etc."
          }
        ]
      })
    },
    // Lesson 4: Accès optimisé vs standard
    {
      title: "Accès optimisé vs standard",
      description: "Comprendre les modes d'accès aux blocs de données",
      order: 4,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Accès optimisé vs standard\n\nLe S7-1500 introduit l'**accès optimisé** aux blocs de données, qui diffère de l'accès standard des anciens S7."
          },
          {
            type: "text",
            content: "## Accès standard (S7-300/400)\n\n```\nDB1.DBX0.0   // Bit 0 du byte 0\nDB1.DBW10    // Word à l'adresse 10\nDB1.DBD20    // DWord à l'adresse 20\n```\n\n- Adresses absolues fixes\n- Compatible avec anciens systèmes\n- Risque de chevauchement mémoire"
          },
          {
            type: "text",
            content: "## Accès optimisé (S7-1500)\n\n```\n\"DB_Production\".Compteur_Pieces\n\"DB_Production\".Temperature\n\"DB_Production\".Mode_Auto\n```\n\n- Adresses symboliques uniquement\n- Pas d'adresse absolue visible\n- Optimisation automatique de la mémoire"
          },
          {
            type: "text",
            content: "## Comparaison\n\n| Critère | Standard | Optimisé |\n|---------|----------|----------|\n| Performance | Moyenne | Excellente |\n| Mémoire | Manuelle | Automatique |\n| Lisibilité | Adresses | Noms symboliques |\n| Migration | Compatible S7-300/400 | S7-1500 uniquement |\n| Accès indirect | Possible | Limité |"
          },
          {
            type: "warning",
            content: "Pour la communication avec des systèmes externes (OPC, IHM tierces), vous pouvez avoir besoin de DB en accès standard. Configurez-le dans les propriétés du DB."
          }
        ]
      })
    },
    // Lesson 5: Blocs fonctionnels et instances
    {
      title: "Blocs fonctionnels et instances",
      description: "Utiliser les FB avec leurs DB d'instance",
      order: 5,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Blocs fonctionnels et instances\n\nLes **FB** (Function Blocks) sont des blocs avec mémoire, utilisant des **DB d'instance** pour stocker leurs données."
          },
          {
            type: "diagram",
            title: "FB et DB d'instance",
            content: `┌─────────────────────────────────────────────────────────────┐
│              FB ET DB D'INSTANCE                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ┌─────────────────┐                                      │
│    │  FB_Moteur      │   ← Bloc fonctionnel (code)          │
│    │                 │                                      │
│    │  IN: Commande   │                                      │
│    │  OUT: Etat      │                                      │
│    │  STAT: Timer    │   ← Variables statiques              │
│    │                 │                                      │
│    └─────────────────┘                                      │
│            │                                                 │
│            │ Instanciation                                   │
│            ▼                                                 │
│    ┌───────────────────────────────────────────────┐        │
│    │                                               │        │
│    │  DB_Moteur1    DB_Moteur2    DB_Moteur3      │        │
│    │  (Instance 1)  (Instance 2)  (Instance 3)    │        │
│    │                                               │        │
│    │  Chaque DB stocke les données                │        │
│    │  de son instance du FB                       │        │
│    │                                               │        │
│    └───────────────────────────────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Types d'instances\n\n### Instance simple\nUn DB dédié pour chaque appel du FB.\n\n```\nCALL \"FB_Moteur\", \"DB_Moteur1\"\n     En := I0.0\n     Vitesse := 1500\n```\n\n### Multi-instance\nPlusieurs instances dans un seul DB parent (pour FB contenant d'autres FB)."
          },
          {
            type: "text",
            content: "## Exemple de FB\n\n```pascal\nFUNCTION_BLOCK \"FB_Moteur\"\nVAR_INPUT\n    Commande : Bool;\n    Vitesse_Cons : Int;\nEND_VAR\nVAR_OUTPUT\n    Marche : Bool;\nEND_VAR\nVAR\n    Timer_Demarrage : TON;  // Variable statique\nEND_VAR\n\nTimer_Demarrage(IN := Commande, PT := T#2s);\nMarche := Timer_Demarrage.Q;\n\nEND_FUNCTION_BLOCK\n```"
          }
        ]
      })
    },
    // Lesson 6: Bonnes pratiques de structuration
    {
      title: "Bonnes pratiques de structuration",
      description: "Organiser efficacement son code S7-1500",
      order: 6,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Bonnes pratiques de structuration\n\nUne bonne organisation du code facilite la maintenance et la compréhension du programme."
          },
          {
            type: "text",
            content: "## Structure recommandée\n\n```\nProjet TIA Portal\n├── OB1 (Main)\n│   ├── CALL FC_Lecture_Entrees\n│   ├── CALL FC_Traitement\n│   │   ├── CALL FB_Station1, DB_Station1\n│   │   ├── CALL FB_Station2, DB_Station2\n│   │   └── CALL FB_Station3, DB_Station3\n│   └── CALL FC_Ecriture_Sorties\n├── OB100 (Startup) - Initialisations\n├── OB80 (Time Error) - Gestion erreurs\n├── DB_Parametres (Données globales)\n└── DB_Production (Compteurs, états)\n```"
          },
          {
            type: "text",
            content: "## Conventions de nommage\n\n| Type | Préfixe | Exemple |\n|------|---------|--------|\n| Entrée | I_ ou E_ | I_Bouton_Start |\n| Sortie | Q_ ou S_ | Q_Moteur_Principal |\n| Mémento | M_ | M_Cycle_En_Cours |\n| FB | FB_ | FB_Gestion_Moteur |\n| FC | FC_ | FC_Calcul_Debit |\n| DB | DB_ | DB_Parametres_Machine |"
          },
          {
            type: "text",
            content: "## Règles d'or\n\n1. **Un FB par équipement** : Moteur, vérin, station...\n2. **Pas de logique dans OB1** : Uniquement des appels\n3. **Commentaires** : Documenter chaque bloc\n4. **UDT pour la répétition** : Même structure = même UDT\n5. **Paramétrage externe** : Valeurs dans DB, pas en dur dans le code"
          },
          {
            type: "info",
            content: "Utilisez les dossiers dans l'arbre du projet TIA Portal pour organiser vos blocs par fonction ou par partie de machine."
          }
        ]
      })
    }
  ],
  lessonTranslations: {
    en: {
      "Les blocs de données (DB)": {
        title: "Data Blocks (DB)",
        description: "Understand and use data blocks",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Data Blocks (DB)\n\n**Data blocks** store data used by the program."
            },
            {
              type: "text",
              content: "## Types of DB\n\n### Global DB\nAccessible from anywhere in the program. Ideal for shared data.\n\n### Instance DB\nAssociated with a Function Block (FB). Stores the FB's internal data."
            },
            {
              type: "diagram",
              title: "DB Structure",
              content: `┌─────────────────────────────────────────────────────────────┐
│  DB10 "Motor_Data"                                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Name          │ Type    │ Value    │ Comment           ││
│  │────────────────┼─────────┼──────────┼───────────────────││
│  │  Speed         │ REAL    │ 1500.0   │ Speed in RPM      ││
│  │  Running       │ BOOL    │ FALSE    │ Running status    ││
│  │  Fault         │ BOOL    │ FALSE    │ Fault present     ││
│  │  RunTime       │ TIME    │ T#0s     │ Cumulative time   ││
│  │  Parameters    │ STRUCT  │          │ Motor parameters  ││
│  │   ├─ MaxSpeed  │ REAL    │ 3000.0   │ Maximum speed     ││
│  │   └─ Accel     │ REAL    │ 10.0     │ Acceleration      ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Syntax for Accessing\n\n- **Global DB**: DB10.Speed or \"Motor_Data\".Speed\n- **Instance DB**: Automatic with FB call"
            },
            {
              type: "info",
              content: "Prefer global DBs for shared data and instance DBs for encapsulated data."
            }
          ]
        })
      },
      "Programmation structurée": {
        title: "Structured Programming",
        description: "Organize your code with FB, FC and DB",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Structured Programming\n\nStructured programming organizes code into reusable blocks."
            },
            {
              type: "text",
              content: "## Block Types\n\n| Block | Description |\n|-------|-------------|\n| OB (Organisation Block) | Program entry point |\n| FB (Function Block) | Block with memory (instance DB) |\n| FC (Function) | Block without memory |\n| DB (Data Block) | Data storage |"
            },
            {
              type: "diagram",
              title: "Block Calls",
              content: `┌───────────────────────────────────────────────────────────┐
│                        OB1 (Main)                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │   CALL "FC_Read_Inputs"                             │  │
│  │                                                     │  │
│  │   CALL "FB_Motor", "DB_Motor1"                      │  │
│  │        En := I0.0                                   │  │
│  │        Speed := 1500                                │  │
│  │                                                     │  │
│  │   CALL "FB_Motor", "DB_Motor2"                      │  │
│  │        En := I0.1                                   │  │
│  │        Speed := 1200                                │  │
│  │                                                     │  │
│  │   CALL "FC_Write_Outputs"                           │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Advantages\n\n- **Reuse**: An FB can be called multiple times with different DBs\n- **Readability**: Organized and documented code\n- **Maintenance**: Localized modifications\n- **Testing**: Individually testable blocks"
            },
            {
              type: "warning",
              content: "Avoid programming everything in OB1! Use FB and FC to structure your code."
            }
          ]
        })
      },
      "Types de données utilisateur (UDT)": {
        title: "User Defined Types (UDT)",
        description: "Create and use custom data types"
      },
      "Accès optimisé vs standard": {
        title: "Optimized vs Standard Access",
        description: "Understand data block access modes"
      },
      "Blocs fonctionnels et instances": {
        title: "Function Blocks and Instances",
        description: "Use FBs with their instance DBs"
      },
      "Bonnes pratiques de structuration": {
        title: "Structuring Best Practices",
        description: "Organize your S7-1500 code effectively"
      }
    },
    es: {
      "Les blocs de données (DB)": {
        title: "Bloques de datos (DB)",
        description: "Comprende y utiliza los bloques de datos",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Bloques de datos (DB)\n\nLos **bloques de datos** almacenan datos utilizados por el programa."
            },
            {
              type: "text",
              content: "## Tipos de DB\n\n### DB Global\nAccesible desde cualquier parte del programa. Ideal para datos compartidos.\n\n### DB de Instancia\nAsociado a un Bloque de Función (FB). Almacena los datos internos del FB."
            },
            {
              type: "diagram",
              title: "Estructura de DB",
              content: `┌─────────────────────────────────────────────────────────────┐
│  DB10 "Datos_Motor"                                          │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Nombre        │ Tipo    │ Valor    │ Comentario        ││
│  │────────────────┼─────────┼──────────┼───────────────────││
│  │  Velocidad     │ REAL    │ 1500.0   │ Velocidad en RPM  ││
│  │  EnMarcha      │ BOOL    │ FALSE    │ Estado de marcha  ││
│  │  Fallo         │ BOOL    │ FALSE    │ Fallo presente    ││
│  │  TiempoMarcha  │ TIME    │ T#0s     │ Tiempo acumulado  ││
│  │  Parametros    │ STRUCT  │          │ Parámetros motor  ││
│  │   ├─ VelMax    │ REAL    │ 3000.0   │ Velocidad máxima  ││
│  │   └─ Acel      │ REAL    │ 10.0     │ Aceleración       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Sintaxis de acceso\n\n- **DB Global**: DB10.Velocidad o \"Datos_Motor\".Velocidad\n- **DB de Instancia**: Automático con llamada FB"
            },
            {
              type: "info",
              content: "Prefiera DBs globales para datos compartidos y DBs de instancia para datos encapsulados."
            }
          ]
        })
      },
      "Programmation structurée": {
        title: "Programación estructurada",
        description: "Organiza tu código con FB, FC y DB",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Programación estructurada\n\nLa programación estructurada organiza el código en bloques reutilizables."
            },
            {
              type: "text",
              content: "## Tipos de bloques\n\n| Bloque | Descripción |\n|--------|-------------|\n| OB (Bloque de Organización) | Punto de entrada del programa |\n| FB (Bloque de Función) | Bloque con memoria (DB de instancia) |\n| FC (Función) | Bloque sin memoria |\n| DB (Bloque de Datos) | Almacenamiento de datos |"
            },
            {
              type: "diagram",
              title: "Llamadas de bloques",
              content: `┌───────────────────────────────────────────────────────────┐
│                        OB1 (Main)                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │   CALL "FC_Lectura_Entradas"                        │  │
│  │                                                     │  │
│  │   CALL "FB_Motor", "DB_Motor1"                      │  │
│  │        En := I0.0                                   │  │
│  │        Velocidad := 1500                            │  │
│  │                                                     │  │
│  │   CALL "FB_Motor", "DB_Motor2"                      │  │
│  │        En := I0.1                                   │  │
│  │        Velocidad := 1200                            │  │
│  │                                                     │  │
│  │   CALL "FC_Escritura_Salidas"                       │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Ventajas\n\n- **Reutilización**: Un FB puede llamarse varias veces con diferentes DBs\n- **Legibilidad**: Código organizado y documentado\n- **Mantenimiento**: Modificaciones localizadas\n- **Pruebas**: Bloques probables individualmente"
            },
            {
              type: "warning",
              content: "¡Evite programar todo en OB1! Use FB y FC para estructurar su código."
            }
          ]
        })
      },
      "Types de données utilisateur (UDT)": {
        title: "Tipos de datos de usuario (UDT)",
        description: "Crear y utilizar tipos de datos personalizados"
      },
      "Accès optimisé vs standard": {
        title: "Acceso optimizado vs estándar",
        description: "Comprender los modos de acceso a bloques de datos"
      },
      "Blocs fonctionnels et instances": {
        title: "Bloques funcionales e instancias",
        description: "Usar los FB con sus DB de instancia"
      },
      "Bonnes pratiques de structuration": {
        title: "Buenas prácticas de estructuración",
        description: "Organizar eficientemente su código S7-1500"
      }
    }
  },
  quizzes: [
    // Lesson 1 quizzes (5 questions)
    [
      {
        question: "Quelle est la différence entre un DB global et un DB d'instance ?",
        options: [
          "Il n'y a pas de différence",
          "Le DB global est accessible partout, le DB d'instance est lié à un FB",
          "Le DB d'instance est plus grand",
          "Le DB global est automatique"
        ],
        correctIndex: 1,
        explanation: "Un DB global stocke des données accessibles dans tout le programme. Un DB d'instance stocke les données internes d'un FB spécifique.",
        order: 1
      },
      {
        question: "Comment accède-t-on à une variable 'Vitesse' dans le DB10 ?",
        options: [
          "Vitesse",
          "DB10.Vitesse",
          "%DB10.Vitesse",
          "#Vitesse"
        ],
        correctIndex: 1,
        explanation: "On accède aux variables d'un DB avec la syntaxe DB<numéro>.<variable>, par exemple DB10.Vitesse.",
        order: 2
      },
      {
        question: "Qu'est-ce qu'un DB de recette ?",
        options: [
          "Un DB pour les calculs",
          "Un DB pour stocker des paramètres de production",
          "Un DB pour les alarmes",
          "Un DB pour la communication"
        ],
        correctIndex: 1,
        explanation: "Un DB de recette stocke des paramètres de production qui peuvent être modifiés sans toucher au programme.",
        order: 3
      },
      {
        question: "Qu'est-ce que l'accès optimisé aux DB dans le S7-1500 ?",
        options: [
          "Un mode de compression des données",
          "Un mode d'accès plus performant sans adresses fixes",
          "Un mode de sauvegarde automatique",
          "Un mode de cryptage"
        ],
        correctIndex: 1,
        explanation: "L'accès optimisé améliore les performances en organisant automatiquement les données sans adresses fixes.",
        order: 4
      },
      {
        question: "Quel type de données peut-on stocker dans un DB ?",
        options: [
          "Uniquement des Bool",
          "Uniquement des nombres",
          "Tous types : Bool, Int, Real, String, Time, etc.",
          "Uniquement des tableaux"
        ],
        correctIndex: 2,
        explanation: "Les DB peuvent stocker tous types de données : Bool, Int, Real, String, Time, Array, Struct, etc.",
        order: 5
      }
    ],
    // Lesson 2 quizzes (5 questions)
    [
      {
        question: "Quel bloc possède une mémoire (DB d'instance) ?",
        options: [
          "FC (Function)",
          "FB (Function Block)",
          "OB (Organisation Block)",
          "Aucun bloc"
        ],
        correctIndex: 1,
        explanation: "Les FB (Function Block) possèdent un DB d'instance qui conserve les données entre les appels, contrairement aux FC.",
        order: 1
      },
      {
        question: "Quel bloc est le point d'entrée principal du programme cyclique ?",
        options: [
          "FB1",
          "FC1",
          "OB1",
          "DB1"
        ],
        correctIndex: 2,
        explanation: "OB1 (Main) est l'Organisation Block cyclique principal, exécuté en boucle par le CPU.",
        order: 2
      },
      {
        question: "Quelle est la différence entre un FB et un FC ?",
        options: [
          "FC est plus rapide",
          "FB possède une mémoire (DB d'instance), FC non",
          "FB ne peut pas avoir de paramètres",
          "Il n'y a pas de différence"
        ],
        correctIndex: 1,
        explanation: "Un FB possède un DB d'instance qui conserve les données entre les appels. Un FC ne conserve pas d'état.",
        order: 3
      },
      {
        question: "Pourquoi éviter de tout programmer dans OB1 ?",
        options: [
          "OB1 est limité en taille",
          "Pour structurer le code et faciliter la maintenance",
          "OB1 ne peut pas appeler d'autres blocs",
          "OB1 est réservé aux alarmes"
        ],
        correctIndex: 1,
        explanation: "Utiliser des FB et FC permet d'organiser le code, de le réutiliser et de faciliter la maintenance et les tests.",
        order: 4
      },
      {
        question: "Quel est l'avantage de réutiliser un FB avec plusieurs DB d'instance ?",
        options: [
          "Économie de mémoire",
          "Gérer plusieurs équipements similaires avec le même code",
          "Améliorer les performances",
          "Simplifier la compilation"
        ],
        correctIndex: 1,
        explanation: "Un même FB peut gérer plusieurs équipements similaires (ex: plusieurs moteurs) en utilisant des DB d'instance différents.",
        order: 5
      }
    ],
    // Lesson 3 quizzes (5 questions) - UDT
    [
      {
        question: "Que signifie UDT ?",
        options: [
          "Universal Data Type",
          "User Defined Type",
          "Unit Data Transfer",
          "Unified Design Tool"
        ],
        correctIndex: 1,
        explanation: "UDT signifie User Defined Type (Type Défini par l'Utilisateur), une structure de données personnalisée.",
        order: 1
      },
      {
        question: "Quel est l'avantage principal des UDT ?",
        options: [
          "Ils accélèrent l'exécution",
          "Ils permettent de standardiser et réutiliser des structures de données",
          "Ils réduisent la mémoire utilisée",
          "Ils sont obligatoires pour les FB"
        ],
        correctIndex: 1,
        explanation: "Les UDT permettent de définir une structure une fois et de la réutiliser pour plusieurs instances identiques.",
        order: 2
      },
      {
        question: "Comment accède-t-on à un champ d'un UDT dans un DB ?",
        options: [
          "DB.UDT.Champ",
          "DB.Instance.Champ",
          "UDT.Champ",
          "Champ.DB"
        ],
        correctIndex: 1,
        explanation: "On accède via DB.Instance.Champ, exemple : \"DB_Moteurs\".Moteur_Convoyeur.Vitesse_Cons.",
        order: 3
      },
      {
        question: "Quand utiliser un UDT plutôt que des variables séparées ?",
        options: [
          "Toujours",
          "Quand on a des données liées et répétées (plusieurs moteurs, stations...)",
          "Jamais, c'est déconseillé",
          "Uniquement pour les chaînes de caractères"
        ],
        correctIndex: 1,
        explanation: "Les UDT sont utiles quand on a des groupes de données liées qui se répètent pour plusieurs équipements similaires.",
        order: 4
      },
      {
        question: "Un UDT peut-il contenir d'autres UDT ?",
        options: [
          "Non, c'est interdit",
          "Oui, on peut imbriquer des UDT",
          "Seulement en SCL",
          "Seulement 2 niveaux"
        ],
        correctIndex: 1,
        explanation: "Les UDT peuvent contenir d'autres UDT, permettant de créer des structures de données hiérarchiques.",
        order: 5
      }
    ],
    // Lesson 4 quizzes (5 questions) - Accès optimisé
    [
      {
        question: "Quel type d'accès est par défaut sur S7-1500 ?",
        options: [
          "Accès standard",
          "Accès optimisé",
          "Accès direct",
          "Aucun par défaut"
        ],
        correctIndex: 1,
        explanation: "L'accès optimisé est le mode par défaut sur S7-1500, utilisant des adresses symboliques uniquement.",
        order: 1
      },
      {
        question: "Quel est l'avantage de l'accès optimisé ?",
        options: [
          "Compatible avec S7-300",
          "Meilleures performances et optimisation mémoire automatique",
          "Permet l'accès indirect",
          "Réduit la taille du code"
        ],
        correctIndex: 1,
        explanation: "L'accès optimisé offre de meilleures performances car le compilateur optimise automatiquement l'agencement mémoire.",
        order: 2
      },
      {
        question: "Quand utiliser l'accès standard plutôt qu'optimisé ?",
        options: [
          "Pour de meilleures performances",
          "Pour la communication avec des systèmes externes qui nécessitent des adresses fixes",
          "Toujours préférer le standard",
          "Pour les grandes structures"
        ],
        correctIndex: 1,
        explanation: "L'accès standard est nécessaire pour la communication avec des systèmes externes (OPC UA, IHM tierces) qui ont besoin d'adresses fixes.",
        order: 3
      },
      {
        question: "Comment accède-t-on à une variable en mode standard ?",
        options: [
          "Par nom symbolique uniquement",
          "Par adresse absolue (DB1.DBW10)",
          "Par pointeur uniquement",
          "Ce n'est pas possible"
        ],
        correctIndex: 1,
        explanation: "En mode standard, on peut utiliser des adresses absolues comme DB1.DBW10 (Word à l'adresse 10 du DB1).",
        order: 4
      },
      {
        question: "Où configure-t-on le type d'accès d'un DB ?",
        options: [
          "Dans le programme",
          "Dans les propriétés du DB",
          "Dans la configuration matérielle",
          "Ce n'est pas configurable"
        ],
        correctIndex: 1,
        explanation: "Le type d'accès (optimisé ou standard) se configure dans les propriétés du bloc de données dans TIA Portal.",
        order: 5
      }
    ],
    // Lesson 5 quizzes (5 questions) - FB et instances
    [
      {
        question: "Quelle est la différence entre FB et FC ?",
        options: [
          "FB est plus rapide",
          "FB a une mémoire (DB d'instance), FC n'en a pas",
          "FC ne peut pas avoir de paramètres",
          "Il n'y a pas de différence"
        ],
        correctIndex: 1,
        explanation: "Un FB (Function Block) possède un DB d'instance pour stocker ses variables statiques, contrairement à un FC.",
        order: 1
      },
      {
        question: "Que contient un DB d'instance ?",
        options: [
          "Le code du FB",
          "Les variables statiques et paramètres du FB",
          "Uniquement les entrées du FB",
          "La configuration matérielle"
        ],
        correctIndex: 1,
        explanation: "Le DB d'instance stocke les variables statiques (STAT), les paramètres d'entrée/sortie et leur valeur actuelle.",
        order: 2
      },
      {
        question: "Pourquoi utiliser plusieurs instances d'un même FB ?",
        options: [
          "Pour accélérer l'exécution",
          "Pour gérer plusieurs équipements similaires avec le même code",
          "Pour économiser de la mémoire",
          "C'est obligatoire"
        ],
        correctIndex: 1,
        explanation: "Un même FB peut contrôler plusieurs équipements similaires (moteurs, vérins) en utilisant des DB d'instance différents.",
        order: 3
      },
      {
        question: "Que sont les variables statiques dans un FB ?",
        options: [
          "Des constantes",
          "Des variables qui conservent leur valeur entre les appels",
          "Des variables d'entrée",
          "Des variables temporaires"
        ],
        correctIndex: 1,
        explanation: "Les variables statiques (VAR) conservent leur valeur entre les cycles d'appel du FB, stockées dans le DB d'instance.",
        order: 4
      },
      {
        question: "Qu'est-ce qu'une multi-instance ?",
        options: [
          "Appeler un FB plusieurs fois",
          "Plusieurs FB instanciés dans un seul DB parent",
          "Un FB avec plusieurs sorties",
          "Une erreur de programmation"
        ],
        correctIndex: 1,
        explanation: "La multi-instance permet d'instancier plusieurs FB dans un seul DB parent, simplifiant la structure.",
        order: 5
      }
    ],
    // Lesson 6 quizzes (5 questions) - Bonnes pratiques
    [
      {
        question: "Où devrait se trouver la logique principale du programme ?",
        options: [
          "Directement dans OB1",
          "Dans des FB et FC appelés depuis OB1",
          "Dans les DB",
          "Dans OB100"
        ],
        correctIndex: 1,
        explanation: "OB1 ne devrait contenir que des appels de blocs. La logique se place dans des FB et FC bien structurés.",
        order: 1
      },
      {
        question: "Quel préfixe recommandé pour une entrée numérique ?",
        options: [
          "Q_ ou S_",
          "I_ ou E_",
          "M_",
          "DB_"
        ],
        correctIndex: 1,
        explanation: "Les conventions recommandent I_ (Input) ou E_ (Entrée) pour identifier clairement les entrées numériques.",
        order: 2
      },
      {
        question: "Pourquoi éviter les valeurs en dur dans le code ?",
        options: [
          "C'est plus rapide",
          "Pour faciliter les modifications sans recompiler la logique",
          "C'est interdit",
          "Pour réduire la mémoire"
        ],
        correctIndex: 1,
        explanation: "Placer les valeurs dans des DB permet de les modifier facilement (via IHM, serveur Web) sans toucher au code.",
        order: 3
      },
      {
        question: "Combien de FB devrait-on créer idéalement par équipement ?",
        options: [
          "Aucun, tout dans OB1",
          "Un FB par type d'équipement",
          "Un FB pour tout le programme",
          "Autant que de lignes de code"
        ],
        correctIndex: 1,
        explanation: "Un FB par type d'équipement (moteur, vérin, station) permet une organisation claire et réutilisable.",
        order: 4
      },
      {
        question: "À quoi servent les dossiers dans l'arbre du projet ?",
        options: [
          "À rien, c'est décoratif",
          "À organiser les blocs par fonction ou partie de machine",
          "À accélérer la compilation",
          "À protéger le code"
        ],
        correctIndex: 1,
        explanation: "Les dossiers permettent d'organiser les blocs logiquement, facilitant la navigation dans les grands projets.",
        order: 5
      }
    ]
  ],
  quizTranslations: {
    en: {
      // Lesson 1 quiz translations
      "Quelle est la différence entre un DB global et un DB d'instance ?": {
        question: "What is the difference between a global DB and an instance DB?",
        options: ["There is no difference", "Global DB is accessible everywhere, instance DB is linked to an FB", "Instance DB is larger", "Global DB is automatic"],
        explanation: "A global DB stores data accessible throughout the program. An instance DB stores a specific FB's internal data."
      },
      "Comment accède-t-on à une variable 'Vitesse' dans le DB10 ?": {
        question: "How do you access a 'Speed' variable in DB10?",
        options: ["Speed", "DB10.Speed", "%DB10.Speed", "#Speed"],
        explanation: "You access DB variables with the syntax DB<number>.<variable>, for example DB10.Speed."
      },
      "Qu'est-ce qu'un DB de recette ?": {
        question: "What is a recipe DB?",
        options: ["A DB for calculations", "A DB for storing production parameters", "A DB for alarms", "A DB for communication"],
        explanation: "A recipe DB stores production parameters that can be modified without touching the program."
      },
      "Qu'est-ce que l'accès optimisé aux DB dans le S7-1500 ?": {
        question: "What is optimized DB access in the S7-1500?",
        options: ["A data compression mode", "A higher performance access mode without fixed addresses", "An automatic backup mode", "An encryption mode"],
        explanation: "Optimized access improves performance by automatically organizing data without fixed addresses."
      },
      "Quel type de données peut-on stocker dans un DB ?": {
        question: "What types of data can be stored in a DB?",
        options: ["Only Bool", "Only numbers", "All types: Bool, Int, Real, String, Time, etc.", "Only arrays"],
        explanation: "DBs can store all data types: Bool, Int, Real, String, Time, Array, Struct, etc."
      },
      // Lesson 2 quiz translations
      "Quel bloc possède une mémoire (DB d'instance) ?": {
        question: "Which block has memory (instance DB)?",
        options: ["FC (Function)", "FB (Function Block)", "OB (Organisation Block)", "No block"],
        explanation: "FB (Function Block) has an instance DB that retains data between calls, unlike FC."
      },
      "Quel bloc est le point d'entrée principal du programme cyclique ?": {
        question: "Which block is the main entry point for the cyclic program?",
        options: ["FB1", "FC1", "OB1", "DB1"],
        explanation: "OB1 (Main) is the main cyclic Organisation Block, executed in a loop by the CPU."
      },
      "Quelle est la différence entre un FB et un FC ?": {
        question: "What is the difference between an FB and an FC?",
        options: ["FC is faster", "FB has memory (instance DB), FC does not", "FB cannot have parameters", "There is no difference"],
        explanation: "An FB has an instance DB that retains data between calls. An FC does not retain state."
      },
      "Pourquoi éviter de tout programmer dans OB1 ?": {
        question: "Why avoid programming everything in OB1?",
        options: ["OB1 is size limited", "To structure code and facilitate maintenance", "OB1 cannot call other blocks", "OB1 is reserved for alarms"],
        explanation: "Using FB and FC allows organizing code, reusing it, and facilitating maintenance and testing."
      },
      "Quel est l'avantage de réutiliser un FB avec plusieurs DB d'instance ?": {
        question: "What is the advantage of reusing an FB with multiple instance DBs?",
        options: ["Memory savings", "Manage multiple similar equipment with the same code", "Improve performance", "Simplify compilation"],
        explanation: "The same FB can manage multiple similar equipment (e.g., multiple motors) using different instance DBs."
      },
      // Lesson 3 quiz translations - UDT
      "Que signifie UDT ?": {
        question: "What does UDT stand for?",
        options: ["Universal Data Type", "User Defined Type", "Unit Data Transfer", "Unified Design Tool"],
        explanation: "UDT stands for User Defined Type, a custom data structure."
      },
      "Quel est l'avantage principal des UDT ?": {
        question: "What is the main advantage of UDTs?",
        options: ["They speed up execution", "They allow standardizing and reusing data structures", "They reduce memory usage", "They are required for FBs"],
        explanation: "UDTs allow defining a structure once and reusing it for multiple identical instances."
      },
      "Comment accède-t-on à un champ d'un UDT dans un DB ?": {
        question: "How do you access a UDT field in a DB?",
        options: ["DB.UDT.Field", "DB.Instance.Field", "UDT.Field", "Field.DB"],
        explanation: "Access is via DB.Instance.Field, example: \"DB_Motors\".Conveyor_Motor.Speed_Setpoint."
      },
      "Quand utiliser un UDT plutôt que des variables séparées ?": {
        question: "When to use a UDT rather than separate variables?",
        options: ["Always", "When you have linked and repeated data (multiple motors, stations...)", "Never, it's discouraged", "Only for character strings"],
        explanation: "UDTs are useful when you have groups of linked data that repeat for multiple similar equipment."
      },
      "Un UDT peut-il contenir d'autres UDT ?": {
        question: "Can a UDT contain other UDTs?",
        options: ["No, it's forbidden", "Yes, you can nest UDTs", "Only in SCL", "Only 2 levels"],
        explanation: "UDTs can contain other UDTs, allowing creation of hierarchical data structures."
      },
      // Lesson 4 quiz translations - Optimized access
      "Quel type d'accès est par défaut sur S7-1500 ?": {
        question: "What is the default access type on S7-1500?",
        options: ["Standard access", "Optimized access", "Direct access", "None by default"],
        explanation: "Optimized access is the default mode on S7-1500, using symbolic addresses only."
      },
      "Quel est l'avantage de l'accès optimisé ?": {
        question: "What is the advantage of optimized access?",
        options: ["Compatible with S7-300", "Better performance and automatic memory optimization", "Allows indirect access", "Reduces code size"],
        explanation: "Optimized access offers better performance because the compiler automatically optimizes memory layout."
      },
      "Quand utiliser l'accès standard plutôt qu'optimisé ?": {
        question: "When to use standard access rather than optimized?",
        options: ["For better performance", "For communication with external systems requiring fixed addresses", "Always prefer standard", "For large structures"],
        explanation: "Standard access is necessary for communication with external systems (OPC UA, third-party HMIs) that need fixed addresses."
      },
      "Comment accède-t-on à une variable en mode standard ?": {
        question: "How do you access a variable in standard mode?",
        options: ["By symbolic name only", "By absolute address (DB1.DBW10)", "By pointer only", "It's not possible"],
        explanation: "In standard mode, you can use absolute addresses like DB1.DBW10 (Word at address 10 of DB1)."
      },
      "Où configure-t-on le type d'accès d'un DB ?": {
        question: "Where do you configure a DB's access type?",
        options: ["In the program", "In the DB properties", "In the hardware configuration", "It's not configurable"],
        explanation: "The access type (optimized or standard) is configured in the data block properties in TIA Portal."
      },
      // Lesson 5 quiz translations - FB and instances
      "Quelle est la différence entre FB et FC ?": {
        question: "What is the difference between FB and FC?",
        options: ["FB is faster", "FB has memory (instance DB), FC does not", "FC cannot have parameters", "There is no difference"],
        explanation: "An FB (Function Block) has an instance DB to store its static variables, unlike an FC."
      },
      "Que contient un DB d'instance ?": {
        question: "What does an instance DB contain?",
        options: ["The FB code", "The static variables and FB parameters", "Only the FB inputs", "The hardware configuration"],
        explanation: "The instance DB stores static variables (STAT), input/output parameters and their current values."
      },
      "Pourquoi utiliser plusieurs instances d'un même FB ?": {
        question: "Why use multiple instances of the same FB?",
        options: ["To speed up execution", "To manage multiple similar equipment with the same code", "To save memory", "It's mandatory"],
        explanation: "The same FB can control multiple similar equipment (motors, cylinders) using different instance DBs."
      },
      "Que sont les variables statiques dans un FB ?": {
        question: "What are static variables in an FB?",
        options: ["Constants", "Variables that retain their value between calls", "Input variables", "Temporary variables"],
        explanation: "Static variables (VAR) retain their value between FB call cycles, stored in the instance DB."
      },
      "Qu'est-ce qu'une multi-instance ?": {
        question: "What is a multi-instance?",
        options: ["Calling an FB multiple times", "Multiple FBs instantiated in a single parent DB", "An FB with multiple outputs", "A programming error"],
        explanation: "Multi-instance allows instantiating multiple FBs in a single parent DB, simplifying the structure."
      },
      // Lesson 6 quiz translations - Best practices
      "Où devrait se trouver la logique principale du programme ?": {
        question: "Where should the main program logic be located?",
        options: ["Directly in OB1", "In FBs and FCs called from OB1", "In the DBs", "In OB100"],
        explanation: "OB1 should only contain block calls. Logic is placed in well-structured FBs and FCs."
      },
      "Quel préfixe recommandé pour une entrée numérique ?": {
        question: "What is the recommended prefix for a digital input?",
        options: ["Q_ or S_", "I_ or E_", "M_", "DB_"],
        explanation: "Conventions recommend I_ (Input) or E_ (Entry) to clearly identify digital inputs."
      },
      "Pourquoi éviter les valeurs en dur dans le code ?": {
        question: "Why avoid hard-coded values in the code?",
        options: ["It's faster", "To facilitate modifications without recompiling logic", "It's forbidden", "To reduce memory"],
        explanation: "Placing values in DBs allows easy modification (via HMI, web server) without touching the code."
      },
      "Combien de FB devrait-on créer idéalement par équipement ?": {
        question: "How many FBs should ideally be created per equipment?",
        options: ["None, everything in OB1", "One FB per equipment type", "One FB for the whole program", "As many as lines of code"],
        explanation: "One FB per equipment type (motor, cylinder, station) allows clear and reusable organization."
      },
      "À quoi servent les dossiers dans l'arbre du projet ?": {
        question: "What are folders in the project tree for?",
        options: ["Nothing, it's decorative", "To organize blocks by function or machine part", "To speed up compilation", "To protect code"],
        explanation: "Folders allow organizing blocks logically, facilitating navigation in large projects."
      }
    },
    es: {
      // Lesson 1 quiz translations
      "Quelle est la différence entre un DB global et un DB d'instance ?": {
        question: "¿Cuál es la diferencia entre un DB global y un DB de instancia?",
        options: ["No hay diferencia", "El DB global es accesible en todas partes, el DB de instancia está vinculado a un FB", "El DB de instancia es más grande", "El DB global es automático"],
        explanation: "Un DB global almacena datos accesibles en todo el programa. Un DB de instancia almacena los datos internos de un FB específico."
      },
      "Comment accède-t-on à une variable 'Vitesse' dans le DB10 ?": {
        question: "¿Cómo se accede a una variable 'Velocidad' en DB10?",
        options: ["Velocidad", "DB10.Velocidad", "%DB10.Velocidad", "#Velocidad"],
        explanation: "Se accede a las variables de un DB con la sintaxis DB<número>.<variable>, por ejemplo DB10.Velocidad."
      },
      "Qu'est-ce qu'un DB de recette ?": {
        question: "¿Qué es un DB de receta?",
        options: ["Un DB para cálculos", "Un DB para almacenar parámetros de producción", "Un DB para alarmas", "Un DB para comunicación"],
        explanation: "Un DB de receta almacena parámetros de producción que pueden modificarse sin tocar el programa."
      },
      "Qu'est-ce que l'accès optimisé aux DB dans le S7-1500 ?": {
        question: "¿Qué es el acceso optimizado a DB en el S7-1500?",
        options: ["Un modo de compresión de datos", "Un modo de acceso de mayor rendimiento sin direcciones fijas", "Un modo de copia de seguridad automática", "Un modo de encriptación"],
        explanation: "El acceso optimizado mejora el rendimiento organizando automáticamente los datos sin direcciones fijas."
      },
      "Quel type de données peut-on stocker dans un DB ?": {
        question: "¿Qué tipos de datos se pueden almacenar en un DB?",
        options: ["Solo Bool", "Solo números", "Todos los tipos: Bool, Int, Real, String, Time, etc.", "Solo arrays"],
        explanation: "Los DB pueden almacenar todo tipo de datos: Bool, Int, Real, String, Time, Array, Struct, etc."
      },
      // Lesson 2 quiz translations
      "Quel bloc possède une mémoire (DB d'instance) ?": {
        question: "¿Qué bloque tiene memoria (DB de instancia)?",
        options: ["FC (Función)", "FB (Bloque de Función)", "OB (Bloque de Organización)", "Ningún bloque"],
        explanation: "El FB (Bloque de Función) tiene un DB de instancia que retiene datos entre llamadas, a diferencia del FC."
      },
      "Quel bloc est le point d'entrée principal du programme cyclique ?": {
        question: "¿Qué bloque es el punto de entrada principal del programa cíclico?",
        options: ["FB1", "FC1", "OB1", "DB1"],
        explanation: "OB1 (Main) es el Bloque de Organización cíclico principal, ejecutado en bucle por la CPU."
      },
      "Quelle est la différence entre un FB et un FC ?": {
        question: "¿Cuál es la diferencia entre un FB y un FC?",
        options: ["FC es más rápido", "FB tiene memoria (DB de instancia), FC no", "FB no puede tener parámetros", "No hay diferencia"],
        explanation: "Un FB tiene un DB de instancia que retiene datos entre llamadas. Un FC no retiene estado."
      },
      "Pourquoi éviter de tout programmer dans OB1 ?": {
        question: "¿Por qué evitar programar todo en OB1?",
        options: ["OB1 tiene tamaño limitado", "Para estructurar el código y facilitar el mantenimiento", "OB1 no puede llamar a otros bloques", "OB1 está reservado para alarmas"],
        explanation: "Usar FB y FC permite organizar el código, reutilizarlo y facilitar el mantenimiento y las pruebas."
      },
      "Quel est l'avantage de réutiliser un FB avec plusieurs DB d'instance ?": {
        question: "¿Cuál es la ventaja de reutilizar un FB con múltiples DB de instancia?",
        options: ["Ahorro de memoria", "Gestionar múltiples equipos similares con el mismo código", "Mejorar el rendimiento", "Simplificar la compilación"],
        explanation: "El mismo FB puede gestionar múltiples equipos similares (ej: varios motores) usando diferentes DB de instancia."
      },
      // Lesson 3 quiz translations - UDT
      "Que signifie UDT ?": {
        question: "¿Qué significa UDT?",
        options: ["Universal Data Type", "User Defined Type", "Unit Data Transfer", "Unified Design Tool"],
        explanation: "UDT significa User Defined Type (Tipo Definido por Usuario), una estructura de datos personalizada."
      },
      "Quel est l'avantage principal des UDT ?": {
        question: "¿Cuál es la principal ventaja de los UDT?",
        options: ["Aceleran la ejecución", "Permiten estandarizar y reutilizar estructuras de datos", "Reducen el uso de memoria", "Son obligatorios para los FB"],
        explanation: "Los UDT permiten definir una estructura una vez y reutilizarla para múltiples instancias idénticas."
      },
      "Comment accède-t-on à un champ d'un UDT dans un DB ?": {
        question: "¿Cómo se accede a un campo de un UDT en un DB?",
        options: ["DB.UDT.Campo", "DB.Instancia.Campo", "UDT.Campo", "Campo.DB"],
        explanation: "Se accede mediante DB.Instancia.Campo, ejemplo: \"DB_Motores\".Motor_Cinta.Velocidad_Cons."
      },
      "Quand utiliser un UDT plutôt que des variables séparées ?": {
        question: "¿Cuándo usar un UDT en lugar de variables separadas?",
        options: ["Siempre", "Cuando hay datos vinculados y repetidos (varios motores, estaciones...)", "Nunca, está desaconsejado", "Solo para cadenas de caracteres"],
        explanation: "Los UDT son útiles cuando hay grupos de datos vinculados que se repiten para varios equipos similares."
      },
      "Un UDT peut-il contenir d'autres UDT ?": {
        question: "¿Puede un UDT contener otros UDT?",
        options: ["No, está prohibido", "Sí, se pueden anidar UDT", "Solo en SCL", "Solo 2 niveles"],
        explanation: "Los UDT pueden contener otros UDT, permitiendo crear estructuras de datos jerárquicas."
      },
      // Lesson 4 quiz translations - Optimized access
      "Quel type d'accès est par défaut sur S7-1500 ?": {
        question: "¿Qué tipo de acceso es el predeterminado en S7-1500?",
        options: ["Acceso estándar", "Acceso optimizado", "Acceso directo", "Ninguno por defecto"],
        explanation: "El acceso optimizado es el modo predeterminado en S7-1500, usando solo direcciones simbólicas."
      },
      "Quel est l'avantage de l'accès optimisé ?": {
        question: "¿Cuál es la ventaja del acceso optimizado?",
        options: ["Compatible con S7-300", "Mejor rendimiento y optimización automática de memoria", "Permite acceso indirecto", "Reduce el tamaño del código"],
        explanation: "El acceso optimizado ofrece mejor rendimiento porque el compilador optimiza automáticamente la disposición de memoria."
      },
      "Quand utiliser l'accès standard plutôt qu'optimisé ?": {
        question: "¿Cuándo usar acceso estándar en lugar de optimizado?",
        options: ["Para mejor rendimiento", "Para comunicación con sistemas externos que requieren direcciones fijas", "Siempre preferir estándar", "Para estructuras grandes"],
        explanation: "El acceso estándar es necesario para comunicación con sistemas externos (OPC UA, HMI de terceros) que necesitan direcciones fijas."
      },
      "Comment accède-t-on à une variable en mode standard ?": {
        question: "¿Cómo se accede a una variable en modo estándar?",
        options: ["Solo por nombre simbólico", "Por dirección absoluta (DB1.DBW10)", "Solo por puntero", "No es posible"],
        explanation: "En modo estándar, se pueden usar direcciones absolutas como DB1.DBW10 (Word en dirección 10 del DB1)."
      },
      "Où configure-t-on le type d'accès d'un DB ?": {
        question: "¿Dónde se configura el tipo de acceso de un DB?",
        options: ["En el programa", "En las propiedades del DB", "En la configuración de hardware", "No es configurable"],
        explanation: "El tipo de acceso (optimizado o estándar) se configura en las propiedades del bloque de datos en TIA Portal."
      },
      // Lesson 5 quiz translations - FB and instances
      "Quelle est la différence entre FB et FC ?": {
        question: "¿Cuál es la diferencia entre FB y FC?",
        options: ["FB es más rápido", "FB tiene memoria (DB de instancia), FC no", "FC no puede tener parámetros", "No hay diferencia"],
        explanation: "Un FB (Bloque de Función) tiene un DB de instancia para almacenar sus variables estáticas, a diferencia de un FC."
      },
      "Que contient un DB d'instance ?": {
        question: "¿Qué contiene un DB de instancia?",
        options: ["El código del FB", "Las variables estáticas y parámetros del FB", "Solo las entradas del FB", "La configuración de hardware"],
        explanation: "El DB de instancia almacena las variables estáticas (STAT), los parámetros de entrada/salida y sus valores actuales."
      },
      "Pourquoi utiliser plusieurs instances d'un même FB ?": {
        question: "¿Por qué usar múltiples instancias del mismo FB?",
        options: ["Para acelerar la ejecución", "Para gestionar múltiples equipos similares con el mismo código", "Para ahorrar memoria", "Es obligatorio"],
        explanation: "El mismo FB puede controlar múltiples equipos similares (motores, cilindros) usando diferentes DB de instancia."
      },
      "Que sont les variables statiques dans un FB ?": {
        question: "¿Qué son las variables estáticas en un FB?",
        options: ["Constantes", "Variables que conservan su valor entre llamadas", "Variables de entrada", "Variables temporales"],
        explanation: "Las variables estáticas (VAR) conservan su valor entre ciclos de llamada del FB, almacenadas en el DB de instancia."
      },
      "Qu'est-ce qu'une multi-instance ?": {
        question: "¿Qué es una multi-instancia?",
        options: ["Llamar un FB varias veces", "Múltiples FB instanciados en un solo DB padre", "Un FB con múltiples salidas", "Un error de programación"],
        explanation: "La multi-instancia permite instanciar múltiples FB en un solo DB padre, simplificando la estructura."
      },
      // Lesson 6 quiz translations - Best practices
      "Où devrait se trouver la logique principale du programme ?": {
        question: "¿Dónde debería estar la lógica principal del programa?",
        options: ["Directamente en OB1", "En FBs y FCs llamados desde OB1", "En los DBs", "En OB100"],
        explanation: "OB1 solo debería contener llamadas a bloques. La lógica se coloca en FBs y FCs bien estructurados."
      },
      "Quel préfixe recommandé pour une entrée numérique ?": {
        question: "¿Qué prefijo se recomienda para una entrada digital?",
        options: ["Q_ o S_", "I_ o E_", "M_", "DB_"],
        explanation: "Las convenciones recomiendan I_ (Input) o E_ (Entrada) para identificar claramente las entradas digitales."
      },
      "Pourquoi éviter les valeurs en dur dans le code ?": {
        question: "¿Por qué evitar valores codificados en el código?",
        options: ["Es más rápido", "Para facilitar modificaciones sin recompilar la lógica", "Está prohibido", "Para reducir memoria"],
        explanation: "Colocar valores en DBs permite modificarlos fácilmente (vía HMI, servidor web) sin tocar el código."
      },
      "Combien de FB devrait-on créer idéalement par équipement ?": {
        question: "¿Cuántos FB se deberían crear idealmente por equipo?",
        options: ["Ninguno, todo en OB1", "Un FB por tipo de equipo", "Un FB para todo el programa", "Tantos como líneas de código"],
        explanation: "Un FB por tipo de equipo (motor, cilindro, estación) permite una organización clara y reutilizable."
      },
      "À quoi servent les dossiers dans l'arbre du projet ?": {
        question: "¿Para qué sirven las carpetas en el árbol del proyecto?",
        options: ["Para nada, es decorativo", "Para organizar bloques por función o parte de máquina", "Para acelerar la compilación", "Para proteger el código"],
        explanation: "Las carpetas permiten organizar los bloques lógicamente, facilitando la navegación en proyectos grandes."
      }
    }
  }
}
