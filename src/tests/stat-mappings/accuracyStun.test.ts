import { describe, it, expect, findStatMapping } from './testSetup';

describe('Accuracy & Stun', () => {
  it('should map "#% increased Accuracy Rating"', () => {
    const result = findStatMapping('25% increased Accuracy Rating');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Accuracy Rating');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(25);
  });

  it('should map "#% increased Accuracy Rating with Bows"', () => {
    const result = findStatMapping('15% increased Accuracy Rating with Bows');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Accuracy Rating with Bows');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(15);
  });

  it('should map "#% increased Stun Threshold"', () => {
    const result = findStatMapping('30% increased Stun Threshold');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Stun Threshold');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(30);
  });

  it('should map "#% increased Stun Duration"', () => {
    const result = findStatMapping('20% increased Stun Duration');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Stun Duration');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(20);
  });

  it('should map "#% increased Stun Buildup"', () => {
    const result = findStatMapping('40% increased Stun Buildup');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Stun Buildup');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(40);
  });

  it('should map "#% increased Stun Buildup with Maces"', () => {
    const result = findStatMapping('35% increased Stun Buildup with Maces');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Stun Buildup with Maces');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(35);
  });

  it('should map "#% increased Stun Threshold if you haven\'t been Stunned Recently"', () => {
    const result = findStatMapping('50% increased Stun Threshold if you haven\'t been Stunned Recently');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Stun Threshold if you haven\'t been Stunned Recently');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(50);
  });

  it('should prioritize weapon-specific accuracy over generic', () => {
    const bowResult = findStatMapping('15% increased Accuracy Rating with Bows');
    expect(bowResult?.filterText).toBe('#% increased Accuracy Rating with Bows');

    const genericResult = findStatMapping('25% increased Accuracy Rating');
    expect(genericResult?.filterText).toBe('#% increased Accuracy Rating');
  });

  it('should prioritize weapon-specific stun buildup over generic', () => {
    const maceResult = findStatMapping('35% increased Stun Buildup with Maces');
    expect(maceResult?.filterText).toBe('#% increased Stun Buildup with Maces');

    const genericResult = findStatMapping('40% increased Stun Buildup');
    expect(genericResult?.filterText).toBe('#% increased Stun Buildup');
  });

  it('should prioritize conditional stun threshold over generic', () => {
    const conditionalResult = findStatMapping('50% increased Stun Threshold if you haven\'t been Stunned Recently');
    expect(conditionalResult?.filterText).toBe('#% increased Stun Threshold if you haven\'t been Stunned Recently');

    const genericResult = findStatMapping('30% increased Stun Threshold');
    expect(genericResult?.filterText).toBe('#% increased Stun Threshold');
  });
});