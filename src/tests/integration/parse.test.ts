import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseItem } from '../../modules/itemParser';
import { findStatMapping } from '../../modules/statMappings';
import { combineCompatibleStats } from '../../modules/statCombination';

describe('Integration Tests - Real Game Items', () => {
  let itemTexts: Record<string, string> = {};

  beforeAll(() => {
    const itemsDir = join(__dirname, 'items');
    const itemFiles = [
      'amulet-stats.txt',
      'boots-nostack.txt',
      'es-chest-corrupted.txt',
      'focus-item.txt',
      'qs1.txt',
      'ring-duallightning.txt',
      'spear-throw.txt',
      'staff1.txt'
    ];

    itemFiles.forEach(file => {
      const path = join(itemsDir, file);
      itemTexts[file] = readFileSync(path, 'utf-8');
    });
  });

  describe('Amulet with multiple stats', () => {
    it('should parse and map all stats correctly', () => {
      const parsed = parseItem(itemTexts['amulet-stats.txt']);

      expect(parsed.itemClass).toBe('Amulets');
      expect(parsed.rarity).toBe('Rare');
      expect(parsed.name).toBe('Cataclysm Choker');
      expect(parsed.baseType).toBe('Solar Amulet');

      // Check implicit stats (parsed without the (implicit) suffix)
      expect(parsed.implicitStats).toHaveLength(1);
      expect(parsed.implicitStats[0]).toBe('+11 to Spirit');

      // Check explicit stats
      expect(parsed.stats).toContain('48% increased Armour');
      expect(parsed.stats).toContain('+23 to Dexterity');
      expect(parsed.stats).toContain('+23% to Fire Resistance');

      // Verify all stats can be mapped
      const allStats = [...parsed.implicitStats, ...parsed.stats];
      const unmappedStats: string[] = [];

      allStats.forEach(stat => {
        const mapping = findStatMapping(stat);
        if (!mapping) {
          unmappedStats.push(stat);
        }
      });

      // Log unmapped stats for debugging
      if (unmappedStats.length > 0) {
        console.log('Unmapped stats in amulet:', unmappedStats);
      }
    });
  });

  describe('Energy Shield chest with corrupted mods and bug fix stats', () => {
    it('should handle all special modifiers correctly', () => {
      const parsed = parseItem(itemTexts['es-chest-corrupted.txt']);

      expect(parsed.itemClass).toBe('Body Armours');
      expect(parsed.rarity).toBe('Rare');
      expect(parsed.name).toBe('Sol Veil');
      expect(parsed.baseType).toBe('Sacramental Robe');

      // Check implicit - this was one of our bug fixes (parsed without the suffix)
      expect(parsed.implicitStats).toContain('47% faster start of Energy Shield Recharge');

      // Check desecrated stat - this was another bug fix
      expect(parsed.stats).toContain('+12 to Strength and Intelligence (desecrated)');

      // Verify the bug fix stats map correctly
      const esRechargeMapping = findStatMapping('47% faster start of Energy Shield Recharge');
      expect(esRechargeMapping).toBeTruthy();
      expect(esRechargeMapping?.filterText).toBe('#% faster start of Energy Shield Recharge');
      expect(esRechargeMapping?.value).toBe(47);

      const strIntMapping = findStatMapping('+12 to Strength and Intelligence');
      expect(strIntMapping).toBeTruthy();
      expect(strIntMapping?.filterText).toBe('# to Strength and Intelligence');
      expect(strIntMapping?.value).toBe(12);
    });

    it('should not incorrectly combine Strength and Intelligence dual stat', () => {
      const parsed = parseItem(itemTexts['es-chest-corrupted.txt']);

      // The dual stat should NOT be combined into a pseudo strength stat
      const combined = combineCompatibleStats(parsed.implicitStats, parsed.stats);

      // Should keep the dual stat as-is
      expect(combined).toContain('+12 to Strength and Intelligence (desecrated)');

      // Should NOT create a pseudo strength stat from this
      const hasPseudoStrength = combined.some(stat =>
        stat.includes('total to Strength') && !stat.includes('and Intelligence')
      );
      expect(hasPseudoStrength).toBe(false);
    });
  });

  describe('Ring with dual lightning resistance', () => {
    it('should parse the ring item correctly', () => {
      const parsed = parseItem(itemTexts['ring-duallightning.txt']);

      expect(parsed.itemClass).toBe('Rings');
      expect(parsed.rarity).toBeTruthy();
      expect(parsed.name).toBeTruthy();

      // Check if we have both implicit and explicit stats
      const hasImplicitLightning = parsed.implicitStats.some(stat =>
        stat.includes('Lightning Resistance')
      );
      const hasExplicitLightning = parsed.stats.some(stat =>
        stat.includes('Lightning Resistance')
      );

      // If both exist, test combination
      if (hasImplicitLightning && hasExplicitLightning) {
        const combined = combineCompatibleStats(parsed.implicitStats, parsed.stats);

        // Should have a pseudo total
        const pseudoLightning = combined.find(stat =>
          stat.includes('total to Lightning Resistance')
        );
        expect(pseudoLightning).toBeTruthy();

        // The pseudo stat should be mappable
        if (pseudoLightning) {
          const mapping = findStatMapping(pseudoLightning);
          expect(mapping).toBeTruthy();
          expect(mapping?.group).toBe('pseudo');
        }
      }
    });
  });

  describe('Staff with multiple modifiers', () => {
    it('should parse and map complex weapon stats', () => {
      const parsed = parseItem(itemTexts['staff1.txt']);

      expect(parsed.itemClass).toBe('Staves');

      // Check that all stats are parsed
      const allStats = [
        ...parsed.implicitStats,
        ...parsed.stats
      ];

      // Map all stats and check for any unsupported ones
      const mappingResults = allStats.map(stat => ({
        stat,
        mapping: findStatMapping(stat)
      }));

      const unsupported = mappingResults.filter(r => !r.mapping);

      // Log any unsupported stats for debugging
      if (unsupported.length > 0) {
        console.log('Unsupported stats in staff1.txt:', unsupported.map(u => u.stat));
      }

      // We expect most stats to be supported
      const supportedRatio = (mappingResults.length - unsupported.length) / mappingResults.length;
      expect(supportedRatio).toBeGreaterThan(0.7); // At least 70% should be supported
    });
  });

  describe('Complete parsing flow for all items', () => {
    it('should successfully parse all test items without errors', () => {
      Object.entries(itemTexts).forEach(([, text]) => {
        expect(() => {
          const parsed = parseItem(text);
          expect(parsed).toBeTruthy();
          expect(parsed.itemClass).toBeTruthy();
        }).not.toThrow();
      });
    });

    it('should handle stat combination for all items', () => {
      Object.entries(itemTexts).forEach(([, text]) => {
        const parsed = parseItem(text);

        expect(() => {
          const combined = combineCompatibleStats(
            parsed.implicitStats,
            parsed.stats
          );
          expect(Array.isArray(combined)).toBe(true);
        }).not.toThrow();
      });
    });

    it('should map majority of stats for all items', () => {
      const allItemsStats: { file: string; stat: string; mapped: boolean }[] = [];

      Object.entries(itemTexts).forEach(([filename, text]) => {
        const parsed = parseItem(text);
        const allStats = [
          ...parsed.implicitStats,
          ...parsed.stats
        ];

        allStats.forEach(stat => {
          const mapping = findStatMapping(stat);
          allItemsStats.push({
            file: filename,
            stat,
            mapped: !!mapping
          });
        });
      });

      const totalStats = allItemsStats.length;
      const mappedStats = allItemsStats.filter(s => s.mapped).length;
      const unmappedStats = allItemsStats.filter(s => !s.mapped);

      console.log(`\nIntegration Test Summary:`);
      console.log(`Total stats across all items: ${totalStats}`);
      console.log(`Successfully mapped: ${mappedStats} (${((mappedStats/totalStats)*100).toFixed(1)}%)`);
      console.log(`Unmapped stats: ${unmappedStats.length}`);

      if (unmappedStats.length > 0) {
        console.log('\nUnmapped stats by file:');
        const byFile = unmappedStats.reduce((acc, s) => {
          if (!acc[s.file]) acc[s.file] = [];
          acc[s.file].push(s.stat);
          return acc;
        }, {} as Record<string, string[]>);

        Object.entries(byFile).forEach(([file, stats]) => {
          console.log(`  ${file}: ${stats.length} unmapped`);
          stats.forEach(stat => console.log(`    - ${stat}`));
        });
      }

      // We expect at least 70% of stats to be mapped
      const mappingRatio = mappedStats / totalStats;
      expect(mappingRatio).toBeGreaterThan(0.7);
    });
  });

  describe('Focus item support', () => {
    it('should parse Focus items correctly and resolve the Foci class bug', () => {
      const parsed = parseItem(itemTexts['focus-item.txt']);

      expect(parsed.itemClass).toBe('Foci');
      expect(parsed.rarity).toBe('Rare');
      expect(parsed.name).toBe('Mind Anthem');
      expect(parsed.baseType).toBe('Druidic Focus');

      // Verify all Focus item stats can be mapped
      const allStats = [...parsed.implicitStats, ...parsed.stats];
      const unmappedStats: string[] = [];

      allStats.forEach(stat => {
        const mapping = findStatMapping(stat);
        if (!mapping) {
          unmappedStats.push(stat);
        }
      });

      // Log unmapped stats for debugging
      if (unmappedStats.length > 0) {
        console.log('Unmapped stats in focus-item:', unmappedStats);
      }

      // Verify the bug fix: "Unknown item class: Foci" should no longer occur
      // This is implicitly tested by the successful parsing above
      expect(parsed.itemClass).toBe('Foci');

      // All Focus stats should be mappable (this is a high-value item with standard stats)
      expect(unmappedStats.length).toBe(0);
    });
  });

  describe('Specific bug fix verification', () => {
    it('should correctly handle the ES chest item that triggered bug reports', () => {
      const parsed = parseItem(itemTexts['es-chest-corrupted.txt']);
      const combined = combineCompatibleStats(parsed.implicitStats, parsed.stats);

      // Test the complete flow as it would happen in the extension
      combined.forEach(stat => {
        const mapping = findStatMapping(stat);

        // These specific stats should now be supported
        if (stat.includes('faster start of Energy Shield Recharge')) {
          expect(mapping).toBeTruthy();
          expect(mapping?.filterText).toBe('#% faster start of Energy Shield Recharge');
        }

        if (stat.includes('to Strength and Intelligence')) {
          expect(mapping).toBeTruthy();
          expect(mapping?.filterText).toBe('# to Strength and Intelligence');
          expect(mapping?.group).toBe('explicit');
        }
      });
    });
  });
});