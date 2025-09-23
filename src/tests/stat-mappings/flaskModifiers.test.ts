import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 15: FLASK MODIFIERS', () => {

  describe('Flask Charge Mechanics', () => {
    it('should map "#% increased Flask Charges gained"', () => {
      const result = findStatMapping('25% increased Flask Charges gained');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Flask Charges gained');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should map "#% reduced Flask Charges used"', () => {
      const result = findStatMapping('15% reduced Flask Charges used');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% reduced Flask Charges used');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should handle larger charge values', () => {
      const result = findStatMapping('50% increased Flask Charges gained');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Flask Charges gained');
      expect(result?.value).toBe(50);
    });

    it('should handle single digit charge values', () => {
      const result = findStatMapping('5% reduced Flask Charges used');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% reduced Flask Charges used');
      expect(result?.value).toBe(5);
    });
  });

  describe('Flask Recovery Rate', () => {
    it('should map "#% increased Flask Life Recovery rate"', () => {
      const result = findStatMapping('30% increased Flask Life Recovery rate');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Flask Life Recovery rate');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "#% increased Flask Mana Recovery rate"', () => {
      const result = findStatMapping('40% increased Flask Mana Recovery rate');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Flask Mana Recovery rate');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(40);
    });

    it('should map "#% increased Recovery rate" (generic)', () => {
      const result = findStatMapping('20% increased Recovery rate');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Recovery rate');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should handle with extra spaces in recovery rates', () => {
      const result = findStatMapping('35%  increased  Flask  Life  Recovery  rate');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Flask Life Recovery rate');
      expect(result?.value).toBe(35);
    });
  });

  describe('Flask Effect Duration', () => {
    it('should map "#% increased Flask Effect Duration"', () => {
      const result = findStatMapping('25% increased Flask Effect Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Flask Effect Duration');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should handle larger duration values', () => {
      const result = findStatMapping('100% increased Flask Effect Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Flask Effect Duration');
      expect(result?.value).toBe(100);
    });

    it('should handle single digit duration values', () => {
      const result = findStatMapping('8% increased Flask Effect Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Flask Effect Duration');
      expect(result?.value).toBe(8);
    });
  });

  describe('Flask Passive Charge Generation', () => {
    it('should map "Life Flasks gain # charges per Second"', () => {
      const result = findStatMapping('Life Flasks gain 3 charges per Second');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Life Flasks gain # charges per Second');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(3);
    });

    it('should map "Mana Flasks gain # charges per Second"', () => {
      const result = findStatMapping('Mana Flasks gain 2 charges per Second');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Mana Flasks gain # charges per Second');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(2);
    });

    it('should handle larger charge generation values', () => {
      const result = findStatMapping('Life Flasks gain 10 charges per Second');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Life Flasks gain # charges per Second');
      expect(result?.value).toBe(10);
    });

    it('should handle single charge generation', () => {
      const result = findStatMapping('Mana Flasks gain 1 charges per Second');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Mana Flasks gain # charges per Second');
      expect(result?.value).toBe(1);
    });
  });

  describe('Instant Recovery Mechanics', () => {
    it('should map "Life Flasks used while on Low Life apply Recovery Instantly"', () => {
      const result = findStatMapping('Life Flasks used while on Low Life apply Recovery Instantly');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Life Flasks used while on Low Life apply Recovery Instantly');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(1); // Boolean stat represented as 1
    });

    it('should map "Mana Flasks used while on Low Mana apply Recovery Instantly"', () => {
      const result = findStatMapping('Mana Flasks used while on Low Mana apply Recovery Instantly');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Mana Flasks used while on Low Mana apply Recovery Instantly');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(1); // Boolean stat represented as 1
    });

    it('should handle instant recovery with extra spaces', () => {
      const result = findStatMapping('Life  Flasks  used  while  on  Low  Life  apply  Recovery  Instantly');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Life Flasks used while on Low Life apply Recovery Instantly');
      expect(result?.value).toBe(1);
    });
  });

  describe('Conditional Recovery', () => {
    it('should map "#% more Recovery if used while on Low Life"', () => {
      const result = findStatMapping('50% more Recovery if used while on Low Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% more Recovery if used while on Low Life');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(50);
    });

    it('should handle larger conditional recovery values', () => {
      const result = findStatMapping('100% more Recovery if used while on Low Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% more Recovery if used while on Low Life');
      expect(result?.value).toBe(100);
    });

    it('should handle single digit conditional recovery', () => {
      const result = findStatMapping('5% more Recovery if used while on Low Life');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% more Recovery if used while on Low Life');
      expect(result?.value).toBe(5);
    });
  });

  describe('Edge cases', () => {
    it('should not match incorrect flask patterns', () => {
      const result1 = findStatMapping('25% reduced Flask Charges gained');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('25% increased Flask Charges used');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Flask Charges gained are doubled');
      expect(result3).toBeFalsy();
    });

    it('should not match incorrect recovery patterns', () => {
      const result1 = findStatMapping('25% reduced Flask Life Recovery rate');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Flask Life Recovery rate is doubled');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('25% more Flask Life Recovery rate');
      expect(result3).toBeFalsy();
    });

    it('should not match partial instant recovery patterns', () => {
      const result1 = findStatMapping('Life Flasks apply Recovery Instantly');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Flasks used while on Low Life apply Recovery Instantly');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Life Flasks used apply Recovery Instantly');
      expect(result3).toBeFalsy();
    });

    it('should not match partial charge generation patterns', () => {
      const result1 = findStatMapping('Life Flasks gain charges per Second');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Flasks gain 3 charges per Second');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Life Flasks gain 3 charges');
      expect(result3).toBeFalsy();
    });
  });

  describe('Integration with existing stats', () => {
    it('should not conflict with existing recovery stats', () => {
      const existingResult = findStatMapping('5% increased Life Regeneration rate');
      expect(existingResult).toBeTruthy();
      expect(existingResult?.filterText).toBe('#% increased Life Regeneration rate');

      const newResult = findStatMapping('25% increased Flask Life Recovery rate');
      expect(newResult).toBeTruthy();
      expect(newResult?.filterText).toBe('#% increased Flask Life Recovery rate');

      // Ensure they are different mappings
      expect(existingResult?.filterText).not.toBe(newResult?.filterText);
    });

    it('should handle generic recovery vs flask-specific recovery correctly', () => {
      const genericResult = findStatMapping('20% increased Recovery rate');
      expect(genericResult).toBeTruthy();
      expect(genericResult?.filterText).toBe('#% increased Recovery rate');

      const flaskResult = findStatMapping('30% increased Flask Life Recovery rate');
      expect(flaskResult).toBeTruthy();
      expect(flaskResult?.filterText).toBe('#% increased Flask Life Recovery rate');

      // Ensure they are different mappings
      expect(genericResult?.filterText).not.toBe(flaskResult?.filterText);
    });
  });

  describe('Combined flask stats', () => {
    it('should handle multiple flask stats correctly', () => {
      const chargeGain = findStatMapping('25% increased Flask Charges gained');
      const chargeUsed = findStatMapping('15% reduced Flask Charges used');
      const lifeRecovery = findStatMapping('30% increased Flask Life Recovery rate');
      const manaRecovery = findStatMapping('25% increased Flask Mana Recovery rate');
      const duration = findStatMapping('20% increased Flask Effect Duration');
      const instantLife = findStatMapping('Life Flasks used while on Low Life apply Recovery Instantly');
      const conditionalRecovery = findStatMapping('50% more Recovery if used while on Low Life');

      expect(chargeGain?.filterText).toBe('#% increased Flask Charges gained');
      expect(chargeUsed?.filterText).toBe('#% reduced Flask Charges used');
      expect(lifeRecovery?.filterText).toBe('#% increased Flask Life Recovery rate');
      expect(manaRecovery?.filterText).toBe('#% increased Flask Mana Recovery rate');
      expect(duration?.filterText).toBe('#% increased Flask Effect Duration');
      expect(instantLife?.filterText).toBe('Life Flasks used while on Low Life apply Recovery Instantly');
      expect(conditionalRecovery?.filterText).toBe('#% more Recovery if used while on Low Life');

      expect(chargeGain?.value).toBe(25);
      expect(chargeUsed?.value).toBe(15);
      expect(lifeRecovery?.value).toBe(30);
      expect(manaRecovery?.value).toBe(25);
      expect(duration?.value).toBe(20);
      expect(instantLife?.value).toBe(1);
      expect(conditionalRecovery?.value).toBe(50);
    });
  });
});