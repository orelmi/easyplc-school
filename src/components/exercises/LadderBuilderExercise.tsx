import { useState, useEffect, useCallback } from 'react'
import type { LadderBuilderConfig, LadderBuilderAnswer } from '../../types/exercises'
import {
  type LadderRung,
  type LadderElement,
  type PLCProgram,
  type PLCState,
  createPLCState,
  executeCycle,
} from '../../lib/plc-simulator'

interface Props {
  config: LadderBuilderConfig
  onAnswer: (answer: LadderBuilderAnswer) => void
  showResult?: boolean
  correctAnswer?: unknown
  isCorrect?: boolean
}

type ElementCategory = 'contact' | 'coil' | 'timer' | 'counter'

export default function LadderBuilderExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [rungs, setRungs] = useState<LadderRung[]>([])
  const [selectedElement, setSelectedElement] = useState<{ category: ElementCategory; subtype: string } | null>(null)
  const [plcState, setPlcState] = useState<PLCState>(createPLCState())
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([])

  // Initialize with one empty rung
  useEffect(() => {
    setRungs([{ id: 1, elements: [], powerFlow: false }])
  }, [])

  // Update answer when rungs change
  useEffect(() => {
    const program: PLCProgram = {
      name: 'User Program',
      rungs,
    }
    onAnswer({ program: JSON.stringify(program) })
  }, [rungs, onAnswer])

  // Run simulation loop
  useEffect(() => {
    if (!isRunning) return

    const program: PLCProgram = { name: 'User Program', rungs }
    const interval = setInterval(() => {
      setPlcState((prev) => {
        const newState = { ...prev }
        executeCycle(program, newState, 10)
        return newState
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isRunning, rungs])

  const addRung = () => {
    const newId = Math.max(...rungs.map((r) => r.id), 0) + 1
    setRungs([...rungs, { id: newId, elements: [], powerFlow: false }])
  }

  const removeRung = (id: number) => {
    if (rungs.length <= 1) return
    setRungs(rungs.filter((r) => r.id !== id))
  }

  const addElementToRung = useCallback((rungId: number, element: LadderElement) => {
    setRungs((prev) =>
      prev.map((rung) =>
        rung.id === rungId
          ? { ...rung, elements: [...rung.elements, element] }
          : rung
      )
    )
    setSelectedElement(null)
  }, [])

  const removeElementFromRung = (rungId: number, elementIndex: number) => {
    setRungs((prev) =>
      prev.map((rung) =>
        rung.id === rungId
          ? { ...rung, elements: rung.elements.filter((_, i) => i !== elementIndex) }
          : rung
      )
    )
  }

  const toggleInput = (address: string) => {
    setPlcState((prev) => {
      const newState = { ...prev }
      const input = newState.inputs.get(address)
      if (input) {
        input.value = !input.value
      }
      return newState
    })
  }

  const startSimulation = () => {
    setPlcState((prev) => ({ ...prev, running: true }))
    setIsRunning(true)
  }

  const stopSimulation = () => {
    setPlcState((prev) => ({ ...prev, running: false }))
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setPlcState(createPLCState())
    setTestResults([])
  }

  const runTests = () => {
    if (!config.testScenario) return

    const program: PLCProgram = { name: 'Test', rungs }
    const results: { passed: boolean; message: string }[] = []

    for (const step of config.testScenario.steps) {
      const testState = createPLCState()

      // Parse action to set inputs
      // Example: "Set I0.0 = ON"
      const actionMatch = step.action.match(/Set\s+(\w+\.\d+)\s*=\s*(ON|OFF)/i)
      if (actionMatch) {
        const [, address, value] = actionMatch
        const input = testState.inputs.get(address)
        if (input) {
          input.value = value.toUpperCase() === 'ON'
        }
      }

      testState.running = true
      executeCycle(program, testState, 10)

      // Check expected state
      let passed = true
      for (const [address, expectedValue] of Object.entries(step.expectedState)) {
        const output = testState.outputs.get(address)
        if (output && output.value !== expectedValue) {
          passed = false
        }
      }

      results.push({
        passed,
        message: step.action,
      })
    }

    setTestResults(results)
  }

  const renderElement = (element: LadderElement): string => {
    switch (element.type) {
      case 'contact':
        if (element.contactType === 'NO') return `--| |--`
        if (element.contactType === 'NC') return `--|/|--`
        if (element.contactType === 'P') return `--|P|--`
        if (element.contactType === 'N') return `--|N|--`
        return '--| |--'
      case 'coil':
        if (element.coilType === 'normal') return `--( )--`
        if (element.coilType === 'set') return `--(S)--`
        if (element.coilType === 'reset') return `--(R)--`
        if (element.coilType === 'negated') return `--(/)--`
        return '--( )--'
      case 'timer':
        return `--[${element.timerType}]--`
      case 'counter':
        return `--[${element.counterType}]--`
      default:
        return '--[?]--'
    }
  }

  return (
    <div className="space-y-4">
      {config.instruction && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <p className="text-blue-800">{config.instruction}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Element palette */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Éléments</h3>

          {/* Contacts */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Contacts</h4>
            <div className="flex flex-wrap gap-2">
              {config.availableElements.contacts.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedElement({ category: 'contact', subtype: type })}
                  disabled={showResult}
                  className={`
                    px-3 py-2 rounded border font-mono text-sm
                    ${selectedElement?.category === 'contact' && selectedElement?.subtype === type
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 bg-white hover:border-primary-300'
                    }
                  `}
                >
                  {type === 'NO' && '--| |--'}
                  {type === 'NC' && '--|/|--'}
                  {type === 'P' && '--|P|--'}
                  {type === 'N' && '--|N|--'}
                </button>
              ))}
            </div>
          </div>

          {/* Coils */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Bobines</h4>
            <div className="flex flex-wrap gap-2">
              {config.availableElements.coils.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedElement({ category: 'coil', subtype: type })}
                  disabled={showResult}
                  className={`
                    px-3 py-2 rounded border font-mono text-sm
                    ${selectedElement?.category === 'coil' && selectedElement?.subtype === type
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 bg-white hover:border-primary-300'
                    }
                  `}
                >
                  {type === 'normal' && '--( )--'}
                  {type === 'set' && '--(S)--'}
                  {type === 'reset' && '--(R)--'}
                  {type === 'negated' && '--(/)--'}
                </button>
              ))}
            </div>
          </div>

          {/* Timers */}
          {config.availableElements.timers.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Temporisateurs</h4>
              <div className="flex flex-wrap gap-2">
                {config.availableElements.timers.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedElement({ category: 'timer', subtype: type })}
                    disabled={showResult}
                    className={`
                      px-3 py-2 rounded border font-mono text-sm
                      ${selectedElement?.category === 'timer' && selectedElement?.subtype === type
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 bg-white hover:border-primary-300'
                      }
                    `}
                  >
                    [{type}]
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Address selector */}
          {selectedElement && (
            <div className="mt-4 p-3 bg-white rounded border">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Sélectionner l'adresse</h4>
              <div className="flex flex-wrap gap-2">
                {(selectedElement.category === 'contact'
                  ? [...config.inputs, ...(config.memory || [])]
                  : config.outputs
                ).map((item) => (
                  <button
                    key={item.address}
                    onClick={() => {
                      const element: LadderElement = selectedElement.category === 'contact'
                        ? {
                            type: 'contact',
                            contactType: selectedElement.subtype as any,
                            address: item.address,
                            label: item.label,
                          }
                        : selectedElement.category === 'coil'
                        ? {
                            type: 'coil',
                            coilType: selectedElement.subtype as any,
                            address: item.address,
                            label: item.label,
                          }
                        : {
                            type: 'timer',
                            timerType: selectedElement.subtype as any,
                            address: item.address,
                            preset: 1000,
                            label: item.label,
                          }

                      // Add to first rung with space, or create new
                      const targetRung = rungs.find((r) => r.elements.length < 5) || rungs[rungs.length - 1]
                      addElementToRung(targetRung.id, element)
                    }}
                    className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-primary-100"
                  >
                    {item.address} ({item.label})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ladder editor */}
        <div className="lg:col-span-2 bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Programme LADDER</h3>
            {!showResult && (
              <button
                onClick={addRung}
                disabled={rungs.length >= (config.maxRungs || 10)}
                className="text-sm px-3 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
              >
                + Ajouter ligne
              </button>
            )}
          </div>

          <div className="space-y-2 font-mono text-sm">
            {rungs.map((rung, rungIndex) => (
              <div
                key={rung.id}
                className={`
                  flex items-center gap-2 p-2 rounded border
                  ${rung.powerFlow ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}
                `}
              >
                <span className="text-gray-400 w-6">{rungIndex + 1}</span>
                <div className="flex-1 flex items-center gap-1 overflow-x-auto">
                  <span className="text-gray-400">|</span>
                  {rung.elements.map((element, elemIndex) => (
                    <div
                      key={elemIndex}
                      className="relative group px-2 py-1 bg-white rounded border"
                    >
                      <div className="text-xs text-gray-500 text-center">
                        {(element as any).address}
                      </div>
                      <div>{renderElement(element)}</div>
                      {!showResult && (
                        <button
                          onClick={() => removeElementFromRung(rung.id, elemIndex)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {rung.elements.length === 0 && (
                    <span className="text-gray-300 italic">
                      Sélectionnez un élément à gauche
                    </span>
                  )}
                  <span className="text-gray-400">|</span>
                </div>
                {!showResult && rungs.length > 1 && (
                  <button
                    onClick={() => removeRung(rung.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simulation panel */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Simulation</h3>

        <div className="flex gap-4 mb-4">
          <button
            onClick={isRunning ? stopSimulation : startSimulation}
            disabled={showResult}
            className={`px-4 py-2 rounded ${
              isRunning
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isRunning ? 'Stop' : 'Démarrer'}
          </button>
          <button
            onClick={resetSimulation}
            disabled={showResult}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Réinitialiser
          </button>
          {config.testScenario && (
            <button
              onClick={runTests}
              disabled={showResult}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Tester
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Inputs */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Entrées</h4>
            <div className="flex flex-wrap gap-2">
              {config.inputs.map((input) => {
                const state = plcState.inputs.get(input.address)
                return (
                  <button
                    key={input.address}
                    onClick={() => toggleInput(input.address)}
                    disabled={showResult}
                    className={`
                      px-3 py-2 rounded border text-sm
                      ${state?.value
                        ? 'bg-green-500 text-white border-green-600'
                        : 'bg-gray-100 text-gray-700 border-gray-300'
                      }
                    `}
                  >
                    {input.address}: {input.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Outputs */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Sorties</h4>
            <div className="flex flex-wrap gap-2">
              {config.outputs.map((output) => {
                const state = plcState.outputs.get(output.address)
                return (
                  <div
                    key={output.address}
                    className={`
                      px-3 py-2 rounded border text-sm
                      ${state?.value
                        ? 'bg-yellow-400 text-yellow-900 border-yellow-500'
                        : 'bg-gray-100 text-gray-700 border-gray-300'
                      }
                    `}
                  >
                    {output.address}: {output.label}
                    {state?.value && ' ON'}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Test results */}
        {testResults.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Résultats des tests</h4>
            <div className="space-y-1">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-sm ${
                    result.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {result.passed ? '✓' : '✗'} {result.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
            {isCorrect
              ? 'Programme LADDER correct !'
              : 'Le programme ne répond pas tout à fait aux exigences.'}
          </p>
        </div>
      )}
    </div>
  )
}
