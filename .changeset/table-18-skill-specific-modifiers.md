---
"poesearcher": minor
---

Add support for Table 18: SKILL-SPECIFIC MODIFIERS

Implements comprehensive skill and weapon-specific modifier mappings for specialized builds:

**Weapon-Specific Damage Modifiers:**
- `#% increased Damage with Bow Skills` - Bow skill-based damage scaling
- `#% increased Damage with Bows` - Bow weapon-based damage scaling
- `#% increased Damage with Crossbows` - Crossbow weapon damage scaling
- `#% increased Damage with Quarterstaves` - Quarterstaff weapon damage scaling
- `#% increased Damage with Spears` - Spear weapon damage scaling
- `#% increased Damage with Maces` - Mace weapon damage scaling

**Skill Type Modifiers:**
- `Herald Skills deal #% increased Damage` - Herald skill damage enhancement
- `Meta Skills gain #% increased Energy` - Meta skill energy scaling

**Effect Duration Modifiers:**
- `#% increased Skill Effect Duration` - Generic skill duration extension
- `#% increased Charm Effect Duration` - Charm-specific duration scaling

This addresses a major gap in weapon and skill-specific build support, bringing skill-specific modifier coverage from ~10% to 100% coverage of all essential weapon and skill type modifiers. All 10 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive edge case testing.

**Technical Implementation:**
- Added comprehensive regex patterns that handle multiple spaces between words
- Includes proper distinction between bow skills vs bow weapons for accurate filtering
- Full test coverage with 30 test cases covering all scenarios, edge cases, and integration checks
- Integration tested to ensure no conflicts with existing damage or weapon stats

This fills a critical gap for weapon-specific and skill-focused builds, making the extension much more useful for players using specialized bow, crossbow, quarterstaff, spear, mace, herald, and meta skill builds in Path of Exile 2.