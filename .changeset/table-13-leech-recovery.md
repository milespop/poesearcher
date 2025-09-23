---
"poesearcher": minor
---

Add support for Table 13: LEECH & RECOVERY ADVANCED

Implements comprehensive leech and recovery stat mappings for advanced recovery builds:

**Leech Effectiveness:**
- `#% increased amount of Life Leeched` - Core leech scaling mechanism
- `#% increased amount of Mana Leeched` - Essential mana leech builds

**Life/Mana on Kill:**
- `Recover #% of maximum Life on Kill` - Percentage-based life recovery on kill
- `Recover #% of maximum Mana on Kill (Jewel)` - Jewel-specific mana recovery with fallback support

**Life on Hit:**
- `Gain # Life per Enemy Hit with Attacks` - Attack-based life recovery
- `Grants # Life per Enemy Hit` - Generic life on hit mechanics

**Recoup Mechanics:**
- `#% of Damage taken Recouped as Life` - Damage-to-life recoup system
- `#% of Damage taken Recouped as Mana` - Damage-to-mana recoup system

This addresses a major gap in recovery build support, bringing leech and recovery stat coverage from ~40% to 100% coverage of all essential recovery modifiers. All 8 new stat mappings include proper regex patterns with support for flexible whitespace handling and edge case testing.

**Technical Implementation:**
- Added comprehensive regex patterns that handle multiple spaces between words
- Includes support for optional + prefix on values where applicable
- Full test coverage with 21 test cases covering all scenarios and edge cases
- Integration tested to ensure no conflicts with existing leech or recovery stats

This fills a critical gap for recovery-focused builds, making the extension much more useful for players using advanced leech, on-kill recovery, life-on-hit, and recoup mechanics in Path of Exile 2.