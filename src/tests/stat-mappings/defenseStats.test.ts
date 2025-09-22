import { describe, it, expect, findStatMapping } from './testSetup';

describe('Defense Stats', () => {

  it('should map "#% increased Evasion and Energy Shield"', () => {
    const result = findStatMapping('25% increased Evasion and Energy Shield');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Evasion and Energy Shield');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(25);
  });

  it('should map "#% increased Armour, Evasion and Energy Shield"', () => {
    const result = findStatMapping('30% increased Armour, Evasion and Energy Shield');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Armour, Evasion and Energy Shield');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(30);
  });

  it('should map "#% increased Global Defences"', () => {
    const result = findStatMapping('15% increased Global Defences');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Global Defences');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(15);
  });

  it('should map "#% increased Defences from Equipped Shield"', () => {
    const result = findStatMapping('20% increased Defences from Equipped Shield');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Defences from Equipped Shield');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(20);
  });
});