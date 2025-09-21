// PoE2 Searcher - Main Content Script
// Initializes the POE trade automation interface

// Main execution
(async function() {
  'use strict'

  console.log('🎯 PoE2 Searcher content script starting...')

  // Check if we're on a POE trade site
  if (!window.location.hostname.includes('pathofexile.com')) {
    console.log('❌ Not on POE website, exiting')
    return
  }

  if (!window.location.pathname.includes('/trade')) {
    console.log('❌ Not on trade page, exiting')
    return
  }

  console.log('✅ On POE trade site, initializing...')

  // Check for all required classes (they should be loaded by now via manifest)
  const requiredClasses = ['POESearcherInterface', 'parseItem', 'validatePOEItemFormat', 'findStatMapping', 'performSearch']
  const missing = requiredClasses.filter(className => !window[className])

  if (missing.length > 0) {
    console.error('❌ Missing required classes:', missing)
    console.log('Available POE objects:', Object.keys(window).filter(key => key.includes('POE') || key.includes('parse') || key.includes('find') || key.includes('perform')))
    return
  }

  // Initialize the interface
  if (window.POESearcherInterface) {
    console.log('🎯 PoE2 Searcher initializing...')
    const searcher = new window.POESearcherInterface()
    await searcher.init()
  }
})()