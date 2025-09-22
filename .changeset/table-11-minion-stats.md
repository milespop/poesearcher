---
"poesearcher": minor
---

Add support for Table 11: MINION STATS

Implements comprehensive minion stat mappings including:

**High Priority Stats:**
- `Minions deal #% increased Damage` - Core minion damage scaling
- `Minions have #% increased maximum Life` - Essential minion survivability
- `Minions have #% increased Attack and Cast Speed` - Critical minion speed scaling
- `Minions have #% to all Elemental Resistances` - Core minion defense

**Medium Priority Stats:**
- `Minions have #% additional Physical Damage Reduction` - Physical damage mitigation
- `Minions have #% increased Critical Damage Bonus` - Minion critical strike scaling
- `Minions have #% increased Critical Hit Chance` - Minion critical chance
- `#% increased Minion Accuracy Rating` - Minion hit chance
- `Minions have #% to Chaos Resistance` - Chaos damage protection

**Advanced Stats:**
- `Minions gain #% of their maximum Life as Extra maximum Energy Shield` - Hybrid minion defense
- `Minions Revive #% faster` - Minion revival speed

This addresses a major gap in minion build support, bringing minion stat coverage from 0% to comprehensive coverage of all essential minion modifiers. All 11 new stat mappings include proper regex patterns with support for optional + prefixes and flexible whitespace handling.