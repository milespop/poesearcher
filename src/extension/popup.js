// Simple popup for item input and search triggering
console.log('🎯 POE Searcher popup loaded')

// Add error handling for popup
window.addEventListener('error', (event) => {
  console.error('❌ Popup error:', event.error)
})

document.addEventListener('DOMContentLoaded', async () => {
  console.log('📋 Popup DOM loaded, initializing...')
  const itemInput = document.getElementById('itemInput')
  const searchBtn = document.getElementById('searchBtn')
  const parseBtn = document.getElementById('parseBtn')
  const statusDiv = document.getElementById('status')

  // Load saved item data
  try {
    const saved = await chrome.storage.local.get(['lastItem'])
    if (saved.lastItem) {
      itemInput.value = saved.lastItem
    }
  } catch (e) {
    console.log('No saved item data')
  }

  // Auto-save item data as user types
  itemInput.addEventListener('input', async () => {
    if (itemInput.value.trim()) {
      await chrome.storage.local.set({ lastItem: itemInput.value })
    }
  })

  // Check if we're on a trade page
  async function updateStatus() {
    console.log('🔍 Checking current page status...')

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      console.log('📄 Current tab:', tab.url)

      if (tab.url?.includes('pathofexile.com/trade2')) {
        statusDiv.innerHTML = '✅ Ready to search!<br>Paste item and click Search'
        statusDiv.className = 'status success'
        searchBtn.disabled = false
        console.log('✅ On POE trade page - ready to search')
      } else if (tab.url?.includes('pathofexile.com')) {
        statusDiv.innerHTML = '➡️ Navigate to /trade2 to enable searching'
        statusDiv.className = 'status info'
        searchBtn.disabled = true
        console.log('⚠️ On POE site but not trade page')
      } else {
        statusDiv.innerHTML = '🌐 Please navigate to pathofexile.com/trade2'
        statusDiv.className = 'status error'
        searchBtn.disabled = true
        console.log('❌ Not on POE site')
      }

      // Test content script communication
      if (tab.url?.includes('pathofexile.com/trade2')) {
        try {
          const response = await chrome.tabs.sendMessage(tab.id, {
            action: 'ping'
          })
          console.log('📡 Content script response:', response)
        } catch (commError) {
          console.log('⚠️ Content script not responding:', commError.message)
          statusDiv.innerHTML += '<br>⚠️ Content script not loaded - refresh page'
        }
      }

    } catch (e) {
      console.error('❌ Status update error:', e)
      statusDiv.textContent = '❌ Cannot access current tab: ' + e.message
      statusDiv.className = 'status error'
      searchBtn.disabled = true
    }
  }

  // Parse item data (basic implementation)
  function parseItem(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line)

    const parsed = {
      raw: text,
      name: '',
      baseType: '',
      rarity: '',
      itemClass: '',
      stats: [],
      requirements: {}
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('Item Class:')) {
        parsed.itemClass = line.replace('Item Class:', '').trim()
      } else if (line.startsWith('Rarity:')) {
        parsed.rarity = line.replace('Rarity:', '').trim()
      } else if (line.includes('% increased') || line.includes('to maximum') || line.includes('% more')) {
        parsed.stats.push(line)
      } else if (line.includes('Requires:')) {
        parsed.requirements.text = line
      } else if (line.match(/^[A-Z]/) && !line.includes(':') && !line.includes('-') && parsed.name === '') {
        parsed.name = line
      } else if (line.match(/^[A-Z]/) && !line.includes(':') && !line.includes('-') && parsed.baseType === '') {
        parsed.baseType = line
      }
    }

    return parsed
  }

  // Parse button functionality
  parseBtn.addEventListener('click', () => {
    const text = itemInput.value.trim()
    if (!text) {
      statusDiv.textContent = '⚠️ Please paste item data first'
      statusDiv.className = 'status error'
      return
    }

    const parsed = parseItem(text)
    console.log('Parsed item:', parsed)

    statusDiv.innerHTML = `
      <strong>📝 Parsed:</strong><br>
      ${parsed.itemClass} • ${parsed.rarity}<br>
      ${parsed.stats.length} stats found
    `
    statusDiv.className = 'status success'
  })

  // Search button functionality
  searchBtn.addEventListener('click', async () => {
    const text = itemInput.value.trim()
    if (!text) {
      statusDiv.textContent = '⚠️ Please paste item data first'
      statusDiv.className = 'status error'
      return
    }

    try {
      // Parse the item
      const parsed = parseItem(text)

      // Get current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

      if (!tab.url?.includes('pathofexile.com/trade2')) {
        statusDiv.textContent = '❌ Please navigate to POE trade site first'
        statusDiv.className = 'status error'
        return
      }

      // Send to content script
      statusDiv.textContent = '🔄 Searching...'
      statusDiv.className = 'status info'

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'search',
        itemData: parsed
      })

      if (response && response.success) {
        statusDiv.textContent = '✅ Search executed successfully!'
        statusDiv.className = 'status success'

        // Close popup after successful search
        setTimeout(() => window.close(), 1500)
      } else {
        statusDiv.textContent = '❌ Search failed: ' + (response?.error || 'Unknown error')
        statusDiv.className = 'status error'
      }

    } catch (error) {
      console.error('Search error:', error)
      statusDiv.textContent = '❌ Extension error: ' + error.message
      statusDiv.className = 'status error'
    }
  })

  // Initialize status
  await updateStatus()
})