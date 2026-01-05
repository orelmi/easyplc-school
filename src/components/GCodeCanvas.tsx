import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolPath, Point } from '../lib/gcode-parser';

interface GCodeCanvasProps {
  toolPaths: ToolPath[];
  bounds: { min: Point; max: Point };
  currentPathIndex?: number;
  isAnimating?: boolean;
  animationProgress?: number;
  showGrid?: boolean;
  showAxes?: boolean;
}

interface ViewState {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export default function GCodeCanvas({
  toolPaths,
  bounds,
  currentPathIndex = -1,
  isAnimating = false,
  animationProgress = 0,
  showGrid = true,
  showAxes = true
}: GCodeCanvasProps) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [viewState, setViewState] = useState<ViewState>({
    offsetX: 0,
    offsetY: 0,
    scale: 1
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState<Point | null>(null);

  // Calculate optimal view to fit all paths
  const calculateView = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const padding = 40;
    const width = bounds.max.x - bounds.min.x || 100;
    const height = bounds.max.y - bounds.min.y || 100;

    const scaleX = (canvas.width - padding * 2) / width;
    const scaleY = (canvas.height - padding * 2) / height;
    const scale = Math.min(scaleX, scaleY, 10); // Max scale of 10

    const centerX = (bounds.min.x + bounds.max.x) / 2;
    const centerY = (bounds.min.y + bounds.max.y) / 2;

    setViewState({
      offsetX: canvas.width / 2 - centerX * scale,
      offsetY: canvas.height / 2 + centerY * scale, // Y is inverted in canvas
      scale
    });
  }, [bounds]);

  // Handle resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  // Recalculate view when bounds change
  useEffect(() => {
    calculateView();
  }, [bounds, dimensions, calculateView]);

  // Transform world coordinates to canvas coordinates
  const worldToCanvas = useCallback((point: Point): { x: number; y: number } => {
    return {
      x: point.x * viewState.scale + viewState.offsetX,
      y: -point.y * viewState.scale + viewState.offsetY // Invert Y
    };
  }, [viewState]);

  // Transform canvas coordinates to world coordinates
  const canvasToWorld = useCallback((x: number, y: number): Point => {
    return {
      x: (x - viewState.offsetX) / viewState.scale,
      y: -(y - viewState.offsetY) / viewState.scale,
      z: 0
    };
  }, [viewState]);

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    if (showGrid) {
      const gridSize = viewState.scale >= 5 ? 1 : viewState.scale >= 2 ? 5 : 10;
      ctx.strokeStyle = '#2a2a4e';
      ctx.lineWidth = 0.5;

      // Calculate visible range
      const minWorld = canvasToWorld(0, canvas.height);
      const maxWorld = canvasToWorld(canvas.width, 0);

      const startX = Math.floor(minWorld.x / gridSize) * gridSize;
      const endX = Math.ceil(maxWorld.x / gridSize) * gridSize;
      const startY = Math.floor(minWorld.y / gridSize) * gridSize;
      const endY = Math.ceil(maxWorld.y / gridSize) * gridSize;

      // Vertical lines
      for (let x = startX; x <= endX; x += gridSize) {
        const canvasX = worldToCanvas({ x, y: 0, z: 0 }).x;
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = startY; y <= endY; y += gridSize) {
        const canvasY = worldToCanvas({ x: 0, y, z: 0 }).y;
        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(canvas.width, canvasY);
        ctx.stroke();
      }
    }

    // Draw axes
    if (showAxes) {
      const origin = worldToCanvas({ x: 0, y: 0, z: 0 });

      // X axis (red)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(origin.x + 50, origin.y);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.moveTo(origin.x + 50, origin.y);
      ctx.lineTo(origin.x + 45, origin.y - 5);
      ctx.lineTo(origin.x + 45, origin.y + 5);
      ctx.closePath();
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // X label
      ctx.fillStyle = '#ef4444';
      ctx.font = '12px sans-serif';
      ctx.fillText('X', origin.x + 55, origin.y + 4);

      // Y axis (green)
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(origin.x, origin.y - 50);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y - 50);
      ctx.lineTo(origin.x - 5, origin.y - 45);
      ctx.lineTo(origin.x + 5, origin.y - 45);
      ctx.closePath();
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      // Y label
      ctx.fillStyle = '#22c55e';
      ctx.font = '12px sans-serif';
      ctx.fillText('Y', origin.x - 4, origin.y - 55);

      // Origin marker
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Draw tool paths
    toolPaths.forEach((path, index) => {
      const from = worldToCanvas(path.from);
      const to = worldToCanvas(path.to);

      // Determine if this path should be fully drawn or partially (animation)
      let drawTo = to;
      let shouldDraw = true;

      if (isAnimating) {
        if (index > currentPathIndex) {
          shouldDraw = false;
        } else if (index === currentPathIndex) {
          // Interpolate for current path
          const progress = animationProgress;
          drawTo = {
            x: from.x + (to.x - from.x) * progress,
            y: from.y + (to.y - from.y) * progress
          };
        }
      }

      if (!shouldDraw) return;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);

      if (path.type === 'arc_cw' || path.type === 'arc_ccw') {
        // Simplified arc drawing (just draw a line for now)
        ctx.lineTo(drawTo.x, drawTo.y);
      } else {
        ctx.lineTo(drawTo.x, drawTo.y);
      }

      // Style based on path type
      if (path.type === 'rapid') {
        ctx.strokeStyle = '#fbbf24'; // Yellow for rapid
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
      } else {
        ctx.strokeStyle = index === currentPathIndex ? '#60a5fa' : '#3b82f6'; // Blue for cutting
        ctx.setLineDash([]);
        ctx.lineWidth = 2;
      }

      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw tool position during animation
    if (isAnimating && currentPathIndex >= 0 && currentPathIndex < toolPaths.length) {
      const path = toolPaths[currentPathIndex];
      const from = worldToCanvas(path.from);
      const to = worldToCanvas(path.to);

      const toolX = from.x + (to.x - from.x) * animationProgress;
      const toolY = from.y + (to.y - from.y) * animationProgress;

      // Tool marker (circle with crosshairs)
      ctx.beginPath();
      ctx.arc(toolX, toolY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(toolX - 12, toolY);
      ctx.lineTo(toolX + 12, toolY);
      ctx.moveTo(toolX, toolY - 12);
      ctx.lineTo(toolX, toolY + 12);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw mouse coordinates
    if (mousePos) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, canvas.height - 30, 150, 20);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(
        `X: ${mousePos.x.toFixed(2)} Y: ${mousePos.y.toFixed(2)}`,
        15,
        canvas.height - 15
      );
    }
  }, [
    toolPaths,
    viewState,
    currentPathIndex,
    isAnimating,
    animationProgress,
    showGrid,
    showAxes,
    mousePos,
    worldToCanvas,
    canvasToWorld
  ]);

  // Mouse handlers for pan and zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update mouse position display
    setMousePos(canvasToWorld(x, y));

    // Handle panning
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setViewState(prev => ({
        ...prev,
        offsetX: prev.offsetX + dx,
        offsetY: prev.offsetY + dy
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setMousePos(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(20, viewState.scale * zoomFactor));

    // Zoom towards mouse position
    const worldPos = canvasToWorld(mouseX, mouseY);
    const newOffsetX = mouseX - worldPos.x * newScale;
    const newOffsetY = mouseY + worldPos.y * newScale;

    setViewState({
      scale: newScale,
      offsetX: newOffsetX,
      offsetY: newOffsetY
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      />

      {/* Controls overlay */}
      <div className="absolute top-2 right-2 flex flex-col gap-1">
        <button
          onClick={() => setViewState(prev => ({ ...prev, scale: prev.scale * 1.2 }))}
          className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center"
          title={t('simulator.zoomIn', 'Zoom in')}
        >
          +
        </button>
        <button
          onClick={() => setViewState(prev => ({ ...prev, scale: prev.scale * 0.8 }))}
          className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center"
          title={t('simulator.zoomOut', 'Zoom out')}
        >
          -
        </button>
        <button
          onClick={calculateView}
          className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center text-xs"
          title={t('simulator.fitView', 'Fit to view')}
        >
          []
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-gray-800/80 p-2 rounded text-xs text-gray-300">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-0.5 bg-yellow-400" style={{ borderStyle: 'dashed' }}></div>
          <span>{t('simulator.rapidMove', 'Rapid (G0)')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500"></div>
          <span>{t('simulator.linearMove', 'Linear (G1)')}</span>
        </div>
      </div>
    </div>
  );
}
