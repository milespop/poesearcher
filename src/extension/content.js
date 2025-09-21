// POE Searcher - Embedded Interface Content Script
console.log('🎯 POE Searcher content script loaded on:', window.location.href)

// Embed stat mappings directly
const POE_STAT_MAPPINGS = {
  mappings: {
    // === PSEUDO STATS ===
    'to maximum Life': {
      filterText: '# to maximum Life',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Life/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to maximum Mana': {
      filterText: '# to maximum Mana',
      group: 'explicit',
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
      filterText: '#% to all Elemental Resistances',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to all Elemental Resistances/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Cold Resistance': {
      filterText: '+#% total to Cold Resistance',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Cold Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Fire Resistance': {
      filterText: '+#% total to Fire Resistance',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Fire Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Lightning Resistance': {
      filterText: '+#% total to Lightning Resistance',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Lightning Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Chaos Resistance': {
      filterText: '+#% total to Chaos Resistance',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Chaos Resistance/)
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
      filterText: '# to Dexterity',
      group: 'explicit',
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
    'to all Attributes': {
      filterText: '+# total to all Attributes',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to all Attributes/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Movement Speed': {
      filterText: '#% increased Movement Speed',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Movement Speed/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total increased maximum Energy Shield': {
      filterText: '#% total increased maximum Energy Shield',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+total increased maximum Energy Shield/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === EXPLICIT STATS ===
    // Life and Mana
    ' to maximum Life': {
      filterText: '# to maximum Life',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Life/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to maximum Mana': {
      filterText: '# to maximum Mana',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Mana/)
        return match ? parseInt(match[1]) : null
      }
    },

    // Resistances
    '% to Cold Resistance': {
      filterText: '#% to Cold Resistance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Cold Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% to Fire Resistance': {
      filterText: '#% to Fire Resistance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Fire Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% to Lightning Resistance': {
      filterText: '#% to Lightning Resistance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Lightning Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% to all Elemental Resistances': {
      filterText: '#% to all Elemental Resistances',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to all Elemental Resistances/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% to Chaos Resistance': {
      filterText: '#% to Chaos Resistance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Chaos Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },

    // Attributes
    ' to Intelligence': {
      filterText: '# to Intelligence',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Intelligence/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Dexterity': {
      filterText: '# to Dexterity',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Dexterity/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Strength': {
      filterText: '# to Strength',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Strength/)
        return match ? parseInt(match[1]) : null
      }
    },

    // Damage and Energy Shield
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
    'increased Spell Damage': {
      filterText: '#% increased Spell Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Spell Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Physical Damage': {
      filterText: '#% increased Physical Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Physical Damage/)
        return match ? parseInt(match[1]) : null
      }
    },

    // Utility
    'increased Rarity of Items found': {
      filterText: '#% increased Rarity of Items found',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Rarity of Items found/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Movement Speed': {
      filterText: '#% increased Movement Speed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Movement Speed/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Cast Speed': {
      filterText: '#% increased Cast Speed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Cast Speed/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Mana Regeneration Rate': {
      filterText: '#% increased Mana Regeneration Rate',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Mana Regeneration Rate/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' Life Regeneration per second': {
      filterText: '# Life Regeneration per second',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+(?:\.\d+)?)\s+Life Regeneration per second/)
        return match ? parseFloat(match[1]) : null
      }
    },
    ' to Accuracy Rating': {
      filterText: '# to Accuracy Rating',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Accuracy Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Spirit': {
      filterText: '# to Spirit',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Spirit/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === TASK 1: CRITICAL DAMAGE STATS ===
    'Adds # to # Physical Damage': {
      filterText: 'Adds # to # Physical Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Physical Damage/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Physical Damage to Attacks': {
      filterText: 'Adds # to # Physical Damage to Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Physical Damage to Attacks/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Fire Damage': {
      filterText: 'Adds # to # Fire Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Fire Damage/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Cold Damage': {
      filterText: 'Adds # to # Cold Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Cold Damage/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Lightning Damage': {
      filterText: 'Adds # to # Lightning Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Lightning Damage/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Fire damage to Attacks': {
      filterText: 'Adds # to # Fire damage to Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Fire damage to Attacks/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Cold damage to Attacks': {
      filterText: 'Adds # to # Cold damage to Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Cold damage to Attacks/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Lightning damage to Attacks': {
      filterText: 'Adds # to # Lightning damage to Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Lightning damage to Attacks/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    '% increased Fire Damage': {
      filterText: '#% increased Fire Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Fire Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Cold Damage': {
      filterText: '#% increased Cold Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Cold Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Lightning Damage': {
      filterText: '#% increased Lightning Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Lightning Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Elemental Damage': {
      filterText: '#% increased Elemental Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Elemental Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Attack Damage': {
      filterText: '#% increased Attack Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Attack Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Projectile Damage': {
      filterText: '#% increased Projectile Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Projectile Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Melee Damage': {
      filterText: '#% increased Melee Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Melee Damage/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === TASK 2: CRITICAL HIT & SPEED STATS ===
    '% increased Critical Hit Chance': {
      filterText: '#% increased Critical Hit Chance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Critical Hit Chance/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Critical Damage Bonus': {
      filterText: '#% increased Critical Damage Bonus',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Critical Damage Bonus/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% to Critical Hit Chance': {
      filterText: '#% to Critical Hit Chance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+to Critical Hit Chance/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% to Critical Damage Bonus': {
      filterText: '#% to Critical Damage Bonus',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+to Critical Damage Bonus/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Attack Speed': {
      filterText: '#% increased Attack Speed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Attack Speed (Local)': {
      filterText: '#% increased Attack Speed (Local)',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Attack and Cast Speed': {
      filterText: '#% increased Attack and Cast Speed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Attack and Cast Speed/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Critical Hit Chance for Attacks': {
      filterText: '#% increased Critical Hit Chance for Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Critical Hit Chance for Attacks/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Critical Hit Chance for Spells': {
      filterText: '#% increased Critical Hit Chance for Spells',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Critical Hit Chance for Spells/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Critical Damage Bonus for Attack Damage': {
      filterText: '#% increased Critical Damage Bonus for Attack Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Critical Damage Bonus for Attack Damage/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === TASK 3: DEFENSE STATS ===
    ' to Armour': {
      filterText: '# to Armour',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Armour/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Evasion Rating': {
      filterText: '# to Evasion Rating',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Evasion Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Armour': {
      filterText: '#% increased Armour',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Armour/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Evasion Rating': {
      filterText: '#% increased Evasion Rating',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Evasion Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Armour (Local)': {
      filterText: '# to Armour (Local)',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Armour/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Evasion Rating (Local)': {
      filterText: '# to Evasion Rating (Local)',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Evasion Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Armour (Local)': {
      filterText: '#% increased Armour (Local)',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Armour/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Evasion Rating (Local)': {
      filterText: '#% increased Evasion Rating (Local)',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Evasion Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Block chance': {
      filterText: '#% increased Block chance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Block chance/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% to Block chance': {
      filterText: '#% to Block chance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+to Block chance/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Armour and Evasion': {
      filterText: '#% increased Armour and Evasion',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Armour and Evasion/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Armour and Energy Shield': {
      filterText: '#% increased Armour and Energy Shield',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Armour and Energy Shield/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === TASK 4: MISSING PSEUDO TOTALS ===
    'total maximum Life': {
      filterText: '+# total maximum Life',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Life/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total maximum Mana': {
      filterText: '+# total maximum Mana',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Mana/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total to Dexterity': {
      filterText: '+# total to Dexterity',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Dexterity/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total Elemental Resistance': {
      filterText: '+#% total Elemental Resistance',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+.*Elemental.*Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total Resistance': {
      filterText: '+#% total Resistance',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+.*Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total to all Elemental Resistances': {
      filterText: '+#% total to all Elemental Resistances',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+to all Elemental Resistances/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total Elemental Resistances': {
      filterText: '# total Elemental Resistances',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)\s+.*Elemental.*Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total Resistances': {
      filterText: '# total Resistances',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)\s+.*Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === TASK 5: SKILL GEM LEVELS ===
    ' to Level of all Spell Skills': {
      filterText: '# to Level of all Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Fire Spell Skills': {
      filterText: '# to Level of all Fire Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Fire Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Cold Spell Skills': {
      filterText: '# to Level of all Cold Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Cold Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Lightning Spell Skills': {
      filterText: '# to Level of all Lightning Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Lightning Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Attack Skills': {
      filterText: '# to Level of all Attack Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Attack Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Melee Skills': {
      filterText: '# to Level of all Melee Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Melee Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Projectile Skills': {
      filterText: '# to Level of all Projectile Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Projectile Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Minion Skills': {
      filterText: '# to Level of all Minion Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Minion Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Physical Spell Skills': {
      filterText: '# to Level of all Physical Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Physical Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Level of all Chaos Spell Skills': {
      filterText: '# to Level of all Chaos Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Chaos Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === TASK 6: WEAPON-SPECIFIC DAMAGE ===
    '% increased Damage with Bows': {
      filterText: '#% increased Damage with Bows',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Damage with Bows/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Attack Speed with Bows': {
      filterText: '#% increased Attack Speed with Bows',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed with Bows/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Damage with Crossbows': {
      filterText: '#% increased Damage with Crossbows',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Damage with Crossbows/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Attack Speed with Crossbows': {
      filterText: '#% increased Attack Speed with Crossbows',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed with Crossbows/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Damage with Maces': {
      filterText: '#% increased Damage with Maces',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Damage with Maces/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Damage with Quarterstaves': {
      filterText: '#% increased Damage with Quarterstaves',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Damage with Quarterstaves/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Attack Speed with Quarterstaves': {
      filterText: '#% increased Attack Speed with Quarterstaves',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed with Quarterstaves/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Damage with Spears': {
      filterText: '#% increased Damage with Spears',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Damage with Spears/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Attack Speed with Spears': {
      filterText: '#% increased Attack Speed with Spears',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed with Spears/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Critical Damage Bonus with Spears': {
      filterText: '#% increased Critical Damage Bonus with Spears',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Critical Damage Bonus with Spears/)
        return match ? parseInt(match[1]) : null
      }
    },
    'Bow Attacks fire # additional Arrows': {
      filterText: 'Bow Attacks fire # additional Arrows',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Bow Attacks fire (\d+) additional Arrows/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Accuracy Rating with Bows': {
      filterText: '#% increased Accuracy Rating with Bows',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Accuracy Rating with Bows/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Stun Buildup with Maces': {
      filterText: '#% increased Stun Buildup with Maces',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Stun Buildup with Maces/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Freeze Buildup with Quarterstaves': {
      filterText: '#% increased Freeze Buildup with Quarterstaves',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Freeze Buildup with Quarterstaves/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Crossbow Reload Speed': {
      filterText: '#% increased Crossbow Reload Speed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Crossbow Reload Speed/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === TASK 7: ADVANCED STATS ===
    '% increased maximum Life': {
      filterText: '#% increased maximum Life',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased maximum Life/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased maximum Mana': {
      filterText: '#% increased maximum Mana',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased maximum Mana/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to maximum Energy Shield (Local)': {
      filterText: '# to maximum Energy Shield (Local)',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to maximum Energy Shield/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Accuracy Rating': {
      filterText: '#% increased Accuracy Rating',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Accuracy Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Accuracy Rating (Local)': {
      filterText: '# to Accuracy Rating (Local)',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Accuracy Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Life Recovery from Flasks': {
      filterText: '#% increased Life Recovery from Flasks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Life Recovery from Flasks/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Mana Recovery from Flasks': {
      filterText: '#% increased Mana Recovery from Flasks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Mana Recovery from Flasks/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Flask Effect Duration': {
      filterText: '#% increased Flask Effect Duration',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Flask Effect Duration/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Flask Charges gained': {
      filterText: '#% increased Flask Charges gained',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Flask Charges gained/)
        return match ? parseInt(match[1]) : null
      }
    },
    'Gain # Life per Enemy Killed': {
      filterText: 'Gain # Life per Enemy Killed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Gain (\d+) Life per Enemy Killed/)
        return match ? parseInt(match[1]) : null
      }
    },
    'Gain # Mana per Enemy Killed': {
      filterText: 'Gain # Mana per Enemy Killed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Gain (\d+) Mana per Enemy Killed/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% increased Area of Effect': {
      filterText: '#% increased Area of Effect',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Area of Effect/)
        return match ? parseInt(match[1]) : null
      }
    }
  }
}

// Stat mapping functions
function findStatMapping(statText) {
  for (const [key, mapping] of Object.entries(POE_STAT_MAPPINGS.mappings)) {
    const value = mapping.extractValue(statText)
    if (value !== null) {
      return { ...mapping, value, originalText: statText, searchKey: key }
    }
  }
  return null
}

function findDropdownOption(filterText, options) {
  console.log(`🔍 findDropdownOption: Looking for "${filterText}"`)

  const searchText = filterText.replace(/#/g, '').replace(/\s+/g, ' ').trim()
  console.log(`🔍 Normalized search text: "${searchText}"`)

  let exactMatch = null
  let partialMatch = null

  // Look for exact match first, then partial match
  for (const option of options) {
    const optionText = option.textContent.trim()
    const normalizedOption = optionText.replace(/#/g, '').replace(/\s+/g, ' ').trim()

    console.log(`🔍 Checking option: "${normalizedOption}"`)

    // Check for exact match (same length and content)
    if (normalizedOption === searchText) {
      console.log(`✅ Exact match found: "${optionText}"`)
      exactMatch = option
      break
    }

    // Check for partial match (option contains our text)
    if (!partialMatch && normalizedOption.includes(searchText)) {
      console.log(`⚠️ Partial match found: "${optionText}"`)
      partialMatch = option
    }
  }

  const result = exactMatch || partialMatch
  if (result) {
    console.log(`✅ Selected: "${result.textContent.trim()}"`)
    return result
  }

  console.log(`❌ No match found in ${options.length} options`)
  return null
}

// Make functions available globally
window.POE_STAT_MAPPINGS = POE_STAT_MAPPINGS
window.findStatMapping = findStatMapping
window.findDropdownOption = findDropdownOption

console.log('✅ Stat mappings loaded directly in content script')

// Item Class to Category mappings
const ITEM_CLASS_TO_CATEGORY = {
  'Amulets': 'Amulet',
  'Rings': 'Ring',
  'Belts': 'Belt',
  'Body Armour': 'Body Armour',
  'Helmets': 'Helmet',
  'Gloves': 'Gloves',
  'Boots': 'Boots',
  'Shields': 'Shield',
  'Quivers': 'Quiver',
  'Claws': 'Claw',
  'Daggers': 'Dagger',
  'One Handed Swords': 'One-Handed Sword',
  'One Handed Axes': 'One-Handed Axe',
  'One Handed Maces': 'One-Handed Mace',
  'Spears': 'Spear',
  'Flails': 'Flail',
  'Two Handed Swords': 'Two-Handed Sword',
  'Two Handed Axes': 'Two-Handed Axe',
  'Two Handed Maces': 'Two-Handed Mace',
  'Quarterstaffs': 'Quarterstaff',
  'Bows': 'Bow',
  'Crossbows': 'Crossbow',
  'Wands': 'Wand',
  'Sceptres': 'Sceptre',
  'Staves': 'Staff',
  'Focuses': 'Focus',
  'Bucklers': 'Buckler',
  'Skill Gems': 'Skill Gem',
  'Support Gems': 'Support Gem',
  'Meta Gems': 'Meta Gem',
  'Life Flasks': 'Life Flask',
  'Mana Flasks': 'Mana Flask',
  'Waystones': 'Waystone',
  'Divination Cards': 'Divination Card',
  'Runes': 'Rune',
  'Soul Cores': 'Soul Core',
  'Talismans': 'Talisman'
}

console.log('✅ Item class mappings loaded')

// Main extension class with embedded UI
class POESearcherInterface {
  constructor() {
    this.container = null
    this.isExpanded = false
    this.initialized = false
    this.settings = {
      includeImplicits: false  // Default: don't include implicit stats
    }

    // Initialize persistent state management
    this.initializePersistentState()

    // Initialize other properties
    this.initializeProperties()
  }

  // Persistent state management
  async initializePersistentState() {
    // Initialize global state object
    if (!window.POE_EXECUTION_STATE) {
      window.POE_EXECUTION_STATE = {
        isExecuting: false,
        shouldStop: false,
        executionId: null,
        currentSearchData: null,
        currentStatIndex: 0,
        processedStats: [],
        lastStatus: null,
        previewData: null
      }
    }

    // Load state from Chrome storage
    try {
      const result = await chrome.storage.local.get(['poe_execution_state'])
      if (result.poe_execution_state) {
        Object.assign(window.POE_EXECUTION_STATE, result.poe_execution_state)
        console.log('📁 Loaded execution state from storage:', window.POE_EXECUTION_STATE)
      }
    } catch (error) {
      console.log('⚠️ Could not load execution state from storage:', error.message)
    }

    // Restore UI based on loaded state
    this.restoreExecutionUI()
  }

  // Save state to persistent storage
  async saveExecutionState() {
    try {
      await chrome.storage.local.set({ poe_execution_state: window.POE_EXECUTION_STATE })
    } catch (error) {
      console.log('⚠️ Could not save execution state:', error.message)
    }
  }

  // Restore UI based on execution state
  restoreExecutionUI() {
    // Only restore if container exists (after initialization)
    if (!this.container) return

    const state = window.POE_EXECUTION_STATE

    if (state.isExecuting) {
      console.log('🔄 Restoring execution UI state')

      // Restore status or show generic executing message
      const statusMsg = state.lastStatus || `🔄 Search in progress... (${state.currentStatIndex}/${state.currentSearchData?.stats?.length || 0})`
      this.updateStatus(statusMsg, 'info')
    } else {

      // Restore last status if available
      if (state.lastStatus) {
        this.updateStatus(state.lastStatus, 'info')
      }
    }

    // Restore preview data if available
    if (state.previewData) {
      console.log('📁 Restoring preview data')
      this.showPreview(state.previewData)
    }
  }

  // Getters for execution state
  get isExecuting() {
    return window.POE_EXECUTION_STATE?.isExecuting || false
  }

  get shouldStop() {
    return window.POE_EXECUTION_STATE?.shouldStop || false
  }

  // Setters for execution state with persistence
  set isExecuting(value) {
    if (!window.POE_EXECUTION_STATE) window.POE_EXECUTION_STATE = {}
    window.POE_EXECUTION_STATE.isExecuting = value
    this.saveExecutionState()
  }

  set shouldStop(value) {
    if (!window.POE_EXECUTION_STATE) window.POE_EXECUTION_STATE = {}
    window.POE_EXECUTION_STATE.shouldStop = value
    this.saveExecutionState()
  }

  // Initialize selectors and other properties
  initializeProperties() {
    this.selectors = {
      // POE trade site selectors (updated from actual site)
      searchButton: '.search-btn',
      clearButton: '.clear-btn',
      itemSearch: '.multiselect__input',
      itemOptions: '.multiselect__option',
      showFiltersButton: '.toggle-search-btn',
      statDropdown: '.filter-group-select .multiselect__input',
      statOptions: '.multiselect__option'
    }
  }

  // Initialize the extension
  async initialize() {
    if (this.initialized) return

    console.log('🚀 Initializing POE Searcher Interface...')

    // Create embedded interface
    this.createEmbeddedInterface()

    // Listen for extension icon clicks
    this.setupExtensionClickHandler()

    // Restore execution state UI after interface is created
    this.restoreExecutionUI()

    this.initialized = true
    console.log('✅ POE Searcher Interface ready')
  }

  // Create the embedded accordion-style interface
  createEmbeddedInterface() {
    // Remove existing interface
    const existing = document.getElementById('poe-searcher-interface')
    if (existing) existing.remove()

    // Create main container
    this.container = document.createElement('div')
    this.container.id = 'poe-searcher-interface'

    // Initial collapsed state
    this.container.innerHTML = this.getCollapsedHTML()
    this.applyCollapsedStyles()

    // Add click handler for toggle
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.poe-header')) {
        this.toggleInterface()
      }
    })

    // Add to page
    document.body.appendChild(this.container)
    console.log('✅ Embedded interface created')
  }

  // Get HTML for collapsed state
  getCollapsedHTML() {
    return `
      <div class="poe-header">
        <span class="poe-icon">⚔️</span>
        <span class="poe-title">POE Searcher</span>
        <span class="poe-status">Ready</span>
        <span class="poe-toggle">▼</span>
      </div>
    `
  }

  // Get HTML for expanded state
  getExpandedHTML() {
    return `
      <div class="poe-header">
        <span class="poe-icon">⚔️</span>
        <span class="poe-title">POE Searcher</span>
        <span class="poe-status">Ready</span>
        <span class="poe-toggle">▲</span>
      </div>
      <div class="poe-content">
        <div class="poe-section">
          <label class="poe-label">📋 Paste Item Data:</label>
          <textarea id="poe-item-input" class="poe-textarea"
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
            <span class="poe-checkbox-text">Include implicit stats</span>
            <span class="poe-disabled-note">(disabled)</span>
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

  // Apply styles for collapsed state
  applyCollapsedStyles() {
    Object.assign(this.container.style, {
      position: 'fixed',
      top: '0px',
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
      top: '0px',
      right: '0px',
      width: '400px',
      maxHeight: '600px',
      backgroundColor: 'white',
      color: '#333',
      borderRadius: '8px',
      fontSize: '13px',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      border: '2px solid #d4af37',
      zIndex: '2147483647',
      overflow: 'hidden'
    })

    // Style header for expanded state
    const header = this.container.querySelector('.poe-header')
    if (header) {
      Object.assign(header.style, {
        padding: '12px 15px',
        backgroundColor: '#d4af37',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        fontWeight: 'bold'
      })
    }

    // Style content area
    const content = this.container.querySelector('.poe-content')
    if (content) {
      Object.assign(content.style, {
        padding: '15px',
        maxHeight: '500px',
        overflowY: 'auto'
      })
    }

    // Style textarea
    const textarea = this.container.querySelector('.poe-textarea')
    if (textarea) {
      Object.assign(textarea.style, {
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '8px',
        fontFamily: 'Courier New, monospace',
        fontSize: '11px',
        resize: 'vertical',
        boxSizing: 'border-box'
      })
    }

    // Style buttons
    const buttons = this.container.querySelectorAll('.poe-btn')
    buttons.forEach(btn => {
      Object.assign(btn.style, {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '5px',
        transition: 'background-color 0.2s'
      })
    })

    // Primary button style
    const primaryBtn = this.container.querySelector('.poe-btn-primary')
    if (primaryBtn) {
      Object.assign(primaryBtn.style, {
        backgroundColor: '#d4af37',
        color: 'white'
      })
    }

    // Secondary button style
    const secondaryBtn = this.container.querySelector('.poe-btn-secondary')
    if (secondaryBtn) {
      Object.assign(secondaryBtn.style, {
        backgroundColor: '#6c757d',
        color: 'white'
      })
    }

    // Stop button style
    const stopBtn = this.container.querySelector('.poe-btn-stop')
    if (stopBtn) {
      Object.assign(stopBtn.style, {
        backgroundColor: '#dc3545',
        color: 'white'
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

  // Toggle between collapsed and expanded states
  toggleInterface() {
    this.isExpanded = !this.isExpanded

    if (this.isExpanded) {
      this.container.innerHTML = this.getExpandedHTML()
      this.applyExpandedStyles()
      this.setupEventHandlers()
      console.log('📖 Interface expanded')
    } else {
      this.container.innerHTML = this.getCollapsedHTML()
      this.applyCollapsedStyles()
      console.log('📕 Interface collapsed')
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
    // Clear any existing handlers to prevent duplicates
    this.clearEventHandlers()

    const searchBtn = this.container.querySelector('#poe-search-btn')
    const textarea = this.container.querySelector('#poe-item-input')
    const statusBox = this.container.querySelector('#poe-status')

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
        const validation = this.validatePOEItemFormat(text)
        if (!validation.isValid) {
          this.updateStatus(`⚠️ Invalid format: ${validation.error}`, 'error')
          this.hidePreview()
          return
        }

        const parsed = this.parseItem(text)
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
        const validation = this.validatePOEItemFormat(text)
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

          const parsed = this.parseItem(text)
          this.showPreview(parsed)
          this.updateStatus('🔄 Searching...', 'info')

          // Collapse interface to get out of the way during automation
          setTimeout(() => {
            if (this.isExpanded && this.isExecuting) {
              this.toggleInterface()
              console.log('🔄 Collapsed interface during automation')
            }
          }, 500)

          const result = await this.performSearch(parsed)

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
          }, 500)
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
            const validation = this.validatePOEItemFormat(result.lastItem)
            if (validation.isValid) {
              const parsed = this.parseItem(result.lastItem)
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

    // Include implicits checkbox (disabled for now)
    const implicitCheckbox = this.container.querySelector('#poe-include-implicits')
    if (implicitCheckbox) {
      implicitCheckbox.addEventListener('change', () => {
        this.settings.includeImplicits = implicitCheckbox.checked
        console.log(`🔧 Include implicits setting: ${this.settings.includeImplicits}`)

        // Re-parse current item if there's text
        if (textarea && textarea.value.trim()) {
          const parsed = this.parseItem(textarea.value.trim())
          this.showPreview(parsed)
        }
      })
    }
  }

  // Update status message
  updateStatus(message, type = 'info') {
    const statusBox = this.container.querySelector('#poe-status')
    if (!statusBox) return

    statusBox.textContent = message

    // Save status to persistent state
    if (window.POE_EXECUTION_STATE) {
      window.POE_EXECUTION_STATE.lastStatus = message
      this.saveExecutionState()
    }

    // Update status box styling based on type
    const colors = {
      success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
      error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
      info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
    }

    const style = colors[type] || colors.info
    Object.assign(statusBox.style, {
      backgroundColor: style.bg,
      color: style.color,
      borderColor: style.border
    })
  }



  // Show preview of parsed item
  showPreview(parsedItem) {
    const preview = this.container.querySelector('#poe-preview')
    const previewContent = this.container.querySelector('#poe-preview-content')

    if (!preview || !previewContent) return

    // Save preview data to persistent state
    if (window.POE_EXECUTION_STATE) {
      window.POE_EXECUTION_STATE.previewData = parsedItem
      this.saveExecutionState()
    }

    // Build preview HTML
    let html = ''

    // Show basic info
    html += `<div style="margin-bottom: 8px; color: #666;">
      <strong>${parsedItem.itemClass}</strong> •
      <strong style="color: ${parsedItem.rarity === 'Rare' ? '#FFFF77' : parsedItem.rarity === 'Unique' ? '#AF6025' : '#888'};">${parsedItem.rarity}</strong>
    </div>`

    if (parsedItem.name) {
      html += `<div style="margin-bottom: 4px;">📌 <strong>${parsedItem.name}</strong></div>`
    }

    if (parsedItem.baseType) {
      html += `<div style="margin-bottom: 8px; color: #666;">Base: ${parsedItem.baseType}</div>`
    }

    // Show detected stats
    if (parsedItem.stats.length > 0) {
      html += '<div style="border-top: 1px solid #ddd; margin-top: 8px; padding-top: 8px;">'
      html += '<div style="margin-bottom: 4px; font-weight: bold;">Detected Modifiers:</div>'
      parsedItem.stats.forEach(stat => {
        // Highlight different stat types
        let statColor = '#333'
        if (stat.includes('% increased')) statColor = '#8888FF'
        else if (stat.includes('to maximum')) statColor = '#FF6666'
        else if (stat.includes('% more')) statColor = '#FFB366'

        html += `<div style="margin: 2px 0; padding-left: 12px; color: ${statColor};">• ${stat}</div>`
      })
      html += '</div>'
    } else {
      html += '<div style="color: #999; font-style: italic;">No modifiers detected</div>'
    }

    previewContent.innerHTML = html
    preview.style.display = 'block'
  }

  // Hide preview
  hidePreview() {
    const preview = this.container.querySelector('#poe-preview')
    if (preview) {
      preview.style.display = 'none'
    }
  }

  // Validate POE item format
  validatePOEItemFormat(text) {
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
  parseItem(text) {
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
      } else if (line.includes('% increased') || line.includes('to maximum') || line.includes('% more') ||
                 line.includes('to Intelligence') || line.includes('to Dexterity') || line.includes('to Strength') ||
                 line.includes('to all Elemental Resistances') || line.includes('% to all Elemental Resistances') ||
                 line.includes('% to Cold Resistance') || line.includes('% to Fire Resistance') ||
                 line.includes('% to Lightning Resistance') || line.includes('% to Chaos Resistance') ||
                 line.includes('to all Attributes') || line.includes(' to Accuracy Rating') ||
                 line.includes(' to Spirit') || line.includes(' Life Regeneration per second') ||
                 line.includes('Adds ') || line.includes('Gain ') || line.includes('increased Cast Speed') ||
                 line.includes('increased Spell Damage') || line.includes('increased Physical Damage') ||
                 line.includes('increased Mana Regeneration Rate')) {

        // Check if we should include implicit stats
        const isImplicit = line.includes('(implicit)')
        if (!isImplicit || this.settings.includeImplicits) {
          parsed.stats.push(line)
        }
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

  // Perform search on trade site
  async performSearch(itemData) {
    console.log('🔍 Performing search with item data:', itemData)

    try {
      console.log('📋 Step 1: Clearing existing search')
      await this.clearSearch()

      console.log('📋 Step 2: Setting item type')
      await this.setItemType(itemData.itemClass, itemData.baseType)

      // Expand filters if we have stats to add
      if (itemData.stats.length > 0) {
        console.log(`📋 Step 3: Expanding filters for ${itemData.stats.length} stats`)
        const filtersExpanded = await this.expandFilters()

        if (!filtersExpanded) {
          throw new Error('Failed to expand filters section')
        }

        console.log('📋 Step 3.5: Setting filter categories (only Type Filters enabled)')
        await this.setFilterCategories()

        console.log('📋 Step 4: Adding stat filters')
        await this.addStatFilters(itemData.stats)
      } else {
        console.log('📋 Step 3-4: Skipping filter expansion (no stats found)')
      }

      console.log('📋 Step 5: Executing search')
      await this.executeSearch()

      console.log('✅ Search completed successfully')
      return { success: true, message: 'Search completed' }

    } catch (error) {
      console.error('❌ Search failed at some step:', error)
      return { success: false, error: error.message }
    }
  }

  // Clear search form
  async clearSearch() {
    console.log('🧹 Attempting to clear search form')

    try {
      // Look for the clear button in the controls div
      const clearBtn = document.querySelector('.clear-btn')

      if (!clearBtn) {
        console.log('⚠️ Clear button (.clear-btn) not found')
        return
      }

      if (clearBtn.offsetParent === null || clearBtn.disabled) {
        console.log('⚠️ Clear button found but not visible or disabled')
        return
      }

      console.log('✅ Found clear button: .clear-btn')
      console.log(`📋 Clear button text: "${clearBtn.textContent.trim()}"`)
      console.log(`📋 Clear button visible: ${clearBtn.offsetParent !== null}`)
      console.log(`📋 Clear button enabled: ${!clearBtn.disabled}`)

      console.log('🧹 Clicking clear button')
      clearBtn.click()
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('✅ Clear button clicked successfully')
    } catch (error) {
      console.log('⚠️ Error clearing search (non-critical):', error.message)
    }
  }

  // Set item type in search form
  async setItemType(itemClass, baseType) {
    console.log(`🎯 Setting item category for Item Class: "${itemClass}"`)

    // Map the Item Class to the category dropdown option
    const categoryOption = ITEM_CLASS_TO_CATEGORY[itemClass]
    if (!categoryOption) {
      console.log(`⚠️ No category mapping found for "${itemClass}", skipping category selection`)
      return
    }

    console.log(`📂 Mapping "${itemClass}" to category: "${categoryOption}"`)

    // Find the item category dropdown (different from main search)
    // This should be the category filter dropdown, not the main search
    const categoryDropdowns = document.querySelectorAll('.multiselect__input')
    let categoryInput = null

    // Look for the category dropdown (usually has placeholder "Any" or similar)
    for (const dropdown of categoryDropdowns) {
      const placeholder = dropdown.placeholder
      if (placeholder === 'Any' || placeholder === 'Any Category' || placeholder.includes('Category')) {
        categoryInput = dropdown
        break
      }
    }

    // If not found by placeholder, try to find by context (look for one that's not the main search)
    if (!categoryInput) {
      for (const dropdown of categoryDropdowns) {
        if (dropdown.placeholder !== 'Search Items...' && dropdown.placeholder !== '+ Add Stat Filter') {
          categoryInput = dropdown
          break
        }
      }
    }

    if (!categoryInput) {
      console.log('⚠️ Item category dropdown not found, skipping category selection')
      return
    }

    console.log(`📋 Found category dropdown with placeholder: "${categoryInput.placeholder}"`)

    try {
      // Step 1: Focus and clear the category input
      categoryInput.focus()
      categoryInput.value = ''
      await new Promise(resolve => setTimeout(resolve, 100))

      // Step 2: Type the category option
      console.log(`⌨️ Typing category: "${categoryOption}"`)
      categoryInput.value = categoryOption
      categoryInput.dispatchEvent(new Event('input', { bubbles: true }))
      await new Promise(resolve => setTimeout(resolve, 200))

      // Step 3: Press Enter to select
      console.log(`⏎ Pressing Enter to select category`)
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true
      })
      categoryInput.dispatchEvent(enterEvent)
      await new Promise(resolve => setTimeout(resolve, 300))

      console.log(`✅ Item category set to: "${categoryOption}"`)
    } catch (error) {
      console.log(`❌ Failed to set item category: ${error.message}`)
    }
  }

  // Execute search
  async executeSearch() {
    const searchBtn = document.querySelector(this.selectors.searchButton)
    if (!searchBtn) {
      throw new Error('Search button not found')
    }

    if (searchBtn.disabled) {
      throw new Error('Search button is disabled')
    }

    searchBtn.click()
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Expand the filters section
  async expandFilters() {
    console.log('🔍 Looking for show/hide filters button...')

    // Try multiple selectors for the show filters button
    const possibleSelectors = [
      '.toggle-search-btn',
      '.btn.toggle-search-btn',
      '[class*="toggle"]'
    ]

    let showFiltersBtn = null
    for (const selector of possibleSelectors) {
      showFiltersBtn = document.querySelector(selector)
      if (showFiltersBtn) {
        console.log(`✅ Found toggle button with selector: ${selector}`)
        break
      }
    }

    if (!showFiltersBtn) {
      console.error('❌ Show/Hide filters button not found. Available buttons:')
      const allButtons = document.querySelectorAll('button')
      Array.from(allButtons).slice(0, 10).forEach(btn => {
        console.log(`  - ${btn.className}: "${btn.textContent.trim()}"`)
      })
      return false
    }

    // Check current state of filters
    const buttonText = showFiltersBtn.textContent.trim()
    console.log(`📋 Current button text: "${buttonText}"`)

    if (buttonText.includes('Hide Filters')) {
      console.log('📖 Filters already expanded')
      return true
    } else if (buttonText.includes('Show Filters')) {
      console.log('📖 Filters hidden, clicking to expand')
      showFiltersBtn.click()
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Verify expansion worked
      const newButtonText = showFiltersBtn.textContent.trim()
      console.log(`📋 After click, button text: "${newButtonText}"`)

      return newButtonText.includes('Hide Filters')
    } else {
      console.error(`❌ Unexpected button text: "${buttonText}"`)
      return false
    }
  }

  // Set filter categories - ensure only Type Filters is enabled
  async setFilterCategories() {
    console.log('🎛️ Configuring filter categories...')

    const filterCategories = [
      { name: 'Equipment Filters', enabled: false },
      { name: 'Requirements', enabled: false },
      { name: 'Endgame Filters', enabled: false },
      { name: 'Miscellaneous', enabled: false },
      { name: 'Trade Filters', enabled: false },
      { name: 'Type Filters', enabled: true }
    ]

    for (const category of filterCategories) {
      await this.toggleFilterCategory(category.name, category.enabled)
    }

    console.log('✅ Filter categories configured')
  }

  // Toggle a specific filter category on or off
  async toggleFilterCategory(categoryName, shouldBeEnabled) {
    console.log(`🎛️ Setting "${categoryName}" to ${shouldBeEnabled ? 'enabled' : 'disabled'}`)

    // Find the filter title span that contains the category name
    const filterTitle = Array.from(document.querySelectorAll('.filter-title')).find(el =>
      el.textContent.trim().includes(categoryName)
    )

    if (!filterTitle) {
      console.log(`⚠️ Could not find filter title for "${categoryName}"`)
      return
    }

    // Find the filter group container
    const filterGroup = filterTitle.closest('.filter-group')
    if (!filterGroup) {
      console.log(`⚠️ Could not find filter group container for "${categoryName}"`)
      return
    }

    // Check current state
    const isCurrentlyExpanded = filterGroup.classList.contains('expanded')
    const toggleBtn = filterGroup.querySelector('.toggle-btn')
    const isCurrentlyEnabled = !toggleBtn?.classList.contains('off')

    console.log(`📋 "${categoryName}" current state: expanded=${isCurrentlyExpanded}, enabled=${isCurrentlyEnabled}`)

    // Only toggle if the current state doesn't match the desired state
    if (isCurrentlyEnabled !== shouldBeEnabled) {
      console.log(`🔘 Clicking toggle button for "${categoryName}" (changing from ${isCurrentlyEnabled} to ${shouldBeEnabled})`)

      // Try clicking the toggle button first
      if (toggleBtn) {
        toggleBtn.click()
        await new Promise(resolve => setTimeout(resolve, 300))
      } else {
        // Fallback: click the filter title (which also has @click="toggleMe")
        console.log(`🔘 Fallback: clicking filter title for "${categoryName}"`)
        filterTitle.click()
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // Verify the change
      const newIsEnabled = !filterGroup.querySelector('.toggle-btn')?.classList.contains('off')
      console.log(`✅ "${categoryName}" toggled successfully: now ${newIsEnabled ? 'enabled' : 'disabled'}`)
    } else {
      console.log(`✓ "${categoryName}" is already ${shouldBeEnabled ? 'enabled' : 'disabled'}`)
    }
  }

  // Add stat filters based on item stats
  async addStatFilters(stats) {
    console.log('📊 Adding stat filters for:', stats)

    for (const stat of stats) {
      console.log(`🔍 Processing: "${stat}"`)

      const mapping = window.findStatMapping(stat)
      if (!mapping) {
        console.log(`⚠️ No mapping found for: "${stat}"`)
        continue
      }

      // Simple check: does this filter already exist?
      const existing = Array.from(document.querySelectorAll('.filter-title')).find(el =>
        el.textContent.includes(mapping.filterText.replace('#', ''))
      )
      if (existing) {
        console.log(`⏭️ Filter already exists: "${stat}"`)
        continue
      }

      console.log(`🎯 Adding filter: "${stat}" -> "${mapping.filterText}"`)

      try {
        const success = await this.addSingleStatFilter(mapping)
        if (!success) {
          console.error(`❌ Failed to add "${stat}" - stopping here`)
          return // Exit completely on first failure
        }
        console.log(`✅ Added: "${stat}"`)

        // Wait between stats
        await new Promise(resolve => setTimeout(resolve, 300))
      } catch (error) {
        console.error(`❌ Failed to add "${stat}":`, error)
        return // Exit completely on first failure
      }
    }
  }

  // Add a single stat filter - typing approach
  async addSingleStatFilter(mapping) {
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

    // Step 3.5: Check what options are available in the dropdown and select exact match
    // Only do exact matching for "Adds # to #" patterns to avoid affecting other searches
    const needsExactMatch = mapping.filterText.includes('Adds # to #')

    if (needsExactMatch) {
      console.log(`🎯 This is an "Adds # to #" stat - will look for exact match`)
    }

    const dropdownOptions = document.querySelectorAll('.multiselect__option span')
    console.log(`📋 Dropdown shows ${dropdownOptions.length} options after typing`)

    // Find and click the exact match (only for "Adds # to #" stats)
    let foundExact = false
    let firstFiveOptions = []

    for (let i = 0; i < dropdownOptions.length; i++) {
      const opt = dropdownOptions[i]
      const optText = opt.textContent.trim()

      // Log first 5 for debugging
      if (i < 5) {
        firstFiveOptions.push(optText)
      }

      // Check for exact match only if we need exact matching
      if (needsExactMatch && optText === mapping.filterText && !foundExact) {
        foundExact = true
        console.log(`✅ Found exact match at position ${i + 1}: "${optText}"`)

        // Click on the parent option element (the actual clickable element)
        const optionElement = opt.closest('.multiselect__option')
        if (optionElement) {
          optionElement.click()
          console.log('🎯 Clicked exact match option')

          // Wait for selection to register
          await new Promise(resolve => setTimeout(resolve, 300))

          // No need to press Enter after clicking
          console.log('✅ Option selected via click, skipping Enter key')

          // Skip the Enter key press since we already selected by clicking
          await new Promise(resolve => setTimeout(resolve, 200))

          // Jump to verification step
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

          // Now set the min value
          // Find the min input field for this filter
          const filterElement = newFilter.closest('.filter')
          if (filterElement) {
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

          return true
        }
      }
    }

    // Log what we saw in the dropdown
    console.log(`📋 First 5 options:`, firstFiveOptions)

    if (!foundExact && needsExactMatch) {
      console.log(`⚠️ No exact match found for "${mapping.filterText}" (expected for "Adds # to #" stats)`)
    } else if (!foundExact) {
      console.log(`⏎ No exact match needed - will press Enter to select first option`)
    }

    // Fallback to Enter key if no exact match was clicked
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

  // Step 1: Click "Add Stat Filter" button
  async clickAddStatFilter() {
    console.log('🔘 Looking for "Add Stat Filter" button...')

    // Try multiple selectors for the Add Stat Filter button/input (most specific first)
    const possibleSelectors = [
      'input[placeholder="+ Add Stat Filter"]',  // Exact match first
      '.filter-select-mutate .multiselect__input',  // From example HTML
      'input[placeholder*="Add Stat Filter"]',  // Contains match
      '.filter-group-select .multiselect__input',
      'input[placeholder*="Add Stat"]'
    ]

    let addStatButton = null
    for (const selector of possibleSelectors) {
      addStatButton = document.querySelector(selector)
      if (addStatButton) {
        console.log(`✅ Found Add Stat Filter with selector: ${selector}`)
        console.log(`📋 Placeholder: "${addStatButton.placeholder}"`)
        break
      }
    }

    if (!addStatButton) {
      console.error('❌ Add Stat Filter button not found. Available inputs:')
      const allInputs = document.querySelectorAll('.multiselect__input, input[placeholder*="Add"]')
      Array.from(allInputs).slice(0, 10).forEach(input => {
        console.log(`  - placeholder: "${input.placeholder}" class: "${input.className}" parent: "${input.parentElement?.className}"`)
      })
      return false
    }

    console.log(`✅ Found Add Stat Filter with selector: ${possibleSelectors.find(s => document.querySelector(s) === addStatButton)}`)
    console.log(`📋 Element details:`)
    console.log(`   - placeholder: "${addStatButton.placeholder}"`)
    console.log(`   - className: "${addStatButton.className}"`)
    console.log(`   - parent className: "${addStatButton.parentElement?.className}"`)
    console.log(`   - parent parent className: "${addStatButton.parentElement?.parentElement?.className}"`)
    console.log(`   - outerHTML: ${addStatButton.outerHTML.substring(0, 200)}`)

    // No dropdown close prevention needed for simplified approach

    console.log('🔘 Clicking Add Stat Filter button')
    addStatButton.focus()
    addStatButton.click()

    await new Promise(resolve => setTimeout(resolve, 800))

    // Verify dropdown opened and is visible
    const dropdown = document.querySelector('.multiselect__content-wrapper')
    const options = document.querySelectorAll('.multiselect__option')

    // Check multiple visibility indicators
    const computedStyle = dropdown ? window.getComputedStyle(dropdown) : null
    const displayVisible = computedStyle?.display !== 'none'
    const heightVisible = computedStyle?.height !== '0px'
    const opacityVisible = computedStyle?.opacity !== '0'
    const hasVisibleOptions = options.length > 0

    console.log(`📋 Dropdown element exists: ${!!dropdown}`)
    console.log(`📋 Dropdown display: ${computedStyle?.display}`)
    console.log(`📋 Dropdown height: ${computedStyle?.height}`)
    console.log(`📋 Dropdown opacity: ${computedStyle?.opacity}`)
    console.log(`📋 Options available: ${options.length}`)
    console.log(`📋 Visibility checks: display=${displayVisible}, height=${heightVisible}, opacity=${opacityVisible}`)

    // Consider it open if we have options, regardless of visibility style tricks
    const isUsable = hasVisibleOptions
    console.log(`📋 Dropdown usable: ${isUsable}`)

    return isUsable
  }

  // Step 2: Select specific stat from dropdown
  async selectStatFromDropdown(mapping) {
    console.log(`🎯 Looking for stat option: "${mapping.filterText}"`)

    const options = document.querySelectorAll('.multiselect__option')
    if (options.length === 0) {
      console.error('❌ No dropdown options available')
      return false
    }

    if (!window.findDropdownOption) {
      console.error('❌ findDropdownOption function not available')
      return false
    }

    console.log(`🔍 Looking for: "${mapping.filterText}"`)

    const matchingOption = window.findDropdownOption(mapping.filterText, options)

    if (matchingOption) {
      console.log(`🎯 Found matching option: "${matchingOption.textContent.trim()}"`)
      console.log(`🔍 Option element structure:`, matchingOption.outerHTML.substring(0, 200))
      console.log(`🔍 Option parent:`, matchingOption.parentElement?.className)
      console.log(`🔍 Option data attributes:`, {
        select: matchingOption.getAttribute('data-select'),
        selected: matchingOption.getAttribute('data-selected'),
        deselect: matchingOption.getAttribute('data-deselect')
      })

      // Check if option is clickable
      const isDisabled = matchingOption.classList.contains('multiselect__option--disabled')
      console.log(`🔍 Option disabled?`, isDisabled)

      if (isDisabled) {
        console.error(`❌ Cannot click disabled option: "${matchingOption.textContent.trim()}"`)
        return false
      }

      // Get initial state before clicking
      const initialDropdownState = document.querySelector('.multiselect__content-wrapper')?.style.display
      console.log(`🔍 Dropdown state before click:`, initialDropdownState)

      // Vue.js multiselect requires proper interaction
      console.log(`🔘 Attempting Vue.js multiselect selection...`)

      // Try clicking the outermost li element first - this is likely the actual clickable container
      const outerElement = matchingOption.closest('.multiselect__element')
      if (outerElement) {
        console.log(`🔘 Step 1: Clicking outermost element (.multiselect__element)`)
        console.log(`🔍 Outer element found: ${outerElement.className}`)

        outerElement.scrollIntoView({ behavior: 'instant', block: 'center' })
        await new Promise(resolve => setTimeout(resolve, 100))

        // Click the outer element with proper events
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          detail: 1
        })

        outerElement.click()
        outerElement.dispatchEvent(clickEvent)

        await new Promise(resolve => setTimeout(resolve, 500))
      }

      // Fallback: Try the option span element
      console.log(`🔘 Step 2: Focus and click option span`)
      matchingOption.focus()

      const mouseenterEvent = new MouseEvent('mouseenter', {
        bubbles: true,
        cancelable: true,
        view: window
      })
      matchingOption.dispatchEvent(mouseenterEvent)

      await new Promise(resolve => setTimeout(resolve, 100))

      const mousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 1
      })

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 1
      })

      const mouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 1
      })

      // Dispatch the sequence that Vue expects
      matchingOption.dispatchEvent(mousedownEvent)
      await new Promise(resolve => setTimeout(resolve, 50))
      matchingOption.dispatchEvent(clickEvent)
      await new Promise(resolve => setTimeout(resolve, 50))
      matchingOption.dispatchEvent(mouseupEvent)

      // Also try direct click method on parent
      matchingOption.click()

      // Wait and check for changes - increased wait time
      console.log(`⏳ Waiting for DOM changes...`)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Additional attempt - try scrolling into view and clicking again
      matchingOption.scrollIntoView({ behavior: 'instant', block: 'center' })
      await new Promise(resolve => setTimeout(resolve, 200))

      console.log(`🔘 Additional click attempt after scroll`)
      matchingOption.click()
      await new Promise(resolve => setTimeout(resolve, 500))

      // Check dropdown state after clicking
      const finalDropdownState = document.querySelector('.multiselect__content-wrapper')?.style.display
      console.log(`🔍 Dropdown state after click:`, finalDropdownState)

      // Check if any new DOM elements appeared
      const currentFilterGroups = document.querySelectorAll('.filter-group').length
      console.log(`🔍 Filter groups after click attempts: ${currentFilterGroups}`)

      // Check if dropdown closed (sign of successful selection)
      const dropdownClosed = finalDropdownState === 'none' || finalDropdownState !== initialDropdownState
      console.log(`🔍 Dropdown state changed:`, dropdownClosed)

      // Don't clean up event listeners yet - we need them for the second stage
      console.log('✅ Stage 1 complete - keeping event listeners for stage 2')

      return true
    } else {
      console.error(`❌ Could not find option for: "${mapping.filterText}"`)

      // Clean up event listeners on failure (fallback)
      if (this._preventCloseHandler) {
        document.removeEventListener('click', this._preventCloseHandler, true)
        document.removeEventListener('mousedown', this._preventCloseHandler, true)
        this._preventCloseHandler = null
        console.log('🧹 Cleaned up dropdown close prevention listeners (on stage 1 failure)')
      }

      return false
    }
  }

  // Step 2c: Select stat in new filter group (second stage)
  async selectStatInNewFilterGroup(filterGroup, mapping) {
    console.log(`🎯 Looking for Add Stat Filter in new filter group for: "${mapping.filterText}"`)

    // Find the Add Stat Filter input in this specific filter group
    const addStatInput = filterGroup.querySelector('input[placeholder*="Add Stat Filter"]') ||
                        filterGroup.querySelector('input[placeholder*="Add Stat"]') ||
                        filterGroup.querySelector('.multiselect__input')

    if (!addStatInput) {
      console.error('❌ Could not find Add Stat Filter input in new filter group')
      return false
    }

    console.log(`✅ Found Add Stat Filter input in new filter group`)

    // Click to open the dropdown in this specific filter group
    addStatInput.focus()
    addStatInput.click()

    // Wait for dropdown to open
    await new Promise(resolve => setTimeout(resolve, 500))

    // Get options from this specific dropdown
    const options = document.querySelectorAll('.multiselect__option')
    if (options.length === 0) {
      console.error('❌ No dropdown options available in new filter group')
      return false
    }

    console.log(`📋 Found ${options.length} options in new filter group dropdown`)

    // Find and click the matching option again
    const matchingOption = window.findDropdownOption(mapping.filterText, options)
    if (!matchingOption) {
      console.error(`❌ Could not find option "${mapping.filterText}" in new filter group`)
      return false
    }

    console.log(`🎯 Found matching option in new filter group: "${matchingOption.textContent.trim()}"`)

    // Click the option to create min/max inputs
    ['mousedown', 'mouseup', 'click'].forEach(eventType => {
      const event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window
      })
      matchingOption.dispatchEvent(event)
    })

    // Wait for min/max inputs to be created
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Verify min/max inputs were created
    const minInput = filterGroup.querySelector('input[placeholder="min"]')
    const maxInput = filterGroup.querySelector('input[placeholder="max"]')

    const success = minInput && maxInput
    console.log(`📋 Min/max inputs created: ${success}`)

    return success
  }

  // Step 3: Set minimum value in the newly created filter
  async setStatMinValue(value, preSelectionGroupCount) {
    console.log(`📝 Setting minimum value: ${value}`)

    // Use the passed pre-selection count
    const initialGroupCount = preSelectionGroupCount
    console.log(`📊 Pre-selection filter groups count: ${initialGroupCount}`)

    // Wait for a new filter group to be created using MutationObserver
    const newFilterGroup = await this.waitForNewFilterGroup(initialGroupCount)
    if (!newFilterGroup) {
      console.error('❌ No new filter group was created after dropdown selection')
      return false
    }

    // Wait for the min input field to be created in the new filter group
    const minInput = await this.waitForMinInput(newFilterGroup)
    if (!minInput) {
      console.error('❌ Could not find min input field in new filter group')
      return false
    }

    console.log(`📝 Found min input field in new filter group, setting value to ${value}`)

    // Clear any existing value first
    minInput.value = ''
    await new Promise(resolve => setTimeout(resolve, 100))

    // Set the new value
    minInput.focus()
    minInput.value = value
    minInput.dispatchEvent(new Event('input', { bubbles: true }))
    minInput.dispatchEvent(new Event('change', { bubbles: true }))

    // Extra wait to ensure value is set
    await new Promise(resolve => setTimeout(resolve, 300))

    // Verify the value was set correctly
    if (minInput.value === value.toString()) {
      console.log(`✅ Successfully set min value: ${value}`)
      return true
    } else {
      console.error(`❌ Value verification failed. Expected: ${value}, Found: ${minInput.value}`)
      return false
    }
  }

  // Helper method: Wait for new filter group using simple polling
  async waitForNewFilterGroup(initialCount, timeout = 5000) {
    return new Promise((resolve) => {
      const startTime = Date.now()
      const pollInterval = 100 // Check every 100ms

      const checkForNewGroup = () => {

        const currentGroups = document.querySelectorAll('.filter-group')
        console.log(`📊 Current filter groups count: ${currentGroups.length} (expecting > ${initialCount})`)

        if (currentGroups.length > initialCount) {
          const newFilterGroup = currentGroups[currentGroups.length - 1]
          console.log(`✅ Found new filter group (total: ${currentGroups.length})`)
          console.log(`🔍 New filter group structure:`, newFilterGroup.outerHTML.substring(0, 300))
          resolve(newFilterGroup)
          return true
        }

        if (Date.now() - startTime > timeout) {
          console.error(`❌ Timeout waiting for new filter group after ${timeout}ms`)
          console.log(`🔍 Current DOM state:`)
          console.log(`   - .filter-group elements: ${document.querySelectorAll('.filter-group').length}`)
          console.log(`   - .filter elements: ${document.querySelectorAll('.filter').length}`)
          console.log(`   - .multiselect elements: ${document.querySelectorAll('.multiselect').length}`)
          resolve(null)
          return true
        }

        return false
      }

      // Check immediately
      if (checkForNewGroup()) return

      // Simple polling approach
      const intervalId = setInterval(() => {
        if (checkForNewGroup()) {
          clearInterval(intervalId)
        }
      }, pollInterval)
    })
  }

  // Helper method: Wait for min input field using MutationObserver
  async waitForMinInput(filterGroup, timeout = 3000) {
    return new Promise((resolve) => {
      const startTime = Date.now()

      const checkForMinInput = () => {
        const minInput = filterGroup.querySelector('input[placeholder="min"]')
        if (minInput) {
          console.log(`✅ Found min input field in filter group`)
          resolve(minInput)
          return true
        }

        if (Date.now() - startTime > timeout) {
          console.error(`❌ Timeout waiting for min input field after ${timeout}ms`)
          resolve(null)
          return true
        }

        return false
      }

      // Check immediately
      if (checkForMinInput()) return

      // Set up MutationObserver for changes in the filter group
      const observer = new MutationObserver((mutations) => {
        if (checkForMinInput()) {
          observer.disconnect()
        }
      })

      observer.observe(filterGroup, {
        childList: true,
        subtree: true,
        attributes: true
      })

      // Cleanup timeout
      setTimeout(() => {
        observer.disconnect()
        if (Date.now() - startTime > timeout) {
          resolve(null)
        }
      }, timeout)
    })
  }

  // Handle extension icon clicks
  setupExtensionClickHandler() {
    // No background script - extension is content-script only
    console.log('📌 Extension running in content-script only mode')
  }
}

// Initialize the interface
const poeSearcher = new POESearcherInterface()

// Auto-initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => poeSearcher.initialize())
} else {
  poeSearcher.initialize()
}

console.log('🎯 POE Searcher content script ready')