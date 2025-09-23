import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 20: MOVEMENT & UTILITY', () => {

  describe('Movement Speed Modifiers', () => {
    it('should map existing "#% increased Movement Speed"', () => {
      const result = findStatMapping('20% increased Movement Speed');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Movement Speed');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should map "#% increased Movement Speed while affected by an Ailment"', () => {
      const result = findStatMapping('15% increased Movement Speed while affected by an Ailment');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Movement Speed while affected by an Ailment');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should handle larger conditional movement speed values', () => {
      const result = findStatMapping('50% increased Movement Speed while affected by an Ailment');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Movement Speed while affected by an Ailment');
      expect(result?.value).toBe(50);
    });

    it('should handle single digit conditional movement speed values', () => {
      const result = findStatMapping('5% increased Movement Speed while affected by an Ailment');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Movement Speed while affected by an Ailment');
      expect(result?.value).toBe(5);
    });

    it('should handle conditional movement speed with extra spaces', () => {
      const result = findStatMapping('25%  increased  Movement  Speed  while  affected  by  an  Ailment');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Movement Speed while affected by an Ailment');
      expect(result?.value).toBe(25);
    });

    it('should prioritize conditional movement speed over generic', () => {
      const conditionalResult = findStatMapping('15% increased Movement Speed while affected by an Ailment');
      const genericResult = findStatMapping('15% increased Movement Speed');

      expect(conditionalResult?.filterText).toBe('#% increased Movement Speed while affected by an Ailment');
      expect(genericResult?.filterText).toBe('#% increased Movement Speed');

      // Ensure they are different mappings
      expect(conditionalResult?.filterText).not.toBe(genericResult?.filterText);
    });
  });

  describe('Projectile Mechanics', () => {
    it('should map "#% increased Projectile Speed"', () => {
      const result = findStatMapping('30% increased Projectile Speed');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Projectile Speed');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "Projectiles Pierce all Ignited enemies"', () => {
      const result = findStatMapping('Projectiles Pierce all Ignited enemies');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Projectiles Pierce all Ignited enemies');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(1); // Boolean stat represented as 1
    });

    it('should map "Attacks Chain an additional time"', () => {
      const result = findStatMapping('Attacks Chain an additional time');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Attacks Chain an additional time');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(1); // Boolean stat represented as 1
    });

    it('should map "Bow Attacks fire # additional Arrows"', () => {
      const result = findStatMapping('Bow Attacks fire 2 additional Arrows');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Bow Attacks fire # additional Arrows');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(2);
    });

    it('should handle larger projectile speed values', () => {
      const result = findStatMapping('100% increased Projectile Speed');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Projectile Speed');
      expect(result?.value).toBe(100);
    });

    it('should handle single digit projectile speed values', () => {
      const result = findStatMapping('8% increased Projectile Speed');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Projectile Speed');
      expect(result?.value).toBe(8);
    });

    it('should handle larger additional arrow values', () => {
      const result = findStatMapping('Bow Attacks fire 5 additional Arrows');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Bow Attacks fire # additional Arrows');
      expect(result?.value).toBe(5);
    });

    it('should handle single additional arrow', () => {
      const result = findStatMapping('Bow Attacks fire 1 additional Arrows');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Bow Attacks fire # additional Arrows');
      expect(result?.value).toBe(1);
    });

    it('should handle projectile mechanics with extra spaces', () => {
      const result1 = findStatMapping('25%  increased  Projectile  Speed');
      expect(result1).toBeTruthy();
      expect(result1?.filterText).toBe('#% increased Projectile Speed');
      expect(result1?.value).toBe(25);

      const result2 = findStatMapping('Projectiles  Pierce  all  Ignited  enemies');
      expect(result2).toBeTruthy();
      expect(result2?.filterText).toBe('Projectiles Pierce all Ignited enemies');
      expect(result2?.value).toBe(1);

      const result3 = findStatMapping('Attacks  Chain  an  additional  time');
      expect(result3).toBeTruthy();
      expect(result3?.filterText).toBe('Attacks Chain an additional time');
      expect(result3?.value).toBe(1);

      const result4 = findStatMapping('Bow  Attacks  fire  3  additional  Arrows');
      expect(result4).toBeTruthy();
      expect(result4?.filterText).toBe('Bow Attacks fire # additional Arrows');
      expect(result4?.value).toBe(3);
    });
  });

  describe('Utility Stats', () => {
    it('should map "#% increased Light Radius"', () => {
      const result = findStatMapping('40% increased Light Radius');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Light Radius');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(40);
    });

    it('should handle larger light radius values', () => {
      const result = findStatMapping('100% increased Light Radius');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Light Radius');
      expect(result?.value).toBe(100);
    });

    it('should handle single digit light radius values', () => {
      const result = findStatMapping('5% increased Light Radius');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Light Radius');
      expect(result?.value).toBe(5);
    });

    it('should handle light radius with extra spaces', () => {
      const result = findStatMapping('30%  increased  Light  Radius');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Light Radius');
      expect(result?.value).toBe(30);
    });
  });

  describe('Edge cases', () => {
    it('should not match incorrect movement speed patterns', () => {
      const result1 = findStatMapping('15% reduced Movement Speed while affected by an Ailment');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('15% more Movement Speed while affected by an Ailment');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('15% increased Movement Speed while affected');
      expect(result3).toBeFalsy();
    });

    it('should not match incorrect projectile patterns', () => {
      const result1 = findStatMapping('25% reduced Projectile Speed');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('25% more Projectile Speed');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Projectiles Pierce enemies');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('Pierce all Ignited enemies');
      expect(result4).toBeFalsy();
    });

    it('should not match incorrect chain/arrow patterns', () => {
      const result1 = findStatMapping('Attacks Chain');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Chain an additional time');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Bow Attacks fire additional Arrows');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('Attacks fire 2 additional Arrows');
      expect(result4).toBeFalsy();
    });

    it('should not match incorrect utility patterns', () => {
      const result1 = findStatMapping('25% reduced Light Radius');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('25% more Light Radius');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('increased Light Radius');
      expect(result3).toBeFalsy();
    });

    it('should not match partial patterns', () => {
      const result1 = findStatMapping('Movement Speed while affected by an Ailment');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('15% Movement Speed while affected by an Ailment');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Projectiles Pierce all');
      expect(result3).toBeFalsy();

      const result4 = findStatMapping('Bow fire 2 additional Arrows');
      expect(result4).toBeFalsy();
    });
  });

  describe('Integration with existing stats', () => {
    it('should not conflict with existing attack speed stats', () => {
      const movementResult = findStatMapping('20% increased Movement Speed');
      expect(movementResult).toBeTruthy();
      expect(movementResult?.filterText).toBe('#% increased Movement Speed');

      const attackSpeedResult = findStatMapping('20% increased Attack Speed');
      expect(attackSpeedResult).toBeTruthy();
      // Note: This may match local version, which is fine - just ensure it's different from movement speed
      expect(attackSpeedResult?.filterText).toContain('Attack Speed');

      // Ensure they are different mappings
      expect(movementResult?.filterText).not.toBe(attackSpeedResult?.filterText);
    });

    it('should not conflict with existing bow weapon stats', () => {
      const arrowResult = findStatMapping('Bow Attacks fire 2 additional Arrows');
      expect(arrowResult).toBeTruthy();
      expect(arrowResult?.filterText).toBe('Bow Attacks fire # additional Arrows');

      const bowDamageResult = findStatMapping('25% increased Damage with Bows');
      expect(bowDamageResult).toBeTruthy();
      expect(bowDamageResult?.filterText).toBe('#% increased Damage with Bows');

      // Ensure they are different mappings
      expect(arrowResult?.filterText).not.toBe(bowDamageResult?.filterText);
    });

    it('should not conflict with existing attack chain stats', () => {
      const chainResult = findStatMapping('Attacks Chain an additional time');
      expect(chainResult).toBeTruthy();
      expect(chainResult?.filterText).toBe('Attacks Chain an additional time');

      const attackDamageResult = findStatMapping('25% increased Attack Damage');
      expect(attackDamageResult).toBeTruthy();
      expect(attackDamageResult?.filterText).toBe('#% increased Attack Damage');

      // Ensure they are different mappings
      expect(chainResult?.filterText).not.toBe(attackDamageResult?.filterText);
    });
  });

  describe('Combined movement & utility stats', () => {
    it('should handle multiple movement & utility stats correctly', () => {
      const basicMovement = findStatMapping('20% increased Movement Speed');
      const conditionalMovement = findStatMapping('15% increased Movement Speed while affected by an Ailment');
      const projectileSpeed = findStatMapping('30% increased Projectile Speed');
      const pierce = findStatMapping('Projectiles Pierce all Ignited enemies');
      const chain = findStatMapping('Attacks Chain an additional time');
      const arrows = findStatMapping('Bow Attacks fire 2 additional Arrows');
      const lightRadius = findStatMapping('40% increased Light Radius');

      expect(basicMovement?.filterText).toBe('#% increased Movement Speed');
      expect(conditionalMovement?.filterText).toBe('#% increased Movement Speed while affected by an Ailment');
      expect(projectileSpeed?.filterText).toBe('#% increased Projectile Speed');
      expect(pierce?.filterText).toBe('Projectiles Pierce all Ignited enemies');
      expect(chain?.filterText).toBe('Attacks Chain an additional time');
      expect(arrows?.filterText).toBe('Bow Attacks fire # additional Arrows');
      expect(lightRadius?.filterText).toBe('#% increased Light Radius');

      expect(basicMovement?.value).toBe(20);
      expect(conditionalMovement?.value).toBe(15);
      expect(projectileSpeed?.value).toBe(30);
      expect(pierce?.value).toBe(1);
      expect(chain?.value).toBe(1);
      expect(arrows?.value).toBe(2);
      expect(lightRadius?.value).toBe(40);
    });
  });
});