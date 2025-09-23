---
"poesearcher": minor
---

Implement final 2 missing stats for complete coverage of Tables 9 and 19

Adds support for the last 2 missing stat mappings that complete implementation coverage:

**Table 9: Presence/Aura Effects Enhancement:**
- `When a Party Member in your Presence Casts a Spell, you Sacrifice #% of Mana and they Leech that Mana` - Complex presence interaction for party-based mana sharing mechanics

**Table 19: Extra Damage Conversions Enhancement:**
- `Gain #% of Damage as Chaos Damage per Undead Minion` - Minion scaling chaos damage conversion for necromancer builds

**Enhanced Pattern Implementation:**
- Both stats include proper regex patterns with flexible whitespace handling
- Complex multi-word pattern matching for the presence stat
- Comprehensive edge case testing to prevent pattern conflicts

This completes the implementation of all identified missing stats from the comprehensive analysis, bringing Tables 9 and 19 to 100% coverage. All 2 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive test coverage.

**Technical Implementation:**
- Added presence mana sacrifice pattern with proper complex text matching
- Added minion-based chaos damage pattern with per-minion scaling support
- Enhanced test coverage with 7 new test cases covering both stats and edge cases
- Full integration testing to ensure no conflicts with existing patterns

This addresses the final gaps identified in the missing stats analysis, completing comprehensive support for all documented stat patterns with proper pattern priority and flexible whitespace handling.

**Affected Build Types:**
- Party-based support builds utilizing presence mana sharing mechanics
- Necromancer builds optimizing chaos damage scaling per undead minion count
- Hybrid builds combining presence effects with minion scaling

Completes the missing stats implementation project, ensuring comprehensive support for all remaining stat modifiers with proper pattern priority and flexible whitespace handling.