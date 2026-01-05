// G-Code Parser and Interpreter for CNC Simulation

export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface GCodeCommand {
  line: number;
  raw: string;
  type: 'G' | 'M' | 'T' | 'S' | 'F' | 'comment' | 'error';
  code: number | null;
  params: Record<string, number>;
  comment?: string;
  error?: string;
}

export interface ToolPath {
  from: Point;
  to: Point;
  type: 'rapid' | 'linear' | 'arc_cw' | 'arc_ccw';
  feedRate?: number;
  lineNumber: number;
}

export interface MachineState {
  position: Point;
  feedRate: number;
  spindleSpeed: number;
  spindleOn: boolean;
  coolantOn: boolean;
  absoluteMode: boolean;
  selectedPlane: 'XY' | 'XZ' | 'YZ';
  unit: 'mm' | 'inch';
  tool: number;
  workOffset: Point;
}

export interface SimulationResult {
  success: boolean;
  commands: GCodeCommand[];
  toolPaths: ToolPath[];
  finalState: MachineState;
  errors: string[];
  warnings: string[];
  bounds: {
    min: Point;
    max: Point;
  };
  statistics: {
    totalDistance: number;
    rapidDistance: number;
    cuttingDistance: number;
    estimatedTime: number; // in seconds
  };
}

const INITIAL_STATE: MachineState = {
  position: { x: 0, y: 0, z: 0 },
  feedRate: 100,
  spindleSpeed: 0,
  spindleOn: false,
  coolantOn: false,
  absoluteMode: true,
  selectedPlane: 'XY',
  unit: 'mm',
  tool: 0,
  workOffset: { x: 0, y: 0, z: 0 },
};

// Parse a single line of G-Code
function parseLine(line: string, lineNumber: number): GCodeCommand {
  const raw = line.trim();

  // Empty line
  if (!raw) {
    return { line: lineNumber, raw, type: 'comment', code: null, params: {} };
  }

  // Comment only line
  if (raw.startsWith('(') || raw.startsWith(';')) {
    return {
      line: lineNumber,
      raw,
      type: 'comment',
      code: null,
      params: {},
      comment: raw.replace(/^[;(]/, '').replace(/\)$/, '').trim()
    };
  }

  // Extract inline comment
  let codePart = raw;
  let comment: string | undefined;

  const commentMatch = raw.match(/\(([^)]*)\)|;(.*)$/);
  if (commentMatch) {
    comment = (commentMatch[1] || commentMatch[2] || '').trim();
    codePart = raw.replace(/\([^)]*\)|;.*$/, '').trim();
  }

  if (!codePart) {
    return { line: lineNumber, raw, type: 'comment', code: null, params: {}, comment };
  }

  // Parse the command
  const tokens = codePart.toUpperCase().match(/[A-Z][+-]?\d*\.?\d*/g);

  if (!tokens || tokens.length === 0) {
    return {
      line: lineNumber,
      raw,
      type: 'error',
      code: null,
      params: {},
      error: `Syntax error: Unable to parse "${codePart}"`
    };
  }

  const firstToken = tokens[0];
  const typeChar = firstToken[0] as 'G' | 'M' | 'T' | 'S' | 'F';
  const codeValue = parseFloat(firstToken.slice(1));

  const params: Record<string, number> = {};

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    const paramName = token[0];
    const paramValue = parseFloat(token.slice(1)) || 0;
    params[paramName] = paramValue;
  }

  // Handle special cases where G/M is not the first token
  if (!['G', 'M', 'T', 'S', 'F'].includes(typeChar)) {
    // This might be a coordinate-only line (continuation of previous G command)
    const allParams: Record<string, number> = {};
    for (const token of tokens) {
      const paramName = token[0];
      const paramValue = parseFloat(token.slice(1)) || 0;
      allParams[paramName] = paramValue;
    }
    return {
      line: lineNumber,
      raw,
      type: 'G',
      code: null, // Will use previous modal G code
      params: allParams,
      comment
    };
  }

  return {
    line: lineNumber,
    raw,
    type: typeChar,
    code: isNaN(codeValue) ? null : codeValue,
    params,
    comment
  };
}

// Calculate distance between two points
function distance(from: Point, to: Point): number {
  return Math.sqrt(
    Math.pow(to.x - from.x, 2) +
    Math.pow(to.y - from.y, 2) +
    Math.pow(to.z - from.z, 2)
  );
}

// Main parser function
export function parseGCode(code: string): SimulationResult {
  const lines = code.split('\n');
  const commands: GCodeCommand[] = [];
  const toolPaths: ToolPath[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];

  let state: MachineState = { ...INITIAL_STATE };
  let modalGCode = 0; // Current modal G code (G0, G1, G2, G3)

  const bounds = {
    min: { x: Infinity, y: Infinity, z: Infinity },
    max: { x: -Infinity, y: -Infinity, z: -Infinity }
  };

  let totalDistance = 0;
  let rapidDistance = 0;
  let cuttingDistance = 0;

  // Update bounds with a point
  const updateBounds = (point: Point) => {
    bounds.min.x = Math.min(bounds.min.x, point.x);
    bounds.min.y = Math.min(bounds.min.y, point.y);
    bounds.min.z = Math.min(bounds.min.z, point.z);
    bounds.max.x = Math.max(bounds.max.x, point.x);
    bounds.max.y = Math.max(bounds.max.y, point.y);
    bounds.max.z = Math.max(bounds.max.z, point.z);
  };

  // Initialize bounds with origin
  updateBounds(state.position);

  for (let i = 0; i < lines.length; i++) {
    const cmd = parseLine(lines[i], i + 1);
    commands.push(cmd);

    if (cmd.type === 'error') {
      errors.push(`Line ${cmd.line}: ${cmd.error}`);
      continue;
    }

    if (cmd.type === 'comment') {
      continue;
    }

    // Handle G codes
    if (cmd.type === 'G') {
      const gCode = cmd.code !== null ? cmd.code : modalGCode;

      switch (gCode) {
        case 0: // Rapid positioning
        case 1: // Linear interpolation
          modalGCode = gCode;
          {
            const from = { ...state.position };
            const to = { ...state.position };

            if (state.absoluteMode) {
              if ('X' in cmd.params) to.x = cmd.params.X;
              if ('Y' in cmd.params) to.y = cmd.params.Y;
              if ('Z' in cmd.params) to.z = cmd.params.Z;
            } else {
              if ('X' in cmd.params) to.x += cmd.params.X;
              if ('Y' in cmd.params) to.y += cmd.params.Y;
              if ('Z' in cmd.params) to.z += cmd.params.Z;
            }

            if ('F' in cmd.params) {
              state.feedRate = cmd.params.F;
            }

            const dist = distance(from, to);
            totalDistance += dist;

            if (gCode === 0) {
              rapidDistance += dist;
              toolPaths.push({
                from,
                to,
                type: 'rapid',
                lineNumber: cmd.line
              });
            } else {
              cuttingDistance += dist;
              toolPaths.push({
                from,
                to,
                type: 'linear',
                feedRate: state.feedRate,
                lineNumber: cmd.line
              });
            }

            state.position = to;
            updateBounds(to);
          }
          break;

        case 2: // Circular interpolation CW
        case 3: // Circular interpolation CCW
          modalGCode = gCode;
          {
            const from = { ...state.position };
            const to = { ...state.position };

            if (state.absoluteMode) {
              if ('X' in cmd.params) to.x = cmd.params.X;
              if ('Y' in cmd.params) to.y = cmd.params.Y;
              if ('Z' in cmd.params) to.z = cmd.params.Z;
            } else {
              if ('X' in cmd.params) to.x += cmd.params.X;
              if ('Y' in cmd.params) to.y += cmd.params.Y;
              if ('Z' in cmd.params) to.z += cmd.params.Z;
            }

            if ('F' in cmd.params) {
              state.feedRate = cmd.params.F;
            }

            // Approximate arc length (simplified)
            const dist = distance(from, to) * 1.5;
            totalDistance += dist;
            cuttingDistance += dist;

            toolPaths.push({
              from,
              to,
              type: gCode === 2 ? 'arc_cw' : 'arc_ccw',
              feedRate: state.feedRate,
              lineNumber: cmd.line
            });

            state.position = to;
            updateBounds(to);
          }
          break;

        case 4: // Dwell
          // G4 P<milliseconds> or G4 S<seconds>
          break;

        case 17: // XY plane selection
          state.selectedPlane = 'XY';
          break;

        case 18: // XZ plane selection
          state.selectedPlane = 'XZ';
          break;

        case 19: // YZ plane selection
          state.selectedPlane = 'YZ';
          break;

        case 20: // Inch mode
          state.unit = 'inch';
          break;

        case 21: // Metric mode
          state.unit = 'mm';
          break;

        case 28: // Return to home
          {
            const from = { ...state.position };
            const to = { x: 0, y: 0, z: 0 };

            const dist = distance(from, to);
            totalDistance += dist;
            rapidDistance += dist;

            toolPaths.push({
              from,
              to,
              type: 'rapid',
              lineNumber: cmd.line
            });

            state.position = to;
          }
          break;

        case 90: // Absolute positioning
          state.absoluteMode = true;
          break;

        case 91: // Relative/incremental positioning
          state.absoluteMode = false;
          break;

        case 92: // Set position
          if ('X' in cmd.params) state.position.x = cmd.params.X;
          if ('Y' in cmd.params) state.position.y = cmd.params.Y;
          if ('Z' in cmd.params) state.position.z = cmd.params.Z;
          break;

        default:
          if (gCode !== null) {
            warnings.push(`Line ${cmd.line}: G${gCode} not fully supported`);
          }
      }
    }

    // Handle M codes
    if (cmd.type === 'M') {
      switch (cmd.code) {
        case 0: // Program stop
        case 1: // Optional program stop
          break;

        case 2: // Program end
        case 30: // Program end and rewind
          break;

        case 3: // Spindle on CW
        case 4: // Spindle on CCW
          state.spindleOn = true;
          break;

        case 5: // Spindle off
          state.spindleOn = false;
          break;

        case 6: // Tool change
          if ('T' in cmd.params) {
            state.tool = cmd.params.T;
          }
          break;

        case 7: // Mist coolant on
        case 8: // Flood coolant on
          state.coolantOn = true;
          break;

        case 9: // Coolant off
          state.coolantOn = false;
          break;

        default:
          if (cmd.code !== null) {
            warnings.push(`Line ${cmd.line}: M${cmd.code} not fully supported`);
          }
      }
    }

    // Handle S code (spindle speed)
    if (cmd.type === 'S') {
      state.spindleSpeed = cmd.code || 0;
    }

    // Handle F code (feed rate)
    if (cmd.type === 'F') {
      state.feedRate = cmd.code || state.feedRate;
    }

    // Handle T code (tool selection)
    if (cmd.type === 'T') {
      state.tool = cmd.code || 0;
    }
  }

  // Fix bounds if no movement occurred
  if (bounds.min.x === Infinity) {
    bounds.min = { x: 0, y: 0, z: 0 };
    bounds.max = { x: 0, y: 0, z: 0 };
  }

  // Estimate time (simplified calculation)
  const rapidFeedRate = 5000; // mm/min for rapid moves
  const estimatedTime =
    (rapidDistance / rapidFeedRate) * 60 +
    (cuttingDistance / (state.feedRate || 100)) * 60;

  return {
    success: errors.length === 0,
    commands,
    toolPaths,
    finalState: state,
    errors,
    warnings,
    bounds,
    statistics: {
      totalDistance,
      rapidDistance,
      cuttingDistance,
      estimatedTime
    }
  };
}

// Validate G-Code without full simulation
export function validateGCode(code: string): { valid: boolean; errors: string[] } {
  const result = parseGCode(code);
  return {
    valid: result.errors.length === 0,
    errors: result.errors
  };
}

// Get supported G and M codes
export function getSupportedCodes(): { gCodes: string[]; mCodes: string[] } {
  return {
    gCodes: [
      'G0 - Rapid positioning',
      'G1 - Linear interpolation',
      'G2 - Circular interpolation CW',
      'G3 - Circular interpolation CCW',
      'G4 - Dwell',
      'G17 - XY plane selection',
      'G18 - XZ plane selection',
      'G19 - YZ plane selection',
      'G20 - Inch mode',
      'G21 - Metric mode',
      'G28 - Return to home',
      'G90 - Absolute positioning',
      'G91 - Incremental positioning',
      'G92 - Set position',
    ],
    mCodes: [
      'M0 - Program stop',
      'M1 - Optional stop',
      'M2 - Program end',
      'M3 - Spindle on CW',
      'M4 - Spindle on CCW',
      'M5 - Spindle off',
      'M6 - Tool change',
      'M7 - Mist coolant on',
      'M8 - Flood coolant on',
      'M9 - Coolant off',
      'M30 - Program end and rewind',
    ]
  };
}

// Sample G-Code programs for testing
export const samplePrograms = {
  square: `; Square pattern
G21 (Metric)
G90 (Absolute)
G0 Z5 (Safety height)
G0 X0 Y0 (Start position)
G1 Z-1 F100 (Plunge)
G1 X50 F200 (Right)
G1 Y50 (Up)
G1 X0 (Left)
G1 Y0 (Down)
G0 Z5 (Retract)
M30 (End)`,

  circle: `; Circle pattern
G21 (Metric)
G90 (Absolute)
G17 (XY Plane)
G0 Z5 (Safety height)
G0 X25 Y0 (Start position)
G1 Z-1 F100 (Plunge)
G2 X25 Y0 I-25 J0 F150 (Full circle)
G0 Z5 (Retract)
M30 (End)`,

  star: `; Star pattern
G21 (Metric)
G90 (Absolute)
G0 Z5
G0 X25 Y47.55
G1 Z-1 F100
G1 X0 Y18.16 F200
G1 X40.45 Y36.33
G1 X9.55 Y36.33
G1 X50 Y18.16
G1 X25 Y47.55
G0 Z5
M30`,

  triangle: `; Triangle pattern
G21 (Metric)
G90 (Absolute)
G0 Z5 (Safety height)
G0 X0 Y0
G1 Z-1 F100
G1 X50 Y0 F200
G1 X25 Y43.3
G1 X0 Y0
G0 Z5
M30`,

  spiral: `; Spiral pattern
G21
G90
G0 Z5
G0 X0 Y0
G1 Z-1 F100
G1 X10 Y0 F200
G2 X0 Y10 I-10 J0
G2 X-15 Y0 I0 J-15
G2 X0 Y-20 I15 J0
G2 X25 Y0 I0 J20
G0 Z5
M30`
};
