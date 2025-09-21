// POE Trade Site Stat Filter Mappings
// Maps parsed item stats to actual trade site filter dropdown options

const POE_STAT_MAPPINGS = {
  // Stat mappings with exact filter text from dropdown
  mappings: {
    'to maximum Life': {
      filterText: '+# total maximum Life',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Life/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to maximum Mana': {
      filterText: '+# total maximum Mana',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Mana/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to maximum Energy Shield': {
      filterText: '+# total maximum Energy Shield',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Energy Shield/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to all Elemental Resistances': {
      filterText: '+#% total to all Elemental Resistances',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to all Elemental Resistances/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Intelligence': {
      filterText: '+# total to Intelligence',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Intelligence/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Dexterity': {
      filterText: '+# total to Dexterity',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Dexterity/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Strength': {
      filterText: '+# total to Strength',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Strength/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Movement Speed': {
      filterText: '#% increased Movement Speed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Movement Speed/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Energy Shield': {
      filterText: '#% increased Energy Shield',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Energy Shield/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased maximum Energy Shield': {
      filterText: '#% increased maximum Energy Shield',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased maximum Energy Shield/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Evasion Rating': {
      filterText: '#% increased Evasion Rating',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Evasion Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Rarity of Items found': {
      filterText: '#% increased Rarity of Items found',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Rarity of Items found/)
        return match ? parseInt(match[1]) : null
      }
    }
  },

  // Selectors for interacting with the trade site
  selectors: {
    // Filter expansion button
    showFiltersButton: '.toggle-search-btn',

    // Stat filter dropdown
    statDropdown: '.filter-group-select .multiselect__input',
    statOptions: '.multiselect__option',

    // Input fields for min/max values
    minValueInput: 'input[placeholder="min"]',
    maxValueInput: 'input[placeholder="max"]'
  }
}

// Function to find matching stat mapping
function findStatMapping(statText) {
  for (const [key, mapping] of Object.entries(POE_STAT_MAPPINGS.mappings)) {
    if (statText.includes(key)) {
      const value = mapping.extractValue(statText)
      if (value !== null) {
        return { ...mapping, value, originalText: statText, searchKey: key }
      }
    }
  }
  return null
}

// Function to match filter dropdown text
function findDropdownOption(filterText, options) {
  // First try exact match (removing # placeholders)
  const exactMatch = filterText.replace(/#/g, '').trim()

  for (const option of options) {
    const optionText = option.textContent.trim()

    // Remove pseudo/explicit prefixes and # placeholders for comparison
    const cleanOptionText = optionText
      .replace(/^(pseudo|explicit)\s*/, '')
      .replace(/#/g, '')
      .trim()

    if (cleanOptionText === exactMatch) {
      return option
    }
  }

  // Fallback: partial match
  const keywords = exactMatch.toLowerCase().split(' ')
  for (const option of options) {
    const optionText = option.textContent.toLowerCase()
    if (keywords.every(keyword => optionText.includes(keyword))) {
      return option
    }
  }

  return null
}

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { POE_STAT_MAPPINGS, findStatMapping, findDropdownOption }
} else {
  window.POE_STAT_MAPPINGS = POE_STAT_MAPPINGS
  window.findStatMapping = findStatMapping
  window.findDropdownOption = findDropdownOption
}