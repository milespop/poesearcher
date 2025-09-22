// POE Search Engine Module
// Handles POE trade site search operations and DOM manipulation

// Main search engine function
async function performSearch(parsed, scalePercent = 100) {
  console.log(`🔍 Performing search with item data:`, parsed)
  console.log(`🎚️ Scale: ${scalePercent}%`)

  try {
    // Step 1: Clear existing search
    console.log(`📋 Step 1: Clearing existing search`)
    await clearSearchForm()

    // Step 2: Set item category
    console.log(`📋 Step 2: Setting item type`)
    await setItemType(parsed)

    // Step 3: Expand filters if we have stats to add
    const allStats = [...(parsed.implicitStats || []), ...(parsed.stats || [])]
    if (allStats.length > 0) {
      console.log(`📋 Step 3: Expanding filters for ${allStats.length} stats (${parsed.implicitStats?.length || 0} implicit, ${parsed.stats?.length || 0} explicit)`)
      await expandFilters()

      // Step 3.5: Configure filter categories
      console.log(`📋 Step 3.5: Setting filter categories (only Type Filters enabled)`)
      await setFilterCategories()

      // Step 4: Add stat filters (implicit stats first, then explicit)
      console.log(`📋 Step 4: Adding stat filters with ${scalePercent}% scale`)
      await addStatFilters(allStats, scalePercent, parsed.itemClass)
    }

    // Step 5: Execute search
    console.log(`📋 Step 5: Executing search`)
    await executeSearch()

    console.log(`✅ Search completed successfully`)
    return { success: true }

  } catch (error) {
    console.error(`❌ Search failed:`, error)
    return { success: false, error: error.message }
  }
}

// Clear the search form
async function clearSearchForm() {
  console.log(`🧹 Attempting to clear search form`)

  const clearButton = document.querySelector('.clear-btn')
  if (!clearButton) {
    throw new Error('Clear button not found')
  }

  console.log(`✅ Found clear button: ${clearButton.className}`)
  console.log(`📋 Clear button text: "${clearButton.textContent.trim()}"`)
  console.log(`📋 Clear button visible: ${clearButton.offsetParent !== null}`)
  console.log(`📋 Clear button enabled: ${!clearButton.disabled}`)

  console.log(`🧹 Clicking clear button`)
  clearButton.click()

  await new Promise(resolve => setTimeout(resolve, 300))
  console.log(`✅ Clear button clicked successfully`)
}

// Set item category
async function setItemType(parsed) {
  console.log(`🎯 Setting item category for Item Class: "${parsed.itemClass}"`)

  const categoryName = window.ITEM_CLASS_TO_CATEGORY[parsed.itemClass]
  if (!categoryName) {
    throw new Error(`Unknown item class: ${parsed.itemClass}`)
  }

  console.log(`📂 Mapping "${parsed.itemClass}" to category: "${categoryName}"`)

  // Find the category dropdown
  const categoryDropdown = document.querySelector('select[data-field="category"]')
  if (!categoryDropdown) {
    console.log(`📋 Standard dropdown not found, looking for multiselect...`)

    const multiselectInput = document.querySelector('.multiselect input[placeholder*="Any"]')
    if (!multiselectInput) {
      throw new Error('Category selection not found')
    }

    console.log(`📋 Found category dropdown with placeholder: "${multiselectInput.placeholder}"`)

    // Type the category name
    multiselectInput.focus()
    multiselectInput.value = categoryName
    multiselectInput.dispatchEvent(new Event('input', { bubbles: true }))

    await new Promise(resolve => setTimeout(resolve, 200))

    console.log(`⌨️ Typing category: "${categoryName}"`)

    // Press Enter to select
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true
    })

    multiselectInput.dispatchEvent(enterEvent)
    console.log(`⏎ Pressing Enter to select category`)

    await new Promise(resolve => setTimeout(resolve, 300))
    console.log(`✅ Item category set to: "${categoryName}"`)

  } else {
    // Use standard dropdown
    categoryDropdown.value = categoryName
    categoryDropdown.dispatchEvent(new Event('change', { bubbles: true }))
    console.log(`✅ Item category set to: "${categoryName}"`)
  }
}

// Expand filters section
async function expandFilters() {
  console.log(`🔍 Looking for show/hide filters button...`)

  const toggleButton = document.querySelector('.toggle-search-btn')
  if (!toggleButton) {
    throw new Error('Filters toggle button not found')
  }

  console.log(`✅ Found toggle button with selector: ${toggleButton.className}`)

  await new Promise(resolve => setTimeout(resolve, 200))

  const buttonText = toggleButton.textContent.trim()
  console.log(`📋 Current button text: "${buttonText}"`)

  if (buttonText.includes('Show')) {
    console.log(`📖 Filters hidden, clicking to expand`)
    toggleButton.click()

    await new Promise(resolve => setTimeout(resolve, 300))
    console.log(`📋 After click, button text: "${toggleButton.textContent.trim()}"`)
  } else {
    console.log(`📖 Filters already expanded`)
  }
}

// Configure filter categories (only Type Filters enabled)
async function setFilterCategories() {
  console.log(`🎛️ Configuring filter categories...`)

  const categoriesToDisable = ['Equipment Filters', 'Requirements', 'Endgame Filters', 'Miscellaneous', 'Trade Filters']
  const categoriesToEnable = ['Type Filters']

  // Disable unwanted categories
  for (const category of categoriesToDisable) {
    console.log(`🎛️ Setting "${category}" to disabled`)
    await setFilterCategoryState(category, false)
  }

  // Enable wanted categories
  for (const category of categoriesToEnable) {
    console.log(`🎛️ Setting "${category}" to enabled`)
    await setFilterCategoryState(category, true)
  }

  console.log(`✅ Filter categories configured`)
}

// Set individual filter category state
async function setFilterCategoryState(categoryName, enabled) {
  const categoryElements = document.querySelectorAll('.filter-group')

  for (const element of categoryElements) {
    const titleElement = element.querySelector('.filter-group-title')
    if (titleElement && titleElement.textContent.trim() === categoryName) {

      const toggleButton = element.querySelector('.toggle-btn')
      const enableButton = element.querySelector('.filter-group-enable')

      // Check current state
      const isExpanded = !element.classList.contains('filter-group-collapsed')
      const isEnabled = enableButton ? !enableButton.classList.contains('btn-default') : true

      console.log(`📋 "${categoryName}" current state: expanded=${isExpanded}, enabled=${isEnabled}`)

      // Set enabled/disabled state
      if (enableButton) {
        const shouldBeEnabled = enabled
        if (isEnabled !== shouldBeEnabled) {
          console.log(`🔄 ${shouldBeEnabled ? 'Enabling' : 'Disabling'} "${categoryName}"`)
          enableButton.click()
          await new Promise(resolve => setTimeout(resolve, 100))
        } else {
          console.log(`✓ "${categoryName}" is already ${enabled ? 'enabled' : 'disabled'}`)
        }
      } else {
        console.log(`✓ "${categoryName}" is already ${enabled ? 'enabled' : 'disabled'}`)
      }

      return
    }
  }

  console.log(`⚠️ Category "${categoryName}" not found`)
}

// Add stat filters
async function addStatFilters(stats, scalePercent = 100, itemClass = null) {
  console.log(`📊 Adding stat filters for:`, stats)

  for (const stat of stats) {
    console.log(`🔍 Processing: "${stat}"`)

    const mapping = window.findStatMapping(stat, itemClass)
    if (!mapping) {
      console.log(`⚠️ No mapping found for: "${stat}"`)
      continue
    }

    // Apply scaling to the mapping value
    let scaledMapping = { ...mapping }
    if (mapping.value && scalePercent !== 100) {
      const originalValue = mapping.value
      const scaledValue = Math.floor(originalValue * (scalePercent / 100))
      scaledMapping.value = scaledValue
      console.log(`🎚️ Scaling "${stat}": ${originalValue} -> ${scaledValue} (${scalePercent}%)`)
    }

    console.log(`🎯 Adding filter: "${stat}" -> "${scaledMapping.filterText}" (value: ${scaledMapping.value})`)

    const success = await addSingleStatFilter(scaledMapping)
    if (success) {
      console.log(`✅ Added: "${stat}"`)
    } else {
      console.log(`❌ Failed to add "${stat}" - stopping here`)
      return // Exit completely on first failure
    }
  }
}

// Add a single stat filter - typing approach
async function addSingleStatFilter(mapping) {
  // Step 1: Find and focus the Add Stat Filter input
  const addInput = document.querySelector('input[placeholder="+ Add Stat Filter"]')
  if (!addInput) {
    console.error('❌ Add Stat Filter input not found')
    return false
  }

  console.log(`⌨️ Typing filter text: "${mapping.filterText}"`)

  // Step 2: Focus the input and clear any existing text
  addInput.focus()
  addInput.value = ''

  // Step 3: Type the filter text
  addInput.value = mapping.filterText

  // Dispatch input event to trigger Vue.js reactivity
  addInput.dispatchEvent(new Event('input', { bubbles: true }))

  await new Promise(resolve => setTimeout(resolve, 300))

  // Step 3.5: Smart dropdown selection - find best match and avoid "desecrated" versions
  const dropdownOptions = document.querySelectorAll('.multiselect__option span')
  console.log(`📋 Dropdown shows ${dropdownOptions.length} options after typing`)

  let bestMatch = null
  let exactMatch = null
  let firstFiveOptions = []

  for (let i = 0; i < dropdownOptions.length; i++) {
    const opt = dropdownOptions[i]
    const optText = opt.textContent.trim()

    // Log first 5 for debugging
    if (i < 5) {
      firstFiveOptions.push(optText)
    }

    // Check if we should include or skip based on mapping group
    const optionMutateType = opt.querySelector('i.mutate-type')
    const mutateTypeClass = optionMutateType ? optionMutateType.className : ''
    const mutateTypeText = optionMutateType ? optionMutateType.textContent.trim().toLowerCase() : ''

    // Determine the group type from both class and text content
    let optionGroup = 'explicit' // default
    if (mutateTypeClass.includes('mutate-type-desecrated') || mutateTypeText === 'desecrated') {
      optionGroup = 'desecrated'
    } else if (mutateTypeClass.includes('mutate-type-fractured') || mutateTypeText === 'fractured') {
      optionGroup = 'fractured'
    } else if (mutateTypeClass.includes('mutate-type-pseudo') || mutateTypeText === 'pseudo') {
      optionGroup = 'pseudo'
    }

    // Skip if the option group doesn't match our mapping group
    if (optionGroup !== mapping.group) {
      continue
    }

    // Check for exact match
    if (optText === mapping.filterText) {
      exactMatch = opt
      console.log(`✅ Found exact match at position ${i + 1}: "${optText}"`)
      break
    }

    // Check for best partial match (only if no exact match yet)
    if (!bestMatch && optText.includes(mapping.filterText.replace('#', '').trim())) {
      bestMatch = opt
      console.log(`📍 Found potential match at position ${i + 1}: "${optText}"`)
    }
  }

  // Use exact match if found, otherwise use best match
  const selectedOption = exactMatch || bestMatch

  if (selectedOption) {
    const optText = selectedOption.textContent.trim()
    console.log(`🎯 Selecting option: "${optText}"`)

    // Click on the parent option element
    const optionElement = selectedOption.closest('.multiselect__option')
    if (optionElement) {
      optionElement.click()
      console.log('🎯 Clicked selected option')

      // Wait for selection to register
      await new Promise(resolve => setTimeout(resolve, 300))

      // Jump to verification step
      const filterTitles = document.querySelectorAll('.filter-title')
      console.log(`🔍 Looking for filter containing: "${mapping.filterText}"`)
      console.log(`📋 Found ${filterTitles.length} filter titles:`, Array.from(filterTitles).map(el => `"${el.textContent.trim()}"`))

      const newFilter = Array.from(filterTitles).find(el => {
        const cleanTitle = el.textContent.replace(/explicit\s+/i, '').replace(/\s+/g, ' ').trim()
        return cleanTitle === mapping.filterText || cleanTitle.includes(mapping.filterText)
      })

      if (!newFilter) {
        console.error(`❌ Filter was not created for: ${mapping.filterText}`)
        return false
      }

      console.log(`✅ Filter created: ${newFilter.textContent.trim()}`)

      // Set the value - use max for "Adds # to #" stats, min for others
      const filterElement = newFilter.closest('.filter')
      if (filterElement) {
        const isAddsRange = mapping.filterText && mapping.filterText.includes('Adds # to #')

        if (isAddsRange) {
          // For "Adds # to #" stats, set the max value
          const maxInput = filterElement.querySelector('input[placeholder="max"]')
          if (maxInput && mapping.value) {
            console.log(`💰 Setting max value to: ${mapping.value} (for Adds # to # stat)`)
            maxInput.focus()
            maxInput.value = mapping.value
            maxInput.dispatchEvent(new Event('input', { bubbles: true }))
            maxInput.dispatchEvent(new Event('change', { bubbles: true }))
            console.log(`✅ Max value set to: ${mapping.value}`)
          }
        } else {
          // For other stats, set the min value
          const minInput = filterElement.querySelector('input[placeholder="min"]')
          if (minInput && mapping.value) {
            console.log(`💰 Setting min value to: ${mapping.value}`)
            minInput.focus()
            minInput.value = mapping.value
            minInput.dispatchEvent(new Event('input', { bubbles: true }))
            minInput.dispatchEvent(new Event('change', { bubbles: true }))
            console.log(`✅ Min value set to: ${mapping.value}`)
          }
        }
      }

      return true
    }
  }

  // Log what we saw in the dropdown
  console.log(`📋 First 5 options:`, firstFiveOptions)

  if (!selectedOption) {
    console.log(`⚠️ No suitable match found, falling back to Enter key`)
  } else {
    console.log(`✅ Used smart selection, skipping Enter key fallback`)
    return true
  }

  // Fallback to Enter key if no smart selection was made
  console.log(`⏎ Falling back to Enter key selection`)
  // Step 4: Press Enter to confirm selection

  // Try multiple Enter events - some components need keyup, keypress, or both
  const enterKeydown = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  })

  const enterKeypress = new KeyboardEvent('keypress', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  })

  const enterKeyup = new KeyboardEvent('keyup', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  })

  // Dispatch all three events
  addInput.dispatchEvent(enterKeydown)
  addInput.dispatchEvent(enterKeypress)
  addInput.dispatchEvent(enterKeyup)

  await new Promise(resolve => setTimeout(resolve, 400))

  // Step 5: Verify the filter was created
  const filterTitles = document.querySelectorAll('.filter-title')

  console.log(`🔍 Looking for filter containing: "${mapping.filterText}"`)
  console.log(`📋 Found ${filterTitles.length} filter titles:`, Array.from(filterTitles).map(el => `"${el.textContent.trim()}"`))

  const newFilter = Array.from(filterTitles).find(el => {
    const cleanTitle = el.textContent.replace(/explicit\s+/i, '').replace(/\s+/g, ' ').trim()
    // Check if the filter title matches our filter text
    return cleanTitle === mapping.filterText || cleanTitle.includes(mapping.filterText)
  })

  if (!newFilter) {
    console.error(`❌ Filter was not created for: ${mapping.filterText}`)
    return false
  }

  console.log(`✅ Filter created: ${newFilter.textContent.trim()}`)

  // Step 6: Tab to the min input field (much more natural!)
  console.log(`⇥ Tabbing to min input field`)
  const tabEvent = new KeyboardEvent('keydown', {
    key: 'Tab',
    code: 'Tab',
    bubbles: true,
    cancelable: true
  })
  document.activeElement.dispatchEvent(tabEvent)

  await new Promise(resolve => setTimeout(resolve, 100))

  // Step 7: Type the min value into the focused input
  const activeElement = document.activeElement
  if (activeElement && activeElement.placeholder === 'min') {
    console.log(`📝 Setting min value: ${mapping.value}`)
    activeElement.value = mapping.value
    activeElement.dispatchEvent(new Event('input', { bubbles: true }))
    activeElement.dispatchEvent(new Event('change', { bubbles: true }))
    return true
  } else {
    console.error(`❌ Tab didn't focus min input. Active element:`, activeElement)
    console.log(`🔍 Trying fallback - finding min input manually`)

    // Fallback: find the min input manually
    const minInputs = document.querySelectorAll('input[placeholder="min"]')
    const lastMinInput = minInputs[minInputs.length - 1]

    if (lastMinInput) {
      lastMinInput.focus()
      lastMinInput.value = mapping.value
      lastMinInput.dispatchEvent(new Event('input', { bubbles: true }))
      lastMinInput.dispatchEvent(new Event('change', { bubbles: true }))
      return true
    } else {
      console.error(`❌ Min input not found after creating filter`)
      return false
    }
  }
}

// Execute the search
async function executeSearch() {
  const searchButton = document.querySelector('.search-btn')
  if (searchButton) {
    searchButton.click()
    console.log(`🔍 Search button clicked`)
  } else {
    console.log(`⚠️ Search button not found, search may auto-execute`)
  }
}

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    performSearch,
    clearSearchForm,
    setItemType,
    expandFilters,
    setFilterCategories,
    addStatFilters,
    addSingleStatFilter,
    executeSearch
  }
} else {
  // Browser environment - attach to window
  window.performSearch = performSearch
  window.clearSearchForm = clearSearchForm
  window.setItemType = setItemType
  window.expandFilters = expandFilters
  window.setFilterCategories = setFilterCategories
  window.addStatFilters = addStatFilters
  window.addSingleStatFilter = addSingleStatFilter
  window.executeSearch = executeSearch
}