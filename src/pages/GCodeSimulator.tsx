import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import GCodeEditor from '../components/GCodeEditor';
import GCodeCanvas from '../components/GCodeCanvas';
import GCodeCanvas3D from '../components/GCodeCanvas3D';
import GCodeConsole from '../components/GCodeConsole';
import {
  parseGCode,
  SimulationResult,
  samplePrograms,
  getSupportedCodes,
  MachineState
} from '../lib/gcode-parser';

export default function GCodeSimulator() {
  const { t } = useTranslation();
  const [code, setCode] = useState(samplePrograms.square);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [errors, setErrors] = useState<{ line: number; message: string }[]>([]);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPathIndex, setCurrentPathIndex] = useState(-1);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Current machine state during animation
  const [currentMachineState, setCurrentMachineState] = useState<MachineState | undefined>();

  // View settings
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  // Parse and simulate G-Code
  const runSimulation = useCallback(() => {
    const simResult = parseGCode(code);
    setResult(simResult);

    // Convert errors to editor format
    const editorErrors = simResult.errors.map(err => {
      const match = err.match(/Line (\d+): (.+)/);
      return match
        ? { line: parseInt(match[1]), message: match[2] }
        : { line: 0, message: err };
    });
    setErrors(editorErrors);

    // Reset animation state
    setIsAnimating(false);
    setIsPaused(false);
    setCurrentPathIndex(-1);
    setAnimationProgress(0);
    setCurrentMachineState(undefined);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [code]);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!result || isPaused) {
      lastTimeRef.current = timestamp;
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Calculate new progress
    const progressIncrement = (deltaTime / 1000) * animationSpeed * 0.5;
    let newProgress = animationProgress + progressIncrement;
    let newPathIndex = currentPathIndex;

    // Move to next path if current is complete
    if (newProgress >= 1) {
      newProgress = 0;
      newPathIndex = currentPathIndex + 1;

      // Check if animation is complete
      if (newPathIndex >= result.toolPaths.length) {
        setIsAnimating(false);
        setCurrentPathIndex(result.toolPaths.length - 1);
        setAnimationProgress(1);
        return;
      }
    }

    setCurrentPathIndex(newPathIndex);
    setAnimationProgress(newProgress);

    // Update machine state during animation
    if (newPathIndex >= 0 && newPathIndex < result.toolPaths.length) {
      const path = result.toolPaths[newPathIndex];
      const currentPos = {
        x: path.from.x + (path.to.x - path.from.x) * newProgress,
        y: path.from.y + (path.to.y - path.from.y) * newProgress,
        z: path.from.z + (path.to.z - path.from.z) * newProgress
      };

      setCurrentMachineState({
        ...result.finalState,
        position: currentPos
      });
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [result, isPaused, animationProgress, currentPathIndex, animationSpeed]);

  // Start/stop animation
  const toggleAnimation = useCallback(() => {
    if (!result || result.toolPaths.length === 0) {
      runSimulation();
      return;
    }

    if (isAnimating) {
      setIsPaused(!isPaused);
    } else {
      setIsAnimating(true);
      setIsPaused(false);
      setCurrentPathIndex(0);
      setAnimationProgress(0);
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [result, isAnimating, isPaused, animate, runSimulation]);

  // Stop animation
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsAnimating(false);
    setIsPaused(false);
    setCurrentPathIndex(-1);
    setAnimationProgress(0);
    setCurrentMachineState(undefined);
  }, []);

  // Start animation when isAnimating changes
  useEffect(() => {
    if (isAnimating && !isPaused) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, isPaused, animate]);

  // Load sample program
  const loadSample = (name: keyof typeof samplePrograms) => {
    setCode(samplePrograms[name]);
    stopAnimation();
    setResult(null);
  };

  const supportedCodes = getSupportedCodes();

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
                {t('simulator.title', 'G-Code Simulator')}
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
                {t('simulator.help', 'Help')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full">
        {/* Left Panel - Editor and Controls */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          {/* Sample Programs */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {t('simulator.samplePrograms', 'Sample Programs')}:
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.keys(samplePrograms).map((name) => (
                  <button
                    key={name}
                    onClick={() => loadSample(name as keyof typeof samplePrograms)}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded capitalize"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 min-h-[300px] bg-white rounded-lg shadow overflow-hidden">
            <GCodeEditor
              value={code}
              onChange={setCode}
              onRun={runSimulation}
              errors={errors}
              currentLine={
                isAnimating && currentPathIndex >= 0 && result
                  ? result.toolPaths[currentPathIndex]?.lineNumber
                  : undefined
              }
            />
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Main buttons */}
              <div className="flex gap-2">
                <button
                  onClick={runSimulation}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  {t('simulator.run', 'Run')}
                </button>
                <button
                  onClick={toggleAnimation}
                  disabled={!result || result.toolPaths.length === 0}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    !result || result.toolPaths.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : isAnimating && !isPaused
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isAnimating && !isPaused
                    ? t('simulator.pause', 'Pause')
                    : t('simulator.animate', 'Animate')}
                </button>
                <button
                  onClick={stopAnimation}
                  disabled={!isAnimating}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    !isAnimating
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {t('simulator.stop', 'Stop')}
                </button>
              </div>

              {/* Speed control */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {t('simulator.speed', 'Speed')}:
                </span>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-700 w-10">
                  {animationSpeed.toFixed(1)}x
                </span>
              </div>

              {/* View toggles */}
              <div className="flex items-center gap-4 ml-auto">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="rounded"
                  />
                  {t('simulator.showGrid', 'Grid')}
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAxes}
                    onChange={(e) => setShowAxes(e.target.checked)}
                    className="rounded"
                  />
                  {t('simulator.showAxes', 'Axes')}
                </label>
              </div>
            </div>

            {/* Animation progress */}
            {isAnimating && result && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>
                    {t('simulator.path', 'Path')} {currentPathIndex + 1} / {result.toolPaths.length}
                  </span>
                  <span>
                    {Math.round(((currentPathIndex + animationProgress) / result.toolPaths.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-100"
                    style={{
                      width: `${((currentPathIndex + animationProgress) / result.toolPaths.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Canvas and Console */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          {/* Canvas with 2D/3D toggle */}
          <div className="flex-1 min-h-[300px] bg-white rounded-lg shadow overflow-hidden flex flex-col">
            {/* View mode toggle */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm font-medium text-gray-300">
                {t('simulator.visualization', 'Visualization')}
              </span>
              <div className="flex bg-gray-700 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('2d')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    viewMode === '2d'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  2D
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    viewMode === '3d'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  3D
                </button>
              </div>
            </div>
            {/* Canvas content */}
            <div className="flex-1">
              {viewMode === '2d' ? (
                <GCodeCanvas
                  toolPaths={result?.toolPaths || []}
                  bounds={result?.bounds || { min: { x: 0, y: 0, z: 0 }, max: { x: 100, y: 100, z: 0 } }}
                  currentPathIndex={currentPathIndex}
                  isAnimating={isAnimating}
                  animationProgress={animationProgress}
                  showGrid={showGrid}
                  showAxes={showAxes}
                />
              ) : (
                <GCodeCanvas3D
                  toolPaths={result?.toolPaths || []}
                  bounds={result?.bounds || { min: { x: 0, y: 0, z: 0 }, max: { x: 100, y: 100, z: 0 } }}
                  currentPathIndex={currentPathIndex}
                  isAnimating={isAnimating}
                  animationProgress={animationProgress}
                  showGrid={showGrid}
                  showAxes={showAxes}
                />
              )}
            </div>
          </div>

          {/* Console */}
          <div className="h-64 bg-white rounded-lg shadow overflow-hidden">
            <GCodeConsole
              result={result}
              currentLine={
                isAnimating && currentPathIndex >= 0 && result
                  ? result.toolPaths[currentPathIndex]?.lineNumber
                  : undefined
              }
              machineState={currentMachineState}
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
                {t('simulator.helpTitle', 'G-Code Reference')}
              </h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="grid md:grid-cols-2 gap-6">
                {/* G Codes */}
                <div>
                  <h3 className="font-bold text-lg mb-3 text-blue-600">
                    {t('simulator.gCodes', 'G Codes')} (Motion)
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {supportedCodes.gCodes.map((code, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-mono text-blue-600">
                          {code.split(' - ')[0]}
                        </span>
                        {' - '}
                        {code.split(' - ')[1]}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* M Codes */}
                <div>
                  <h3 className="font-bold text-lg mb-3 text-purple-600">
                    {t('simulator.mCodes', 'M Codes')} (Machine)
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {supportedCodes.mCodes.map((code, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-mono text-purple-600">
                          {code.split(' - ')[0]}
                        </span>
                        {' - '}
                        {code.split(' - ')[1]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Parameters */}
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-3 text-green-600">
                  {t('simulator.parameters', 'Parameters')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="font-mono text-green-600">X</span> - X axis
                  </div>
                  <div>
                    <span className="font-mono text-green-600">Y</span> - Y axis
                  </div>
                  <div>
                    <span className="font-mono text-green-600">Z</span> - Z axis
                  </div>
                  <div>
                    <span className="font-mono text-orange-600">F</span> - Feed rate
                  </div>
                  <div>
                    <span className="font-mono text-orange-600">S</span> - Spindle speed
                  </div>
                  <div>
                    <span className="font-mono text-pink-600">T</span> - Tool number
                  </div>
                  <div>
                    <span className="font-mono text-green-600">I</span> - Arc center X
                  </div>
                  <div>
                    <span className="font-mono text-green-600">J</span> - Arc center Y
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-blue-800">
                  {t('simulator.tips', 'Tips')}
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {t('simulator.tip1', 'Use Ctrl+Enter to run the simulation')}</li>
                  <li>• {t('simulator.tip2', 'Scroll to zoom in/out on the canvas')}</li>
                  <li>• {t('simulator.tip3', 'Drag to pan the view')}</li>
                  <li>• {t('simulator.tip4', 'Comments start with ; or are enclosed in ( )')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
