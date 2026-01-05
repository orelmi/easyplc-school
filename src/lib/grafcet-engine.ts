// GRAFCET Engine - Data model and simulation logic

// ==================== TYPES ====================

export interface GrafcetStep {
  id: string;
  number: number;
  x: number;
  y: number;
  isInitial: boolean;
  isActive: boolean;
  actions: GrafcetAction[];
  comment?: string;
}

export interface GrafcetAction {
  id: string;
  type: 'simple' | 'conditional' | 'timed' | 'stored';
  output: string;
  condition?: string;
  delay?: number; // ms for timed actions
  label?: string;
}

export interface GrafcetTransition {
  id: string;
  fromSteps: string[]; // step IDs (multiple for AND convergence)
  toSteps: string[];   // step IDs (multiple for AND divergence)
  condition: string;
  x: number;
  y: number;
  label?: string;
}

export interface GrafcetLink {
  id: string;
  from: { type: 'step' | 'transition'; id: string };
  to: { type: 'step' | 'transition'; id: string };
  type: 'simple' | 'divergence-and' | 'convergence-and' | 'divergence-or' | 'convergence-or';
}

export interface GrafcetDiagram {
  id: string;
  name: string;
  description?: string;
  steps: GrafcetStep[];
  transitions: GrafcetTransition[];
  links: GrafcetLink[];
}

export interface GrafcetState {
  activeSteps: Set<string>;
  stepTimers: Map<string, number>; // step ID -> elapsed time in ms
  outputs: Map<string, boolean>;
  inputs: Map<string, boolean>;
  running: boolean;
  cycleCount: number;
}

// ==================== FACTORY FUNCTIONS ====================

export function createGrafcetStep(
  number: number,
  x: number,
  y: number,
  isInitial: boolean = false
): GrafcetStep {
  return {
    id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    number,
    x,
    y,
    isInitial,
    isActive: isInitial,
    actions: [],
    comment: ''
  };
}

export function createGrafcetTransition(
  fromSteps: string[],
  toSteps: string[],
  condition: string,
  x: number,
  y: number
): GrafcetTransition {
  return {
    id: `trans-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    fromSteps,
    toSteps,
    condition,
    x,
    y,
    label: ''
  };
}

export function createGrafcetAction(
  output: string,
  type: GrafcetAction['type'] = 'simple',
  label?: string
): GrafcetAction {
  return {
    id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    output,
    label
  };
}

export function createEmptyDiagram(name: string = 'New GRAFCET'): GrafcetDiagram {
  const initialStep = createGrafcetStep(0, 300, 100, true);
  return {
    id: `diagram-${Date.now()}`,
    name,
    description: '',
    steps: [initialStep],
    transitions: [],
    links: []
  };
}

export function createGrafcetState(diagram: GrafcetDiagram): GrafcetState {
  const activeSteps = new Set<string>();
  diagram.steps.forEach(step => {
    if (step.isInitial) {
      activeSteps.add(step.id);
    }
  });

  return {
    activeSteps,
    stepTimers: new Map(),
    outputs: new Map(),
    inputs: new Map([
      ['start', false],
      ['stop', false],
      ['sensor1', false],
      ['sensor2', false],
      ['sensor3', false],
      ['sensor4', false],
    ]),
    running: false,
    cycleCount: 0
  };
}

// ==================== CONDITION EVALUATION ====================

export function evaluateCondition(
  condition: string,
  state: GrafcetState,
  stepTimers: Map<string, number>
): boolean {
  if (!condition || condition.trim() === '') return false;

  const normalized = condition.trim().toLowerCase();

  // Always true condition
  if (normalized === '1' || normalized === 'true' || normalized === 'always') {
    return true;
  }

  // Check for timer conditions (e.g., "t/step-xxx/5s" or "5s")
  const timerMatch = normalized.match(/t\/([^/]+)\/(\d+)s?/);
  if (timerMatch) {
    const stepId = timerMatch[1];
    const delay = parseInt(timerMatch[2]) * 1000;
    const elapsed = stepTimers.get(stepId) || 0;
    return elapsed >= delay;
  }

  // Simple delay format "Xs" where X is seconds
  const simpleTimerMatch = normalized.match(/^(\d+)s$/);
  if (simpleTimerMatch) {
    const delay = parseInt(simpleTimerMatch[1]) * 1000;
    // Use the first active step's timer
    for (const [, elapsed] of stepTimers) {
      if (elapsed >= delay) return true;
    }
    return false;
  }

  // Boolean input conditions
  let result = normalized;

  // Replace input names with values
  state.inputs.forEach((value, key) => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    result = result.replace(regex, value ? 'true' : 'false');
  });

  // Replace NOT operator
  result = result.replace(/\bnot\b/gi, '!');
  result = result.replace(/\bnou\b/gi, '!'); // French

  // Replace AND operator
  result = result.replace(/\band\b/gi, '&&');
  result = result.replace(/\bet\b/gi, '&&'); // French
  result = result.replace(/\./g, '&&');

  // Replace OR operator
  result = result.replace(/\bor\b/gi, '||');
  result = result.replace(/\bou\b/gi, '||'); // French
  result = result.replace(/\+/g, '||');

  try {
    // Safe evaluation
    // eslint-disable-next-line no-new-func
    return new Function(`return ${result}`)() === true;
  } catch {
    return false;
  }
}

// ==================== SIMULATION ====================

export function executeCycle(
  diagram: GrafcetDiagram,
  state: GrafcetState,
  deltaTime: number
): GrafcetState {
  if (!state.running) return state;

  const newState: GrafcetState = {
    activeSteps: new Set(state.activeSteps),
    stepTimers: new Map(state.stepTimers),
    outputs: new Map(state.outputs),
    inputs: new Map(state.inputs),
    running: state.running,
    cycleCount: state.cycleCount + 1
  };

  // Update timers for active steps
  newState.activeSteps.forEach(stepId => {
    const currentTime = newState.stepTimers.get(stepId) || 0;
    newState.stepTimers.set(stepId, currentTime + deltaTime);
  });

  // Find fireable transitions
  const fireableTransitions: GrafcetTransition[] = [];

  diagram.transitions.forEach(transition => {
    // Check if all source steps are active
    const allSourcesActive = transition.fromSteps.every(stepId =>
      newState.activeSteps.has(stepId)
    );

    if (allSourcesActive) {
      // Evaluate transition condition
      if (evaluateCondition(transition.condition, newState, newState.stepTimers)) {
        fireableTransitions.push(transition);
      }
    }
  });

  // Fire transitions (deactivate source steps, activate target steps)
  fireableTransitions.forEach(transition => {
    // Deactivate source steps
    transition.fromSteps.forEach(stepId => {
      newState.activeSteps.delete(stepId);
      newState.stepTimers.delete(stepId);
    });

    // Activate target steps
    transition.toSteps.forEach(stepId => {
      newState.activeSteps.add(stepId);
      newState.stepTimers.set(stepId, 0);
    });
  });

  // Update outputs based on active steps
  newState.outputs.clear();
  diagram.steps.forEach(step => {
    if (newState.activeSteps.has(step.id)) {
      step.actions.forEach(action => {
        if (action.type === 'simple') {
          newState.outputs.set(action.output, true);
        }
        // Handle other action types as needed
      });
    }
  });

  return newState;
}

export function resetSimulation(diagram: GrafcetDiagram): GrafcetState {
  return createGrafcetState(diagram);
}

// ==================== SAMPLE DIAGRAMS ====================

export const sampleGrafcets: Record<string, GrafcetDiagram> = {
  simple: {
    id: 'simple-cycle',
    name: 'Simple Cycle',
    description: 'Basic start/stop cycle with one action',
    steps: [
      {
        id: 'step-0',
        number: 0,
        x: 300,
        y: 80,
        isInitial: true,
        isActive: true,
        actions: [],
        comment: 'Wait'
      },
      {
        id: 'step-1',
        number: 1,
        x: 300,
        y: 220,
        isInitial: false,
        isActive: false,
        actions: [{ id: 'a1', type: 'simple', output: 'Q1', label: 'Motor ON' }],
        comment: 'Running'
      }
    ],
    transitions: [
      {
        id: 'trans-1',
        fromSteps: ['step-0'],
        toSteps: ['step-1'],
        condition: 'start',
        x: 300,
        y: 150,
        label: 'Start button'
      },
      {
        id: 'trans-2',
        fromSteps: ['step-1'],
        toSteps: ['step-0'],
        condition: 'stop',
        x: 300,
        y: 290,
        label: 'Stop button'
      }
    ],
    links: []
  },

  timedCycle: {
    id: 'timed-cycle',
    name: 'Timed Sequence',
    description: 'Automatic cycle with timed transitions',
    steps: [
      {
        id: 'step-0',
        number: 0,
        x: 300,
        y: 60,
        isInitial: true,
        isActive: true,
        actions: [],
        comment: 'Initial'
      },
      {
        id: 'step-1',
        number: 1,
        x: 300,
        y: 180,
        isInitial: false,
        isActive: false,
        actions: [{ id: 'a1', type: 'simple', output: 'Q1', label: 'Cylinder OUT' }],
        comment: 'Extend'
      },
      {
        id: 'step-2',
        number: 2,
        x: 300,
        y: 300,
        isInitial: false,
        isActive: false,
        actions: [{ id: 'a2', type: 'simple', output: 'Q2', label: 'Cylinder IN' }],
        comment: 'Retract'
      }
    ],
    transitions: [
      {
        id: 'trans-1',
        fromSteps: ['step-0'],
        toSteps: ['step-1'],
        condition: 'start',
        x: 300,
        y: 120,
        label: 'Start'
      },
      {
        id: 'trans-2',
        fromSteps: ['step-1'],
        toSteps: ['step-2'],
        condition: 'sensor1',
        x: 300,
        y: 240,
        label: 'End sensor'
      },
      {
        id: 'trans-3',
        fromSteps: ['step-2'],
        toSteps: ['step-0'],
        condition: 'sensor2',
        x: 300,
        y: 360,
        label: 'Home sensor'
      }
    ],
    links: []
  },

  parallelBranch: {
    id: 'parallel',
    name: 'Parallel Branches',
    description: 'Simultaneous actions with AND divergence/convergence',
    steps: [
      {
        id: 'step-0',
        number: 0,
        x: 300,
        y: 60,
        isInitial: true,
        isActive: true,
        actions: [],
        comment: 'Wait'
      },
      {
        id: 'step-1',
        number: 1,
        x: 180,
        y: 200,
        isInitial: false,
        isActive: false,
        actions: [{ id: 'a1', type: 'simple', output: 'Q1', label: 'Motor 1' }],
        comment: 'Branch A'
      },
      {
        id: 'step-2',
        number: 2,
        x: 420,
        y: 200,
        isInitial: false,
        isActive: false,
        actions: [{ id: 'a2', type: 'simple', output: 'Q2', label: 'Motor 2' }],
        comment: 'Branch B'
      },
      {
        id: 'step-3',
        number: 3,
        x: 300,
        y: 340,
        isInitial: false,
        isActive: false,
        actions: [],
        comment: 'End'
      }
    ],
    transitions: [
      {
        id: 'trans-1',
        fromSteps: ['step-0'],
        toSteps: ['step-1', 'step-2'],
        condition: 'start',
        x: 300,
        y: 130,
        label: 'Start (AND)'
      },
      {
        id: 'trans-2',
        fromSteps: ['step-1'],
        toSteps: ['step-3'],
        condition: 'sensor1',
        x: 180,
        y: 270,
        label: 'Done A'
      },
      {
        id: 'trans-3',
        fromSteps: ['step-2'],
        toSteps: ['step-3'],
        condition: 'sensor2',
        x: 420,
        y: 270,
        label: 'Done B'
      },
      {
        id: 'trans-4',
        fromSteps: ['step-3'],
        toSteps: ['step-0'],
        condition: 'stop',
        x: 300,
        y: 400,
        label: 'Reset'
      }
    ],
    links: []
  },

  trafficLight: {
    id: 'traffic-light',
    name: 'Traffic Light',
    description: 'Traffic light sequence with timed steps',
    steps: [
      {
        id: 'step-0',
        number: 0,
        x: 300,
        y: 60,
        isInitial: true,
        isActive: true,
        actions: [{ id: 'a0', type: 'simple', output: 'RED', label: 'Red Light' }],
        comment: 'Red'
      },
      {
        id: 'step-1',
        number: 1,
        x: 300,
        y: 180,
        isInitial: false,
        isActive: false,
        actions: [{ id: 'a1', type: 'simple', output: 'GREEN', label: 'Green Light' }],
        comment: 'Green'
      },
      {
        id: 'step-2',
        number: 2,
        x: 300,
        y: 300,
        isInitial: false,
        isActive: false,
        actions: [{ id: 'a2', type: 'simple', output: 'YELLOW', label: 'Yellow Light' }],
        comment: 'Yellow'
      }
    ],
    transitions: [
      {
        id: 'trans-1',
        fromSteps: ['step-0'],
        toSteps: ['step-1'],
        condition: '5s',
        x: 300,
        y: 120,
        label: '5 seconds'
      },
      {
        id: 'trans-2',
        fromSteps: ['step-1'],
        toSteps: ['step-2'],
        condition: '4s',
        x: 300,
        y: 240,
        label: '4 seconds'
      },
      {
        id: 'trans-3',
        fromSteps: ['step-2'],
        toSteps: ['step-0'],
        condition: '2s',
        x: 300,
        y: 360,
        label: '2 seconds'
      }
    ],
    links: []
  }
};

export function getGrafcetNames(): { id: string; name: string; description?: string }[] {
  return Object.entries(sampleGrafcets).map(([id, grafcet]) => ({
    id,
    name: grafcet.name,
    description: grafcet.description
  }));
}
