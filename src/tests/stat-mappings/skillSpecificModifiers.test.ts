import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 18: SKILL-SPECIFIC MODIFIERS', () => {

  describe('Weapon-Specific Damage Modifiers', () => {
    it('should map "#% increased Damage with Bow Skills"', () => {
      const result = findStatMapping('25% increased Damage with Bow Skills');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Bow Skills');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should map "#% increased Damage with Bows"', () => {
      const result = findStatMapping('30% increased Damage with Bows');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Bows');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "#% increased Damage with Crossbows"', () => {
      const result = findStatMapping('20% increased Damage with Crossbows');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Crossbows');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should map "#% increased Damage with Quarterstaves"', () => {
      const result = findStatMapping('35% increased Damage with Quarterstaves');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Quarterstaves');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(35);
    });

    it('should map "#% increased Damage with Spears"', () => {
      const result = findStatMapping('40% increased Damage with Spears');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Spears');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(40);
    });

    it('should map "#% increased Damage with Maces"', () => {
      const result = findStatMapping('28% increased Damage with Maces');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Maces');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(28);
    });

    it('should handle larger weapon damage values', () => {
      const result = findStatMapping('150% increased Damage with Bows');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Bows');
      expect(result?.value).toBe(150);
    });

    it('should handle single digit weapon damage values', () => {
      const result = findStatMapping('5% increased Damage with Spears');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Spears');
      expect(result?.value).toBe(5);
    });

    it('should handle weapon damage with extra spaces', () => {
      const result = findStatMapping('25%  increased  Damage  with  Crossbows');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage with Crossbows');
      expect(result?.value).toBe(25);
    });
  });

  describe('Skill Type Modifiers', () => {
    it('should map "Herald Skills deal #% increased Damage"', () => {
      const result = findStatMapping('Herald Skills deal 30% increased Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Herald Skills deal #% increased Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(30);
    });

    it('should map "Meta Skills gain #% increased Energy"', () => {
      const result = findStatMapping('Meta Skills gain 25% increased Energy');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Meta Skills gain #% increased Energy');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(25);
    });

    it('should handle larger herald skill values', () => {
      const result = findStatMapping('Herald Skills deal 100% increased Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Herald Skills deal #% increased Damage');
      expect(result?.value).toBe(100);
    });

    it('should handle single digit meta skill values', () => {
      const result = findStatMapping('Meta Skills gain 8% increased Energy');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Meta Skills gain #% increased Energy');
      expect(result?.value).toBe(8);
    });

    it('should handle herald skills with extra spaces', () => {
      const result = findStatMapping('Herald  Skills  deal  45%  increased  Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Herald Skills deal #% increased Damage');
      expect(result?.value).toBe(45);
    });

    it('should handle meta skills with extra spaces', () => {
      const result = findStatMapping('Meta  Skills  gain  35%  increased  Energy');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('Meta Skills gain #% increased Energy');
      expect(result?.value).toBe(35);
    });
  });

  describe('Effect Duration Modifiers', () => {
    it('should map "#% increased Skill Effect Duration"', () => {
      const result = findStatMapping('20% increased Skill Effect Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Skill Effect Duration');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(20);
    });

    it('should map "#% increased Charm Effect Duration"', () => {
      const result = findStatMapping('15% increased Charm Effect Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Charm Effect Duration');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(15);
    });

    it('should handle larger duration values', () => {
      const result = findStatMapping('100% increased Skill Effect Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Skill Effect Duration');
      expect(result?.value).toBe(100);
    });

    it('should handle single digit duration values', () => {
      const result = findStatMapping('5% increased Charm Effect Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Charm Effect Duration');
      expect(result?.value).toBe(5);
    });

    it('should handle duration with extra spaces', () => {
      const result = findStatMapping('30%  increased  Skill  Effect  Duration');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Skill Effect Duration');
      expect(result?.value).toBe(30);
    });
  });

  describe('Edge cases', () => {
    it('should not match incorrect weapon damage patterns', () => {
      const result1 = findStatMapping('25% reduced Damage with Bows');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('25% more Damage with Spears');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Damage with Bows is doubled');
      expect(result3).toBeFalsy();
    });

    it('should not match partial weapon patterns', () => {
      const result1 = findStatMapping('25% increased Damage with');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('increased Damage with Bows');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('25% Damage with Crossbows');
      expect(result3).toBeFalsy();
    });

    it('should not match incorrect skill type patterns', () => {
      const result1 = findStatMapping('Herald Skills deal reduced Damage');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Meta Skills gain reduced Energy');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Skills deal 25% increased Damage');
      expect(result3).toBeFalsy();
    });

    it('should not match partial skill type patterns', () => {
      const result1 = findStatMapping('Herald Skills deal Damage');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('Meta Skills gain Energy');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Herald deal 25% increased Damage');
      expect(result3).toBeFalsy();
    });

    it('should not match incorrect duration patterns', () => {
      const result1 = findStatMapping('25% reduced Skill Effect Duration');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('25% more Charm Effect Duration');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('Skill Effect Duration is doubled');
      expect(result3).toBeFalsy();
    });

    it('should not match partial duration patterns', () => {
      const result1 = findStatMapping('25% increased Effect Duration');
      expect(result1).toBeFalsy();

      const result2 = findStatMapping('increased Skill Effect Duration');
      expect(result2).toBeFalsy();

      const result3 = findStatMapping('25% Skill Effect Duration');
      expect(result3).toBeFalsy();
    });
  });

  describe('Integration with existing stats', () => {
    it('should not conflict with existing damage stats', () => {
      const existingResult = findStatMapping('25% increased Physical Damage');
      expect(existingResult).toBeTruthy();
      expect(existingResult?.filterText).toBe('#% increased Physical Damage');

      const newResult = findStatMapping('25% increased Damage with Bows');
      expect(newResult).toBeTruthy();
      expect(newResult?.filterText).toBe('#% increased Damage with Bows');

      // Ensure they are different mappings
      expect(existingResult?.filterText).not.toBe(newResult?.filterText);
    });

    it('should not conflict with existing weapon-specific stats', () => {
      const existingResult = findStatMapping('25% increased Attack Speed with Bows');
      expect(existingResult).toBeTruthy();
      expect(existingResult?.filterText).toBe('#% increased Attack Speed with Bows');

      const newResult = findStatMapping('25% increased Damage with Bows');
      expect(newResult).toBeTruthy();
      expect(newResult?.filterText).toBe('#% increased Damage with Bows');

      // Ensure they are different mappings
      expect(existingResult?.filterText).not.toBe(newResult?.filterText);
    });

    it('should distinguish between bow skills and bow weapons', () => {
      const bowSkillResult = findStatMapping('25% increased Damage with Bow Skills');
      expect(bowSkillResult).toBeTruthy();
      expect(bowSkillResult?.filterText).toBe('#% increased Damage with Bow Skills');

      const bowWeaponResult = findStatMapping('25% increased Damage with Bows');
      expect(bowWeaponResult).toBeTruthy();
      expect(bowWeaponResult?.filterText).toBe('#% increased Damage with Bows');

      // Ensure they are different mappings
      expect(bowSkillResult?.filterText).not.toBe(bowWeaponResult?.filterText);
    });
  });

  describe('Combined skill-specific stats', () => {
    it('should handle multiple skill-specific stats correctly', () => {
      const bowSkills = findStatMapping('25% increased Damage with Bow Skills');
      const bows = findStatMapping('30% increased Damage with Bows');
      const crossbows = findStatMapping('20% increased Damage with Crossbows');
      const quarterstaves = findStatMapping('35% increased Damage with Quarterstaves');
      const spears = findStatMapping('40% increased Damage with Spears');
      const maces = findStatMapping('28% increased Damage with Maces');
      const herald = findStatMapping('Herald Skills deal 30% increased Damage');
      const meta = findStatMapping('Meta Skills gain 25% increased Energy');
      const skillDuration = findStatMapping('20% increased Skill Effect Duration');
      const charmDuration = findStatMapping('15% increased Charm Effect Duration');

      expect(bowSkills?.filterText).toBe('#% increased Damage with Bow Skills');
      expect(bows?.filterText).toBe('#% increased Damage with Bows');
      expect(crossbows?.filterText).toBe('#% increased Damage with Crossbows');
      expect(quarterstaves?.filterText).toBe('#% increased Damage with Quarterstaves');
      expect(spears?.filterText).toBe('#% increased Damage with Spears');
      expect(maces?.filterText).toBe('#% increased Damage with Maces');
      expect(herald?.filterText).toBe('Herald Skills deal #% increased Damage');
      expect(meta?.filterText).toBe('Meta Skills gain #% increased Energy');
      expect(skillDuration?.filterText).toBe('#% increased Skill Effect Duration');
      expect(charmDuration?.filterText).toBe('#% increased Charm Effect Duration');

      expect(bowSkills?.value).toBe(25);
      expect(bows?.value).toBe(30);
      expect(crossbows?.value).toBe(20);
      expect(quarterstaves?.value).toBe(35);
      expect(spears?.value).toBe(40);
      expect(maces?.value).toBe(28);
      expect(herald?.value).toBe(30);
      expect(meta?.value).toBe(25);
      expect(skillDuration?.value).toBe(20);
      expect(charmDuration?.value).toBe(15);
    });
  });
});