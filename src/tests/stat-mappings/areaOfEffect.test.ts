import { describe, it, expect, findStatMapping } from './testSetup';

describe('Area of Effect', () => {
  it('should map "#% increased Area of Effect"', () => {
    const result = findStatMapping('25% increased Area of Effect');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Area of Effect');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(25);
  });

  it('should map "#% increased Area of Effect for Attacks per 10 Intelligence"', () => {
    const result = findStatMapping('30% increased Area of Effect for Attacks per 10 Intelligence');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Area of Effect for Attacks per 10 Intelligence');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(30);
  });

  it('should map "#% increased Area of Effect of Curses"', () => {
    const result = findStatMapping('40% increased Area of Effect of Curses');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Area of Effect of Curses');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(40);
  });

  it('should prioritize specific AoE patterns over generic', () => {
    const curseResult = findStatMapping('40% increased Area of Effect of Curses');
    expect(curseResult?.filterText).toBe('#% increased Area of Effect of Curses');

    const attackResult = findStatMapping('30% increased Area of Effect for Attacks per 10 Intelligence');
    expect(attackResult?.filterText).toBe('#% increased Area of Effect for Attacks per 10 Intelligence');

    const genericResult = findStatMapping('25% increased Area of Effect');
    expect(genericResult?.filterText).toBe('#% increased Area of Effect');
  });

  it('should handle different formatting variations', () => {
    const result1 = findStatMapping('15% increased Area of Effect');
    expect(result1?.value).toBe(15);

    const result2 = findStatMapping('50% increased Area of Effect of Curses');
    expect(result2?.value).toBe(50);

    const result3 = findStatMapping('20% increased Area of Effect for Attacks per 10 Intelligence');
    expect(result3?.value).toBe(20);
  });
});