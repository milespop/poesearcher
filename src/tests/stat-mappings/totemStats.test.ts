import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 17: TOTEM STATS', () => {

  describe('Totem Damage', () => {
    it('should map "#% increased Totem Damage"', () => {
      const result = findStatMapping('24% increased Totem Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(24);
    });

    it('should handle multiple digit values', () => {
      const result = findStatMapping('150% increased Totem Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Damage');
      expect(result?.value).toBe(150);
    });

    it('should handle with + prefix', () => {
      const result = findStatMapping('+28% increased Totem Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Damage');
      expect(result?.value).toBe(28);
    });
  });

  describe('Totem Life', () => {
    it('should map "#% increased Totem Life"', () => {
      const result = findStatMapping('35% increased Totem Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Life');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(35);
    });

    it('should handle with extra spaces', () => {
      const result = findStatMapping('42%  increased  Totem  Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Life');
      expect(result?.value).toBe(42);
    });

    it('should handle single digit values', () => {
      const result = findStatMapping('8% increased Totem Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Life');
      expect(result?.value).toBe(8);
    });
  });

  describe('Totem Placement Speed', () => {
    it('should map "#% increased Totem Placement speed"', () => {
      const result = findStatMapping('18% increased Totem Placement speed');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Placement speed');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(18);
    });

    it('should handle case sensitivity correctly', () => {
      const result = findStatMapping('25% increased Totem Placement speed');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Placement speed');
      expect(result?.value).toBe(25);
    });

    it('should handle larger values', () => {
      const result = findStatMapping('100% increased Totem Placement speed');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Totem Placement speed');
      expect(result?.value).toBe(100);
    });
  });

  describe('Edge cases', () => {
    it('should not match partial totem stat text', () => {
      const result1 = findStatMapping('Your Totem takes 20% reduced Damage');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Totems taunt enemies');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('20% increased Damage if you have a Totem');
      expect(result3).toBeFalsy();
    });

    it('should not match incorrect stat types', () => {
      const result1 = findStatMapping('20% reduced Totem Damage');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('20% more Totem Life');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('20% decreased Totem Placement speed');
      expect(result3).toBeFalsy();
    });
  });

  describe('Integration with similar stats', () => {
    it('should not conflict with minion stats', () => {
      const minionResult = findStatMapping('Minions deal 25% increased Damage');
      expect(minionResult).toBeTruthy();
      expect(minionResult?.filterText).toBe('Minions deal #% increased Damage');

      const totemResult = findStatMapping('25% increased Totem Damage');
      expect(totemResult).toBeTruthy();
      expect(totemResult?.filterText).toBe('#% increased Totem Damage');

      // Ensure they are different mappings
      expect(minionResult?.filterText).not.toBe(totemResult?.filterText);
    });

    it('should handle combined totem and other stats correctly', () => {
      // Test that totem stats are correctly identified among other stats
      const totemDamage = findStatMapping('30% increased Totem Damage');
      const totemLife = findStatMapping('20% increased Totem Life');
      const totemPlacement = findStatMapping('15% increased Totem Placement speed');
      const otherStat = findStatMapping('25% increased Fire Damage');

      expect(totemDamage?.filterText).toBe('#% increased Totem Damage');
      expect(totemLife?.filterText).toBe('#% increased Totem Life');
      expect(totemPlacement?.filterText).toBe('#% increased Totem Placement speed');
      expect(otherStat?.filterText).toBe('#% increased Fire Damage');
    });
  });
});