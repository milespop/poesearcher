// Extension health check - add to popup for debugging
function performHealthCheck() {
  console.log('🏥 POE Searcher Health Check')
  console.log('=' .repeat(40))

  const results = {
    timestamp: new Date().toISOString(),
    checks: []
  }

  // Check 1: Chrome APIs available
  try {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      results.checks.push({ name: 'Chrome APIs', status: '✅ Available', details: chrome.runtime.getManifest?.()?.name })
    } else {
      results.checks.push({ name: 'Chrome APIs', status: '❌ Missing', details: 'Extension context not available' })
    }
  } catch (e) {
    results.checks.push({ name: 'Chrome APIs', status: '❌ Error', details: e.message })
  }

  // Check 2: Storage access
  try {
    chrome.storage.local.get(['test'], (result) => {
      results.checks.push({ name: 'Storage Access', status: '✅ Working', details: 'Local storage accessible' })
    })
  } catch (e) {
    results.checks.push({ name: 'Storage Access', status: '❌ Error', details: e.message })
  }

  // Check 3: Tab access
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        results.checks.push({
          name: 'Tab Access',
          status: '✅ Working',
          details: `Active tab: ${tabs[0].url?.substring(0, 50)}...`
        })
      } else {
        results.checks.push({ name: 'Tab Access', status: '❌ Failed', details: 'No active tab found' })
      }
    })
  } catch (e) {
    results.checks.push({ name: 'Tab Access', status: '❌ Error', details: e.message })
  }

  // Check 4: Popup HTML elements
  const elements = ['itemInput', 'searchBtn', 'parseBtn', 'status']
  elements.forEach(id => {
    const element = document.getElementById(id)
    results.checks.push({
      name: `Element #${id}`,
      status: element ? '✅ Found' : '❌ Missing',
      details: element ? element.tagName : 'Element not in DOM'
    })
  })

  // Check 5: Manifest validation
  try {
    const manifest = chrome.runtime.getManifest()
    results.checks.push({
      name: 'Manifest',
      status: '✅ Valid',
      details: `v${manifest.version} - ${manifest.permissions?.length || 0} permissions`
    })
  } catch (e) {
    results.checks.push({ name: 'Manifest', status: '❌ Error', details: e.message })
  }

  // Output results
  console.table(results.checks)

  const summary = {
    passed: results.checks.filter(c => c.status.includes('✅')).length,
    failed: results.checks.filter(c => c.status.includes('❌')).length,
    total: results.checks.length
  }

  console.log('\n📊 Health Check Summary:')
  console.log(`✅ Passed: ${summary.passed}/${summary.total}`)
  console.log(`❌ Failed: ${summary.failed}/${summary.total}`)

  if (summary.failed === 0) {
    console.log('🎉 Extension is healthy!')
  } else {
    console.log('⚠️ Extension has issues that need attention')
  }

  return results
}

// Auto-run health check when loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(performHealthCheck, 500)
  })
}

// Export for manual use
if (typeof window !== 'undefined') {
  window.poeSearcherHealthCheck = performHealthCheck
}