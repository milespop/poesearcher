# poesearcher

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
