#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configuration
const DOCS_DIR = path.join(__dirname, '..');  // ../ (docs/)
const OUTPUT_DIR = path.join(__dirname, '..', 'site');  // ../site/
const TEMPLATE_FILE = path.join(__dirname, 'template.html');
const ASSETS_SOURCE = path.join(__dirname, 'assets');

// Load project config (docs/docs.config.js) with fallback defaults
const configPath = path.join(DOCS_DIR, 'docs.config.js');
const userConfig = fs.existsSync(configPath) ? require(configPath) : {};
const PROJECT_CONFIG = {
  designSystemPath: userConfig.designSystemPath || '../../assets/css/design-system.css',
  brandCssPath: userConfig.brandCssPath || null,
  googleFontsUrl: userConfig.googleFontsUrl !== undefined ? userConfig.googleFontsUrl : null,
  footerText: userConfig.footerText || '',
  indexDescription: userConfig.indexDescription || 'Complete documentation for your project.',
};

// Build Brand CSS HTML snippet
const BRAND_CSS_HTML = PROJECT_CONFIG.brandCssPath
  ? `<link rel="stylesheet" href="${PROJECT_CONFIG.brandCssPath}">`
  : '';

// Build Google Fonts HTML snippet
const GOOGLE_FONTS_HTML = PROJECT_CONFIG.googleFontsUrl
  ? `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${PROJECT_CONFIG.googleFontsUrl}" rel="stylesheet">`
  : '';

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content.trim() };
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2];
  
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }
  
  return { frontmatter, content: markdownContent.trim() };
}

/**
 * Convert markdown to HTML using marked
 */
function markdownToHtml(markdown) {
  // Configure marked options
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert \n to <br>
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    langPrefix: 'language-', // Prefix for language classes (for Highlight.js)
  });

  let html = marked(markdown);
  
  // Add IDs to headings for anchor links
  html = html.replace(/<h([1-6])>([^<]+)<\/h[1-6]>/g, (match, level, text) => {
    const id = text.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
    
    return `<h${level} id="${id}">${text}</h${level}>`;
  });

  // Add target="_blank" and rel="noopener noreferrer" to external links
  html = html.replace(/<a\s+([^>]*?)href=["']([^"']+)["']([^>]*)>/gi, (match, before, href, after) => {
    // Check if link is external (starts with http:// or https://)
    if (href.startsWith('http://') || href.startsWith('https://')) {
      let newMatch = match;
      
      // Add target="_blank" if it doesn't exist
      if (!newMatch.includes('target=')) {
        newMatch = newMatch.replace(/>$/, ' target="_blank">');
      }
      
      // Add or update rel attribute
      if (newMatch.includes('rel=')) {
        newMatch = newMatch.replace(/rel=["']([^"']*)["']/i, (m, rel) => {
          // Check if noopener noreferrer already exists in rel
          if (!rel.includes('noopener') && !rel.includes('noreferrer')) {
            return `rel="${rel} noopener noreferrer"`;
          }
          return m;
        });
      } else {
        // Add new rel attribute
        newMatch = newMatch.replace(/>$/, ' rel="noopener noreferrer">');
      }
      
      return newMatch;
    }
    return match;
  });

  // Add copy buttons to code blocks
  html = html.replace(/<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g, (match, attributes, code) => {
    const codeId = 'code-' + Math.random().toString(36).substr(2, 9);
    
    return `
      <div class="code-block-wrapper">
        <button class="copy-code-btn" data-clipboard-target="#${codeId}" type="button" aria-label="Copy code">
          <span class="copy-text">Copy</span>
        </button>
        <pre><code id="${codeId}"${attributes}>${code}</code></pre>
      </div>
    `;
  });

  return html;
}

/**
 * Generate table of contents from HTML content
 */
function generateTableOfContents(html) {
  const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>.*?<\/h[1-6]>/g;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[0].replace(/<[^>]*>/g, '').trim();
    
    // Only include H1 and H2 headings in TOC
    if (level <= 2) {
      headings.push({ level, id, text });
    }
  }

  if (headings.length === 0) {
    return '<div class="toc-empty">No headings found</div>';
  }

  let toc = '<nav class="toc"><ul class="toc-list">';
  
  headings.forEach((heading) => {
    const { level, id, text } = heading;
    toc += `<li class="toc-item toc-level-${level}"><a href="#${id}" class="toc-link">${text}</a></li>`;
  });
  
  toc += '</ul></nav>';
  return toc;
}

/**
 * Generate navigation HTML
 */
// Section icons (BrandOS icon set) — shown beside section labels and as
// the icon-only strip when the sidebar is collapsed
const ICON_HOME = '<svg data-icon="home" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M6 17C6 18.1046 6.89543 19 8 19H16C17.1046 19 18 18.1046 18 17V10L13.2 6.4C12.4889 5.86667 11.5111 5.86667 10.8 6.4L6 10V17ZM4 21V9L12 3L20 9V21H4Z" fill="currentColor"/></svg>';
const SECTION_ICONS = {
  'Brand': '<svg data-icon="brand-book" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><g clip-path="url(#nav_icon_brand)"><path d="M18 6.99953V5.18605L7.45312 6.99953H18ZM3 18.4644L5.30273 19.9995H21V8.99953H5.7998L3 7.83351V18.4644ZM6.91211 5.06203L12 4.188V2.97121L6.91211 5.06203ZM23 6.99953V21.9995H4.69727L1 19.5347V5.32961L14 -0.0121918V3.84425L20 2.813V6.99953H23Z" fill="currentColor"/></g><defs><clipPath id="nav_icon_brand"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>',
  'Design System': '<svg data-icon="design-system" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M21 21H13V13H21V21ZM15 19H19V15H15V19Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.2998 7.34961L16.6504 13L11 7.34961L16.6504 1.7002L22.2998 7.34961ZM13.8496 7.375L16.6748 10.2002L19.5 7.375L16.6748 4.5498L13.8496 7.375Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 11H3V3H11V11ZM5 9H9V5H5V9Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 11C10.7614 11 13 13.2386 13 16C13 18.7614 10.7614 21 8 21C5.23858 21 3 18.7614 3 16C3 13.2386 5.23858 11 8 11ZM8 13C6.34315 13 5 14.3431 5 16C5 17.6569 6.34315 19 8 19C9.65685 19 11 17.6569 11 16C11 14.3431 9.65685 13 8 13Z" fill="currentColor"/></svg>',
  'Code': '<svg data-icon="code" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M6 17L1 12L6 7L7.4 8.4L4.87462 10.943C4.29375 11.528 4.29375 12.472 4.87462 13.057L7.4 15.6L6 17ZM10.45 20.3L8.55 19.7L13.55 3.7L15.45 4.3L10.45 20.3ZM18 17L16.6 15.6L19.1254 13.057C19.7062 12.472 19.7063 11.528 19.1254 10.943L16.6 8.4L18 7L23 12L18 17Z" fill="currentColor"/></svg>',
  'Content': '<svg data-icon="docs" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M2 21V3H22V21H2ZM4 17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V17ZM6 17H15V15H6V17ZM6 13H18V11H6V13ZM6 9H18V7H6V9Z" fill="currentColor"/></svg>',
  'Project': '<svg data-icon="folder" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M2 20V4H10L12 6H22V20H2ZM4 16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V10C20 8.89543 19.1046 8 18 8H11.175L9.175 6H6C4.89543 6 4 6.89543 4 8V16Z" fill="currentColor"/></svg>',
};

function generateNavigation(filesBySection, currentPage = null) {
  let navigation = '';

  // Add Home link (outside of sections)
  const isHomeActive = currentPage && currentPage.filename === 'index';
  const homeActiveClass = isHomeActive ? ' nav-link-active' : '';
  navigation += `
    <a href="index.html" class="nav-link nav-home${homeActiveClass}">
      <span class="svg-icn">${ICON_HOME}</span>
      <span>Home</span>
    </a>
  `;

  // Sort sections in custom order
  const sectionOrder = ['Brand', 'Design System', 'Code', 'Content', 'Project'];
  const sortedSections = Object.keys(filesBySection).sort((a, b) => {
    const indexA = sectionOrder.indexOf(a);
    const indexB = sectionOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
  
  for (const section of sortedSections) {
    const files = filesBySection[section];
    
    // Sort files by order, then by title
    files.sort((a, b) => {
      const orderA = a.frontmatter.order || 999;
      const orderB = b.frontmatter.order || 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
    
    // Only open the section that contains the active page
    const isActiveSection = currentPage && files.some(f => f.filename === currentPage.filename);
    const openAttr = isActiveSection ? ' open' : '';
    
    // Display "Pages" instead of section name
    const sectionLabel = section === 'overview' ? 'Pages' : section.charAt(0).toUpperCase() + section.slice(1);
    const sectionIcon = SECTION_ICONS[sectionLabel] || SECTION_ICONS['Content'];

    navigation += `<details class="nav-section"${openAttr}>
      <summary class="nav-section-toggle" title="${sectionLabel}">
        <span class="svg-icn">${sectionIcon}</span>
        <span>${sectionLabel}</span>
        <span class="nav-toggle-icon">
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.58943 3L1.28943 0.7L1.98943 0L4.98943 3L1.98943 6L1.28943 5.3L3.58943 3Z" fill="currentColor"/>
          </svg>
        </span>
      </summary>
      <ul class="nav-list">`;
    
    for (const file of files) {
      const isActive = currentPage && currentPage.filename === file.filename;
      const activeClass = isActive ? 'nav-link-active' : '';
      
      navigation += `
        <li><a href="${file.htmlPath}" class="nav-link ${activeClass}">${file.title}</a></li>
      `;
    }
    
    navigation += `
      </ul>
    </details>`;
  }
  
  return navigation;
}

/**
 * Generate index page HTML
 */
function generateIndexPage(template, navigation, filesBySection) {
  let cards = '';
  
  const sectionOrder = ['Brand', 'Design System', 'Code', 'Content', 'Project'];
  const sortedSections = Object.keys(filesBySection).sort((a, b) => {
    const indexA = sectionOrder.indexOf(a);
    const indexB = sectionOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
  
  for (const section of sortedSections) {
    const files = filesBySection[section];
    
    files.sort((a, b) => {
      const orderA = a.frontmatter.order || 999;
      const orderB = b.frontmatter.order || 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
    
    cards += `<div class="docs-section">
      <h2 class="eyebrow">${section}</h2>
      <div class="grid cols-3 gap-xl">`;
    
    for (const file of files) {
      cards += `
        <a href="${file.htmlPath}" class="docs-card">
          <h3 class="docs-card-title">${file.title}</h3>
          ${file.frontmatter.subtitle ? `<p class="docs-card-subtitle">${file.frontmatter.subtitle}</p>` : ''}
        </a>
      `;
    }
    
    cards += `
      </div>
    </div>`;
  }
  
  const indexContent = `
    <div class="docs-hero">
      <h1 class="docs-hero-title">Documentation</h1>
      <p class="docs-hero-description">${PROJECT_CONFIG.indexDescription}</p>
    </div>
    ${cards}
  `;

  return template
    .replace('{{PAGE_TITLE}}', 'Documentation')
    .replace('{{META_DESCRIPTION}}', PROJECT_CONFIG.indexDescription)
    .replace('{{PAGE_HEADER}}', '') // Index page doesn't need a header
    .replace('{{PAGE_CONTENT}}', indexContent)
    .replace('{{NAVIGATION}}', navigation)
    .replace('{{TOC_SECTION}}', '')
    .replace('{{INDEX_PATH}}', 'index.html')
    .replace('{{DESIGN_SYSTEM_PATH}}', PROJECT_CONFIG.designSystemPath)
    .replace('{{BRAND_CSS}}', BRAND_CSS_HTML)
    .replace('{{GOOGLE_FONTS}}', GOOGLE_FONTS_HTML)
    .replace('{{FOOTER_TEXT}}', PROJECT_CONFIG.footerText);
}

/**
 * Generate page HTML
 */
function generatePage(file, template, navigation) {
  const { frontmatter, content } = file;
  const htmlContent = markdownToHtml(content);
  const tableOfContents = generateTableOfContents(htmlContent);
  
  // Generate page header separately
  let pageHeader = '';
  if (frontmatter.title) {
    pageHeader = `<div class="page-header">
      <div class="container-m">
        <h1>${frontmatter.title}</h1>
        ${frontmatter.subtitle ? `<p class="page-subtitle">${frontmatter.subtitle}</p>` : ''}
        <a href="../${file.markdownPath}" class="button page-source-link" data-variant="faded" data-size="small" target="_blank" rel="noopener noreferrer">View as Markdown</a>
      </div>
    </div>`;
  }
  
  return template
    .replace('{{PAGE_TITLE}}', frontmatter.title || 'Untitled')
    .replace('{{META_DESCRIPTION}}', frontmatter.description || '')
    .replace('{{PAGE_HEADER}}', pageHeader)
    .replace('{{PAGE_CONTENT}}', htmlContent)
    .replace('{{NAVIGATION}}', navigation)
    .replace('{{TOC_SECTION}}', `<aside class="docs-toc">
      <span class="toc-header">On this page</span>
      <div class="toc-wrapper">${tableOfContents}</div>
    </aside>`)
    .replace('{{INDEX_PATH}}', 'index.html')
    .replace('{{DESIGN_SYSTEM_PATH}}', PROJECT_CONFIG.designSystemPath)
    .replace('{{BRAND_CSS}}', BRAND_CSS_HTML)
    .replace('{{GOOGLE_FONTS}}', GOOGLE_FONTS_HTML)
    .replace('{{FOOTER_TEXT}}', PROJECT_CONFIG.footerText);
}

/**
 * Copy assets to output directory
 */
function copyAssets() {
  const assetsDest = path.join(OUTPUT_DIR, 'assets');
  
  if (fs.existsSync(ASSETS_SOURCE)) {
    // Create assets directory if it doesn't exist
    if (!fs.existsSync(assetsDest)) {
      fs.mkdirSync(assetsDest, { recursive: true });
    }
    
    // Copy all files from assets to output
    const files = fs.readdirSync(ASSETS_SOURCE);
    files.forEach(file => {
      const sourcePath = path.join(ASSETS_SOURCE, file);
      const destPath = path.join(assetsDest, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
    
    console.log('✅ Assets copied');
  }
}

/**
 * Main generation function
 */
async function generateDocs() {
  console.log('🚀 Starting documentation generation...');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Load template
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  console.log('✅ Template loaded');
  
  // Find all markdown files (exclude generator folder and README files)
  const markdownFiles = fs.readdirSync(DOCS_DIR)
    .filter(file => {
      const filePath = path.join(DOCS_DIR, file);
      // Skip directories and non-markdown files
      if (!fs.statSync(filePath).isFile() || !file.endsWith('.md')) {
        return false;
      }
      // Skip README files
      if (file.startsWith('README')) {
        return false;
      }
      return true;
    });
  
  console.log(`📁 Found ${markdownFiles.length} markdown files`);
  
  // Parse files and organize by section
  const filesBySection = {};
  const allFiles = [];
  
  for (const filename of markdownFiles) {
    const filePath = path.join(DOCS_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content: markdownContent } = parseFrontmatter(content);
    
    const title = frontmatter.title || filename.replace('.md', '');
    const section = frontmatter.section || 'uncategorized';
    const htmlPath = filename.replace('.md', '.html');
    const markdownPath = filename;
    
    const file = {
      filename,
      title,
      section,
      htmlPath,
      markdownPath,
      frontmatter,
      content: markdownContent
    };
    
    if (!filesBySection[section]) {
      filesBySection[section] = [];
    }
    filesBySection[section].push(file);
    allFiles.push(file);
  }
  
  console.log(`📂 Found sections: ${Object.keys(filesBySection).join(', ')}`);
  
  // Copy engine assets (docs.css, markdown.css) to output directory
  copyAssets();
  
  // Generate index.html
  const indexPage = { filename: 'index' };
  const navigation = generateNavigation(filesBySection, indexPage);
  const indexContent = generateIndexPage(template, navigation, filesBySection);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexContent);
  console.log('📄 Generated: index.html');
  
  // Generate HTML for each file
  for (const file of allFiles) {
    const navigation = generateNavigation(filesBySection, file);
    const pageContent = generatePage(file, template, navigation);
    const outputPath = path.join(OUTPUT_DIR, file.htmlPath);
    
    fs.writeFileSync(outputPath, pageContent);
    console.log(`📄 Generated: ${file.htmlPath}`);
  }
  
  console.log('✅ Documentation generation complete!');
  console.log(`📊 Generated ${allFiles.length + 1} HTML pages`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
}

// Run the generator
generateDocs().catch(console.error);

