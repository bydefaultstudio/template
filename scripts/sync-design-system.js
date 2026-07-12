// Copies the design system CSS from the installed npm package into
// assets/css, where index.html and docs/docs.config.js expect it.
// Runs automatically on npm install via the postinstall hook.
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules',
  '@bydefaultstudio', 'design-system', 'dist', 'design-system.css');
const dest = path.join(__dirname, '..', 'assets', 'css', 'design-system.css');

if (!fs.existsSync(src)) {
  console.error('Design system package not found. Run npm install first.');
  process.exit(1);
}
fs.copyFileSync(src, dest);
console.log('Design system CSS synced from @bydefaultstudio/design-system.');
