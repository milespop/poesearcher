import { describe, it, expect, findStatMapping } from './testSetup';

describe('Minion Stats', () => {

  it('should map "Minions deal #% increased Damage"', () => {
    const result = findStatMapping('Minions deal 25% increased Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions deal #% increased Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(25);
  });

  it('should map "Minions have #% increased maximum Life"', () => {
    const result = findStatMapping('Minions have 40% increased maximum Life');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions have #% increased maximum Life');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(40);
  });

  it('should map "Minions have #% increased Attack and Cast Speed"', () => {
    const result = findStatMapping('Minions have 15% increased Attack and Cast Speed');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions have #% increased Attack and Cast Speed');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(15);
  });

  it('should map "Minions have #% to all Elemental Resistances"', () => {
    const result = findStatMapping('Minions have +20% to all Elemental Resistances');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions have #% to all Elemental Resistances');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(20);
  });

  it('should map "Minions have #% additional Physical Damage Reduction"', () => {
    const result = findStatMapping('Minions have 8% additional Physical Damage Reduction');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions have #% additional Physical Damage Reduction');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(8);
  });

  it('should map "Minions have #% increased Critical Damage Bonus"', () => {
    const result = findStatMapping('Minions have 30% increased Critical Damage Bonus');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions have #% increased Critical Damage Bonus');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(30);
  });

  it('should map "Minions have #% increased Critical Hit Chance"', () => {
    const result = findStatMapping('Minions have 12% increased Critical Hit Chance');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions have #% increased Critical Hit Chance');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(12);
  });

  it('should map "#% increased Minion Accuracy Rating"', () => {
    const result = findStatMapping('18% increased Minion Accuracy Rating');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Minion Accuracy Rating');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(18);
  });

  it('should map "Minions have #% to Chaos Resistance"', () => {
    const result = findStatMapping('Minions have +15% to Chaos Resistance');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions have #% to Chaos Resistance');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(15);
  });

  it('should map "Minions gain #% of their maximum Life as Extra maximum Energy Shield"', () => {
    const result = findStatMapping('Minions gain 25% of their maximum Life as Extra maximum Energy Shield');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions gain #% of their maximum Life as Extra maximum Energy Shield');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(25);
  });

  it('should map "Minions Revive #% faster"', () => {
    const result = findStatMapping('Minions Revive 50% faster');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Minions Revive #% faster');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(50);
  });

  // Test variations and edge cases
  it('should handle minion stats without + prefix', () => {
    const result1 = findStatMapping('Minions have 10% to all Elemental Resistances');
    expect(result1?.value).toBe(10);

    const result2 = findStatMapping('Minions have 5% to Chaos Resistance');
    expect(result2?.value).toBe(5);
  });

  it('should handle different spacing in minion stats', () => {
    const result = findStatMapping('Minions have  30%  increased maximum Life');
    expect(result?.value).toBe(30);
  });

  it('should prioritize minion-specific stats over generic ones', () => {
    // This ensures minion stats are matched specifically and don't interfere with other stats
    const minionDamageResult = findStatMapping('Minions deal 20% increased Damage');
    expect(minionDamageResult?.filterText).toBe('Minions deal #% increased Damage');

    const minionLifeResult = findStatMapping('Minions have 35% increased maximum Life');
    expect(minionLifeResult?.filterText).toBe('Minions have #% increased maximum Life');
  });
});