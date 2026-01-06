import { useState, useEffect, useRef, useCallback } from 'react'
import type { WiringConfig, WiringAnswer } from '../../types/exercises'

interface Props {
  config: WiringConfig
  onAnswer: (answer: WiringAnswer) => void
  showResult?: boolean
  correctAnswer?: [string, string][]
  isCorrect?: boolean
}

interface Point {
  x: number
  y: number
}

const componentIcons: Record<string, string> = {
  plc: '🎛️',
  sensor: '📡',
  actuator: '⚙️',
  relay: '🔌',
  power: '⚡',
  ground: '🔻',
}

export default function WiringExercise({
  config,
  onAnswer,
  showResult = false,
  correctAnswer,
  isCorrect,
}: Props) {
  const [connections, setConnections] = useState<[string, string][]>([])
  const [selectedTerminal, setSelectedTerminal] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState<Point | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onAnswer({ connections })
  }, [connections, onAnswer])

  const getTerminalPosition = useCallback((terminalId: string): Point | null => {
    for (const component of config.components) {
      const terminal = component.terminals.find((t) => t.id === terminalId)
      if (terminal) {
        let x = component.x
        let y = component.y

        // Calculate terminal position based on side and offset
        const componentWidth = 120
        const componentHeight = 80

        switch (terminal.position) {
          case 'top':
            x += (terminal.offset / 100) * componentWidth
            break
          case 'bottom':
            x += (terminal.offset / 100) * componentWidth
            y += componentHeight
            break
          case 'left':
            y += (terminal.offset / 100) * componentHeight
            break
          case 'right':
            x += componentWidth
            y += (terminal.offset / 100) * componentHeight
            break
        }

        return { x, y }
      }
    }
    return null
  }, [config.components])

  const handleTerminalClick = (terminalId: string) => {
    if (showResult) return

    if (selectedTerminal === null) {
      setSelectedTerminal(terminalId)
    } else if (selectedTerminal === terminalId) {
      setSelectedTerminal(null)
    } else {
      // Create connection
      const newConnection: [string, string] = [selectedTerminal, terminalId]

      // Check if connection already exists
      const exists = connections.some(
        ([t1, t2]) =>
          (t1 === selectedTerminal && t2 === terminalId) ||
          (t1 === terminalId && t2 === selectedTerminal)
      )

      if (!exists) {
        setConnections([...connections, newConnection])
      }
      setSelectedTerminal(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectedTerminal || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const removeConnection = (index: number) => {
    setConnections(connections.filter((_, i) => i !== index))
  }

  const isConnectionCorrect = (t1: string, t2: string): boolean | null => {
    if (!showResult || !correctAnswer) return null
    return correctAnswer.some(
      ([c1, c2]) => (c1 === t1 && c2 === t2) || (c1 === t2 && c2 === t1)
    )
  }

  const getMissingConnections = (): [string, string][] => {
    if (!correctAnswer) return []
    return correctAnswer.filter(
      ([c1, c2]) =>
        !connections.some(
          ([t1, t2]) => (t1 === c1 && t2 === c2) || (t1 === c2 && t2 === c1)
        )
    )
  }

  const getTerminalColor = (type: string): string => {
    switch (type) {
      case 'input':
        return 'bg-blue-500'
      case 'output':
        return 'bg-green-500'
      case 'power':
        return 'bg-red-500'
      case 'ground':
        return 'bg-gray-700'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      {config.instruction && (
        <p className="text-gray-600 mb-4">{config.instruction}</p>
      )}

      {/* Wiring canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden"
        style={{ height: '500px' }}
      >
        {/* SVG for wires */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Existing connections */}
          {connections.map(([t1, t2], index) => {
            const p1 = getTerminalPosition(t1)
            const p2 = getTerminalPosition(t2)
            if (!p1 || !p2) return null

            const isCorrectWire = isConnectionCorrect(t1, t2)
            const color = showResult
              ? isCorrectWire
                ? '#22c55e'
                : '#ef4444'
              : '#6366f1'

            return (
              <g key={`wire-${index}`}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={color}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {!showResult && (
                  <circle
                    cx={(p1.x + p2.x) / 2}
                    cy={(p1.y + p2.y) / 2}
                    r="10"
                    fill="white"
                    stroke={color}
                    strokeWidth="2"
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => removeConnection(index)}
                  />
                )}
                {!showResult && (
                  <text
                    x={(p1.x + p2.x) / 2}
                    y={(p1.y + p2.y) / 2 + 4}
                    textAnchor="middle"
                    fontSize="12"
                    fill={color}
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => removeConnection(index)}
                  >
                    ×
                  </text>
                )}
              </g>
            )
          })}

          {/* Line while connecting */}
          {selectedTerminal && mousePos && (
            <line
              x1={getTerminalPosition(selectedTerminal)?.x || 0}
              y1={getTerminalPosition(selectedTerminal)?.y || 0}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}

          {/* Missing connections (shown after result) */}
          {showResult &&
            getMissingConnections().map(([t1, t2], index) => {
              const p1 = getTerminalPosition(t1)
              const p2 = getTerminalPosition(t2)
              if (!p1 || !p2) return null

              return (
                <line
                  key={`missing-${index}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity="0.5"
                />
              )
            })}
        </svg>

        {/* Components */}
        {config.components.map((component) => (
          <div
            key={component.id}
            className="absolute bg-white rounded-lg shadow-md border-2 border-gray-300"
            style={{
              left: component.x,
              top: component.y,
              width: 120,
              height: 80,
            }}
          >
            <div className="h-full flex flex-col items-center justify-center p-2">
              <span className="text-2xl">{componentIcons[component.type] || '📦'}</span>
              <span className="text-xs font-medium text-gray-600 text-center truncate w-full">
                {component.label}
              </span>
            </div>

            {/* Terminals */}
            {component.terminals.map((terminal) => {
              let posStyle: React.CSSProperties = {}

              switch (terminal.position) {
                case 'top':
                  posStyle = {
                    left: `${terminal.offset}%`,
                    top: -6,
                    transform: 'translateX(-50%)',
                  }
                  break
                case 'bottom':
                  posStyle = {
                    left: `${terminal.offset}%`,
                    bottom: -6,
                    transform: 'translateX(-50%)',
                  }
                  break
                case 'left':
                  posStyle = {
                    left: -6,
                    top: `${terminal.offset}%`,
                    transform: 'translateY(-50%)',
                  }
                  break
                case 'right':
                  posStyle = {
                    right: -6,
                    top: `${terminal.offset}%`,
                    transform: 'translateY(-50%)',
                  }
                  break
              }

              const isSelected = selectedTerminal === terminal.id

              return (
                <button
                  key={terminal.id}
                  onClick={() => handleTerminalClick(terminal.id)}
                  disabled={showResult}
                  className={`
                    absolute w-4 h-4 rounded-full border-2 transition-all
                    ${getTerminalColor(terminal.type)}
                    ${isSelected ? 'ring-4 ring-primary-300 scale-125' : ''}
                    ${!showResult ? 'hover:scale-110 cursor-pointer' : ''}
                  `}
                  style={posStyle}
                  title={`${terminal.label} (${terminal.type})`}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <span>Entrée</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span>Sortie</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span>Alimentation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-700" />
          <span>Masse</span>
        </div>
      </div>

      {/* Instructions */}
      {!showResult && (
        <p className="text-sm text-gray-500">
          {selectedTerminal
            ? 'Cliquez sur une autre borne pour créer une connexion'
            : 'Cliquez sur une borne pour commencer le câblage'}
        </p>
      )}

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
            {isCorrect
              ? 'Câblage correct !'
              : `${getMissingConnections().length} connexion(s) manquante(s) ou incorrecte(s)`}
          </p>
          {!isCorrect && getMissingConnections().length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Les connexions en pointillés vert indiquent les câbles manquants.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
