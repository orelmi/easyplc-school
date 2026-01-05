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

export type { ModuleData, LessonData, QuizData, LessonTranslation, QuizTranslation, ModuleTranslation } from './types.js'

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
import type { ModuleData } from './types.js'

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
