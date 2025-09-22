import { describe, it, expect, findStatMapping } from './testSetup';

describe('Attack & Cast Speed', () => {

  it('should map "#% increased Attack Speed per 10 Dexterity"', () => {
    const result = findStatMapping('2% increased Attack Speed per 10 Dexterity');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Attack Speed per 10 Dexterity');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(2);
  });

  it('should map "#% increased Attack Speed per 20 Dexterity"', () => {
    const result = findStatMapping('3% increased Attack Speed per 20 Dexterity');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Attack Speed per 20 Dexterity');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(3);
  });

  it('should map "#% increased Attack Speed with Bows"', () => {
    const result = findStatMapping('15% increased Attack Speed with Bows');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Attack Speed with Bows');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(15);
  });

  it('should map "#% increased Attack Speed with Crossbows"', () => {
    const result = findStatMapping('12% increased Attack Speed with Crossbows');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Attack Speed with Crossbows');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(12);
  });

  it('should map "#% increased Attack Speed with Quarterstaves"', () => {
    const result = findStatMapping('18% increased Attack Speed with Quarterstaves');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Attack Speed with Quarterstaves');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(18);
  });

  it('should map "#% increased Attack Speed with Spears"', () => {
    const result = findStatMapping('20% increased Attack Speed with Spears');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('#% increased Attack Speed with Spears');
    expect(result?.group).toBe('explicit');
    expect(result?.value).toBe(20);
  });
});