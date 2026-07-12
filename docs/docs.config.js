/**
 * Docs Configuration
 * Project-specific settings for the documentation site.
 * This file stays in place when the docs/generator/ folder is upgraded.
 */
module.exports = {

  // Path to the design system framework CSS, relative from docs/site/
  designSystemPath: '../../assets/css/design-system.css',

  // Path to the brand theme CSS, relative from docs/site/
  // Set to null if using the framework defaults only
  brandCssPath: '../../assets/css/theme.css',

  // Google Fonts URL — set to null to disable
  // Fonts come from assets/css/theme.css under the neutral-engine contract
  googleFontsUrl: null,

  // Footer text
  footerText: '© 2025 By Default',

  // Index page description (shown on the docs homepage)
  indexDescription: 'Complete documentation for your project.',

};
