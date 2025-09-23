# Release Process

This document outlines the release process for POE Searcher using Changeset CLI.

## Overview

POE Searcher uses [Changesets](https://github.com/changesets/changesets) to manage versioning and releases. This provides:

- Semantic versioning based on change descriptions
- Automated changelog generation
- GitHub releases with built extension packages
- Clear contribution workflow

## For Contributors

### Contributing Changes

When you want to contribute changes that should trigger a new release:

1. **Make your changes** in a feature branch
2. **Create a changeset** to describe your changes:
   ```bash
   npm run changeset
   ```
3. **Follow the prompts:**
   - Select the type of change (major, minor, patch)
   - Write a clear description of what changed
   - This creates a file in `.changeset/` directory

4. **Commit both your changes and the changeset file:**
   ```bash
   git add .
   git commit -m "feat: add new search feature"
   ```

5. **Create a Pull Request** to the `main` branch
   - CI will automatically run tests, typecheck, and build verification
   - Your changeset will be included when the PR is merged

### Changeset Types

- **Patch** (0.0.X): Bug fixes, small improvements
- **Minor** (0.X.0): New features, backwards-compatible changes
- **Major** (X.0.0): Breaking changes

## Automated Release Workflow

### CI Pipeline (Every PR and Push)

The CI workflow runs on all pull requests and pushes to main:
- **Tests** - Runs `npm test` to ensure code quality
- **TypeScript** - Runs `npm run typecheck` to catch type errors
- **Build** - Builds and packages the extension with `npm run package`
- **Verification** - Ensures `poesearcher.zip` is created successfully

### Release Pipeline (Main Branch Only)

When changes are pushed to main with changesets:

**Phase 1: Release PR Creation**
- Detects changeset files in the push
- Creates a "Release: v[VERSION]" pull request
- Updates `package.json` version
- Updates `CHANGELOG.md` with changeset descriptions
- Syncs version to `manifest.json` files

**Phase 2: Actual Release** (when release PR is merged)
- Builds and packages the extension
- Creates a git tag (e.g., `v0.9.2`)
- Creates a GitHub release with:
  - Changelog entries from the version
  - Installation instructions
  - The `poesearcher.zip` file as a downloadable asset

## Release Process

### Automatic Release (Standard Process)

1. **Contributors create PRs** with changesets
2. **Maintainer merges PRs** to main branch
3. **GitHub automatically:**
   - Creates "Release: v[VERSION]" PR
   - Updates versions and changelog

4. **Maintainer merges release PR**
5. **GitHub automatically:**
   - Builds the extension
   - Creates git tag
   - Creates GitHub release with zip file

### Manual Release (Emergency Only)

If automated release fails, you can release manually:

```bash
# Update versions and changelog
npm run changeset:version

# Build and package
npm run changeset:release

# Create git tag and push
git add .
git commit -m "chore: release packages"
git tag "v$(node -p "require('./package.json').version")"
git push origin main --tags
```

## Available Scripts

- `npm run changeset` - Create a new changeset
- `npm run changeset:version` - Update versions and changelog
- `npm run changeset:release` - Build and package extension
- `npm test` - Run all tests
- `npm run typecheck` - Run TypeScript type checking
- `npm run build` - Build the extension
- `npm run package` - Build and create zip package

## Files Involved

- `.changeset/` - Contains changeset files and configuration
- `CHANGELOG.md` - Auto-generated changelog
- `package.json` - Main version source
- `src/manifest.json` & `src/extension/manifest.json` - Synced via `scripts/sync-version.js`

## Quality Assurance

The workflow includes comprehensive quality checks:

### CI Checks (Every PR)
- **Tests** - All unit and integration tests must pass
- **TypeScript** - Type checking with `npm run typecheck`
- **Build** - Extension must build successfully
- **Package** - `poesearcher.zip` must be created and valid

### Release Safety
- **No tags without successful builds** - Git tags only created after successful build
- **No releases without successful builds** - GitHub releases only created after verification
- **Artifact validation** - Extension zip file validated before release

## Troubleshooting

### For Contributors

**PR Build Failures:**
- Run `npm test` locally before pushing
- Run `npm run typecheck` to catch TypeScript errors
- Run `npm run build` to ensure extension builds
- Check GitHub Actions tab for detailed error logs

**Changeset Issues:**
- Ensure changeset file is committed: `git add .changeset/`
- Changeset files should be small markdown files describing your changes
- Use `npm run changeset` to create them correctly

### For Maintainers

**No Release PR Created:**
- Ensure PRs with changesets were merged to main
- Check `.changeset/` directory has changeset files
- Look at GitHub Actions logs in the "Release" workflow

**Release Failures:**
- Check build logs in the release workflow
- Verify all dependencies install correctly
- Ensure `poesearcher.zip` is created in the build step

**Version Sync Issues:**
- The `scripts/sync-version.js` syncs versions to manifest files
- This runs automatically during `changeset:version`
- Check that all manifest.json files have matching versions

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