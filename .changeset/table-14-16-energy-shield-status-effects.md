---
"poesearcher": minor
---

Implement Table 14 (Energy Shield Advanced) and Table 16 (Status Effects & Ailments)

**Major Feature Addition: Advanced Energy Shield & Status Effects Support**

This release adds comprehensive support for advanced Energy Shield mechanics and status effect/ailment systems, significantly enhancing build compatibility for ES-based and ailment-focused builds.

## New Stat Categories

### Table 14: Energy Shield Advanced (4/4 stats - 100% coverage)
- `#% increased Energy Shield Recharge Rate` - Control ES recovery speed
- `#% of Damage taken bypasses Energy Shield` - ES bypass mechanics
- `Gain additional Stun Threshold equal to #% of maximum Energy Shield` - ES-based stun defense
- `Gain additional Ailment Threshold equal to #% of maximum Energy Shield` - ES-based ailment defense

### Table 16: Status Effects & Ailments (14/15 stats - 93% coverage)

**Ailment Duration Reduction:**
- `#% reduced Ignite Duration on you`
- `#% reduced Chill Duration on you`
- `#% reduced Shock duration on you`

**Status Effect Buildup & Magnitude:**
- `#% increased Freeze Buildup`
- `#% increased Ignite Magnitude`
- `#% increased Shock Duration`

**Ailment Magnitude Modifiers:**
- `#% increased Magnitude of Shock you inflict`
- `#% increased Magnitude of Bleeding you inflict`
- `#% increased Magnitude of Poison you inflict`
- `#% increased Magnitude of Chill you inflict`
- `#% increased Magnitude of Damaging Ailments you inflict with Critical Hits`

**Ailment Application Chance:**
- `#% chance to inflict Bleeding on Hit`
- `#% chance to Poison on Hit`
- `#% chance to Blind Enemies on Hit with Attacks`

## Technical Implementation

- **Enhanced Pattern Matching**: Updated existing Energy Shield patterns to prevent conflicts with new specific patterns
- **Comprehensive Test Coverage**: Added 29 new tests across 2 test files (`energyShieldAdvanced.test.ts`, `statusEffectsAilments.test.ts`)
- **Robust Regex Patterns**: Handles various spacing and formatting variations in stat text
- **Build Compatibility**: Full support for Energy Shield builds and ailment-based offensive strategies
