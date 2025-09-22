import { describe, it, expect, findStatMapping } from './testSetup';

describe('Damage Modifiers', () => {

  it('should map "#% increased Chaos Damage"', () => {
    const result = findStatMapping('45% increased Chaos Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Chaos Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(45);
  });

  describe('#% increased Damage (generic)', () => {
    it('should map pure "#% increased Damage"', () => {
      const result = findStatMapping('50% increased Damage');
      expect(result).toBeTruthy();
      expect(result?.filterText).toBe('#% increased Damage');
      expect(result?.group).toBe('explicit');
      expect(result?.value).toBe(50);
    });

    it('should handle + prefix for generic damage', () => {
      const result = findStatMapping('+35% increased Damage');
      expect(result).toBeTruthy();
      expect(result?.value).toBe(35);
    });

    it('should NOT match "increased Damage with Bows"', () => {
      const result = findStatMapping('50% increased Damage with Bows');
      // This should either not find the generic damage mapping or find a different one
      if (result && result.filterText === '#% increased Damage') {
        expect(result.value).toBeNull();
      }
    });

    it('should NOT match "increased Damage with Bow Skills"', () => {
      const result = findStatMapping('50% increased Damage with Bow Skills');
      if (result && result.filterText === '#% increased Damage') {
        expect(result.value).toBeNull();
      }
    });

    it('should NOT match "increased Damage while you have an active Charm"', () => {
      const result = findStatMapping('50% increased Damage while you have an active Charm');
      if (result && result.filterText === '#% increased Damage') {
        expect(result.value).toBeNull();
      }
    });

    it('should NOT match "increased Damage if you have Consumed a Corpse Recently"', () => {
      const result = findStatMapping('50% increased Damage if you have Consumed a Corpse Recently');
      if (result && result.filterText === '#% increased Damage') {
        expect(result.value).toBeNull();
      }
    });

    it('should NOT match "increased Damage against Enemies with Fully Broken Armour"', () => {
      const result = findStatMapping('50% increased Damage against Enemies with Fully Broken Armour');
      if (result && result.filterText === '#% increased Damage') {
        expect(result.value).toBeNull();
      }
    });
  });

  it('should map "#% increased Global Physical Damage"', () => {
    const result = findStatMapping('60% increased Global Physical Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Global Physical Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(60);
  });

  it('should map "#% increased Spell Physical Damage"', () => {
    const result = findStatMapping('40% increased Spell Physical Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Spell Physical Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(40);
  });
});