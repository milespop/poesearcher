---
"poesearcher": patch
---

Fix stat mapping issues for attribute combinations and Energy Shield Recharge

**Bug Fixes:**

1. **Fix "# to Strength and Intelligence" stat mapping**
   - Add missing explicit mapping for dual attribute modifiers like `+12 to Strength and Intelligence`
   - Prevent confusion with single attribute stats (`+25 to Strength`)
   - Ensures stat combination logic doesn't incorrectly convert dual attributes to pseudo single attributes

2. **Add missing Energy Shield Recharge stat**
   - Add support for `#% faster start of Energy Shield Recharge` stat (implicit and explicit)
   - Resolves "unsupported" error for Energy Shield Recharge modifiers found on armor items
   - Includes proper regex pattern matching and value extraction

**Technical Implementation:**
- Updated single attribute patterns to exclude dual attribute combinations
- Added comprehensive test coverage for both fixes
- Maintains backward compatibility with existing attribute stat combinations