---
"poesearcher": patch
---

Improve GitHub Actions workflow dependencies

- Split release workflow into separate jobs with proper dependencies
- Ensure build verification happens before tag creation and release
- Separate changeset PR creation from actual release process
- Add proper job ordering: test → changeset → build → release