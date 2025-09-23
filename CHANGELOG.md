# poesearcher

## 0.9.0

### Minor Changes

- cdca693: Implement final 2 missing stats for complete coverage of Tables 9 and 19

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

- cdca693: Add support for Table 24: EQUIPPED ITEM BONUSES

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

## 0.8.0

### Minor Changes

- b45ec22: Add support for Energy Shield Local Modifiers

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

- b45ec22: Add support for Table 19: EXTRA DAMAGE CONVERSIONS (Attack-Specific)

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

- b45ec22: Add support for Table 20: MOVEMENT & UTILITY

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

- b45ec22: Add support for Table 21: EXPERIENCE, GOLD & RARITY

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

## 0.7.0

### Minor Changes

- 7a5def1: Add support for Table 18: SKILL-SPECIFIC MODIFIERS

  Implements comprehensive skill and weapon-specific modifier mappings for specialized builds:

  **Weapon-Specific Damage Modifiers:**

  - `#% increased Damage with Bow Skills` - Bow skill-based damage scaling
  - `#% increased Damage with Bows` - Bow weapon-based damage scaling
  - `#% increased Damage with Crossbows` - Crossbow weapon damage scaling
  - `#% increased Damage with Quarterstaves` - Quarterstaff weapon damage scaling
  - `#% increased Damage with Spears` - Spear weapon damage scaling
  - `#% increased Damage with Maces` - Mace weapon damage scaling

  **Skill Type Modifiers:**

  - `Herald Skills deal #% increased Damage` - Herald skill damage enhancement
  - `Meta Skills gain #% increased Energy` - Meta skill energy scaling

  **Effect Duration Modifiers:**

  - `#% increased Skill Effect Duration` - Generic skill duration extension
  - `#% increased Charm Effect Duration` - Charm-specific duration scaling

  This addresses a major gap in weapon and skill-specific build support, bringing skill-specific modifier coverage from ~10% to 100% coverage of all essential weapon and skill type modifiers. All 10 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive edge case testing.

  **Technical Implementation:**

  - Added comprehensive regex patterns that handle multiple spaces between words
  - Includes proper distinction between bow skills vs bow weapons for accurate filtering
  - Full test coverage with 30 test cases covering all scenarios, edge cases, and integration checks
  - Integration tested to ensure no conflicts with existing damage or weapon stats

  This fills a critical gap for weapon-specific and skill-focused builds, making the extension much more useful for players using specialized bow, crossbow, quarterstaff, spear, mace, herald, and meta skill builds in Path of Exile 2.

## 0.6.0

### Minor Changes

- 6a6bb9a: Add support for Table 13: LEECH & RECOVERY ADVANCED

  Implements comprehensive leech and recovery stat mappings for advanced recovery builds:

  **Leech Effectiveness:**

  - `#% increased amount of Life Leeched` - Core leech scaling mechanism
  - `#% increased amount of Mana Leeched` - Essential mana leech builds

  **Life/Mana on Kill:**

  - `Recover #% of maximum Life on Kill` - Percentage-based life recovery on kill
  - `Recover #% of maximum Mana on Kill (Jewel)` - Jewel-specific mana recovery with fallback support

  **Life on Hit:**

  - `Gain # Life per Enemy Hit with Attacks` - Attack-based life recovery
  - `Grants # Life per Enemy Hit` - Generic life on hit mechanics

  **Recoup Mechanics:**

  - `#% of Damage taken Recouped as Life` - Damage-to-life recoup system
  - `#% of Damage taken Recouped as Mana` - Damage-to-mana recoup system

  This addresses a major gap in recovery build support, bringing leech and recovery stat coverage from ~40% to 100% coverage of all essential recovery modifiers. All 8 new stat mappings include proper regex patterns with support for flexible whitespace handling and edge case testing.

  **Technical Implementation:**

  - Added comprehensive regex patterns that handle multiple spaces between words
  - Includes support for optional + prefix on values where applicable
  - Full test coverage with 21 test cases covering all scenarios and edge cases
  - Integration tested to ensure no conflicts with existing leech or recovery stats

  This fills a critical gap for recovery-focused builds, making the extension much more useful for players using advanced leech, on-kill recovery, life-on-hit, and recoup mechanics in Path of Exile 2.

- 6a6bb9a: Add support for Table 15: FLASK MODIFIERS

  Implements comprehensive flask modifier mappings for flask-focused builds:

  **Flask Charge Mechanics:**

  - `#% increased Flask Charges gained` - Essential flask charge efficiency
  - `#% reduced Flask Charges used` - Flask charge optimization

  **Flask Recovery Rates:**

  - `#% increased Flask Life Recovery rate` - Life flask speed enhancement
  - `#% increased Flask Mana Recovery rate` - Mana flask speed enhancement
  - `#% increased Recovery rate` - Generic recovery rate modifier

  **Flask Duration:**

  - `#% increased Flask Effect Duration` - Flask effect duration extension

  **Flask Passive Generation:**

  - `Life Flasks gain # charges per Second` - Passive life flask charge generation
  - `Mana Flasks gain # charges per Second` - Passive mana flask charge generation

  **Advanced Flask Mechanics:**

  - `Life Flasks used while on Low Life apply Recovery Instantly` - Emergency instant recovery
  - `Mana Flasks used while on Low Mana apply Recovery Instantly` - Emergency instant recovery
  - `#% more Recovery if used while on Low Life` - Conditional recovery enhancement

  This addresses a major gap in flask build support, bringing flask modifier coverage from 0% to 100% coverage of all essential flask modifiers. All 11 new stat mappings include proper regex patterns with support for flexible whitespace handling and comprehensive edge case testing.

  **Technical Implementation:**

  - Added comprehensive regex patterns that handle multiple spaces between words
  - Includes support for boolean stats (instant recovery) represented as value 1
  - Full test coverage with 28 test cases covering all scenarios and edge cases
  - Integration tested to ensure no conflicts with existing recovery or regeneration stats

  This fills a critical gap for flask-focused builds, making the extension much more useful for players using advanced flask mechanics, charge optimization, and recovery strategies in Path of Exile 2.

- 6a6bb9a: Add support for Table 17: TOTEM STATS

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

## 0.5.0

### Minor Changes

- 4403e30: Implement Table 14 (Energy Shield Advanced) and Table 16 (Status Effects & Ailments)

  **Major Feature Addition: Advanced Energy Shield & Status Effects Support**

  This release adds comprehensive support for advanced Energy Shield mechanics and status effect/ailment systems, significantly enhancing build compatibility for ES-based and ailment-focused builds.

  ## New Stat Categories

  ### Table 14: Energy Shield Advanced (4/4 stats - 100% coverage)

  - `#% increased Energy Shield Recharge Rate` - Control ES recovery speed
  - `#% of Damage taken bypasses Energy Shield` - ES bypass mechanics
  - `Gain additional Stun Threshold equal to #% of maximum Energy Shield` - ES-based stun defense
  - `Gain additional Ailment Threshold equal to #% of maximum Energy Shield` - ES-based ailment defense

  ### Table 16: Status Effects & Ailments (14/15 stats - 93% coverage)

  **Ailment Duration Reduction:**

  - `#% reduced Ignite Duration on you`
  - `#% reduced Chill Duration on you`
  - `#% reduced Shock duration on you`

  **Status Effect Buildup & Magnitude:**

  - `#% increased Freeze Buildup`
  - `#% increased Ignite Magnitude`
  - `#% increased Shock Duration`

  **Ailment Magnitude Modifiers:**

  - `#% increased Magnitude of Shock you inflict`
  - `#% increased Magnitude of Bleeding you inflict`
  - `#% increased Magnitude of Poison you inflict`
  - `#% increased Magnitude of Chill you inflict`
  - `#% increased Magnitude of Damaging Ailments you inflict with Critical Hits`

  **Ailment Application Chance:**

  - `#% chance to inflict Bleeding on Hit`
  - `#% chance to Poison on Hit`
  - `#% chance to Blind Enemies on Hit with Attacks`

  ## Technical Implementation

  - **Enhanced Pattern Matching**: Updated existing Energy Shield patterns to prevent conflicts with new specific patterns
  - **Comprehensive Test Coverage**: Added 29 new tests across 2 test files (`energyShieldAdvanced.test.ts`, `statusEffectsAilments.test.ts`)
  - **Robust Regex Patterns**: Handles various spacing and formatting variations in stat text
  - **Build Compatibility**: Full support for Energy Shield builds and ailment-based offensive strategies

### Patch Changes

- 4403e30: Fix stat mapping issues for attribute combinations and Energy Shield Recharge

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

## 0.4.1

### Patch Changes

- c515aa5: Improve GitHub Actions workflow dependencies

  - Split release workflow into separate jobs with proper dependencies
  - Ensure build verification happens before tag creation and release
  - Separate changeset PR creation from actual release process
  - Add proper job ordering: test → changeset → build → release

## 0.4.0

### Minor Changes

- 59338d0: Add intelligent stat combination for pseudo totals in search filters

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

- 3158960: Add support for Area of Effect stat modifiers

  - Add `#% increased Area of Effect` stat mapping for generic area of effect scaling
  - Add `#% increased Area of Effect for Attacks per 10 Intelligence` stat mapping for intelligence-scaling AoE
  - Add `#% increased Area of Effect of Curses` stat mapping for curse-specific area effects

- 3158960: Add support for Table 11: MINION STATS

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

- 3158960: Add support for Damage Additions scaling stat

  - Add `Adds # to # Lightning Damage to Attacks per 20 Intelligence` stat mapping

- 3158960: Add support for Critical Hit Modifiers

  - Add `#% increased Critical Spell Damage Bonus` stat mapping for spell-specific critical damage
  - Add `#% increased Critical Damage Bonus with Spears` stat mapping for weapon-specific critical damage

- 3158960: Add support Attack & Cast Speed modifiers

  - Add `#% increased Attack Speed per 10 Dexterity` and `per 20 Dexterity` scaling stats
  - Add weapon-specific attack speed modifiers:
    - `#% increased Attack Speed with Bows`
    - `#% increased Attack Speed with Crossbows`
    - `#% increased Attack Speed with Quarterstaves`
    - `#% increased Attack Speed with Spears`

- 3158960: Add support for Defense Stats hybrid modifiers

  - Add `#% increased Evasion and Energy Shield` stat mapping for hybrid defense
  - Add `#% increased Armour, Evasion and Energy Shield` stat mapping for triple hybrid defense
  - Add `#% increased Global Defences` stat mapping for global defense modifier
  - Add `#% increased Defences from Equipped Shield` stat mapping for shield-specific builds

- 3158960: Add support for Accuracy & Stun stat modifiers

  - Add `#% increased Accuracy Rating` stat mapping for generic accuracy scaling
  - Add `#% increased Accuracy Rating with Bows` stat mapping for bow-specific builds
  - Add `#% increased Stun Threshold` stat mapping for stun defense
  - Add `#% increased Stun Duration` stat mapping for offensive stunning
  - Add `#% increased Stun Buildup` stat mapping for generic stun mechanics
  - Add `#% increased Stun Buildup with Maces` stat mapping for mace-specific builds
  - Add `#% increased Stun Threshold if you haven't been Stunned Recently` stat mapping for conditional stun defense

- 3158960: Add support for Presence/Aura Effects stat modifiers

  - Add `#% increased Presence Area of Effect` stat mapping (USER REPORTED feature)
  - Add `Allies in your Presence deal #% increased Damage` stat mapping for core presence builds
  - Add `Allies in your Presence Regenerate # Life per second` stat mapping for presence healing
  - Add `Allies in your Presence have # to Accuracy Rating` stat mapping for presence accuracy
  - Add `Allies in your Presence have #% increased Attack Speed` stat mapping for presence speed
  - Add `Allies in your Presence have #% increased Cast Speed` stat mapping for presence speed
  - Add `Allies in your Presence have #% increased Critical Hit Chance` stat mapping for presence crit
  - Add `Allies in your Presence have #% increased Critical Damage Bonus` stat mapping for presence crit
  - Add `Allies in your Presence have #% to all Elemental Resistances` stat mapping for presence defense
  - Add `Allies in your Presence deal # to # added Attack Cold Damage` stat mapping for presence damage
  - Add `Allies in your Presence deal # to # added Attack Fire Damage` stat mapping for presence damage
  - Add `Allies in your Presence deal # to # added Attack Lightning Damage` stat mapping for presence damage
  - Add `Allies in your Presence deal # to # added Attack Physical Damage` stat mapping for presence damage
  - Add `Enemies in your Presence are Ignited as though dealt # Base Fire Damage` stat mapping for presence offense
  - Add `Enemies in your Presence have #% to Fire Resistance` stat mapping for presence debuff
  - Add `#% of your Base Life Regeneration is granted to Allies in your Presence` stat mapping for presence sharing
  - Add `Share Charges with Allies in your Presence` stat mapping for charge sharing

### Patch Changes

- ee8eb7b: Add support for missing damage modifier stats:

  - `#% increased Chaos Damage`
  - `#% increased Damage` (generic)
  - `#% increased Global Physical Damage`
  - `#% increased Spell Physical Damage`

## 0.3.5

### Patch Changes

- 399299c: Add support for maximum resistance stats:

  - `#% to Maximum Cold Resistance`
  - `#% to Maximum Fire Resistance`
  - `#% to Maximum Lightning Resistance`
  - `#% maximum Player Resistances`

## 0.3.4

### Patch Changes

- 83d6ae7: Add support for missing basic life/mana/energy shield stats:

  - `# to maximum Energy Shield` (explicit version)
  - `#% increased maximum Life`
  - `#% increased maximum Mana`
  - `#% increased maximum Energy Shield`
  - `#% increased Life Regeneration rate`
  - `#% of Damage is taken from Mana before Life`
  - `#% of Maximum Life Converted to Energy Shield`

## 0.3.3

### Patch Changes

- 6f4feb7: ADd some extra support of 'for Spells' selectors, and staff/quarterstaff category

## 0.3.2

### Patch Changes

- 2427c21: Release v0.3.2 with resolved tag conflicts

  **Release Process Fixes:**

  - Resolved GitHub Actions workflow tag conflicts for v0.3.1
  - Ensures clean release creation without version collisions

  This patch release resolves the tag conflict issues and ensures proper automated release deployment.

## 0.3.1

### Patch Changes

- 252ad34: Final packaging and documentation improvements release

  **Release Process Fixes:**

  - Resolved GitHub Actions release workflow tag conflicts
  - Clean automated release creation process

  **Packaging Improvements:**

  - Fixed zip package structure to remove unnecessary dist folder nesting
  - Extension files now appear directly at root level in downloaded zip
  - Significantly improved installation process for end users

  **Documentation Updates:**

  - Reorganized README with user installation instructions prioritized over development setup
  - Added verification steps for proper folder structure after extraction
  - Clear guidance on expected files: manifest.json, icons/, assets/
  - Updated installation instructions to match new zip structure

  **Previous Core Features:**

  - Checkbox state persistence across interface sessions
  - Scale value display fixes when expanding from FAB
  - Improved 'Adds # to #' stat filter accuracy

  This release provides a much smoother user onboarding experience with streamlined installation.

## 0.3.0

### Minor Changes

- 76738df: Add checkbox state persistence and scale display fixes

  **New Features:**

  - Checkbox states are now preserved when interface is minimized and reopened after search
  - Scale value display now appears correctly when expanding from FAB at non-100% scale
  - Fixed 'Adds # to #' stat filters to populate min column instead of max column

  **Improvements:**

  - Enhanced user experience with persistent checkbox selections
  - Improved scale value handling across interface sessions
  - Better stat filter accuracy for damage range modifiers

  This resolves user-reported issues with checkbox state handling and improves the overall user experience with persistent settings.

## 0.2.6

### Patch Changes

- 7b876b9: Fix GitHub release workflow zip file attachment

  Fixed workflow that was deleting git tags when removing existing releases, preventing zip file uploads. Now keeps tags and uses gh CLI for more reliable release creation with asset attachment.

## 0.2.5

### Patch Changes

- 4b61902: Fix GitHub release zip file upload issue

  - Add verification step to confirm zip file exists after build
  - Clean up tags when deleting existing releases
  - Use explicit file path and fail on missing files
  - Ensure poesearcher.zip is properly attached to releases

## 0.2.4

### Patch Changes

- 1ea0cda: Fix release workflow to properly attach extension zip file

  - Ensure poesearcher.zip is included in GitHub releases
  - Delete existing releases before recreation to avoid immutable errors
  - Improve release automation reliability
  - Test complete release pipeline with proper asset attachment

## 0.2.3

### Patch Changes

- 5d74c6d: Test complete GitHub release workflow with automatic tags

  - Verify automatic git tag creation after PR merge
  - Test GitHub release creation with zip attachment
  - Confirm release appears on GitHub releases page
  - Validate changelog extraction in release notes

## 0.2.2

### Patch Changes

- c9e19d4: Fix GitHub workflow PR title variable substitution

  - Remove literal $NEXT_VERSION from PR title
  - Add step to update PR title with actual version number
  - Use GitHub CLI to update PR title after version is determined

- c76a6b6: Test improved GitHub workflow with version tags and releases

  - Verify PR title includes version number
  - Test git tag creation and push
  - Confirm GitHub release creation with zip file attachment
  - Validate changelog extraction in release notes

## 0.2.1

### Patch Changes

- 2beee83: Demo release to test GitHub workflow

  - Demonstrate Changeset CLI GitHub workflow
  - Test automated release creation
  - Verify GitHub release with packaged extension

## 0.2.0

### Minor Changes

- Add Changeset CLI for automated versioning and release management

  - Implemented automated semantic versioning with Changeset CLI
  - Added GitHub workflow for automated releases
  - Created release documentation and developer workflow
  - Set up automated changelog generation

- Implement comprehensive logging system

  - Added structured logging module for better debugging and monitoring
  - Enhanced error tracking and diagnostic capabilities
  - Improved development and troubleshooting experience
  - Added logging across search engine and interface modules

- Add minimize after search feature

  - Extension now minimizes browser window after performing a search
  - Improves user workflow by automatically reducing interface clutter
  - Enhances search experience for Path of Exile traders

- UI refactoring and local variations support

  - Refactored user interface components for better maintainability
  - Added support for local item variations in search functionality
  - Improved code organization and modularity
  - Enhanced search accuracy for Path of Exile item variations

## 0.1.0

### Minor Changes

- Initial creation of POE Searcher Chrome extension with comprehensive trade search functionality

  - Implemented item text parsing with 85+ stat filters
  - Added automated search form filling for Path of Exile trade website
  - Created Chrome extension with content script injection
  - Built comprehensive stat mappings for item properties, resistances, and modifiers
