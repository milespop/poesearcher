import { describe, it, expect, findStatMapping } from './testSetup';

describe('Presence/Aura Effects', () => {
  it('should map "#% increased Presence Area of Effect"', () => {
    const result = findStatMapping('25% increased Presence Area of Effect');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Presence Area of Effect');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(25);
  });

  it('should map "Allies in your Presence deal #% increased Damage"', () => {
    const result = findStatMapping('Allies in your Presence deal 20% increased Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence deal #% increased Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(20);
  });

  it('should map "Allies in your Presence Regenerate # Life per second"', () => {
    const result = findStatMapping('Allies in your Presence Regenerate 15 Life per second');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence Regenerate # Life per second');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(15);
  });

  it('should map "Allies in your Presence have # to Accuracy Rating"', () => {
    const result = findStatMapping('Allies in your Presence have +150 to Accuracy Rating');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence have # to Accuracy Rating');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(150);
  });

  it('should map "Allies in your Presence have #% increased Attack Speed"', () => {
    const result = findStatMapping('Allies in your Presence have 12% increased Attack Speed');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence have #% increased Attack Speed');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(12);
  });

  it('should map "Allies in your Presence have #% increased Cast Speed"', () => {
    const result = findStatMapping('Allies in your Presence have 10% increased Cast Speed');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence have #% increased Cast Speed');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(10);
  });

  it('should map "Allies in your Presence have #% increased Critical Hit Chance"', () => {
    const result = findStatMapping('Allies in your Presence have 8% increased Critical Hit Chance');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence have #% increased Critical Hit Chance');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(8);
  });

  it('should map "Allies in your Presence have #% increased Critical Damage Bonus"', () => {
    const result = findStatMapping('Allies in your Presence have 15% increased Critical Damage Bonus');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence have #% increased Critical Damage Bonus');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(15);
  });

  it('should map "Allies in your Presence have #% to all Elemental Resistances"', () => {
    const result = findStatMapping('Allies in your Presence have +5% to all Elemental Resistances');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence have #% to all Elemental Resistances');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(5);
  });

  it('should map "Allies in your Presence deal # to # added Attack Cold Damage"', () => {
    const result = findStatMapping('Allies in your Presence deal 5 to 12 added Attack Cold Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence deal # to # added Attack Cold Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(5);
  });

  it('should map "Allies in your Presence deal # to # added Attack Fire Damage"', () => {
    const result = findStatMapping('Allies in your Presence deal 8 to 15 added Attack Fire Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence deal # to # added Attack Fire Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(8);
  });

  it('should map "Allies in your Presence deal # to # added Attack Lightning Damage"', () => {
    const result = findStatMapping('Allies in your Presence deal 3 to 20 added Attack Lightning Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence deal # to # added Attack Lightning Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(3);
  });

  it('should map "Allies in your Presence deal # to # added Attack Physical Damage"', () => {
    const result = findStatMapping('Allies in your Presence deal 6 to 10 added Attack Physical Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Allies in your Presence deal # to # added Attack Physical Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(6);
  });

  it('should map "Enemies in your Presence are Ignited as though dealt # Base Fire Damage"', () => {
    const result = findStatMapping('Enemies in your Presence are Ignited as though dealt 100 Base Fire Damage');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Enemies in your Presence are Ignited as though dealt # Base Fire Damage');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(100);
  });

  it('should map "Enemies in your Presence have #% to Fire Resistance"', () => {
    const result = findStatMapping('Enemies in your Presence have -15% to Fire Resistance');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Enemies in your Presence have #% to Fire Resistance');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(-15);
  });

  it('should map "#% of your Base Life Regeneration is granted to Allies in your Presence"', () => {
    const result = findStatMapping('50% of your Base Life Regeneration is granted to Allies in your Presence');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% of your Base Life Regeneration is granted to Allies in your Presence');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(50);
  });

  it('should map "Share Charges with Allies in your Presence"', () => {
    const result = findStatMapping('Share Charges with Allies in your Presence');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('Share Charges with Allies in your Presence');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(1);
  });

  it('should handle presence effects with different formatting', () => {
    const resultWithoutPlus = findStatMapping('Allies in your Presence have 120 to Accuracy Rating');
    expect(resultWithoutPlus?.value).toBe(120);

    const resultWithoutPercent = findStatMapping('Allies in your Presence have 5% to all Elemental Resistances');
    expect(resultWithoutPercent?.value).toBe(5);
  });

  it('should handle negative resistance values correctly', () => {
    const positiveResult = findStatMapping('Enemies in your Presence have +10% to Fire Resistance');
    expect(positiveResult?.value).toBe(10);

    const negativeResult = findStatMapping('Enemies in your Presence have -20% to Fire Resistance');
    expect(negativeResult?.value).toBe(-20);
  });
});