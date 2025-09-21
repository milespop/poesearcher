// POE Stat Mappings Module
// Defines all stat mappings for POE trade site automation

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

    // === EXPLICIT RESISTANCE STATS ===
    'explicit to Fire Resistance': {
      filterText: '#% to Fire Resistance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to Fire Resistance/)
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
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Movement Speed/)
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
    'increased Spell Damage': {
      filterText: '#% increased Spell Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Spell Damage/)
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
    'increased Cast Speed': {
      filterText: '#% increased Cast Speed',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Cast Speed/)
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
    },
    'increased Mana Regeneration Rate': {
      filterText: '#% increased Mana Regeneration Rate',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)%\s+increased Mana Regeneration Rate/)
        return match ? parseInt(match[1]) : null
      }
    },
    'Life Regeneration per second': {
      filterText: '# Life Regeneration per second',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)\s+Life Regeneration per second/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Accuracy Rating': {
      filterText: '# to Accuracy Rating',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Accuracy Rating/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Spirit': {
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
        // Only match if it doesn't contain "to Attacks" (more specific pattern should handle that)
        const match = statText.match(/Adds (\d+) to (\d+) Physical Damage(?! to Attacks)/)
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
        // Only match if it doesn't contain "to Attacks" (more specific pattern should handle that)
        const match = statText.match(/Adds (\d+) to (\d+) Fire Damage(?! to Attacks)/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Cold Damage': {
      filterText: 'Adds # to # Cold Damage',
      group: 'explicit',
      extractValue: (statText) => {
        // Only match if it doesn't contain "to Attacks" (more specific pattern should handle that)
        const match = statText.match(/Adds (\d+) to (\d+) Cold Damage(?! to Attacks)/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Lightning Damage': {
      filterText: 'Adds # to # Lightning Damage',
      group: 'explicit',
      extractValue: (statText) => {
        // Only match if it doesn't contain "to Attacks" (more specific pattern should handle that)
        const match = statText.match(/Adds (\d+) to (\d+) Lightning Damage(?! to Attacks)/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Fire damage to Attacks': {
      filterText: 'Adds # to # Fire damage to Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Fire [Dd]amage to Attacks/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Cold damage to Attacks': {
      filterText: 'Adds # to # Cold damage to Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Cold [Dd]amage to Attacks/)
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null
      }
    },
    'Adds # to # Lightning damage to Attacks': {
      filterText: 'Adds # to # Lightning damage to Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Adds (\d+) to (\d+) Lightning [Dd]amage to Attacks/)
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

    // === DEFENSE STATS ===
    ' to Armour': {
      filterText: '# to Armour',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Armour$/)
        return match ? parseInt(match[1]) : null
      }
    },
    ' to Evasion Rating': {
      filterText: '# to Evasion Rating',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Evasion Rating$/)
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
    ' to Stun Threshold': {
      filterText: '# to Stun Threshold',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Stun Threshold/)
        return match ? parseInt(match[1]) : null
      }
    },
    '% of Armour also applies to Elemental Damage': {
      filterText: '#% of Armour also applies to Elemental Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+of Armour also applies to Elemental Damage/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === PSEUDO TOTALS ===
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
        const match = statText.match(/\+?(\d+)%\s+to all Elemental Resistances/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total Resistance': {
      filterText: '+#% total Resistance',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+total Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total to all Elemental Resistances': {
      filterText: '+#% total to all Elemental Resistances',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)%\s+to all Elemental Resistances/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total Elemental Resistances': {
      filterText: '# total Elemental Resistances',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)\s+total Elemental Resistances/)
        return match ? parseInt(match[1]) : null
      }
    },
    'total Resistances': {
      filterText: '# total Resistances',
      group: 'pseudo',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)\s+total Resistances/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === WAND SPECIFIC STATS ===
    'of Damage as Extra Fire Damage (desecrated)': {
      filterText: '#% of Damage as Extra Fire Damage',
      group: 'desecrated',
      extractValue: (statText) => {
        const match = statText.match(/Gain (\d+)% of Damage as Extra Fire Damage\s*\(desecrated\)/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage as Extra Fire Damage': {
      filterText: '#% of Damage as Extra Fire Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Gain (\d+)% of Damage as Extra Fire Damage(?!\s*\(desecrated\))/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage as Extra Cold Damage (desecrated)': {
      filterText: 'Gain #% of Damage as Extra Cold Damage',
      group: 'desecrated',
      extractValue: (statText) => {
        const match = statText.match(/Gain (\d+)% of Damage as Extra Cold Damage\s*\(desecrated\)/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage as Extra Cold Damage': {
      filterText: 'Gain #% of Damage as Extra Cold Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Gain (\d+)% of Damage as Extra Cold Damage(?!\s*\(desecrated\))/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage as Extra Lightning Damage (desecrated)': {
      filterText: 'Gain #% of Damage as Extra Lightning Damage',
      group: 'desecrated',
      extractValue: (statText) => {
        // Match desecrated version specifically
        const match = statText.match(/Gain (\d+)% of Damage as Extra Lightning Damage\s*\(desecrated\)/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage as Extra Lightning Damage': {
      filterText: 'Gain #% of Damage as Extra Lightning Damage',
      group: 'explicit',
      extractValue: (statText) => {
        // Match normal version only (not desecrated)
        const match = statText.match(/Gain (\d+)% of Damage as Extra Lightning Damage(?!\s*\(desecrated\))/)
        return match ? parseInt(match[1]) : null
      }
    },

    'of Damage as Extra Chaos Damage (rune)': {
      filterText: 'Gain #% of Damage as Extra Chaos Damage',
      group: 'fractured',
      extractValue: (statText) => {
        // Match rune version specifically
        const match = statText.match(/Gain (\d+)% of Damage as Extra Chaos Damage\s*\(rune\)/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage as Extra Chaos Damage': {
      filterText: 'Gain #% of Damage as Extra Chaos Damage',
      group: 'explicit',
      extractValue: (statText) => {
        // Match normal version only (not rune)
        const match = statText.match(/Gain (\d+)% of Damage as Extra Chaos Damage(?!\s*\(rune\))/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Spell Physical Damage': {
      filterText: '#% increased Spell Physical Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Spell Physical Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Freeze Buildup': {
      filterText: '#% increased Freeze Buildup',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Freeze Buildup/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === STATUS EFFECT AND PENETRATION STATS ===
    'increased Flammability Magnitude': {
      filterText: '#% increased Flammability Magnitude',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Flammability Magnitude/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased chance to Shock': {
      filterText: '#% increased chance to Shock',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased chance to Shock/)
        return match ? parseInt(match[1]) : null
      }
    },
    'Damage Penetrates.*Cold Resistance': {
      filterText: 'Damage Penetrates #% Cold Resistance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Damage Penetrates (\d+)% Cold Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'Damage Penetrates.*Fire Resistance': {
      filterText: 'Damage Penetrates #% Fire Resistance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Damage Penetrates (\d+)% Fire Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'Damage Penetrates.*Lightning Resistance': {
      filterText: 'Damage Penetrates #% Lightning Resistance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Damage Penetrates (\d+)% Lightning Resistance/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === STATUS EFFECT MAGNITUDE STATS ===
    'increased Ignite Magnitude': {
      filterText: '#% increased Ignite Magnitude',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Ignite Magnitude/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Magnitude of Poison you inflict': {
      filterText: '#% increased Magnitude of Poison you inflict',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Magnitude of Poison you inflict/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Magnitude of Shock you inflict': {
      filterText: '#% increased Magnitude of Shock you inflict',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Magnitude of Shock you inflict/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === CHANCE/PROBABILITY STATS ===
    'chance to inflict Bleeding on Hit': {
      filterText: '#% chance to inflict Bleeding on Hit',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% chance to inflict Bleeding on Hit/)
        return match ? parseInt(match[1]) : null
      }
    },
    'chance to Poison on Hit': {
      filterText: '#% chance to Poison on Hit',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% chance to Poison on Hit/)
        return match ? parseInt(match[1]) : null
      }
    },
    'chance to Pierce an Enemy': {
      filterText: '#% chance to Pierce an Enemy',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% chance to Pierce an Enemy/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === DURATION STATS ===
    'increased Stun Duration': {
      filterText: '#% increased Stun Duration',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Stun Duration/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Shock Duration': {
      filterText: '#% increased Shock Duration',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Shock Duration/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Skill Effect Duration': {
      filterText: '#% increased Skill Effect Duration',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Skill Effect Duration/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Flask Effect Duration': {
      filterText: '#% increased Flask Effect Duration',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Flask Effect Duration/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === BUILDUP STATS ===
    'increased Stun Buildup': {
      filterText: '#% increased Stun Buildup',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Stun Buildup/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Pin Buildup': {
      filterText: '#% increased Pin Buildup',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Pin Buildup/)
        return match ? parseInt(match[1]) : null
      }
    },
    'Causes.*increased Stun Buildup': {
      filterText: 'Causes #% increased Stun Buildup',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Causes (\d+)% increased Stun Buildup/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === DAMAGE TYPE STATS ===
    'increased Chaos Damage': {
      filterText: '#% increased Chaos Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Chaos Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Elemental Damage': {
      filterText: '#% increased Elemental Damage',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Elemental Damage/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Elemental Damage with Attacks': {
      filterText: '#% increased Elemental Damage with Attacks',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Elemental Damage with Attacks/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Critical Damage Bonus': {
      filterText: '#% increased Critical Damage Bonus',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Critical Damage Bonus/)
        return match ? parseInt(match[1]) : null
      }
    },
    'increased Critical Spell Damage Bonus': {
      filterText: '#% increased Critical Spell Damage Bonus',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Critical Spell Damage Bonus/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === LEECH STATS ===
    'Leech.*Physical Attack Damage as Life': {
      filterText: 'Leech #% of Physical Attack Damage as Life',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Leech (\d+(?:\.\d+)?)% of Physical Attack Damage as Life/)
        return match ? parseFloat(match[1]) : null
      }
    },
    'Leech.*Physical Attack Damage as Mana': {
      filterText: 'Leech #% of Physical Attack Damage as Mana',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Leech (\d+(?:\.\d+)?)% of Physical Attack Damage as Mana/)
        return match ? parseFloat(match[1]) : null
      }
    },
    'Leeches.*Physical Damage as Life': {
      filterText: 'Leeches #% of Physical Damage as Life',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Leeches (\d+(?:\.\d+)?)% of Physical Damage as Life/)
        return match ? parseFloat(match[1]) : null
      }
    },
    'Leeches.*Physical Damage as Mana': {
      filterText: 'Leeches #% of Physical Damage as Mana',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/Leeches (\d+(?:\.\d+)?)% of Physical Damage as Mana/)
        return match ? parseFloat(match[1]) : null
      }
    },

    // === DEFENSIVE STATS ===
    'increased Block chance': {
      filterText: '#% increased Block chance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% increased Block chance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Block chance': {
      filterText: '#% to Block chance',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% to Block chance/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage taken Recouped as Life': {
      filterText: '#% of Damage taken Recouped as Life',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% of Damage taken Recouped as Life/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage taken Recouped as Mana': {
      filterText: '#% of Damage taken Recouped as Mana',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% of Damage taken Recouped as Mana/)
        return match ? parseInt(match[1]) : null
      }
    },
    'of Damage taken bypasses Energy Shield': {
      filterText: '#% of Damage taken bypasses Energy Shield',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/(\d+)% of Damage taken bypasses Energy Shield/)
        return match ? parseInt(match[1]) : null
      }
    },

    // === SKILL LEVEL MODIFIERS ===
    // General skill types
    'to Level of all Spell Skills': {
      filterText: '# to Level of all Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Level of all Attack Skills': {
      filterText: '# to Level of all Attack Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Attack Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Level of all Projectile Skills': {
      filterText: '# to Level of all Projectile Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Projectile Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Level of all Melee Skills': {
      filterText: '# to Level of all Melee Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Melee Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Level of all Minion Skills': {
      filterText: '# to Level of all Minion Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Minion Skills/)
        return match ? parseInt(match[1]) : null
      }
    },

    // Elemental spell skills
    'to Level of all Fire Spell Skills': {
      filterText: '# to Level of all Fire Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Fire Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Level of all Cold Spell Skills': {
      filterText: '# to Level of all Cold Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Cold Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Level of all Lightning Spell Skills': {
      filterText: '# to Level of all Lightning Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Lightning Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Level of all Chaos Spell Skills': {
      filterText: '# to Level of all Chaos Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Chaos Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    },
    'to Level of all Physical Spell Skills': {
      filterText: '# to Level of all Physical Spell Skills',
      group: 'explicit',
      extractValue: (statText) => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Physical Spell Skills/)
        return match ? parseInt(match[1]) : null
      }
    }
  }
}

// Stat mapping utility functions
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

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { POE_STAT_MAPPINGS, findStatMapping, findDropdownOption }
} else {
  // Browser environment - attach to window
  window.POE_STAT_MAPPINGS = POE_STAT_MAPPINGS
  window.findStatMapping = findStatMapping
  window.findDropdownOption = findDropdownOption
}