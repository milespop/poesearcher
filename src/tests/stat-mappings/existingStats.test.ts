import { describe, it, expect, findStatMapping } from './testSetup';

describe('Existing Stats (Regression Tests)', () => {

  it('should still map "# to maximum Life"', () => {
    const result = findStatMapping('+95 to maximum Life');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('# to maximum Life');
    expect(result?.value).toBe(95);
  });

  it('should still map "# to maximum Mana"', () => {
    const result = findStatMapping('+120 to maximum Mana');
    expect(result).toBeTruthy();
    expect(result?.filterText).toBe('# to maximum Mana');
    expect(result?.value).toBe(120);
  });

  it('should still map resistances correctly', () => {
    // Note: Returns pseudo stat due to object iteration order
    const fireRes = findStatMapping('+45% to Fire Resistance');
    expect(fireRes).toBeTruthy();
    expect(fireRes?.filterText).toBe('+#% total to Fire Resistance');
    expect(fireRes?.value).toBe(45);
  });

  it('should still map elemental damage correctly', () => {
    const fireDmg = findStatMapping('25% increased Fire Damage');
    expect(fireDmg).toBeTruthy();
    expect(fireDmg?.filterText).toBe('#% increased Fire Damage');
    expect(fireDmg?.value).toBe(25);

    const coldDmg = findStatMapping('30% increased Cold Damage');
    expect(coldDmg).toBeTruthy();
    expect(coldDmg?.filterText).toBe('#% increased Cold Damage');
    expect(coldDmg?.value).toBe(30);

    const lightDmg = findStatMapping('35% increased Lightning Damage');
    expect(lightDmg).toBeTruthy();
    expect(lightDmg?.filterText).toBe('#% increased Lightning Damage');
    expect(lightDmg?.value).toBe(35);
  });

  it('should still map physical damage correctly', () => {
    const physDmg = findStatMapping('100% increased Physical Damage');
    expect(physDmg).toBeTruthy();
    expect(physDmg?.filterText).toBe('#% increased Physical Damage');
    expect(physDmg?.value).toBe(100);
  });

  it('should still map added damage correctly', () => {
    const addedPhys = findStatMapping('Adds 10 to 20 Physical Damage');
    expect(addedPhys).toBeTruthy();
    expect(addedPhys?.filterText).toBe('Adds # to # Physical Damage');

    const addedFire = findStatMapping('Adds 15 to 25 Fire Damage');
    expect(addedFire).toBeTruthy();
    expect(addedFire?.filterText).toBe('Adds # to # Fire Damage');
  });

  it('should handle "Gain % of Damage as Extra X Damage" stats', () => {
    const extraCold = findStatMapping('Gain 34% of Damage as Extra Cold Damage');
    expect(extraCold).toBeTruthy();
    expect(extraCold?.filterText).toBe('Gain #% of Damage as Extra Cold Damage');
    expect(extraCold?.value).toBe(34);

    const extraLight = findStatMapping('Gain 45% of Damage as Extra Lightning Damage');
    expect(extraLight).toBeTruthy();
    expect(extraLight?.filterText).toBe('Gain #% of Damage as Extra Lightning Damage');
    expect(extraLight?.value).toBe(45);
  });

  it('should handle presence area of effect (user reported issue)', () => {
    const presence = findStatMapping('21% increased Presence Area of Effect');
    // This should now be implemented (Table 9)
    expect(presence).toBeTruthy();
    expect(presence?.filterText).toBe('#% increased Presence Area of Effect');
  });
});