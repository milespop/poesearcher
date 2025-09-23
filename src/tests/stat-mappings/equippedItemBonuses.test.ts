import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 24: EQUIPPED ITEM BONUSES', () => {

  describe('Focus Energy Shield Bonuses', () => {
    it('should map "#% increased Energy Shield from Equipped Focus"', () => {
      const result = findStatMapping('25% increased Energy Shield from Equipped Focus');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Energy Shield from Equipped Focus');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should handle different focus energy shield values', () => {
      const result1 = findStatMapping('10% increased Energy Shield from Equipped Focus');
      expect(result1?.value).toBe(10);

      const result2 = findStatMapping('50% increased Energy Shield from Equipped Focus');
      expect(result2?.value).toBe(50);

      const result3 = findStatMapping('100% increased Energy Shield from Equipped Focus');
      expect(result3?.value).toBe(100);
    });

    it('should handle focus energy shield with flexible whitespace', () => {
      const result = findStatMapping('30%  increased  Energy  Shield  from  Equipped  Focus');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Energy Shield from Equipped Focus');
      expect(result?.value).toBe(30);
    });
  });

  describe('Quiver Bonuses', () => {
    it('should map "#% increased bonuses gained from Equipped Quiver"', () => {
      const result = findStatMapping('20% increased bonuses gained from Equipped Quiver');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased bonuses gained from Equipped Quiver');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should handle different quiver bonus values', () => {
      const result1 = findStatMapping('15% increased bonuses gained from Equipped Quiver');
      expect(result1?.value).toBe(15);

      const result2 = findStatMapping('35% increased bonuses gained from Equipped Quiver');
      expect(result2?.value).toBe(35);

      const result3 = findStatMapping('75% increased bonuses gained from Equipped Quiver');
      expect(result3?.value).toBe(75);
    });

    it('should handle quiver bonuses with flexible whitespace', () => {
      const result = findStatMapping('40%  increased  bonuses  gained  from  Equipped  Quiver');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased bonuses gained from Equipped Quiver');
      expect(result?.value).toBe(40);
    });
  });

  describe('Ring Bonuses', () => {
    it('should map "#% increased bonuses gained from left Equipped Ring"', () => {
      const result = findStatMapping('15% increased bonuses gained from left Equipped Ring');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased bonuses gained from left Equipped Ring');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should map "#% increased bonuses gained from right Equipped Ring"', () => {
      const result = findStatMapping('12% increased bonuses gained from right Equipped Ring');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased bonuses gained from right Equipped Ring');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(12);
    });

    it('should distinguish between left and right ring bonuses', () => {
      const leftResult = findStatMapping('20% increased bonuses gained from left Equipped Ring');
      const rightResult = findStatMapping('20% increased bonuses gained from right Equipped Ring');

      expect(leftResult?.filterText).toBe('#% increased bonuses gained from left Equipped Ring');
      expect(rightResult?.filterText).toBe('#% increased bonuses gained from right Equipped Ring');

      // Ensure they are different mappings
      expect(leftResult?.filterText).not.toBe(rightResult?.filterText);
    });

    it('should handle different ring bonus values', () => {
      // Left ring
      const leftResult1 = findStatMapping('5% increased bonuses gained from left Equipped Ring');
      expect(leftResult1?.value).toBe(5);

      const leftResult2 = findStatMapping('30% increased bonuses gained from left Equipped Ring');
      expect(leftResult2?.value).toBe(30);

      // Right ring
      const rightResult1 = findStatMapping('8% increased bonuses gained from right Equipped Ring');
      expect(rightResult1?.value).toBe(8);

      const rightResult2 = findStatMapping('25% increased bonuses gained from right Equipped Ring');
      expect(rightResult2?.value).toBe(25);
    });

    it('should handle ring bonuses with flexible whitespace', () => {
      const leftResult = findStatMapping('18%  increased  bonuses  gained  from  left  Equipped  Ring');
      expect(leftResult).toBeTruthy();
      expect(leftResult?.filterText).toBe('#% increased bonuses gained from left Equipped Ring');
      expect(leftResult?.value).toBe(18);

      const rightResult = findStatMapping('22%  increased  bonuses  gained  from  right  Equipped  Ring');
      expect(rightResult).toBeTruthy();
      expect(rightResult?.filterText).toBe('#% increased bonuses gained from right Equipped Ring');
      expect(rightResult?.value).toBe(22);
    });
  });

  describe('Shield Defence Bonuses', () => {
    it('should map "#% increased Defences from Equipped Shield"', () => {
      const result = findStatMapping('30% increased Defences from Equipped Shield');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Defences from Equipped Shield');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should handle different shield defence values', () => {
      const result1 = findStatMapping('10% increased Defences from Equipped Shield');
      expect(result1?.value).toBe(10);

      const result2 = findStatMapping('45% increased Defences from Equipped Shield');
      expect(result2?.value).toBe(45);

      const result3 = findStatMapping('80% increased Defences from Equipped Shield');
      expect(result3?.value).toBe(80);
    });

    it('should handle shield defences with flexible whitespace', () => {
      const result = findStatMapping('35%  increased  Defences  from  Equipped  Shield');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Defences from Equipped Shield');
      expect(result?.value).toBe(35);
    });
  });

  describe('Edge cases', () => {
    it('should not match incorrect equipped item patterns', () => {
      // Wrong modifier types
      const result1 = findStatMapping('25% reduced Energy Shield from Equipped Focus');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('20% more bonuses gained from Equipped Quiver');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('15% less bonuses gained from left Equipped Ring');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('30% reduced Defences from Equipped Shield');
      expect(result4).toBeFalsy();
    });

    it('should not match incomplete equipped item patterns', () => {
      const result1 = findStatMapping('25% increased Energy Shield from Focus');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('20% increased bonuses from Equipped Quiver');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('15% increased bonuses gained from Ring');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('30% increased Defences from Shield');
      expect(result4).toBeFalsy();
    });

    it('should not match partial patterns', () => {
      const result1 = findStatMapping('Energy Shield from Equipped Focus');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('bonuses gained from Equipped Quiver');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('left Equipped Ring');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('Defences from Equipped Shield');
      expect(result4).toBeFalsy();
    });

    it('should not match equipment-specific patterns with wrong equipment types', () => {
      const result1 = findStatMapping('25% increased Energy Shield from Equipped Quiver');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('20% increased bonuses gained from Equipped Focus');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('30% increased Defences from Equipped Ring');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('15% increased bonuses gained from center Equipped Ring');
      expect(result4).toBeFalsy();
    });
  });

  describe('Integration with existing stats', () => {
    it('should not conflict with existing Energy Shield stats', () => {
      const equippedResult = findStatMapping('25% increased Energy Shield from Equipped Focus');
      expect(equippedResult).toBeTruthy();
      expect(equippedResult?.filterText).toBe('#% increased Energy Shield from Equipped Focus');

      const regularResult = findStatMapping('25% increased Energy Shield');
      expect(regularResult).toBeTruthy();
      expect(regularResult?.filterText).toBe('#% increased Energy Shield');

      // Ensure they are different mappings
      expect(equippedResult?.filterText).not.toBe(regularResult?.filterText);
    });

    it('should not conflict with existing global increase patterns', () => {
      const quiverResult = findStatMapping('20% increased bonuses gained from Equipped Quiver');
      expect(quiverResult).toBeTruthy();
      expect(quiverResult?.filterText).toBe('#% increased bonuses gained from Equipped Quiver');

      const movementResult = findStatMapping('20% increased Movement Speed');
      expect(movementResult).toBeTruthy();
      expect(movementResult?.filterText).toBe('#% increased Movement Speed');

      // Ensure they are different mappings
      expect(quiverResult?.filterText).not.toBe(movementResult?.filterText);
    });
  });

  describe('All equipped item bonuses together', () => {
    it('should handle all equipped item bonus types correctly', () => {
      const focus = findStatMapping('25% increased Energy Shield from Equipped Focus');
      const quiver = findStatMapping('20% increased bonuses gained from Equipped Quiver');
      const leftRing = findStatMapping('15% increased bonuses gained from left Equipped Ring');
      const rightRing = findStatMapping('12% increased bonuses gained from right Equipped Ring');
      const shield = findStatMapping('30% increased Defences from Equipped Shield');

      expect(focus?.filterText).toBe('#% increased Energy Shield from Equipped Focus');
      expect(quiver?.filterText).toBe('#% increased bonuses gained from Equipped Quiver');
      expect(leftRing?.filterText).toBe('#% increased bonuses gained from left Equipped Ring');
      expect(rightRing?.filterText).toBe('#% increased bonuses gained from right Equipped Ring');
      expect(shield?.filterText).toBe('#% increased Defences from Equipped Shield');

      expect(focus?.value).toBe(25);
      expect(quiver?.value).toBe(20);
      expect(leftRing?.value).toBe(15);
      expect(rightRing?.value).toBe(12);
      expect(shield?.value).toBe(30);

      // Ensure all are mapped to explicit group
      [focus, quiver, leftRing, rightRing, shield].forEach(result => {
        expect(result?.group).toBe('explicit');
      });
    });
  });
});