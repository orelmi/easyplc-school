// Re-export all module data
export { module01Data } from './module-01-automation/index.js'
export { module02Data } from './module-02-combinational/index.js'
export { module03Data } from './module-03-ladder/index.js'
export { module04Data } from './module-04-sensors/index.js'
export { module05Data } from './module-05-grafcet/index.js'
export { module06Data } from './module-06-intro-cnc/index.js'
export { module07Data } from './module-07-programmation-gcode/index.js'
export { module08Data } from './module-08-axes-interpolation/index.js'
export { module09Data } from './module-09-intro-siemens/index.js'
export { module10Data } from './module-10-tia-portal/index.js'
export { module11Data } from './module-11-data-blocks/index.js'
export { module12Data } from './module-12-vfd-intro/index.js'
export { module13Data } from './module-13-vfd-config/index.js'
export { module14Data } from './module-14-vfd-comm/index.js'
export { module15Data } from './module-15-positioning-intro/index.js'
export { module16Data } from './module-16-motors/index.js'
export { module17Data } from './module-17-motion/index.js'

// Re-export all exercises
export { module01Exercises, module01ExerciseTranslations } from './module-01-automation/exercises.js'
export { module02Exercises, module02ExerciseTranslations } from './module-02-combinational/exercises.js'
export { module03Exercises, module03ExerciseTranslations } from './module-03-ladder/exercises.js'
export { module04Exercises, module04ExerciseTranslations } from './module-04-sensors/exercises.js'
export { module05Exercises, module05ExerciseTranslations } from './module-05-grafcet/exercises.js'
export { module06Exercises, module06ExerciseTranslations } from './module-06-intro-cnc/exercises.js'
export { module07Exercises, module07ExerciseTranslations } from './module-07-programmation-gcode/exercises.js'
export { module08Exercises, module08ExerciseTranslations } from './module-08-axes-interpolation/exercises.js'
export { module09Exercises, module09ExerciseTranslations } from './module-09-intro-siemens/exercises.js'
export { module10Exercises, module10ExerciseTranslations } from './module-10-tia-portal/exercises.js'
export { module11Exercises, module11ExerciseTranslations } from './module-11-data-blocks/exercises.js'
export { module12Exercises, module12ExerciseTranslations } from './module-12-vfd-intro/exercises.js'
export { module13Exercises, module13ExerciseTranslations } from './module-13-vfd-config/exercises.js'
export { module14Exercises, module14ExerciseTranslations } from './module-14-vfd-comm/exercises.js'
export { module15Exercises, module15ExerciseTranslations } from './module-15-positioning-intro/exercises.js'
export { module16Exercises, module16ExerciseTranslations } from './module-16-motors/exercises.js'
export { module17Exercises, module17ExerciseTranslations } from './module-17-motion/exercises.js'

export type { ModuleData, LessonData, QuizData, LessonTranslation, QuizTranslation, ModuleTranslation, ExerciseData, ExerciseTranslation } from './types.js'

import { module01Data } from './module-01-automation/index.js'
import { module02Data } from './module-02-combinational/index.js'
import { module03Data } from './module-03-ladder/index.js'
import { module04Data } from './module-04-sensors/index.js'
import { module05Data } from './module-05-grafcet/index.js'
import { module06Data } from './module-06-intro-cnc/index.js'
import { module07Data } from './module-07-programmation-gcode/index.js'
import { module08Data } from './module-08-axes-interpolation/index.js'
import { module09Data } from './module-09-intro-siemens/index.js'
import { module10Data } from './module-10-tia-portal/index.js'
import { module11Data } from './module-11-data-blocks/index.js'
import { module12Data } from './module-12-vfd-intro/index.js'
import { module13Data } from './module-13-vfd-config/index.js'
import { module14Data } from './module-14-vfd-comm/index.js'
import { module15Data } from './module-15-positioning-intro/index.js'
import { module16Data } from './module-16-motors/index.js'
import { module17Data } from './module-17-motion/index.js'
import type { ModuleData, ExerciseData, ExerciseTranslation } from './types.js'

// Import exercises
import { module01Exercises, module01ExerciseTranslations } from './module-01-automation/exercises.js'
import { module02Exercises, module02ExerciseTranslations } from './module-02-combinational/exercises.js'
import { module03Exercises, module03ExerciseTranslations } from './module-03-ladder/exercises.js'
import { module04Exercises, module04ExerciseTranslations } from './module-04-sensors/exercises.js'
import { module05Exercises, module05ExerciseTranslations } from './module-05-grafcet/exercises.js'
import { module06Exercises, module06ExerciseTranslations } from './module-06-intro-cnc/exercises.js'
import { module07Exercises, module07ExerciseTranslations } from './module-07-programmation-gcode/exercises.js'
import { module08Exercises, module08ExerciseTranslations } from './module-08-axes-interpolation/exercises.js'
import { module09Exercises, module09ExerciseTranslations } from './module-09-intro-siemens/exercises.js'
import { module10Exercises, module10ExerciseTranslations } from './module-10-tia-portal/exercises.js'
import { module11Exercises, module11ExerciseTranslations } from './module-11-data-blocks/exercises.js'
import { module12Exercises, module12ExerciseTranslations } from './module-12-vfd-intro/exercises.js'
import { module13Exercises, module13ExerciseTranslations } from './module-13-vfd-config/exercises.js'
import { module14Exercises, module14ExerciseTranslations } from './module-14-vfd-comm/exercises.js'
import { module15Exercises, module15ExerciseTranslations } from './module-15-positioning-intro/exercises.js'
import { module16Exercises, module16ExerciseTranslations } from './module-16-motors/exercises.js'
import { module17Exercises, module17ExerciseTranslations } from './module-17-motion/exercises.js'

// All modules in order
export const allModules: ModuleData[] = [
  module01Data,
  module02Data,
  module03Data,
  module04Data,
  module05Data,
  module06Data,
  module07Data,
  module08Data,
  module09Data,
  module10Data,
  module11Data,
  module12Data,
  module13Data,
  module14Data,
  module15Data,
  module16Data,
  module17Data,
]

// All exercises by module order
export interface ModuleExercises {
  moduleOrder: number
  exercises: ExerciseData[]
  translations: {
    en: Record<string, ExerciseTranslation>
    es: Record<string, ExerciseTranslation>
  }
}

export const allExercises: ModuleExercises[] = [
  { moduleOrder: 1, exercises: module01Exercises, translations: module01ExerciseTranslations },
  { moduleOrder: 2, exercises: module02Exercises, translations: module02ExerciseTranslations },
  { moduleOrder: 3, exercises: module03Exercises, translations: module03ExerciseTranslations },
  { moduleOrder: 4, exercises: module04Exercises, translations: module04ExerciseTranslations },
  { moduleOrder: 5, exercises: module05Exercises, translations: module05ExerciseTranslations },
  { moduleOrder: 6, exercises: module06Exercises, translations: module06ExerciseTranslations },
  { moduleOrder: 7, exercises: module07Exercises, translations: module07ExerciseTranslations },
  { moduleOrder: 8, exercises: module08Exercises, translations: module08ExerciseTranslations },
  { moduleOrder: 9, exercises: module09Exercises, translations: module09ExerciseTranslations },
  { moduleOrder: 10, exercises: module10Exercises, translations: module10ExerciseTranslations },
  { moduleOrder: 11, exercises: module11Exercises, translations: module11ExerciseTranslations },
  { moduleOrder: 12, exercises: module12Exercises, translations: module12ExerciseTranslations },
  { moduleOrder: 13, exercises: module13Exercises, translations: module13ExerciseTranslations },
  { moduleOrder: 14, exercises: module14Exercises, translations: module14ExerciseTranslations },
  { moduleOrder: 15, exercises: module15Exercises, translations: module15ExerciseTranslations },
  { moduleOrder: 16, exercises: module16Exercises, translations: module16ExerciseTranslations },
  { moduleOrder: 17, exercises: module17Exercises, translations: module17ExerciseTranslations },
]
