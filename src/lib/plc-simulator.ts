// PLC Simulator Engine for LADDER programming

export interface PLCInput {
  address: string;
  label: string;
  value: boolean;
  type: 'button' | 'switch' | 'sensor';
}

export interface PLCOutput {
  address: string;
  label: string;
  value: boolean;
  type: 'lamp' | 'motor' | 'valve' | 'buzzer';
}

export interface PLCMemory {
  address: string;
  label: string;
  value: boolean;
}

export interface PLCTimer {
  address: string;
  label: string;
  preset: number; // in milliseconds
  elapsed: number;
  running: boolean;
  done: boolean;
  type: 'TON' | 'TOF' | 'TP'; // Timer ON delay, Timer OFF delay, Pulse
}

export interface PLCCounter {
  address: string;
  label: string;
  preset: number;
  count: number;
  done: boolean;
  type: 'CTU' | 'CTD'; // Count Up, Count Down
}

// LADDER element types
export type ContactType = 'NO' | 'NC' | 'P' | 'N'; // Normally Open, Normally Closed, Positive edge, Negative edge
export type CoilType = 'normal' | 'set' | 'reset' | 'negated';

export interface LadderContact {
  type: 'contact';
  contactType: ContactType;
  address: string;
  label?: string;
}

export interface LadderCoil {
  type: 'coil';
  coilType: CoilType;
  address: string;
  label?: string;
}

export interface LadderTimer {
  type: 'timer';
  timerType: 'TON' | 'TOF' | 'TP';
  address: string;
  preset: number;
  label?: string;
}

export interface LadderCounter {
  type: 'counter';
  counterType: 'CTU' | 'CTD';
  address: string;
  preset: number;
  label?: string;
}

export interface LadderBranch {
  type: 'branch';
  branches: LadderElement[][];
}

export type LadderElement = LadderContact | LadderCoil | LadderTimer | LadderCounter | LadderBranch;

export interface LadderRung {
  id: number;
  comment?: string;
  elements: LadderElement[];
  powerFlow: boolean; // Result of rung evaluation
}

export interface PLCProgram {
  name: string;
  description?: string;
  rungs: LadderRung[];
}

export interface PLCState {
  inputs: Map<string, PLCInput>;
  outputs: Map<string, PLCOutput>;
  memory: Map<string, PLCMemory>;
  timers: Map<string, PLCTimer>;
  counters: Map<string, PLCCounter>;
  running: boolean;
  cycleTime: number; // in ms
  cycleCount: number;
  lastCycleTime: number;
}

// Initialize PLC state with default I/O
export function createPLCState(): PLCState {
  const inputs = new Map<string, PLCInput>();
  const outputs = new Map<string, PLCOutput>();
  const memory = new Map<string, PLCMemory>();
  const timers = new Map<string, PLCTimer>();
  const counters = new Map<string, PLCCounter>();

  // Default inputs (8 inputs)
  for (let i = 0; i < 8; i++) {
    inputs.set(`I0.${i}`, {
      address: `I0.${i}`,
      label: `Input ${i}`,
      value: false,
      type: i < 4 ? 'button' : 'switch'
    });
  }

  // Default outputs (8 outputs)
  for (let i = 0; i < 8; i++) {
    outputs.set(`Q0.${i}`, {
      address: `Q0.${i}`,
      label: `Output ${i}`,
      value: false,
      type: i < 4 ? 'lamp' : 'motor'
    });
  }

  // Default memory bits (16 memory bits)
  for (let i = 0; i < 16; i++) {
    memory.set(`M0.${i}`, {
      address: `M0.${i}`,
      label: `Memory ${i}`,
      value: false
    });
  }

  return {
    inputs,
    outputs,
    memory,
    timers,
    counters,
    running: false,
    cycleTime: 10,
    cycleCount: 0,
    lastCycleTime: 0
  };
}

// Get value of any address (input, output, memory, timer, counter)
export function getValue(state: PLCState, address: string): boolean {
  if (address.startsWith('I')) {
    return state.inputs.get(address)?.value ?? false;
  } else if (address.startsWith('Q')) {
    return state.outputs.get(address)?.value ?? false;
  } else if (address.startsWith('M')) {
    return state.memory.get(address)?.value ?? false;
  } else if (address.startsWith('T')) {
    return state.timers.get(address)?.done ?? false;
  } else if (address.startsWith('C')) {
    return state.counters.get(address)?.done ?? false;
  }
  return false;
}

// Set value of any writable address (output, memory)
export function setValue(state: PLCState, address: string, value: boolean): void {
  if (address.startsWith('Q')) {
    const output = state.outputs.get(address);
    if (output) {
      output.value = value;
    }
  } else if (address.startsWith('M')) {
    const mem = state.memory.get(address);
    if (mem) {
      mem.value = value;
    }
  }
}

// Evaluate a single ladder element
function evaluateElement(
  element: LadderElement,
  state: PLCState,
  powerIn: boolean,
  deltaTime: number
): boolean {
  switch (element.type) {
    case 'contact': {
      const value = getValue(state, element.address);
      switch (element.contactType) {
        case 'NO':
          return powerIn && value;
        case 'NC':
          return powerIn && !value;
        case 'P': // Positive edge (simplified - would need previous state)
          return powerIn && value;
        case 'N': // Negative edge (simplified)
          return powerIn && !value;
        default:
          return false;
      }
    }

    case 'coil': {
      switch (element.coilType) {
        case 'normal':
          setValue(state, element.address, powerIn);
          break;
        case 'set':
          if (powerIn) setValue(state, element.address, true);
          break;
        case 'reset':
          if (powerIn) setValue(state, element.address, false);
          break;
        case 'negated':
          setValue(state, element.address, !powerIn);
          break;
      }
      return powerIn;
    }

    case 'timer': {
      let timer = state.timers.get(element.address);
      if (!timer) {
        timer = {
          address: element.address,
          label: element.label || element.address,
          preset: element.preset,
          elapsed: 0,
          running: false,
          done: false,
          type: element.timerType
        };
        state.timers.set(element.address, timer);
      }

      if (element.timerType === 'TON') {
        if (powerIn) {
          timer.running = true;
          timer.elapsed += deltaTime;
          if (timer.elapsed >= timer.preset) {
            timer.done = true;
            timer.elapsed = timer.preset;
          }
        } else {
          timer.running = false;
          timer.elapsed = 0;
          timer.done = false;
        }
      } else if (element.timerType === 'TOF') {
        if (powerIn) {
          timer.done = true;
          timer.elapsed = 0;
        } else {
          timer.running = true;
          timer.elapsed += deltaTime;
          if (timer.elapsed >= timer.preset) {
            timer.done = false;
            timer.elapsed = timer.preset;
          }
        }
      }

      return timer.done;
    }

    case 'counter': {
      let counter = state.counters.get(element.address);
      if (!counter) {
        counter = {
          address: element.address,
          label: element.label || element.address,
          preset: element.preset,
          count: 0,
          done: false,
          type: element.counterType
        };
        state.counters.set(element.address, counter);
      }

      // Simplified counter logic (would need edge detection for proper behavior)
      if (element.counterType === 'CTU') {
        if (powerIn && counter.count < counter.preset) {
          // Note: In real PLC, this would be edge-triggered
        }
        counter.done = counter.count >= counter.preset;
      }

      return counter.done;
    }

    case 'branch': {
      // OR logic: any branch passing power makes the whole branch pass power
      for (const branch of element.branches) {
        let branchPower = powerIn;
        for (const branchElement of branch) {
          branchPower = evaluateElement(branchElement, state, branchPower, deltaTime);
        }
        if (branchPower) return true;
      }
      return false;
    }

    default:
      return powerIn;
  }
}

// Evaluate a complete rung
export function evaluateRung(rung: LadderRung, state: PLCState, deltaTime: number): boolean {
  let power = true; // Power starts from left rail

  for (const element of rung.elements) {
    power = evaluateElement(element, state, power, deltaTime);
  }

  rung.powerFlow = power;
  return power;
}

// Execute one PLC cycle
export function executeCycle(program: PLCProgram, state: PLCState, deltaTime: number): void {
  if (!state.running) return;

  const startTime = performance.now();

  // Evaluate all rungs
  for (const rung of program.rungs) {
    evaluateRung(rung, state, deltaTime);
  }

  state.cycleCount++;
  state.lastCycleTime = performance.now() - startTime;
}

// Sample LADDER programs
export const samplePrograms: Record<string, PLCProgram> = {
  startStop: {
    name: 'Start/Stop Motor',
    description: 'Classic motor start/stop circuit with self-holding',
    rungs: [
      {
        id: 1,
        comment: 'Motor start/stop with self-holding',
        elements: [
          {
            type: 'branch',
            branches: [
              [{ type: 'contact', contactType: 'NO', address: 'I0.0', label: 'START' }],
              [{ type: 'contact', contactType: 'NO', address: 'Q0.0', label: 'MOTOR' }]
            ]
          },
          { type: 'contact', contactType: 'NC', address: 'I0.1', label: 'STOP' },
          { type: 'coil', coilType: 'normal', address: 'Q0.0', label: 'MOTOR' }
        ],
        powerFlow: false
      },
      {
        id: 2,
        comment: 'Motor running indicator',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'Q0.0', label: 'MOTOR' },
          { type: 'coil', coilType: 'normal', address: 'Q0.1', label: 'LAMP' }
        ],
        powerFlow: false
      }
    ]
  },

  trafficLight: {
    name: 'Traffic Light Sequence',
    description: 'Simple traffic light controller with timers',
    rungs: [
      {
        id: 1,
        comment: 'Start sequence on button press',
        elements: [
          {
            type: 'branch',
            branches: [
              [{ type: 'contact', contactType: 'NO', address: 'I0.0', label: 'START' }],
              [{ type: 'contact', contactType: 'NO', address: 'M0.0', label: 'RUN' }]
            ]
          },
          { type: 'contact', contactType: 'NC', address: 'I0.1', label: 'STOP' },
          { type: 'coil', coilType: 'normal', address: 'M0.0', label: 'RUN' }
        ],
        powerFlow: false
      },
      {
        id: 2,
        comment: 'Green light (initial state)',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'M0.0', label: 'RUN' },
          { type: 'contact', contactType: 'NC', address: 'M0.1', label: 'YELLOW' },
          { type: 'contact', contactType: 'NC', address: 'M0.2', label: 'RED' },
          { type: 'coil', coilType: 'normal', address: 'Q0.0', label: 'GREEN' }
        ],
        powerFlow: false
      },
      {
        id: 3,
        comment: 'Green timer',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'Q0.0', label: 'GREEN' },
          { type: 'timer', timerType: 'TON', address: 'T0', preset: 3000, label: 'T_GREEN' }
        ],
        powerFlow: false
      },
      {
        id: 4,
        comment: 'Yellow light',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'T0', label: 'T_GREEN' },
          { type: 'contact', contactType: 'NC', address: 'M0.2', label: 'RED' },
          { type: 'coil', coilType: 'set', address: 'M0.1', label: 'YELLOW' }
        ],
        powerFlow: false
      },
      {
        id: 5,
        comment: 'Yellow output',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'M0.1', label: 'YELLOW' },
          { type: 'contact', contactType: 'NC', address: 'M0.2', label: 'RED' },
          { type: 'coil', coilType: 'normal', address: 'Q0.1', label: 'YELLOW_OUT' }
        ],
        powerFlow: false
      },
      {
        id: 6,
        comment: 'Yellow timer',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'Q0.1', label: 'YELLOW_OUT' },
          { type: 'timer', timerType: 'TON', address: 'T1', preset: 1500, label: 'T_YELLOW' }
        ],
        powerFlow: false
      },
      {
        id: 7,
        comment: 'Red light',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'T1', label: 'T_YELLOW' },
          { type: 'coil', coilType: 'set', address: 'M0.2', label: 'RED' },
          { type: 'coil', coilType: 'reset', address: 'M0.1', label: 'YELLOW' }
        ],
        powerFlow: false
      },
      {
        id: 8,
        comment: 'Red output',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'M0.2', label: 'RED' },
          { type: 'coil', coilType: 'normal', address: 'Q0.2', label: 'RED_OUT' }
        ],
        powerFlow: false
      },
      {
        id: 9,
        comment: 'Red timer',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'Q0.2', label: 'RED_OUT' },
          { type: 'timer', timerType: 'TON', address: 'T2', preset: 3000, label: 'T_RED' }
        ],
        powerFlow: false
      },
      {
        id: 10,
        comment: 'Reset to green',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'T2', label: 'T_RED' },
          { type: 'coil', coilType: 'reset', address: 'M0.2', label: 'RED' }
        ],
        powerFlow: false
      }
    ]
  },

  andGate: {
    name: 'AND Gate',
    description: 'Simple AND logic: Q0.0 = I0.0 AND I0.1',
    rungs: [
      {
        id: 1,
        comment: 'AND gate: both inputs must be ON',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'I0.0', label: 'INPUT_A' },
          { type: 'contact', contactType: 'NO', address: 'I0.1', label: 'INPUT_B' },
          { type: 'coil', coilType: 'normal', address: 'Q0.0', label: 'OUTPUT' }
        ],
        powerFlow: false
      }
    ]
  },

  orGate: {
    name: 'OR Gate',
    description: 'Simple OR logic: Q0.0 = I0.0 OR I0.1',
    rungs: [
      {
        id: 1,
        comment: 'OR gate: either input turns on output',
        elements: [
          {
            type: 'branch',
            branches: [
              [{ type: 'contact', contactType: 'NO', address: 'I0.0', label: 'INPUT_A' }],
              [{ type: 'contact', contactType: 'NO', address: 'I0.1', label: 'INPUT_B' }]
            ]
          },
          { type: 'coil', coilType: 'normal', address: 'Q0.0', label: 'OUTPUT' }
        ],
        powerFlow: false
      }
    ]
  },

  notGate: {
    name: 'NOT Gate',
    description: 'Simple NOT logic: Q0.0 = NOT I0.0',
    rungs: [
      {
        id: 1,
        comment: 'NOT gate: output is inverse of input',
        elements: [
          { type: 'contact', contactType: 'NC', address: 'I0.0', label: 'INPUT' },
          { type: 'coil', coilType: 'normal', address: 'Q0.0', label: 'OUTPUT' }
        ],
        powerFlow: false
      }
    ]
  },

  timerOnDelay: {
    name: 'Timer ON Delay',
    description: 'Output turns ON after 2 seconds of input being ON',
    rungs: [
      {
        id: 1,
        comment: 'Timer ON delay - 2 second delay',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'I0.0', label: 'START' },
          { type: 'timer', timerType: 'TON', address: 'T0', preset: 2000, label: 'TIMER' }
        ],
        powerFlow: false
      },
      {
        id: 2,
        comment: 'Output when timer done',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'T0', label: 'TIMER' },
          { type: 'coil', coilType: 'normal', address: 'Q0.0', label: 'OUTPUT' }
        ],
        powerFlow: false
      }
    ]
  },

  blinkingLight: {
    name: 'Blinking Light',
    description: 'Output blinks when input is ON',
    rungs: [
      {
        id: 1,
        comment: 'Oscillator timer 1',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'I0.0', label: 'ENABLE' },
          { type: 'contact', contactType: 'NC', address: 'M0.1', label: 'BLINK' },
          { type: 'timer', timerType: 'TON', address: 'T0', preset: 500, label: 'T_ON' }
        ],
        powerFlow: false
      },
      {
        id: 2,
        comment: 'Set blink flag',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'T0', label: 'T_ON' },
          { type: 'coil', coilType: 'set', address: 'M0.1', label: 'BLINK' }
        ],
        powerFlow: false
      },
      {
        id: 3,
        comment: 'Oscillator timer 2',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'M0.1', label: 'BLINK' },
          { type: 'timer', timerType: 'TON', address: 'T1', preset: 500, label: 'T_OFF' }
        ],
        powerFlow: false
      },
      {
        id: 4,
        comment: 'Reset blink flag',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'T1', label: 'T_OFF' },
          { type: 'coil', coilType: 'reset', address: 'M0.1', label: 'BLINK' }
        ],
        powerFlow: false
      },
      {
        id: 5,
        comment: 'Output lamp',
        elements: [
          { type: 'contact', contactType: 'NO', address: 'I0.0', label: 'ENABLE' },
          { type: 'contact', contactType: 'NO', address: 'M0.1', label: 'BLINK' },
          { type: 'coil', coilType: 'normal', address: 'Q0.0', label: 'LAMP' }
        ],
        powerFlow: false
      }
    ]
  }
};

// Get program names for selector
export function getProgramNames(): { id: string; name: string; description: string }[] {
  return Object.entries(samplePrograms).map(([id, prog]) => ({
    id,
    name: prog.name,
    description: prog.description || ''
  }));
}
