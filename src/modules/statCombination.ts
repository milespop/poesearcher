import { createLogger } from './logger';

// Create module logger
const logger = createLogger('StatCombiner');

// Define stat patterns that can be combined into pseudo totals
const COMBINABLE_STAT_PATTERNS = [
  {
    pattern: /^([+-]?\d+)%\s+to\s+(Cold|Fire|Lightning|Chaos)\s+Resistance$/i,
    pseudoFormat: (element: string, total: number) => `+${total}% total to ${element} Resistance`,
    extractElement: (match: RegExpMatchArray) => match[2]
  },
  {
    pattern: /^([+-]?\d+)\s+to\s+(Strength|Intelligence|Dexterity)$/i,
    pseudoFormat: (element: string, total: number) => `+${total} total to ${element}`,
    extractElement: (match: RegExpMatchArray) => match[2]
  },
  {
    pattern: /^([+-]?\d+)\s+to\s+maximum\s+Energy\s+Shield$/i,
    pseudoFormat: (_element: string, total: number) => `+${total} total maximum Energy Shield`,
    extractElement: () => 'Energy Shield'
  },
  {
    pattern: /^([+-]?\d+)\s+to\s+all\s+Attributes$/i,
    pseudoFormat: (_element: string, total: number) => `+${total} total to all Attributes`,
    extractElement: () => 'All Attributes'
  }
];

/**
 * Combines compatible implicit + explicit stats into pseudo totals for more accurate searches.
 *
 * This function analyzes implicit and explicit stats to find matching modifiers (like resistances,
 * attributes, energy shield) and combines them into pseudo total stats that can be searched more
 * effectively on the POE trade site.
 *
 * @param implicitStats Array of implicit stat strings (may include "(implicit)" suffix)
 * @param explicitStats Array of explicit stat strings
 * @returns Array of combined stats with pseudo totals replacing individual matching stats
 *
 * @example
 * const implicit = ['+28% to Lightning Resistance (implicit)'];
 * const explicit = ['+36% to Lightning Resistance'];
 * const result = combineCompatibleStats(implicit, explicit);
 * // Returns: ['+64% total to Lightning Resistance']
 */
export function combineCompatibleStats(implicitStats: string[], explicitStats: string[]): string[] {
  logger.debug('Starting stat combination process');
  logger.verbose('Implicit stats:', implicitStats);
  logger.verbose('Explicit stats:', explicitStats);

  // Track combinations made
  const combinations: Map<string, { total: number; sources: string[] }> = new Map();
  const remainingStats: string[] = [];

  // Process all stats (both implicit and explicit)
  const allStats = [
    ...implicitStats.map(stat => ({ text: stat, type: 'implicit' })),
    ...explicitStats.map(stat => ({ text: stat, type: 'explicit' }))
  ];

  for (const { text } of allStats) {
    let combined = false;

    // Clean the stat text (normalize whitespace first, then remove implicit marker)
    const cleanText = text.replace(/\s+/g, ' ').replace(/\s*\(implicit\)\s*$/, '').trim();

    // Try to match against combinable patterns
    for (const { pattern, extractElement } of COMBINABLE_STAT_PATTERNS) {
      const match = cleanText.match(pattern);
      if (match) {
        const value = parseInt(match[1]);
        const element = extractElement(match);
        const key = `${element.toLowerCase()}`;

        logger.verbose(`Found combinable stat: "${cleanText}" -> ${element}: ${value}`);

        if (combinations.has(key)) {
          // Add to existing combination
          const existing = combinations.get(key)!;
          existing.total += value;
          existing.sources.push(text);
          logger.verbose(`Combined with existing ${element}: total now ${existing.total}`);
        } else {
          // Create new combination
          combinations.set(key, {
            total: value,
            sources: [text]
          });
          logger.verbose(`Started new combination for ${element}: ${value}`);
        }
        combined = true;
        break;
      }
    }

    // If not combinable, add to remaining stats
    if (!combined) {
      remainingStats.push(text);
      logger.verbose(`Stat not combinable, keeping separate: "${text}"`);
    }
  }

  // Generate pseudo stats for combinations (only when there are multiple sources)
  const pseudoStats: string[] = [];
  for (const [key, { total, sources }] of combinations) {
    if (sources.length > 1) {
      // Only create pseudo stats when there are multiple sources to combine
      for (const { pattern, pseudoFormat, extractElement } of COMBINABLE_STAT_PATTERNS) {
        // Use the first source to determine the element name - normalize and clean it
        const firstSource = sources[0].replace(/\s+/g, ' ').replace(/\s*\(implicit\)\s*$/, '').trim();

        const match = firstSource.match(pattern);
        if (match) {
          const element = extractElement(match);
          if (element.toLowerCase() === key) {
            const pseudoStat = pseudoFormat(element, total);
            pseudoStats.push(pseudoStat);
            logger.info(`Created pseudo stat: "${pseudoStat}" from sources: [${sources.join(', ')}]`);
            break;
          }
        }
      }
    } else {
      // Single source - keep the original stat
      remainingStats.push(sources[0]);
      logger.verbose(`Single stat kept as-is: "${sources[0]}"`);
    }
  }

  const finalStats = [...remainingStats, ...pseudoStats];
  logger.info(`Combination complete: ${allStats.length} input stats -> ${finalStats.length} output stats`);
  logger.info(`Made ${combinations.size} combinations, kept ${remainingStats.length} individual stats`);

  return finalStats;
}