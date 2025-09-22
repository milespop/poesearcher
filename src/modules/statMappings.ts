// POE Stat Mappings Module
// Defines all stat mappings for POE trade site search engine

import { createLogger } from './logger';

const logger = createLogger('StatMappings');

// Type definitions
export interface StatMapping {
  filterText: string;
  group: 'explicit' | 'implicit' | 'pseudo' | 'fractured' | 'desecrated';
  extractValue: (statText: string) => number | null;
}

export interface StatMappingResult extends StatMapping {
  value: number;
  originalText: string;
  searchKey: string;
}

export type ItemClass =
  | 'Staves' | 'Crossbows' | 'Shields' | 'Bows' | 'Wands' | 'Swords' | 'Axes' | 'Maces'
  | 'Daggers' | 'Claws' | 'Sceptres' | 'Two Hand Swords' | 'Two Hand Axes'
  | 'Two Hand Maces' | 'Quarterstaves' | 'Spears' | 'Flails';

const POE_STAT_MAPPINGS = {
  mappings: {
    // === PSEUDO STATS ===
    'to maximum Life': {
      filterText: '# to maximum Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to maximum Life/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to maximum Mana': {
      filterText: '# to maximum Mana',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to maximum Mana/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to maximum Energy Shield': {
      filterText: '+# total maximum Energy Shield',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to maximum Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'explicit to maximum Energy Shield': {
      filterText: '# to maximum Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to maximum Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Gain # Mana per Enemy Killed': {
      filterText: 'Gain # Mana per Enemy Killed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain (\d+) Mana per Enemy Killed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to all Elemental Resistances': {
      filterText: '#% to all Elemental Resistances',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to all Elemental Resistances/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Cold Resistance': {
      filterText: '+#% total to Cold Resistance',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to Cold Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Fire Resistance': {
      filterText: '+#% total to Fire Resistance',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to Fire Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Lightning Resistance': {
      filterText: '+#% total to Lightning Resistance',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to Lightning Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Chaos Resistance': {
      filterText: '+#% total to Chaos Resistance',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to Chaos Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === EXPLICIT RESISTANCE STATS ===
    'explicit to Fire Resistance': {
      filterText: '#% to Fire Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to Fire Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Strength': {
      filterText: '+# total to Strength',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Strength/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Intelligence': {
      filterText: '+# total to Intelligence',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Intelligence/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Dexterity': {
      filterText: '# to Dexterity',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Dexterity/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to all Attributes': {
      filterText: '+# total to all Attributes',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to all Attributes/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Movement Speed': {
      filterText: '#% increased Movement Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Movement Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Physical Damage': {
      filterText: '#% increased Physical Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Physical Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Spell Damage': {
      filterText: '#% increased Spell Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Spell Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Energy Shield': {
      filterText: '#% increased Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased maximum Life': {
      filterText: '#% increased maximum Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased maximum Life/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased maximum Mana': {
      filterText: '#% increased maximum Mana',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased maximum Mana/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased maximum Energy Shield': {
      filterText: '#% increased maximum Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased maximum Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Cast Speed': {
      filterText: '#% increased Cast Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Cast Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Rarity of Items found': {
      filterText: '#% increased Rarity of Items found',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Rarity of Items found/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Mana Regeneration Rate': {
      filterText: '#% increased Mana Regeneration Rate',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Mana Regeneration Rate/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Life Regeneration per second': {
      filterText: '# Life Regeneration per second',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)\s+Life Regeneration per second/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Life Regeneration rate': {
      filterText: '#% increased Life Regeneration rate',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Life Regeneration rate/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Accuracy Rating': {
      filterText: '# to Accuracy Rating',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Accuracy Rating/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Spirit': {
      filterText: '# to Spirit',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Spirit/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === TASK 1: CRITICAL DAMAGE STATS ===
    'Adds # to # Physical Damage': {
      filterText: 'Adds # to # Physical Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't contain "to Attacks" (more specific pattern should handle that)
        if (statText.includes('to Attacks')) {
          return null;
        }
        const match = statText.match(/Adds (\d+) to (\d+) Physical Damage/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    'Adds # to # Physical Damage to Attacks': {
      filterText: 'Adds # to # Physical Damage to Attacks',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Adds (\d+) to (\d+) Physical Damage to Attacks/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    'Adds # to # Fire Damage': {
      filterText: 'Adds # to # Fire Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't contain "to Attacks" (more specific pattern should handle that)
        if (statText.includes('to Attacks')) {
          return null;
        }
        const match = statText.match(/Adds (\d+) to (\d+) Fire Damage/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    'Adds # to # Cold Damage': {
      filterText: 'Adds # to # Cold Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't contain "to Attacks" (more specific pattern should handle that)
        if (statText.includes('to Attacks')) {
          return null;
        }
        const match = statText.match(/Adds (\d+) to (\d+) Cold Damage/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    'Adds # to # Lightning Damage (rune)': {
      filterText: 'Adds # to # Lightning Damage',
      group: 'fractured' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Adds (\d+) to (\d+) Lightning Damage\s*\(rune\)/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    'Adds # to # Lightning Damage': {
      filterText: 'Adds # to # Lightning Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't contain "to Attacks" or "(rune)"
        if (statText.includes('to Attacks') || statText.includes('(rune)')) {
          return null;
        }
        const match = statText.match(/Adds (\d+) to (\d+) Lightning Damage/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    'Adds # to # Fire damage to Attacks': {
      filterText: 'Adds # to # Fire damage to Attacks',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Adds (\d+) to (\d+) Fire [Dd]amage to Attacks/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    'Adds # to # Cold damage to Attacks': {
      filterText: 'Adds # to # Cold damage to Attacks',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Adds (\d+) to (\d+) Cold [Dd]amage to Attacks/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    'Adds # to # Lightning damage to Attacks': {
      filterText: 'Adds # to # Lightning damage to Attacks',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Adds (\d+) to (\d+) Lightning [Dd]amage to Attacks/);
        return match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : null;
      }
    },
    '% increased Fire Damage': {
      filterText: '#% increased Fire Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Fire Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Cold Damage': {
      filterText: '#% increased Cold Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Cold Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Lightning Damage': {
      filterText: '#% increased Lightning Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Lightning Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Damage': {
      filterText: '#% increased Attack Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Projectile Damage': {
      filterText: '#% increased Projectile Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Projectile Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Melee Damage': {
      filterText: '#% increased Melee Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Melee Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === TASK 2: CRITICAL HIT & SPEED STATS ===
    '% increased Critical Hit Chance': {
      filterText: '#% increased Critical Hit Chance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't have "for Attacks" or "for Spells" after
        if (statText.includes('for Attacks') || statText.includes('for Spells')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Critical Hit Chance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Critical Damage Bonus': {
      filterText: '#% increased Critical Damage Bonus',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't have "for Attack Damage" or other specific versions after
        if (statText.includes('for Attack Damage')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Critical Damage Bonus/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% to Critical Hit Chance': {
      filterText: '#% to Critical Hit Chance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+to Critical Hit Chance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% to Critical Damage Bonus': {
      filterText: '#% to Critical Damage Bonus',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+to Critical Damage Bonus/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed': {
      filterText: '#% increased Attack Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed (Local)': {
      filterText: '#% increased Attack Speed (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Accuracy Rating (Local)': {
      filterText: '# to Accuracy Rating (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Accuracy Rating/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Block chance (Local)': {
      filterText: '#% increased Block chance (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Block chance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack and Cast Speed': {
      filterText: '#% increased Attack and Cast Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack and Cast Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Critical Hit Chance for Attacks': {
      filterText: '#% increased Critical Hit Chance for Attacks',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Critical Hit Chance for Attacks/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Critical Hit Chance for Spells': {
      filterText: '#% increased Critical Hit Chance for Spells',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Critical Hit Chance for Spells/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Critical Damage Bonus for Attack Damage': {
      filterText: '#% increased Critical Damage Bonus for Attack Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Critical Damage Bonus for Attack Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === DEFENSE STATS ===
    ' to Armour': {
      filterText: '# to Armour',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Armour$/);
        return match ? parseInt(match[1]) : null;
      }
    },
    ' to Evasion Rating': {
      filterText: '# to Evasion Rating',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Evasion Rating$/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Armour': {
      filterText: '#% increased Armour',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Armour/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Evasion Rating': {
      filterText: '#% increased Evasion Rating',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Evasion Rating/);
        return match ? parseInt(match[1]) : null;
      }
    },
    ' to Armour (Local)': {
      filterText: '# to Armour (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Armour/);
        return match ? parseInt(match[1]) : null;
      }
    },
    ' to Evasion Rating (Local)': {
      filterText: '# to Evasion Rating (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Evasion Rating/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Armour (Local)': {
      filterText: '#% increased Armour (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Armour/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Evasion Rating (Local)': {
      filterText: '#% increased Evasion Rating (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Evasion Rating/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Block chance': {
      filterText: '#% increased Block chance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Block chance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% to Block chance': {
      filterText: '#% to Block chance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+to Block chance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Armour and Evasion': {
      filterText: '#% increased Armour and Evasion',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Armour and Evasion/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Armour and Energy Shield': {
      filterText: '#% increased Armour and Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Armour and Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    ' to Stun Threshold': {
      filterText: '# to Stun Threshold',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Stun Threshold/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% of Armour also applies to Elemental Damage': {
      filterText: '#% of Armour also applies to Elemental Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+of Armour also applies to Elemental Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === STATUS EFFECT AND PENETRATION STATS ===
    'increased Flammability Magnitude': {
      filterText: '#% increased Flammability Magnitude',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Flammability Magnitude/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased chance to Shock': {
      filterText: '#% increased chance to Shock',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased chance to Shock/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Damage Penetrates.*Cold Resistance': {
      filterText: 'Damage Penetrates #% Cold Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Damage Penetrates (\d+)% Cold Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Damage Penetrates.*Fire Resistance': {
      filterText: 'Damage Penetrates #% Fire Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Damage Penetrates (\d+)% Fire Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Damage Penetrates.*Lightning Resistance': {
      filterText: 'Damage Penetrates #% Lightning Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Damage Penetrates (\d+)% Lightning Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === SKILL LEVEL MODIFIERS ===
    'to Level of all Spell Skills': {
      filterText: '# to Level of all Spell Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Spell Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Attack Skills': {
      filterText: '# to Level of all Attack Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Attack Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Projectile Skills': {
      filterText: '# to Level of all Projectile Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Projectile Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Melee Skills': {
      filterText: '# to Level of all Melee Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Melee Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Minion Skills': {
      filterText: '# to Level of all Minion Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Minion Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Fire Spell Skills': {
      filterText: '# to Level of all Fire Spell Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Fire Spell Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Cold Spell Skills': {
      filterText: '# to Level of all Cold Spell Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Cold Spell Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Lightning Spell Skills': {
      filterText: '# to Level of all Lightning Spell Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Lightning Spell Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Chaos Spell Skills': {
      filterText: '# to Level of all Chaos Spell Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Chaos Spell Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Level of all Physical Spell Skills': {
      filterText: '# to Level of all Physical Spell Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Level of all Physical Spell Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === ELEMENTAL DAMAGE STATS ===
    'increased Elemental Damage with Attacks (desecrated)': {
      filterText: '#% increased Elemental Damage with Attacks',
      group: 'desecrated' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Elemental Damage with Attacks\s*\(desecrated\)/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Elemental Damage with Attacks': {
      filterText: '#% increased Elemental Damage with Attacks',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Elemental Damage with Attacks(?!\s*\(desecrated\))/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Elemental Damage': {
      filterText: '#% increased Elemental Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Don't match if it contains "with Attacks"
        if (statText.includes('with Attacks')) {
          return null;
        }
        const match = statText.match(/(\d+)% increased Elemental Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === LEECH STATS ===
    'Leech.*Physical Attack Damage as Life': {
      filterText: 'Leech #% of Physical Attack Damage as Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Leech (\d+(?:\.\d+)?)% of Physical Attack Damage as Life/);
        return match ? parseFloat(match[1]) : null;
      }
    },
    'Leech.*Physical Attack Damage as Mana': {
      filterText: 'Leech #% of Physical Attack Damage as Mana',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Leech (\d+(?:\.\d+)?)% of Physical Attack Damage as Mana/);
        return match ? parseFloat(match[1]) : null;
      }
    },

    // === LIFE/MANA ON KILL STATS ===
    'Gain # Life per Enemy Killed': {
      filterText: 'Gain # Life per Enemy Killed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain (\d+) Life per Enemy Killed/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === PHYSICAL DAMAGE LEECH STATS ===
    'Leeches.*Physical Damage as Mana': {
      filterText: 'Leeches #% of Physical Damage as Mana',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Leeches (\d+(?:\.\d+)?)% of Physical Damage as Mana/);
        return match ? parseFloat(match[1]) : null;
      }
    },

    // === EXTRA DAMAGE CONVERSION STATS ===
    'Gain.*of Damage as Extra Cold Damage': {
      filterText: 'Gain #% of Damage as Extra Cold Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain (\d+)% of Damage as Extra Cold Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Gain.*of Damage as Extra Lightning Damage': {
      filterText: 'Gain #% of Damage as Extra Lightning Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain (\d+)% of Damage as Extra Lightning Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Gain.*of Damage as Extra Fire Damage': {
      filterText: 'Gain #% of Damage as Extra Fire Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain (\d+)% of Damage as Extra Fire Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Gain.*of Damage as Extra Chaos Damage': {
      filterText: 'Gain #% of Damage as Extra Chaos Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain (\d+)% of Damage as Extra Chaos Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === LIFE/MANA CONVERSION STATS ===
    'of Damage is taken from Mana before Life': {
      filterText: '#% of Damage is taken from Mana before Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% of Damage is taken from Mana before Life/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'of Maximum Life Converted to Energy Shield': {
      filterText: '#% of Maximum Life Converted to Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% of Maximum Life Converted to Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    }
  } as const satisfies Record<string, StatMapping>
} as const;

// Define weapon categories for Attack Speed (Local) and Accuracy Rating (Local) priority
const WEAPON_CATEGORIES: readonly ItemClass[] = [
  'Staves', 'Crossbows', 'Bows', 'Wands', 'Swords', 'Axes', 'Maces',
  'Daggers', 'Claws', 'Sceptres', 'Two Hand Swords', 'Two Hand Axes',
  'Two Hand Maces', 'Quarterstaves', 'Spears', 'Flails'
] as const;

// Define shield category for Block chance (Local) priority
const SHIELD_CATEGORY = 'Shields';

// Stat mapping utility functions
export function findStatMapping(statText: string, itemClass: string | null = null): StatMappingResult | null {
  const isWeapon = itemClass && WEAPON_CATEGORIES.includes(itemClass as ItemClass);
  const isShield = itemClass === SHIELD_CATEGORY;

  // For weapons, prioritize local versions of Attack Speed and Accuracy Rating
  if (isWeapon) {
    if (statText.includes('increased Attack Speed')) {
      // Try Attack Speed (Local) first for weapons
      const localMapping = POE_STAT_MAPPINGS.mappings['% increased Attack Speed (Local)'];
      if (localMapping) {
        const value = localMapping.extractValue(statText);
        if (value !== null) {
          return { ...localMapping, value, originalText: statText, searchKey: '% increased Attack Speed (Local)' };
        }
      }
    } else if (statText.includes('to Accuracy Rating')) {
      // Try Accuracy Rating (Local) first for weapons
      const localMapping = POE_STAT_MAPPINGS.mappings['to Accuracy Rating (Local)'];
      if (localMapping) {
        const value = localMapping.extractValue(statText);
        if (value !== null) {
          return { ...localMapping, value, originalText: statText, searchKey: 'to Accuracy Rating (Local)' };
        }
      }
    }
  }

  // For shields, prioritize local version of Block chance
  if (isShield && statText.includes('increased Block chance')) {
    // Try Block chance (Local) first for shields
    const localMapping = POE_STAT_MAPPINGS.mappings['% increased Block chance (Local)'];
    if (localMapping) {
      const value = localMapping.extractValue(statText);
      if (value !== null) {
        return { ...localMapping, value, originalText: statText, searchKey: '% increased Block chance (Local)' };
      }
    }
  }

  // Standard search for all other cases or if no local version found
  for (const [key, mapping] of Object.entries(POE_STAT_MAPPINGS.mappings)) {
    const value = mapping.extractValue(statText);
    if (value !== null) {
      return { ...mapping, value, originalText: statText, searchKey: key };
    }
  }
  return null;
}

export function findDropdownOption(filterText: string, options: NodeListOf<Element> | Element[]): Element | null {
  logger.verbose(`findDropdownOption: Looking for "${filterText}"`);

  const searchText = filterText.replace(/#/g, '').replace(/\s+/g, ' ').trim();
  logger.verbose(`Normalized search text: "${searchText}"`);

  let exactMatch: Element | null = null;
  let partialMatch: Element | null = null;

  // Look for exact match first, then partial match
  for (const option of options) {
    const optionText = option.textContent?.trim() || '';
    const normalizedOption = optionText.replace(/#/g, '').replace(/\s+/g, ' ').trim();

    logger.verbose(`Checking option: "${normalizedOption}"`);

    // Check for exact match (same length and content)
    if (normalizedOption === searchText) {
      logger.verbose(`Exact match found: "${optionText}"`);
      exactMatch = option;
      break;
    }

    // Check for partial match (option contains our text)
    if (!partialMatch && normalizedOption.includes(searchText)) {
      logger.verbose(`Partial match found: "${optionText}"`);
      partialMatch = option;
    }
  }

  const result = exactMatch || partialMatch;
  if (result) {
    logger.verbose(`Selected: "${result.textContent?.trim()}"`);
    return result;
  }

  logger.warn(`No match found in ${options.length} options`);
  return null;
}

// Browser environment - attach to window
(window as any).POE_STAT_MAPPINGS = POE_STAT_MAPPINGS;
(window as any).findStatMapping = findStatMapping;
(window as any).findDropdownOption = findDropdownOption;