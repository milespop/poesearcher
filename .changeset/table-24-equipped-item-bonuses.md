---
"poesearcher": minor
---

Add support for Table 24: EQUIPPED ITEM BONUSES

Implements comprehensive equipped item bonus stat mappings for equipment-specific scaling builds:

**Focus Bonuses:**
- `#% increased Energy Shield from Equipped Focus` - Essential Focus-specific Energy Shield scaling

**Quiver Bonuses:**
- `#% increased bonuses gained from Equipped Quiver` - Quiver-specific bonus scaling for bow builds

**Ring Bonuses:**
- `#% increased bonuses gained from left Equipped Ring` - Left ring specific bonus scaling
- `#% increased bonuses gained from right Equipped Ring` - Right ring specific bonus scaling

**Shield Enhancements:**
- Enhanced existing `#% increased Defences from Equipped Shield` pattern with flexible whitespace support

**Enhanced Pattern Specificity:**
- Updated generic Energy Shield pattern to properly exclude equipped item bonuses, ensuring correct prioritization
- All equipped item patterns include proper regex patterns with flexible whitespace handling
- Comprehensive edge case testing to prevent pattern conflicts

This addresses equipment-specific scaling builds, bringing equipped item bonus coverage from 20% to 100% coverage (5/5 stats). All 4 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive edge case testing.

**Technical Implementation:**
- Added equipped item bonus patterns with proper specificity handling to avoid conflicts with generic patterns
- Enhanced existing shield defence pattern to support flexible whitespace matching
- Updated generic Energy Shield pattern exclusions to prevent inappropriate matching
- Full test coverage with 21 test cases covering all equipment types, edge cases, and integration checks
- Fixed pattern specificity issues to ensure correct stat matching between generic and equipment-specific versions

This fills a critical gap for equipment-focused builds, making the extension much more useful for players optimizing Focus, Quiver, and Ring scaling mechanics in Path of Exile 2.

**Affected Build Types:**
- Focus-based Energy Shield builds
- Bow builds utilizing Quiver bonuses
- Ring-focused builds optimizing left/right ring bonuses
- Shield-based defensive builds with enhanced pattern matching

Completes Table 24 implementation, ensuring comprehensive support for all equipment-specific bonus modifiers with proper pattern priority and flexible whitespace handling.