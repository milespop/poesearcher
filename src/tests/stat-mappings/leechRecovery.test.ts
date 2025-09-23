import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 13: LEECH & RECOVERY ADVANCED', () => {

  describe('Leech Effectiveness', () => {
    it('should map "#% increased amount of Life Leeched"', () => {
      const result = findStatMapping('25% increased amount of Life Leeched');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased amount of Life Leeched');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should map "#% increased amount of Mana Leeched"', () => {
      const result = findStatMapping('40% increased amount of Mana Leeched');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased amount of Mana Leeched');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(40);
    });

    it('should handle with extra spaces', () => {
      const result = findStatMapping('15%  increased  amount  of  Life  Leeched');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased amount of Life Leeched');
      expect(result?.value).toBe(15);
    });
  });

  describe('Life/Mana on Kill', () => {
    it('should map "Recover #% of maximum Life on Kill"', () => {
      const result = findStatMapping('Recover 5% of maximum Life on Kill');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Recover #% of maximum Life on Kill');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(5);
    });

    it('should map "Recover #% of maximum Mana on Kill (Jewel)"', () => {
      const result = findStatMapping('Recover 3% of maximum Mana on Kill (Jewel)');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Recover #% of maximum Mana on Kill (Jewel)');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(3);
    });

    it('should handle Mana on Kill without (Jewel) suffix', () => {
      const result = findStatMapping('Recover 4% of maximum Mana on Kill');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Recover #% of maximum Mana on Kill (Jewel)');
      expect(result?.value).toBe(4);
    });

    it('should handle larger percentage values', () => {
      const result = findStatMapping('Recover 12% of maximum Life on Kill');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Recover #% of maximum Life on Kill');
      expect(result?.value).toBe(12);
    });
  });

  describe('Life on Hit', () => {
    it('should map "Gain # Life per Enemy Hit with Attacks"', () => {
      const result = findStatMapping('Gain 15 Life per Enemy Hit with Attacks');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Gain # Life per Enemy Hit with Attacks');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should map "Grants # Life per Enemy Hit"', () => {
      const result = findStatMapping('Grants 8 Life per Enemy Hit');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Grants # Life per Enemy Hit');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(8);
    });

    it('should handle larger values', () => {
      const result = findStatMapping('Gain 250 Life per Enemy Hit with Attacks');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Gain # Life per Enemy Hit with Attacks');
      expect(result?.value).toBe(250);
    });

    it('should handle single digit values', () => {
      const result = findStatMapping('Grants 1 Life per Enemy Hit');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Grants # Life per Enemy Hit');
      expect(result?.value).toBe(1);
    });
  });

  describe('Recoup Mechanics', () => {
    it('should map "#% of Damage taken Recouped as Life"', () => {
      const result = findStatMapping('20% of Damage taken Recouped as Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% of Damage taken Recouped as Life');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should map "#% of Damage taken Recouped as Mana"', () => {
      const result = findStatMapping('15% of Damage taken Recouped as Mana');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% of Damage taken Recouped as Mana');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should handle recoup with extra spaces', () => {
      const result = findStatMapping('10%  of  Damage  taken  Recouped  as  Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% of Damage taken Recouped as Life');
      expect(result?.value).toBe(10);
    });

    it('should handle larger recoup percentages', () => {
      const result = findStatMapping('100% of Damage taken Recouped as Mana');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% of Damage taken Recouped as Mana');
      expect(result?.value).toBe(100);
    });
  });

  describe('Edge cases', () => {
    it('should not match incorrect leech patterns', () => {
      const result1 = findStatMapping('20% reduced amount of Life Leeched');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('20% more amount of Mana Leeched');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Life Leech is doubled');
      expect(result3).toBeFalsy();
    });

    it('should not match incorrect recovery patterns', () => {
      const result1 = findStatMapping('Recover 20 Life on Kill');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Recover Life equal to 5% of maximum Life on Kill');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('20% increased Life Recovery rate');
      expect(result3).toBeFalsy();
    });

    it('should not match partial hit patterns', () => {
      const result1 = findStatMapping('Gain Life per Enemy Hit');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('15 Life per Enemy Hit with Attacks');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Gain 15 Life per Hit');
      expect(result3).toBeFalsy();
    });
  });

  describe('Integration with existing stats', () => {
    it('should not conflict with existing leech stats', () => {
      const existingResult = findStatMapping('Leech 2.5% of Physical Attack Damage as Life');
      expect(existingResult).toBeTruthy();
      expect(existingResult?.filterText).toBe('Leech #% of Physical Attack Damage as Life');

      const newResult = findStatMapping('25% increased amount of Life Leeched');
      expect(newResult).toBeTruthy();
      expect(newResult?.filterText).toBe('#% increased amount of Life Leeched');

      // Ensure they are different mappings
      expect(existingResult?.filterText).not.toBe(newResult?.filterText);
    });

    it('should not conflict with existing life/mana on kill stats', () => {
      const existingResult = findStatMapping('Gain 10 Life per Enemy Killed');
      expect(existingResult).toBeTruthy();
      expect(existingResult?.filterText).toBe('Gain # Life per Enemy Killed');

      const newResult = findStatMapping('Recover 5% of maximum Life on Kill');
      expect(newResult).toBeTruthy();
      expect(newResult?.filterText).toBe('Recover #% of maximum Life on Kill');

      // Ensure they are different mappings
      expect(existingResult?.filterText).not.toBe(newResult?.filterText);
    });
  });

  describe('Combined recovery stats', () => {
    it('should handle multiple recovery stats correctly', () => {
      const lifeLeech = findStatMapping('30% increased amount of Life Leeched');
      const manaLeech = findStatMapping('25% increased amount of Mana Leeched');
      const lifeOnKill = findStatMapping('Recover 8% of maximum Life on Kill');
      const lifeOnHit = findStatMapping('Gain 20 Life per Enemy Hit with Attacks');
      const recoup = findStatMapping('15% of Damage taken Recouped as Life');

      expect(lifeLeech?.filterText).toBe('#% increased amount of Life Leeched');
      expect(manaLeech?.filterText).toBe('#% increased amount of Mana Leeched');
      expect(lifeOnKill?.filterText).toBe('Recover #% of maximum Life on Kill');
      expect(lifeOnHit?.filterText).toBe('Gain # Life per Enemy Hit with Attacks');
      expect(recoup?.filterText).toBe('#% of Damage taken Recouped as Life');

      expect(lifeLeech?.value).toBe(30);
      expect(manaLeech?.value).toBe(25);
      expect(lifeOnKill?.value).toBe(8);
      expect(lifeOnHit?.value).toBe(20);
      expect(recoup?.value).toBe(15);
    });
  });
});