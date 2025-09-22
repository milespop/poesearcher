// Test setup file for Vitest
import { vi } from 'vitest';

// Mock chrome API if needed
global.chrome = {
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
    },
  },
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
    },
  },
} as any;

// Ensure window is available for modules that use it
if (typeof window !== 'undefined') {
  (window as any).ITEM_CLASS_TO_CATEGORY = {};
  (window as any).findStatMapping = null; // Will be set by the module
}