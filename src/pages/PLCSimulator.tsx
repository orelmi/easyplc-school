import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LadderDiagram from '../components/LadderDiagram';
import PLCIOPanel from '../components/PLCIOPanel';
import {
  PLCState,
  PLCProgram,
  createPLCState,
  executeCycle,
  samplePrograms,
  getProgramNames
} from '../lib/plc-simulator';

export default function PLCSimulator() {
  const { t } = useTranslation();
  const [state, setState] = useState<PLCState>(() => createPLCState());
  const [program, setProgram] = useState<PLCProgram | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string>('startStop');
  const [showHelp, setShowHelp] = useState(false);

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Load a program
  const loadProgram = useCallback((programId: string) => {
    const prog = samplePrograms[programId];
    if (prog) {
      // Reset state when loading new program
      const newState = createPLCState();
      setState(newState);
      setProgram({ ...prog, rungs: prog.rungs.map(r => ({ ...r })) });
      setSelectedProgram(programId);
    }
  }, []);

  // Load default program on mount
  useEffect(() => {
    loadProgram('startStop');
  }, [loadProgram]);

  // Main simulation loop
  const simulate = useCallback((timestamp: number) => {
    if (!state.running || !program) {
      lastTimeRef.current = timestamp;
      animationRef.current = requestAnimationFrame(simulate);
      return;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Execute PLC cycle
    setState(prevState => {
      const newState = { ...prevState };
      newState.inputs = new Map(prevState.inputs);
      newState.outputs = new Map(prevState.outputs);
      newState.memory = new Map(prevState.memory);
      newState.timers = new Map(prevState.timers);
      newState.counters = new Map(prevState.counters);

      executeCycle(program, newState, deltaTime);
      return newState;
    });

    animationRef.current = requestAnimationFrame(simulate);
  }, [state.running, program]);

  // Start/stop simulation loop
  useEffect(() => {
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(simulate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [simulate]);

  // Toggle PLC running state
  const toggleRunning = () => {
    setState(prev => ({ ...prev, running: !prev.running }));
  };

  // Reset PLC
  const resetPLC = () => {
    const newState = createPLCState();
    setState(newState);
    if (program) {
      // Reset program rungs
      setProgram({
        ...program,
        rungs: program.rungs.map(r => ({ ...r, powerFlow: false }))
      });
    }
  };

  // Handle input change
  const handleInputChange = (address: string, value: boolean) => {
    setState(prev => {
      const newInputs = new Map(prev.inputs);
      const input = newInputs.get(address);
      if (input) {
        newInputs.set(address, { ...input, value });
      }
      return { ...prev, inputs: newInputs };
    });
  };

  // Handle input click (for momentary buttons - not used currently)
  const handleInputClick = (address: string) => {
    // Could be used for pulse inputs
  };

  const programList = getProgramNames();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-gray-500 hover:text-gray-700"
              >
                ← {t('common.back', 'Back')}
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('plcSimulator.title', 'PLC Simulator')}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className={`px-3 py-1.5 text-sm rounded-lg border ${
                  showHelp
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('plcSimulator.help', 'Help')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full">
        {/* Left Panel - Controls and I/O */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {/* Program selector and controls */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-4">
              {/* Program selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('plcSimulator.selectProgram', 'Select Program')}
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => loadProgram(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {programList.map((prog) => (
                    <option key={prog.id} value={prog.id}>
                      {prog.name}
                    </option>
                  ))}
                </select>
                {program?.description && (
                  <p className="text-xs text-gray-500 mt-1">{program.description}</p>
                )}
              </div>

              {/* Control buttons */}
              <div className="flex gap-2">
                <button
                  onClick={toggleRunning}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                    state.running
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {state.running
                    ? t('plcSimulator.stop', 'STOP')
                    : t('plcSimulator.run', 'RUN')
                  }
                </button>
                <button
                  onClick={resetPLC}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
                >
                  {t('plcSimulator.reset', 'Reset')}
                </button>
              </div>

              {/* Status indicator */}
              <div className="flex items-center justify-center gap-2 py-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    state.running
                      ? 'bg-green-500 animate-pulse'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-sm font-medium">
                  {state.running
                    ? t('plcSimulator.plcRunning', 'PLC Running')
                    : t('plcSimulator.plcStopped', 'PLC Stopped')
                  }
                </span>
              </div>
            </div>
          </div>

          {/* I/O Panel */}
          <div className="flex-1 min-h-[300px] bg-white rounded-lg shadow overflow-hidden">
            <PLCIOPanel
              state={state}
              onInputChange={handleInputChange}
              onInputClick={handleInputClick}
            />
          </div>
        </div>

        {/* Right Panel - LADDER Diagram */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          <div className="flex-1 min-h-[500px] bg-white rounded-lg shadow overflow-hidden">
            <LadderDiagram
              rungs={program?.rungs || []}
              state={state}
            />
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-xl font-bold">
                {t('plcSimulator.helpTitle', 'PLC Simulator Help')}
              </h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              {/* LADDER Elements */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-blue-600">
                  {t('plcSimulator.ladderElements', 'LADDER Elements')}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono text-blue-600">──┤ ├──</div>
                    <div className="text-gray-600">
                      {t('plcSimulator.contactNO', 'Contact NO (Normally Open)')}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono text-blue-600">──┤/├──</div>
                    <div className="text-gray-600">
                      {t('plcSimulator.contactNC', 'Contact NC (Normally Closed)')}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono text-blue-600">──( )──</div>
                    <div className="text-gray-600">
                      {t('plcSimulator.coilNormal', 'Coil (Output)')}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono text-blue-600">──(S)──</div>
                    <div className="text-gray-600">
                      {t('plcSimulator.coilSet', 'Set Coil (Latch)')}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono text-blue-600">──(R)──</div>
                    <div className="text-gray-600">
                      {t('plcSimulator.coilReset', 'Reset Coil (Unlatch)')}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono text-purple-600">TON</div>
                    <div className="text-gray-600">
                      {t('plcSimulator.timerTON', 'Timer ON Delay')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-green-600">
                  {t('plcSimulator.addresses', 'Addresses')}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-mono text-green-600">I0.0-I0.7</span>
                    <span className="text-gray-600 ml-2">
                      {t('plcSimulator.digitalInputs', 'Digital Inputs')}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-yellow-600">Q0.0-Q0.7</span>
                    <span className="text-gray-600 ml-2">
                      {t('plcSimulator.digitalOutputs', 'Digital Outputs')}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-blue-600">M0.0-M0.15</span>
                    <span className="text-gray-600 ml-2">
                      {t('plcSimulator.memoryBits', 'Memory Bits')}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-purple-600">T0, T1...</span>
                    <span className="text-gray-600 ml-2">
                      {t('plcSimulator.timerAddresses', 'Timers')}
                    </span>
                  </div>
                </div>
              </div>

              {/* How to use */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-purple-600">
                  {t('plcSimulator.howToUse', 'How to Use')}
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">1.</span>
                    {t('plcSimulator.step1', 'Select a program from the dropdown menu')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">2.</span>
                    {t('plcSimulator.step2', 'Click RUN to start the PLC simulation')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">3.</span>
                    {t('plcSimulator.step3', 'Interact with inputs: click switches to toggle, hold buttons to activate')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">4.</span>
                    {t('plcSimulator.step4', 'Watch the LADDER diagram update in real-time')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">5.</span>
                    {t('plcSimulator.step5', 'Observe outputs responding to your logic')}
                  </li>
                </ul>
              </div>

              {/* Tips */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-blue-800">
                  {t('plcSimulator.tips', 'Tips')}
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {t('plcSimulator.tip1', 'Green power rails indicate power flow through the rung')}</li>
                  <li>• {t('plcSimulator.tip2', 'Inputs 0-3 are momentary buttons, 4-7 are toggle switches')}</li>
                  <li>• {t('plcSimulator.tip3', 'Try the Start/Stop program to understand self-holding circuits')}</li>
                  <li>• {t('plcSimulator.tip4', 'The Traffic Light program demonstrates timer usage')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
