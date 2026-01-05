import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SimulationResult, MachineState } from '../lib/gcode-parser';

interface GCodeConsoleProps {
  result: SimulationResult | null;
  currentLine?: number;
  machineState?: MachineState;
}

export default function GCodeConsole({
  result,
  currentLine,
  machineState
}: GCodeConsoleProps) {
  const { t } = useTranslation();
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [result, currentLine]);

  const formatNumber = (n: number) => n.toFixed(2);
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs.toFixed(0)}s`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">
          {t('simulator.console', 'Console')}
        </span>
        {result && (
          <span className={`px-2 py-0.5 text-xs rounded-full ${
            result.success ? 'bg-green-600' : 'bg-red-600'
          } text-white`}>
            {result.success
              ? t('simulator.valid', 'Valid')
              : t('simulator.hasErrors', 'Has Errors')}
          </span>
        )}
      </div>

      {/* Console Body */}
      <div
        ref={consoleRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm"
      >
        {!result ? (
          <div className="text-gray-500 italic">
            {t('simulator.noSimulation', 'Run simulation to see output...')}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Errors */}
            {result.errors.length > 0 && (
              <div className="space-y-1">
                <div className="text-red-400 font-semibold">
                  {t('simulator.errors', 'Errors')}:
                </div>
                {result.errors.map((error, index) => (
                  <div key={index} className="text-red-300 pl-4">
                    {error}
                  </div>
                ))}
              </div>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="space-y-1">
                <div className="text-yellow-400 font-semibold">
                  {t('simulator.warnings', 'Warnings')}:
                </div>
                {result.warnings.map((warning, index) => (
                  <div key={index} className="text-yellow-300 pl-4">
                    {warning}
                  </div>
                ))}
              </div>
            )}

            {/* Statistics */}
            <div className="space-y-1">
              <div className="text-blue-400 font-semibold">
                {t('simulator.statistics', 'Statistics')}:
              </div>
              <div className="grid grid-cols-2 gap-2 pl-4 text-gray-300">
                <div>
                  <span className="text-gray-500">{t('simulator.totalCommands', 'Commands')}:</span>{' '}
                  {result.commands.filter(c => c.type !== 'comment').length}
                </div>
                <div>
                  <span className="text-gray-500">{t('simulator.toolPaths', 'Tool Paths')}:</span>{' '}
                  {result.toolPaths.length}
                </div>
                <div>
                  <span className="text-gray-500">{t('simulator.totalDistance', 'Total Distance')}:</span>{' '}
                  {formatNumber(result.statistics.totalDistance)} mm
                </div>
                <div>
                  <span className="text-gray-500">{t('simulator.estimatedTime', 'Est. Time')}:</span>{' '}
                  {formatTime(result.statistics.estimatedTime)}
                </div>
                <div>
                  <span className="text-gray-500">{t('simulator.rapidDistance', 'Rapid Distance')}:</span>{' '}
                  {formatNumber(result.statistics.rapidDistance)} mm
                </div>
                <div>
                  <span className="text-gray-500">{t('simulator.cuttingDistance', 'Cutting Distance')}:</span>{' '}
                  {formatNumber(result.statistics.cuttingDistance)} mm
                </div>
              </div>
            </div>

            {/* Bounds */}
            <div className="space-y-1">
              <div className="text-green-400 font-semibold">
                {t('simulator.workArea', 'Work Area')}:
              </div>
              <div className="pl-4 text-gray-300">
                <div>
                  <span className="text-gray-500">X:</span>{' '}
                  {formatNumber(result.bounds.min.x)} → {formatNumber(result.bounds.max.x)} mm
                </div>
                <div>
                  <span className="text-gray-500">Y:</span>{' '}
                  {formatNumber(result.bounds.min.y)} → {formatNumber(result.bounds.max.y)} mm
                </div>
                <div>
                  <span className="text-gray-500">Z:</span>{' '}
                  {formatNumber(result.bounds.min.z)} → {formatNumber(result.bounds.max.z)} mm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Machine State Footer */}
      {(machineState || result?.finalState) && (
        <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-300">
            {(() => {
              const state = machineState || result?.finalState;
              if (!state) return null;
              return (
                <>
                  <span>
                    <span className="text-gray-500">X:</span>{' '}
                    <span className="text-green-400">{formatNumber(state.position.x)}</span>
                  </span>
                  <span>
                    <span className="text-gray-500">Y:</span>{' '}
                    <span className="text-green-400">{formatNumber(state.position.y)}</span>
                  </span>
                  <span>
                    <span className="text-gray-500">Z:</span>{' '}
                    <span className="text-green-400">{formatNumber(state.position.z)}</span>
                  </span>
                  <span>
                    <span className="text-gray-500">F:</span>{' '}
                    <span className="text-orange-400">{state.feedRate}</span>
                  </span>
                  <span>
                    <span className="text-gray-500">S:</span>{' '}
                    <span className="text-purple-400">{state.spindleSpeed}</span>
                  </span>
                  <span>
                    <span className="text-gray-500">{t('simulator.mode', 'Mode')}:</span>{' '}
                    <span className="text-blue-400">
                      {state.absoluteMode ? 'ABS' : 'INC'}
                    </span>
                  </span>
                  <span>
                    <span className="text-gray-500">{t('simulator.unit', 'Unit')}:</span>{' '}
                    <span className="text-blue-400">{state.unit}</span>
                  </span>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
