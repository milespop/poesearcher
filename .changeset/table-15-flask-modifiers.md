---
"poesearcher": minor
---

Add support for Table 15: FLASK MODIFIERS

Implements comprehensive flask modifier mappings for flask-focused builds:

**Flask Charge Mechanics:**
- `#% increased Flask Charges gained` - Essential flask charge efficiency
- `#% reduced Flask Charges used` - Flask charge optimization

**Flask Recovery Rates:**
- `#% increased Flask Life Recovery rate` - Life flask speed enhancement
- `#% increased Flask Mana Recovery rate` - Mana flask speed enhancement
- `#% increased Recovery rate` - Generic recovery rate modifier

**Flask Duration:**
- `#% increased Flask Effect Duration` - Flask effect duration extension

**Flask Passive Generation:**
- `Life Flasks gain # charges per Second` - Passive life flask charge generation
- `Mana Flasks gain # charges per Second` - Passive mana flask charge generation

**Advanced Flask Mechanics:**
- `Life Flasks used while on Low Life apply Recovery Instantly` - Emergency instant recovery
- `Mana Flasks used while on Low Mana apply Recovery Instantly` - Emergency instant recovery
- `#% more Recovery if used while on Low Life` - Conditional recovery enhancement

This addresses a major gap in flask build support, bringing flask modifier coverage from 0% to 100% coverage of all essential flask modifiers. All 11 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive edge case testing.

**Technical Implementation:**
- Added comprehensive regex patterns that handle multiple spaces between words
- Includes support for boolean stats (instant recovery) represented as value 1
- Full test coverage with 28 test cases covering all scenarios and edge cases
- Integration tested to ensure no conflicts with existing recovery or regeneration stats

This fills a critical gap for flask-focused builds, making the extension much more useful for players using advanced flask mechanics, charge optimization, and recovery strategies in Path of Exile 2.