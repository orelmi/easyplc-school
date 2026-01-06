import { useState, useEffect } from 'react'
import type { MatchingConfig, MatchingAnswer } from '../../types/exercises'

interface Props {
  config: MatchingConfig
  onAnswer: (answer: MatchingAnswer) => void
  showResult?: boolean
  correctAnswer?: [string, string][]
  isCorrect?: boolean
}

export default function MatchingExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [pairs, setPairs] = useState<[string, string][]>([])
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)

  useEffect(() => {
    onAnswer({ pairs })
  }, [pairs, onAnswer])

  useEffect(() => {
    // When both sides are selected, create a pair
    if (selectedLeft && selectedRight) {
      // Remove any existing pair with either side
      const filteredPairs = pairs.filter(
        ([l, r]) => l !== selectedLeft && r !== selectedRight
      )
      setPairs([...filteredPairs, [selectedLeft, selectedRight]])
      setSelectedLeft(null)
      setSelectedRight(null)
    }
  }, [selectedLeft, selectedRight, pairs])

  const handleLeftClick = (id: string) => {
    if (showResult) return
    setSelectedLeft(selectedLeft === id ? null : id)
  }

  const handleRightClick = (id: string) => {
    if (showResult) return
    setSelectedRight(selectedRight === id ? null : id)
  }

  const removePair = (leftId: string) => {
    setPairs(pairs.filter(([l]) => l !== leftId))
  }

  const getLeftPaired = (leftId: string): string | undefined => {
    const pair = pairs.find(([l]) => l === leftId)
    return pair?.[1]
  }

  const getRightPaired = (rightId: string): string | undefined => {
    const pair = pairs.find(([, r]) => r === rightId)
    return pair?.[0]
  }

  const isPairCorrect = (leftId: string, rightId: string): boolean | null => {
    if (!showResult || !correctAnswer) return null
    return correctAnswer.some(([l, r]) => l === leftId && r === rightId)
  }

  const getPairStatus = (leftId: string): 'correct' | 'incorrect' | 'unpaired' | null => {
    if (!showResult) return null
    const pairedRight = getLeftPaired(leftId)
    if (!pairedRight) return 'unpaired'
    return isPairCorrect(leftId, pairedRight) ? 'correct' : 'incorrect'
  }

  // SVG for drawing connection lines
  const renderConnections = () => {
    if (pairs.length === 0) return null

    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      >
        {pairs.map(([leftId, rightId]) => {
          const leftEl = document.getElementById(`left-${leftId}`)
          const rightEl = document.getElementById(`right-${rightId}`)
          const containerEl = document.getElementById('matching-container')

          if (!leftEl || !rightEl || !containerEl) return null

          const containerRect = containerEl.getBoundingClientRect()
          const leftRect = leftEl.getBoundingClientRect()
          const rightRect = rightEl.getBoundingClientRect()

          const x1 = leftRect.right - containerRect.left
          const y1 = leftRect.top - containerRect.top + leftRect.height / 2
          const x2 = rightRect.left - containerRect.left
          const y2 = rightRect.top - containerRect.top + rightRect.height / 2

          const isCorrectPair = isPairCorrect(leftId, rightId)
          const color = showResult
            ? isCorrectPair
              ? '#22c55e'
              : '#ef4444'
            : '#6366f1'

          return (
            <line
              key={`${leftId}-${rightId}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="2"
              strokeDasharray={showResult && !isCorrectPair ? '5,5' : undefined}
            />
          )
        })}
      </svg>
    )
  }

  return (
    <div className="space-y-4">
      {config.instruction && (
        <p className="text-gray-600 mb-4">{config.instruction}</p>
      )}

      <div id="matching-container" className="relative flex justify-between gap-8">
        {/* Left column */}
        <div className="flex-1 space-y-3">
          <div className="text-sm font-medium text-gray-500 mb-2">Associez...</div>
          {config.leftItems.map((item) => {
            const paired = getLeftPaired(item.id)
            const status = getPairStatus(item.id)

            return (
              <div
                key={item.id}
                id={`left-${item.id}`}
                onClick={() => !paired && handleLeftClick(item.id)}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${!showResult && !paired ? 'cursor-pointer hover:border-primary-300' : ''}
                  ${selectedLeft === item.id ? 'border-primary-500 bg-primary-50' : ''}
                  ${paired && !showResult ? 'border-gray-300 bg-gray-50' : ''}
                  ${status === 'correct' ? 'border-green-500 bg-green-50' : ''}
                  ${status === 'incorrect' ? 'border-red-500 bg-red-50' : ''}
                  ${status === 'unpaired' ? 'border-yellow-500 bg-yellow-50' : ''}
                  ${!status && !selectedLeft ? 'border-gray-200' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img src={item.image} alt="" className="h-10 w-10 object-contain" />
                  )}
                  <span className={`
                    ${status === 'correct' ? 'text-green-700' : ''}
                    ${status === 'incorrect' ? 'text-red-700' : ''}
                  `}>
                    {item.content}
                  </span>
                  {paired && !showResult && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removePair(item.id)
                      }}
                      className="ml-auto text-gray-400 hover:text-red-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Connection lines */}
        {renderConnections()}

        {/* Right column */}
        <div className="flex-1 space-y-3">
          <div className="text-sm font-medium text-gray-500 mb-2">...avec</div>
          {config.rightItems.map((item) => {
            const pairedBy = getRightPaired(item.id)
            const paired = !!pairedBy
            const pairStatus = pairedBy ? getPairStatus(pairedBy) : null

            return (
              <div
                key={item.id}
                id={`right-${item.id}`}
                onClick={() => !paired && handleRightClick(item.id)}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${!showResult && !paired ? 'cursor-pointer hover:border-primary-300' : ''}
                  ${selectedRight === item.id ? 'border-primary-500 bg-primary-50' : ''}
                  ${paired && !showResult ? 'border-gray-300 bg-gray-50' : ''}
                  ${pairStatus === 'correct' ? 'border-green-500 bg-green-50' : ''}
                  ${pairStatus === 'incorrect' ? 'border-red-500 bg-red-50' : ''}
                  ${!pairStatus && !selectedRight ? 'border-gray-200' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img src={item.image} alt="" className="h-10 w-10 object-contain" />
                  )}
                  <span className={`
                    ${pairStatus === 'correct' ? 'text-green-700' : ''}
                    ${pairStatus === 'incorrect' ? 'text-red-700' : ''}
                  `}>
                    {item.content}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Instructions */}
      {!showResult && pairs.length < config.leftItems.length && (
        <p className="text-sm text-gray-500 text-center">
          {selectedLeft
            ? 'Maintenant, cliquez sur l\'élément correspondant à droite'
            : 'Cliquez sur un élément à gauche, puis sur son correspondant à droite'}
        </p>
      )}

      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
            {isCorrect
              ? 'Toutes les associations sont correctes !'
              : 'Certaines associations sont incorrectes.'}
          </p>
        </div>
      )}
    </div>
  )
}
