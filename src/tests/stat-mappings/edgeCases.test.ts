import { describe, it, expect, findStatMapping } from './testSetup';

describe('Edge Cases', () => {

  it('should handle malformed input gracefully', () => {
    expect(findStatMapping('')).toBeNull();
    expect(findStatMapping('not a valid stat')).toBeNull();
    expect(findStatMapping('123')).toBeNull();
  });

  it('should handle very large numbers', () => {
    const result = findStatMapping('999999% increased maximum Life');
    expect(result).toBeTruthy();
    expect(result?.value).toBe(999999);
  });

  it('should handle decimal values where appropriate', () => {
    const result = findStatMapping('Leeches 5.61% of Physical Damage as Mana');
    expect(result).toBeTruthy();
    expect(result?.value).toBe(5.61);
  });
});