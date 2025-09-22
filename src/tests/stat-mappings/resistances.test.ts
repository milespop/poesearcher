import { describe, it, expect, findStatMapping } from './testSetup';

describe('Table 2: Resistances', () => {

  it('should map "#% to Maximum Cold Resistance"', () => {
    const result = findStatMapping('+5% to Maximum Cold Resistance');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% to Maximum Cold Resistance');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(5);
  });

  it('should map "#% to Maximum Fire Resistance"', () => {
    const result = findStatMapping('+4% to Maximum Fire Resistance');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% to Maximum Fire Resistance');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(4);
  });

  it('should map "#% to Maximum Lightning Resistance"', () => {
    const result = findStatMapping('+6% to Maximum Lightning Resistance');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% to Maximum Lightning Resistance');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(6);
  });

  it('should map "#% maximum Player Resistances"', () => {
    const result = findStatMapping('10% maximum Player Resistances');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% maximum Player Resistances');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(10);
  });

  // Test without + prefix
  it('should handle stats without + prefix', () => {
    const result = findStatMapping('3% to Maximum Fire Resistance');
    expect(result).toBeTruthy();
    expect(result?.value).toBe(3);
  });
});