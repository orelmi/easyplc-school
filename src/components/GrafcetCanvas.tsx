import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GrafcetDiagram,
  GrafcetStep,
  GrafcetTransition,
  GrafcetState
} from '../lib/grafcet-engine';

interface GrafcetCanvasProps {
  diagram: GrafcetDiagram;
  state: GrafcetState;
  selectedElement: { type: 'step' | 'transition'; id: string } | null;
  onSelectElement: (element: { type: 'step' | 'transition'; id: string } | null) => void;
  onMoveStep: (stepId: string, x: number, y: number) => void;
  onMoveTransition: (transId: string, x: number, y: number) => void;
  tool: 'select' | 'step' | 'transition' | 'link';
  onAddStep: (x: number, y: number) => void;
  onAddTransition: (x: number, y: number) => void;
}

const STEP_WIDTH = 60;
const STEP_HEIGHT = 40;
const TRANS_WIDTH = 40;
const TRANS_HEIGHT = 8;

export default function GrafcetCanvas({
  diagram,
  state,
  selectedElement,
  onSelectElement,
  onMoveStep,
  onMoveTransition,
  tool,
  onAddStep,
  onAddTransition
}: GrafcetCanvasProps) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<{ type: 'step' | 'transition'; id: string; offsetX: number; offsetY: number } | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Resize handler
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Draw the GRAFCET diagram
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a2a4e';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw connections (links from steps to transitions and vice versa)
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;

    diagram.transitions.forEach(trans => {
      // Draw lines from source steps to transition
      trans.fromSteps.forEach(stepId => {
        const step = diagram.steps.find(s => s.id === stepId);
        if (step) {
          ctx.beginPath();
          ctx.moveTo(step.x, step.y + STEP_HEIGHT / 2);
          ctx.lineTo(trans.x, trans.y - TRANS_HEIGHT / 2);
          ctx.stroke();
        }
      });

      // Draw lines from transition to target steps
      trans.toSteps.forEach(stepId => {
        const step = diagram.steps.find(s => s.id === stepId);
        if (step) {
          ctx.beginPath();
          ctx.moveTo(trans.x, trans.y + TRANS_HEIGHT / 2);
          ctx.lineTo(step.x, step.y - STEP_HEIGHT / 2);
          ctx.stroke();

          // Draw arrow
          const angle = Math.atan2(step.y - STEP_HEIGHT / 2 - trans.y, step.x - trans.x);
          const arrowSize = 10;
          const arrowX = step.x;
          const arrowY = step.y - STEP_HEIGHT / 2;
          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(
            arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
            arrowY - arrowSize * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
            arrowY - arrowSize * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();
        }
      });
    });

    // Draw steps
    diagram.steps.forEach(step => {
      const isActive = state.activeSteps.has(step.id);
      const isSelected = selectedElement?.type === 'step' && selectedElement?.id === step.id;

      // Step rectangle
      ctx.fillStyle = isActive ? '#22c55e' : '#3b3b5c';
      ctx.strokeStyle = isSelected ? '#3b82f6' : (step.isInitial ? '#f59e0b' : '#666');
      ctx.lineWidth = isSelected ? 3 : (step.isInitial ? 3 : 2);

      const x = step.x - STEP_WIDTH / 2;
      const y = step.y - STEP_HEIGHT / 2;

      // Double border for initial step
      if (step.isInitial) {
        ctx.fillRect(x - 4, y - 4, STEP_WIDTH + 8, STEP_HEIGHT + 8);
        ctx.strokeRect(x - 4, y - 4, STEP_WIDTH + 8, STEP_HEIGHT + 8);
      }

      ctx.fillRect(x, y, STEP_WIDTH, STEP_HEIGHT);
      ctx.strokeRect(x, y, STEP_WIDTH, STEP_HEIGHT);

      // Step number
      ctx.fillStyle = isActive ? '#fff' : '#ccc';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(step.number.toString(), step.x, step.y);

      // Actions (to the right of step)
      if (step.actions.length > 0) {
        const actionX = step.x + STEP_WIDTH / 2 + 10;
        ctx.strokeStyle = isActive ? '#22c55e' : '#666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(step.x + STEP_WIDTH / 2, step.y);
        ctx.lineTo(actionX, step.y);
        ctx.stroke();

        step.actions.forEach((action, idx) => {
          const actionY = step.y + idx * 20;
          ctx.fillStyle = '#2a2a4e';
          ctx.strokeStyle = isActive ? '#22c55e' : '#666';
          ctx.fillRect(actionX, actionY - 10, 80, 20);
          ctx.strokeRect(actionX, actionY - 10, 80, 20);

          ctx.fillStyle = isActive ? '#22c55e' : '#aaa';
          ctx.font = '12px monospace';
          ctx.textAlign = 'left';
          ctx.fillText(action.output, actionX + 5, actionY + 4);
        });
      }

      // Comment (below step)
      if (step.comment) {
        ctx.fillStyle = '#888';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(step.comment, step.x, step.y + STEP_HEIGHT / 2 + 15);
      }
    });

    // Draw transitions
    diagram.transitions.forEach(trans => {
      const isSelected = selectedElement?.type === 'transition' && selectedElement?.id === trans.id;

      // Check if transition can fire (all source steps active)
      const canFire = trans.fromSteps.every(stepId => state.activeSteps.has(stepId));

      // Transition bar
      ctx.fillStyle = canFire ? '#3b82f6' : '#3b3b5c';
      ctx.strokeStyle = isSelected ? '#3b82f6' : '#666';
      ctx.lineWidth = isSelected ? 3 : 2;

      const x = trans.x - TRANS_WIDTH / 2;
      const y = trans.y - TRANS_HEIGHT / 2;

      ctx.fillRect(x, y, TRANS_WIDTH, TRANS_HEIGHT);
      ctx.strokeRect(x, y, TRANS_WIDTH, TRANS_HEIGHT);

      // Condition label (to the right)
      ctx.fillStyle = canFire ? '#3b82f6' : '#888';
      ctx.font = '12px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(trans.condition, trans.x + TRANS_WIDTH / 2 + 10, trans.y);

      // Optional label (to the left)
      if (trans.label) {
        ctx.fillStyle = '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(trans.label, trans.x - TRANS_WIDTH / 2 - 10, trans.y);
      }
    });

    // Draw tool hint
    if (tool !== 'select') {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.fillRect(10, canvas.height - 40, 200, 30);
      ctx.fillStyle = '#3b82f6';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const toolText = tool === 'step'
        ? t('grafcet.clickToAddStep', 'Click to add step')
        : tool === 'transition'
        ? t('grafcet.clickToAddTransition', 'Click to add transition')
        : t('grafcet.clickToLink', 'Click elements to link');
      ctx.fillText(toolText, 20, canvas.height - 25);
    }

  }, [diagram, state, selectedElement, t, tool]);

  // Redraw on changes
  useEffect(() => {
    draw();
  }, [draw, canvasSize]);

  // Find element at position
  const findElementAt = (x: number, y: number): { type: 'step' | 'transition'; id: string } | null => {
    // Check steps
    for (const step of diagram.steps) {
      if (
        x >= step.x - STEP_WIDTH / 2 &&
        x <= step.x + STEP_WIDTH / 2 &&
        y >= step.y - STEP_HEIGHT / 2 &&
        y <= step.y + STEP_HEIGHT / 2
      ) {
        return { type: 'step', id: step.id };
      }
    }

    // Check transitions
    for (const trans of diagram.transitions) {
      if (
        x >= trans.x - TRANS_WIDTH / 2 &&
        x <= trans.x + TRANS_WIDTH / 2 &&
        y >= trans.y - TRANS_HEIGHT / 2 &&
        y <= trans.y + TRANS_HEIGHT / 2
      ) {
        return { type: 'transition', id: trans.id };
      }
    }

    return null;
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'select') {
      const element = findElementAt(x, y);
      onSelectElement(element);

      if (element) {
        if (element.type === 'step') {
          const step = diagram.steps.find(s => s.id === element.id);
          if (step) {
            setDragging({ type: 'step', id: element.id, offsetX: x - step.x, offsetY: y - step.y });
          }
        } else {
          const trans = diagram.transitions.find(t => t.id === element.id);
          if (trans) {
            setDragging({ type: 'transition', id: element.id, offsetX: x - trans.x, offsetY: y - trans.y });
          }
        }
      }
    } else if (tool === 'step') {
      onAddStep(x, y);
    } else if (tool === 'transition') {
      onAddTransition(x, y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - dragging.offsetX;
    const y = e.clientY - rect.top - dragging.offsetY;

    if (dragging.type === 'step') {
      onMoveStep(dragging.id, x, y);
    } else {
      onMoveTransition(dragging.id, x, y);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="cursor-crosshair"
        style={{ cursor: tool === 'select' ? (dragging ? 'grabbing' : 'default') : 'crosshair' }}
      />
    </div>
  );
}
