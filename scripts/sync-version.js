#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read package.json version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

console.log(`Syncing version ${version} to manifest files...`);

// Update src/manifest.json
const srcManifestPath = path.join(__dirname, '..', 'src', 'manifest.json');
const srcManifest = JSON.parse(fs.readFileSync(srcManifestPath, 'utf8'));
srcManifest.version = version;
fs.writeFileSync(srcManifestPath, JSON.stringify(srcManifest, null, 2) + '\n');
console.log(`✓ Updated src/manifest.json to version ${version}`);

// Update src/extension/manifest.json
const extManifestPath = path.join(__dirname, '..', 'src', 'extension', 'manifest.json');
const extManifest = JSON.parse(fs.readFileSync(extManifestPath, 'utf8'));
extManifest.version = version;
fs.writeFileSync(extManifestPath, JSON.stringify(extManifest, null, 2) + '\n');
console.log(`✓ Updated src/extension/manifest.json to version ${version}`);

console.log('Version sync complete!');