import { useState, useEffect, useCallback } from 'react'
import type { OrderingConfig, OrderingAnswer } from '../../types/exercises'

interface Props {
  config: OrderingConfig
  onAnswer: (answer: OrderingAnswer) => void
  showResult?: boolean
  correctAnswer?: string[]
  isCorrect?: boolean
}

export default function OrderingExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [items, setItems] = useState<typeof config.items>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  useEffect(() => {
    // Shuffle items initially
    const shuffled = [...config.items].sort(() => Math.random() - 0.5)
    setItems(shuffled)
  }, [config])

  useEffect(() => {
    onAnswer({ order: items.map((item) => item.id) })
  }, [items, onAnswer])

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newItems = [...items]
    const draggedItem = newItems[draggedIndex]
    newItems.splice(draggedIndex, 1)
    newItems.splice(index, 0, draggedItem)
    setItems(newItems)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const moveItem = useCallback((fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1
    if (toIndex < 0 || toIndex >= items.length) return

    const newItems = [...items]
    const item = newItems[fromIndex]
    newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, item)
    setItems(newItems)
  }, [items])

  const getItemStatus = (itemId: string, index: number): 'correct' | 'incorrect' | null => {
    if (!showResult || !correctAnswer) return null
    return correctAnswer[index] === itemId ? 'correct' : 'incorrect'
  }

  return (
    <div className="space-y-4">
      {config.instruction && (
        <p className="text-gray-600 mb-4">{config.instruction}</p>
      )}

      <div className="space-y-2">
        {items.map((item, index) => {
          const status = getItemStatus(item.id, index)

          return (
            <div
              key={item.id}
              draggable={!showResult}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center gap-3 p-4 rounded-lg border-2 transition-all
                ${!showResult ? 'cursor-grab active:cursor-grabbing hover:border-primary-300' : ''}
                ${draggedIndex === index ? 'opacity-50 border-primary-500' : ''}
                ${status === 'correct' ? 'border-green-500 bg-green-50' : ''}
                ${status === 'incorrect' ? 'border-red-500 bg-red-50' : ''}
                ${status === null ? 'border-gray-200 bg-white' : ''}
              `}
            >
              {/* Position number */}
              <span className={`
                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                ${status === 'correct' ? 'bg-green-500 text-white' : ''}
                ${status === 'incorrect' ? 'bg-red-500 text-white' : ''}
                ${status === null ? 'bg-gray-200 text-gray-700' : ''}
              `}>
                {index + 1}
              </span>

              {/* Content */}
              <div className="flex-1">
                {item.image && (
                  <img src={item.image} alt="" className="h-12 object-contain mb-2" />
                )}
                <span className={`
                  ${status === 'correct' ? 'text-green-700' : ''}
                  ${status === 'incorrect' ? 'text-red-700' : ''}
                `}>
                  {item.content}
                </span>
              </div>

              {/* Move buttons (for accessibility) */}
              {!showResult && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    title="Monter"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    title="Descendre"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Drag handle */}
              {!showResult && (
                <div className="text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                </div>
              )}

              {/* Status icon */}
              {showResult && status && (
                <span className={status === 'correct' ? 'text-green-500' : 'text-red-500'}>
                  {status === 'correct' ? '✓' : '✗'}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
            {isCorrect
              ? 'Parfait ! L\'ordre est correct.'
              : 'L\'ordre n\'est pas tout à fait correct. Révisez la séquence.'}
          </p>
        </div>
      )}
    </div>
  )
}
