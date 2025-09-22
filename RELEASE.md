# Release Process

This document outlines the release process for POE Searcher using Changeset CLI.

## Overview

POE Searcher uses [Changesets](https://github.com/changesets/changesets) to manage versioning and releases. This provides:

- Semantic versioning based on change descriptions
- Automated changelog generation
- GitHub releases with built extension packages
- Clear contribution workflow

## Developer Workflow

### Making Changes with Version Impact

When you make changes that should trigger a new release:

1. **Create a changeset** after making your changes:
   ```bash
   npm run changeset
   ```

2. **Follow the prompts:**
   - Select the type of change (major, minor, patch)
   - Write a clear description of what changed
   - This creates a file in `.changeset/` directory

3. **Commit both your changes and the changeset file:**
   ```bash
   git add .
   git commit -m "feat: add new search feature"
   ```

### Changeset Types

- **Patch** (0.0.X): Bug fixes, small improvements
- **Minor** (0.X.0): New features, backwards-compatible changes
- **Major** (X.0.0): Breaking changes

## Release Process

### Automatic Release (Recommended)

1. **Push changes to main branch** with changesets
2. **GitHub Action automatically:**
   - Creates a "Release: Version Packages" PR
   - Updates package.json version
   - Updates CHANGELOG.md
   - Syncs version to manifest.json files

3. **Review and merge the release PR**
4. **GitHub Action then:**
   - Builds the extension
   - Creates a GitHub release
   - Attaches the built `poesearcher.zip` file

### Manual Release (Alternative)

If you need to release manually:

```bash
# Update versions and changelog
npm run changeset:version

# Build and package
npm run changeset:release

# Create git tag and push
git add .
git commit -m "chore: release v$(node -p "require('./package.json').version")"
git tag "v$(node -p "require('./package.json').version")"
git push origin main --tags
```

## Available Scripts

- `npm run changeset` - Create a new changeset
- `npm run changeset:version` - Update versions and changelog
- `npm run changeset:release` - Build and package extension

## Files Involved

- `.changeset/` - Contains changeset files and configuration
- `CHANGELOG.md` - Auto-generated changelog
- `package.json` - Main version source
- `src/manifest.json` & `src/extension/manifest.json` - Synced via `scripts/sync-version.js`

## Troubleshooting

### No Release PR Created
- Ensure you have committed changeset files to the main branch
- Check GitHub Actions logs for errors

### Build Failures
- Ensure all tests pass locally: `npm run typecheck`
- Check that the build succeeds: `npm run build`

### Version Sync Issues
- The `scripts/sync-version.js` automatically syncs versions to manifest files
- This runs as part of the `changeset:version` script

## Example Changeset

When you run `npm run changeset`, you'll create a file like this:

```markdown
---
"poesearcher": patch
---

Fix search filter parsing for rare item types
```

This will:
- Bump the patch version (0.1.1 → 0.1.2)
- Add the description to the changelog
- Trigger a release when merged to main