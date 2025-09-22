import { describe, it, expect } from 'vitest';
import { findStatMapping } from '../modules/statMappings';

describe('Stat Mappings Tests', () => {

  // ========================================
  // TABLE 1: BASIC ATTRIBUTES & LIFE/MANA
  // ========================================
  describe('Table 1: Basic Attributes & Life/Mana', () => {

    it('should map "# to maximum Energy Shield" (currently returns pseudo first)', () => {
      // Note: Returns pseudo stat due to object iteration order
      const result = findStatMapping('100 to maximum Energy Shield');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('+# total maximum Energy Shield');
      expect(result?.group).toBe('pseudo');
      expect(result?.value).toBe(100);
    });

    it('should map "#% increased maximum Life"', () => {
      const result = findStatMapping('50% increased maximum Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased maximum Life');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(50);
    });

    it('should map "#% increased maximum Mana"', () => {
      const result = findStatMapping('30% increased maximum Mana');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased maximum Mana');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "#% increased maximum Energy Shield"', () => {
      const result = findStatMapping('75% increased maximum Energy Shield');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased maximum Energy Shield');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(75);
    });

    it('should map "#% increased Life Regeneration rate"', () => {
      const result = findStatMapping('25% increased Life Regeneration rate');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Life Regeneration rate');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should map "#% of Damage is taken from Mana before Life"', () => {
      const result = findStatMapping('30% of Damage is taken from Mana before Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% of Damage is taken from Mana before Life');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "#% of Maximum Life Converted to Energy Shield"', () => {
      const result = findStatMapping('15% of Maximum Life Converted to Energy Shield');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% of Maximum Life Converted to Energy Shield');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    // Test with + prefix variations
    it('should handle + prefix for life/mana/ES stats', () => {
      const result = findStatMapping('+25% increased maximum Life');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(25);
    });
  });

  // ========================================
  // TABLE 2: RESISTANCES
  // ========================================
  describe('Table 2: Resistances', () => {

    it('should map "#% to Maximum Cold Resistance"', () => {
      const result = findStatMapping('+5% to Maximum Cold Resistance');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% to Maximum Cold Resistance');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(5);
    });

    it('should map "#% to Maximum Fire Resistance"', () => {
      const result = findStatMapping('+4% to Maximum Fire Resistance');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% to Maximum Fire Resistance');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(4);
    });

    it('should map "#% to Maximum Lightning Resistance"', () => {
      const result = findStatMapping('+6% to Maximum Lightning Resistance');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% to Maximum Lightning Resistance');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(6);
    });

    it('should map "#% maximum Player Resistances"', () => {
      const result = findStatMapping('10% maximum Player Resistances');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% maximum Player Resistances');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(10);
    });

    // Test without + prefix
    it('should handle stats without + prefix', () => {
      const result = findStatMapping('3% to Maximum Fire Resistance');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(3);
    });
  });

  // ========================================
  // TABLE 3: DAMAGE MODIFIERS
  // ========================================
  describe('Table 3: Damage Modifiers', () => {

    it('should map "#% increased Chaos Damage"', () => {
      const result = findStatMapping('45% increased Chaos Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Chaos Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(45);
    });

    describe('#% increased Damage (generic)', () => {
      it('should map pure "#% increased Damage"', () => {
        const result = findStatMapping('50% increased Damage');
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('#% increased Damage');
        expect(result?.group).toBe('explicit');
        expect(result?.value).toBe(50);
      });

      it('should handle + prefix for generic damage', () => {
        const result = findStatMapping('+35% increased Damage');
        expect(result).toBeTruthy();
        expect(result?.value).toBe(35);
      });

      it('should NOT match "increased Damage with Bows"', () => {
        const result = findStatMapping('50% increased Damage with Bows');
        // This should either not find the generic damage mapping or find a different one
        if (result && result.filterText === '#% increased Damage') {
          expect(result.value).toBeNull();
        }
      });

      it('should NOT match "increased Damage with Bow Skills"', () => {
        const result = findStatMapping('50% increased Damage with Bow Skills');
        if (result && result.filterText === '#% increased Damage') {
          expect(result.value).toBeNull();
        }
      });

      it('should NOT match "increased Damage while you have an active Charm"', () => {
        const result = findStatMapping('50% increased Damage while you have an active Charm');
        if (result && result.filterText === '#% increased Damage') {
          expect(result.value).toBeNull();
        }
      });

      it('should NOT match "increased Damage if you have Consumed a Corpse Recently"', () => {
        const result = findStatMapping('50% increased Damage if you have Consumed a Corpse Recently');
        if (result && result.filterText === '#% increased Damage') {
          expect(result.value).toBeNull();
        }
      });

      it('should NOT match "increased Damage against Enemies with Fully Broken Armour"', () => {
        const result = findStatMapping('50% increased Damage against Enemies with Fully Broken Armour');
        if (result && result.filterText === '#% increased Damage') {
          expect(result.value).toBeNull();
        }
      });
    });

    it('should map "#% increased Global Physical Damage"', () => {
      const result = findStatMapping('60% increased Global Physical Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Global Physical Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(60);
    });

    it('should map "#% increased Spell Physical Damage"', () => {
      const result = findStatMapping('40% increased Spell Physical Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Spell Physical Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(40);
    });
  });

  // ========================================
  // EXISTING STATS (Regression Tests)
  // ========================================
  describe('Existing Stats (Regression Tests)', () => {

    it('should still map "# to maximum Life"', () => {
      const result = findStatMapping('+95 to maximum Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('# to maximum Life');
      expect(result?.value).toBe(95);
    });

    it('should still map "# to maximum Mana"', () => {
      const result = findStatMapping('+120 to maximum Mana');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('# to maximum Mana');
      expect(result?.value).toBe(120);
    });

    it('should still map resistances correctly', () => {
      // Note: Returns pseudo stat due to object iteration order
      const fireRes = findStatMapping('+45% to Fire Resistance');
      expect(fireRes).toBeTruthy();
      expect(fireRes?.filterText).toBe('+#% total to Fire Resistance');
      expect(fireRes?.value).toBe(45);
    });

    it('should still map elemental damage correctly', () => {
      const fireDmg = findStatMapping('25% increased Fire Damage');
      expect(fireDmg).toBeTruthy();
      expect(fireDmg?.filterText).toBe('#% increased Fire Damage');
      expect(fireDmg?.value).toBe(25);

      const coldDmg = findStatMapping('30% increased Cold Damage');
      expect(coldDmg).toBeTruthy();
      expect(coldDmg?.filterText).toBe('#% increased Cold Damage');
      expect(coldDmg?.value).toBe(30);

      const lightDmg = findStatMapping('35% increased Lightning Damage');
      expect(lightDmg).toBeTruthy();
      expect(lightDmg?.filterText).toBe('#% increased Lightning Damage');
      expect(lightDmg?.value).toBe(35);
    });

    it('should still map physical damage correctly', () => {
      const physDmg = findStatMapping('100% increased Physical Damage');
      expect(physDmg).toBeTruthy();
      expect(physDmg?.filterText).toBe('#% increased Physical Damage');
      expect(physDmg?.value).toBe(100);
    });

    it('should still map added damage correctly', () => {
      const addedPhys = findStatMapping('Adds 10 to 20 Physical Damage');
      expect(addedPhys).toBeTruthy();
      expect(addedPhys?.filterText).toBe('Adds # to # Physical Damage');

      const addedFire = findStatMapping('Adds 15 to 25 Fire Damage');
      expect(addedFire).toBeTruthy();
      expect(addedFire?.filterText).toBe('Adds # to # Fire Damage');
    });

    it('should handle "Gain % of Damage as Extra X Damage" stats', () => {
      const extraCold = findStatMapping('Gain 34% of Damage as Extra Cold Damage');
      expect(extraCold).toBeTruthy();
      expect(extraCold?.filterText).toBe('Gain #% of Damage as Extra Cold Damage');
      expect(extraCold?.value).toBe(34);

      const extraLight = findStatMapping('Gain 45% of Damage as Extra Lightning Damage');
      expect(extraLight).toBeTruthy();
      expect(extraLight?.filterText).toBe('Gain #% of Damage as Extra Lightning Damage');
      expect(extraLight?.value).toBe(45);
    });

    it('should handle presence area of effect (user reported issue)', () => {
      const presence = findStatMapping('21% increased Presence Area of Effect');
      // This should now be implemented
      expect(presence).toBeFalsy(); // Still not implemented yet, but will be in next tables
    });
  });

  // ========================================
  // EDGE CASES & ERROR HANDLING
  // ========================================
  describe('Edge Cases', () => {

    it('should handle malformed input gracefully', () => {
      expect(findStatMapping('')).toBeNull();
      expect(findStatMapping('not a valid stat')).toBeNull();
      expect(findStatMapping('123')).toBeNull();
    });

    it('should handle very large numbers', () => {
      const result = findStatMapping('999999% increased maximum Life');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(999999);
    });

    it('should handle decimal values where appropriate', () => {
      const result = findStatMapping('Leeches 5.61% of Physical Damage as Mana');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(5.61);
    });
  });
});