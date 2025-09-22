# POE Trade Automation Chrome Extension

A Chrome extension that automates item searching on the Path of Exile trade website by parsing item text and automatically filling in search filters.

## Features

- **Automatic Item Parsing**: Paste POE item text to automatically extract stats and modifiers
- **Smart Stat Mapping**: Maps 115+ item stats to their corresponding trade site filters
- **Mutation Type Support**: Handles explicit, desecrated, fractured, and rune modifiers
- **Value Scaling**: Scale down stat values (1-100%) for broader search results
- **Selective Filtering**: Choose which stats to include in your search with checkboxes
- **Colorblind Mode**: Alternative color scheme for better accessibility
- **Automatic Filter Selection**: Intelligently selects the correct filter variant from dropdowns

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/poesearcher.git
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `src/extension` directory
5. The extension icon will appear in your toolbar

## Usage

1. Navigate to the Path of Exile trade website
2. Click the extension icon in your toolbar
3. Paste your item text into the text area
4. Adjust the scale slider if needed (default 80%)
5. Uncheck any stats you don't want to search for
6. Click "Search Item" to automatically fill and submit the search

## Architecture

### Module Structure

```
src/extension/
├── manifest.json           # Extension configuration
├── content.js             # Main content script
└── modules/
    ├── statMappings.js    # Stat-to-filter mapping definitions
    ├── automation.js      # Trade site automation logic
    └── interface_clean.js # UI components and interactions
```

### Core Components

#### 1. Stat Mapping System (`statMappings.js`)
The heart of the extension - maps item stat text to trade site filter text.

**Mapping Structure:**
```javascript
'statText': {
    filterText: 'filter text for trade site',
    group: 'explicit|desecrated|fractured|pseudo',
    extractValue: (statText) => {
        // Extract numeric value from stat
    }
}
```

**Priority System:**
- Mappings are checked in insertion order (ES6+ guaranteed)
- More specific patterns are placed before generic ones
- Example: "increased Elemental Damage with Attacks" before "increased Elemental Damage"

#### 2. Filter Selection Algorithm (`automation.js`)
Handles the process of selecting the correct filter from dropdown options.

**The Algorithm:**
1. **Type filter text** into the stat filter input
2. **Wait for dropdown** to populate with options
3. **Identify mutation type** from the row's classes:
   - `mutate-type-explicit` → explicit group
   - `mutate-type-desecrated` → desecrated group
   - `mutate-type-fractured` → fractured group
4. **Filter options** by matching group
5. **Select best match**:
   - Exact text match with correct group
   - Fallback to explicit if specific group not found
   - Handle special cases (pseudo stats, "Adds # to #" uses MAX field)

**Why This Approach?**
The POE trade site uses Vue.js with dynamic dropdowns. Options have identical display text but different internal IDs based on mutation type. By filtering based on the row's mutation class, we ensure the correct variant is selected.

#### 3. User Interface (`interface_clean.js`)
Provides the extension's UI overlay on the trade site.

**Key Features:**
- **Scale Slider**: Reduces all stat values proportionally
  - Formula: `scaledValue = Math.floor(originalValue * scale / 100)`
  - Prevents values from going below 1

- **Stat Checkboxes**: Control which stats are included
  - Mapped stats: Enabled and checked by default
  - Unmapped stats: Disabled (shown in red/gray)

- **Color Coding**:
  - Green/Blue: Successfully mapped stats
  - Red/Gray: Unsupported stats
  - Adapts to colorblind mode automatically

## Technical Details

### Stat Parsing
Uses regex patterns to extract values from item stats:
- Simple values: `(\d+)` for single numbers
- Ranges: `(\d+) to (\d+)` for damage ranges
- Percentages: `(\d+)%` for percentage modifiers

### DOM Manipulation
Interacts with the trade site's Vue.js framework:
- Dispatches native events to trigger Vue reactivity
- Uses `MutationObserver` to wait for dynamic content
- Implements retry logic for async operations

### Storage
Uses Chrome's storage API for persistence:
- `scaleValue`: Current scale percentage
- `colorblindMode`: User's color preference

## Supported Stats

The extension currently supports 115+ stat mappings including:
- Elemental resistances and damage
- Physical and chaos damage
- Critical strike modifiers
- Skill gem levels (specific and general)
- Life, mana, and energy shield
- Attack and cast speed
- Desecrated and rune modifiers
- And many more...

## Development

### Adding New Stat Mappings

1. Open `modules/statMappings.js`
2. Add your mapping in priority order:
```javascript
'Your Stat Text': {
    filterText: 'Trade filter text',
    group: 'explicit', // or desecrated, fractured, pseudo
    extractValue: (statText) => {
        const match = statText.match(/your-regex-pattern/)
        return match ? parseInt(match[1]) : null
    }
}
```

### Testing
1. Load the extension in Chrome
2. Navigate to a POE trade site
3. Test with various item texts
4. Check console for debug output

### Debugging
- Enable verbose logging in `automation.js` by uncommenting console.log statements
- Use Chrome DevTools to inspect the extension's content scripts
- Check for stat mapping matches in the preview display

## Known Issues

- Some complex conditional modifiers may not be supported
- Certain unique item modifiers require manual selection
- Trade site updates may occasionally break filter selection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changes with appropriate stat mappings
4. Test thoroughly with various item types
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Path of Exile and the trade website are owned by Grinding Gear Games
- This extension is a third-party tool and not officially affiliated with GGG