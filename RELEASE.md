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

## GitHub Actions Workflow

The release process uses a multi-job GitHub Actions workflow with proper dependencies to ensure quality and reliability:

### Job Dependencies Flow

```
test → changeset → build → release
```

1. **test** - Runs tests to ensure code quality
2. **changeset** - Handles version management and release detection
3. **build** - Builds and verifies extension (only on release commits)
4. **release** - Creates tags and GitHub releases (only after successful build)

### Two-Phase Process

**Phase 1: Changeset PR Creation**
- Runs on pushes with changeset files
- Only `test` and `changeset` jobs run
- Creates "Release: Version Packages" PR with version bumps

**Phase 2: Actual Release**
- Runs when release PR is merged (detects "chore: release packages" commit)
- All jobs run: `test → changeset → build → release`
- Extension must build successfully before any tags or releases are created

## Release Process

### Automatic Release (Recommended)

1. **Push changes to main branch** with changesets
2. **GitHub Action automatically (Phase 1):**
   - Runs tests
   - Creates a "Release: Version Packages" PR
   - Updates package.json version
   - Updates CHANGELOG.md
   - Syncs version to manifest.json files

3. **Review and merge the release PR**
4. **GitHub Action then (Phase 2):**
   - Runs tests again
   - Builds and verifies the extension
   - Creates git tag (only after successful build)
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

## Build Verification

The workflow includes comprehensive build verification before any release:

### What Gets Verified
- **Tests pass** - All unit and integration tests must pass
- **Extension builds** - `npm run changeset:release` must complete successfully
- **Zip file created** - `poesearcher.zip` must be generated and valid
- **Artifact handling** - Build output is uploaded and downloaded between jobs

### Build Safety
- **No tags created on build failure** - Git tags are only created after successful build
- **No releases on build failure** - GitHub releases are only created after successful build
- **Build artifacts verified** - Extension zip file is validated before release creation

## Troubleshooting

### No Release PR Created
- Ensure you have committed changeset files to the main branch
- Check GitHub Actions logs for errors
- Verify changeset files are in `.changeset/` directory

### Build Failures
- Ensure all tests pass locally: `npm run typecheck`
- Check that the build succeeds: `npm run build`
- Verify no TypeScript errors: `npm run typecheck`
- Check GitHub Actions logs for detailed error messages

### Workflow Job Failures
- **Test job failure** - Check test logs, fix failing tests before proceeding
- **Changeset job failure** - Usually indicates changeset configuration issues
- **Build job failure** - Extension build failed, check build logs and fix before release
- **Release job failure** - Usually indicates GitHub permissions or tag conflicts

### Version Sync Issues
- The `scripts/sync-version.js` automatically syncs versions to manifest files
- This runs as part of the `changeset:version` script
- Ensure all manifest.json files have correct versions before merging release PR

### Job Dependencies Not Working
- Check that all previous jobs completed successfully
- Verify job outputs are correctly defined and referenced
- Ensure proper `needs` dependencies are set in workflow YAML

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