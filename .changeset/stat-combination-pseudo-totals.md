---
"poesearcher": minor
---

Add intelligent stat combination for pseudo totals in search filters

Implements automatic combination of implicit + explicit stats into pseudo totals for more accurate searches:

**Core Feature:**
- Combines matching implicit and explicit stats during search filter creation only
- Item preview continues to show individual stats unchanged
- Example: `+28% to Lightning Resistance (implicit)` + `+36% to Lightning Resistance` → `+64% total to Lightning Resistance`

**Supported Stat Categories:**
- **Elemental Resistances**: Fire, Cold, Lightning, Chaos
- **Core Attributes**: Strength, Dexterity, Intelligence, All Attributes
- **Energy Shield**: Maximum Energy Shield and Energy Shield from Body Armour
- **Critical Stats**: Critical Hit Chance and Critical Damage Bonus

**Technical Implementation:**
- Added `combineCompatibleStats` function with intelligent pattern matching
- Regex-based stat parsing with flexible whitespace and optional + prefix handling
- Preserves original stats in item display while using combined totals for search accuracy
- Comprehensive integration testing to ensure reliability

This addresses a major usability gap where users had to manually calculate total resistance/attribute values when searching for items with both implicit and explicit modifiers. The feature seamlessly integrates with existing pseudo stat mappings to provide more accurate and user-friendly search filtering.