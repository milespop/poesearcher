---
"poesearcher": minor
---

Add support for Energy Shield Local Modifiers

Implements comprehensive Energy Shield local modifier support with proper item type restrictions:

**Energy Shield Local Modifier:**
- `# to maximum Energy Shield (Local)` - Essential local ES modifier for armor pieces and shields

**Enhanced Item Type System:**
- Extended local modifier logic to support both armor pieces and shields for Energy Shield
- Proper prioritization ensures local version is used only for appropriate item types
- Non-armor/shield items correctly fall back to global Energy Shield pattern

**Technical Implementation:**
- Added `# to maximum Energy Shield (Local)` pattern in statMappings.ts with proper regex matching
- Enhanced findStatMapping() function with Energy Shield local modifier support for `isArmor || isShield`
- Comprehensive test coverage with 5 new tests covering all armor/shield classes and edge cases
- All 359 tests passing with zero regressions

This addresses the final major gap in local modifier support, bringing Energy Shield local modifier coverage from 0% to 100% coverage. The implementation ensures accurate item type matching for Energy Shield builds, particularly important for CI (Chaos Inoculation), hybrid ES/Life, and pure Energy Shield builds in Path of Exile 2.

**Affected Build Types:**
- Chaos Inoculation (CI) builds requiring local ES on gear
- Hybrid Energy Shield/Life builds using ES armor pieces
- Pure Energy Shield builds with ES shields and armor
- Any build using Energy Shield as primary or secondary defense

This completes the local modifier system implementation, ensuring all critical local modifiers (Attack Speed, Accuracy, Armour, Evasion, Block Chance, and Energy Shield) have proper item type restrictions.