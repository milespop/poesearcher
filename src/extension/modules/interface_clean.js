// POE Interface Module - Clean Material Design
// Simple, polished interface following Material Design principles

class POESearcherInterface {
  constructor() {
    this.container = null
    this.isExpanded = false
    this.isExecuting = false
    this._pasteHandler = null
    this._searchHandler = null
  }

  // Initialize the interface
  async init() {
    console.log('🎯 PoE2 Searcher initializing...')

    this.loadStyles()
    this.createInterface()
    this.setupEventHandlers()

    console.log('✅ PoE2 Searcher ready!')
  }

  // Load clean custom styles
  loadStyles() {
    if (document.querySelector('#poe-clean-styles')) return

    const styles = document.createElement('style')
    styles.id = 'poe-clean-styles'
    styles.textContent = `
      .poe-container {
        position: fixed !important;
        top: 2.5rem !important;
        right: 1rem !important;
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

      .poe-search-btn {
        width: 100% !important;
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
        margin-top: 20px !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        letter-spacing: -0.25px !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
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
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
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
        padding: 8px 0 6px 0 !important;
        margin-bottom: 8px !important;
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
        padding: 8px 0 !important;
        border-bottom: 1px solid rgba(0,0,0,0.08) !important;
        margin-bottom: 10px !important;
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
    `
    document.head.appendChild(styles)
  }

  // Create the main interface container
  createInterface() {
    const existing = document.querySelector('#poe-searcher-interface')
    if (existing) existing.remove()

    this.container = document.createElement('div')
    this.container.id = 'poe-searcher-interface'
    this.container.className = 'poe-container'
    this.container.innerHTML = this.getCollapsedHTML()

    document.body.appendChild(this.container)

    const fab = this.container.querySelector('.poe-fab')
    if (fab) {
      fab.addEventListener('click', () => this.toggleInterface())
    }
  }

  // Get collapsed interface HTML (Clean FAB)
  getCollapsedHTML() {
    return `
      <button class="poe-fab" aria-label="PoE2 Searcher" title="PoE2 Searcher">
        🔍
      </button>
    `
  }

  // Get expanded interface HTML (Clean Card)
  getExpandedHTML() {
    return `
      <div class="poe-card">
        <div class="poe-header">
          <h3>PoE2 Searcher</h3>
          <div class="poe-header-buttons">
            <button class="poe-options-btn" aria-label="Options" title="Options">⚙</button>
            <button class="poe-close-btn" aria-label="Close">×</button>
          </div>
        </div>

        <div id="poe-settings" class="poe-settings" style="display: none;">
          <div class="poe-settings-content">
            <h4>Accessibility Options</h4>
            <label class="poe-checkbox-label">
              <input type="checkbox" id="poe-colorblind-mode" class="poe-checkbox">
              <span class="poe-checkbox-text">Colorblind-friendly mode</span>
            </label>
          </div>
        </div>

        <div class="poe-content">
          <textarea
            id="poe-item-input"
            class="poe-textarea"
            placeholder="Copy item from POE (Ctrl+C) and paste here..."
            rows="6"></textarea>

          <div id="poe-status" class="poe-status">
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

          <button id="poe-search-btn" class="poe-search-btn">
            Search
          </button>
        </div>
      </div>
    `
  }

  // Toggle interface
  toggleInterface() {
    this.isExpanded = !this.isExpanded

    if (this.isExpanded) {
      console.log('📖 Interface expanded')
      this.container.innerHTML = this.getExpandedHTML()
      this.setupEventHandlers()
    } else {
      console.log('📕 Interface collapsed')
      this.clearEventHandlers()
      this.container.innerHTML = this.getCollapsedHTML()
    }

    // Options button
    const optionsBtn = this.container.querySelector('.poe-options-btn')
    const settingsPanel = this.container.querySelector('#poe-settings')

    if (optionsBtn && settingsPanel) {
      this._optionsHandler = () => {
        const isVisible = settingsPanel.style.display !== 'none'
        settingsPanel.style.display = isVisible ? 'none' : 'block'
      }
      optionsBtn.addEventListener('click', this._optionsHandler)
    }

    // Colorblind mode checkbox
    const colorblindCheckbox = this.container.querySelector('#poe-colorblind-mode')

    if (colorblindCheckbox) {
      this._colorblindHandler = (e) => {
        const isEnabled = e.target.checked

        // Add/remove colorblind class to the entire card
        const card = this.container.querySelector('.poe-card')
        if (card) {
          if (isEnabled) {
            card.classList.add('poe-colorblind-mode')
          } else {
            card.classList.remove('poe-colorblind-mode')
          }
        }

        // Save preference
        try {
          chrome.storage.local.set({ colorblindMode: isEnabled })
        } catch (e) {}
      }

      colorblindCheckbox.addEventListener('change', this._colorblindHandler)

      // Load saved preference
      try {
        chrome.storage.local.get(['colorblindMode'], (result) => {
          if (result.colorblindMode) {
            colorblindCheckbox.checked = true
            const card = this.container.querySelector('.poe-card')
            if (card) {
              card.classList.add('poe-colorblind-mode')
            }
          }
        })
      } catch (e) {}
    }

    // Re-setup toggle handlers
    const fab = this.container.querySelector('.poe-fab')
    const closeBtn = this.container.querySelector('.poe-close-btn')

    if (fab) fab.addEventListener('click', () => this.toggleInterface())
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggleInterface())
  }

  // Clear event handlers
  clearEventHandlers() {
    if (this._pasteHandler) {
      const textarea = this.container.querySelector('#poe-item-input')
      if (textarea) textarea.removeEventListener('paste', this._pasteHandler)
    }
    if (this._searchHandler) {
      const searchBtn = this.container.querySelector('#poe-search-btn')
      if (searchBtn) searchBtn.removeEventListener('click', this._searchHandler)
    }
    if (this._scaleHandler) {
      const scaleSlider = this.container.querySelector('#poe-scale-slider')
      if (scaleSlider) scaleSlider.removeEventListener('input', this._scaleHandler)
    }
    if (this._optionsHandler) {
      const optionsBtn = this.container.querySelector('.poe-options-btn')
      if (optionsBtn) optionsBtn.removeEventListener('click', this._optionsHandler)
    }
    if (this._colorblindHandler) {
      const colorblindCheckbox = this.container.querySelector('#poe-colorblind-mode')
      if (colorblindCheckbox) colorblindCheckbox.removeEventListener('change', this._colorblindHandler)
    }
  }

  // Setup event handlers
  setupEventHandlers() {
    if (!this.isExpanded) return

    this.clearEventHandlers()

    const searchBtn = this.container.querySelector('#poe-search-btn')
    const textarea = this.container.querySelector('#poe-item-input')

    // Auto-parse on paste
    this._pasteHandler = (e) => {
      setTimeout(() => {
        const text = textarea.value.trim()
        if (!text) {
          this.updateStatus('Please paste item data', 'warning')
          this.hidePreview()
          return
        }

        const validation = window.validatePOEItemFormat(text)
        if (!validation.isValid) {
          this.updateStatus(`Invalid format: ${validation.error}`, 'error')
          this.hidePreview()
          return
        }

        const parsed = window.parseItem(text)
        this.updateStatus(`Parsed: ${parsed.itemClass} • ${parsed.rarity} • ${parsed.stats.length} stats`, 'success')
        this.showPreview(parsed)
      }, 100)
    }

    if (textarea) {
      textarea.addEventListener('paste', this._pasteHandler)

      // Load saved content
      try {
        chrome.storage.local.get(['lastItem'], (result) => {
          if (result.lastItem) {
            textarea.value = result.lastItem
            const validation = window.validatePOEItemFormat(result.lastItem)
            if (validation.isValid) {
              const parsed = window.parseItem(result.lastItem)
              this.updateStatus(`Loaded: ${parsed.itemClass} • ${parsed.rarity} • ${parsed.stats.length} stats`, 'success')
              this.showPreview(parsed)
            } else {
              textarea.value = ''
              chrome.storage.local.remove(['lastItem'])
            }
          }
        })
      } catch (e) {
        console.log('Could not load saved item data')
      }

      // Auto-save
      textarea.addEventListener('input', () => {
        if (textarea.value.trim()) {
          try {
            chrome.storage.local.set({ lastItem: textarea.value })
          } catch (e) {}
        } else {
          this.hidePreview()
        }
      })
    }

    // Scale slider
    const scaleSlider = this.container.querySelector('#poe-scale-slider')
    const scaleValue = this.container.querySelector('#poe-scale-value')

    if (scaleSlider && scaleValue) {
      this._scaleHandler = (e) => {
        const value = e.target.value
        scaleValue.textContent = `${value}%`

        // Save scale preference
        try {
          chrome.storage.local.set({ scaleValue: value })
        } catch (e) {}

        // Refresh preview if item is currently shown
        const textarea = this.container.querySelector('#poe-item-input')
        if (textarea && textarea.value.trim()) {
          const validation = window.validatePOEItemFormat(textarea.value.trim())
          if (validation.isValid) {
            const parsed = window.parseItem(textarea.value.trim())
            this.showPreview(parsed)
          }
        }
      }

      scaleSlider.addEventListener('input', this._scaleHandler)

      // Load saved scale value
      try {
        chrome.storage.local.get(['scaleValue'], (result) => {
          if (result.scaleValue) {
            scaleSlider.value = result.scaleValue
            scaleValue.textContent = `${result.scaleValue}%`
          }
        })
      } catch (e) {}
    }

    // Search button
    if (searchBtn) {
      searchBtn.addEventListener('click', async () => {
        const text = textarea.value.trim()
        if (!text) {
          this.updateStatus('Please paste item data first', 'warning')
          return
        }

        const validation = window.validatePOEItemFormat(text)
        if (!validation.isValid) {
          this.updateStatus(`Invalid format: ${validation.error}`, 'error')
          return
        }

        try {
          if (this.isExecuting) return

          this.isExecuting = true
          searchBtn.disabled = true

          const parsed = window.parseItem(text)

          // Get scale value
          const scaleSlider = this.container.querySelector('#poe-scale-slider')
          const scalePercent = scaleSlider ? parseInt(scaleSlider.value) : 100

          // Filter stats based on checked checkboxes
          const checkedImplicitStats = []
          const checkedExplicitStats = []

          this.container.querySelectorAll('.poe-stat-checkbox:checked').forEach(checkbox => {
            const stat = checkbox.dataset.stat
            const type = checkbox.dataset.type

            if (type === 'implicit') {
              checkedImplicitStats.push(stat)
            } else if (type === 'explicit') {
              checkedExplicitStats.push(stat)
            }
          })

          // Create filtered parsed object
          const filteredParsed = {
            ...parsed,
            stats: checkedExplicitStats,
            implicitStats: checkedImplicitStats
          }

          const totalChecked = checkedImplicitStats.length + checkedExplicitStats.length
          this.updateStatus(`Searching... (${totalChecked} stats, Scale: ${scalePercent}%)`, 'info')

          setTimeout(() => {
            if (this.isExpanded && this.isExecuting) {
              this.toggleInterface()
            }
          }, 500)

          const result = await window.performSearch(filteredParsed, scalePercent)

          if (result.success) {
            console.log('✅ Search completed successfully!')
          } else {
            console.log(`❌ Search failed: ${result.error}`)
          }

        } catch (error) {
          console.error('Search error:', error)
        } finally {
          this.isExecuting = false
          if (searchBtn) searchBtn.disabled = false

          setTimeout(() => {
            if (this.isExpanded) {
              this.toggleInterface()
            }
          }, 2000)
        }
      })
    }
  }

  // Update status
  updateStatus(message, type = 'info') {
    const statusBox = this.container.querySelector('#poe-status')
    if (statusBox) {
      statusBox.textContent = message
      statusBox.className = `poe-status ${type}`
    }
  }

  // Show preview with POE-style layout
  // Helper function to get scaled value display
  getScaledValueDisplay(stat, scalePercent, isMapped = true, isColorblindMode = false) {
    if (scalePercent === 100) return ''

    const mapping = window.findStatMapping(stat)
    if (!mapping || !mapping.value) return ''

    const originalValue = mapping.value
    const scaledValue = Math.floor(originalValue * (scalePercent / 100))

    // Determine color based on mapping status and colorblind mode
    let color = '#1976d2' // Default blue
    if (isMapped) {
      color = isColorblindMode ? '#0066cc' : '#059669' // Blue for colorblind, green for normal
    } else {
      color = isColorblindMode ? '#333333' : '#dc2626' // Dark gray for colorblind, red for normal
    }

    // For "Adds # to #" type stats, show the average value we calculated
    if (mapping.filterText && mapping.filterText.includes('Adds # to #')) {
      return ` <span style="color: ${color} !important; font-weight: 600 !important; font-size: 11px !important;">[${scaledValue} avg]</span>`
    }

    // For other stats, show the scaled value
    return ` <span style="color: ${color} !important; font-weight: 600 !important; font-size: 11px !important;">[${scaledValue}]</span>`
  }

  showPreview(parsed) {
    const preview = this.container.querySelector('#poe-preview')
    const previewContent = this.container.querySelector('#poe-preview-content')

    if (preview && previewContent) {
      // Get current scale value
      const scaleSlider = this.container.querySelector('#poe-scale-slider')
      const scalePercent = scaleSlider ? parseInt(scaleSlider.value) : 100

      // Check if colorblind mode is enabled
      const card = this.container.querySelector('.poe-card')
      const isColorblindMode = card && card.classList.contains('poe-colorblind-mode')
      const mappedStats = []
      const unmappedStats = []
      const mappedImplicits = []
      const unmappedImplicits = []

      // Process explicit stats
      parsed.stats.forEach(stat => {
        const mapping = window.findStatMapping(stat)
        if (mapping) {
          mappedStats.push(stat)
        } else {
          unmappedStats.push(stat)
        }
      })

      // Process implicit stats
      parsed.implicitStats.forEach(stat => {
        const mapping = window.findStatMapping(stat)
        if (mapping) {
          mappedImplicits.push(stat)
        } else {
          unmappedImplicits.push(stat)
        }
      })

      // Get mapped category name for filter
      const mappedCategory = window.ITEM_CLASS_TO_CATEGORY[parsed.itemClass] || parsed.itemClass

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
      `

      // Debug: Log description stats
      console.log('Description stats:', parsed.descriptionStats)
      console.log('Implicit stats:', parsed.implicitStats)

      // Add implicit stats first if they exist
      if (mappedImplicits.length > 0 || unmappedImplicits.length > 0) {
        content += `
          <div class="poe-implicit-section">
            <div class="poe-stats-list">
        `

        // Add mapped implicit stats (green - will be searched)
        mappedImplicits.forEach((stat, index) => {
          const scaledDisplay = this.getScaledValueDisplay(stat, scalePercent, true, isColorblindMode)
          content += `<div class="poe-stat-line mapped implicit">
            <label class="poe-stat-checkbox-label">
              <input type="checkbox" class="poe-stat-checkbox" data-stat="${stat}" data-type="implicit" data-index="${index}" checked>
              <span class="poe-stat-text">${stat}${scaledDisplay}</span>
            </label>
          </div>`
        })

        // Add unmapped implicit stats (red with unsupported label - will be skipped)
        unmappedImplicits.forEach((stat, index) => {
          content += `<div class="poe-stat-line unmapped implicit">
            <label class="poe-stat-checkbox-label">
              <input type="checkbox" class="poe-stat-checkbox" data-stat="${stat}" data-type="implicit" data-index="${index}" disabled>
              <span class="poe-stat-text">${stat} (unsupported)</span>
            </label>
          </div>`
        })

        content += `
            </div>
          </div>
        `
      }

      // Add description stats if they exist
      if (parsed.descriptionStats && parsed.descriptionStats.length > 0) {
        content += `
          <div class="poe-description-section">
            <div class="poe-stats-list">
        `

        parsed.descriptionStats.forEach(stat => {
          content += `<div class="poe-stat-line description">
            <span class="poe-stat-text">${stat}</span>
          </div>`
        })

        content += `
            </div>
          </div>
        `
      }

      // Add explicit modifier stats if they exist
      if (mappedStats.length > 0 || unmappedStats.length > 0) {
        content += `
          <div class="poe-modifiers-section">
            <div class="poe-stats-list">
        `

        // Add mapped stats (green - will be searched)
        mappedStats.forEach((stat, index) => {
          const scaledDisplay = this.getScaledValueDisplay(stat, scalePercent, true, isColorblindMode)
          content += `<div class="poe-stat-line mapped">
            <label class="poe-stat-checkbox-label">
              <input type="checkbox" class="poe-stat-checkbox" data-stat="${stat}" data-type="explicit" data-index="${index}" checked>
              <span class="poe-stat-text">${stat}${scaledDisplay}</span>
            </label>
          </div>`
        })

        // Add unmapped stats (red with unsupported label - will be skipped)
        unmappedStats.forEach((stat, index) => {
          content += `<div class="poe-stat-line unmapped">
            <label class="poe-stat-checkbox-label">
              <input type="checkbox" class="poe-stat-checkbox" data-stat="${stat}" data-type="explicit" data-index="${index}" disabled>
              <span class="poe-stat-text">${stat} (unsupported)</span>
            </label>
          </div>`
        })

        content += `
            </div>
          </div>
        `
      }

      previewContent.innerHTML = content
      preview.style.display = 'block'
    }
  }

  // Hide preview
  hidePreview() {
    const preview = this.container.querySelector('#poe-preview')
    if (preview) {
      preview.style.display = 'none'
    }
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { POESearcherInterface }
} else {
  window.POESearcherInterface = POESearcherInterface
}