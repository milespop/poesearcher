// POE Item Parser Module
// Handles parsing and validation of POE item text

// Item category mapping for POE trade site
const ITEM_CLASS_TO_CATEGORY = {
  'Staves': 'Staff',
  'Crossbows': 'Crossbow',
  'Shields': 'Shield',
  'Amulets': 'Amulet',
  'Rings': 'Ring',
  'Belts': 'Belt',
  'Gloves': 'Gloves',
  'Boots': 'Boots',
  'Body Armours': 'Body Armour',
  'Helmets': 'Helmet',
  'Bows': 'Bow',
  'Wands': 'Wand',
  'Swords': 'One Hand Sword',
  'Axes': 'One Hand Axe',
  'Maces': 'One Hand Mace',
  'Daggers': 'Dagger',
  'Claws': 'Claw',
  'Sceptres': 'Sceptre',
  'Two Hand Swords': 'Two Hand Sword',
  'Two Hand Axes': 'Two Hand Axe',
  'Two Hand Maces': 'Two Hand Mace',
  'Quarterstaves': 'Quarterstaff',
  'Spears': 'Spear',
  'Flails': 'Flail',
  'Jewels': 'Jewel',
  'Flasks': 'Flask'
}

// Validate POE item format
function validatePOEItemFormat(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line)

  if (lines.length < 4) {
    return { isValid: false, error: 'Too few lines (minimum 4 required)' }
  }

  // Check for required sections in order
  let lineIndex = 0

  // 1. Must start with "Item Class:"
  if (!lines[lineIndex]?.startsWith('Item Class:')) {
    return { isValid: false, error: 'Must start with "Item Class:"' }
  }
  lineIndex++

  // 2. Must have "Rarity:"
  if (!lines[lineIndex]?.startsWith('Rarity:')) {
    return { isValid: false, error: 'Missing "Rarity:" line' }
  }
  lineIndex++

  // 3. Must have item name (non-empty line)
  if (!lines[lineIndex] || lines[lineIndex].startsWith('---')) {
    return { isValid: false, error: 'Missing item name' }
  }
  lineIndex++

  // 4. Optional: base type (if not same as name)
  if (lines[lineIndex] && !lines[lineIndex].startsWith('---')) {
    lineIndex++ // Skip base type line
  }

  // 5. Must have section separator "--------"
  if (!lines[lineIndex]?.startsWith('---')) {
    return { isValid: false, error: 'Missing section separator "--------"' }
  }

  // If we get here, the basic format is valid
  return { isValid: true }
}

// Parse POE item text
function parseItem(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line)

  const parsed = {
    raw: text,
    name: '',
    baseType: '',
    rarity: '',
    itemClass: '',
    stats: [],
    implicitStats: [],
    descriptionStats: []
  }

  let currentSection = 'header'
  let sectionIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip empty lines
    if (!line) continue

    // Section separators
    if (line.startsWith('---')) {
      sectionIndex++
      continue
    }

    // Skip notes section
    if (line.startsWith('Note:')) {
      break
    }

    if (line.startsWith('Item Class:')) {
      parsed.itemClass = line.replace('Item Class:', '').trim()
    } else if (line.startsWith('Rarity:')) {
      parsed.rarity = line.replace('Rarity:', '').trim()
    } else if (sectionIndex === 0) {
      // Header section - item name and base type
      if (!parsed.name) {
        parsed.name = line
      } else if (!parsed.baseType) {
        parsed.baseType = line
      }
    } else if (sectionIndex === 1) {
      // First section after header - description stats (base item properties)
      if (line.includes('Block chance:') ||
          line.includes('Armour:') ||
          line.includes('Evasion Rating:') ||
          line.includes('Energy Shield:') ||
          line.includes('Physical Damage:') ||
          line.includes('Fire Damage:') ||
          line.includes('Cold Damage:') ||
          line.includes('Lightning Damage:') ||
          line.includes('Chaos Damage:') ||
          line.includes('Critical Hit Chance:') ||
          line.includes('Attacks per Second:') ||
          line.includes('Reload Time:') ||
          line.includes('Weapon Range:')) {
        // Remove (augmented) from description stats
        const cleanLine = line.replace(/\s*\(augmented\)/, '')
        console.log('Adding description stat:', cleanLine)
        parsed.descriptionStats.push(cleanLine)
      }
    } else if (sectionIndex >= 2) {
      // Later sections - handle modifier stats

      // Skip various non-stat lines
      if (line.includes('Requires:') ||
          line.includes('Sockets:') ||
          line.includes('Item Level:') ||
          line.includes('Grants Skill:') ||
          line.includes('Corrupted') ||
          line.includes('Mirrored')) {
        continue
      }

      // Skip rune stats - they contain "(rune)" suffix
      if (line.includes('(rune)')) {
        continue
      }

      // This looks like a modifier stat (+ or - with numbers or %)
      if (line.match(/[\+\-]?\d+/) || line.includes('%')) {
        // Check if it's an implicit stat
        if (line.includes('(implicit)')) {
          // Remove (implicit) suffix and add to implicit stats
          const cleanLine = line.replace(/\s*\(implicit\)/, '')
          parsed.implicitStats.push(cleanLine)
        } else {
          // Regular explicit stat
          parsed.stats.push(line)
        }
      }
    }
  }

  // Set base type same as name if not found
  if (!parsed.baseType) {
    parsed.baseType = parsed.name
  }

  return parsed
}

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ITEM_CLASS_TO_CATEGORY,
    validatePOEItemFormat,
    parseItem
  }
} else {
  // Browser environment - attach to window
  window.ITEM_CLASS_TO_CATEGORY = ITEM_CLASS_TO_CATEGORY
  window.validatePOEItemFormat = validatePOEItemFormat
  window.parseItem = parseItem
}