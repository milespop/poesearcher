import { describe, it, expect, findStatMapping } from './testSetup';

describe('Status Effects & Ailments Stats', () => {
  describe('Ailment Duration Reduction', () => {
    it('should map "#% reduced Ignite Duration on you"', () => {
      const result = findStatMapping('45% reduced Ignite Duration on you');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% reduced Ignite Duration on you');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(45);
    });

    it('should map "#% reduced Chill Duration on you"', () => {
      const result = findStatMapping('30% reduced Chill Duration on you');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% reduced Chill Duration on you');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "#% reduced Shock duration on you"', () => {
      const result = findStatMapping('25% reduced Shock duration on you');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% reduced Shock duration on you');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should map "#% reduced Freeze Duration on you" (existing)', () => {
      const result = findStatMapping('42% reduced Freeze Duration on you');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% reduced Freeze Duration on you');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(42);
    });
  });

  describe('Status Effect Buildup & Magnitude', () => {
    it('should map "#% increased Freeze Buildup"', () => {
      const result = findStatMapping('20% increased Freeze Buildup');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Freeze Buildup');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should map "#% increased Ignite Magnitude"', () => {
      const result = findStatMapping('35% increased Ignite Magnitude');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Ignite Magnitude');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(35);
    });

    it('should map "#% increased Shock Duration"', () => {
      const result = findStatMapping('40% increased Shock Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Shock Duration');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(40);
    });
  });

  describe('Ailment Magnitude Modifiers', () => {
    it('should map "#% increased Magnitude of Shock you inflict"', () => {
      const result = findStatMapping('15% increased Magnitude of Shock you inflict');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Magnitude of Shock you inflict');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should map "#% increased Magnitude of Bleeding you inflict"', () => {
      const result = findStatMapping('25% increased Magnitude of Bleeding you inflict');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Magnitude of Bleeding you inflict');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should map "#% increased Magnitude of Poison you inflict"', () => {
      const result = findStatMapping('30% increased Magnitude of Poison you inflict');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Magnitude of Poison you inflict');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "#% increased Magnitude of Chill you inflict"', () => {
      const result = findStatMapping('10% increased Magnitude of Chill you inflict');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Magnitude of Chill you inflict');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(10);
    });

    it('should map complex crit ailment modifier', () => {
      const result = findStatMapping('20% increased Magnitude of Damaging Ailments you inflict with Critical Hits');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Magnitude of Damaging Ailments you inflict with Critical Hits');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });
  });

  describe('Ailment Application Chance', () => {
    it('should map "#% chance to inflict Bleeding on Hit"', () => {
      const result = findStatMapping('15% chance to inflict Bleeding on Hit');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% chance to inflict Bleeding on Hit');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should map "#% chance to Poison on Hit"', () => {
      const result = findStatMapping('12% chance to Poison on Hit');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% chance to Poison on Hit');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(12);
    });

    it('should map "#% chance to Blind Enemies on Hit with Attacks"', () => {
      const result = findStatMapping('8% chance to Blind Enemies on Hit with Attacks');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% chance to Blind Enemies on Hit with Attacks');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(8);
    });
  });

  describe('Edge Cases and High Values', () => {
    it('should handle high duration reductions', () => {
      const result = findStatMapping('80% reduced Ignite Duration on you');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(80);
    });

    it('should handle single digit magnitude increases', () => {
      const result = findStatMapping('5% increased Magnitude of Shock you inflict');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(5);
    });

    it('should handle high chance values', () => {
      const result = findStatMapping('100% chance to inflict Bleeding on Hit');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(100);
    });

    it('should handle extra spacing in text', () => {
      const result = findStatMapping('25%  increased  Ignite  Magnitude');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(25);
    });
  });

  describe('Integration with Existing Stats', () => {
    it('should not conflict with existing shock chance mapping', () => {
      const result = findStatMapping('15% increased chance to Shock');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased chance to Shock');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should differentiate between shock duration and shock magnitude', () => {
      const durationResult = findStatMapping('30% increased Shock Duration');
      expect(durationResult?.filterText).toBe('#% increased Shock Duration');

      const magnitudeResult = findStatMapping('25% increased Magnitude of Shock you inflict');
      expect(magnitudeResult?.filterText).toBe('#% increased Magnitude of Shock you inflict');

      expect(durationResult?.filterText).not.toBe(magnitudeResult?.filterText);
    });
  });
});