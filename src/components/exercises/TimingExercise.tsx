import { useState, useEffect, useRef, useCallback } from 'react'
import type { TimingConfig, TimingAnswer } from '../../types/exercises'

interface Props {
  config: TimingConfig
  onAnswer: (answer: TimingAnswer) => void
  showResult?: boolean
  correctAnswer?: { signalId: string; transitions: { time: number; value: boolean }[] }[]
  isCorrect?: boolean
}

interface Transition {
  time: number
  value: boolean
}

export default function TimingExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [userSignals, setUserSignals] = useState<Record<string, Transition[]>>({})
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const gridWidth = 800
  const gridHeight = 60
  const labelWidth = 100
  const rowHeight = 80

  useEffect(() => {
    // Initialize user signals for output signals only
    const initial: Record<string, Transition[]> = {}
    config.signals
      .filter((s) => s.type === 'output')
      .forEach((signal) => {
        initial[signal.id] = [{ time: 0, value: signal.initialState }]
      })
    setUserSignals(initial)
  }, [config])

  useEffect(() => {
    const signals = Object.entries(userSignals).map(([signalId, transitions]) => ({
      signalId,
      transitions,
    }))
    onAnswer({ signals })
  }, [userSignals, onAnswer])

  const getSignalTransitions = useCallback((signalId: string): Transition[] => {
    // Check if it's a given signal (input)
    const given = config.givenSignals.find((s) => s.signalId === signalId)
    if (given) return given.transitions

    // Otherwise return user signal
    return userSignals[signalId] || []
  }, [config.givenSignals, userSignals])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>, signalId: string) => {
    if (showResult) return

    const signal = config.signals.find((s) => s.id === signalId)
    if (!signal || signal.type === 'input') return // Can't edit input signals

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const signalIndex = config.signals.findIndex((s) => s.id === signalId)
    const rowTop = signalIndex * rowHeight + 20

    // Check if click is within this signal's row
    const clickY = e.clientY - rect.top
    if (clickY < rowTop || clickY > rowTop + gridHeight) return

    const clickX = e.clientX - rect.left - labelWidth
    if (clickX < 0 || clickX > gridWidth) return

    // Calculate time from X position
    const time = Math.round((clickX / gridWidth) * config.totalTime / config.timeScale) * config.timeScale

    // Get current transitions
    const transitions = [...(userSignals[signalId] || [])]

    // Find the current value at this time
    let currentValue = signal.initialState
    for (const t of transitions) {
      if (t.time <= time) currentValue = t.value
    }

    // Toggle the value
    const newValue = !currentValue

    // Remove any transition at exactly this time
    const existingIndex = transitions.findIndex((t) => t.time === time)
    if (existingIndex >= 0) {
      transitions.splice(existingIndex, 1)
    }

    // Add new transition if it changes the value
    if (time === 0) {
      transitions[0] = { time: 0, value: newValue }
    } else {
      // Check if previous value is different
      let prevValue = signal.initialState
      for (const t of transitions) {
        if (t.time < time) prevValue = t.value
      }
      if (prevValue !== newValue) {
        transitions.push({ time, value: newValue })
        transitions.sort((a, b) => a.time - b.time)
      }
    }

    setUserSignals((prev) => ({
      ...prev,
      [signalId]: transitions,
    }))
  }

  // Draw the timing diagram
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const totalHeight = config.signals.length * rowHeight + 40
    canvas.width = gridWidth + labelWidth + 20
    canvas.height = totalHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '12px sans-serif'

    // Draw time axis
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    const timeSteps = config.totalTime / config.timeScale
    for (let i = 0; i <= timeSteps; i++) {
      const x = labelWidth + (i / timeSteps) * gridWidth
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, totalHeight - 20)
      ctx.stroke()

      // Time labels
      ctx.fillStyle = '#6b7280'
      ctx.textAlign = 'center'
      ctx.fillText(`${i * config.timeScale}ms`, x, totalHeight - 5)
    }

    // Draw each signal
    config.signals.forEach((signal, index) => {
      const y = index * rowHeight + 20
      const transitions = getSignalTransitions(signal.id)

      // Signal label
      ctx.fillStyle = signal.type === 'input' ? '#3b82f6' : '#22c55e'
      ctx.textAlign = 'right'
      ctx.fillText(signal.name, labelWidth - 10, y + gridHeight / 2 + 4)

      // Signal type indicator
      ctx.font = '10px sans-serif'
      ctx.fillStyle = '#9ca3af'
      ctx.fillText(signal.type === 'input' ? '(entrée)' : '(sortie)', labelWidth - 10, y + gridHeight / 2 + 16)
      ctx.font = '12px sans-serif'

      // Draw signal line
      ctx.strokeStyle = signal.type === 'input' ? '#3b82f6' : '#22c55e'
      ctx.lineWidth = 2
      ctx.beginPath()

      let currentValue = signal.initialState
      let lastX = labelWidth

      // Sort transitions by time
      const sortedTransitions = [...transitions].sort((a, b) => a.time - b.time)

      for (const transition of sortedTransitions) {
        const x = labelWidth + (transition.time / config.totalTime) * gridWidth
        const highY = y + 10
        const lowY = y + gridHeight - 10

        // Draw horizontal line at current value
        ctx.lineTo(x, currentValue ? highY : lowY)

        // Draw vertical transition
        ctx.lineTo(x, transition.value ? highY : lowY)

        currentValue = transition.value
        lastX = x
      }

      // Draw to the end
      ctx.lineTo(labelWidth + gridWidth, currentValue ? y + 10 : y + gridHeight - 10)
      ctx.stroke()

      // If this is an output signal and we're showing results, show expected
      if (showResult && signal.type === 'output' && correctAnswer) {
        const expected = correctAnswer.find((s) => s.signalId === signal.id)
        if (expected) {
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)'
          ctx.lineWidth = 4
          ctx.setLineDash([5, 5])
          ctx.beginPath()

          let expectedValue = signal.initialState
          for (const transition of expected.transitions) {
            const x = labelWidth + (transition.time / config.totalTime) * gridWidth
            const highY = y + 10
            const lowY = y + gridHeight - 10

            ctx.lineTo(x, expectedValue ? highY : lowY)
            ctx.lineTo(x, transition.value ? highY : lowY)
            expectedValue = transition.value
          }
          ctx.lineTo(labelWidth + gridWidth, expectedValue ? y + 10 : y + gridHeight - 10)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // Draw clickable area border for editable signals
      if (signal.type === 'output' && !showResult) {
        ctx.strokeStyle = '#d1d5db'
        ctx.lineWidth = 1
        ctx.strokeRect(labelWidth, y, gridWidth, gridHeight)
      }
    })
  }, [config, userSignals, showResult, correctAnswer, getSignalTransitions])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clickY = e.clientY - rect.top

    // Find which signal was clicked
    for (let i = 0; i < config.signals.length; i++) {
      const signal = config.signals[i]
      const rowTop = i * rowHeight + 20

      if (clickY >= rowTop && clickY <= rowTop + gridHeight) {
        handleCanvasClick(e, signal.id)
        break
      }
    }
  }

  const resetSignal = (signalId: string) => {
    const signal = config.signals.find((s) => s.id === signalId)
    if (!signal) return

    setUserSignals((prev) => ({
      ...prev,
      [signalId]: [{ time: 0, value: signal.initialState }],
    }))
  }

  return (
    <div className="space-y-4">
      {config.instruction && (
        <p className="text-gray-600 mb-4">{config.instruction}</p>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-x-auto">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className={`${!showResult ? 'cursor-crosshair' : ''}`}
        />
      </div>

      {/* Controls for output signals */}
      {!showResult && (
        <div className="flex flex-wrap gap-2">
          {config.signals
            .filter((s) => s.type === 'output')
            .map((signal) => (
              <button
                key={signal.id}
                onClick={() => resetSignal(signal.id)}
                className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
              >
                Réinitialiser {signal.name}
              </button>
            ))}
        </div>
      )}

      {/* Instructions */}
      {!showResult && (
        <div className="text-sm text-gray-500 space-y-1">
          <p>Cliquez sur le chronogramme pour ajouter des transitions aux signaux de sortie.</p>
          <p>Les signaux d'entrée (en bleu) sont fournis et ne peuvent pas être modifiés.</p>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
            {isCorrect
              ? 'Chronogramme correct !'
              : 'Le chronogramme ne correspond pas tout à fait à la solution attendue.'}
          </p>
          {!isCorrect && (
            <p className="text-sm text-gray-600 mt-2">
              La ligne verte en pointillés montre la solution attendue.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
