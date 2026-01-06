import { useCallback, useMemo } from 'react'
import type { ExerciseForUser, ExerciseAnswer, ExerciseResult, ExerciseType } from '../../types/exercises'
import FillBlankExercise from './FillBlankExercise'
import OrderingExercise from './OrderingExercise'
import MatchingExercise from './MatchingExercise'
import CodeInputExercise from './CodeInputExercise'
import DragDropExercise from './DragDropExercise'
import WiringExercise from './WiringExercise'
import TimingExercise from './TimingExercise'
import LadderBuilderExercise from './LadderBuilderExercise'
import PLCSimulatorExercise from './PLCSimulatorExercise'

// Re-export components
export {
  FillBlankExercise,
  OrderingExercise,
  MatchingExercise,
  CodeInputExercise,
  DragDropExercise,
  WiringExercise,
  TimingExercise,
  LadderBuilderExercise,
  PLCSimulatorExercise,
}

// Exercise type icons and labels
export const exerciseIcons: Record<ExerciseType, string> = {
  fill_blank: '✏️',
  ordering: '🔢',
  matching: '🔗',
  code_input: '💻',
  drag_drop: '🎯',
  wiring: '🔌',
  timing: '⏱️',
  ladder_builder: '🪜',
  plc_simulator: '🤖',
}

export const exerciseLabels: Record<ExerciseType, string> = {
  fill_blank: 'Texte à trous',
  ordering: 'Mise en ordre',
  matching: 'Association',
  code_input: 'Saisie de code',
  drag_drop: 'Glisser-déposer',
  wiring: 'Câblage',
  timing: 'Chronogramme',
  ladder_builder: 'Éditeur Ladder',
  plc_simulator: 'Simulateur PLC',
}

// Props for the unified ExerciseRenderer
interface ExerciseRendererProps {
  exercise: ExerciseForUser
  onAnswer: (answer: ExerciseAnswer) => void
  showResult?: boolean
  result?: ExerciseResult
}

// Unified exercise renderer component
export function ExerciseRenderer({
  exercise,
  onAnswer,
  showResult = false,
  result,
}: ExerciseRendererProps) {
  // Memoize the answer callback to prevent unnecessary re-renders
  const handleAnswer = useCallback(
    (answer: ExerciseAnswer) => {
      onAnswer(answer)
    },
    [onAnswer]
  )

  // Extract common props
  const commonProps = useMemo(
    () => ({
      showResult,
      isCorrect: result?.isCorrect,
      correctAnswer: result?.correctAnswer as any,
    }),
    [showResult, result]
  )

  // Render the appropriate exercise component based on type
  switch (exercise.type) {
    case 'fill_blank':
      return (
        <FillBlankExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    case 'ordering':
      return (
        <OrderingExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    case 'matching':
      return (
        <MatchingExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    case 'code_input':
      return (
        <CodeInputExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    case 'drag_drop':
      return (
        <DragDropExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    case 'wiring':
      return (
        <WiringExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    case 'timing':
      return (
        <TimingExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    case 'ladder_builder':
      return (
        <LadderBuilderExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    case 'plc_simulator':
      return (
        <PLCSimulatorExercise
          config={exercise.config as any}
          onAnswer={handleAnswer}
          {...commonProps}
        />
      )

    default:
      return (
        <div className="p-4 bg-yellow-50 rounded-lg text-yellow-700">
          Type d'exercice non supporté: {exercise.type}
        </div>
      )
  }
}

// Exercise card for displaying exercise info
interface ExerciseCardProps {
  exercise: ExerciseForUser
  index: number
  isActive: boolean
  isCompleted?: boolean
  score?: number
  onClick: () => void
}

export function ExerciseCard({
  exercise,
  index,
  isActive,
  isCompleted,
  score,
  onClick,
}: ExerciseCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-lg border-2 transition-all
        ${isActive
          ? 'border-primary-500 bg-primary-50'
          : isCompleted
          ? 'border-green-300 bg-green-50'
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{exerciseIcons[exercise.type]}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">#{index + 1}</span>
            <span className="text-sm text-gray-400">{exerciseLabels[exercise.type]}</span>
          </div>
          <h4 className="font-medium">{exercise.title}</h4>
          {exercise.description && (
            <p className="text-sm text-gray-500 mt-1">{exercise.description}</p>
          )}
        </div>
        <div className="text-right">
          {isCompleted && score !== undefined ? (
            <span className={`font-bold ${score === 100 ? 'text-green-600' : 'text-yellow-600'}`}>
              {score}%
            </span>
          ) : (
            <span className="text-sm text-gray-400">{exercise.xpReward} XP</span>
          )}
        </div>
      </div>
    </button>
  )
}
