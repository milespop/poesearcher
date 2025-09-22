---
"poesearcher": patch
---

Final packaging and documentation improvements release

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