// Background service worker for POE Searcher
console.log('🔧 POE Searcher background service worker loaded')

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('📦 POE Searcher installed:', details.reason)

  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.local.set({
      version: '1.0.0',
      settings: {
        autoSearch: true,
        showNotifications: true
      }
    })

    console.log('✅ POE Searcher ready!')
  }
})

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('📨 Background received message:', request)

  switch (request.action) {
    case 'log':
      console.log('📊 Log:', request.data)
      break

    default:
      console.log('❓ Unknown action:', request.action)
  }

  return true
})

console.log('🎯 POE Searcher background ready!')