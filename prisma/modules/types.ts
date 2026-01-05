// Shared types for module seed data

export interface LessonData {
  title: string
  description: string
  content: string // JSON stringified content
  order: number
  duration: number
  xpReward: number
}

export interface LessonTranslation {
  title: string
  description: string
  content?: string // JSON stringified content (optional, if different from FR)
}

export interface QuizData {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  order: number
}

export interface QuizTranslation {
  question: string
  options: string[]
  explanation: string
}

export interface ModuleTranslation {
  title: string
  description: string
}

export interface ModuleData {
  // Module info
  moduleOrder: number
  moduleTitle: string
  moduleDescription: string
  moduleTranslations: {
    en: ModuleTranslation
    es: ModuleTranslation
  }

  // Lessons data (in French - base language)
  lessons: LessonData[]

  // Lesson translations
  lessonTranslations: {
    en: Record<string, LessonTranslation>
    es: Record<string, LessonTranslation>
  }

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: QuizData[][]

  // Quiz translations
  quizTranslations: {
    en: Record<string, QuizTranslation>
    es: Record<string, QuizTranslation>
  }
}
