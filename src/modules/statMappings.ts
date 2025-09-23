// POE Stat Mappings Module
// Defines all stat mappings for POE trade site search engine

import { createLogger } from './logger';

const logger = createLogger('StatMappings');

// Type definitions
export interface StatMapping {
  filterText: string;
  group: 'explicit' | 'implicit' | 'pseudo' | 'fractured' | 'desecrated';
  extractValue: (statText: string) => number | null;
  dynamic?: boolean; // Optional flag for stats that might not appear in initial dropdown
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

// Type to enforce unique keys in stat mappings - TypeScript will error if duplicate keys exist
type EnsureUniqueKeys<T> = {
  [K in keyof T]: T[K]
}

// Type that enforces no duplicate keys by creating a constraint that fails on duplicates
type StatMappingsWithUniqueKeys = EnsureUniqueKeys<Record<string, StatMapping>>

const POE_STAT_MAPPINGS = {
  mappings: {
    // === PRESENCE PATTERNS (MUST BE FIRST FOR PRIORITY) ===
    'Allies in your Presence have # to Accuracy Rating': {
      filterText: 'Allies in your Presence have # to Accuracy Rating',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence have \+?(\d+)\s+to Accuracy Rating/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence have #% increased Attack Speed': {
      filterText: 'Allies in your Presence have #% increased Attack Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence have (\d+)%\s+increased Attack Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === AREA OF EFFECT PATTERNS ===
    '#% increased Area of Effect for Attacks per 10 Intelligence': {
      filterText: '#% increased Area of Effect for Attacks per 10 Intelligence',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Area of Effect for Attacks per 10 Intelligence/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '#% increased Area of Effect of Curses': {
      filterText: '#% increased Area of Effect of Curses',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Area of Effect of Curses/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '#% increased Area of Effect': {
      filterText: '#% increased Area of Effect',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match generic AoE if it doesn't have specific modifiers
        if (statText.includes('for Attacks per') || statText.includes('of Curses')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Area of Effect/);
        return match ? parseInt(match[1]) : null;
      }
    },

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
        const match = statText.match(/\+?(\d+)\s+(?:total\s+)?(?:maximum\s+)?Energy Shield/);
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
        // Don't match presence-specific or minion-specific patterns
        if (statText.includes('Allies in your Presence') || statText.includes('Minions have')) {
          return null;
        }
        const match = statText.match(/\+?(\d+)%\s+to all Elemental Resistances/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Cold Resistance': {
      filterText: '+#% total to Cold Resistance',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+(?:total\s+)?to Cold Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Fire Resistance': {
      filterText: '+#% total to Fire Resistance',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        // Don't match presence-specific patterns
        if (statText.includes('Enemies in your Presence')) {
          return null;
        }
        const match = statText.match(/\+?(\d+)%\s+(?:total\s+)?to Fire Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Lightning Resistance': {
      filterText: '+#% total to Lightning Resistance',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+(?:total\s+)?to Lightning Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Chaos Resistance': {
      filterText: '+#% total to Chaos Resistance',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        // Don't match minion-specific patterns
        if (statText.includes('Minions have')) {
          return null;
        }
        const match = statText.match(/\+?(\d+)%\s+(?:total\s+)?to Chaos Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === MAXIMUM RESISTANCES ===
    'to Maximum Cold Resistance': {
      filterText: '#% to Maximum Cold Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to Maximum Cold Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Maximum Fire Resistance': {
      filterText: '#% to Maximum Fire Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to Maximum Fire Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Maximum Lightning Resistance': {
      filterText: '#% to Maximum Lightning Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)%\s+to Maximum Lightning Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'maximum Player Resistances': {
      filterText: '#% maximum Player Resistances',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+maximum Player Resistances/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === EXPLICIT RESISTANCE STATS ===
    'explicit to Fire Resistance': {
      filterText: '#% to Fire Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Don't match presence-specific patterns
        if (statText.includes('Enemies in your Presence')) {
          return null;
        }
        const match = statText.match(/\+?(\d+)%\s+to Fire Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Strength': {
      filterText: '+# total to Strength',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        // Don't match "to Strength and Intelligence"
        if (statText.includes('and Intelligence')) {
          return null;
        }
        const match = statText.match(/\+?(\d+)\s+(?:total\s+)?to Strength/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to Intelligence': {
      filterText: '+# total to Intelligence',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        // Don't match "to Strength and Intelligence"
        if (statText.includes('Strength and')) {
          return null;
        }
        const match = statText.match(/\+?(\d+)\s+(?:total\s+)?to Intelligence/);
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
    'to Strength and Intelligence': {
      filterText: '# to Strength and Intelligence',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+to Strength and Intelligence/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'to all Attributes': {
      filterText: '+# total to all Attributes',
      group: 'pseudo' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/\+?(\d+)\s+(?:total\s+)?to all Attributes/);
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
        // Don't match "increased Energy Shield Recharge Rate" - that has its own pattern
        if (statText.includes('Recharge Rate')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased maximum Life': {
      filterText: '#% increased maximum Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Don't match minion-specific patterns
        if (statText.includes('Minions have')) {
          return null;
        }
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
    'faster start of Energy Shield Recharge': {
      filterText: '#% faster start of Energy Shield Recharge',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+faster start of Energy Shield Recharge/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Energy Shield Recharge Rate': {
      filterText: '#% increased Energy Shield Recharge Rate',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Energy Shield Recharge Rate/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'of Damage taken bypasses Energy Shield': {
      filterText: '#% of Damage taken bypasses Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+of Damage taken bypasses Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Gain additional Stun Threshold equal to.*of maximum Energy Shield': {
      filterText: 'Gain additional Stun Threshold equal to #% of maximum Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain additional Stun Threshold equal to (\d+)%\s+of maximum Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Gain additional Ailment Threshold equal to.*of maximum Energy Shield': {
      filterText: 'Gain additional Ailment Threshold equal to #% of maximum Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain additional Ailment Threshold equal to (\d+)%\s+of maximum Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'increased Cast Speed': {
      filterText: '#% increased Cast Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Don't match presence-specific patterns
        if (statText.includes('Allies in your Presence')) {
          return null;
        }
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
    'Adds # to # Lightning Damage to Attacks per 20 Intelligence': {
      filterText: 'Adds # to # Lightning Damage to Attacks per 20 Intelligence',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Adds (\d+) to (\d+) Lightning Damage to Attacks per 20 Intelligence/);
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
    '% increased Chaos Damage': {
      filterText: '#% increased Chaos Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Chaos Damage/);
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
    '% increased Damage': {
      filterText: '#% increased Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match pure "increased Damage" without any conditionals
        const match = statText.match(/^\+?(\d+)%\s+increased Damage$/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Global Physical Damage': {
      filterText: '#% increased Global Physical Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Global Physical Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Spell Physical Damage': {
      filterText: '#% increased Spell Physical Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Spell Physical Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === TASK 2: CRITICAL HIT & SPEED STATS ===
    '% increased Critical Hit Chance': {
      filterText: '#% increased Critical Hit Chance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't have "for Attacks", "for Spells", presence, or minions
        if (statText.includes('for Attacks') || statText.includes('for Spells') || statText.includes('Allies in your Presence') || statText.includes('Minions have')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Critical Hit Chance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Critical Damage Bonus with Spears': {
      filterText: '#% increased Critical Damage Bonus with Spears',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Critical Damage Bonus with Spears/);
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
    '% increased Critical Damage Bonus': {
      filterText: '#% increased Critical Damage Bonus',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't have specific versions, presence, or minions
        if (statText.includes('for Attack Damage') || statText.includes('with Spears') || statText.includes('Allies in your Presence') || statText.includes('Minions have')) {
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
    'to Accuracy Rating (Local)': {
      filterText: '# to Accuracy Rating (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Don't match presence-specific patterns
        if (statText.includes('Allies in your Presence') || statText.includes('Enemies in your Presence')) {
          return null;
        }
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
        // Don't match minion-specific patterns
        if (statText.includes('Minions have')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Attack and Cast Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed per 10 Dexterity': {
      filterText: '#% increased Attack Speed per 10 Dexterity',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed per 10 Dexterity/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed per 20 Dexterity': {
      filterText: '#% increased Attack Speed per 20 Dexterity',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed per 20 Dexterity/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed with Bows': {
      filterText: '#% increased Attack Speed with Bows',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed with Bows/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed with Crossbows': {
      filterText: '#% increased Attack Speed with Crossbows',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed with Crossbows/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed with Quarterstaves': {
      filterText: '#% increased Attack Speed with Quarterstaves',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed with Quarterstaves/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed with Spears': {
      filterText: '#% increased Attack Speed with Spears',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Attack Speed with Spears/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed (Local)': {
      filterText: '#% increased Attack Speed (Local)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Don't match presence-specific patterns
        if (statText.includes('Allies in your Presence') || statText.includes('Enemies in your Presence')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Attack Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Attack Speed': {
      filterText: '#% increased Attack Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't have specific weapon/scaling modifiers
        if (statText.includes('per ') || statText.includes('with ')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Attack Speed$/);
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
    '% increased Critical Spell Damage Bonus': {
      filterText: '#% increased Critical Spell Damage Bonus',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Critical Spell Damage Bonus/);
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
    '% increased Evasion and Energy Shield': {
      filterText: '#% increased Evasion and Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Evasion and Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Armour, Evasion and Energy Shield': {
      filterText: '#% increased Armour, Evasion and Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Armour, Evasion and Energy Shield/);
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
    '% increased Armour': {
      filterText: '#% increased Armour',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match if it doesn't have other defense types with it
        if (statText.includes('and ') || statText.includes(', ')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Armour$/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Global Defences': {
      filterText: '#% increased Global Defences',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Global Defences/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Defences from Equipped Shield': {
      filterText: '#% increased Defences from Equipped Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Defences from Equipped Shield/);
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
    '% increased Accuracy Rating': {
      filterText: '#% increased Accuracy Rating',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match generic accuracy rating without weapon specifics
        if (statText.includes('with ')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Accuracy Rating/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Accuracy Rating with Bows': {
      filterText: '#% increased Accuracy Rating with Bows',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Accuracy Rating with Bows/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Stun Threshold': {
      filterText: '#% increased Stun Threshold',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match generic stun threshold without conditionals
        if (statText.includes('if you haven\'t been Stunned Recently')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Stun Threshold/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Stun Duration': {
      filterText: '#% increased Stun Duration',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Stun Duration/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Stun Buildup': {
      filterText: '#% increased Stun Buildup',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Only match generic stun buildup without weapon specifics
        if (statText.includes('with ')) {
          return null;
        }
        const match = statText.match(/(\d+)%\s+increased Stun Buildup/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Stun Buildup with Maces': {
      filterText: '#% increased Stun Buildup with Maces',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Stun Buildup with Maces/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Stun Threshold if you haven\'t been Stunned Recently': {
      filterText: '#% increased Stun Threshold if you haven\'t been Stunned Recently',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Stun Threshold if you haven't been Stunned Recently/);
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

    // === PRESENCE/AURA EFFECTS ===
    '#% increased Presence Area of Effect': {
      filterText: '#% increased Presence Area of Effect',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Presence Area of Effect/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence deal #% increased Damage': {
      filterText: 'Allies in your Presence deal #% increased Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence deal (\d+)%\s+increased Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence Regenerate # Life per second': {
      filterText: 'Allies in your Presence Regenerate # Life per second',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence Regenerate (\d+)\s+Life per second/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence have #% increased Cast Speed': {
      filterText: 'Allies in your Presence have #% increased Cast Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence have (\d+)%\s+increased Cast Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence have #% increased Critical Hit Chance': {
      filterText: 'Allies in your Presence have #% increased Critical Hit Chance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence have (\d+)%\s+increased Critical Hit Chance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence have #% increased Critical Damage Bonus': {
      filterText: 'Allies in your Presence have #% increased Critical Damage Bonus',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence have (\d+)%\s+increased Critical Damage Bonus/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence have #% to all Elemental Resistances': {
      filterText: 'Allies in your Presence have #% to all Elemental Resistances',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence have \+?(\d+)%\s+to all Elemental Resistances/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence deal # to # added Attack Cold Damage': {
      filterText: 'Allies in your Presence deal # to # added Attack Cold Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence deal (\d+)\s+to \d+\s+added Attack Cold Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence deal # to # added Attack Fire Damage': {
      filterText: 'Allies in your Presence deal # to # added Attack Fire Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence deal (\d+)\s+to \d+\s+added Attack Fire Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence deal # to # added Attack Lightning Damage': {
      filterText: 'Allies in your Presence deal # to # added Attack Lightning Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence deal (\d+)\s+to \d+\s+added Attack Lightning Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Allies in your Presence deal # to # added Attack Physical Damage': {
      filterText: 'Allies in your Presence deal # to # added Attack Physical Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Allies in your Presence deal (\d+)\s+to \d+\s+added Attack Physical Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Enemies in your Presence are Ignited as though dealt # Base Fire Damage': {
      filterText: 'Enemies in your Presence are Ignited as though dealt # Base Fire Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Enemies in your Presence are Ignited as though dealt (\d+)\s+Base Fire Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Enemies in your Presence have #% to Fire Resistance': {
      filterText: 'Enemies in your Presence have #% to Fire Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Enemies in your Presence have ([-+]?\d+)%\s+to Fire Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '#% of your Base Life Regeneration is granted to Allies in your Presence': {
      filterText: '#% of your Base Life Regeneration is granted to Allies in your Presence',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+of your Base Life Regeneration is granted to Allies in your Presence/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Share Charges with Allies in your Presence': {
      filterText: 'Share Charges with Allies in your Presence',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // This is a boolean stat, but we'll return 1 if it matches
        const match = statText.match(/Share Charges with Allies in your Presence/);
        return match ? 1 : null;
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
        // Match both "Physical Attack Damage" and "Physical Damage"
        const match = statText.match(/Leech(?:es)? (\d+(?:\.\d+)?)% of Physical (?:Attack )?Damage as Life/);
        return match ? parseFloat(match[1]) : null;
      }
    },
    'Leech.*Physical Attack Damage as Mana': {
      filterText: 'Leech #% of Physical Attack Damage as Mana',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        // Match both "Physical Attack Damage" and "Physical Damage"
        const match = statText.match(/Leech(?:es)? (\d+(?:\.\d+)?)% of Physical (?:Attack )?Damage as Mana/);
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

    // === LEECH & RECOVERY ADVANCED ===
    '% increased amount of Life Leeched': {
      filterText: '#% increased amount of Life Leeched',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+amount\s+of\s+Life\s+Leeched/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased amount of Mana Leeched': {
      filterText: '#% increased amount of Mana Leeched',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+amount\s+of\s+Mana\s+Leeched/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Recover % of maximum Life on Kill': {
      filterText: 'Recover #% of maximum Life on Kill',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Recover (\d+)%\s+of\s+maximum\s+Life\s+on\s+Kill/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Recover % of maximum Mana on Kill (Jewel)': {
      filterText: 'Recover #% of maximum Mana on Kill (Jewel)',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Recover (\d+)%\s+of\s+maximum\s+Mana\s+on\s+Kill(?:\s+\(Jewel\))?/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Gain # Life per Enemy Hit with Attacks': {
      filterText: 'Gain # Life per Enemy Hit with Attacks',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Gain (\d+)\s+Life\s+per\s+Enemy\s+Hit\s+with\s+Attacks/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Grants # Life per Enemy Hit': {
      filterText: 'Grants # Life per Enemy Hit',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Grants (\d+)\s+Life\s+per\s+Enemy\s+Hit/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% of Damage taken Recouped as Life': {
      filterText: '#% of Damage taken Recouped as Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+of\s+Damage\s+taken\s+Recouped\s+as\s+Life/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% of Damage taken Recouped as Mana': {
      filterText: '#% of Damage taken Recouped as Mana',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+of\s+Damage\s+taken\s+Recouped\s+as\s+Mana/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === FLASK MODIFIERS ===
    '% increased Flask Charges gained': {
      filterText: '#% increased Flask Charges gained',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Flask\s+Charges\s+gained/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Flask Life Recovery rate': {
      filterText: '#% increased Flask Life Recovery rate',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Flask\s+Life\s+Recovery\s+rate/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Flask Mana Recovery rate': {
      filterText: '#% increased Flask Mana Recovery rate',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Flask\s+Mana\s+Recovery\s+rate/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Flask Effect Duration': {
      filterText: '#% increased Flask Effect Duration',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Flask\s+Effect\s+Duration/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% reduced Flask Charges used': {
      filterText: '#% reduced Flask Charges used',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+reduced\s+Flask\s+Charges\s+used/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Life Flasks gain # charges per Second': {
      filterText: 'Life Flasks gain # charges per Second',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Life\s+Flasks\s+gain\s+(\d+)\s+charges\s+per\s+Second/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Mana Flasks gain # charges per Second': {
      filterText: 'Mana Flasks gain # charges per Second',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Mana\s+Flasks\s+gain\s+(\d+)\s+charges\s+per\s+Second/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Life Flasks used while on Low Life apply Recovery Instantly': {
      filterText: 'Life Flasks used while on Low Life apply Recovery Instantly',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Life\s+Flasks\s+used\s+while\s+on\s+Low\s+Life\s+apply\s+Recovery\s+Instantly/);
        return match ? 1 : null; // Boolean stat represented as 1
      }
    },
    'Mana Flasks used while on Low Mana apply Recovery Instantly': {
      filterText: 'Mana Flasks used while on Low Mana apply Recovery Instantly',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Mana\s+Flasks\s+used\s+while\s+on\s+Low\s+Mana\s+apply\s+Recovery\s+Instantly/);
        return match ? 1 : null; // Boolean stat represented as 1
      }
    },
    '% more Recovery if used while on Low Life': {
      filterText: '#% more Recovery if used while on Low Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+more\s+Recovery\s+if\s+used\s+while\s+on\s+Low\s+Life/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Recovery rate': {
      filterText: '#% increased Recovery rate',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Recovery\s+rate/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === SKILL-SPECIFIC MODIFIERS ===
    '% increased Damage with Bow Skills': {
      filterText: '#% increased Damage with Bow Skills',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Damage\s+with\s+Bow\s+Skills/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Damage with Bows': {
      filterText: '#% increased Damage with Bows',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Damage\s+with\s+Bows/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Damage with Crossbows': {
      filterText: '#% increased Damage with Crossbows',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Damage\s+with\s+Crossbows/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Damage with Quarterstaves': {
      filterText: '#% increased Damage with Quarterstaves',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Damage\s+with\s+Quarterstaves/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Damage with Spears': {
      filterText: '#% increased Damage with Spears',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Damage\s+with\s+Spears/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Damage with Maces': {
      filterText: '#% increased Damage with Maces',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Damage\s+with\s+Maces/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Herald Skills deal % increased Damage': {
      filterText: 'Herald Skills deal #% increased Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Herald\s+Skills\s+deal\s+(\d+)%\s+increased\s+Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Meta Skills gain % increased Energy': {
      filterText: 'Meta Skills gain #% increased Energy',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Meta\s+Skills\s+gain\s+(\d+)%\s+increased\s+Energy/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Skill Effect Duration': {
      filterText: '#% increased Skill Effect Duration',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Skill\s+Effect\s+Duration/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Charm Effect Duration': {
      filterText: '#% increased Charm Effect Duration',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Charm\s+Effect\s+Duration/);
        return match ? parseInt(match[1]) : null;
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
    },

    // === WEAPON MODIFIERS ===
    '% increased Melee Strike Range with this weapon': {
      filterText: '#% increased Melee Strike Range with this weapon',
      group: 'explicit' as const,
      dynamic: true,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Melee Strike Range with this weapon/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === ATTRIBUTE REQUIREMENTS ===
    '% reduced Attribute Requirements': {
      filterText: '#% reduced Attribute Requirements',
      group: 'explicit' as const,
      dynamic: true,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% reduced Attribute Requirements/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === AILMENT DURATION ===
    '% reduced Freeze Duration on you': {
      filterText: '#% reduced Freeze Duration on you',
      group: 'explicit' as const,
      dynamic: true,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% reduced Freeze Duration on you/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% reduced Ignite Duration on you': {
      filterText: '#% reduced Ignite Duration on you',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% reduced Ignite Duration on you/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% reduced Chill Duration on you': {
      filterText: '#% reduced Chill Duration on you',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% reduced Chill Duration on you/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% reduced Shock duration on you': {
      filterText: '#% reduced Shock duration on you',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% reduced Shock duration on you/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === STATUS EFFECT BUILDUP & MAGNITUDE ===
    '% increased Freeze Buildup': {
      filterText: '#% increased Freeze Buildup',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Freeze Buildup/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Ignite Magnitude': {
      filterText: '#% increased Ignite Magnitude',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Ignite\s+Magnitude/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Shock Duration': {
      filterText: '#% increased Shock Duration',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Shock Duration/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Magnitude of Shock you inflict': {
      filterText: '#% increased Magnitude of Shock you inflict',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Magnitude of Shock you inflict/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Magnitude of Bleeding you inflict': {
      filterText: '#% increased Magnitude of Bleeding you inflict',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Magnitude of Bleeding you inflict/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Magnitude of Poison you inflict': {
      filterText: '#% increased Magnitude of Poison you inflict',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Magnitude of Poison you inflict/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Magnitude of Chill you inflict': {
      filterText: '#% increased Magnitude of Chill you inflict',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Magnitude of Chill you inflict/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Magnitude of Damaging Ailments you inflict with Critical Hits': {
      filterText: '#% increased Magnitude of Damaging Ailments you inflict with Critical Hits',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% increased Magnitude of Damaging Ailments you inflict with Critical Hits/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === AILMENT CHANCE ===
    '% chance to inflict Bleeding on Hit': {
      filterText: '#% chance to inflict Bleeding on Hit',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% chance to inflict Bleeding on Hit/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% chance to Poison on Hit': {
      filterText: '#% chance to Poison on Hit',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% chance to Poison on Hit/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% chance to Blind Enemies on Hit with Attacks': {
      filterText: '#% chance to Blind Enemies on Hit with Attacks',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)% chance to Blind Enemies on Hit with Attacks/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === MINION STATS ===
    'Minions deal % increased Damage': {
      filterText: 'Minions deal #% increased Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions deal (\d+)%\s+increased Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions have % increased maximum Life': {
      filterText: 'Minions have #% increased maximum Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions have\s+(\d+)%\s+increased maximum Life/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions have % increased Attack and Cast Speed': {
      filterText: 'Minions have #% increased Attack and Cast Speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions have (\d+)%\s+increased Attack and Cast Speed/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions have % to all Elemental Resistances': {
      filterText: 'Minions have #% to all Elemental Resistances',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions have \+?(\d+)%\s+to all Elemental Resistances/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions have % additional Physical Damage Reduction': {
      filterText: 'Minions have #% additional Physical Damage Reduction',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions have (\d+)%\s+additional Physical Damage Reduction/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions have % increased Critical Damage Bonus': {
      filterText: 'Minions have #% increased Critical Damage Bonus',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions have (\d+)%\s+increased Critical Damage Bonus/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions have % increased Critical Hit Chance': {
      filterText: 'Minions have #% increased Critical Hit Chance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions have (\d+)%\s+increased Critical Hit Chance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Minion Accuracy Rating': {
      filterText: '#% increased Minion Accuracy Rating',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased Minion Accuracy Rating/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions have % to Chaos Resistance': {
      filterText: 'Minions have #% to Chaos Resistance',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions have \+?(\d+)%\s+to Chaos Resistance/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions gain % of their maximum Life as Extra maximum Energy Shield': {
      filterText: 'Minions gain #% of their maximum Life as Extra maximum Energy Shield',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions gain (\d+)%\s+of their maximum Life as Extra maximum Energy Shield/);
        return match ? parseInt(match[1]) : null;
      }
    },
    'Minions Revive % faster': {
      filterText: 'Minions Revive #% faster',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/Minions Revive (\d+)%\s+faster/);
        return match ? parseInt(match[1]) : null;
      }
    },

    // === TOTEM STATS ===
    '% increased Totem Damage': {
      filterText: '#% increased Totem Damage',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Totem\s+Damage/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Totem Life': {
      filterText: '#% increased Totem Life',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Totem\s+Life/);
        return match ? parseInt(match[1]) : null;
      }
    },
    '% increased Totem Placement speed': {
      filterText: '#% increased Totem Placement speed',
      group: 'explicit' as const,
      extractValue: (statText: string): number | null => {
        const match = statText.match(/(\d+)%\s+increased\s+Totem\s+Placement\s+speed/);
        return match ? parseInt(match[1]) : null;
      }
    }
  } as const satisfies StatMappingsWithUniqueKeys
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
  // BUT exclude presence-specific patterns which should never be local
  if (isWeapon && !statText.includes('Allies in your Presence') && !statText.includes('Enemies in your Presence')) {
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