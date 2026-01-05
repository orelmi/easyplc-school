import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import GrafcetCanvas from '../components/GrafcetCanvas';
import GrafcetToolbar from '../components/GrafcetToolbar';
import {
  GrafcetDiagram,
  GrafcetState,
  createEmptyDiagram,
  createGrafcetState,
  createGrafcetStep,
  createGrafcetTransition,
  executeCycle,
  resetSimulation,
  sampleGrafcets,
  getGrafcetNames
} from '../lib/grafcet-engine';

export default function GRAFCETEditor() {
  const { t } = useTranslation();

  // Diagram and state
  const [diagram, setDiagram] = useState<GrafcetDiagram>(() => sampleGrafcets.simple);
  const [state, setState] = useState<GrafcetState>(() => createGrafcetState(sampleGrafcets.simple));

  // Editor state
  const [tool, setTool] = useState<'select' | 'step' | 'transition' | 'link'>('select');
  const [selectedElement, setSelectedElement] = useState<{ type: 'step' | 'transition'; id: string } | null>(null);
  const [linkStart, setLinkStart] = useState<{ type: 'step' | 'transition'; id: string } | null>(null);

  // Simulation state
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  // Step counter for new steps
  const [stepCounter, setStepCounter] = useState(() => {
    const maxStep = diagram.steps.reduce((max, s) => Math.max(max, s.number), 0);
    return maxStep + 1;
  });

  // Simulation loop
  useEffect(() => {
    if (running) {
      lastTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const deltaTime = now - lastTimeRef.current;
        lastTimeRef.current = now;

        setState(prevState => executeCycle(diagram, { ...prevState, running: true }, deltaTime));
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, diagram]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'v':
          setTool('select');
          break;
        case 's':
          if (!e.ctrlKey && !e.metaKey) {
            setTool('step');
          }
          break;
        case 't':
          setTool('transition');
          break;
        case 'l':
          setTool('link');
          break;
        case 'delete':
        case 'backspace':
          if (selectedElement) {
            handleDelete();
          }
          break;
        case 'escape':
          setSelectedElement(null);
          setLinkStart(null);
          setTool('select');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement]);

  // Add step
  const handleAddStep = useCallback((x: number, y: number) => {
    const newStep = createGrafcetStep(stepCounter, x, y, false);
    setDiagram(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
    setStepCounter(prev => prev + 1);
    setSelectedElement({ type: 'step', id: newStep.id });
    setTool('select');
  }, [stepCounter]);

  // Add transition
  const handleAddTransition = useCallback((x: number, y: number) => {
    const newTransition = createGrafcetTransition([], [], 'condition', x, y);
    setDiagram(prev => ({
      ...prev,
      transitions: [...prev.transitions, newTransition]
    }));
    setSelectedElement({ type: 'transition', id: newTransition.id });
    setTool('select');
  }, []);

  // Move step
  const handleMoveStep = useCallback((stepId: string, x: number, y: number) => {
    setDiagram(prev => ({
      ...prev,
      steps: prev.steps.map(s => s.id === stepId ? { ...s, x, y } : s)
    }));
  }, []);

  // Move transition
  const handleMoveTransition = useCallback((transId: string, x: number, y: number) => {
    setDiagram(prev => ({
      ...prev,
      transitions: prev.transitions.map(t => t.id === transId ? { ...t, x, y } : t)
    }));
  }, []);

  // Delete selected element
  const handleDelete = useCallback(() => {
    if (!selectedElement) return;

    if (selectedElement.type === 'step') {
      setDiagram(prev => ({
        ...prev,
        steps: prev.steps.filter(s => s.id !== selectedElement.id),
        transitions: prev.transitions.map(t => ({
          ...t,
          fromSteps: t.fromSteps.filter(id => id !== selectedElement.id),
          toSteps: t.toSteps.filter(id => id !== selectedElement.id)
        }))
      }));
    } else {
      setDiagram(prev => ({
        ...prev,
        transitions: prev.transitions.filter(t => t.id !== selectedElement.id)
      }));
    }
    setSelectedElement(null);
  }, [selectedElement]);

  // Toggle initial step
  const handleToggleInitial = useCallback(() => {
    if (!selectedElement || selectedElement.type !== 'step') return;

    setDiagram(prev => ({
      ...prev,
      steps: prev.steps.map(s =>
        s.id === selectedElement.id ? { ...s, isInitial: !s.isInitial } : s
      )
    }));
  }, [selectedElement]);

  // Handle element selection (for linking)
  const handleSelectElement = useCallback((element: { type: 'step' | 'transition'; id: string } | null) => {
    if (tool === 'link' && element) {
      if (!linkStart) {
        setLinkStart(element);
      } else {
        // Create link between elements
        if (linkStart.type === 'step' && element.type === 'transition') {
          // Step -> Transition
          setDiagram(prev => ({
            ...prev,
            transitions: prev.transitions.map(t =>
              t.id === element.id && !t.fromSteps.includes(linkStart.id)
                ? { ...t, fromSteps: [...t.fromSteps, linkStart.id] }
                : t
            )
          }));
        } else if (linkStart.type === 'transition' && element.type === 'step') {
          // Transition -> Step
          setDiagram(prev => ({
            ...prev,
            transitions: prev.transitions.map(t =>
              t.id === linkStart.id && !t.toSteps.includes(element.id)
                ? { ...t, toSteps: [...t.toSteps, element.id] }
                : t
            )
          }));
        }
        setLinkStart(null);
        setTool('select');
      }
    } else {
      setSelectedElement(element);
    }
  }, [tool, linkStart]);

  // Load sample diagram
  const handleLoadSample = (sampleId: string) => {
    const sample = sampleGrafcets[sampleId];
    if (sample) {
      setDiagram(sample);
      setState(createGrafcetState(sample));
      setSelectedElement(null);
      setRunning(false);
      const maxStep = sample.steps.reduce((max, s) => Math.max(max, s.number), 0);
      setStepCounter(maxStep + 1);
    }
  };

  // New diagram
  const handleNew = () => {
    const newDiagram = createEmptyDiagram();
    setDiagram(newDiagram);
    setState(createGrafcetState(newDiagram));
    setSelectedElement(null);
    setRunning(false);
    setStepCounter(1);
  };

  // Reset simulation
  const handleReset = () => {
    setState(resetSimulation(diagram));
    setRunning(false);
  };

  // Toggle input
  const toggleInput = (inputName: string) => {
    setState(prev => {
      const newInputs = new Map(prev.inputs);
      newInputs.set(inputName, !newInputs.get(inputName));
      return { ...prev, inputs: newInputs };
    });
  };

  // Get selected step/transition for property panel
  const selectedStep = selectedElement?.type === 'step'
    ? diagram.steps.find(s => s.id === selectedElement.id)
    : null;
  const selectedTransition = selectedElement?.type === 'transition'
    ? diagram.transitions.find(t => t.id === selectedElement.id)
    : null;

  return (
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8 h-[calc(100vh-8rem)] flex flex-col bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">
              {t('grafcet.title', 'GRAFCET Editor')}
            </h1>

            {/* Sample selector */}
            <select
              value=""
              onChange={(e) => e.target.value && handleLoadSample(e.target.value)}
              className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="">{t('grafcet.loadSample', 'Load Sample...')}</option>
              {getGrafcetNames().map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>

            <button
              onClick={handleNew}
              className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              {t('grafcet.new', 'New')}
            </button>
          </div>

          {/* Simulation controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRunning(!running)}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                running
                  ? 'bg-red-600 text-white hover:bg-red-500'
                  : 'bg-green-600 text-white hover:bg-green-500'
              }`}
            >
              {running ? t('grafcet.stop', 'STOP') : t('grafcet.run', 'RUN')}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors"
            >
              {t('grafcet.reset', 'Reset')}
            </button>
            <div className={`ml-2 px-3 py-1 rounded text-xs font-medium ${
              running ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>
              {running ? t('grafcet.running', 'RUNNING') : t('grafcet.stopped', 'STOPPED')}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left toolbar */}
          <div className="w-48 flex-shrink-0 p-2 overflow-y-auto">
            <GrafcetToolbar
              tool={tool}
              onToolChange={setTool}
              onDelete={handleDelete}
              onToggleInitial={handleToggleInitial}
              canDelete={!!selectedElement}
              canToggleInitial={selectedElement?.type === 'step'}
            />
          </div>

          {/* Canvas */}
          <div className="flex-1 p-2">
            <GrafcetCanvas
              diagram={diagram}
              state={state}
              selectedElement={selectedElement}
              onSelectElement={handleSelectElement}
              onMoveStep={handleMoveStep}
              onMoveTransition={handleMoveTransition}
              tool={tool}
              onAddStep={handleAddStep}
              onAddTransition={handleAddTransition}
            />
          </div>

          {/* Right panel - I/O and Properties */}
          <div className="w-64 flex-shrink-0 bg-gray-800 border-l border-gray-700 overflow-y-auto">
            {/* I/O Panel */}
            <div className="p-3 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                {t('grafcet.inputs', 'INPUTS')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Array.from(state.inputs.entries()).map(([name, value]) => (
                  <button
                    key={name}
                    onClick={() => toggleInput(name)}
                    className={`px-2 py-1.5 rounded text-xs font-mono transition-colors ${
                      value
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Outputs Panel */}
            <div className="p-3 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                {t('grafcet.outputs', 'OUTPUTS')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Array.from(state.outputs.entries()).map(([name, value]) => (
                  <div
                    key={name}
                    className={`px-2 py-1.5 rounded text-xs font-mono text-center ${
                      value
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-700 text-gray-500'
                    }`}
                  >
                    {name}
                  </div>
                ))}
                {state.outputs.size === 0 && (
                  <div className="col-span-2 text-xs text-gray-500 text-center py-2">
                    {t('grafcet.noOutputs', 'No active outputs')}
                  </div>
                )}
              </div>
            </div>

            {/* Active Steps */}
            <div className="p-3 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                {t('grafcet.activeSteps', 'ACTIVE STEPS')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(state.activeSteps).map(stepId => {
                  const step = diagram.steps.find(s => s.id === stepId);
                  return step ? (
                    <div
                      key={stepId}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm font-mono"
                    >
                      {step.number}
                    </div>
                  ) : null;
                })}
                {state.activeSteps.size === 0 && (
                  <div className="text-xs text-gray-500">
                    {t('grafcet.noActiveSteps', 'No active steps')}
                  </div>
                )}
              </div>
            </div>

            {/* Properties Panel */}
            {selectedStep && (
              <div className="p-3 border-b border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">
                  {t('grafcet.stepProperties', 'STEP PROPERTIES')}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('grafcet.stepNumber', 'Number')}
                    </label>
                    <input
                      type="number"
                      value={selectedStep.number}
                      onChange={(e) => {
                        const num = parseInt(e.target.value) || 0;
                        setDiagram(prev => ({
                          ...prev,
                          steps: prev.steps.map(s =>
                            s.id === selectedStep.id ? { ...s, number: num } : s
                          )
                        }));
                      }}
                      className="w-full bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('grafcet.comment', 'Comment')}
                    </label>
                    <input
                      type="text"
                      value={selectedStep.comment || ''}
                      onChange={(e) => {
                        setDiagram(prev => ({
                          ...prev,
                          steps: prev.steps.map(s =>
                            s.id === selectedStep.id ? { ...s, comment: e.target.value } : s
                          )
                        }));
                      }}
                      className="w-full bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('grafcet.actions', 'Actions')} ({selectedStep.actions.length})
                    </label>
                    {selectedStep.actions.map((action, idx) => (
                      <div key={action.id} className="flex items-center gap-1 mb-1">
                        <input
                          type="text"
                          value={action.output}
                          onChange={(e) => {
                            setDiagram(prev => ({
                              ...prev,
                              steps: prev.steps.map(s =>
                                s.id === selectedStep.id
                                  ? {
                                      ...s,
                                      actions: s.actions.map((a, i) =>
                                        i === idx ? { ...a, output: e.target.value } : a
                                      )
                                    }
                                  : s
                              )
                            }));
                          }}
                          className="flex-1 bg-gray-700 text-white text-xs px-2 py-1 rounded border border-gray-600"
                          placeholder="Output"
                        />
                        <button
                          onClick={() => {
                            setDiagram(prev => ({
                              ...prev,
                              steps: prev.steps.map(s =>
                                s.id === selectedStep.id
                                  ? { ...s, actions: s.actions.filter((_, i) => i !== idx) }
                                  : s
                              )
                            }));
                          }}
                          className="p-1 text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setDiagram(prev => ({
                          ...prev,
                          steps: prev.steps.map(s =>
                            s.id === selectedStep.id
                              ? {
                                  ...s,
                                  actions: [...s.actions, {
                                    id: `action-${Date.now()}`,
                                    type: 'simple' as const,
                                    output: 'Q' + s.actions.length
                                  }]
                                }
                              : s
                          )
                        }));
                      }}
                      className="mt-1 text-xs text-blue-400 hover:text-blue-300"
                    >
                      + {t('grafcet.addAction', 'Add Action')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTransition && (
              <div className="p-3 border-b border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">
                  {t('grafcet.transitionProperties', 'TRANSITION PROPERTIES')}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('grafcet.condition', 'Condition')}
                    </label>
                    <input
                      type="text"
                      value={selectedTransition.condition}
                      onChange={(e) => {
                        setDiagram(prev => ({
                          ...prev,
                          transitions: prev.transitions.map(t =>
                            t.id === selectedTransition.id ? { ...t, condition: e.target.value } : t
                          )
                        }));
                      }}
                      className="w-full bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                      placeholder="start AND sensor1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('grafcet.label', 'Label')}
                    </label>
                    <input
                      type="text"
                      value={selectedTransition.label || ''}
                      onChange={(e) => {
                        setDiagram(prev => ({
                          ...prev,
                          transitions: prev.transitions.map(t =>
                            t.id === selectedTransition.id ? { ...t, label: e.target.value } : t
                          )
                        }));
                      }}
                      className="w-full bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    <div>{t('grafcet.from', 'From')}: {selectedTransition.fromSteps.length} {t('grafcet.steps', 'steps')}</div>
                    <div>{t('grafcet.to', 'To')}: {selectedTransition.toSteps.length} {t('grafcet.steps', 'steps')}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Help */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                {t('grafcet.help', 'HELP')}
              </h3>
              <div className="text-xs text-gray-500 space-y-1">
                <p><span className="text-gray-400">V</span> - {t('grafcet.selectTool', 'Select tool')}</p>
                <p><span className="text-gray-400">S</span> - {t('grafcet.stepTool', 'Add step')}</p>
                <p><span className="text-gray-400">T</span> - {t('grafcet.transitionTool', 'Add transition')}</p>
                <p><span className="text-gray-400">L</span> - {t('grafcet.linkTool', 'Link elements')}</p>
                <p><span className="text-gray-400">Del</span> - {t('grafcet.deleteSelected', 'Delete selected')}</p>
                <p><span className="text-gray-400">Esc</span> - {t('grafcet.cancel', 'Cancel')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
