import { useState, useEffect } from 'react'
import type { FillBlankConfig, FillBlankAnswer } from '../../types/exercises'

interface Props {
  config: FillBlankConfig
  onAnswer: (answer: FillBlankAnswer) => void
  showResult?: boolean
  correctAnswer?: Record<string, string>
  isCorrect?: boolean
}

export default function FillBlankExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    // Initialize answers
    const initial: Record<string, string> = {}
    config.blanks.forEach((blank) => {
      initial[blank.id] = ''
    })
    setAnswers(initial)
  }, [config])

  useEffect(() => {
    onAnswer({ blanks: answers })
  }, [answers, onAnswer])

  const handleChange = (blankId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [blankId]: value }))
  }

  // Parse template and render with input fields
  const renderTemplate = () => {
    const parts: React.ReactNode[] = []
    let currentIndex = 0
    let template = config.template

    // Sort blanks by position
    const sortedBlanks = [...config.blanks].sort((a, b) => a.position - b.position)

    sortedBlanks.forEach((blank, i) => {
      // Find the placeholder in the template
      const placeholderIndex = template.indexOf('___', currentIndex)
      const markerIndex = template.indexOf(`{${blank.position}}`, currentIndex)

      let insertIndex = -1
      let insertLength = 0

      if (placeholderIndex !== -1 && (markerIndex === -1 || placeholderIndex < markerIndex)) {
        insertIndex = placeholderIndex
        insertLength = 3 // '___'.length
      } else if (markerIndex !== -1) {
        insertIndex = markerIndex
        insertLength = `{${blank.position}}`.length
      }

      if (insertIndex !== -1) {
        // Add text before the blank
        if (insertIndex > currentIndex) {
          parts.push(
            <span key={`text-${i}`}>{template.slice(currentIndex, insertIndex)}</span>
          )
        }

        // Add the input field
        const isBlankCorrect = showResult && correctAnswer
          ? correctAnswer[blank.id]?.toLowerCase().split('|').includes(answers[blank.id]?.toLowerCase().trim())
          : null

        parts.push(
          <span key={`blank-${blank.id}`} className="inline-block mx-1">
            <input
              type="text"
              value={answers[blank.id] || ''}
              onChange={(e) => handleChange(blank.id, e.target.value)}
              disabled={showResult}
              placeholder={blank.hint || '...'}
              className={`
                px-3 py-1 border-2 rounded-lg text-center font-medium
                min-w-[100px] max-w-[200px]
                ${showResult
                  ? isBlankCorrect
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                }
              `}
            />
            {showResult && !isBlankCorrect && correctAnswer && (
              <span className="block text-sm text-green-600 mt-1">
                {correctAnswer[blank.id]?.split('|')[0]}
              </span>
            )}
          </span>
        )

        currentIndex = insertIndex + insertLength
      }
    })

    // Add remaining text
    if (currentIndex < template.length) {
      parts.push(<span key="text-end">{template.slice(currentIndex)}</span>)
    }

    return parts
  }

  return (
    <div className="space-y-4">
      <div className="text-lg leading-relaxed whitespace-pre-wrap">
        {renderTemplate()}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? 'Correct !' : 'Certaines réponses sont incorrectes'}
          </p>
        </div>
      )}
    </div>
  )
}
