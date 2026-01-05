import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
import { ToolPath, Point } from '../lib/gcode-parser';

interface GCodeCanvas3DProps {
  toolPaths: ToolPath[];
  bounds: { min: Point; max: Point };
  currentPathIndex?: number;
  isAnimating?: boolean;
  animationProgress?: number;
  showGrid?: boolean;
  showAxes?: boolean;
}

export default function GCodeCanvas3D({
  toolPaths,
  bounds,
  currentPathIndex = -1,
  isAnimating = false,
  animationProgress = 0,
  showGrid = true,
  showAxes = true
}: GCodeCanvas3DProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pathGroupRef = useRef<THREE.Group | null>(null);
  const toolMarkerRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Mouse controls state
  const [isDragging, setIsDragging] = useState(false);
  const [isRightDragging, setIsRightDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 4 });
  const cameraDistanceRef = useRef(150);
  const cameraPanRef = useRef({ x: 0, y: 0, z: 0 });

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 50);
    scene.add(directionalLight);

    // Path group
    const pathGroup = new THREE.Group();
    scene.add(pathGroup);
    pathGroupRef.current = pathGroup;

    // Tool marker
    const toolGeometry = new THREE.ConeGeometry(2, 8, 16);
    const toolMaterial = new THREE.MeshPhongMaterial({ color: 0xef4444 });
    const toolMarker = new THREE.Mesh(toolGeometry, toolMaterial);
    toolMarker.rotation.x = Math.PI; // Point downward
    toolMarker.visible = false;
    scene.add(toolMarker);
    toolMarkerRef.current = toolMarker;

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  // Update camera position based on angles
  const updateCamera = useCallback(() => {
    if (!cameraRef.current) return;

    const { theta, phi } = cameraAngleRef.current;
    const distance = cameraDistanceRef.current;
    const pan = cameraPanRef.current;

    const x = distance * Math.sin(phi) * Math.cos(theta) + pan.x;
    const y = distance * Math.cos(phi) + pan.y;
    const z = distance * Math.sin(phi) * Math.sin(theta) + pan.z;

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(pan.x, pan.y, pan.z);
  }, []);

  // Create grid and axes
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;

    // Remove old grid/axes
    const oldGrid = scene.getObjectByName('grid');
    const oldAxes = scene.getObjectByName('axes');
    if (oldGrid) scene.remove(oldGrid);
    if (oldAxes) scene.remove(oldAxes);

    // Calculate center and size
    const centerX = (bounds.min.x + bounds.max.x) / 2;
    const centerY = (bounds.min.y + bounds.max.y) / 2;
    const size = Math.max(
      bounds.max.x - bounds.min.x,
      bounds.max.y - bounds.min.y,
      100
    ) * 1.5;

    // Grid
    if (showGrid) {
      const gridHelper = new THREE.GridHelper(size, 20, 0x444466, 0x333355);
      gridHelper.position.set(centerX, bounds.min.z - 1, centerY);
      gridHelper.name = 'grid';
      scene.add(gridHelper);
    }

    // Axes
    if (showAxes) {
      const axesGroup = new THREE.Group();
      axesGroup.name = 'axes';

      const axisLength = size / 3;

      // X axis (red)
      const xMaterial = new THREE.LineBasicMaterial({ color: 0xef4444 });
      const xGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(axisLength, 0, 0)
      ]);
      const xAxis = new THREE.Line(xGeometry, xMaterial);
      axesGroup.add(xAxis);

      // X arrow
      const xCone = new THREE.Mesh(
        new THREE.ConeGeometry(1.5, 4, 8),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      );
      xCone.position.set(axisLength, 0, 0);
      xCone.rotation.z = -Math.PI / 2;
      axesGroup.add(xCone);

      // Y axis (green) - in Three.js Y is up, but we'll use Z for G-Code Y
      const yMaterial = new THREE.LineBasicMaterial({ color: 0x22c55e });
      const yGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, axisLength)
      ]);
      const yAxis = new THREE.Line(yGeometry, yMaterial);
      axesGroup.add(yAxis);

      // Y arrow
      const yCone = new THREE.Mesh(
        new THREE.ConeGeometry(1.5, 4, 8),
        new THREE.MeshBasicMaterial({ color: 0x22c55e })
      );
      yCone.position.set(0, 0, axisLength);
      yCone.rotation.x = Math.PI / 2;
      axesGroup.add(yCone);

      // Z axis (blue) - in Three.js this will be Y (vertical)
      const zMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6 });
      const zGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, axisLength, 0)
      ]);
      const zAxis = new THREE.Line(zGeometry, zMaterial);
      axesGroup.add(zAxis);

      // Z arrow
      const zCone = new THREE.Mesh(
        new THREE.ConeGeometry(1.5, 4, 8),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 })
      );
      zCone.position.set(0, axisLength, 0);
      axesGroup.add(zCone);

      scene.add(axesGroup);
    }

    // Update camera to fit bounds
    const maxDim = Math.max(
      bounds.max.x - bounds.min.x,
      bounds.max.y - bounds.min.y,
      bounds.max.z - bounds.min.z,
      50
    );
    cameraDistanceRef.current = maxDim * 2.5;
    cameraPanRef.current = { x: centerX, y: 0, z: centerY };
    updateCamera();
  }, [bounds, showGrid, showAxes, updateCamera]);

  // Create tool paths
  useEffect(() => {
    if (!pathGroupRef.current) return;

    const group = pathGroupRef.current;

    // Clear existing paths
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Line) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
    }

    // Create new paths
    toolPaths.forEach((path, index) => {
      // Determine if this path should be visible based on animation
      let shouldDraw = true;
      let endPoint = path.to;

      if (isAnimating) {
        if (index > currentPathIndex) {
          shouldDraw = false;
        } else if (index === currentPathIndex) {
          // Interpolate for current path
          endPoint = {
            x: path.from.x + (path.to.x - path.from.x) * animationProgress,
            y: path.from.y + (path.to.y - path.from.y) * animationProgress,
            z: path.from.z + (path.to.z - path.from.z) * animationProgress
          };
        }
      }

      if (!shouldDraw) return;

      // Convert G-Code coordinates to Three.js coordinates
      // G-Code: X=right, Y=forward, Z=up
      // Three.js: X=right, Y=up, Z=forward
      const fromVec = new THREE.Vector3(path.from.x, path.from.z, path.from.y);
      const toVec = new THREE.Vector3(endPoint.x, endPoint.z, endPoint.y);

      const points = [fromVec, toVec];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      let material: THREE.LineBasicMaterial;
      if (path.type === 'rapid') {
        material = new THREE.LineBasicMaterial({
          color: 0xfbbf24,
          linewidth: 1,
          transparent: true,
          opacity: 0.6
        });
      } else {
        const isCurrentPath = index === currentPathIndex;
        material = new THREE.LineBasicMaterial({
          color: isCurrentPath ? 0x60a5fa : 0x3b82f6,
          linewidth: 2
        });
      }

      const line = new THREE.Line(geometry, material);
      group.add(line);

      // Add tube geometry for cutting paths for better visibility
      if (path.type !== 'rapid' && fromVec.distanceTo(toVec) > 0.1) {
        const direction = new THREE.Vector3().subVectors(toVec, fromVec);
        const length = direction.length();
        direction.normalize();

        const cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, length, 8);
        const cylinderMaterial = new THREE.MeshPhongMaterial({
          color: index === currentPathIndex ? 0x60a5fa : 0x3b82f6,
          transparent: true,
          opacity: 0.8
        });
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

        // Position and rotate cylinder
        const midpoint = new THREE.Vector3().addVectors(fromVec, toVec).multiplyScalar(0.5);
        cylinder.position.copy(midpoint);

        // Align cylinder with path direction
        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
        cylinder.setRotationFromQuaternion(quaternion);

        group.add(cylinder);
      }
    });

    // Update tool marker position
    if (toolMarkerRef.current) {
      if (isAnimating && currentPathIndex >= 0 && currentPathIndex < toolPaths.length) {
        const path = toolPaths[currentPathIndex];
        const x = path.from.x + (path.to.x - path.from.x) * animationProgress;
        const y = path.from.y + (path.to.y - path.from.y) * animationProgress;
        const z = path.from.z + (path.to.z - path.from.z) * animationProgress;

        toolMarkerRef.current.position.set(x, z + 5, y);
        toolMarkerRef.current.visible = true;
      } else {
        toolMarkerRef.current.visible = false;
      }
    }
  }, [toolPaths, currentPathIndex, isAnimating, animationProgress]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
    } else if (e.button === 2) {
      setIsRightDragging(true);
    }
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      cameraAngleRef.current.theta -= dx * 0.01;
      cameraAngleRef.current.phi = Math.max(
        0.1,
        Math.min(Math.PI - 0.1, cameraAngleRef.current.phi + dy * 0.01)
      );

      dragStartRef.current = { x: e.clientX, y: e.clientY };
      updateCamera();
    } else if (isRightDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      const { theta } = cameraAngleRef.current;
      cameraPanRef.current.x -= (dx * Math.cos(theta) + dy * Math.sin(theta)) * 0.2;
      cameraPanRef.current.z -= (-dx * Math.sin(theta) + dy * Math.cos(theta)) * 0.2;

      dragStartRef.current = { x: e.clientX, y: e.clientY };
      updateCamera();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRightDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    cameraDistanceRef.current = Math.max(
      10,
      Math.min(500, cameraDistanceRef.current * (e.deltaY > 0 ? 1.1 : 0.9))
    );
    updateCamera();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // View presets
  const setViewPreset = (preset: 'top' | 'front' | 'side' | 'isometric') => {
    switch (preset) {
      case 'top':
        cameraAngleRef.current = { theta: 0, phi: 0.01 };
        break;
      case 'front':
        cameraAngleRef.current = { theta: 0, phi: Math.PI / 2 };
        break;
      case 'side':
        cameraAngleRef.current = { theta: Math.PI / 2, phi: Math.PI / 2 };
        break;
      case 'isometric':
        cameraAngleRef.current = { theta: Math.PI / 4, phi: Math.PI / 4 };
        break;
    }
    updateCamera();
  };

  const resetView = () => {
    const centerX = (bounds.min.x + bounds.max.x) / 2;
    const centerY = (bounds.min.y + bounds.max.y) / 2;
    const maxDim = Math.max(
      bounds.max.x - bounds.min.x,
      bounds.max.y - bounds.min.y,
      bounds.max.z - bounds.min.z,
      50
    );

    cameraDistanceRef.current = maxDim * 2.5;
    cameraPanRef.current = { x: centerX, y: 0, z: centerY };
    cameraAngleRef.current = { theta: Math.PI / 4, phi: Math.PI / 4 };
    updateCamera();
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
      />

      {/* Controls overlay */}
      <div className="absolute top-2 right-2 flex flex-col gap-1">
        <button
          onClick={() => {
            cameraDistanceRef.current *= 0.8;
            updateCamera();
          }}
          className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center"
          title={t('simulator.zoomIn', 'Zoom in')}
        >
          +
        </button>
        <button
          onClick={() => {
            cameraDistanceRef.current *= 1.2;
            updateCamera();
          }}
          className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center"
          title={t('simulator.zoomOut', 'Zoom out')}
        >
          -
        </button>
        <button
          onClick={resetView}
          className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center text-xs"
          title={t('simulator.fitView', 'Fit to view')}
        >
          []
        </button>
      </div>

      {/* View presets */}
      <div className="absolute top-2 left-2 flex gap-1">
        <button
          onClick={() => setViewPreset('top')}
          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded"
          title={t('simulator.topView', 'Top view')}
        >
          {t('simulator.top', 'Top')}
        </button>
        <button
          onClick={() => setViewPreset('front')}
          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded"
          title={t('simulator.frontView', 'Front view')}
        >
          {t('simulator.front', 'Front')}
        </button>
        <button
          onClick={() => setViewPreset('side')}
          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded"
          title={t('simulator.sideView', 'Side view')}
        >
          {t('simulator.side', 'Side')}
        </button>
        <button
          onClick={() => setViewPreset('isometric')}
          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded"
          title={t('simulator.isometricView', 'Isometric view')}
        >
          {t('simulator.iso', '3D')}
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-gray-800/80 p-2 rounded text-xs text-gray-300">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-0.5 bg-yellow-400"></div>
          <span>{t('simulator.rapidMove', 'Rapid (G0)')}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-0.5 bg-blue-500"></div>
          <span>{t('simulator.linearMove', 'Linear (G1)')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 flex items-center justify-center">
            <span className="text-red-500">▼</span>
          </div>
          <span>{t('simulator.tool', 'Tool')}</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 bg-gray-800/80 p-2 rounded text-xs text-gray-400">
        <div>{t('simulator.dragToRotate', 'Drag to rotate')}</div>
        <div>{t('simulator.rightDragToPan', 'Right-drag to pan')}</div>
        <div>{t('simulator.scrollToZoom', 'Scroll to zoom')}</div>
      </div>
    </div>
  );
}
