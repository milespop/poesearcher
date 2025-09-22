import { describe, it, expect, findStatMapping } from './testSetup';

describe('Bug Fixes', () => {

  describe('Attribute Stat Mappings', () => {
    it('should map "# to Strength and Intelligence"', () => {
      const result = findStatMapping('+12 to Strength and Intelligence');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('# to Strength and Intelligence');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(12);
    });

    it('should handle "# to Strength and Intelligence" with desecrated modifier', () => {
      const result = findStatMapping('+12 to Strength and Intelligence (desecrated)');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('# to Strength and Intelligence');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(12);
    });

    it('should not confuse "to Strength and Intelligence" with single "to Strength"', () => {
      const strengthResult = findStatMapping('+25 to Strength');
      expect(strengthResult?.filterText).toBe('+# total to Strength');
      expect(strengthResult?.group).toBe('pseudo');

      const bothResult = findStatMapping('+12 to Strength and Intelligence');
      expect(bothResult?.filterText).toBe('# to Strength and Intelligence');
      expect(bothResult?.group).toBe('explicit');
    });
  });

  describe('Energy Shield Advanced Stats', () => {
    it('should map "#% faster start of Energy Shield Recharge"', () => {
      const result = findStatMapping('47% faster start of Energy Shield Recharge');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% faster start of Energy Shield Recharge');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(47);
    });

    it('should handle implicit Energy Shield Recharge stat', () => {
      const result = findStatMapping('47% faster start of Energy Shield Recharge (implicit)');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% faster start of Energy Shield Recharge');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(47);
    });
  });
});