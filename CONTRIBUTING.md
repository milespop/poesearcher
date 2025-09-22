# Contributing to POE Searcher

Thank you for your interest in contributing to POE Searcher! This document provides guidelines for contributing to the project.

## ⚠️ Important: Fork Required

**You must fork this repository to contribute.** Direct branch creation is disabled for non-maintainers. All contributions must come through pull requests from forks.

## Development Setup

1. **Fork the repository**
   - Click the "Fork" button on the GitHub repository page
   - This creates your own copy of the repository

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/poesearcher.git
   cd poesearcher
   ```

3. **Add upstream remote** (to sync with main repository)
   ```bash
   git remote add upstream https://github.com/milespop/poesearcher.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Making Changes

### 1. Sync with Upstream (recommended before starting)
```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 2. Create a Feature Branch (in your fork)
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow existing code style and patterns
- Add type annotations for TypeScript
- Test your changes with actual POE items

### 4. Test Your Changes
```bash
npm run typecheck  # Check types
npm run build      # Build extension
npm run package    # Create zip file
```

### 5. Create a Changeset
Describe your changes for the changelog:
```bash
npm run changeset
```

Select the appropriate change type:
- **patch**: Bug fixes, small improvements
- **minor**: New features, backwards-compatible changes
- **major**: Breaking changes

### 6. Commit and Push to Your Fork
```bash
git add .
git commit -m "feat: your descriptive commit message"
git push origin feature/your-feature-name
```

### 7. Create Pull Request
- Go to the main repository on GitHub
- Click "New Pull Request"
- Select your fork and branch as the source
- Use the pull request template
- Include screenshots if UI changes
- Reference any related issues

**Note:** Pull requests from forks are the only way to contribute. Direct pushes to the main repository are restricted.

## Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Keep functions focused and single-purpose

## Testing

While we don't have automated tests yet, please manually test:
- Extension loads without console errors
- Item parsing works with various POE items
- Search engine functions correctly
- UI responds appropriately

## Reporting Issues

Use the issue templates to report:
- **Bug reports**: Include extension version, browser, and item text
- **Feature requests**: Describe use case and benefits

## Release Process

Releases are automated via Changeset CLI:
1. Changes with changesets are merged to main
2. GitHub Action creates release PR
3. Merging release PR creates GitHub release
4. Built extension is attached to release

## Questions?

Feel free to open a discussion or issue if you have questions about contributing!