---
"poesearcher": patch
---

Fix release workflow to properly attach extension zip file

- Ensure poesearcher.zip is included in GitHub releases
- Delete existing releases before recreation to avoid immutable errors
- Improve release automation reliability
- Test complete release pipeline with proper asset attachment