// POE Interface Module
// Handles UI creation, styling, and event management

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

    this.createInterface()
    this.applyCollapsedStyles()
    this.setupEventHandlers()

    console.log('✅ POE Searcher ready!')
  }

  // Create the main interface container
  createInterface() {
    // Remove any existing interface
    const existing = document.querySelector('#poe-searcher-interface')
    if (existing) {
      existing.remove()
    }

    // Create container
    this.container = document.createElement('div')
    this.container.id = 'poe-searcher-interface'
    this.container.innerHTML = this.getCollapsedHTML()

    // Insert into page
    document.body.appendChild(this.container)

    // Set up click handler for expand/collapse
    const header = this.container.querySelector('.poe-header')
    if (header) {
      header.addEventListener('click', () => this.toggleInterface())
    }
  }

  // Get collapsed interface HTML
  getCollapsedHTML() {
    return `
      <div class="poe-header">
        <span class="poe-title">🔍 POE Searcher</span>
        <span class="poe-toggle">▼</span>
      </div>
    `
  }

  // Get expanded interface HTML
  getExpandedHTML() {
    return `
      <div class="poe-header">
        <span class="poe-title">🔍 POE Searcher</span>
        <span class="poe-toggle">▲</span>
      </div>

      <div class="poe-content">
        <div class="poe-input-section">
          <textarea id="poe-item-input"
                    class="poe-textarea"
                    placeholder="Copy item from POE (Ctrl+C) and paste here..."
                    rows="6"></textarea>
        </div>

        <div class="poe-buttons">
          <button id="poe-search-btn" class="poe-btn poe-btn-primary">
            🔍 Search
          </button>
        </div>

        <div class="poe-settings">
          <label class="poe-checkbox-label">
            <input type="checkbox" id="poe-include-implicits" class="poe-checkbox" disabled>
            Include Implicits
            <span class="poe-disabled-note">(Coming Soon)</span>
          </label>
        </div>

        <div id="poe-status" class="poe-status-box">
          Ready to search! Paste item data above.
        </div>

        <div id="poe-preview" class="poe-preview" style="display: none;">
          <strong>📊 Detected Stats:</strong>
          <div id="poe-preview-content" class="poe-preview-content"></div>
        </div>
      </div>
    `
  }

  // Toggle interface expanded/collapsed
  toggleInterface() {
    this.isExpanded = !this.isExpanded

    if (this.isExpanded) {
      console.log('📖 Interface expanded')
      this.container.innerHTML = this.getExpandedHTML()
      this.applyExpandedStyles()
      this.setupEventHandlers()
    } else {
      console.log('📕 Interface collapsed')
      this.clearEventHandlers()
      this.container.innerHTML = this.getCollapsedHTML()
      this.applyCollapsedStyles()
    }

    // Re-setup header click handler
    const header = this.container.querySelector('.poe-header')
    if (header) {
      header.addEventListener('click', () => this.toggleInterface())
    }
  }

  // Apply styles for collapsed state
  applyCollapsedStyles() {
    Object.assign(this.container.style, {
      position: 'fixed',
      top: '2.5rem',
      right: '0px',
      backgroundColor: '#d4af37',
      color: 'white',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: 'bold',
      zIndex: '2147483647',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      border: '2px solid #b8941f',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: '300px'
    })

    // Style header
    const header = this.container.querySelector('.poe-header')
    if (header) {
      Object.assign(header.style, {
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      })
    }
  }

  // Apply styles for expanded state
  applyExpandedStyles() {
    Object.assign(this.container.style, {
      position: 'fixed',
      top: '2.5rem',
      right: '0px',
      width: '400px',
      backgroundColor: '#f8f9fa',
      color: '#333',
      border: '2px solid #d4af37',
      borderRadius: '8px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      zIndex: '2147483647',
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      maxHeight: '90vh',
      overflowY: 'auto'
    })

    this.applyStyles()
  }

  // Apply common styles
  applyStyles() {
    // Header styles
    const header = this.container.querySelector('.poe-header')
    if (header) {
      Object.assign(header.style, {
        backgroundColor: '#d4af37',
        color: 'white',
        padding: '12px 15px',
        fontWeight: 'bold',
        fontSize: '14px',
        borderRadius: '6px 6px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
      })
    }

    // Content styles
    const content = this.container.querySelector('.poe-content')
    if (content) {
      Object.assign(content.style, {
        padding: '15px'
      })
    }

    // Textarea styles
    const textarea = this.container.querySelector('.poe-textarea')
    if (textarea) {
      Object.assign(textarea.style, {
        width: '100%',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '11px',
        fontFamily: 'monospace',
        resize: 'vertical',
        minHeight: '100px',
        boxSizing: 'border-box'
      })
    }

    // Button styles
    const primaryBtn = this.container.querySelector('.poe-btn-primary')
    if (primaryBtn) {
      Object.assign(primaryBtn.style, {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
        margin: '10px 0'
      })
    }

    // Style status box
    const statusBox = this.container.querySelector('.poe-status-box')
    if (statusBox) {
      Object.assign(statusBox.style, {
        padding: '8px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '11px',
        marginTop: '10px'
      })
    }

    // Style preview
    const preview = this.container.querySelector('.poe-preview')
    if (preview) {
      Object.assign(preview.style, {
        backgroundColor: '#f0f8ff',
        padding: '10px',
        borderRadius: '4px',
        fontSize: '11px',
        marginTop: '10px',
        border: '1px solid #b3d9ff'
      })
    }

    const previewContent = this.container.querySelector('.poe-preview-content')
    if (previewContent) {
      Object.assign(previewContent.style, {
        marginTop: '8px',
        fontSize: '10px',
        lineHeight: '1.4'
      })
    }

    // Style settings section
    const settings = this.container.querySelector('.poe-settings')
    if (settings) {
      Object.assign(settings.style, {
        marginTop: '10px',
        padding: '8px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #ddd',
        borderRadius: '4px'
      })
    }

    // Style checkbox label
    const checkboxLabel = this.container.querySelector('.poe-checkbox-label')
    if (checkboxLabel) {
      Object.assign(checkboxLabel.style, {
        display: 'flex',
        alignItems: 'center',
        fontSize: '11px',
        cursor: 'not-allowed',
        opacity: '0.6'
      })
    }

    // Style checkbox
    const checkbox = this.container.querySelector('.poe-checkbox')
    if (checkbox) {
      Object.assign(checkbox.style, {
        marginRight: '6px',
        cursor: 'not-allowed'
      })
    }

    // Style disabled note
    const disabledNote = this.container.querySelector('.poe-disabled-note')
    if (disabledNote) {
      Object.assign(disabledNote.style, {
        marginLeft: '6px',
        color: '#6c757d',
        fontSize: '9px',
        fontStyle: 'italic'
      })
    }
  }

  // Clear existing event handlers to prevent duplicates
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

  // Setup event handlers for expanded interface
  setupEventHandlers() {
    if (!this.isExpanded) return

    // Clear any existing handlers to prevent duplicates
    this.clearEventHandlers()

    const searchBtn = this.container.querySelector('#poe-search-btn')
    const textarea = this.container.querySelector('#poe-item-input')

    // Store handler references for cleanup
    this._pasteHandler = (e) => {
      // Let the paste complete first
      setTimeout(() => {
        const text = textarea.value.trim()
        if (!text) {
          this.updateStatus('⚠️ Please paste item data', 'error')
          this.hidePreview()
          return
        }

        // Validate POE item format first
        const validation = window.validatePOEItemFormat(text)
        if (!validation.isValid) {
          this.updateStatus(`⚠️ Invalid format: ${validation.error}`, 'error')
          this.hidePreview()
          return
        }

        const parsed = window.parseItem(text)
        console.log('📝 Auto-parsed item on paste:', parsed)

        this.updateStatus(`📝 Parsed: ${parsed.itemClass} • ${parsed.rarity} • ${parsed.stats.length} stats`, 'success')
        this.showPreview(parsed)
      }, 100)
    }

    // Auto-parse on paste
    if (textarea) {
      textarea.addEventListener('paste', this._pasteHandler)
    }

    // Search button
    if (searchBtn) {
      searchBtn.addEventListener('click', async () => {
        const text = textarea.value.trim()
        if (!text) {
          this.updateStatus('⚠️ Please paste item data first', 'error')
          this.hidePreview()
          return
        }

        // Validate POE item format first
        const validation = window.validatePOEItemFormat(text)
        if (!validation.isValid) {
          this.updateStatus(`⚠️ Invalid format: ${validation.error}`, 'error')
          this.hidePreview()
          return
        }

        try {
          // Prevent duplicate execution
          if (this.isExecuting) {
            console.log('⚠️ Already executing, ignoring duplicate click')
            return
          }

          this.isExecuting = true

          const parsed = window.parseItem(text)
          this.showPreview(parsed)
          this.updateStatus('🔄 Searching...', 'info')

          // Collapse interface to get out of the way during automation
          setTimeout(() => {
            if (this.isExpanded && this.isExecuting) {
              this.toggleInterface()
              console.log('🔄 Collapsed interface during automation')
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
          console.log(`❌ Error: ${error.message}`)
        } finally {
          this.isExecuting = false

          // Now collapse the interface after execution is complete
          setTimeout(() => {
            if (this.isExpanded) {
              this.toggleInterface()
              console.log('🔄 Collapsed searcher after execution completed')
            }
          }, 2000)
        }
      })
    }

    // Auto-save textarea content
    if (textarea) {
      textarea.addEventListener('input', () => {
        if (textarea.value.trim()) {
          // Save to storage for persistence
          try {
            chrome.storage.local.set({ lastItem: textarea.value })
          } catch (e) {
            console.log('Could not save item data')
          }
        } else {
          // Clear preview when textarea is empty
          this.hidePreview()
        }
      })

      // Load saved content and validate it
      try {
        chrome.storage.local.get(['lastItem'], (result) => {
          if (result.lastItem) {
            textarea.value = result.lastItem

            // Validate and display if valid, clear if invalid
            const validation = window.validatePOEItemFormat(result.lastItem)
            if (validation.isValid) {
              const parsed = window.parseItem(result.lastItem)
              this.updateStatus(`📝 Loaded: ${parsed.itemClass} • ${parsed.rarity} • ${parsed.stats.length} stats`, 'success')
              this.showPreview(parsed)
            } else {
              console.log('Saved item data invalid, clearing:', validation.error)
              textarea.value = ''
              chrome.storage.local.remove(['lastItem'])
              this.hidePreview()
            }
          }
        })
      } catch (e) {
        console.log('Could not load saved item data')
      }
    }
  }

  // Update status display
  updateStatus(message, type = 'info') {
    const statusBox = this.container.querySelector('#poe-status')
    if (statusBox) {
      statusBox.textContent = message

      // Apply status-specific styling
      const baseStyle = {
        padding: '8px',
        borderRadius: '4px',
        fontSize: '11px',
        marginTop: '10px'
      }

      if (type === 'error') {
        Object.assign(statusBox.style, baseStyle, {
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          color: '#721c24'
        })
      } else if (type === 'success') {
        Object.assign(statusBox.style, baseStyle, {
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          color: '#155724'
        })
      } else {
        Object.assign(statusBox.style, baseStyle, {
          backgroundColor: '#f8f9fa',
          border: '1px solid #ddd',
          color: '#333'
        })
      }
    }
  }

  // Show parsed item preview
  showPreview(parsed) {
    const preview = this.container.querySelector('#poe-preview')
    const previewContent = this.container.querySelector('#poe-preview-content')

    if (preview && previewContent) {
      const mappedStats = []
      const unmappedStats = []

      // Process each stat
      parsed.stats.forEach(stat => {
        const mapping = window.findStatMapping(stat)
        if (mapping) {
          mappedStats.push(`• <span style="color: #28a745;">${stat}</span>`)
        } else {
          unmappedStats.push(`• <span style="color: #6c757d;">${stat}</span>`)
        }
      })

      let content = `
        <div style="margin-bottom: 8px;">
          <strong>${parsed.itemClass}</strong> • ${parsed.rarity}<br>
          📌 ${parsed.name}<br>
          ${parsed.baseType !== parsed.name ? `Base: ${parsed.baseType}<br>` : ''}
        </div>
      `

      if (mappedStats.length > 0 || unmappedStats.length > 0) {
        content += '<strong>Detected Modifiers:</strong><br>'
        content += [...mappedStats, ...unmappedStats].join('<br>')
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

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { POESearcherInterface }
} else {
  // Browser environment - attach to window
  window.POESearcherInterface = POESearcherInterface
}