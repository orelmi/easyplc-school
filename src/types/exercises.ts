// Exercise Types for EasyPLC School
// Covers Phase 1, 2, and 3 exercises

// ==================== COMMON TYPES ====================

export type ExerciseType =
  // Phase 1: Structured exercises
  | 'fill_blank'
  | 'ordering'
  | 'matching'
  | 'code_input'
  // Phase 2: Visual exercises
  | 'drag_drop'
  | 'wiring'
  | 'timing'
  // Phase 3: Simulation exercises
  | 'ladder_builder'
  | 'plc_simulator'

export interface ExerciseBase {
  id: string
  type: ExerciseType
  title: string
  description?: string
  order: number
  xpReward: number
  hints?: string[]
}

// ==================== PHASE 1: STRUCTURED EXERCISES ====================

// Fill in the blank exercise
export interface FillBlankConfig {
  template: string // Text with ___ placeholders or {0}, {1} markers
  blanks: {
    id: string
    position: number // Index in template
    expectedAnswers: string[] // Multiple accepted answers
    caseSensitive?: boolean
    hint?: string
  }[]
}

export interface FillBlankSolution {
  answers: Record<string, string> // blank id -> correct answer
}

export interface FillBlankAnswer {
  blanks: Record<string, string> // blank id -> user answer
}

// Ordering exercise
export interface OrderingConfig {
  items: {
    id: string
    content: string
    image?: string
  }[]
  instruction?: string
}

export interface OrderingSolution {
  correctOrder: string[] // Item IDs in correct order
}

export interface OrderingAnswer {
  order: string[] // Item IDs in user's order
}

// Matching exercise
export interface MatchingConfig {
  leftItems: {
    id: string
    content: string
    image?: string
  }[]
  rightItems: {
    id: string
    content: string
    image?: string
  }[]
  instruction?: string
}

export interface MatchingSolution {
  pairs: [string, string][] // [leftId, rightId]
}

export interface MatchingAnswer {
  pairs: [string, string][] // User's pairs
}

// Code input exercise
export interface CodeInputConfig {
  language: 'ladder' | 'st' | 'il' | 'fbd' | 'sfc' // PLC languages
  prompt: string
  starterCode?: string
  expectedOutputs?: {
    input: Record<string, boolean>
    expectedOutput: Record<string, boolean>
  }[]
  testCases?: {
    description: string
    inputs: Record<string, boolean>
    expectedOutputs: Record<string, boolean>
  }[]
}

export interface CodeInputSolution {
  code: string
  acceptedPatterns?: string[] // Regex patterns for accepted solutions
}

export interface CodeInputAnswer {
  code: string
}

// ==================== PHASE 2: VISUAL EXERCISES ====================

// Drag and drop exercise
export interface DragDropConfig {
  dropZones: {
    id: string
    label: string
    x: number
    y: number
    width: number
    height: number
    accepts?: string[] // Item types that can be dropped here
  }[]
  draggables: {
    id: string
    content: string
    type?: string
    image?: string
  }[]
  backgroundImage?: string
  instruction?: string
}

export interface DragDropSolution {
  placements: Record<string, string[]> // zone id -> item ids
}

export interface DragDropAnswer {
  placements: Record<string, string[]>
}

// Wiring exercise
export interface WiringConfig {
  components: {
    id: string
    type: 'plc' | 'sensor' | 'actuator' | 'relay' | 'power' | 'ground'
    label: string
    x: number
    y: number
    terminals: {
      id: string
      label: string
      type: 'input' | 'output' | 'power' | 'ground'
      position: 'top' | 'bottom' | 'left' | 'right'
      offset: number // Percentage along the side
    }[]
  }[]
  instruction?: string
}

export interface WiringSolution {
  connections: [string, string][] // [terminal1Id, terminal2Id]
}

export interface WiringAnswer {
  connections: [string, string][]
}

// Timing diagram exercise
export interface TimingConfig {
  signals: {
    id: string
    name: string
    type: 'input' | 'output'
    initialState: boolean
  }[]
  timeScale: number // ms per grid unit
  totalTime: number // Total time in ms
  givenSignals: {
    signalId: string
    transitions: { time: number; value: boolean }[]
  }[]
  instruction?: string
}

export interface TimingSolution {
  expectedSignals: {
    signalId: string
    transitions: { time: number; value: boolean }[]
  }[]
  tolerance?: number // Time tolerance in ms
}

export interface TimingAnswer {
  signals: {
    signalId: string
    transitions: { time: number; value: boolean }[]
  }[]
}

// ==================== PHASE 3: SIMULATION EXERCISES ====================

// Ladder builder exercise
export interface LadderBuilderConfig {
  availableElements: {
    contacts: ('NO' | 'NC' | 'P' | 'N')[]
    coils: ('normal' | 'set' | 'reset' | 'negated')[]
    timers: ('TON' | 'TOF' | 'TP')[]
    counters: ('CTU' | 'CTD')[]
  }
  inputs: {
    address: string
    label: string
  }[]
  outputs: {
    address: string
    label: string
  }[]
  memory?: {
    address: string
    label: string
  }[]
  maxRungs?: number
  instruction?: string
  testScenario?: {
    description: string
    steps: {
      action: string
      expectedState: Record<string, boolean>
    }[]
  }
}

export interface LadderBuilderSolution {
  // The expected program structure (simplified)
  expectedBehavior: {
    inputs: Record<string, boolean>
    expectedOutputs: Record<string, boolean>
  }[]
  // Or a reference program
  referenceProgram?: string // JSON serialized PLCProgram
}

export interface LadderBuilderAnswer {
  program: string // JSON serialized PLCProgram
}

// PLC Simulator exercise
export interface PLCSimulatorConfig {
  programType: 'ladder' | 'grafcet'
  // For ladder
  ladderProgram?: string // JSON serialized PLCProgram
  // For GRAFCET
  grafcetDiagram?: string // JSON serialized GrafcetDiagram
  // Simulation parameters
  inputs: {
    address: string
    label: string
    type: 'button' | 'switch' | 'sensor'
  }[]
  outputs: {
    address: string
    label: string
    type: 'lamp' | 'motor' | 'valve' | 'buzzer'
  }[]
  // Task to complete
  objectives: {
    id: string
    description: string
    condition: {
      type: 'output_state' | 'sequence' | 'timing'
      params: Record<string, unknown>
    }
  }[]
  instruction?: string
  timeLimit?: number // seconds
}

export interface PLCSimulatorSolution {
  requiredSequence?: {
    timestamp: number
    state: Record<string, boolean>
  }[]
  objectiveChecks: {
    objectiveId: string
    validator: string // JSON serialized validation logic
  }[]
}

export interface PLCSimulatorAnswer {
  completedObjectives: string[]
  simulationLog?: {
    timestamp: number
    inputs: Record<string, boolean>
    outputs: Record<string, boolean>
  }[]
}

// ==================== UNIFIED EXERCISE INTERFACE ====================

export type ExerciseConfig =
  | FillBlankConfig
  | OrderingConfig
  | MatchingConfig
  | CodeInputConfig
  | DragDropConfig
  | WiringConfig
  | TimingConfig
  | LadderBuilderConfig
  | PLCSimulatorConfig

export type ExerciseSolution =
  | FillBlankSolution
  | OrderingSolution
  | MatchingSolution
  | CodeInputSolution
  | DragDropSolution
  | WiringSolution
  | TimingSolution
  | LadderBuilderSolution
  | PLCSimulatorSolution

export type ExerciseAnswer =
  | FillBlankAnswer
  | OrderingAnswer
  | MatchingAnswer
  | CodeInputAnswer
  | DragDropAnswer
  | WiringAnswer
  | TimingAnswer
  | LadderBuilderAnswer
  | PLCSimulatorAnswer

export interface Exercise extends ExerciseBase {
  config: ExerciseConfig
  solution?: ExerciseSolution // Hidden from user, used for validation
}

// ==================== API RESPONSE TYPES ====================

export interface ExerciseForUser {
  id: string
  type: ExerciseType
  title: string
  description?: string
  order: number
  xpReward: number
  hints?: string[]
  config: ExerciseConfig // Solution is NOT included
}

export interface ExerciseResult {
  exerciseId: string
  isCorrect: boolean
  score: number // 0-100 for partial credit
  feedback?: string
  correctAnswer?: ExerciseSolution // Only shown after submission
}

export interface ExerciseSubmitResult {
  totalScore: number
  exerciseCount: number
  correctCount: number
  xpEarned: number
  results: ExerciseResult[]
}

// ==================== VALIDATION HELPERS ====================

export function getExercisePhase(type: ExerciseType): 1 | 2 | 3 {
  switch (type) {
    case 'fill_blank':
    case 'ordering':
    case 'matching':
    case 'code_input':
      return 1
    case 'drag_drop':
    case 'wiring':
    case 'timing':
      return 2
    case 'ladder_builder':
    case 'plc_simulator':
      return 3
  }
}

export function getExerciseIcon(type: ExerciseType): string {
  switch (type) {
    case 'fill_blank':
      return '✏️'
    case 'ordering':
      return '🔢'
    case 'matching':
      return '🔗'
    case 'code_input':
      return '💻'
    case 'drag_drop':
      return '🎯'
    case 'wiring':
      return '🔌'
    case 'timing':
      return '⏱️'
    case 'ladder_builder':
      return '🪜'
    case 'plc_simulator':
      return '🤖'
  }
}

export function getExerciseLabel(type: ExerciseType): string {
  switch (type) {
    case 'fill_blank':
      return 'Texte à trous'
    case 'ordering':
      return 'Mise en ordre'
    case 'matching':
      return 'Association'
    case 'code_input':
      return 'Saisie de code'
    case 'drag_drop':
      return 'Glisser-déposer'
    case 'wiring':
      return 'Câblage'
    case 'timing':
      return 'Chronogramme'
    case 'ladder_builder':
      return 'Éditeur Ladder'
    case 'plc_simulator':
      return 'Simulateur PLC'
  }
}
