import { useState, useEffect } from 'react'
import type { DragDropConfig, DragDropAnswer } from '../../types/exercises'

interface Props {
  config: DragDropConfig
  onAnswer: (answer: DragDropAnswer) => void
  showResult?: boolean
  correctAnswer?: Record<string, string[]>
  isCorrect?: boolean
}

export default function DragDropExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [placements, setPlacements] = useState<Record<string, string[]>>({})
  const [availableItems, setAvailableItems] = useState<typeof config.draggables>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  useEffect(() => {
    // Initialize available items
    setAvailableItems([...config.draggables])
    // Initialize empty placements for each zone
    const initialPlacements: Record<string, string[]> = {}
    config.dropZones.forEach((zone) => {
      initialPlacements[zone.id] = []
    })
    setPlacements(initialPlacements)
  }, [config])

  useEffect(() => {
    onAnswer({ placements })
  }, [placements, onAnswer])

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDropOnZone = (zoneId: string) => {
    if (!draggedItem) return

    const item = config.draggables.find((d) => d.id === draggedItem)
    const zone = config.dropZones.find((z) => z.id === zoneId)

    // Check if zone accepts this item type
    if (zone?.accepts && item?.type && !zone.accepts.includes(item.type)) {
      setDraggedItem(null)
      return
    }

    // Remove from available items
    setAvailableItems((prev) => prev.filter((i) => i.id !== draggedItem))

    // Remove from any other zone
    const newPlacements = { ...placements }
    Object.keys(newPlacements).forEach((key) => {
      newPlacements[key] = newPlacements[key].filter((id) => id !== draggedItem)
    })

    // Add to target zone
    newPlacements[zoneId] = [...(newPlacements[zoneId] || []), draggedItem]
    setPlacements(newPlacements)
    setDraggedItem(null)
  }

  const handleDropOnBank = () => {
    if (!draggedItem) return

    const item = config.draggables.find((d) => d.id === draggedItem)
    if (!item) return

    // Remove from all zones
    const newPlacements = { ...placements }
    Object.keys(newPlacements).forEach((key) => {
      newPlacements[key] = newPlacements[key].filter((id) => id !== draggedItem)
    })
    setPlacements(newPlacements)

    // Add back to available items
    if (!availableItems.find((i) => i.id === draggedItem)) {
      setAvailableItems((prev) => [...prev, item])
    }
    setDraggedItem(null)
  }

  const getZoneStatus = (zoneId: string): 'correct' | 'partial' | 'incorrect' | null => {
    if (!showResult || !correctAnswer) return null

    const expected = correctAnswer[zoneId] || []
    const actual = placements[zoneId] || []

    if (expected.length === 0 && actual.length === 0) return 'correct'

    const correctItems = actual.filter((id) => expected.includes(id))
    if (correctItems.length === expected.length && actual.length === expected.length) {
      return 'correct'
    } else if (correctItems.length > 0) {
      return 'partial'
    }
    return actual.length > 0 ? 'incorrect' : null
  }

  const getItemInZone = (itemId: string): string | null => {
    for (const [zoneId, items] of Object.entries(placements)) {
      if (items.includes(itemId)) return zoneId
    }
    return null
  }

  const isItemCorrect = (itemId: string): boolean | null => {
    if (!showResult || !correctAnswer) return null
    const zoneId = getItemInZone(itemId)
    if (!zoneId) return null
    return correctAnswer[zoneId]?.includes(itemId) ?? false
  }

  return (
    <div className="space-y-6">
      {config.instruction && (
        <p className="text-gray-600">{config.instruction}</p>
      )}

      {/* Drop zones */}
      <div className="relative">
        {config.backgroundImage && (
          <img
            src={config.backgroundImage}
            alt=""
            className="w-full rounded-lg"
          />
        )}

        <div className={`${config.backgroundImage ? 'absolute inset-0' : ''} grid grid-cols-2 md:grid-cols-3 gap-4`}>
          {config.dropZones.map((zone) => {
            const status = getZoneStatus(zone.id)
            const zoneItems = placements[zone.id] || []

            return (
              <div
                key={zone.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDropOnZone(zone.id)}
                style={
                  config.backgroundImage
                    ? {
                        position: 'absolute',
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: zone.width,
                        height: zone.height,
                      }
                    : undefined
                }
                className={`
                  min-h-[120px] p-4 rounded-lg border-2 border-dashed transition-all
                  ${!showResult ? 'hover:border-primary-400 hover:bg-primary-50' : ''}
                  ${status === 'correct' ? 'border-green-500 bg-green-50' : ''}
                  ${status === 'partial' ? 'border-yellow-500 bg-yellow-50' : ''}
                  ${status === 'incorrect' ? 'border-red-500 bg-red-50' : ''}
                  ${status === null ? 'border-gray-300 bg-gray-50' : ''}
                `}
              >
                <div className="text-sm font-medium text-gray-500 mb-2">{zone.label}</div>
                <div className="flex flex-wrap gap-2">
                  {zoneItems.map((itemId) => {
                    const item = config.draggables.find((d) => d.id === itemId)
                    const itemCorrect = isItemCorrect(itemId)
                    if (!item) return null

                    return (
                      <div
                        key={itemId}
                        draggable={!showResult}
                        onDragStart={() => handleDragStart(itemId)}
                        className={`
                          px-3 py-2 rounded-lg shadow-sm cursor-grab
                          ${showResult
                            ? itemCorrect
                              ? 'bg-green-100 text-green-700 border border-green-300'
                              : 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-white text-gray-700 border border-gray-200 hover:shadow-md'
                          }
                        `}
                      >
                        {item.image && (
                          <img src={item.image} alt="" className="h-8 w-8 object-contain mb-1" />
                        )}
                        <span className="text-sm">{item.content}</span>
                        {showResult && (
                          <span className="ml-2">{itemCorrect ? '✓' : '✗'}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                {zoneItems.length === 0 && (
                  <div className="text-gray-400 text-sm">
                    Déposez les éléments ici
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Item bank */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropOnBank}
        className={`
          p-4 rounded-lg border-2 min-h-[80px]
          ${!showResult ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50'}
        `}
      >
        <div className="text-sm font-medium text-gray-500 mb-3">
          Éléments disponibles
        </div>
        <div className="flex flex-wrap gap-2">
          {availableItems.map((item) => (
            <div
              key={item.id}
              draggable={!showResult}
              onDragStart={() => handleDragStart(item.id)}
              className={`
                px-3 py-2 rounded-lg shadow-sm transition-all
                ${!showResult
                  ? 'bg-primary-50 text-primary-700 border border-primary-200 cursor-grab hover:shadow-md'
                  : 'bg-gray-100 text-gray-500 border border-gray-200'
                }
              `}
            >
              {item.image && (
                <img src={item.image} alt="" className="h-8 w-8 object-contain mb-1" />
              )}
              <span className="text-sm">{item.content}</span>
            </div>
          ))}
          {availableItems.length === 0 && !showResult && (
            <div className="text-gray-400 text-sm">
              Tous les éléments ont été placés
            </div>
          )}
        </div>
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
            {isCorrect
              ? 'Tous les éléments sont correctement placés !'
              : 'Certains éléments ne sont pas au bon endroit.'}
          </p>
        </div>
      )}
    </div>
  )
}
