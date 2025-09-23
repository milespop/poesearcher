---
"poesearcher": minor
---

Add support for Table 17: TOTEM STATS

Implements comprehensive totem stat mappings for totem builds:

**Core Totem Stats:**
- `#% increased Totem Damage` - Core totem damage scaling
- `#% increased Totem Life` - Essential totem survivability
- `#% increased Totem Placement speed` - Totem placement speed

This addresses a major gap in totem build support, bringing totem stat coverage from 0% to 100% coverage of all essential totem modifiers. All 3 new stat mappings include proper regex patterns with support for flexible whitespace handling.

**Technical Implementation:**
- Added comprehensive regex patterns that handle multiple spaces between words
- Includes support for optional + prefix on values
- Full test coverage with 13 test cases covering all scenarios and edge cases
- Integration tested to ensure no conflicts with existing minion or damage stats

This fills a critical gap for totem builds, making the extension much more useful for players using totem-based strategies in Path of Exile 2.