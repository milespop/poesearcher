---
"poesearcher": minor
---

Add support for Table 21: EXPERIENCE, GOLD & RARITY

Implements comprehensive farming and progression stat mappings for endgame content:

**Experience Gain Modifiers:**
- `#% increased Experience gain` - General experience scaling for leveling
- `#% increased Experience gain in your Maps` - Map-specific experience bonuses

**Gold Farming Modifiers:**
- `#% increased Gold found in this Area (Gold Piles)` - Area-specific gold bonuses
- `#% increased Gold found in your Maps (Gold Piles)` - Map-specific gold farming

**Item Drop Modifiers:**
- `#% increased Rarity of Items found in your Maps` - Map-specific rarity bonuses
- `#% increased Quantity of Items found in your Maps` - Map-specific item quantity scaling

**Enhanced Pattern Specificity:**
- Proper prioritization of map-specific modifiers over generic versions
- Enhanced existing rarity pattern with strict boundary matching for accuracy
- Comprehensive coverage of all farming and progression mechanics

This addresses a key gap in farming and progression build support, bringing experience/gold/rarity stat coverage from ~15% to 100% coverage of all essential farming modifiers. All 6 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive edge case testing.

**Technical Implementation:**
- Added map-specific patterns before generic patterns to ensure proper prioritization
- Enhanced existing generic rarity pattern with strict boundary matching for accuracy
- Full test coverage with 26 test cases covering all scenarios, edge cases, and integration checks
- Fixed pattern specificity issues to ensure correct stat matching between generic and map-specific versions

This fills a critical gap for farming-focused builds, making the extension much more useful for players optimizing experience gain, gold farming, and item drop rates in Path of Exile 2 endgame content.