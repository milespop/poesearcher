import { describe, it, expect, findStatMapping } from './testSetup';

describe('Damage Additions', () => {

  it('should map "Adds # to # Lightning Damage to Attacks per 20 Intelligence"', () => {
    const result = findStatMapping('Adds 3 to 6 Lightning Damage to Attacks per 20 Intelligence');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Adds # to # Lightning Damage to Attacks per 20 Intelligence');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(4); // Average of 3 and 6
  });
});