import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LadderRung,
  LadderElement,
  LadderContact,
  LadderCoil,
  LadderTimer,
  LadderBranch,
  PLCState,
  getValue
} from '../lib/plc-simulator';

interface LadderDiagramProps {
  rungs: LadderRung[];
  state: PLCState;
  highlightedRung?: number;
}

// Render a single contact
function ContactSymbol({
  contact,
  state,
  powerIn
}: {
  contact: LadderContact;
  state: PLCState;
  powerIn: boolean;
}) {
  const value = getValue(state, contact.address);
  const isPowered = powerIn && (
    (contact.contactType === 'NO' && value) ||
    (contact.contactType === 'NC' && !value)
  );

  return (
    <div className="flex flex-col items-center mx-1">
      <div
        className={`
          flex items-center justify-center px-2 py-1 border-2 rounded
          font-mono text-xs min-w-[60px]
          ${isPowered
            ? 'border-green-500 bg-green-500/20 text-green-400'
            : 'border-gray-600 bg-gray-800 text-gray-400'
          }
        `}
      >
        <span className="mr-1">
          {contact.contactType === 'NC' ? '/' : ''}
        </span>
        <span>{contact.address}</span>
      </div>
      {contact.label && (
        <span className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[70px]">
          {contact.label}
        </span>
      )}
    </div>
  );
}

// Render a single coil
function CoilSymbol({
  coil,
  state,
  powerIn
}: {
  coil: LadderCoil;
  state: PLCState;
  powerIn: boolean;
}) {
  const value = getValue(state, coil.address);

  const getCoilSymbol = () => {
    switch (coil.coilType) {
      case 'set': return 'S';
      case 'reset': return 'R';
      case 'negated': return '/';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center mx-1">
      <div
        className={`
          flex items-center justify-center px-2 py-1 rounded-full border-2
          font-mono text-xs min-w-[60px]
          ${powerIn || value
            ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400'
            : 'border-gray-600 bg-gray-800 text-gray-400'
          }
        `}
      >
        <span className="mr-1">{getCoilSymbol()}</span>
        <span>{coil.address}</span>
      </div>
      {coil.label && (
        <span className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[70px]">
          {coil.label}
        </span>
      )}
    </div>
  );
}

// Render a timer block
function TimerSymbol({
  timer,
  state,
  powerIn
}: {
  timer: LadderTimer;
  state: PLCState;
  powerIn: boolean;
}) {
  const timerState = state.timers.get(timer.address);
  const elapsed = timerState?.elapsed ?? 0;
  const done = timerState?.done ?? false;
  const progress = Math.min(100, (elapsed / timer.preset) * 100);

  return (
    <div className="flex flex-col items-center mx-1">
      <div
        className={`
          flex flex-col items-center px-2 py-1 border-2 rounded
          font-mono text-xs min-w-[70px]
          ${done
            ? 'border-green-500 bg-green-500/20'
            : powerIn
            ? 'border-blue-500 bg-blue-500/20'
            : 'border-gray-600 bg-gray-800'
          }
        `}
      >
        <div className="flex items-center gap-1">
          <span className="text-purple-400">{timer.timerType}</span>
          <span className={done ? 'text-green-400' : 'text-gray-400'}>
            {timer.address}
          </span>
        </div>
        <div className="w-full h-1 bg-gray-700 rounded mt-1">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-500">
          {(elapsed / 1000).toFixed(1)}s / {(timer.preset / 1000).toFixed(1)}s
        </span>
      </div>
      {timer.label && (
        <span className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[80px]">
          {timer.label}
        </span>
      )}
    </div>
  );
}

// Render a branch (parallel paths)
function BranchSymbol({
  branch,
  state,
  powerIn
}: {
  branch: LadderBranch;
  state: PLCState;
  powerIn: boolean;
}) {
  return (
    <div className="flex flex-col border-l-2 border-r-2 border-gray-600 mx-1">
      {branch.branches.map((branchElements, idx) => (
        <div
          key={idx}
          className={`
            flex items-center px-1 py-0.5
            ${idx > 0 ? 'border-t border-gray-600' : ''}
          `}
        >
          {branchElements.map((element, elemIdx) => (
            <ElementRenderer
              key={elemIdx}
              element={element}
              state={state}
              powerIn={powerIn}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Main element renderer
function ElementRenderer({
  element,
  state,
  powerIn
}: {
  element: LadderElement;
  state: PLCState;
  powerIn: boolean;
}) {
  switch (element.type) {
    case 'contact':
      return <ContactSymbol contact={element} state={state} powerIn={powerIn} />;
    case 'coil':
      return <CoilSymbol coil={element} state={state} powerIn={powerIn} />;
    case 'timer':
      return <TimerSymbol timer={element} state={state} powerIn={powerIn} />;
    case 'branch':
      return <BranchSymbol branch={element} state={state} powerIn={powerIn} />;
    default:
      return null;
  }
}

// Render a complete rung
function RungRenderer({
  rung,
  state,
  isHighlighted
}: {
  rung: LadderRung;
  state: PLCState;
  isHighlighted: boolean;
}) {
  return (
    <div
      className={`
        flex items-stretch mb-2 rounded-lg overflow-hidden
        ${isHighlighted ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      {/* Rung number */}
      <div className="flex items-center justify-center w-8 bg-gray-700 text-gray-400 text-xs font-mono">
        {rung.id}
      </div>

      {/* Left power rail */}
      <div
        className={`w-1 ${rung.powerFlow ? 'bg-green-500' : 'bg-gray-600'}`}
      />

      {/* Rung content */}
      <div className="flex-1 flex flex-col bg-gray-800/50 p-2">
        {/* Comment */}
        {rung.comment && (
          <div className="text-xs text-gray-500 italic mb-1">
            // {rung.comment}
          </div>
        )}

        {/* Elements */}
        <div className="flex items-center">
          {/* Connection line from left rail */}
          <div
            className={`w-4 h-0.5 ${rung.powerFlow ? 'bg-green-500' : 'bg-gray-600'}`}
          />

          {rung.elements.map((element, idx) => (
            <React.Fragment key={idx}>
              <ElementRenderer
                element={element}
                state={state}
                powerIn={rung.powerFlow || idx === 0}
              />
              {idx < rung.elements.length - 1 && (
                <div
                  className={`w-4 h-0.5 ${rung.powerFlow ? 'bg-green-500' : 'bg-gray-600'}`}
                />
              )}
            </React.Fragment>
          ))}

          {/* Connection line to right rail */}
          <div
            className={`w-4 h-0.5 ${rung.powerFlow ? 'bg-green-500' : 'bg-gray-600'}`}
          />
        </div>
      </div>

      {/* Right power rail */}
      <div
        className={`w-1 ${rung.powerFlow ? 'bg-green-500' : 'bg-gray-600'}`}
      />
    </div>
  );
}

export default function LadderDiagram({
  rungs,
  state,
  highlightedRung
}: LadderDiagramProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">
          {t('plcSimulator.ladderDiagram', 'LADDER Diagram')}
        </span>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500/30 border border-green-500" />
            {t('plcSimulator.powered', 'Powered')}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-800 border border-gray-600" />
            {t('plcSimulator.unpowered', 'Unpowered')}
          </span>
        </div>
      </div>

      {/* Diagram content */}
      <div className="flex-1 overflow-auto p-4">
        {rungs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            {t('plcSimulator.noProgramLoaded', 'No program loaded')}
          </div>
        ) : (
          <div className="space-y-2">
            {rungs.map((rung) => (
              <RungRenderer
                key={rung.id}
                rung={rung}
                state={state}
                isHighlighted={highlightedRung === rung.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
