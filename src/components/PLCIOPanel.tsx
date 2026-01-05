import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PLCState, PLCInput, PLCOutput, PLCTimer } from '../lib/plc-simulator';

interface PLCIOPanelProps {
  state: PLCState;
  onInputChange: (address: string, value: boolean) => void;
  onInputClick: (address: string) => void; // For momentary buttons
}

// Type for input modes
type InputModes = Record<string, 'momentary' | 'toggle'>;

// Input component (button or switch) with mode toggle
function InputControl({
  input,
  onChange,
  onClick,
  mode,
  onModeChange
}: {
  input: PLCInput;
  onChange: (value: boolean) => void;
  onClick: () => void;
  mode: 'momentary' | 'toggle';
  onModeChange: () => void;
}) {
  const { t } = useTranslation();

  const isMomentary = mode === 'momentary';

  return (
    <div className="flex flex-col items-center">
      {/* Mode toggle button */}
      <button
        onClick={onModeChange}
        className={`
          mb-1 px-1.5 py-0.5 text-[8px] rounded transition-colors
          ${isMomentary
            ? 'bg-orange-600 text-white'
            : 'bg-blue-600 text-white'
          }
        `}
        title={isMomentary
          ? t('plcSimulator.momentaryMode', 'Momentary (hold)')
          : t('plcSimulator.toggleMode', 'Toggle (click)')
        }
      >
        {isMomentary ? '⚡' : '🔒'}
      </button>

      {/* Input button */}
      {isMomentary ? (
        <button
          onMouseDown={() => onChange(true)}
          onMouseUp={() => onChange(false)}
          onMouseLeave={() => onChange(false)}
          onTouchStart={(e) => { e.preventDefault(); onChange(true); }}
          onTouchEnd={(e) => { e.preventDefault(); onChange(false); }}
          className={`
            w-12 h-12 rounded-lg border-2 transition-all
            flex items-center justify-center font-mono text-xs
            active:scale-95
            ${input.value
              ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/50'
              : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }
          `}
          title={t('plcSimulator.holdToActivate', 'Hold to activate')}
        >
          {input.address.split('.')[1]}
        </button>
      ) : (
        <button
          onClick={() => onChange(!input.value)}
          className={`
            w-12 h-12 rounded-lg border-2 transition-all
            flex items-center justify-center font-mono text-xs
            ${input.value
              ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/50'
              : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }
          `}
          title={t('plcSimulator.clickToToggle', 'Click to toggle')}
        >
          <div className="flex flex-col items-center">
            <span>{input.address.split('.')[1]}</span>
            <span className="text-[8px] mt-0.5">{input.value ? 'ON' : 'OFF'}</span>
          </div>
        </button>
      )}

      <span className="text-[10px] text-gray-500 mt-1 text-center truncate w-14">
        {input.label}
      </span>
      <span className="text-[9px] text-gray-600">{input.address}</span>
    </div>
  );
}

// Output indicator (lamp or motor)
function OutputIndicator({ output }: { output: PLCOutput }) {
  const getIcon = () => {
    switch (output.type) {
      case 'lamp':
        return output.value ? '💡' : '⚫';
      case 'motor':
        return output.value ? '⚙️' : '⚫';
      case 'valve':
        return output.value ? '🔵' : '⚫';
      case 'buzzer':
        return output.value ? '🔔' : '⚫';
      default:
        return output.value ? '🟢' : '⚫';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-12 h-12 rounded-lg border-2 transition-all
          flex items-center justify-center text-xl
          ${output.value
            ? output.type === 'lamp'
              ? 'bg-yellow-500 border-yellow-400 shadow-lg shadow-yellow-500/50'
              : output.type === 'motor'
              ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50 animate-spin-slow'
              : 'bg-green-500 border-green-400 shadow-lg shadow-green-500/50'
            : 'bg-gray-700 border-gray-600'
          }
        `}
      >
        {getIcon()}
      </div>
      <span className="text-[10px] text-gray-500 mt-1 text-center truncate w-14">
        {output.label}
      </span>
      <span className="text-[9px] text-gray-600">{output.address}</span>
    </div>
  );
}

// Timer display
function TimerDisplay({ timer }: { timer: PLCTimer }) {
  const progress = Math.min(100, (timer.elapsed / timer.preset) * 100);

  return (
    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-2 min-w-[80px]">
      <div className="flex items-center gap-1 text-xs">
        <span className="text-purple-400 font-mono">{timer.type}</span>
        <span className="text-gray-400 font-mono">{timer.address}</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded mt-1">
        <div
          className={`h-full rounded transition-all duration-100 ${
            timer.done ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between w-full text-[9px] text-gray-500 mt-0.5">
        <span>{(timer.elapsed / 1000).toFixed(1)}s</span>
        <span>{(timer.preset / 1000).toFixed(1)}s</span>
      </div>
      <div
        className={`text-[10px] font-mono mt-0.5 ${
          timer.done ? 'text-green-400' : 'text-gray-500'
        }`}
      >
        {timer.done ? 'DONE' : timer.running ? 'RUNNING' : 'IDLE'}
      </div>
    </div>
  );
}

export default function PLCIOPanel({
  state,
  onInputChange,
  onInputClick
}: PLCIOPanelProps) {
  const { t } = useTranslation();

  // State for input modes (momentary vs toggle)
  // Default: I0.0-I0.3 = momentary (buttons), I0.4-I0.7 = toggle (switches)
  const [inputModes, setInputModes] = useState<InputModes>(() => {
    const modes: InputModes = {};
    for (let i = 0; i < 8; i++) {
      modes[`I0.${i}`] = i < 4 ? 'momentary' : 'toggle';
    }
    return modes;
  });

  // Toggle input mode between momentary and toggle
  const toggleInputMode = (address: string) => {
    setInputModes(prev => ({
      ...prev,
      [address]: prev[address] === 'momentary' ? 'toggle' : 'momentary'
    }));
    // Reset the input value when switching modes
    onInputChange(address, false);
  };

  const inputs = Array.from(state.inputs.values());
  const outputs = Array.from(state.outputs.values());
  const timers = Array.from(state.timers.values());

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">
          {t('plcSimulator.ioPanel', 'I/O Panel')}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`
              px-2 py-0.5 text-xs rounded-full
              ${state.running
                ? 'bg-green-600 text-white'
                : 'bg-gray-600 text-gray-300'
              }
            `}
          >
            {state.running
              ? t('plcSimulator.running', 'RUNNING')
              : t('plcSimulator.stopped', 'STOPPED')
            }
          </span>
        </div>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Inputs section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {t('plcSimulator.inputs', 'INPUTS')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {inputs.map((input) => (
              <InputControl
                key={input.address}
                input={input}
                onChange={(value) => onInputChange(input.address, value)}
                onClick={() => onInputClick(input.address)}
                mode={inputModes[input.address] || 'toggle'}
                onModeChange={() => toggleInputMode(input.address)}
              />
            ))}
          </div>
        </div>

        {/* Outputs section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            {t('plcSimulator.outputs', 'OUTPUTS')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {outputs.map((output) => (
              <OutputIndicator key={output.address} output={output} />
            ))}
          </div>
        </div>

        {/* Timers section (if any) */}
        {timers.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              {t('plcSimulator.timers', 'TIMERS')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {timers.map((timer) => (
                <TimerDisplay key={timer.address} timer={timer} />
              ))}
            </div>
          </div>
        )}

        {/* Status section */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-xs font-semibold text-gray-400 mb-2">
            {t('plcSimulator.status', 'STATUS')}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-800 rounded p-2">
              <span className="text-gray-500">{t('plcSimulator.cycleCount', 'Cycle')}</span>
              <span className="text-gray-300 font-mono ml-2">{state.cycleCount}</span>
            </div>
            <div className="bg-gray-800 rounded p-2">
              <span className="text-gray-500">{t('plcSimulator.cycleTime', 'Cycle Time')}</span>
              <span className="text-gray-300 font-mono ml-2">
                {state.lastCycleTime.toFixed(2)}ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
