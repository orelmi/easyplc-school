import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.quizAttempt.deleteMany()
  await prisma.userReward.deleteMany()
  await prisma.lessonProgress.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.reward.deleteMany()
  await prisma.user.deleteMany()

  // Create Modules
  const module1 = await prisma.module.create({
    data: {
      title: "Introduction à l'automatisme",
      description: "Découvrez les bases de l'automatisme industriel et les automates programmables",
      order: 1,
      icon: "🔌",
      color: "#3b82f6",
      isLocked: false,
      requiredXp: 0,
    },
  })

  const module2 = await prisma.module.create({
    data: {
      title: "Logique combinatoire",
      description: "Maîtrisez les portes logiques ET, OU, NON et leurs applications",
      order: 2,
      icon: "🔀",
      color: "#22c55e",
      isLocked: true,
      requiredXp: 200,
    },
  })

  const module3 = await prisma.module.create({
    data: {
      title: "Le langage LADDER",
      description: "Apprenez à programmer en langage LADDER (schéma à contacts)",
      order: 3,
      icon: "🪜",
      color: "#f59e0b",
      isLocked: true,
      requiredXp: 500,
    },
  })

  const module4 = await prisma.module.create({
    data: {
      title: "Capteurs et actionneurs",
      description: "Comprenez les capteurs, actionneurs et leur interfaçage",
      order: 4,
      icon: "📡",
      color: "#ef4444",
      isLocked: true,
      requiredXp: 900,
    },
  })

  const module5 = await prisma.module.create({
    data: {
      title: "Grafcet",
      description: "Modélisez des systèmes séquentiels avec le GRAFCET",
      order: 5,
      icon: "📊",
      color: "#8b5cf6",
      isLocked: true,
      requiredXp: 1400,
    },
  })

  // Create Lessons for Module 1
  const lesson1_1 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Qu'est-ce qu'un automate programmable ?",
      description: "Découvrez ce qu'est un PLC et son rôle dans l'industrie",
      order: 1,
      xpReward: 50,
      duration: 10,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Bienvenue dans le monde de l'automatisme !\n\nUn **automate programmable industriel** (API) ou **PLC** (Programmable Logic Controller) est un dispositif électronique programmable destiné à la commande de processus industriels."
          },
          {
            type: "info",
            content: "Le premier automate programmable a été inventé en 1968 par Dick Morley pour General Motors."
          },
          {
            type: "text",
            content: "## Pourquoi utiliser un automate ?\n\n- **Flexibilité** : On peut modifier le programme sans changer le câblage\n- **Fiabilité** : Conçu pour fonctionner 24h/24 en environnement industriel\n- **Diagnostic** : Détection et signalement des pannes\n- **Communication** : Échange de données avec d'autres systèmes"
          },
          {
            type: "image",
            url: "/images/plc-structure.svg",
            caption: "Structure d'un automate programmable"
          },
          {
            type: "text",
            content: "## Les composants principaux\n\n1. **Unité centrale (CPU)** : Le cerveau qui exécute le programme\n2. **Mémoire** : Stocke le programme et les données\n3. **Entrées** : Reçoit les informations des capteurs\n4. **Sorties** : Commande les actionneurs\n5. **Alimentation** : Fournit l'énergie électrique"
          }
        ]
      }),
    },
  })

  const lesson1_2 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Les entrées et sorties (E/S)",
      description: "Comprenez le rôle des entrées et sorties dans un automate",
      order: 2,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Entrées et Sorties\n\nLes entrées et sorties (E/S ou I/O en anglais) sont l'interface entre l'automate et le monde physique."
          },
          {
            type: "text",
            content: "## Les Entrées (Inputs)\n\nLes entrées reçoivent les informations provenant des **capteurs** :\n\n- Boutons poussoirs\n- Détecteurs de présence\n- Capteurs de température\n- Fins de course\n- Etc."
          },
          {
            type: "warning",
            content: "Les entrées TOR (Tout Ou Rien) ne connaissent que deux états : 0 (faux) ou 1 (vrai)."
          },
          {
            type: "text",
            content: "## Les Sorties (Outputs)\n\nLes sorties commandent les **actionneurs** :\n\n- Voyants lumineux\n- Contacteurs\n- Électrovannes\n- Variateurs de vitesse\n- Etc."
          },
          {
            type: "text",
            content: "## Types d'E/S\n\n| Type | Description | Exemple |\n|------|-------------|----------|\n| TOR | Tout Ou Rien (0 ou 1) | Bouton, voyant |\n| Analogique | Valeur continue | Température, pression |\n| Numérique | Communication série | Codeur, afficheur |"
          }
        ]
      }),
    },
  })

  const lesson1_3 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Le cycle automate",
      description: "Découvrez comment fonctionne le cycle de l'automate",
      order: 3,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le Cycle Automate\n\nL'automate fonctionne en exécutant un **cycle répétitif** composé de plusieurs phases."
          },
          {
            type: "text",
            content: "## Les phases du cycle\n\n### 1. Lecture des entrées\nL'automate lit l'état de toutes les entrées et stocke ces valeurs en mémoire.\n\n### 2. Exécution du programme\nLe CPU exécute le programme utilisateur ligne par ligne, de haut en bas.\n\n### 3. Mise à jour des sorties\nLes nouvelles valeurs des sorties sont envoyées aux modules de sortie.\n\n### 4. Gestion système\nCommunications, diagnostics, etc."
          },
          {
            type: "info",
            content: "Le temps de cycle typique est de quelques millisecondes (5-20 ms). Plus le programme est long, plus le cycle est long."
          },
          {
            type: "text",
            content: "## Importance du cycle\n\n- Un cycle rapide permet de réagir rapidement aux événements\n- Le programme doit être optimisé pour éviter les cycles trop longs\n- Certains automates permettent des tâches rapides pour les événements critiques"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 2
  const lesson2_1 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "La porte ET (AND)",
      description: "Apprenez la fonction logique ET et ses applications",
      order: 1,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique ET (AND)\n\nLa porte ET est une fonction logique fondamentale. La sortie est vraie (1) **uniquement** si toutes les entrées sont vraies (1)."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | B | A ET B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : A · B ou A ∧ B\n- En programmation : A AND B\n- En LADDER : Contacts en série"
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nUne machine ne démarre que si :\n- Le bouton START est appuyé **ET**\n- Le capot de sécurité est fermé **ET**\n- L'arrêt d'urgence n'est pas enclenché\n\n➡️ C'est une fonction ET à 3 entrées !"
          }
        ]
      }),
    },
  })

  const lesson2_2 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "La porte OU (OR)",
      description: "Apprenez la fonction logique OU et ses applications",
      order: 2,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique OU (OR)\n\nLa porte OU donne une sortie vraie (1) si **au moins une** des entrées est vraie (1)."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | B | A OU B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : A + B ou A ∨ B\n- En programmation : A OR B\n- En LADDER : Contacts en parallèle"
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nUn voyant d'alarme s'allume si :\n- La température est trop haute **OU**\n- La pression est trop haute **OU**\n- Le niveau est trop bas\n\n➡️ C'est une fonction OU à 3 entrées !"
          }
        ]
      }),
    },
  })

  const lesson2_3 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "La porte NON (NOT)",
      description: "Apprenez la fonction logique NON (inversion)",
      order: 3,
      xpReward: 50,
      duration: 10,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique NON (NOT)\n\nLa porte NON **inverse** l'état de l'entrée. Si l'entrée est 0, la sortie est 1 et vice versa."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | NON A |\n|---|-------|\n| 0 | 1 |\n| 1 | 0 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : Ā ou ¬A\n- En programmation : NOT A\n- En LADDER : Contact normalement fermé (NF)"
          },
          {
            type: "info",
            content: "Un contact normalement fermé (NF) est un contact qui laisse passer le courant quand il n'est PAS actionné."
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nLe voyant \"MACHINE ARRÊTÉE\" est allumé quand le moteur n'est PAS en marche.\n\n➡️ Voyant = NON(Moteur_en_marche)"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 3
  const lesson3_1 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Introduction au langage LADDER",
      description: "Découvrez le langage de programmation graphique LADDER",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le Langage LADDER\n\nLe **LADDER** (échelle en anglais) est un langage graphique qui ressemble aux schémas électriques à relais."
          },
          {
            type: "text",
            content: "## Pourquoi LADDER ?\n\n- Facile à comprendre pour les électriciens\n- Représentation visuelle intuitive\n- Standard industriel (IEC 61131-3)\n- Idéal pour la logique combinatoire"
          },
          {
            type: "text",
            content: "## Structure d'un programme LADDER\n\n```\n   |     Contact     Contact      Bobine    |\n   |----[ ]----------[ ]-----------( )-----|\n   |     I0.0        I0.1          Q0.0     |\n```\n\n- Le courant \"circule\" de gauche à droite\n- Les contacts laissent passer ou bloquent le courant\n- Les bobines sont activées si le courant les atteint"
          },
          {
            type: "text",
            content: "## Éléments de base\n\n| Symbole | Nom | Description |\n|---------|-----|-------------|\n| --[ ]-- | Contact NO | Passant si l'entrée = 1 |\n| --[/]-- | Contact NF | Passant si l'entrée = 0 |\n| --( )-- | Bobine | Activée si courant arrive |\n| --(/)-- | Bobine inversée | Activée si pas de courant |"
          }
        ]
      }),
    },
  })

  const lesson3_2 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Contacts et bobines",
      description: "Maîtrisez les contacts NO, NF et les différents types de bobines",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Contacts et Bobines en LADDER\n\nLes contacts et bobines sont les éléments fondamentaux de la programmation LADDER."
          },
          {
            type: "text",
            content: "## Types de contacts\n\n### Contact Normalement Ouvert (NO)\n```\n--[ ]--\n```\nLaisse passer le courant quand la variable associée est à 1.\n\n### Contact Normalement Fermé (NF)\n```\n--[/]--\n```\nLaisse passer le courant quand la variable associée est à 0."
          },
          {
            type: "text",
            content: "## Types de bobines\n\n### Bobine simple\n```\n--( )--\n```\nS'active quand le courant arrive, se désactive sinon.\n\n### Bobine SET (mémorisation)\n```\n--(S)--\n```\nS'active quand le courant arrive et **reste active**.\n\n### Bobine RESET\n```\n--(R)--\n```\nDésactive une bobine SET."
          },
          {
            type: "warning",
            content: "Attention : Une bobine SET reste active même si la condition n'est plus vraie. Il faut utiliser RESET pour la désactiver !"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 4
  const lesson4_1 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
      title: "Les capteurs TOR",
      description: "Découvrez les différents types de capteurs Tout Ou Rien",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Capteurs TOR\n\nLes capteurs **TOR** (Tout Ou Rien) délivrent un signal binaire : 0 ou 1."
          },
          {
            type: "text",
            content: "## Types de capteurs TOR\n\n### Capteurs mécaniques\n- **Fin de course** : Détecte une position extrême\n- **Bouton poussoir** : Actionné manuellement\n- **Interrupteur de position** : Détecte un passage\n\n### Capteurs de proximité\n- **Inductif** : Détecte les métaux (sans contact)\n- **Capacitif** : Détecte tout matériau\n- **Optique** : Utilise un faisceau lumineux"
          },
          {
            type: "text",
            content: "## Caractéristiques importantes\n\n- **Portée** : Distance de détection\n- **Fréquence de commutation** : Nombre de détections par seconde\n- **Type de sortie** : PNP ou NPN\n- **Indice de protection** : IP67, IP69K, etc."
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 5
  const lesson5_1 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: "Introduction au GRAFCET",
      description: "Découvrez le GRAFCET pour modéliser les systèmes séquentiels",
      order: 1,
      xpReward: 80,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le GRAFCET\n\nLe **GRAFCET** (Graphe Fonctionnel de Commande Étape-Transition) est un outil de modélisation des systèmes automatisés séquentiels."
          },
          {
            type: "text",
            content: "## Éléments de base\n\n### Les étapes\nReprésentées par des carrés numérotés. Chaque étape correspond à un état du système.\n\n### Les transitions\nConditions logiques entre les étapes. Quand la condition est vraie, on passe à l'étape suivante.\n\n### Les actions\nCe que fait le système dans chaque étape (activer un moteur, ouvrir une vanne, etc.)."
          },
          {
            type: "text",
            content: "## Règles d'évolution\n\n1. L'étape initiale est active au départ\n2. Une transition est franchissable si l'étape précédente est active ET la condition est vraie\n3. Le franchissement désactive l'étape précédente et active la suivante\n4. Plusieurs transitions simultanées sont possibles (divergence/convergence)"
          },
          {
            type: "info",
            content: "Le GRAFCET est normalisé (NF C 03-190) et largement utilisé dans l'industrie française."
          }
        ]
      }),
    },
  })

  // Create Quizzes
  await prisma.quiz.createMany({
    data: [
      // Quiz Module 1 - Lesson 1
      {
        lessonId: lesson1_1.id,
        question: "Que signifie l'acronyme PLC ?",
        options: JSON.stringify([
          "Programmable Logic Controller",
          "Power Line Carrier",
          "Programmable Linear Computer",
          "Process Logic Control"
        ]),
        correctIndex: 0,
        explanation: "PLC signifie Programmable Logic Controller, traduit en français par Automate Programmable Industriel (API).",
        order: 1,
      },
      {
        lessonId: lesson1_1.id,
        question: "Quel composant de l'automate exécute le programme ?",
        options: JSON.stringify([
          "Les entrées",
          "L'alimentation",
          "L'unité centrale (CPU)",
          "Les sorties"
        ]),
        correctIndex: 2,
        explanation: "L'unité centrale (CPU) est le cerveau de l'automate qui exécute le programme utilisateur.",
        order: 2,
      },
      // Quiz Module 1 - Lesson 2
      {
        lessonId: lesson1_2.id,
        question: "Qu'est-ce qu'une entrée TOR ?",
        options: JSON.stringify([
          "Une entrée qui mesure une température",
          "Une entrée binaire (0 ou 1)",
          "Une entrée de communication",
          "Une entrée haute fréquence"
        ]),
        correctIndex: 1,
        explanation: "TOR signifie Tout Ou Rien : l'entrée ne peut avoir que deux états, 0 (faux) ou 1 (vrai).",
        order: 1,
      },
      {
        lessonId: lesson1_2.id,
        question: "Les sorties de l'automate commandent :",
        options: JSON.stringify([
          "Les capteurs",
          "Les actionneurs",
          "L'alimentation",
          "La mémoire"
        ]),
        correctIndex: 1,
        explanation: "Les sorties commandent les actionneurs (moteurs, vannes, voyants, etc.) qui agissent sur le processus.",
        order: 2,
      },
      // Quiz Module 2 - Lesson 1
      {
        lessonId: lesson2_1.id,
        question: "Quelle est la sortie de A ET B si A=1 et B=0 ?",
        options: JSON.stringify(["0", "1", "Indéfini", "Erreur"]),
        correctIndex: 0,
        explanation: "La porte ET nécessite que TOUTES les entrées soient à 1 pour avoir une sortie à 1. Ici B=0, donc la sortie est 0.",
        order: 1,
      },
      {
        lessonId: lesson2_1.id,
        question: "En LADDER, comment représente-t-on une fonction ET ?",
        options: JSON.stringify([
          "Contacts en parallèle",
          "Contacts en série",
          "Une seule bobine",
          "Un temporisateur"
        ]),
        correctIndex: 1,
        explanation: "En LADDER, les contacts en série représentent une fonction ET : le courant ne passe que si tous les contacts sont fermés.",
        order: 2,
      },
      // Quiz Module 2 - Lesson 2
      {
        lessonId: lesson2_2.id,
        question: "Quelle est la sortie de A OU B si A=0 et B=1 ?",
        options: JSON.stringify(["0", "1", "Indéfini", "Erreur"]),
        correctIndex: 1,
        explanation: "La porte OU donne 1 si AU MOINS une entrée est à 1. Ici B=1, donc la sortie est 1.",
        order: 1,
      },
      // Quiz Module 3 - Lesson 1
      {
        lessonId: lesson3_1.id,
        question: "Pourquoi le langage LADDER est-il populaire ?",
        options: JSON.stringify([
          "C'est le plus récent",
          "Il ressemble aux schémas électriques",
          "Il est le plus rapide",
          "Il est gratuit"
        ]),
        correctIndex: 1,
        explanation: "Le LADDER ressemble aux schémas électriques à relais, ce qui le rend intuitif pour les électriciens.",
        order: 1,
      },
    ],
  })

  // Create Rewards
  await prisma.reward.createMany({
    data: [
      {
        name: "Premier pas",
        description: "Terminer votre première leçon",
        icon: "🎯",
        type: "badge",
        condition: JSON.stringify({ type: "lessons_completed", count: 1 }),
        xpBonus: 25,
      },
      {
        name: "Étudiant assidu",
        description: "Terminer 5 leçons",
        icon: "📚",
        type: "badge",
        condition: JSON.stringify({ type: "lessons_completed", count: 5 }),
        xpBonus: 50,
      },
      {
        name: "Expert en herbe",
        description: "Terminer 10 leçons",
        icon: "🌟",
        type: "badge",
        condition: JSON.stringify({ type: "lessons_completed", count: 10 }),
        xpBonus: 100,
      },
      {
        name: "Sans faute !",
        description: "Obtenir 100% à un quiz",
        icon: "💯",
        type: "badge",
        condition: JSON.stringify({ type: "perfect_quiz", count: 1 }),
        xpBonus: 30,
      },
      {
        name: "Série de 3",
        description: "Se connecter 3 jours consécutifs",
        icon: "🔥",
        type: "badge",
        condition: JSON.stringify({ type: "streak", count: 3 }),
        xpBonus: 40,
      },
      {
        name: "Série de 7",
        description: "Se connecter 7 jours consécutifs",
        icon: "🔥🔥",
        type: "badge",
        condition: JSON.stringify({ type: "streak", count: 7 }),
        xpBonus: 100,
      },
      {
        name: "Maître logicien",
        description: "Terminer le module Logique combinatoire",
        icon: "🧠",
        type: "trophy",
        condition: JSON.stringify({ type: "module_completed", moduleOrder: 2 }),
        xpBonus: 150,
      },
      {
        name: "Pro du LADDER",
        description: "Terminer le module LADDER",
        icon: "🪜",
        type: "trophy",
        condition: JSON.stringify({ type: "module_completed", moduleOrder: 3 }),
        xpBonus: 200,
      },
      {
        name: "Niveau 5",
        description: "Atteindre le niveau 5",
        icon: "⭐",
        type: "badge",
        condition: JSON.stringify({ type: "level", level: 5 }),
        xpBonus: 75,
      },
      {
        name: "Niveau 10",
        description: "Atteindre le niveau 10",
        icon: "🏆",
        type: "trophy",
        condition: JSON.stringify({ type: "level", level: 10 }),
        xpBonus: 200,
      },
    ],
  })

  // Create demo user with some progress
  const hashedPassword = await bcrypt.hash('demo123', 10)

  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@easyplc.fr',
      username: 'DemoUser',
      password: hashedPassword,
      totalXp: 255,
      level: 2,
      streak: 3,
    },
  })

  // Add progress for demo user (completed first 3 lessons)
  await prisma.lessonProgress.createMany({
    data: [
      {
        userId: demoUser.id,
        lessonId: lesson1_1.id,
        completed: true,
        score: 100,
        timeSpent: 480,
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        userId: demoUser.id,
        lessonId: lesson1_2.id,
        completed: true,
        score: 85,
        timeSpent: 600,
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        userId: demoUser.id,
        lessonId: lesson1_3.id,
        completed: true,
        score: 70,
        timeSpent: 720,
        completedAt: new Date(), // today
      },
    ],
  })

  // Give demo user some rewards
  const firstReward = await prisma.reward.findFirst({
    where: { name: 'Premier pas' },
  })
  const perfectReward = await prisma.reward.findFirst({
    where: { name: 'Sans faute !' },
  })
  const streakReward = await prisma.reward.findFirst({
    where: { name: 'Série de 3' },
  })

  if (firstReward) {
    await prisma.userReward.create({
      data: {
        userId: demoUser.id,
        rewardId: firstReward.id,
        earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    })
  }
  if (perfectReward) {
    await prisma.userReward.create({
      data: {
        userId: demoUser.id,
        rewardId: perfectReward.id,
        earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    })
  }
  if (streakReward) {
    await prisma.userReward.create({
      data: {
        userId: demoUser.id,
        rewardId: streakReward.id,
        earnedAt: new Date(),
      },
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('')
  console.log('📧 Compte démo créé :')
  console.log('   Email: demo@easyplc.fr')
  console.log('   Mot de passe: demo123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
