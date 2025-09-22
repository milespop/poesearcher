# GitHub Actions Setup for Changeset Releases

## Required Repository Settings

To enable automated releases with Changeset CLI, you need to configure these GitHub repository settings:

### 1. Actions Permissions
**Settings** → **Actions** → **General**

- ✅ **Allow all actions and reusable workflows**
- ✅ **Workflow permissions**: Select **"Read and write permissions"**
- ✅ **Allow GitHub Actions to create and approve pull requests** (CRITICAL)

### 2. Branch Protection (Optional but Recommended)
**Settings** → **Branches** → **Add protection rule for `main`**

- ✅ **Require status checks to pass before merging**
  - Add: `Release` (your workflow name)
- ✅ **Require pull request reviews before merging**

## Troubleshooting Common Issues

### Error: "GitHub Actions is not permitted to create or approve pull requests"

**Solution**: Go to **Settings** → **Actions** → **General** and ensure:
1. **Workflow permissions** is set to **"Read and write permissions"**
2. **"Allow GitHub Actions to create and approve pull requests"** is **checked**

### Error: "Resource not accessible by integration"

This indicates insufficient permissions. Check:
1. Repository workflow permissions (above)
2. The workflow has `permissions:` block at the top level
3. The `GITHUB_TOKEN` is being used correctly

### Workflow Creates Branch but No PR

This usually means:
1. Pull request creation permissions are disabled
2. The repository has branch protection rules preventing automatic PR creation
3. There are no actual changes to release (no changesets)

## How the Workflow Works

1. **Push to main** with changeset files triggers the workflow
2. **Changeset Action** processes changesets and creates version updates
3. **Release PR** is created automatically with version bumps and changelog
4. **Merge the PR** to trigger the actual release and GitHub release creation

## Manual Workflow Trigger

If automatic triggers aren't working:
1. Go to **Actions** tab in your repository
2. Click **"Release"** workflow on the left
3. Click **"Run workflow"** button
4. Select branch and click **"Run workflow"**

## Expected Files in Release PR

When working correctly, the release PR should contain:
- Updated `package.json` with new version
- Updated `CHANGELOG.md` with new entries
- Removal of processed changeset files
- Updated manifest files (synced via `sync-version.js`)

## Testing the Setup

1. Create a test changeset: `npm run changeset`
2. Commit and push to main
3. Check Actions tab for workflow run
4. Look for new release PR in Pull Requests tab