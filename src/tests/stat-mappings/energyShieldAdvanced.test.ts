import { describe, it, expect, findStatMapping } from './testSetup';

describe('Energy Shield Advanced Stats', () => {
  describe('Energy Shield Recharge', () => {
    it('should map "#% faster start of Energy Shield Recharge"', () => {
      const result = findStatMapping('47% faster start of Energy Shield Recharge');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% faster start of Energy Shield Recharge');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(47);
    });

    it('should map "#% increased Energy Shield Recharge Rate"', () => {
      const result = findStatMapping('25% increased Energy Shield Recharge Rate');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Energy Shield Recharge Rate');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });
  });

  describe('Energy Shield Damage Bypass', () => {
    it('should map "#% of Damage taken bypasses Energy Shield"', () => {
      const result = findStatMapping('15% of Damage taken bypasses Energy Shield');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% of Damage taken bypasses Energy Shield');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });
  });

  describe('Energy Shield Threshold Bonuses', () => {
    it('should map "Gain additional Stun Threshold equal to #% of maximum Energy Shield"', () => {
      const result = findStatMapping('Gain additional Stun Threshold equal to 30% of maximum Energy Shield');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Gain additional Stun Threshold equal to #% of maximum Energy Shield');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "Gain additional Ailment Threshold equal to #% of maximum Energy Shield"', () => {
      const result = findStatMapping('Gain additional Ailment Threshold equal to 20% of maximum Energy Shield');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Gain additional Ailment Threshold equal to #% of maximum Energy Shield');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });
  });

  describe('Edge Cases', () => {
    it('should handle high values for recharge rate', () => {
      const result = findStatMapping('100% increased Energy Shield Recharge Rate');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(100);
    });

    it('should handle single digit bypass percentages', () => {
      const result = findStatMapping('5% of Damage taken bypasses Energy Shield');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(5);
    });

    it('should handle threshold bonuses with different spacing', () => {
      const result = findStatMapping('Gain additional Stun Threshold equal to 50%  of maximum Energy Shield');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(50);
    });
  });
});