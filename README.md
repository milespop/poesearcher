# PoE2 Searcher Chrome Extension

A modern TypeScript Chrome extension that automates item searching on the Path of Exile 2 trade website by parsing item text and automatically filling in search filters.

## Features

- **Automatic Item Parsing**: Paste POE2 item text to automatically extract stats and modifiers
- **Smart Stat Mapping**: Maps 115+ item stats to their corresponding trade site filters
- **Mutation Type Support**: Handles explicit, implicit, desecrated, fractured, and pseudo modifiers
- **Value Scaling**: Scale down stat values (1-100%) for broader search results
- **Selective Filtering**: Choose which stats to include in your search with checkboxes
- **Speed Profiles**: Choose between Safe (recommended) and Lightning (extreme speed) automation
- **Colorblind Mode**: Modern toggle switch with alternative color scheme for better accessibility
- **Modern UI**: Clean Material Design interface with custom search icon
- **Automatic Filter Selection**: Intelligently selects the correct filter variant from dropdowns

## Installation

### For Development

1. Clone the repository:
```bash
git clone https://github.com/milespop/poesearcher.git
cd poesearcher
```

2. Install dependencies and build:
```bash
npm install
npm run build
```

3. Load in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist/poesearcher/` directory
   - The extension icon will appear in your toolbar

### For Users

The extension will be available on the Chrome Web Store (coming soon).

## Usage

1. Navigate to the Path of Exile 2 trade website (`https://www.pathofexile.com/trade2/search/poe2/*`)
2. The extension automatically loads - look for the floating search button with magnifying glass overlay
3. Click the search button to expand the interface
4. Paste your POE2 item text into the text area
5. Adjust settings via the gear icon:
   - **Speed Profile**: Choose between Safe (recommended) or Lightning (extreme speed)
   - **Colorblind Mode**: Toggle alternative colors for better accessibility
6. Adjust the scale slider if needed (default 100%)
7. Uncheck any stats you don't want to search for using the checkboxes
8. Click "Search Item" to automatically fill and submit the search

## Architecture

### Technology Stack

- **TypeScript**: Fully typed codebase with strict type checking
- **Vite**: Modern build system with hot reload and optimization
- **Chrome Extension Manifest V3**: Latest extension platform
- **CRXJS Plugin**: Seamless Chrome extension development with Vite

### Project Structure

```
src/
├── manifest.json          # Extension configuration (Manifest V3)
├── content.ts            # Main content script entry point
├── modules/              # Core TypeScript modules
│   ├── statMappings.ts   # Stat-to-filter mapping definitions
│   ├── itemParser.ts     # Item text parsing and validation
│   ├── automation.ts     # Trade site automation with configurable delays
│   └── interface_clean.ts # Modern UI components and interactions
├── icons/                # Custom search icons
└── public/               # Static assets (copied to dist/)
    └── icons/            # Extension icons (16, 32, 48, 128px)

dist/poesearcher/         # Built extension (load this in Chrome)
├── manifest.json         # Generated manifest
├── assets/              # Compiled and optimized modules
└── icons/               # Extension and custom icons
```

### Core Components

#### 1. Item Parser (`itemParser.ts`)
Robust TypeScript item parsing with full type safety and validation.

**Features:**
- Comprehensive item validation with detailed error reporting
- Support for all POE2 item types and rarities
- Separation of explicit, implicit, and description stats
- Type-safe interfaces for all parsed data

#### 2. Stat Mapping System (`statMappings.ts`)
The heart of the extension - maps item stat text to trade site filter text with full TypeScript typing.

**Mapping Structure:**
```typescript
export interface StatMapping {
  filterText: string;
  group: 'explicit' | 'implicit' | 'pseudo' | 'fractured' | 'desecrated';
  extractValue: (statText: string) => number | null;
}

const STAT_MAPPINGS: Record<string, StatMapping> = {
  'statText': {
    filterText: 'filter text for trade site',
    group: 'explicit',
    extractValue: (statText: string) => {
      // Extract numeric value with proper typing
    }
  }
}
```

**Priority System:**
- Mappings are checked in insertion order (ES6+ guaranteed)
- More specific patterns are placed before generic ones
- Example: "increased Elemental Damage with Attacks" before "increased Elemental Damage"

#### 3. Automation Engine (`automation.ts`)
Advanced TypeScript automation system with configurable performance profiles.

**Speed Profiles:**
```typescript
const DELAY_PROFILES = {
  safe: {      // Recommended - reliable with good performance
    clearForm: 50,
    setItemType: 30,
    findFilter: 50,
    setFilterValue: 100,
    // ... other timings
  },
  lightning: { // Extreme speed - 1ms delays throughout
    clearForm: 1,
    setItemType: 1,
    findFilter: 1,
    setFilterValue: 1,
    // ... all operations at 1ms
  }
}
```

**The Algorithm:**
1. **Clear existing search** with configurable delays
2. **Set item category** based on parsed item class
3. **Expand filter sections** as needed
4. **Type filter text** into stat filter inputs
5. **Wait for dropdowns** to populate with options
6. **Identify mutation type** from the row's classes:
   - `mutate-type-explicit` → explicit group
   - `mutate-type-desecrated` → desecrated group
   - `mutate-type-fractured` → fractured group
7. **Filter options** by matching group
8. **Select best match** and input values
9. **Execute search** automatically

**Why This Approach?**
The POE trade site uses Vue.js with dynamic dropdowns. Options have identical display text but different internal IDs based on mutation type. By filtering based on the row's mutation class, we ensure the correct variant is selected.

#### 4. Modern UI Interface (`interface_clean.ts`)
Material Design-inspired interface with full TypeScript typing and modern UX patterns.

**Key Features:**
- **Custom Search Icon**: Floating action button with custom search icon and magnifying glass overlay
- **Modern Settings Panel**: Toggle switches and dropdowns with consistent styling
- **Speed Profile Selection**: Real-time switching between automation speeds
- **Scale Slider**: Reduces all stat values proportionally
  - Formula: `scaledValue = Math.floor(originalValue * scale / 100)`
  - Prevents values from going below 1

- **Smart Stat Checkboxes**: Advanced checkbox system with "All" toggle
  - Mapped stats: Enabled and checked by default
  - Unmapped stats: Disabled (shown in colorblind-aware colors)
  - Bulk selection with indeterminate state handling

- **Adaptive Color System**:
  - Normal mode: Green for mapped, red for unmapped stats
  - Colorblind mode: Blue for mapped, dark gray for unmapped stats
  - Modern toggle switch for accessibility settings

**Settings Management:**
- Chrome storage integration for persistent preferences
- Real-time setting updates without extension reload
- Type-safe storage interfaces

## Development

### Build System

The project uses a modern TypeScript build system:

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Type checking only
npm run typecheck

# Force rebuild (clears cache)
npm run build:force
```

**Build Process:**
1. Clean dist folder (via rimraf)
2. TypeScript type checking (via prebuild hook)
3. Vite bundling with CRXJS plugin
4. Chrome extension optimization
5. Asset optimization and hashing

Output: `dist/poesearcher/` - ready for Chrome extension loading

### Technical Details

**Stat Parsing:**
- TypeScript interfaces for all parsed data
- Regex patterns with proper typing
- Comprehensive validation and error handling

**DOM Manipulation:**
- Interacts with the trade site's Vue.js framework
- Dispatches native events to trigger Vue reactivity
- Module loading system with retry logic
- Type-safe DOM element selection

**Storage System:**
```typescript
interface StorageResult {
  colorblindMode?: boolean;
  lastItem?: string;
  scaleValue?: string;
  delayProfile?: 'safe' | 'lightning';
}
```

**Module Loading:**
- Dynamic import system for performance
- Loader files for each major module
- Wait mechanism ensures all modules load before execution

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

### Adding New Stat Mappings

1. Open `src/modules/statMappings.ts`
2. Add your mapping in priority order:
```typescript
'Your Stat Text': {
    filterText: 'Trade filter text',
    group: 'explicit', // or implicit, desecrated, fractured, pseudo
    extractValue: (statText: string): number | null => {
        const match = statText.match(/your-regex-pattern/);
        return match ? parseInt(match[1]) : null;
    }
}
```

3. Build and test:
```bash
npm run build
```

### Testing
1. Build the extension: `npm run build`
2. Load the `dist/poesearcher/` folder in Chrome extensions
3. Navigate to POE2 trade site
4. Test with various item texts
5. Check console for debug output and TypeScript errors

### Debugging
- All modules include comprehensive logging
- Use Chrome DevTools to inspect TypeScript compilation
- Check for stat mapping matches in the preview display
- Monitor speed profile performance in console
- Use `npm run typecheck` for type validation

## Known Issues

- Some complex conditional modifiers may not be supported
- Certain unique item modifiers require manual selection
- Trade site updates may occasionally break filter selection
- Lightning speed profile may be too fast for slower systems

## Performance

**Speed Profile Comparison:**
- **Safe (Recommended)**: 20-100ms delays, ~2-3 seconds total search time
- **Lightning**: 1ms delays, ~0.5-1 second total search time

**Optimization Features:**
- Module lazy loading for faster initial load
- Efficient DOM queries with proper typing
- Chrome storage caching for settings
- Optimized bundle splitting via Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Set up development environment:
   ```bash
   npm install
   npm run dev  # for development with hot reload
   ```
4. Add your changes with appropriate TypeScript typing
5. Test thoroughly with various item types
6. Ensure type checking passes: `npm run typecheck`
7. Submit a pull request

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Path of Exile 2 and the trade website are owned by Grinding Gear Games
- This extension is a third-party tool and not officially affiliated with GGG
- Built with modern web technologies: TypeScript, Vite, and CRXJS