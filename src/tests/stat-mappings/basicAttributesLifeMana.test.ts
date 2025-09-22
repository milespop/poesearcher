import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 1: Basic Attributes & Life/Mana', () => {

  it('should map "# to maximum Energy Shield" (currently returns pseudo first)', () => {
    // Note: Returns pseudo stat due to object iteration order
    const result = findStatMapping('100 to maximum Energy Shield');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('+# total maximum Energy Shield');
    expect(result?.group).toBe('pseudo');
    expect(result?.value).toBe(100);
  });

  it('should map "#% increased maximum Life"', () => {
    const result = findStatMapping('50% increased maximum Life');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased maximum Life');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(50);
  });

  it('should map "#% increased maximum Mana"', () => {
    const result = findStatMapping('30% increased maximum Mana');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased maximum Mana');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(30);
  });

  it('should map "#% increased maximum Energy Shield"', () => {
    const result = findStatMapping('75% increased maximum Energy Shield');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased maximum Energy Shield');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(75);
  });

  it('should map "#% increased Life Regeneration rate"', () => {
    const result = findStatMapping('25% increased Life Regeneration rate');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Life Regeneration rate');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(25);
  });

  it('should map "#% of Damage is taken from Mana before Life"', () => {
    const result = findStatMapping('30% of Damage is taken from Mana before Life');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% of Damage is taken from Mana before Life');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(30);
  });

  it('should map "#% of Maximum Life Converted to Energy Shield"', () => {
    const result = findStatMapping('15% of Maximum Life Converted to Energy Shield');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% of Maximum Life Converted to Energy Shield');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(15);
  });

  // Test with + prefix variations
  it('should handle + prefix for life/mana/ES stats', () => {
    const result = findStatMapping('+25% increased maximum Life');
    expect(result).toBeTruthy();
    expect(result?.value).toBe(25);
  });
});