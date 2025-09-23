// POE Interface Module - Clean Material Design
// Simple, polished interface following Material Design principles

import type { ParsedItem, ValidationResult } from './itemParser';
import type { StatMapping as StatMappingConfig } from './statMappings';
import { createLogger } from './logger';
import { validateEntireSiteStructure, type ComprehensiveSiteValidation } from './siteValidator';

// Type definitions for interface
interface StorageResult {
  colorblindMode?: boolean;
  lastItem?: string;
  scaleValue?: string;
  delayProfile?: 'safe' | 'lightning';
  logLevel?: number;
  minimizeAfterSearch?: boolean;
  checkboxStates?: { [statKey: string]: boolean };
}

interface StatMapping {
  filterText: string;
  value?: number;
  group: string;
}

export class POESearcherInterface {
  private container: HTMLElement | null = null;
  private logger = createLogger('Interface');
  private isExpanded: boolean = false;
  private isExecuting: boolean = false;
  private version: string = '';
  private _pasteHandler: ((e: ClipboardEvent) => void) | null = null;
  private _searchHandler: ((e: MouseEvent) => void) | null = null;
  private _clearHandler: ((e: MouseEvent) => void) | null = null;
  private _scaleHandler: ((e: Event) => void) | null = null;
  private _optionsHandler: (() => void) | null = null;
  private _colorblindHandler: ((e: Event) => void) | null = null;
  private _delayProfileHandler: ((e: Event) => void) | null = null;
  private _logLevelHandler: ((e: Event) => void) | null = null;
  private _minimizeHandler: ((e: Event) => void) | null = null;
  private _alertReportHandler: ((e: Event) => void) | null = null;
  private _alertCopyHandler: ((e: Event) => void) | null = null;
  private _alertDismissHandler: ((e: Event) => void) | null = null;
  private currentValidationErrors: string[] = [];

  // Initialize the interface
  async init(): Promise<void> {
    this.logger.info('PoE2 Searcher initializing...');

    await this.loadVersion();
    this.loadStyles();
    this.createInterface();
    this.setupEventHandlers();

    // Run site structure validation
    await this.runValidation();

    this.logger.success('PoE2 Searcher ready!');
  }

  // Load version from manifest.json
  private async loadVersion(): Promise<void> {
    try {
      const manifestData = chrome.runtime.getManifest();
      this.version = manifestData.version || '';
      this.logger.info(`PoE2 Searcher version: ${this.version}`);
    } catch (error) {
      this.logger.error('Failed to load version from manifest:', error);
      this.version = '';
    }
  }

  // Get formatted title with version
  private getFormattedTitle(): string {
    return this.version ? `PoE2 Searcher v${this.version}-alpha` : 'PoE2 Searcher';
  }

  // Get formatted HTML title with smaller version text
  private getFormattedHTMLTitle(): string {
    return this.version ? `PoE2 Searcher <span style="background-color: #2196F3; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.75em; margin-left: 8px;">v${this.version}-alpha</span>` : 'PoE2 Searcher';
  }

  // Load clean custom styles
  private loadStyles(): void {
    if (document.querySelector('#poe-clean-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'poe-clean-styles';
    styles.textContent = `
      .poe-container {
        position: fixed !important;
        top: 2.5rem !important;
        right: 0.5rem !important;
        z-index: 2147483647 !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }

      .poe-fab {
        width: 64px !important;
        height: 64px !important;
        border-radius: 16px !important;
        background: #000000 !important;
        border: none !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        color: white !important;
        font-size: 20px !important;
        backdrop-filter: blur(20px) !important;
        position: relative !important;
      }

      .poe-fab .magnifying-glass {
        position: absolute !important;
        top: 4px !important;
        right: 4px !important;
        font-size: 12px !important;
        background: rgba(255,255,255,0.2) !important;
        border-radius: 50% !important;
        width: 18px !important;
        height: 18px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        backdrop-filter: blur(10px) !important;
      }

      .poe-fab:hover {
        background: #1a1a1a !important;
        box-shadow: 0 8px 30px rgba(0,0,0,0.25) !important;
        transform: translateY(-2px) scale(1.02) !important;
      }

      .poe-card {
        width: 400px !important;
        background: #ffffff !important;
        border-radius: 24px !important;
        box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12) !important;
        overflow: hidden !important;
        max-height: 85vh !important;
        border: 1px solid rgba(0,0,0,0.06) !important;
        backdrop-filter: blur(40px) !important;
        position: relative !important;
      }

      .poe-header {
        background: #000000 !important;
        color: white !important;
        padding: 24px 32px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        border-bottom: 1px solid rgba(255,255,255,0.08) !important;
      }

      .poe-header h3 {
        margin: 0 !important;
        font-size: 18px !important;
        font-weight: 500 !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        letter-spacing: -0.5px !important;
        color: #ffffff !important;
      }

      .poe-header-buttons {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }

      .poe-options-btn {
        background: transparent !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        color: #ffffff !important;
        width: 32px !important;
        height: 32px !important;
        border-radius: 6px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        font-size: 14px !important;
        transition: all 0.2s ease !important;
      }

      .poe-options-btn:hover {
        background: rgba(255,255,255,0.1) !important;
        border-color: rgba(255,255,255,0.4) !important;
      }

      .poe-close-btn {
        background: none !important;
        border: none !important;
        color: white !important;
        cursor: pointer !important;
        padding: 8px !important;
        border-radius: 50% !important;
        width: 36px !important;
        height: 36px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: background 0.2s ease !important;
        font-size: 20px !important;
      }

      .poe-close-btn:hover {
        background: rgba(255,255,255,0.1) !important;
      }

      .poe-content {
        padding: 24px !important;
        max-height: 70vh !important;
        overflow-y: auto !important;
        position: relative !important;
        z-index: 2 !important;
        background: #ffffff !important;
      }

      .poe-textarea {
        width: 100% !important;
        min-height: 100px !important;
        padding: 16px 20px !important;
        border: 1px solid rgba(0,0,0,0.12) !important;
        border-radius: 16px !important;
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace !important;
        font-size: 14px !important;
        line-height: 1.6 !important;
        resize: vertical !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        background: #ffffff !important;
        font-weight: 400 !important;
        letter-spacing: -0.1px !important;
        color: #1a1a1a !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
        position: relative !important;
      }

      .poe-textarea:focus {
        outline: none !important;
        border-color: #000000 !important;
        box-shadow: 0 0 0 3px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.08) !important;
      }

      .poe-textarea::placeholder {
        color: #6b7280 !important;
        font-style: normal !important;
        font-weight: 400 !important;
      }

      /* Input field states for visual feedback */
      .poe-textarea.success {
        border-color: #059669 !important;
        background: rgba(5, 150, 105, 0.04) !important;
        box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.08), 0 2px 12px rgba(0,0,0,0.08) !important;
      }

      .poe-colorblind-mode .poe-textarea.success {
        border-color: #0066cc !important;
        background: rgba(0, 102, 204, 0.04) !important;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.08), 0 2px 12px rgba(0,0,0,0.08) !important;
      }

      .poe-textarea.error {
        border-color: #dc2626 !important;
        background: rgba(220, 38, 38, 0.04) !important;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.08), 0 2px 12px rgba(0,0,0,0.08) !important;
      }

      .poe-colorblind-mode .poe-textarea.error {
        border-color: #666666 !important;
        background: rgba(102, 102, 102, 0.04) !important;
        box-shadow: 0 0 0 3px rgba(102, 102, 102, 0.08), 0 2px 12px rgba(0,0,0,0.08) !important;
      }

      .poe-button-row {
        display: flex !important;
        gap: 12px !important;
        margin-top: 20px !important;
      }

      .poe-search-btn {
        flex: 1 !important;
        padding: 16px 24px !important;
        background: #000000 !important;
        color: white !important;
        border: none !important;
        border-radius: 16px !important;
        font-size: 16px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 12px !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        letter-spacing: -0.25px !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
        min-height: 56px !important;
        position: relative !important;
        overflow: hidden !important;
      }

      .poe-clear-btn {
        flex: 0 0 auto !important;
        width: 120px !important;
        padding: 16px 20px !important;
        background: #6b7280 !important;
        color: white !important;
        border: none !important;
        border-radius: 16px !important;
        font-size: 16px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 8px !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        letter-spacing: -0.25px !important;
        box-shadow: 0 8px 32px rgba(107, 114, 128, 0.12) !important;
        min-height: 56px !important;
        position: relative !important;
        overflow: hidden !important;
      }

      .poe-search-btn::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: -100% !important;
        width: 100% !important;
        height: 100% !important;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent) !important;
        transition: left 0.6s !important;
      }

      .poe-search-btn:hover::before {
        left: 100% !important;
      }

      .poe-search-btn:hover:not(:disabled) {
        background: #1a1a1a !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2) !important;
      }

      .poe-search-btn:active:not(:disabled) {
        transform: translateY(0) !important;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3) !important;
      }

      .poe-search-btn:disabled {
        background: #e0e0e0 !important;
        color: #9e9e9e !important;
        cursor: not-allowed !important;
        transform: none !important;
        box-shadow: none !important;
      }

      .poe-search-btn:focus {
        outline: none !important;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2), 0 0 0 3px rgba(25, 118, 210, 0.3) !important;
      }

      .poe-clear-btn::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: -100% !important;
        width: 100% !important;
        height: 100% !important;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent) !important;
        transition: left 0.6s !important;
      }

      .poe-clear-btn:hover::before {
        left: 100% !important;
      }

      .poe-clear-btn:hover:not(:disabled) {
        background: #4b5563 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 16px 48px rgba(107, 114, 128, 0.2) !important;
      }

      .poe-clear-btn:active:not(:disabled) {
        transform: translateY(0) !important;
        box-shadow: 0 2px 8px rgba(107, 114, 128, 0.3) !important;
      }

      .poe-clear-btn:disabled {
        background: #e0e0e0 !important;
        color: #9e9e9e !important;
        cursor: not-allowed !important;
        transform: none !important;
        box-shadow: none !important;
      }

      .poe-clear-btn:focus {
        outline: none !important;
        box-shadow: 0 2px 8px rgba(107, 114, 128, 0.2), 0 0 0 3px rgba(107, 114, 128, 0.3) !important;
      }

      .poe-scale-container {
        margin: 16px 0 !important;
        padding: 16px !important;
        background: #fafafa !important;
        border-radius: 12px !important;
        border: 1px solid #e0e0e0 !important;
      }

      .poe-scale-label {
        display: block !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #333 !important;
        margin-bottom: 8px !important;
        letter-spacing: -0.1px !important;
      }

      #poe-scale-value {
        color: #1976d2 !important;
        font-weight: 600 !important;
      }

      .poe-scale-slider {
        width: 100% !important;
        height: 6px !important;
        border-radius: 3px !important;
        background: #e0e0e0 !important;
        outline: none !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        cursor: pointer !important;
      }

      .poe-scale-slider::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        appearance: none !important;
        width: 20px !important;
        height: 20px !important;
        border-radius: 50% !important;
        background: #1976d2 !important;
        cursor: pointer !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
        transition: all 0.2s ease !important;
      }

      .poe-scale-slider::-webkit-slider-thumb:hover {
        background: #1565c0 !important;
        transform: scale(1.1) !important;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3) !important;
      }

      .poe-scale-slider::-moz-range-thumb {
        width: 20px !important;
        height: 20px !important;
        border-radius: 50% !important;
        background: #1976d2 !important;
        cursor: pointer !important;
        border: none !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
        transition: all 0.2s ease !important;
      }

      .poe-scale-slider::-moz-range-thumb:hover {
        background: #1565c0 !important;
        transform: scale(1.1) !important;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3) !important;
      }

      .poe-settings {
        background: #f8f9fa !important;
        border-bottom: 1px solid #e0e0e0 !important;
        padding: 16px 24px !important;
        margin: 0 !important;
      }

      .poe-settings-content h4 {
        margin: 0 0 12px 0 !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        color: #333 !important;
        letter-spacing: -0.1px !important;
      }

      .poe-checkbox-label {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        cursor: pointer !important;
        font-size: 13px !important;
        color: #555 !important;
      }

      .poe-checkbox {
        width: 16px !important;
        height: 16px !important;
        border: 2px solid #ccc !important;
        border-radius: 3px !important;
        background: white !important;
        cursor: pointer !important;
        appearance: none !important;
        -webkit-appearance: none !important;
        transition: all 0.2s ease !important;
      }

      .poe-checkbox:checked {
        background: #1976d2 !important;
        border-color: #1976d2 !important;
      }

      .poe-checkbox:checked::after {
        content: '✓' !important;
        display: block !important;
        color: white !important;
        font-size: 12px !important;
        text-align: center !important;
        line-height: 12px !important;
      }

      .poe-setting-group {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 12px 0 !important;
        border-bottom: 1px solid #f0f0f0 !important;
      }

      .poe-setting-group:last-child {
        border-bottom: none !important;
      }

      .poe-setting-label {
        font-size: 14px !important;
        color: #333 !important;
        font-weight: 500 !important;
        margin: 0 !important;
        flex: 1 !important;
      }

      .poe-checkbox-container {
        position: relative !important;
        cursor: pointer !important;
      }

      .poe-checkbox {
        position: absolute !important;
        opacity: 0 !important;
        cursor: pointer !important;
      }

      .poe-checkbox-custom {
        display: block !important;
        width: 44px !important;
        height: 24px !important;
        background: #e5e7eb !important;
        border-radius: 12px !important;
        position: relative !important;
        transition: all 0.3s ease !important;
        cursor: pointer !important;
      }

      .poe-checkbox-custom::after {
        content: '' !important;
        position: absolute !important;
        top: 2px !important;
        left: 2px !important;
        width: 20px !important;
        height: 20px !important;
        background: white !important;
        border-radius: 50% !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
      }

      .poe-checkbox:checked + .poe-checkbox-custom {
        background: #3b82f6 !important;
      }

      .poe-checkbox:checked + .poe-checkbox-custom::after {
        transform: translateX(20px) !important;
      }

      .poe-delay-select {
        flex: 1 !important;
        padding: 6px 8px !important;
        border: 1px solid #d1d5db !important;
        border-radius: 6px !important;
        font-size: 13px !important;
        background: white !important;
        color: #333 !important;
        cursor: pointer !important;
      }

      .poe-delay-select:focus {
        outline: none !important;
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1) !important;
      }

      .poe-stat-checkbox-label {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        cursor: pointer !important;
        width: 100% !important;
      }

      .poe-stat-checkbox {
        width: 14px !important;
        height: 14px !important;
        border: 1px solid #ccc !important;
        border-radius: 2px !important;
        background: white !important;
        cursor: pointer !important;
        appearance: none !important;
        -webkit-appearance: none !important;
        transition: all 0.2s ease !important;
        flex-shrink: 0 !important;
      }

      .poe-stat-checkbox:checked {
        background: #059669 !important;
        border-color: #059669 !important;
      }

      .poe-stat-checkbox:checked::after {
        content: '✓' !important;
        display: block !important;
        color: white !important;
        font-size: 10px !important;
        text-align: center !important;
        line-height: 12px !important;
        font-weight: bold !important;
      }

      .poe-stat-checkbox:disabled {
        background: #f5f5f5 !important;
        border-color: #e0e0e0 !important;
        cursor: not-allowed !important;
      }

      .poe-colorblind-mode .poe-stat-checkbox:checked {
        background: #0066cc !important;
        border-color: #0066cc !important;
      }

      .poe-all-checkbox-container {
        padding: 2px 0 !important;
        margin-bottom: 3px !important;
      }

      .poe-all-checkbox-label {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        cursor: pointer !important;
        font-weight: 600 !important;
        font-size: 14px !important;
        color: #333 !important;
      }

      .poe-all-checkbox-text {
        color: #000000 !important;
        font-size: 12px !important;
        line-height: 1.4 !important;
      }

      .poe-status {
        margin: 12px 0 !important;
        padding: 12px 16px !important;
        border-radius: 16px !important;
        border: 1px solid rgba(0,0,0,0.08) !important;
        background: #ffffff !important;
        font-size: 14px !important;
        color: #1a1a1a !important;
        font-weight: 400 !important;
        letter-spacing: -0.1px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
        align-items: center !important;
        gap: 8px !important;
      }

      .poe-status:not([style*="display: none"]) {
        display: flex !important;
      }

      .poe-status::before {
        content: '' !important;
        width: 6px !important;
        height: 6px !important;
        border-radius: 50% !important;
        background: #6b7280 !important;
        flex-shrink: 0 !important;
      }

      .poe-status.success {
        background: #ffffff !important;
        border-color: rgba(34, 197, 94, 0.2) !important;
        color: #15803d !important;
      }

      .poe-status.success::before {
        background: #22c55e !important;
      }

      .poe-status.error {
        background: #ffffff !important;
        border-color: rgba(239, 68, 68, 0.2) !important;
        color: #dc2626 !important;
      }

      .poe-status.error::before {
        background: #ef4444 !important;
      }

      .poe-status.warning {
        background: #ffffff !important;
        border-color: rgba(245, 158, 11, 0.2) !important;
        color: #d97706 !important;
      }

      .poe-status.warning::before {
        background: #f59e0b !important;
      }

      .poe-preview {
        margin: 16px 0 !important;
        padding: 20px !important;
        background: #ffffff !important;
        border-radius: 20px !important;
        border: 1px solid rgba(0,0,0,0.08) !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
        position: relative !important;
        overflow: hidden !important;
      }

      .poe-preview::before {
        display: none !important;
      }

      .poe-preview h4 {
        margin: 0 0 16px 0 !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        color: #333 !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }

      .poe-item-info {
        margin-bottom: 16px !important;
        padding-bottom: 16px !important;
        border-bottom: 1px solid #e0e0e0 !important;
        line-height: 1.6 !important;
      }

      .poe-item-info strong {
        color: #1976d2 !important;
      }

      .poe-stats-grid {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 6px !important;
        max-height: 200px !important;
        overflow-y: auto !important;
      }

      .poe-stat-chip {
        display: inline-flex !important;
        align-items: center !important;
        padding: 6px 12px !important;
        border-radius: 16px !important;
        font-size: 11px !important;
        font-weight: 500 !important;
        line-height: 1.2 !important;
        max-width: 100% !important;
        word-break: break-word !important;
      }

      .poe-stat-chip.mapped {
        background: #e8f5e8 !important;
        color: #1b5e20 !important;
        border: 1px solid #c8e6c9 !important;
      }

      .poe-stat-chip.unmapped {
        background: #f5f5f5 !important;
        color: #616161 !important;
        border: 1px solid #e0e0e0 !important;
      }

      .poe-stat-chip::before {
        content: '' !important;
        width: 6px !important;
        height: 6px !important;
        border-radius: 50% !important;
        margin-right: 6px !important;
        flex-shrink: 0 !important;
      }

      .poe-stat-chip.mapped::before {
        background: #4caf50 !important;
      }

      .poe-stat-chip.unmapped::before {
        background: #9e9e9e !important;
      }

      /* Simple POE-style Stats */
      .poe-item-header {
        padding: 4px 0 2px 0 !important;
        margin-bottom: 4px !important;
        position: relative !important;
        z-index: 2 !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: flex-start !important;
      }

      .poe-item-left {
        flex: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 4px !important;
      }

      .poe-item-right {
        flex-shrink: 0 !important;
        margin-left: 16px !important;
      }

      .poe-item-name {
        font-size: 20px !important;
        font-weight: 600 !important;
        color: #1a1a1a !important;
        margin-bottom: 8px !important;
        letter-spacing: -0.5px !important;
        line-height: 1.3 !important;
      }

      .poe-item-base {
        font-size: 16px !important;
        color: #6b7280 !important;
        margin-bottom: 12px !important;
        font-weight: 400 !important;
        letter-spacing: -0.1px !important;
      }

      .poe-item-info {
        font-size: 10px !important;
        color: #000000 !important;
        text-transform: uppercase !important;
        letter-spacing: 1.5px !important;
        font-weight: 600 !important;
        padding: 8px 16px !important;
        border-radius: 12px !important;
        background: #f8f9fa !important;
        display: inline-block !important;
        border: 1px solid rgba(0,0,0,0.08) !important;
        margin-bottom: 12px !important;
      }

      .poe-implicit-section {
        padding: 8px 0 !important;
        border-bottom: 1px solid rgba(0,0,0,0.08) !important;
        margin-bottom: 10px !important;
      }

      .poe-description-section {
        padding: 2px 0 !important;
        border-bottom: 1px solid rgba(0,0,0,0.08) !important;
        margin-bottom: 6px !important;
      }

      .poe-modifiers-section {
        padding-top: 10px !important;
      }

      .poe-stats-list {
        display: flex !important;
        flex-direction: column !important;
        gap: 3px !important;
      }

      .poe-stat-line {
        padding: 2px 0 !important;
        line-height: 1.4 !important;
        font-size: 12px !important;
      }

      .poe-stat-line.description {
        color: #4b5563 !important;
        font-weight: 500 !important;
      }

      .poe-stat-line.mapped {
        color: #059669 !important;
        font-weight: 500 !important;
      }

      .poe-stat-text {
        position: relative !important;
      }

      .poe-stat-line.unmapped {
        color: #dc2626 !important;
        font-weight: 500 !important;
      }

      /* Colorblind-friendly mode styles */
      .poe-colorblind-mode .poe-stat-line.mapped {
        color: #0066cc !important;
        font-weight: 600 !important;
        border-left: 3px solid #0066cc !important;
        padding-left: 8px !important;
        background: rgba(0, 102, 204, 0.05) !important;
        border-radius: 3px !important;
      }

      .poe-colorblind-mode .poe-stat-line.unmapped {
        color: #333333 !important;
        font-weight: 500 !important;
        border-left: 3px solid #666666 !important;
        padding-left: 8px !important;
        background: rgba(102, 102, 102, 0.05) !important;
        border-radius: 3px !important;
      }

      .poe-stat-line.implicit {
        font-style: italic !important;
        opacity: 0.9 !important;
      }

      .poe-stat-text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        word-break: break-word !important;
        font-weight: inherit !important;
        letter-spacing: -0.1px !important;
      }

      /* Validation Alert Component */
      .poe-validation-alert {
        background: #ffffff !important;
        border: 2px solid #e53e3e !important;
        border-radius: 12px !important;
        margin: 16px 24px !important;
        padding: 16px !important;
        display: flex !important;
        align-items: flex-start !important;
        gap: 12px !important;
        animation: slideDown 0.3s ease-out !important;
      }

      .poe-validation-alert.hidden {
        display: none !important;
      }

      .poe-alert-icon {
        font-size: 20px !important;
        color: #e53e3e !important;
        margin-top: 2px !important;
        flex-shrink: 0 !important;
      }

      .poe-alert-content {
        flex: 1 !important;
        min-width: 0 !important;
      }

      .poe-alert-title {
        font-weight: 600 !important;
        color: #1a202c !important;
        font-size: 14px !important;
        margin: 0 0 4px 0 !important;
        line-height: 1.4 !important;
      }

      .poe-alert-message {
        color: #2d3748 !important;
        font-size: 13px !important;
        margin: 0 !important;
        line-height: 1.4 !important;
      }

      .poe-alert-actions {
        display: flex !important;
        flex-direction: column !important;
        gap: 8px !important;
        flex-shrink: 0 !important;
        margin-top: 8px !important;
      }

      .poe-alert-btn {
        padding: 6px 12px !important;
        border-radius: 6px !important;
        border: none !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        white-space: nowrap !important;
      }

      .poe-alert-btn.primary {
        background: #e53e3e !important;
        color: white !important;
      }

      .poe-alert-btn.primary:hover {
        background: #c53030 !important;
      }

      .poe-alert-btn.secondary {
        background: transparent !important;
        color: #2d3748 !important;
        border: 1px solid #cbd5e0 !important;
      }

      .poe-alert-btn.secondary:hover {
        background: #edf2f7 !important;
        border-color: #a0aec0 !important;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // Create the main interface container
  private createInterface(): void {
    const existing = document.querySelector('#poe-searcher-interface');
    if (existing) existing.remove();

    this.container = document.createElement('div');
    this.container.id = 'poe-searcher-interface';
    this.container.className = 'poe-container';
    this.container.innerHTML = this.getCollapsedHTML();

    document.body.appendChild(this.container);

    const fab = this.container.querySelector<HTMLButtonElement>('.poe-fab');
    if (fab) {
      fab.addEventListener('click', async () => await this.toggleInterface());
    }
  }

  // Get collapsed interface HTML (Clean FAB)
  private getCollapsedHTML(): string {
    const title = this.getFormattedTitle();
    return `
      <button class="poe-fab" aria-label="${title}" title="${title}">
        <img src="${chrome.runtime.getURL('icons/icon32.png')}" alt="Search" style="width: 20px; height: 20px;">
        <div class="magnifying-glass">🔍</div>
      </button>
    `;
  }

  // Get expanded interface HTML (Clean Card)
  private getExpandedHTML(): string {
    const title = this.getFormattedHTMLTitle();
    return `
      <div class="poe-card">
        <div class="poe-header">
          <h3>${title}</h3>
          <div class="poe-header-buttons">
            <button class="poe-options-btn" aria-label="Options" title="Options">⚙</button>
            <button class="poe-close-btn" aria-label="Close">×</button>
          </div>
        </div>

        <div id="poe-validation-alert" class="poe-validation-alert hidden">
          <div class="poe-alert-icon">⚠️</div>
          <div class="poe-alert-content">
            <div class="poe-alert-title">Site Structure Changed</div>
            <div class="poe-alert-message">Please report a GitHub issue</div>
          </div>
          <div class="poe-alert-actions">
            <button class="poe-alert-btn primary" id="poe-alert-report">Report Issue</button>
            <button class="poe-alert-btn secondary" id="poe-alert-copy">Copy Error</button>
            <button class="poe-alert-btn secondary" id="poe-alert-dismiss">Dismiss</button>
          </div>
        </div>

        <div id="poe-settings" class="poe-settings" style="display: none;">
          <div class="poe-settings-content">
            <div class="poe-setting-group">
              <label class="poe-setting-label">Colorblind Mode:</label>
              <label class="poe-checkbox-container">
                <input type="checkbox" id="poe-colorblind-mode" class="poe-checkbox">
                <span class="poe-checkbox-custom"></span>
              </label>
            </div>
            <div class="poe-setting-group">
              <label class="poe-setting-label">Log Level:</label>
              <select id="poe-log-level" class="poe-delay-select">
                <option value="0">Off</option>
                <option value="1">Errors Only</option>
                <option value="2">Warnings</option>
                <option value="3">Info</option>
                <option value="4">Debug</option>
                <option value="5">Verbose</option>
              </select>
            </div>
            <div class="poe-setting-group">
              <label class="poe-setting-label">Speed Profile:</label>
              <select id="poe-delay-profile" class="poe-delay-select">
                <option value="safe">Safe (Recommended)</option>
                <option value="lightning">Lightning</option>
              </select>
            </div>
          </div>
        </div>

        <div class="poe-content">
          <textarea
            id="poe-item-input"
            class="poe-textarea"
            placeholder="Copy item from POE2 (Hover item -> Ctrl+C) and paste (Ctrl+V) here..."
            rows="6"></textarea>

          <div id="poe-status" class="poe-status" style="display: none;">
            Ready to search! Paste item data above.
          </div>

          <div id="poe-preview" class="poe-preview" style="display: none;">
            <div id="poe-preview-content"></div>
          </div>

          <div class="poe-scale-container">
            <label class="poe-scale-label">
              Scale: <span id="poe-scale-value">100%</span>
            </label>
            <input
              type="range"
              id="poe-scale-slider"
              class="poe-scale-slider"
              min="1"
              max="100"
              value="100"
              step="1"
            />
          </div>

          <div class="poe-setting-group" style="margin-top: 16px; padding-top: 0; border-bottom: none;">
            <label class="poe-setting-label">Minimize after search:</label>
            <label class="poe-checkbox-container">
              <input type="checkbox" id="poe-minimize-checkbox" class="poe-checkbox" checked>
              <span class="poe-checkbox-custom"></span>
            </label>
          </div>

          <div class="poe-button-row">
            <button id="poe-clear-btn" class="poe-clear-btn">
              Clear
            </button>
            <button id="poe-search-btn" class="poe-search-btn">
              Search
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Toggle interface
  private async toggleInterface(): Promise<void> {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.logger.debug('Interface expanded');
      this.container!.innerHTML = this.getExpandedHTML();
      this.setupEventHandlers();

      // Run validation and setup alert if needed
      await this.runValidation();
    } else {
      this.logger.debug('Interface collapsed');
      this.clearEventHandlers();
      this.clearAlertHandlers();
      this.container!.innerHTML = this.getCollapsedHTML();
    }

    // Options button
    const optionsBtn = this.container!.querySelector<HTMLButtonElement>('.poe-options-btn');
    const settingsPanel = this.container!.querySelector<HTMLElement>('#poe-settings');

    if (optionsBtn && settingsPanel) {
      this._optionsHandler = () => {
        const isVisible = settingsPanel.style.display !== 'none';
        settingsPanel.style.display = isVisible ? 'none' : 'block';
      };
      optionsBtn.addEventListener('click', this._optionsHandler);
    }

    // Colorblind mode checkbox
    const colorblindCheckbox = this.container!.querySelector<HTMLInputElement>('#poe-colorblind-mode');

    if (colorblindCheckbox) {
      this._colorblindHandler = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const isEnabled = target.checked;

        // Add/remove colorblind class to the entire card
        const card = this.container!.querySelector<HTMLElement>('.poe-card');
        if (card) {
          if (isEnabled) {
            card.classList.add('poe-colorblind-mode');
          } else {
            card.classList.remove('poe-colorblind-mode');
          }
        }

        // Save preference
        try {
          chrome.storage.local.set({ colorblindMode: isEnabled });
        } catch (e) {
          // Ignore chrome API errors
        }
      };

      colorblindCheckbox.addEventListener('change', this._colorblindHandler);

      // Load saved preference
      try {
        chrome.storage.local.get(['colorblindMode'], (result: StorageResult) => {
          if (result.colorblindMode) {
            colorblindCheckbox.checked = true;
            const card = this.container!.querySelector<HTMLElement>('.poe-card');
            if (card) {
              card.classList.add('poe-colorblind-mode');
            }
          }
        });
      } catch (e) {
        // Ignore chrome API errors
      }
    }

    // Delay profile select
    const delayProfileSelect = this.container!.querySelector<HTMLSelectElement>('#poe-delay-profile');

    if (delayProfileSelect) {
      this._delayProfileHandler = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        const selectedProfile = target.value as 'safe' | 'lightning';

        // Update search engine module with new profile
        if ((window as any).updateDelayProfile) {
          (window as any).updateDelayProfile(selectedProfile);
        }

        // Save to storage
        try {
          chrome.storage.local.set({ delayProfile: selectedProfile });
        } catch (e) {
          // Ignore chrome API errors
        }

        this.logger.info(`Delay profile changed to: ${selectedProfile}`);
      };

      delayProfileSelect.addEventListener('change', this._delayProfileHandler);

      // Load saved setting
      try {
        chrome.storage.local.get(['delayProfile'], (result: StorageResult) => {
          const savedProfile = result.delayProfile || 'safe'; // Default to safe
          delayProfileSelect.value = savedProfile;

          // Apply the saved profile
          if ((window as any).updateDelayProfile) {
            (window as any).updateDelayProfile(savedProfile);
          }
        });
      } catch (e) {
        // Ignore chrome API errors
      }
    }

    // Log level dropdown
    const logLevelSelect = this.container!.querySelector<HTMLSelectElement>('#poe-log-level');

    if (logLevelSelect) {
      this._logLevelHandler = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        const logLevel = parseInt(target.value, 10);

        // Update logger setting
        if ((window as any).POELogger) {
          (window as any).POELogger.setLogLevel(logLevel);
        }

        const levelNames = ['Off', 'Errors Only', 'Warnings', 'Info', 'Debug', 'Verbose'];
        this.logger.info(`Log level set to: ${levelNames[logLevel] || 'Unknown'}`);
      };

      logLevelSelect.addEventListener('change', this._logLevelHandler);

      // Load saved setting
      try {
        chrome.storage.local.get(['logLevel'], (result: StorageResult) => {
          const logLevel = result.logLevel !== undefined ? result.logLevel : 0; // Default to OFF
          logLevelSelect.value = logLevel.toString();

          // Apply the saved setting to logger
          if ((window as any).POELogger) {
            (window as any).POELogger.setLogLevel(logLevel);
          }
        });
      } catch (e) {
        // Ignore chrome API errors
      }
    }

    // Re-setup toggle handlers
    const fab = this.container!.querySelector<HTMLButtonElement>('.poe-fab');
    const closeBtn = this.container!.querySelector<HTMLButtonElement>('.poe-close-btn');

    if (fab) fab.addEventListener('click', async () => await this.toggleInterface());
    if (closeBtn) closeBtn.addEventListener('click', async () => await this.toggleInterface());
  }

  // Clear event handlers
  private clearEventHandlers(): void {
    if (this._pasteHandler) {
      const textarea = this.container!.querySelector<HTMLTextAreaElement>('#poe-item-input');
      if (textarea) textarea.removeEventListener('paste', this._pasteHandler);
    }
    if (this._searchHandler) {
      const searchBtn = this.container!.querySelector<HTMLButtonElement>('#poe-search-btn');
      if (searchBtn) searchBtn.removeEventListener('click', this._searchHandler as EventListener);
    }
    if (this._clearHandler) {
      const clearBtn = this.container!.querySelector<HTMLButtonElement>('#poe-clear-btn');
      if (clearBtn) clearBtn.removeEventListener('click', this._clearHandler as EventListener);
    }
    if (this._scaleHandler) {
      const scaleSlider = this.container!.querySelector<HTMLInputElement>('#poe-scale-slider');
      if (scaleSlider) scaleSlider.removeEventListener('input', this._scaleHandler);
    }
    if (this._optionsHandler) {
      const optionsBtn = this.container!.querySelector<HTMLButtonElement>('.poe-options-btn');
      if (optionsBtn) optionsBtn.removeEventListener('click', this._optionsHandler);
    }
    if (this._colorblindHandler) {
      const colorblindCheckbox = this.container!.querySelector<HTMLInputElement>('#poe-colorblind-mode');
      if (colorblindCheckbox) colorblindCheckbox.removeEventListener('change', this._colorblindHandler);
    }

    if (this._delayProfileHandler) {
      const delayProfileSelect = this.container!.querySelector<HTMLSelectElement>('#poe-delay-profile');
      if (delayProfileSelect) delayProfileSelect.removeEventListener('change', this._delayProfileHandler);
    }

    if (this._logLevelHandler) {
      const logLevelSelect = this.container!.querySelector<HTMLSelectElement>('#poe-log-level');
      if (logLevelSelect) logLevelSelect.removeEventListener('change', this._logLevelHandler);
    }
    if (this._minimizeHandler) {
      const minimizeCheckbox = this.container!.querySelector<HTMLInputElement>('#poe-minimize-checkbox');
      if (minimizeCheckbox) minimizeCheckbox.removeEventListener('change', this._minimizeHandler);
    }

    // Clear alert handlers too
    this.clearAlertHandlers();
  }

  // Setup event handlers
  private setupEventHandlers(): void {
    if (!this.isExpanded) return;

    this.clearEventHandlers();

    const searchBtn = this.container!.querySelector<HTMLButtonElement>('#poe-search-btn');
    const textarea = this.container!.querySelector<HTMLTextAreaElement>('#poe-item-input');

    // Auto-parse on paste
    this._pasteHandler = (_e: ClipboardEvent) => {
      setTimeout(() => {
        const text = textarea!.value.trim();
        if (!text) {
          this.updateInputState('neutral');
          this.hidePreview();
          return;
        }

        const validation = (window as any).validatePOEItemFormat(text) as ValidationResult;
        if (!validation.isValid) {
          this.updateInputState('error', `Invalid format: ${validation.error}`);
          this.hidePreview();
          return;
        }

        const parsed = (window as any).parseItem(text) as ParsedItem;
        this.updateInputState('success');
        this.showPreview(parsed);
      }, 100);
    };

    if (textarea) {
      textarea.addEventListener('paste', this._pasteHandler);

      // Load saved content
      try {
        chrome.storage.local.get(['lastItem'], (result: StorageResult) => {
          if (result.lastItem) {
            textarea.value = result.lastItem;
            const validation = (window as any).validatePOEItemFormat(result.lastItem) as ValidationResult;
            if (validation.isValid) {
              const parsed = (window as any).parseItem(result.lastItem) as ParsedItem;
              this.updateInputState('success');
              this.showPreview(parsed);
            } else {
              textarea.value = '';
              chrome.storage.local.remove(['lastItem']);
            }
          }
        });
      } catch (e) {
        this.logger.warn('Could not load saved item data');
      }

      // Auto-save and validate on input
      textarea.addEventListener('input', () => {
        const text = textarea.value.trim();
        if (text) {
          try {
            chrome.storage.local.set({ lastItem: textarea.value });
          } catch (e) {
            // Ignore chrome API errors
          }

          // Validate the current input
          const validation = (window as any).validatePOEItemFormat(text) as ValidationResult;
          if (!validation.isValid) {
            this.updateInputState('error', `Invalid format: ${validation.error}`);
            this.hidePreview();
          } else {
            const parsed = (window as any).parseItem(text) as ParsedItem;
            this.updateInputState('success');
            this.showPreview(parsed);
          }
        } else {
          this.updateInputState('neutral');
          this.hidePreview();
        }
      });
    }

    // Scale slider
    const scaleSlider = this.container!.querySelector<HTMLInputElement>('#poe-scale-slider');
    const scaleValue = this.container!.querySelector<HTMLSpanElement>('#poe-scale-value');

    if (scaleSlider && scaleValue) {
      this._scaleHandler = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        scaleValue.textContent = `${value}%`;

        // Save scale preference
        try {
          chrome.storage.local.set({ scaleValue: value });
        } catch (e) {
          // Ignore chrome API errors
        }

        // Refresh preview if item is currently shown
        const textarea = this.container!.querySelector<HTMLTextAreaElement>('#poe-item-input');
        if (textarea && textarea.value.trim()) {
          const validation = (window as any).validatePOEItemFormat(textarea.value.trim()) as ValidationResult;
          if (validation.isValid) {
            const parsed = (window as any).parseItem(textarea.value.trim()) as ParsedItem;
            this.showPreview(parsed);
          }
        }
      };

      scaleSlider.addEventListener('input', this._scaleHandler);

      // Load saved scale value
      try {
        chrome.storage.local.get(['scaleValue'], (result: StorageResult) => {
          if (result.scaleValue) {
            scaleSlider.value = result.scaleValue;
            scaleValue.textContent = `${result.scaleValue}%`;

            // If there's already a valid item in the textarea, refresh the preview with the correct scale
            const textarea = this.container!.querySelector<HTMLTextAreaElement>('#poe-item-input');
            if (textarea && textarea.value.trim()) {
              const validation = (window as any).validatePOEItemFormat(textarea.value.trim()) as ValidationResult;
              if (validation.isValid) {
                const parsed = (window as any).parseItem(textarea.value.trim()) as ParsedItem;
                this.showPreview(parsed);
              }
            }
          }
        });
      } catch (e) {
        // Ignore chrome API errors
      }
    }

    // Search button
    if (searchBtn) {
      searchBtn.addEventListener('click', async () => {
        const text = textarea!.value.trim();
        if (!text) {
          this.updateInputState('neutral');
          return;
        }

        const validation = (window as any).validatePOEItemFormat(text) as ValidationResult;
        if (!validation.isValid) {
          this.updateInputState('error', `Invalid format: ${validation.error}`);
          return;
        }

        try {
          if (this.isExecuting) return;

          this.isExecuting = true;
          searchBtn.disabled = true;

          const parsed = (window as any).parseItem(text) as ParsedItem;

          // Get scale value
          const scaleSlider = this.container!.querySelector<HTMLInputElement>('#poe-scale-slider');
          const scalePercent = scaleSlider ? parseInt(scaleSlider.value) : 100;

          // Filter stats based on checked checkboxes
          const checkedImplicitStats: string[] = [];
          const checkedExplicitStats: string[] = [];

          // Save checkbox states before searching
          const checkboxStates: { [statKey: string]: boolean } = {};
          this.container!.querySelectorAll<HTMLInputElement>('.poe-stat-checkbox:not(#poe-all-checkbox)').forEach(checkbox => {
            const stat = checkbox.dataset.stat!;
            const type = checkbox.dataset.type!;
            const statKey = `${type}:${stat}`;
            checkboxStates[statKey] = checkbox.checked;

            if (checkbox.checked) {
              if (type === 'implicit') {
                checkedImplicitStats.push(stat);
              } else if (type === 'explicit') {
                checkedExplicitStats.push(stat);
              }
            }
          });

          // Store checkbox states
          try {
            chrome.storage.local.set({ checkboxStates });
          } catch (e) {
            // Ignore chrome API errors
          }

          // Create filtered parsed object
          const filteredParsed: ParsedItem = {
            ...parsed,
            stats: checkedExplicitStats,
            implicitStats: checkedImplicitStats
          };

          const totalChecked = checkedImplicitStats.length + checkedExplicitStats.length;
          this.updateStatus(`Searching... (${totalChecked} stats, Scale: ${scalePercent}%)`, 'info');

          // Check if minimize after search is enabled and minimize immediately
          const minimizeCheckbox = this.container!.querySelector<HTMLInputElement>('#poe-minimize-checkbox');
          const shouldMinimize = minimizeCheckbox ? minimizeCheckbox.checked : true; // Default to true for backwards compatibility

          if (shouldMinimize) {
            setTimeout(() => {
              if (this.isExpanded) {
                this.toggleInterface();
              }
            }, 500); // Minimize during search execution
          }

          const result = await (window as any).performSearch(filteredParsed, scalePercent);

          if (result.success) {
            this.logger.success('Search completed successfully!');
          } else {
            this.logger.error(`Search failed: ${result.error}`);
          }

        } catch (error) {
          this.logger.error('Search error:', error);
        } finally {
          this.isExecuting = false;
          if (searchBtn) searchBtn.disabled = false;
        }
      });
    }

    // Clear button
    const clearBtn = this.container!.querySelector<HTMLButtonElement>('#poe-clear-btn');
    if (clearBtn) {
      this._clearHandler = () => {
        // Clear the input field
        if (textarea) {
          textarea.value = '';
        }

        // Reset scale to 100%
        const scaleSlider = this.container!.querySelector<HTMLInputElement>('#poe-scale-slider');
        const scaleValue = this.container!.querySelector<HTMLSpanElement>('#poe-scale-value');
        if (scaleSlider && scaleValue) {
          scaleSlider.value = '100';
          scaleValue.textContent = '100%';

          // Save scale value
          try {
            chrome.storage.local.set({ scaleValue: 100 });
          } catch (e) {
            // Ignore chrome API errors
          }
        }

        // Clear saved item data
        try {
          chrome.storage.local.remove(['lastItem']);
        } catch (e) {
          // Ignore chrome API errors
        }

        // Reset input state and hide preview
        this.updateInputState('neutral');
        this.hidePreview();
      };

      clearBtn.addEventListener('click', this._clearHandler as EventListener);
    }

    // Minimize after search checkbox
    const minimizeCheckbox = this.container!.querySelector<HTMLInputElement>('#poe-minimize-checkbox');
    if (minimizeCheckbox) {
      this._minimizeHandler = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const isEnabled = target.checked;

        // Save preference
        try {
          chrome.storage.local.set({ minimizeAfterSearch: isEnabled });
        } catch (e) {
          // Ignore chrome API errors
        }
      };

      minimizeCheckbox.addEventListener('change', this._minimizeHandler);

      // Load saved preference
      try {
        chrome.storage.local.get(['minimizeAfterSearch'], (result: StorageResult) => {
          if (result.minimizeAfterSearch !== undefined) {
            minimizeCheckbox.checked = result.minimizeAfterSearch;
          }
        });
      } catch (e) {
        // Ignore chrome API errors
      }
    }
  }

  // Update status
  private updateStatus(message: string, type: string = 'info'): void {
    const statusBox = this.container!.querySelector<HTMLElement>('#poe-status');
    if (statusBox) {
      statusBox.textContent = message;
      statusBox.className = `poe-status ${type}`;
    }
  }

  // Update input field visual feedback
  private updateInputState(state: 'neutral' | 'success' | 'error', errorMessage?: string): void {
    const textarea = this.container!.querySelector<HTMLTextAreaElement>('#poe-item-input');
    const statusBox = this.container!.querySelector<HTMLElement>('#poe-status');

    if (textarea) {
      // Remove existing state classes
      textarea.classList.remove('success', 'error');

      // Add new state class if not neutral
      if (state !== 'neutral') {
        textarea.classList.add(state);
      }
    }

    if (statusBox) {
      if (state === 'error' && errorMessage) {
        // Show status box with error message
        statusBox.textContent = errorMessage;
        statusBox.className = 'poe-status error';
        statusBox.style.display = 'block';
      } else {
        // Hide status box for success or neutral states
        statusBox.style.display = 'none';
      }
    }
  }

  // Helper function to get scaled value display
  private getScaledValueDisplay(stat: string, scalePercent: number, isMapped: boolean = true, isColorblindMode: boolean = false, itemClass: string | null = null): string {
    if (scalePercent === 100) return '';

    const mapping = (window as any).findStatMapping(stat, itemClass) as StatMapping | null;
    if (!mapping || !mapping.value) return '';

    const originalValue = mapping.value;
    const scaledValue = Math.floor(originalValue * (scalePercent / 100));

    // Determine color based on mapping status and colorblind mode
    let color = '#1976d2'; // Default blue
    if (isMapped) {
      color = isColorblindMode ? '#0066cc' : '#059669'; // Blue for colorblind, green for normal
    } else {
      color = isColorblindMode ? '#333333' : '#dc2626'; // Dark gray for colorblind, red for normal
    }

    // For "Adds # to #" type stats, show the average value we calculated
    if (mapping.filterText && mapping.filterText.includes('Adds # to #')) {
      return ` <span style="color: ${color} !important; font-weight: 600 !important; font-size: 11px !important;">[${scaledValue} avg]</span>`;
    }

    // For other stats, show the scaled value
    return ` <span style="color: ${color} !important; font-weight: 600 !important; font-size: 11px !important;">[${scaledValue}]</span>`;
  }

  private showPreview(parsed: ParsedItem): void {
    const preview = this.container!.querySelector<HTMLElement>('#poe-preview');
    const previewContent = this.container!.querySelector<HTMLElement>('#poe-preview-content');

    if (preview && previewContent) {
      // Get current scale value
      const scaleSlider = this.container!.querySelector<HTMLInputElement>('#poe-scale-slider');
      const scalePercent = scaleSlider ? parseInt(scaleSlider.value) : 100;

      // Check if colorblind mode is enabled
      const card = this.container!.querySelector<HTMLElement>('.poe-card');
      const isColorblindMode = Boolean(card && card.classList.contains('poe-colorblind-mode'));

      // Load saved checkbox states
      this.loadAndApplyCheckboxStates(parsed, scalePercent, isColorblindMode);
    }
  }

  private loadAndApplyCheckboxStates(parsed: ParsedItem, scalePercent: number, isColorblindMode: boolean): void {
    try {
      chrome.storage.local.get(['checkboxStates'], (result: StorageResult) => {
        const savedStates = result.checkboxStates || {};
        this.generatePreviewContent(parsed, scalePercent, isColorblindMode, savedStates);
      });
    } catch (e) {
      // Fallback to default states if storage fails
      this.generatePreviewContent(parsed, scalePercent, isColorblindMode, {});
    }
  }

  private getCheckboxState(statType: string, stat: string, checkboxStates: { [statKey: string]: boolean }): boolean {
    const statKey = `${statType}:${stat}`;
    // Default to checked if no saved state exists (for first-time use)
    return checkboxStates[statKey] !== undefined ? checkboxStates[statKey] : true;
  }

  private generatePreviewContent(parsed: ParsedItem, scalePercent: number, isColorblindMode: boolean, checkboxStates: { [statKey: string]: boolean }): void {
    const preview = this.container!.querySelector<HTMLElement>('#poe-preview');
    const previewContent = this.container!.querySelector<HTMLElement>('#poe-preview-content');

    if (!preview || !previewContent) return;

    const mappedStats: string[] = [];
    const unmappedStats: string[] = [];
    const mappedImplicits: string[] = [];
    const unmappedImplicits: string[] = [];

    // Process explicit stats
    parsed.stats.forEach(stat => {
      const mapping = (window as any).findStatMapping(stat, parsed.itemClass) as StatMappingConfig | null;
      if (mapping && !mapping.unsupported) {
        mappedStats.push(stat);
      } else {
        unmappedStats.push(stat);
      }
    });

    // Process implicit stats
    parsed.implicitStats.forEach(stat => {
      const mapping = (window as any).findStatMapping(stat, parsed.itemClass) as StatMappingConfig | null;
      if (mapping && !mapping.unsupported) {
        mappedImplicits.push(stat);
      } else {
        unmappedImplicits.push(stat);
      }
    });

    // Get mapped category name for filter
    const mappedCategory = (window as any).ITEM_CLASS_TO_CATEGORY[parsed.itemClass] || parsed.itemClass;

    // POE-style layout with description and modifier stats
    let content = `
      <div class="poe-item-header">
        <div class="poe-item-left">
          <div class="poe-item-name">${parsed.name}</div>
          <div class="poe-item-base">${parsed.baseType}</div>
        </div>
        <div class="poe-item-right">
          <div class="poe-item-info">${mappedCategory}</div>
        </div>
      </div>
    `;

    // Debug: Log description stats
    this.logger.debug('Description stats:', parsed.descriptionStats);
    this.logger.debug('Implicit stats:', parsed.implicitStats);

    // Store stats info for later use
    const totalMappedStats = mappedImplicits.length + mappedStats.length;
    const hasAnyStats = totalMappedStats > 0 || unmappedImplicits.length > 0 || unmappedStats.length > 0;

    // Add implicit stats first if they exist
    if (mappedImplicits.length > 0 || unmappedImplicits.length > 0) {
      content += `
        <div class="poe-implicit-section">
          <div class="poe-stats-list">
      `;

      // Add mapped implicit stats (green - will be searched)
      mappedImplicits.forEach((stat, index) => {
        const scaledDisplay = this.getScaledValueDisplay(stat, scalePercent, true, isColorblindMode, parsed.itemClass);
        const isChecked = this.getCheckboxState('implicit', stat, checkboxStates);
        content += `<div class="poe-stat-line mapped implicit">
          <label class="poe-stat-checkbox-label">
            <input type="checkbox" class="poe-stat-checkbox" data-stat="${stat}" data-type="implicit" data-index="${index}" ${isChecked ? 'checked' : ''}>
            <span class="poe-stat-text">${stat}${scaledDisplay}</span>
          </label>
        </div>`;
      });

      // Add unmapped implicit stats (red with unsupported label - will be skipped)
      unmappedImplicits.forEach((stat, index) => {
        const mapping = (window as any).findStatMapping(stat) as StatMappingConfig | null;
        const unsupportedText = mapping?.unsupported ? '(intentionally unsupported)' : '(unsupported)';
        content += `<div class="poe-stat-line unmapped implicit">
          <label class="poe-stat-checkbox-label">
            <input type="checkbox" class="poe-stat-checkbox" data-stat="${stat}" data-type="implicit" data-index="${index}" disabled>
            <span class="poe-stat-text">${stat} ${unsupportedText}</span>
          </label>
        </div>`;
      });

      content += `
          </div>
        </div>
      `;
    }

    // Add description stats if they exist
    if (parsed.descriptionStats && parsed.descriptionStats.length > 0) {
      content += `
        <div class="poe-description-section">
          <div class="poe-stats-list">
      `;

      parsed.descriptionStats.forEach(stat => {
        content += `<div class="poe-stat-line description">
          <span class="poe-stat-text">${stat}</span>
        </div>`;
      });

      content += `
          </div>
        </div>
      `;
    }

    // Add "All" checkbox if there are any stats
    if (hasAnyStats) {
      content += `
        <div class="poe-all-checkbox-container">
          <label class="poe-all-checkbox-label">
            <input type="checkbox" id="poe-all-checkbox" class="poe-stat-checkbox" ${totalMappedStats > 0 ? 'checked' : ''}>
            <span class="poe-all-checkbox-text">(All)</span>
          </label>
        </div>
      `;
    }

    // Add explicit modifier stats if they exist
    if (mappedStats.length > 0 || unmappedStats.length > 0) {
      content += `
        <div class="poe-modifiers-section">
          <div class="poe-stats-list">
      `;

      // Add mapped stats (green - will be searched)
      mappedStats.forEach((stat, index) => {
        const scaledDisplay = this.getScaledValueDisplay(stat, scalePercent, true, isColorblindMode, parsed.itemClass);
        const isChecked = this.getCheckboxState('explicit', stat, checkboxStates);
        content += `<div class="poe-stat-line mapped">
          <label class="poe-stat-checkbox-label">
            <input type="checkbox" class="poe-stat-checkbox" data-stat="${stat}" data-type="explicit" data-index="${index}" ${isChecked ? 'checked' : ''}>
            <span class="poe-stat-text">${stat}${scaledDisplay}</span>
          </label>
        </div>`;
      });

      // Add unmapped stats (red with unsupported label - will be skipped)
      unmappedStats.forEach((stat, index) => {
        const mapping = (window as any).findStatMapping(stat) as StatMappingConfig | null;
        const unsupportedText = mapping?.unsupported ? '(intentionally unsupported)' : '(unsupported)';
        content += `<div class="poe-stat-line unmapped">
          <label class="poe-stat-checkbox-label">
            <input type="checkbox" class="poe-stat-checkbox" data-stat="${stat}" data-type="explicit" data-index="${index}" disabled>
            <span class="poe-stat-text">${stat} ${unsupportedText}</span>
          </label>
        </div>`;
      });

      content += `
          </div>
        </div>
      `;
    }

    previewContent.innerHTML = content;
    preview.style.display = 'block';

    // Add event handlers for "All" checkbox with proper indeterminate state
    const allCheckbox = this.container!.querySelector<HTMLInputElement>('#poe-all-checkbox');
    if (allCheckbox) {
      // Function to update the "All" checkbox state based on individual checkboxes
      const updateAllCheckboxState = () => {
        const statCheckboxes = this.container!.querySelectorAll<HTMLInputElement>('.poe-stat-checkbox:not(#poe-all-checkbox):not(:disabled)');
        const checkedCount = this.container!.querySelectorAll<HTMLInputElement>('.poe-stat-checkbox:not(#poe-all-checkbox):not(:disabled):checked').length;
        const totalCount = statCheckboxes.length;

        if (checkedCount === 0) {
          // None checked
          allCheckbox.checked = false;
          allCheckbox.indeterminate = false;
        } else if (checkedCount === totalCount) {
          // All checked
          allCheckbox.checked = true;
          allCheckbox.indeterminate = false;
        } else {
          // Some checked (indeterminate state)
          allCheckbox.checked = false;
          allCheckbox.indeterminate = true;
        }
      };

      // Handle "All" checkbox clicks
      allCheckbox.addEventListener('change', (_e) => {
        const statCheckboxes = this.container!.querySelectorAll<HTMLInputElement>('.poe-stat-checkbox:not(#poe-all-checkbox):not(:disabled)');

        if (allCheckbox.checked) {
          // If now checked, check all
          statCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
          });
          allCheckbox.indeterminate = false;
        } else {
          // If now unchecked, uncheck all
          statCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
          });
          allCheckbox.indeterminate = false;
        }
      });

      // Add event listeners to individual checkboxes to update "All" state
      const statCheckboxes = this.container!.querySelectorAll<HTMLInputElement>('.poe-stat-checkbox:not(#poe-all-checkbox):not(:disabled)');
      statCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateAllCheckboxState);
      });

      // Set initial state
      updateAllCheckboxState();
    }
  }

  // Hide preview
  private hidePreview(): void {
    const preview = this.container!.querySelector<HTMLElement>('#poe-preview');
    if (preview) {
      preview.style.display = 'none';
    }
  }

  // Run site structure validation
  private async runValidation(): Promise<void> {
    try {
      this.logger.debug('Running site structure validation...');
      const validation = await validateEntireSiteStructure();

      if (!validation.overallValid) {
        this.logger.warn('Site structure validation failed:', validation.criticalErrors);
        this.showValidationAlert(validation);
      } else {
        this.logger.debug('Site structure validation passed');
        this.hideValidationAlert();
      }
    } catch (error) {
      this.logger.error('Validation error:', error);
      this.showValidationAlert({
        overallValid: false,
        criticalErrors: ['Validation system error'],
        searchInterface: { valid: false, errors: ['Unknown error'] },
        typeFilters: { valid: false, errors: ['Unknown error'] },
        statFilters: { valid: false, errors: [] },
        advancedControls: { valid: false, errors: [] },
        results: { valid: false, errors: [] }
      });
    }
  }

  // Show validation alert
  private showValidationAlert(validation: ComprehensiveSiteValidation): void {
    if (!this.isExpanded) return; // Only show if interface is expanded

    // Store validation errors for copy functionality
    this.currentValidationErrors = validation.criticalErrors;

    const alertElement = this.container?.querySelector('#poe-validation-alert');
    if (alertElement) {
      // Update alert message with user-friendly translation
      const friendlyMessage = this.translateValidationErrors(validation.criticalErrors);
      const messageElement = alertElement.querySelector('.poe-alert-message');
      if (messageElement) {
        messageElement.textContent = friendlyMessage;
      }

      alertElement.classList.remove('hidden');
      this.setupAlertHandlers();

      // Disable search functionality
      const searchBtn = this.container?.querySelector('#poe-search-btn') as HTMLButtonElement;
      if (searchBtn) {
        searchBtn.disabled = true;
        searchBtn.textContent = 'Search Disabled';
        searchBtn.style.opacity = '0.5';
      }
    }
  }

  // Hide validation alert
  private hideValidationAlert(): void {
    const alertElement = this.container?.querySelector('#poe-validation-alert');
    if (alertElement) {
      alertElement.classList.add('hidden');

      // Re-enable search functionality
      const searchBtn = this.container?.querySelector('#poe-search-btn') as HTMLButtonElement;
      if (searchBtn) {
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
        searchBtn.style.opacity = '1';
      }
    }
  }

  // Setup alert button handlers
  private setupAlertHandlers(): void {
    // Clear existing handlers
    this.clearAlertHandlers();

    // Report Issue button
    const reportBtn = this.container?.querySelector('#poe-alert-report') as HTMLButtonElement;
    if (reportBtn) {
      this._alertReportHandler = (e: Event) => {
        e.preventDefault();
        this.openGitHubIssues();
      };
      reportBtn.addEventListener('click', this._alertReportHandler);
    }

    // Copy Error button
    const copyBtn = this.container?.querySelector('#poe-alert-copy') as HTMLButtonElement;
    if (copyBtn) {
      this._alertCopyHandler = async (e: Event) => {
        e.preventDefault();
        await this.copyErrorDetails(copyBtn);
      };
      copyBtn.addEventListener('click', this._alertCopyHandler);
    }

    // Dismiss button
    const dismissBtn = this.container?.querySelector('#poe-alert-dismiss') as HTMLButtonElement;
    if (dismissBtn) {
      this._alertDismissHandler = (e: Event) => {
        e.preventDefault();
        this.hideValidationAlert();
      };
      dismissBtn.addEventListener('click', this._alertDismissHandler);
    }
  }

  // Clear alert handlers
  private clearAlertHandlers(): void {
    if (this._alertReportHandler) {
      const reportBtn = this.container?.querySelector('#poe-alert-report');
      if (reportBtn) reportBtn.removeEventListener('click', this._alertReportHandler);
      this._alertReportHandler = null;
    }

    if (this._alertCopyHandler) {
      const copyBtn = this.container?.querySelector('#poe-alert-copy');
      if (copyBtn) copyBtn.removeEventListener('click', this._alertCopyHandler);
      this._alertCopyHandler = null;
    }

    if (this._alertDismissHandler) {
      const dismissBtn = this.container?.querySelector('#poe-alert-dismiss');
      if (dismissBtn) dismissBtn.removeEventListener('click', this._alertDismissHandler);
      this._alertDismissHandler = null;
    }
  }

  // Translate technical validation errors to user-friendly messages
  private translateValidationErrors(errors: string[]): string {
    if (errors.length === 0) return 'Please report a GitHub issue';

    // Look for specific error patterns and provide user-friendly translations
    for (const error of errors) {
      if (error.includes('Item Category filter not found')) {
        return 'Item category selection has changed. Please report a GitHub issue.';
      }
      if (error.includes('Search field placeholder')) {
        return 'Main search interface has been updated. Please report a GitHub issue.';
      }
      if (error.includes('Missing expected categories')) {
        return 'Item categories have been modified. Please report a GitHub issue.';
      }
      if (error.includes('Clear button not found')) {
        return 'Search controls have changed. Please report a GitHub issue.';
      }
      if (error.includes('Type Filters section not found')) {
        return 'Filter interface has been restructured. Please report a GitHub issue.';
      }
    }

    // Generic fallback message
    return 'POE trade site structure has changed. Please report a GitHub issue.';
  }

  // Copy error details to clipboard
  private async copyErrorDetails(button: HTMLButtonElement): Promise<void> {
    try {
      // Create detailed error report
      const timestamp = new Date().toISOString();
      const userAgent = navigator.userAgent;
      const currentUrl = window.location.href;

      const errorReport = `## POE Searcher Site Structure Validation Error

**Timestamp:** ${timestamp}
**URL:** ${currentUrl}
**User Agent:** ${userAgent}

**Technical Error Details:**
${this.currentValidationErrors.map(error => `- ${error}`).join('\n')}

**Extension Version:** 0.3.5

Please include this information when reporting the issue at:
https://github.com/milespop/poesearcher/issues`;

      await navigator.clipboard.writeText(errorReport);

      // Update button to show success
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.style.backgroundColor = '#48bb78';

      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 2000);

      this.logger.info('Error details copied to clipboard');
    } catch (error) {
      this.logger.error('Failed to copy error details:', error);

      // Fallback: show error details in alert
      const errorText = this.currentValidationErrors.join('\n');
      alert(`Failed to copy to clipboard. Error details:\n\n${errorText}`);
    }
  }

  // Open GitHub issues page
  private openGitHubIssues(): void {
    const issueUrl = 'https://github.com/milespop/poesearcher/issues';
    try {
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({ url: issueUrl });
      } else {
        window.open(issueUrl, '_blank');
      }
      this.logger.info('Opened GitHub issues page');
    } catch (error) {
      this.logger.error('Failed to open GitHub issues:', error);
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(issueUrl).then(() => {
        alert('GitHub issues URL copied to clipboard: ' + issueUrl);
      }).catch(() => {
        alert('Please visit: ' + issueUrl);
      });
    }
  }
}

// Browser environment - attach to window
(window as any).POESearcherInterface = POESearcherInterface;