import { useState, useEffect, useRef } from 'react'
import type { PLCSimulatorConfig, PLCSimulatorAnswer } from '../../types/exercises'
import {
  type PLCProgram,
  type PLCState,
  createPLCState,
  executeCycle,
} from '../../lib/plc-simulator'
import {
  type GrafcetDiagram,
  type GrafcetState,
  createGrafcetState,
  executeCycle as executeGrafcetCycle,
} from '../../lib/grafcet-engine'

interface Props {
  config: PLCSimulatorConfig
  onAnswer: (answer: PLCSimulatorAnswer) => void
  showResult?: boolean
  correctAnswer?: unknown
  isCorrect?: boolean
}

interface ObjectiveStatus {
  id: string
  completed: boolean
  description: string
}

export default function PLCSimulatorExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [plcState, setPlcState] = useState<PLCState>(createPLCState())
  const [grafcetState, setGrafcetState] = useState<GrafcetState | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [objectives, setObjectives] = useState<ObjectiveStatus[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [simulationLog, setSimulationLog] = useState<{ timestamp: number; inputs: Record<string, boolean>; outputs: Record<string, boolean> }[]>([])

  const program = useRef<PLCProgram | null>(null)
  const diagram = useRef<GrafcetDiagram | null>(null)

  // Initialize simulation
  useEffect(() => {
    // Initialize objectives
    setObjectives(
      config.objectives.map((obj) => ({
        id: obj.id,
        completed: false,
        description: obj.description,
      }))
    )

    // Load program
    if (config.programType === 'ladder' && config.ladderProgram) {
      try {
        program.current = JSON.parse(config.ladderProgram)
      } catch (e) {
        console.error('Failed to parse ladder program', e)
      }
    } else if (config.programType === 'grafcet' && config.grafcetDiagram) {
      try {
        diagram.current = JSON.parse(config.grafcetDiagram)
        if (diagram.current) {
          setGrafcetState(createGrafcetState(diagram.current))
        }
      } catch (e) {
        console.error('Failed to parse grafcet diagram', e)
      }
    }

    // Initialize PLC state with custom inputs/outputs
    const newState = createPLCState()
    config.inputs.forEach((input) => {
      newState.inputs.set(input.address, {
        address: input.address,
        label: input.label,
        value: false,
        type: input.type,
      })
    })
    config.outputs.forEach((output) => {
      newState.outputs.set(output.address, {
        address: output.address,
        label: output.label,
        value: false,
        type: output.type,
      })
    })
    setPlcState(newState)
  }, [config])

  // Update answer when objectives change
  useEffect(() => {
    const completedObjectives = objectives.filter((o) => o.completed).map((o) => o.id)
    onAnswer({ completedObjectives, simulationLog })
  }, [objectives, simulationLog, onAnswer])

  // Simulation loop
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 50)

      if (config.programType === 'ladder' && program.current) {
        setPlcState((prev) => {
          const newState = { ...prev }
          executeCycle(program.current!, newState, 50)
          return newState
        })
      } else if (config.programType === 'grafcet' && diagram.current && grafcetState) {
        setGrafcetState((prev) => {
          if (!prev || !diagram.current) return prev
          return executeGrafcetCycle(diagram.current, prev, 50)
        })
      }

      // Log state
      setSimulationLog((prev) => {
        const inputs: Record<string, boolean> = {}
        const outputs: Record<string, boolean> = {}

        config.inputs.forEach((i) => {
          inputs[i.address] = plcState.inputs.get(i.address)?.value ?? false
        })
        config.outputs.forEach((o) => {
          outputs[o.address] = plcState.outputs.get(o.address)?.value ?? false
        })

        return [...prev, { timestamp: timeElapsed, inputs, outputs }].slice(-100)
      })

      // Check objectives
      checkObjectives()
    }, 50)

    return () => clearInterval(interval)
  }, [isRunning, config, plcState, grafcetState, timeElapsed])

  // Check time limit
  useEffect(() => {
    if (config.timeLimit && timeElapsed >= config.timeLimit * 1000 && isRunning) {
      setIsRunning(false)
    }
  }, [timeElapsed, config.timeLimit, isRunning])

  const checkObjectives = () => {
    const newObjectives = [...objectives]
    let changed = false

    for (const objective of config.objectives) {
      const objStatus = newObjectives.find((o) => o.id === objective.id)
      if (!objStatus || objStatus.completed) continue

      let completed = false

      switch (objective.condition.type) {
        case 'output_state': {
          const address = objective.condition.params.address as string
          const expectedValue = objective.condition.params.value as boolean
          const output = plcState.outputs.get(address)
          if (output && output.value === expectedValue) {
            completed = true
          }
          break
        }
        case 'sequence': {
          // Check if outputs followed expected sequence
          // Simplified check - would need more complex logic for real implementation
          completed = false
          break
        }
        case 'timing': {
          const address = objective.condition.params.address as string
          const duration = objective.condition.params.duration as number
          // Check if output was ON for specified duration
          // Simplified check
          completed = false
          break
        }
      }

      if (completed && !objStatus.completed) {
        objStatus.completed = true
        changed = true
      }
    }

    if (changed) {
      setObjectives(newObjectives)
    }
  }

  const toggleInput = (address: string) => {
    if (showResult) return

    setPlcState((prev) => {
      const newState = { ...prev }
      const input = newState.inputs.get(address)
      if (input) {
        input.value = !input.value
      }
      return newState
    })

    // Also update grafcet state if applicable
    if (grafcetState) {
      setGrafcetState((prev) => {
        if (!prev) return prev
        const newInputs = new Map(prev.inputs)
        const currentValue = newInputs.get(address.toLowerCase()) ?? false
        newInputs.set(address.toLowerCase(), !currentValue)
        return { ...prev, inputs: newInputs }
      })
    }
  }

  const startSimulation = () => {
    setPlcState((prev) => ({ ...prev, running: true }))
    if (grafcetState) {
      setGrafcetState((prev) => (prev ? { ...prev, running: true } : prev))
    }
    setIsRunning(true)
  }

  const stopSimulation = () => {
    setPlcState((prev) => ({ ...prev, running: false }))
    if (grafcetState) {
      setGrafcetState((prev) => (prev ? { ...prev, running: false } : prev))
    }
    setIsRunning(false)
  }

  const resetSimulation = () => {
    stopSimulation()
    setTimeElapsed(0)
    setSimulationLog([])

    // Reset PLC state
    const newState = createPLCState()
    config.inputs.forEach((input) => {
      newState.inputs.set(input.address, {
        address: input.address,
        label: input.label,
        value: false,
        type: input.type,
      })
    })
    config.outputs.forEach((output) => {
      newState.outputs.set(output.address, {
        address: output.address,
        label: output.label,
        value: false,
        type: output.type,
      })
    })
    setPlcState(newState)

    // Reset grafcet state
    if (diagram.current) {
      setGrafcetState(createGrafcetState(diagram.current))
    }

    // Reset objectives
    setObjectives(
      config.objectives.map((obj) => ({
        id: obj.id,
        completed: false,
        description: obj.description,
      }))
    )
  }

  const completedCount = objectives.filter((o) => o.completed).length
  const allCompleted = completedCount === objectives.length

  const getInputIcon = (type: string): string => {
    switch (type) {
      case 'button':
        return '🔘'
      case 'switch':
        return '🔀'
      case 'sensor':
        return '📡'
      default:
        return '⚪'
    }
  }

  const getOutputIcon = (type: string): string => {
    switch (type) {
      case 'lamp':
        return '💡'
      case 'motor':
        return '⚙️'
      case 'valve':
        return '🔧'
      case 'buzzer':
        return '🔔'
      default:
        return '⚪'
    }
  }

  return (
    <div className="space-y-4">
      {config.instruction && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <p className="text-blue-800">{config.instruction}</p>
        </div>
      )}

      {/* Objectives */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3">
          Objectifs ({completedCount}/{objectives.length})
        </h3>
        <div className="space-y-2">
          {objectives.map((obj) => (
            <div
              key={obj.id}
              className={`
                flex items-center gap-3 p-3 rounded-lg
                ${obj.completed ? 'bg-green-100' : 'bg-white'}
              `}
            >
              <span className={obj.completed ? 'text-green-500' : 'text-gray-300'}>
                {obj.completed ? '✓' : '○'}
              </span>
              <span className={obj.completed ? 'text-green-700' : 'text-gray-700'}>
                {obj.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inputs */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-700 mb-3">Entrées</h4>
          <div className="grid grid-cols-2 gap-3">
            {config.inputs.map((input) => {
              const state = plcState.inputs.get(input.address)
              const isOn = state?.value ?? false

              return (
                <button
                  key={input.address}
                  onClick={() => toggleInput(input.address)}
                  disabled={showResult}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-left
                    ${isOn
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{getInputIcon(input.type)}</span>
                    <span className="font-mono text-sm text-gray-500">{input.address}</span>
                  </div>
                  <div className={`font-medium ${isOn ? 'text-green-700' : 'text-gray-700'}`}>
                    {input.label}
                  </div>
                  <div className={`text-sm ${isOn ? 'text-green-600' : 'text-gray-400'}`}>
                    {isOn ? 'ON' : 'OFF'}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Outputs */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-700 mb-3">Sorties</h4>
          <div className="grid grid-cols-2 gap-3">
            {config.outputs.map((output) => {
              const state = plcState.outputs.get(output.address)
              const isOn = state?.value ?? false

              return (
                <div
                  key={output.address}
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${isOn
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xl ${isOn ? 'animate-pulse' : ''}`}>
                      {getOutputIcon(output.type)}
                    </span>
                    <span className="font-mono text-sm text-gray-500">{output.address}</span>
                  </div>
                  <div className={`font-medium ${isOn ? 'text-yellow-700' : 'text-gray-700'}`}>
                    {output.label}
                  </div>
                  <div className={`text-sm ${isOn ? 'text-yellow-600' : 'text-gray-400'}`}>
                    {isOn ? 'ON' : 'OFF'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
        <button
          onClick={isRunning ? stopSimulation : startSimulation}
          disabled={showResult}
          className={`
            px-6 py-2 rounded-lg font-medium transition-all
            ${isRunning
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
            }
          `}
        >
          {isRunning ? '⏸ Pause' : '▶ Démarrer'}
        </button>

        <button
          onClick={resetSimulation}
          disabled={showResult}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          🔄 Réinitialiser
        </button>

        <div className="flex-1" />

        {/* Timer */}
        <div className="text-gray-600">
          <span className="font-mono">
            {Math.floor(timeElapsed / 1000)}.{String(Math.floor((timeElapsed % 1000) / 100)).padStart(1, '0')}s
          </span>
          {config.timeLimit && (
            <span className="text-gray-400 ml-2">/ {config.timeLimit}s</span>
          )}
        </div>

        {/* Running indicator */}
        {isRunning && (
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm">En cours</span>
          </div>
        )}
      </div>

      {/* Success message */}
      {allCompleted && !showResult && (
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <span className="text-4xl">🎉</span>
          <p className="text-green-700 font-medium mt-2">
            Tous les objectifs sont atteints !
          </p>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
            {isCorrect
              ? 'Simulation réussie ! Tous les objectifs ont été atteints.'
              : `${objectives.length - completedCount} objectif(s) non atteint(s).`}
          </p>
        </div>
      )}
    </div>
  )
}
