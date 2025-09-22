# PoE Searcher - Build Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+

### Development Workflow

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Development mode (with hot reload):**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Type checking only:**
   ```bash
   npm run typecheck
   ```

## 🔧 Build Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | **Full build with type checking** - Use this for production |
| `npm run build:watch` | Watch mode for continuous building |
| `npm run build:force` | Force rebuild (clears cache) |
| `npm run typecheck` | TypeScript type checking only |
| `npm run dev` | Development server with hot reload |

## 📁 Build Output

After running `npm run build`, you'll get:

```
dist/
├── manifest.json              # Chrome extension manifest
├── icons/                     # Extension icons (16, 32, 48, 128px)
├── assets/
│   ├── content-[hash].js      # Main content script
│   ├── statMappings-[hash].js # Stat mapping logic (~19KB)
│   ├── itemParser-[hash].js   # Item parsing (~2.6KB)
│   ├── automation-[hash].js   # DOM automation (~10KB)
│   ├── interface_clean-[hash].js # UI interface (~33KB)
│   └── *-loader-[hash].js     # Dynamic import loaders
└── .vite/                     # Vite metadata
```

## 🔄 Automatic Build Process

The build system includes several safety checks:

1. **Pre-build type checking** - Ensures no TypeScript errors
2. **Automatic module loading** - Content script waits for all modules
3. **Optimized bundling** - Minified JavaScript with source maps
4. **Chrome extension validation** - CRXJS plugin validates manifest

## 🛠️ Development Workflow

The npm scripts handle everything automatically:

```bash
npm run build
```

This will:
1. Run TypeScript type checking (via prebuild hook)
2. Build the extension if types pass
3. Show build output summary
4. Exit with error if anything fails

## 🧪 Loading the Extension

1. Build the extension: `npm run build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist/poesearcher/` folder
6. The extension should load and be ready to use on POE trade pages

## 🔍 Troubleshooting

### Build Fails
```bash
# Check TypeScript errors
npm run typecheck

# Force clean rebuild
npm run build:force
```

### Extension Not Loading
1. Check Chrome developer console for errors
2. Verify all files are in `dist/poesearcher/` folder
3. Check manifest.json is valid
4. Reload extension in Chrome extensions page

### Module Loading Issues
- Content script waits up to 5 seconds for modules to load
- Check browser console for "Missing required classes" errors
- Verify all assets are properly loaded in Network tab