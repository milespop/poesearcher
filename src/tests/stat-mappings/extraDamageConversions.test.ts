import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 19: EXTRA DAMAGE CONVERSIONS', () => {

  describe('Attack-Specific Extra Damage', () => {
    it('should map "Attacks Gain #% of Damage as Extra Fire Damage"', () => {
      const result = findStatMapping('Attacks Gain 15% of Damage as Extra Fire Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Attacks Gain #% of Damage as Extra Fire Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should map "Attacks Gain #% of Damage as Extra Cold Damage"', () => {
      const result = findStatMapping('Attacks Gain 20% of Damage as Extra Cold Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Attacks Gain #% of Damage as Extra Cold Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should map "Attacks Gain #% of Damage as Extra Lightning Damage"', () => {
      const result = findStatMapping('Attacks Gain 12% of Damage as Extra Lightning Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Attacks Gain #% of Damage as Extra Lightning Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(12);
    });

    it('should map "Attacks Gain #% of Damage as Extra Chaos Damage"', () => {
      const result = findStatMapping('Attacks Gain 8% of Damage as Extra Chaos Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Attacks Gain #% of Damage as Extra Chaos Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(8);
    });

    it('should handle larger attack extra damage values', () => {
      const result = findStatMapping('Attacks Gain 50% of Damage as Extra Fire Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Attacks Gain #% of Damage as Extra Fire Damage');
      expect(result?.value).toBe(50);
    });

    it('should handle single digit attack extra damage values', () => {
      const result = findStatMapping('Attacks Gain 5% of Damage as Extra Cold Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Attacks Gain #% of Damage as Extra Cold Damage');
      expect(result?.value).toBe(5);
    });

    it('should handle attack extra damage with extra spaces', () => {
      const result = findStatMapping('Attacks  Gain  25%  of  Damage  as  Extra  Lightning  Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Attacks Gain #% of Damage as Extra Lightning Damage');
      expect(result?.value).toBe(25);
    });
  });

  describe('Generic Extra Damage (existing)', () => {
    it('should still map existing "Gain #% of Damage as Extra Fire Damage"', () => {
      const result = findStatMapping('Gain 10% of Damage as Extra Fire Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Gain #% of Damage as Extra Fire Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(10);
    });

    it('should still map existing "Gain #% of Damage as Extra Cold Damage"', () => {
      const result = findStatMapping('Gain 15% of Damage as Extra Cold Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Gain #% of Damage as Extra Cold Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should still map existing "Gain #% of Damage as Extra Lightning Damage"', () => {
      const result = findStatMapping('Gain 12% of Damage as Extra Lightning Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Gain #% of Damage as Extra Lightning Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(12);
    });

    it('should still map existing "Gain #% of Damage as Extra Chaos Damage"', () => {
      const result = findStatMapping('Gain 8% of Damage as Extra Chaos Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Gain #% of Damage as Extra Chaos Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(8);
    });
  });

  describe('Prioritization - Attack-specific vs Generic', () => {
    it('should prioritize attack-specific over generic for fire damage', () => {
      const attackResult = findStatMapping('Attacks Gain 15% of Damage as Extra Fire Damage');
      const genericResult = findStatMapping('Gain 15% of Damage as Extra Fire Damage');

      expect(attackResult?.filterText).toBe('Attacks Gain #% of Damage as Extra Fire Damage');
      expect(genericResult?.filterText).toBe('Gain #% of Damage as Extra Fire Damage');

      // Ensure they are different mappings
      expect(attackResult?.filterText).not.toBe(genericResult?.filterText);
    });

    it('should prioritize attack-specific over generic for cold damage', () => {
      const attackResult = findStatMapping('Attacks Gain 20% of Damage as Extra Cold Damage');
      const genericResult = findStatMapping('Gain 20% of Damage as Extra Cold Damage');

      expect(attackResult?.filterText).toBe('Attacks Gain #% of Damage as Extra Cold Damage');
      expect(genericResult?.filterText).toBe('Gain #% of Damage as Extra Cold Damage');

      // Ensure they are different mappings
      expect(attackResult?.filterText).not.toBe(genericResult?.filterText);
    });

    it('should prioritize attack-specific over generic for lightning damage', () => {
      const attackResult = findStatMapping('Attacks Gain 12% of Damage as Extra Lightning Damage');
      const genericResult = findStatMapping('Gain 12% of Damage as Extra Lightning Damage');

      expect(attackResult?.filterText).toBe('Attacks Gain #% of Damage as Extra Lightning Damage');
      expect(genericResult?.filterText).toBe('Gain #% of Damage as Extra Lightning Damage');

      // Ensure they are different mappings
      expect(attackResult?.filterText).not.toBe(genericResult?.filterText);
    });

    it('should prioritize attack-specific over generic for chaos damage', () => {
      const attackResult = findStatMapping('Attacks Gain 8% of Damage as Extra Chaos Damage');
      const genericResult = findStatMapping('Gain 8% of Damage as Extra Chaos Damage');

      expect(attackResult?.filterText).toBe('Attacks Gain #% of Damage as Extra Chaos Damage');
      expect(genericResult?.filterText).toBe('Gain #% of Damage as Extra Chaos Damage');

      // Ensure they are different mappings
      expect(attackResult?.filterText).not.toBe(genericResult?.filterText);
    });
  });

  describe('Edge cases', () => {
    it('should not match incorrect attack extra damage patterns', () => {
      const result1 = findStatMapping('Attacks Gain of Damage as Extra Fire Damage');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Attack Gain 15% of Damage as Extra Fire Damage');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Attacks 15% of Damage as Extra Fire Damage');
      expect(result3).toBeFalsy();
    });

    it('should not match partial attack patterns', () => {
      const result1 = findStatMapping('Attacks Gain 15% as Extra Fire Damage');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Gain 15% of Damage as Extra Fire Damage');
      // This should match the generic pattern, not be falsy
      expect(result2).toBeTruthy();
      expect(result2?.filterText).toBe('Gain #% of Damage as Extra Fire Damage');

      const result3 = findStatMapping('Attacks Gain Extra Fire Damage');
      expect(result3).toBeFalsy();
    });

    it('should not match incorrect damage types', () => {
      const result1 = findStatMapping('Attacks Gain 15% of Damage as Extra Physical Damage');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Attacks Gain 15% of Damage as Extra Elemental Damage');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Attacks Gain 15% of Physical Damage as Extra Fire Damage');
      expect(result3).toBeFalsy();
    });

    it('should not match non-attack specific patterns', () => {
      const result1 = findStatMapping('Spells Gain 15% of Damage as Extra Fire Damage');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Skills Gain 15% of Damage as Extra Fire Damage');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Minions Gain 15% of Damage as Extra Fire Damage');
      expect(result3).toBeFalsy();
    });
  });

  describe('Integration with existing stats', () => {
    it('should not conflict with existing damage addition stats', () => {
      const extraResult = findStatMapping('Attacks Gain 15% of Damage as Extra Fire Damage');
      expect(extraResult).toBeTruthy();
      expect(extraResult?.filterText).toBe('Attacks Gain #% of Damage as Extra Fire Damage');

      const additionResult = findStatMapping('Adds 10 to 20 Fire damage to Attacks');
      expect(additionResult).toBeTruthy();
      expect(additionResult?.filterText).toBe('Adds # to # Fire damage to Attacks');

      // Ensure they are different mappings
      expect(extraResult?.filterText).not.toBe(additionResult?.filterText);
    });

    it('should not conflict with existing damage increase stats', () => {
      const extraResult = findStatMapping('Attacks Gain 15% of Damage as Extra Fire Damage');
      expect(extraResult).toBeTruthy();
      expect(extraResult?.filterText).toBe('Attacks Gain #% of Damage as Extra Fire Damage');

      const increaseResult = findStatMapping('15% increased Fire Damage');
      expect(increaseResult).toBeTruthy();
      expect(increaseResult?.filterText).toBe('#% increased Fire Damage');

      // Ensure they are different mappings
      expect(extraResult?.filterText).not.toBe(increaseResult?.filterText);
    });
  });

  describe('Combined extra damage stats', () => {
    it('should handle multiple extra damage stats correctly', () => {
      const attackFire = findStatMapping('Attacks Gain 15% of Damage as Extra Fire Damage');
      const attackCold = findStatMapping('Attacks Gain 20% of Damage as Extra Cold Damage');
      const attackLightning = findStatMapping('Attacks Gain 12% of Damage as Extra Lightning Damage');
      const attackChaos = findStatMapping('Attacks Gain 8% of Damage as Extra Chaos Damage');

      const genericFire = findStatMapping('Gain 10% of Damage as Extra Fire Damage');
      const genericCold = findStatMapping('Gain 15% of Damage as Extra Cold Damage');
      const genericLightning = findStatMapping('Gain 12% of Damage as Extra Lightning Damage');
      const genericChaos = findStatMapping('Gain 8% of Damage as Extra Chaos Damage');

      // Attack-specific
      expect(attackFire?.filterText).toBe('Attacks Gain #% of Damage as Extra Fire Damage');
      expect(attackCold?.filterText).toBe('Attacks Gain #% of Damage as Extra Cold Damage');
      expect(attackLightning?.filterText).toBe('Attacks Gain #% of Damage as Extra Lightning Damage');
      expect(attackChaos?.filterText).toBe('Attacks Gain #% of Damage as Extra Chaos Damage');

      // Generic
      expect(genericFire?.filterText).toBe('Gain #% of Damage as Extra Fire Damage');
      expect(genericCold?.filterText).toBe('Gain #% of Damage as Extra Cold Damage');
      expect(genericLightning?.filterText).toBe('Gain #% of Damage as Extra Lightning Damage');
      expect(genericChaos?.filterText).toBe('Gain #% of Damage as Extra Chaos Damage');

      // Values
      expect(attackFire?.value).toBe(15);
      expect(attackCold?.value).toBe(20);
      expect(attackLightning?.value).toBe(12);
      expect(attackChaos?.value).toBe(8);

      expect(genericFire?.value).toBe(10);
      expect(genericCold?.value).toBe(15);
      expect(genericLightning?.value).toBe(12);
      expect(genericChaos?.value).toBe(8);
    });
  });
});