---
"poesearcher": patch
---

Fix GitHub workflow PR title variable substitution

- Remove literal $NEXT_VERSION from PR title
- Add step to update PR title with actual version number
- Use GitHub CLI to update PR title after version is determined