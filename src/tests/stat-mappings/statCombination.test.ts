import { describe, it, expect } from 'vitest';
import { combineCompatibleStats } from '../../modules/statCombination';

describe('Stat Combination Logic', () => {

  describe('Resistance Combinations', () => {
    it('should combine Lightning Resistance from implicit and explicit', () => {
      const implicitStats = ['+28% to Lightning Resistance (implicit)'];
      const explicitStats = ['+36% to Lightning Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+64% total to Lightning Resistance');
    });

    it('should combine Fire Resistance correctly', () => {
      const implicitStats = ['+15% to Fire Resistance (implicit)'];
      const explicitStats = ['+25% to Fire Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+40% total to Fire Resistance');
    });

    it('should combine Cold Resistance correctly', () => {
      const implicitStats = ['+12% to Cold Resistance (implicit)'];
      const explicitStats = ['+38% to Cold Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+50% total to Cold Resistance');
    });

    it('should combine Chaos Resistance correctly', () => {
      const implicitStats = ['+10% to Chaos Resistance (implicit)'];
      const explicitStats = ['+20% to Chaos Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+30% total to Chaos Resistance');
    });

    it('should handle resistance without + prefix', () => {
      const implicitStats = ['15% to Fire Resistance (implicit)'];
      const explicitStats = ['25% to Fire Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+40% total to Fire Resistance');
    });

    it('should handle negative resistance values', () => {
      const implicitStats = ['-10% to Lightning Resistance (implicit)'];
      const explicitStats = ['+30% to Lightning Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+20% total to Lightning Resistance');
    });
  });

  describe('Attribute Combinations', () => {
    it('should combine Strength from implicit and explicit', () => {
      const implicitStats = ['+15 to Strength (implicit)'];
      const explicitStats = ['+25 to Strength'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+40 total to Strength');
    });

    it('should combine Intelligence correctly', () => {
      const implicitStats = ['+20 to Intelligence (implicit)'];
      const explicitStats = ['+30 to Intelligence'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+50 total to Intelligence');
    });

    it('should combine Dexterity correctly', () => {
      const implicitStats = ['+18 to Dexterity (implicit)'];
      const explicitStats = ['+22 to Dexterity'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+40 total to Dexterity');
    });

    it('should combine all Attributes correctly', () => {
      const implicitStats = ['+10 to all Attributes (implicit)'];
      const explicitStats = ['+15 to all Attributes'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+25 total to all Attributes');
    });
  });

  describe('Energy Shield Combinations', () => {
    it('should combine maximum Energy Shield', () => {
      const implicitStats = ['+50 to maximum Energy Shield (implicit)'];
      const explicitStats = ['+75 to maximum Energy Shield'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+125 total maximum Energy Shield');
    });
  });

  describe('Mixed Stats', () => {
    it('should combine multiple different stat types', () => {
      const implicitStats = [
        '+28% to Lightning Resistance (implicit)',
        '+15 to Strength (implicit)'
      ];
      const explicitStats = [
        '+36% to Lightning Resistance',
        '+25 to Strength',
        '20% increased Attack Speed' // Non-combinable
      ];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(3);
      expect(result).toContain('+64% total to Lightning Resistance');
      expect(result).toContain('+40 total to Strength');
      expect(result).toContain('20% increased Attack Speed');
    });

    it('should keep non-combinable stats separate', () => {
      const implicitStats = ['20% increased Physical Damage (implicit)'];
      const explicitStats = ['30% increased Attack Speed'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(2);
      expect(result).toContain('20% increased Physical Damage (implicit)');
      expect(result).toContain('30% increased Attack Speed');
    });

    it('should handle only implicit stats being combinable', () => {
      const implicitStats = ['+28% to Lightning Resistance (implicit)'];
      const explicitStats = ['30% increased Attack Speed'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(2);
      expect(result).toContain('+28% to Lightning Resistance (implicit)');
      expect(result).toContain('30% increased Attack Speed');
    });

    it('should handle only explicit stats being combinable', () => {
      const implicitStats = ['20% increased Physical Damage (implicit)'];
      const explicitStats = ['+36% to Lightning Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(2);
      expect(result).toContain('20% increased Physical Damage (implicit)');
      expect(result).toContain('+36% to Lightning Resistance');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty arrays', () => {
      const result = combineCompatibleStats([], []);
      expect(result).toHaveLength(0);
    });

    it('should handle only implicit stats', () => {
      const implicitStats = ['+28% to Lightning Resistance (implicit)'];
      const explicitStats: string[] = [];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+28% to Lightning Resistance (implicit)');
    });

    it('should handle only explicit stats', () => {
      const implicitStats: string[] = [];
      const explicitStats = ['+36% to Lightning Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+36% to Lightning Resistance');
    });

    it('should handle stats with extra whitespace', () => {
      const implicitStats = ['  +28%  to  Lightning  Resistance  (implicit)  '];
      const explicitStats = ['  +36%  to  Lightning  Resistance  '];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+64% total to Lightning Resistance');
    });

    it('should handle case variations', () => {
      const implicitStats = ['+28% to lightning resistance (implicit)'];
      const explicitStats = ['+36% to Lightning Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+64% total to lightning Resistance'); // Uses case from first match
    });

    it('should combine multiple instances of same stat type', () => {
      const implicitStats = ['+10% to Fire Resistance (implicit)'];
      const explicitStats = ['+20% to Fire Resistance', '+15% to Fire Resistance'];

      const result = combineCompatibleStats(implicitStats, explicitStats);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('+45% total to Fire Resistance');
    });
  });
});