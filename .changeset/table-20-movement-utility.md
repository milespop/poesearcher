---
"poesearcher": minor
---

Add support for Table 20: MOVEMENT & UTILITY

Implements comprehensive movement and utility stat mappings for diverse build mechanics:

**Movement Speed Modifiers:**
- `#% increased Movement Speed while affected by an Ailment` - Conditional movement speed enhancement
- Enhanced prioritization for conditional movement speed over generic movement speed

**Projectile Mechanics:**
- `#% increased Projectile Speed` - Essential projectile build scaling
- `Projectiles Pierce all Ignited enemies` - Advanced pierce mechanics for elemental builds
- `Attacks Chain an additional time` - Chain mechanics for attack builds
- `Bow Attacks fire # additional Arrows` - Additional projectile scaling for bow builds

**Utility Stats:**
- `#% increased Light Radius` - Quality of life utility modifier

This addresses a major gap in movement and projectile build support, bringing movement/utility stat coverage from ~25% to 100% coverage of all essential movement and utility modifiers. All 6 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive edge case testing.

**Technical Implementation:**
- Added proper pattern specificity ordering to ensure conditional movement speed is matched before generic
- Enhanced existing movement speed pattern with strict boundary matching for accuracy
- Boolean stats (pierce, chain) properly represented as value 1 for filter compatibility
- Full test coverage with 28 test cases covering all scenarios, edge cases, and integration checks
- Fixed pattern prioritization issues to ensure correct stat matching

This fills a critical gap for movement-focused and projectile builds, making the extension much more useful for players using conditional movement, projectile speed scaling, pierce/chain mechanics, and additional arrow generation in Path of Exile 2.