---
"poesearcher": patch
---

Fix GitHub release zip file upload issue

- Add verification step to confirm zip file exists after build
- Clean up tags when deleting existing releases
- Use explicit file path and fail on missing files
- Ensure poesearcher.zip is properly attached to releases