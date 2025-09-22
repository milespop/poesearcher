---
"poesearcher": patch
---

Fix release workflow and improve installation experience

**Release Process Fixes:**
- Fixed GitHub Actions release workflow tag conflicts
- Properly handle automated release creation via changesets

**Packaging Improvements:**
- Fixed zip package structure to remove unnecessary dist folder nesting
- Extension files now appear directly at root level in downloaded zip
- Cleaner installation process for end users

**Documentation Updates:**
- Reorganized README with user installation instructions prioritized over development setup
- Added verification steps for proper folder structure after extraction
- Clear guidance on expected files: manifest.json, icons/, assets/
- Updated installation instructions to match new zip structure

These changes significantly improve the user onboarding experience and make installation more straightforward.