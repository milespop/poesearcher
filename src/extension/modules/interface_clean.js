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
    console.log('🎯 POE Searcher initializing...')

    this.loadStyles()
    this.createInterface()
    this.setupEventHandlers()

    console.log('✅ POE Searcher ready!')
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
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }

      .poe-fab {
        width: 56px !important;
        height: 56px !important;
        border-radius: 50% !important;
        background: #1976d2 !important;
        border: none !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.2s ease !important;
        color: white !important;
        font-size: 24px !important;
      }

      .poe-fab:hover {
        background: #1565c0 !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
        transform: translateY(-1px) !important;
      }

      .poe-card {
        width: 380px !important;
        background: white !important;
        border-radius: 16px !important;
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        overflow: hidden !important;
        max-height: 85vh !important;
        border: 1px solid rgba(0,0,0,0.05) !important;
        backdrop-filter: blur(10px) !important;
        position: relative !important;
      }

      .poe-card::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 1px !important;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent) !important;
        z-index: 1 !important;
      }

      .poe-header {
        background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%) !important;
        color: white !important;
        padding: 16px 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
      }

      .poe-header h3 {
        margin: 0 !important;
        font-size: 20px !important;
        font-weight: 600 !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        text-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
        letter-spacing: 0.5px !important;
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
        padding: 32px !important;
        max-height: 60vh !important;
        overflow-y: auto !important;
        position: relative !important;
        z-index: 2 !important;
      }

      .poe-content::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 32px !important;
        right: 32px !important;
        height: 1px !important;
        background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent) !important;
      }

      .poe-textarea {
        width: 100% !important;
        min-height: 140px !important;
        padding: 20px !important;
        border: 2px solid #e8eaed !important;
        border-radius: 12px !important;
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace !important;
        font-size: 13px !important;
        line-height: 1.6 !important;
        resize: vertical !important;
        box-sizing: border-box !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        background: #fbfcfd !important;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.04) !important;
        position: relative !important;
      }

      .poe-textarea:focus {
        outline: none !important;
        border-color: #1976d2 !important;
        background: white !important;
        box-shadow:
          inset 0 1px 2px rgba(0,0,0,0.04),
          0 0 0 4px rgba(25, 118, 210, 0.08),
          0 1px 3px rgba(0,0,0,0.1) !important;
        transform: translateY(-1px) !important;
      }

      .poe-textarea::placeholder {
        color: #9aa0a6 !important;
        font-style: italic !important;
      }

      .poe-search-btn {
        width: 100% !important;
        padding: 16px 24px !important;
        background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%) !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 10px !important;
        margin-top: 24px !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        letter-spacing: 0.5px !important;
        text-transform: uppercase !important;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2) !important;
        min-height: 48px !important;
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
        background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4) !important;
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

      .poe-status {
        padding: 12px 16px !important;
        border-radius: 6px !important;
        margin: 20px 0 !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        border: 1px solid #e3f2fd !important;
        background: #f8fbff !important;
        color: #1565c0 !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }

      .poe-status::before {
        content: 'ℹ️' !important;
        font-size: 14px !important;
      }

      .poe-status.success {
        background: #f1f8e9 !important;
        border-color: #c8e6c9 !important;
        color: #2e7d32 !important;
      }

      .poe-status.success::before {
        content: '✅' !important;
      }

      .poe-status.error {
        background: #fef7f0 !important;
        border-color: #ffcdd2 !important;
        color: #d32f2f !important;
      }

      .poe-status.error::before {
        content: '❌' !important;
      }

      .poe-status.warning {
        background: #fffbf0 !important;
        border-color: #ffe0b2 !important;
        color: #f57c00 !important;
      }

      .poe-status.warning::before {
        content: '⚠️' !important;
      }

      .poe-preview {
        margin: 28px 0 !important;
        padding: 24px !important;
        background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%) !important;
        border-radius: 12px !important;
        border: 1px solid #e8eaed !important;
        box-shadow:
          0 1px 3px rgba(0,0,0,0.04),
          0 1px 2px rgba(0,0,0,0.06) !important;
        position: relative !important;
        overflow: hidden !important;
      }

      .poe-preview::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 2px !important;
        background: linear-gradient(90deg, #1976d2, #42a5f5, #1976d2) !important;
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
        padding: 16px 0 12px 0 !important;
        margin-bottom: 12px !important;
        position: relative !important;
        z-index: 2 !important;
      }

      .poe-item-name {
        font-size: 18px !important;
        font-weight: 700 !important;
        color: #212121 !important;
        margin-bottom: 6px !important;
        letter-spacing: 0.3px !important;
        line-height: 1.3 !important;
      }

      .poe-item-base {
        font-size: 14px !important;
        color: #616161 !important;
        margin-bottom: 8px !important;
        font-weight: 500 !important;
        opacity: 0.9 !important;
      }

      .poe-item-info {
        font-size: 11px !important;
        color: #424242 !important;
        text-transform: uppercase !important;
        letter-spacing: 1.2px !important;
        font-weight: 600 !important;
        padding: 4px 10px !important;
        border-radius: 16px !important;
        background: #f5f5f5 !important;
        display: inline-block !important;
        border: 1px solid #e0e0e0 !important;
        margin-bottom: 12px !important;
      }

      .poe-description-section {
        padding: 8px 0 !important;
        border-bottom: 1px solid #e0e0e0 !important;
        margin-bottom: 8px !important;
      }

      .poe-modifiers-section {
        padding-top: 8px !important;
      }

      .poe-stats-list {
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
      }

      .poe-stat-line {
        padding: 2px 0 !important;
        line-height: 1.4 !important;
        font-size: 11px !important;
      }

      .poe-stat-line.description {
        color: #666 !important;
        font-weight: 500 !important;
      }

      .poe-stat-line.mapped {
        color: #2e7d32 !important;
      }

      .poe-stat-line.unmapped {
        color: #d32f2f !important;
      }

      .poe-stat-text {
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
        word-break: break-word !important;
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
      <button class="poe-fab" aria-label="POE Trade Buddy" title="POE Trade Buddy">
        🔍
      </button>
    `
  }

  // Get expanded interface HTML (Clean Card)
  getExpandedHTML() {
    return `
      <div class="poe-card">
        <div class="poe-header">
          <h3>POE Trade Buddy</h3>
          <button class="poe-close-btn" aria-label="Close">×</button>
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
          this.updateStatus('Searching...', 'info')

          setTimeout(() => {
            if (this.isExpanded && this.isExecuting) {
              this.toggleInterface()
            }
          }, 500)

          const result = await window.performSearch(parsed)

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
  showPreview(parsed) {
    const preview = this.container.querySelector('#poe-preview')
    const previewContent = this.container.querySelector('#poe-preview-content')

    if (preview && previewContent) {
      const mappedStats = []
      const unmappedStats = []

      parsed.stats.forEach(stat => {
        const mapping = window.findStatMapping(stat)
        if (mapping) {
          mappedStats.push(stat)
        } else {
          unmappedStats.push(stat)
        }
      })

      // Get rarity class for color coding
      const rarityClass = parsed.rarity.toLowerCase()

      // POE-style layout with description and modifier stats
      let content = `
        <div class="poe-item-header">
          <div class="poe-item-info">${parsed.itemClass}</div>
          <div class="poe-item-name">${parsed.name}</div>
          <div class="poe-item-base">${parsed.baseType}</div>
        </div>
      `

      // Debug: Log description stats
      console.log('Description stats:', parsed.descriptionStats)

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

      // Add modifier stats if they exist
      if (mappedStats.length > 0 || unmappedStats.length > 0) {
        content += `
          <div class="poe-modifiers-section">
            <div class="poe-stats-list">
        `

        // Add mapped stats (green - will be searched)
        mappedStats.forEach(stat => {
          content += `<div class="poe-stat-line mapped">
            <span class="poe-stat-text">${stat}</span>
          </div>`
        })

        // Add unmapped stats (red with unsupported label - will be skipped)
        unmappedStats.forEach(stat => {
          content += `<div class="poe-stat-line unmapped">
            <span class="poe-stat-text">${stat} (unsupported)</span>
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