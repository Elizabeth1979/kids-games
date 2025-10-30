import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Store contexts per canvas to ensure consistency
const canvasContextMap = new WeakMap();

// Mock canvas getContext for tests
HTMLCanvasElement.prototype.getContext = function(contextId: string) {
  if (contextId === '2d') {
    // Return the same context for the same canvas
    if (!canvasContextMap.has(this)) {
      const mockContext = {
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        lineCap: 'butt',
        lineJoin: 'miter',
        fillRect: vi.fn(),
        strokeRect: vi.fn(),
        clearRect: vi.fn(),
        beginPath: vi.fn(),
        closePath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
        fill: vi.fn(),
        arc: vi.fn(),
        getImageData: vi.fn((_x: number, _y: number, w: number, h: number) => ({
          data: new Uint8ClampedArray(w * h * 4),
          width: w,
          height: h,
          colorSpace: 'srgb' as PredefinedColorSpace,
        })),
        putImageData: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        scale: vi.fn(),
        rotate: vi.fn(),
        translate: vi.fn(),
        transform: vi.fn(),
        setTransform: vi.fn(),
        resetTransform: vi.fn(),
        createLinearGradient: vi.fn(),
        createRadialGradient: vi.fn(),
        createPattern: vi.fn(),
      };
      canvasContextMap.set(this, mockContext);
    }
    return canvasContextMap.get(this) as any;
  }
  return null;
};
