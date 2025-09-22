// PoE2 Searcher - Main Content Script
// Initializes the POE trade search interface

// Type definitions for global objects that will be loaded from modules
interface POESearcherInterface {
  init(): Promise<void>;
}

interface ParsedItem {
  raw: string;
  name: string;
  baseType: string;
  rarity: string;
  itemClass: string;
  stats: string[];
  implicitStats: string[];
  descriptionStats: string[];
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

interface StatMapping {
  id: string;
  text: string;
  type: string;
}

interface SearchResult {
  success: boolean;
  error?: string;
}

// Helper function to wait for modules to load
async function waitForModules(maxAttempts: number = 50): Promise<boolean> {
  const requiredClasses: string[] = ['POESearcherInterface', 'parseItem', 'validatePOEItemFormat', 'findStatMapping', 'performSearch'];

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const missing = requiredClasses.filter(className => !(window as any)[className]);

    if (missing.length === 0) {
      // Use logger if available, otherwise fallback to console
      if ((window as any).POELogger) {
        (window as any).POELogger.success('All required modules loaded successfully');
      } else {
        console.log('✅ All required modules loaded successfully');
      }
      return true;
    }

    // Wait 100ms before checking again
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const missing = requiredClasses.filter(className => !(window as any)[className]);
  console.error('❌ Missing required classes after waiting:', missing);
  console.log('Available POE objects:', Object.keys(window).filter(key => key.includes('POE') || key.includes('parse') || key.includes('find') || key.includes('perform')));
  return false;
}

// Main execution
(async function(): Promise<void> {
  'use strict';

  console.log('🎯 PoE2 Searcher starting...');

  // Check if we're on a POE trade site
  if (!window.location.hostname.includes('pathofexile.com')) {
    console.log('❌ Not on POE website, exiting');
    return;
  }

  if (!window.location.pathname.includes('/trade')) {
    console.log('❌ Not on trade page, exiting');
    return;
  }

  // Wait for all required modules to load
  const modulesLoaded = await waitForModules();
  if (!modulesLoaded) {
    console.error('❌ Failed to load required modules');
    return;
  }

  console.log('✅ PoE2 Searcher loaded successfully...');

  // Initialize the interface
  if ((window as any).POESearcherInterface) {
    // Use logger if available, otherwise fallback to console
    if ((window as any).POELogger) {
      (window as any).POELogger.info('PoE2 Searcher initializing...');
    } else {
      console.log('🎯 PoE2 Searcher initializing...');
    }
    const searcher = new (window as any).POESearcherInterface();
    await searcher.init();
  }
})();