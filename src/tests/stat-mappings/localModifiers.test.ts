import { describe, it, expect, findStatMapping } from './testSetup';

describe('Local Modifiers Item Type Restrictions', () => {

  describe('Weapon Local Modifiers', () => {
    const weaponClasses = ['Swords', 'Axes', 'Maces', 'Daggers', 'Claws', 'Bows', 'Wands', 'Staves', 'Crossbows', 'Sceptres', 'Two Hand Swords', 'Two Hand Axes', 'Two Hand Maces', 'Quarterstaves', 'Spears', 'Flails'];
    const nonWeaponClasses = ['Shields', 'Gloves', 'Boots', 'Body Armours', 'Helmets'];

    it('should prioritize Attack Speed (Local) for weapons', () => {
      weaponClasses.forEach(weaponClass => {
        const result = findStatMapping('20% increased Attack Speed', weaponClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('#% increased Attack Speed (Local)');
        expect(result?.value).toBe(20);
      });
    });

    it('should prioritize Accuracy Rating (Local) for weapons', () => {
      weaponClasses.forEach(weaponClass => {
        const result = findStatMapping('+150 to Accuracy Rating', weaponClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to Accuracy Rating (Local)');
        expect(result?.value).toBe(150);
      });
    });

    it('should NOT prioritize Attack Speed (Local) for non-weapons', () => {
      nonWeaponClasses.forEach(itemClass => {
        const result = findStatMapping('20% increased Attack Speed', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('#% increased Attack Speed');
        expect(result?.value).toBe(20);
      });
    });

    it('should NOT prioritize Accuracy Rating (Local) for non-weapons', () => {
      nonWeaponClasses.forEach(itemClass => {
        const result = findStatMapping('+150 to Accuracy Rating', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to Accuracy Rating');
        expect(result?.value).toBe(150);
      });
    });
  });

  describe('Shield Local Modifiers', () => {
    const shieldClass = 'Shields';
    const nonShieldClasses = ['Swords', 'Gloves', 'Boots', 'Body Armours', 'Helmets'];

    it('should prioritize Block chance (Local) for shields', () => {
      const result = findStatMapping('15% increased Block chance', shieldClass);
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Block chance (Local)');
      expect(result?.value).toBe(15);
    });

    it('should NOT prioritize Block chance (Local) for non-shields', () => {
      nonShieldClasses.forEach(itemClass => {
        const result = findStatMapping('15% increased Block chance', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('#% increased Block chance');
        expect(result?.value).toBe(15);
      });
    });
  });

  describe('Armor Local Modifiers', () => {
    const armorClasses = ['Gloves', 'Boots', 'Body Armours', 'Helmets'];
    const nonArmorClasses = ['Swords', 'Shields', 'Bows', 'Wands'];

    it('should prioritize Armour (Local) for armor pieces', () => {
      armorClasses.forEach(armorClass => {
        const result = findStatMapping('+50 to Armour', armorClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to Armour (Local)');
        expect(result?.value).toBe(50);
      });
    });

    it('should prioritize increased Armour (Local) for armor pieces', () => {
      armorClasses.forEach(armorClass => {
        const result = findStatMapping('25% increased Armour', armorClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('#% increased Armour (Local)');
        expect(result?.value).toBe(25);
      });
    });

    it('should prioritize Evasion Rating (Local) for armor pieces', () => {
      armorClasses.forEach(armorClass => {
        const result = findStatMapping('+75 to Evasion Rating', armorClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to Evasion Rating (Local)');
        expect(result?.value).toBe(75);
      });
    });

    it('should prioritize increased Evasion Rating (Local) for armor pieces', () => {
      armorClasses.forEach(armorClass => {
        const result = findStatMapping('30% increased Evasion Rating', armorClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('#% increased Evasion Rating (Local)');
        expect(result?.value).toBe(30);
      });
    });

    it('should NOT prioritize Armour (Local) for non-armor items', () => {
      nonArmorClasses.forEach(itemClass => {
        const result = findStatMapping('+50 to Armour', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to Armour');
        expect(result?.value).toBe(50);
      });
    });

    it('should NOT prioritize increased Armour (Local) for non-armor items', () => {
      nonArmorClasses.forEach(itemClass => {
        const result = findStatMapping('25% increased Armour', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('#% increased Armour');
        expect(result?.value).toBe(25);
      });
    });

    it('should NOT prioritize Evasion Rating (Local) for non-armor items', () => {
      nonArmorClasses.forEach(itemClass => {
        const result = findStatMapping('+75 to Evasion Rating', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to Evasion Rating');
        expect(result?.value).toBe(75);
      });
    });

    it('should NOT prioritize increased Evasion Rating (Local) for non-armor items', () => {
      nonArmorClasses.forEach(itemClass => {
        const result = findStatMapping('30% increased Evasion Rating', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('#% increased Evasion Rating');
        expect(result?.value).toBe(30);
      });
    });
  });

  describe('Energy Shield Local Modifiers', () => {
    const armorAndShieldClasses = ['Gloves', 'Boots', 'Body Armours', 'Helmets', 'Shields'];
    const nonArmorShieldClasses = ['Swords', 'Bows', 'Wands'];

    it('should prioritize Energy Shield (Local) for armor pieces and shields', () => {
      armorAndShieldClasses.forEach(itemClass => {
        const result = findStatMapping('+100 to maximum Energy Shield', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to maximum Energy Shield (Local)');
        expect(result?.value).toBe(100);
      });
    });

    it('should handle different Energy Shield values correctly', () => {
      armorAndShieldClasses.forEach(itemClass => {
        // Test different values
        const result1 = findStatMapping('+50 to maximum Energy Shield', itemClass);
        expect(result1?.value).toBe(50);
        expect(result1?.filterText).toBe('# to maximum Energy Shield (Local)');

        const result2 = findStatMapping('+250 to maximum Energy Shield', itemClass);
        expect(result2?.value).toBe(250);
        expect(result2?.filterText).toBe('# to maximum Energy Shield (Local)');
      });
    });


    it('should NOT prioritize Energy Shield (Local) for non-armor/shield items', () => {
      nonArmorShieldClasses.forEach(itemClass => {
        const result = findStatMapping('+100 to maximum Energy Shield', itemClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to maximum Energy Shield');
        expect(result?.value).toBe(100);
      });
    });

    it('should handle Energy Shield for shields specifically', () => {
      const result = findStatMapping('+200 to maximum Energy Shield', 'Shields');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('# to maximum Energy Shield (Local)');
      expect(result?.value).toBe(200);
    });

    it('should handle Energy Shield for armor pieces specifically', () => {
      ['Gloves', 'Boots', 'Body Armours', 'Helmets'].forEach(armorClass => {
        const result = findStatMapping('+80 to maximum Energy Shield', armorClass);
        expect(result).toBeTruthy();
        expect(result?.filterText).toBe('# to maximum Energy Shield (Local)');
        expect(result?.value).toBe(80);
      });
    });
  });

  describe('Cross-type validation', () => {
    it('should handle mixed item type scenarios correctly', () => {
      // Weapon trying armor local stat should get global
      const weaponArmorResult = findStatMapping('+50 to Armour', 'Swords');
      expect(weaponArmorResult?.filterText).toBe('# to Armour');

      // Armor trying weapon local stat should get global
      const armorAttackResult = findStatMapping('20% increased Attack Speed', 'Helmets');
      expect(armorAttackResult?.filterText).toBe('#% increased Attack Speed');

      // Shield trying armor local stat should get global
      const shieldArmorResult = findStatMapping('+50 to Armour', 'Shields');
      expect(shieldArmorResult?.filterText).toBe('# to Armour');

      // Armor trying shield local stat should get global
      const armorBlockResult = findStatMapping('15% increased Block chance', 'Gloves');
      expect(armorBlockResult?.filterText).toBe('#% increased Block chance');

      // Weapon trying energy shield local stat should get global
      const weaponEsResult = findStatMapping('+100 to maximum Energy Shield', 'Swords');
      expect(weaponEsResult?.filterText).toBe('# to maximum Energy Shield');
    });

    it('should handle null itemClass correctly', () => {
      // With null itemClass, should always get global versions
      const nullArmorResult = findStatMapping('+50 to Armour', null);
      expect(nullArmorResult?.filterText).toBe('# to Armour');

      const nullAttackResult = findStatMapping('20% increased Attack Speed', null);
      expect(nullAttackResult?.filterText).toBe('#% increased Attack Speed');

      const nullBlockResult = findStatMapping('15% increased Block chance', null);
      expect(nullBlockResult?.filterText).toBe('#% increased Block chance');

      const nullEvasionResult = findStatMapping('+75 to Evasion Rating', null);
      expect(nullEvasionResult?.filterText).toBe('# to Evasion Rating');

      const nullEsResult = findStatMapping('+100 to maximum Energy Shield', null);
      expect(nullEsResult?.filterText).toBe('# to maximum Energy Shield');
    });
  });

  describe('Edge cases', () => {
    it('should handle presence patterns correctly (should never be local)', () => {
      // Presence patterns should never match local versions, even for weapons
      const presenceResult = findStatMapping('Allies in your Presence have 10% increased Attack Speed', 'Swords');
      expect(presenceResult?.filterText).toBe('Allies in your Presence have #% increased Attack Speed');
      expect(presenceResult?.value).toBe(10);
    });

    it('should handle complex stat patterns correctly', () => {
      // Test patterns that might confuse the local matching logic
      const complexArmorResult = findStatMapping('25% increased Armour and Evasion Rating', 'Body Armours');
      expect(complexArmorResult).toBeTruthy();
      // Should match something, but exact filter depends on implementation

      const complexAttackResult = findStatMapping('20% increased Attack and Cast Speed', 'Swords');
      expect(complexAttackResult).toBeTruthy();
      // Should match something, but exact filter depends on implementation
    });
  });
});