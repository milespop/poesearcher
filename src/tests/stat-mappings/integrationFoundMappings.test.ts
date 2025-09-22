import { describe, it, expect, findStatMapping } from './testSetup';

describe('Integration Test Found Mappings', () => {
  describe('Leech Stats (Enhanced)', () => {
    it('should map "Leeches #% of Physical Damage as Life" (generic)', () => {
      const result = findStatMapping('Leeches 9.17% of Physical Damage as Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Leech #% of Physical Attack Damage as Life');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(9.17);
    });

    it('should map "Leech #% of Physical Attack Damage as Life" (specific)', () => {
      const result = findStatMapping('Leech 5% of Physical Attack Damage as Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Leech #% of Physical Attack Damage as Life');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(5);
    });

    it('should map "Leeches #% of Physical Damage as Mana" (generic)', () => {
      const result = findStatMapping('Leeches 3.5% of Physical Damage as Mana');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Leech #% of Physical Attack Damage as Mana');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(3.5);
    });
  });

  describe('Weapon Modifiers', () => {
    it('should map "# % increased Melee Strike Range with this weapon"', () => {
      const result = findStatMapping('16% increased Melee Strike Range with this weapon');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Melee Strike Range with this weapon');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(16);
    });
  });

  describe('Attribute Requirements', () => {
    it('should map "#% reduced Attribute Requirements"', () => {
      const result = findStatMapping('35% reduced Attribute Requirements');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% reduced Attribute Requirements');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(35);
    });
  });

  describe('Ailment Duration', () => {
    it('should map "#% reduced Freeze Duration on you"', () => {
      const result = findStatMapping('42% reduced Freeze Duration on you');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% reduced Freeze Duration on you');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(42);
    });
  });

  describe('Real Item Compatibility', () => {
    it('should handle all stats from boots-nostack.txt', () => {
      const bootStats = [
        '35% reduced Attribute Requirements',
        '42% reduced Freeze Duration on you'
      ];

      bootStats.forEach(stat => {
        const result = findStatMapping(stat);
        expect(result).toBeTruthy();
        expect(result?.group).toBe('explicit');
      });
    });

    it('should handle all stats from qs1.txt', () => {
      const weaponStats = [
        '16% increased Melee Strike Range with this weapon',
        'Leeches 9.17% of Physical Damage as Life'
      ];

      weaponStats.forEach(stat => {
        const result = findStatMapping(stat);
        expect(result).toBeTruthy();
        expect(result?.group).toBe('explicit');
      });
    });
  });
});