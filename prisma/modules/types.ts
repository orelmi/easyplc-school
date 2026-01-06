// Shared types for module seed data

export interface LessonData {
  title: string
  description: string
  content: string // JSON stringified content
  order: number
  duration: number
  xpReward: number
}

// Exercise types for seed data
export type ExerciseType =
  | 'fill_blank'
  | 'ordering'
  | 'matching'
  | 'code_input'
  | 'drag_drop'
  | 'wiring'
  | 'timing'
  | 'ladder_builder'
  | 'plc_simulator'

export interface ExerciseData {
  type: ExerciseType
  title: string
  description?: string
  config: string // JSON stringified config
  solution: string // JSON stringified solution
  hints?: string // JSON stringified hints array
  order: number
  xpReward: number
}

export interface ExerciseTranslation {
  title: string
  description?: string
  config?: string // JSON stringified translated config (optional)
  hints?: string // JSON stringified translated hints
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

  // Exercises per lesson (indexed by lesson order - 1)
  // Optional - not all modules may have exercises yet
  exercises?: ExerciseData[][]

  // Exercise translations
  exerciseTranslations?: {
    en: Record<string, ExerciseTranslation>
    es: Record<string, ExerciseTranslation>
  }
}
