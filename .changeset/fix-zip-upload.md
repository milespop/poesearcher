---
"poesearcher": patch
---

Fix GitHub release workflow zip file attachment

Fixed workflow that was deleting git tags when removing existing releases, preventing zip file uploads. Now keeps tags and uses gh CLI for more reliable release creation with asset attachment.