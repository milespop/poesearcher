# poesearcher

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
