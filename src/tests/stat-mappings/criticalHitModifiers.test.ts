import { describe, it, expect, findStatMapping } from './testSetup';

describe('Critical Hit Modifiers', () => {

  it('should map "#% increased Critical Spell Damage Bonus"', () => {
    const result = findStatMapping('40% increased Critical Spell Damage Bonus');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Critical Spell Damage Bonus');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(40);
  });

  it('should map "#% increased Critical Damage Bonus with Spears"', () => {
    const result = findStatMapping('25% increased Critical Damage Bonus with Spears');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Critical Damage Bonus with Spears');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(25);
  });
});