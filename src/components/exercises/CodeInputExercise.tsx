import { useState, useEffect } from 'react'
import type { CodeInputConfig, CodeInputAnswer } from '../../types/exercises'

interface Props {
  config: CodeInputConfig
  onAnswer: (answer: CodeInputAnswer) => void
  showResult?: boolean
  correctAnswer?: string
  isCorrect?: boolean
}

const languageLabels: Record<string, string> = {
  ladder: 'LADDER (IEC 61131-3)',
  st: 'Structured Text',
  il: 'Instruction List',
  fbd: 'Function Block Diagram',
  sfc: 'Sequential Function Chart',
}

const languagePlaceholders: Record<string, string> = {
  ladder: '// Ex: LD I0.0\n//     AND I0.1\n//     ST Q0.0',
  st: '// Ex: IF input1 AND input2 THEN\n//       output := TRUE;\n//     END_IF;',
  il: '// Ex: LD %IX0.0\n//     AND %IX0.1\n//     ST %QX0.0',
  fbd: '// Décrivez les blocs fonctionnels...',
  sfc: '// Décrivez les étapes et transitions...',
}

export default function CodeInputExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [code, setCode] = useState(config.starterCode || '')

  useEffect(() => {
    onAnswer({ code })
  }, [code, onAnswer])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd

      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)

      // Move cursor after the tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="space-y-4">
      {/* Prompt */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
        <p className="text-blue-800">{config.prompt}</p>
      </div>

      {/* Language badge */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Langage:</span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
          {languageLabels[config.language] || config.language}
        </span>
      </div>

      {/* Code editor */}
      <div className="relative">
        <div className="absolute top-2 right-2 flex gap-2">
          {!showResult && (
            <button
              onClick={() => setCode('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 bg-white rounded border"
            >
              Effacer
            </button>
          )}
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={showResult}
          placeholder={languagePlaceholders[config.language] || 'Écrivez votre code ici...'}
          className={`
            w-full h-48 p-4 font-mono text-sm rounded-lg border-2 resize-none
            ${showResult
              ? isCorrect
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
              : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
            }
          `}
          spellCheck={false}
        />
      </div>

      {/* Test cases preview */}
      {config.testCases && config.testCases.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3">Cas de test:</h4>
          <div className="space-y-2">
            {config.testCases.map((testCase, index) => (
              <div key={index} className="text-sm">
                <span className="text-gray-500">#{index + 1}:</span>{' '}
                <span className="text-gray-700">{testCase.description}</span>
                <div className="ml-4 text-xs text-gray-500 mt-1">
                  <span className="text-blue-600">
                    Entrées: {Object.entries(testCase.inputs).map(([k, v]) => `${k}=${v ? '1' : '0'}`).join(', ')}
                  </span>
                  {' → '}
                  <span className="text-green-600">
                    Sorties: {Object.entries(testCase.expectedOutputs).map(([k, v]) => `${k}=${v ? '1' : '0'}`).join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? 'Code correct !' : 'Le code ne correspond pas à la solution attendue'}
          </p>
          {!isCorrect && correctAnswer && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Solution attendue:</p>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                {correctAnswer}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      {!showResult && (
        <div className="text-sm text-gray-500">
          <p>Astuce: Utilisez Tab pour indenter votre code</p>
        </div>
      )}
    </div>
  )
}
