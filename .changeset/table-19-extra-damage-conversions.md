---
"poesearcher": minor
---

Add support for Table 19: EXTRA DAMAGE CONVERSIONS (Attack-Specific)

Implements comprehensive attack-specific extra damage conversion mappings for attack builds:

**Attack-Specific Extra Damage Conversions:**
- `Attacks Gain #% of Damage as Extra Fire Damage` - Attack-specific fire damage conversion
- `Attacks Gain #% of Damage as Extra Cold Damage` - Attack-specific cold damage conversion
- `Attacks Gain #% of Damage as Extra Lightning Damage` - Attack-specific lightning damage conversion
- `Attacks Gain #% of Damage as Extra Chaos Damage` - Attack-specific chaos damage conversion

**Enhanced Pattern Specificity:**
- Improved regex patterns for existing generic extra damage conversions to prevent false matches
- Attack-specific patterns prioritized over generic patterns for accurate filtering
- Strict pattern matching to avoid conflicts with other skill types (spells, minions, etc.)

This addresses a key gap in attack build support, bringing attack-specific extra damage conversion coverage from 0% to 100% coverage of all essential attack conversion modifiers. All 4 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive edge case testing.

**Technical Implementation:**
- Added attack-specific patterns before generic patterns to ensure proper prioritization
- Enhanced existing generic patterns with strict boundary matching (^...$ anchors)
- Full test coverage with 22 test cases covering all scenarios, edge cases, and integration checks
- Fixed pattern specificity issues to prevent false positive matches

This fills a critical gap for attack-focused builds, making the extension much more useful for players using attack-based extra damage conversion mechanics in Path of Exile 2, while maintaining full compatibility with existing generic extra damage stats.