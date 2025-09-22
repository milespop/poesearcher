# poesearcher

## 0.2.2

### Patch Changes

- c76a6b6: Test improved GitHub workflow with version tags and releases

  - Verify PR title includes version number
  - Test git tag creation and push
  - Confirm GitHub release creation with zip file attachment
  - Validate changelog extraction in release notes

## 0.2.1

### Patch Changes

- 2beee83: Demo release to test GitHub workflow

  - Demonstrate Changeset CLI GitHub workflow
  - Test automated release creation
  - Verify GitHub release with packaged extension

## 0.2.0

### Minor Changes

- Add Changeset CLI for automated versioning and release management

  - Implemented automated semantic versioning with Changeset CLI
  - Added GitHub workflow for automated releases
  - Created release documentation and developer workflow
  - Set up automated changelog generation

- Implement comprehensive logging system

  - Added structured logging module for better debugging and monitoring
  - Enhanced error tracking and diagnostic capabilities
  - Improved development and troubleshooting experience
  - Added logging across search engine and interface modules

- Add minimize after search feature

  - Extension now minimizes browser window after performing a search
  - Improves user workflow by automatically reducing interface clutter
  - Enhances search experience for Path of Exile traders

- UI refactoring and local variations support

  - Refactored user interface components for better maintainability
  - Added support for local item variations in search functionality
  - Improved code organization and modularity
  - Enhanced search accuracy for Path of Exile item variations

## 0.1.0

### Minor Changes

- Initial creation of POE Searcher Chrome extension with comprehensive trade search functionality

  - Implemented item text parsing with 113+ stat filters
  - Added automated search form filling for Path of Exile trade website
  - Created Chrome extension with content script injection
  - Built comprehensive stat mappings for item properties, resistances, and modifiers
