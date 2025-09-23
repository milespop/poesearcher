import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 21: EXPERIENCE, GOLD & RARITY', () => {

  describe('Existing Rarity Stats', () => {
    it('should map existing "#% increased Rarity of Items found"', () => {
      const result = findStatMapping('25% increased Rarity of Items found');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Rarity of Items found');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });
  });

  describe('Experience Gain Modifiers', () => {
    it('should map "#% increased Experience gain"', () => {
      const result = findStatMapping('20% increased Experience gain');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Experience gain');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should map "#% increased Experience gain in your Maps"', () => {
      const result = findStatMapping('15% increased Experience gain in your Maps');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Experience gain in your Maps');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should handle larger experience gain values', () => {
      const result = findStatMapping('100% increased Experience gain');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Experience gain');
      expect(result?.value).toBe(100);
    });

    it('should handle single digit experience gain values', () => {
      const result = findStatMapping('5% increased Experience gain in your Maps');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Experience gain in your Maps');
      expect(result?.value).toBe(5);
    });

    it('should handle experience gain with extra spaces', () => {
      const result1 = findStatMapping('30%  increased  Experience  gain');
      expect(result1).toBeTruthy();
      expect(result1?.filterText).toBe('#% increased Experience gain');
      expect(result1?.value).toBe(30);

      const result2 = findStatMapping('25%  increased  Experience  gain  in  your  Maps');
      expect(result2).toBeTruthy();
      expect(result2?.filterText).toBe('#% increased Experience gain in your Maps');
      expect(result2?.value).toBe(25);
    });

    it('should prioritize map-specific over generic experience gain', () => {
      const mapResult = findStatMapping('15% increased Experience gain in your Maps');
      const genericResult = findStatMapping('15% increased Experience gain');

      expect(mapResult?.filterText).toBe('#% increased Experience gain in your Maps');
      expect(genericResult?.filterText).toBe('#% increased Experience gain');

      // Ensure they are different mappings
      expect(mapResult?.filterText).not.toBe(genericResult?.filterText);
    });
  });

  describe('Gold Modifiers', () => {
    it('should map "#% increased Gold found in this Area (Gold Piles)"', () => {
      const result = findStatMapping('30% increased Gold found in this Area (Gold Piles)');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Gold found in this Area (Gold Piles)');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "#% increased Gold found in your Maps (Gold Piles)"', () => {
      const result = findStatMapping('25% increased Gold found in your Maps (Gold Piles)');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Gold found in your Maps (Gold Piles)');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should handle larger gold values', () => {
      const result = findStatMapping('150% increased Gold found in this Area (Gold Piles)');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Gold found in this Area (Gold Piles)');
      expect(result?.value).toBe(150);
    });

    it('should handle single digit gold values', () => {
      const result = findStatMapping('8% increased Gold found in your Maps (Gold Piles)');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Gold found in your Maps (Gold Piles)');
      expect(result?.value).toBe(8);
    });

    it('should handle gold modifiers with extra spaces', () => {
      const result1 = findStatMapping('40%  increased  Gold  found  in  this  Area  (Gold  Piles)');
      expect(result1).toBeTruthy();
      expect(result1?.filterText).toBe('#% increased Gold found in this Area (Gold Piles)');
      expect(result1?.value).toBe(40);

      const result2 = findStatMapping('35%  increased  Gold  found  in  your  Maps  (Gold  Piles)');
      expect(result2).toBeTruthy();
      expect(result2?.filterText).toBe('#% increased Gold found in your Maps (Gold Piles)');
      expect(result2?.value).toBe(35);
    });

    it('should distinguish between area and map gold modifiers', () => {
      const areaResult = findStatMapping('30% increased Gold found in this Area (Gold Piles)');
      const mapResult = findStatMapping('25% increased Gold found in your Maps (Gold Piles)');

      expect(areaResult?.filterText).toBe('#% increased Gold found in this Area (Gold Piles)');
      expect(mapResult?.filterText).toBe('#% increased Gold found in your Maps (Gold Piles)');

      // Ensure they are different mappings
      expect(areaResult?.filterText).not.toBe(mapResult?.filterText);
    });
  });

  describe('Map-Specific Rarity & Quantity', () => {
    it('should map "#% increased Rarity of Items found in your Maps"', () => {
      const result = findStatMapping('20% increased Rarity of Items found in your Maps');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Rarity of Items found in your Maps');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should map "#% increased Quantity of Items found in your Maps"', () => {
      const result = findStatMapping('15% increased Quantity of Items found in your Maps');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Quantity of Items found in your Maps');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should handle larger map rarity/quantity values', () => {
      const rarityResult = findStatMapping('100% increased Rarity of Items found in your Maps');
      expect(rarityResult).toBeTruthy();
      expect(rarityResult?.filterText).toBe('#% increased Rarity of Items found in your Maps');
      expect(rarityResult?.value).toBe(100);

      const quantityResult = findStatMapping('50% increased Quantity of Items found in your Maps');
      expect(quantityResult).toBeTruthy();
      expect(quantityResult?.filterText).toBe('#% increased Quantity of Items found in your Maps');
      expect(quantityResult?.value).toBe(50);
    });

    it('should handle single digit map rarity/quantity values', () => {
      const rarityResult = findStatMapping('5% increased Rarity of Items found in your Maps');
      expect(rarityResult).toBeTruthy();
      expect(rarityResult?.filterText).toBe('#% increased Rarity of Items found in your Maps');
      expect(rarityResult?.value).toBe(5);

      const quantityResult = findStatMapping('3% increased Quantity of Items found in your Maps');
      expect(quantityResult).toBeTruthy();
      expect(quantityResult?.filterText).toBe('#% increased Quantity of Items found in your Maps');
      expect(quantityResult?.value).toBe(3);
    });

    it('should handle map rarity/quantity with extra spaces', () => {
      const rarityResult = findStatMapping('30%  increased  Rarity  of  Items  found  in  your  Maps');
      expect(rarityResult).toBeTruthy();
      expect(rarityResult?.filterText).toBe('#% increased Rarity of Items found in your Maps');
      expect(rarityResult?.value).toBe(30);

      const quantityResult = findStatMapping('25%  increased  Quantity  of  Items  found  in  your  Maps');
      expect(quantityResult).toBeTruthy();
      expect(quantityResult?.filterText).toBe('#% increased Quantity of Items found in your Maps');
      expect(quantityResult?.value).toBe(25);
    });

    it('should prioritize map-specific over generic rarity', () => {
      const mapResult = findStatMapping('20% increased Rarity of Items found in your Maps');
      const genericResult = findStatMapping('20% increased Rarity of Items found');

      expect(mapResult?.filterText).toBe('#% increased Rarity of Items found in your Maps');
      expect(genericResult?.filterText).toBe('#% increased Rarity of Items found');

      // Ensure they are different mappings
      expect(mapResult?.filterText).not.toBe(genericResult?.filterText);
    });
  });

  describe('Edge cases', () => {
    it('should not match incorrect experience patterns', () => {
      const result1 = findStatMapping('20% reduced Experience gain');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('20% more Experience gain');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Experience gain is doubled');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('20% increased Experience in your Maps');
      expect(result4).toBeFalsy();
    });

    it('should not match incorrect gold patterns', () => {
      const result1 = findStatMapping('30% reduced Gold found in this Area (Gold Piles)');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('30% more Gold found in your Maps (Gold Piles)');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('30% increased Gold found in this Area');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('30% increased Gold found (Gold Piles)');
      expect(result4).toBeFalsy();
    });

    it('should not match incorrect map rarity/quantity patterns', () => {
      const result1 = findStatMapping('20% reduced Rarity of Items found in your Maps');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('15% more Quantity of Items found in your Maps');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('20% increased Rarity found in your Maps');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('15% increased Items found in your Maps');
      expect(result4).toBeFalsy();
    });

    it('should not match partial patterns', () => {
      const result1 = findStatMapping('Experience gain');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('20% Experience gain');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Gold found in this Area');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('Rarity of Items found');
      expect(result4).toBeFalsy();
    });
  });

  describe('Integration with existing stats', () => {
    it('should not conflict with existing damage increase stats', () => {
      const experienceResult = findStatMapping('20% increased Experience gain');
      expect(experienceResult).toBeTruthy();
      expect(experienceResult?.filterText).toBe('#% increased Experience gain');

      const damageResult = findStatMapping('20% increased Physical Damage');
      expect(damageResult).toBeTruthy();
      expect(damageResult?.filterText).toBe('#% increased Physical Damage');

      // Ensure they are different mappings
      expect(experienceResult?.filterText).not.toBe(damageResult?.filterText);
    });

    it('should not conflict with existing movement speed stats', () => {
      const goldResult = findStatMapping('30% increased Gold found in this Area (Gold Piles)');
      expect(goldResult).toBeTruthy();
      expect(goldResult?.filterText).toBe('#% increased Gold found in this Area (Gold Piles)');

      const movementResult = findStatMapping('30% increased Movement Speed');
      expect(movementResult).toBeTruthy();
      expect(movementResult?.filterText).toBe('#% increased Movement Speed');

      // Ensure they are different mappings
      expect(goldResult?.filterText).not.toBe(movementResult?.filterText);
    });
  });

  describe('Combined experience, gold & rarity stats', () => {
    it('should handle multiple experience, gold & rarity stats correctly', () => {
      const experience = findStatMapping('20% increased Experience gain');
      const mapExperience = findStatMapping('15% increased Experience gain in your Maps');
      const areaGold = findStatMapping('30% increased Gold found in this Area (Gold Piles)');
      const mapGold = findStatMapping('25% increased Gold found in your Maps (Gold Piles)');
      const genericRarity = findStatMapping('35% increased Rarity of Items found');
      const mapRarity = findStatMapping('20% increased Rarity of Items found in your Maps');
      const mapQuantity = findStatMapping('15% increased Quantity of Items found in your Maps');

      expect(experience?.filterText).toBe('#% increased Experience gain');
      expect(mapExperience?.filterText).toBe('#% increased Experience gain in your Maps');
      expect(areaGold?.filterText).toBe('#% increased Gold found in this Area (Gold Piles)');
      expect(mapGold?.filterText).toBe('#% increased Gold found in your Maps (Gold Piles)');
      expect(genericRarity?.filterText).toBe('#% increased Rarity of Items found');
      expect(mapRarity?.filterText).toBe('#% increased Rarity of Items found in your Maps');
      expect(mapQuantity?.filterText).toBe('#% increased Quantity of Items found in your Maps');

      expect(experience?.value).toBe(20);
      expect(mapExperience?.value).toBe(15);
      expect(areaGold?.value).toBe(30);
      expect(mapGold?.value).toBe(25);
      expect(genericRarity?.value).toBe(35);
      expect(mapRarity?.value).toBe(20);
      expect(mapQuantity?.value).toBe(15);
    });
  });
});