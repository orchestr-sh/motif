#!/usr/bin/env node

/**
 * motif CLI — Build arbitrary value CSS
 *
 * Usage:
 *   npx motif build --content "src/**/*.html" --output motif.built.css
 *
 * Scans HTML files for arbitrary class patterns (p-[47px], md:w-[320px])
 * and generates corresponding CSS rules with escaped colons/brackets.
 */

const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');

// Utility to CSS property mapping
const PROPERTY_MAP = {
  'p':       'padding',
  'px':      'padding-inline',
  'py':      'padding-block',
  'pt':      'padding-top',
  'pb':      'padding-bottom',
  'pl':      'padding-left',
  'pr':      'padding-right',
  'm':       'margin',
  'mx':      'margin-inline',
  'my':      'margin-block',
  'mt':      'margin-top',
  'mb':      'margin-bottom',
  'ml':      'margin-left',
  'mr':      'margin-right',
  'w':       'width',
  'h':       'height',
  'gap':     'gap',
  'gap-x':   'column-gap',
  'gap-y':   'row-gap',
  'text':    'font-size',
  'rounded': 'border-radius',
  'z':       'z-index',
  'opacity': 'opacity',
  'top':     'top',
  'right':   'right',
  'bottom':  'bottom',
  'left':    'left',
  'max-w':   'max-width',
  'min-w':   'min-width',
  'max-h':   'max-height',
  'min-h':   'min-height',
};

// Breakpoint map
const BREAKPOINTS = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
};

/**
 * Escape CSS selector special characters
 */
function escapeCSSSelector(str) {
  return str.replace(/[[\]()%#.,\/: -]/g, match => {
    if (match === ' ' || match === '-') return match; // Don't escape spaces or hyphens in all positions
    return `\\${match}`;
  });
}

/**
 * Extract arbitrary classes from HTML content
 */
function extractArbitraryClasses(htmlContent) {
  const found = new Set();

  // Standard arbitrary: p-[47px], w-[100%], etc.
  const arbitraryRegex = /([\w-]+)-\[([^\]]+)\]/g;
  let match;
  while ((match = arbitraryRegex.exec(htmlContent)) !== null) {
    const [, prefix, value] = match;
    if (PROPERTY_MAP[prefix]) {
      found.add({
        type: 'standard',
        prefix,
        value,
        property: PROPERTY_MAP[prefix],
      });
    }
  }

  // Responsive arbitrary: md:p-[47px], sm:w-[50%], etc.
  const responsiveRegex = /(sm|md|lg|xl):([\w-]+)-\[([^\]]+)\]/g;
  while ((match = responsiveRegex.exec(htmlContent)) !== null) {
    const [, bp, prefix, value] = match;
    if (PROPERTY_MAP[prefix]) {
      found.add({
        type: 'responsive',
        breakpoint: bp,
        prefix,
        value,
        property: PROPERTY_MAP[prefix],
      });
    }
  }

  return found;
}

/**
 * Generate CSS rule from arbitrary class
 */
function generateCSSRule(classInfo) {
  const { type, prefix, value, property, breakpoint } = classInfo;

  const selector = `${breakpoint ? `${breakpoint}\\:` : ''}${prefix}\\[${escapeCSSSelector(value)}\\]`;
  const rule = `.${selector} { ${property}: ${value}; }`;

  if (type === 'responsive') {
    return `@media (min-width: ${BREAKPOINTS[breakpoint]}) {\n  ${rule}\n}`;
  }

  return rule;
}

/**
 * Read base CSS files (resolve @import chain)
 */
async function readBaseCSS(libraryPath) {
  const indexPath = path.join(libraryPath, 'index.css');
  const content = fs.readFileSync(indexPath, 'utf8');

  const resolvedCSS = [];
  const importRegex = /@import\s+['"]([^'"]+)['"]/g;
  let match;

  const processedFiles = new Set();

  function resolveImports(fileContent, basePath) {
    while ((match = importRegex.exec(fileContent)) !== null) {
      const importPath = match[1];
      const fullPath = path.join(basePath, importPath);
      const normalizedPath = path.normalize(fullPath);

      if (!processedFiles.has(normalizedPath)) {
        processedFiles.add(normalizedPath);
        if (fs.existsSync(normalizedPath)) {
          const importedContent = fs.readFileSync(normalizedPath, 'utf8');
          resolvedCSS.push(importedContent);
        }
      }
    }
  }

  resolveImports(content, path.dirname(indexPath));

  return resolvedCSS.join('\n\n');
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  let command = args[0];
  let contentPattern = null;
  let outputFile = null;

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--content' && args[i + 1]) {
      contentPattern = args[i + 1];
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      outputFile = args[i + 1];
      i++;
    }
  }

  if (command !== 'build') {
    console.error('Usage: motif build --content "src/**/*.html" --output motif.built.css');
    process.exit(1);
  }

  if (!contentPattern || !outputFile) {
    console.error('Error: --content and --output are required');
    process.exit(1);
  }

  try {
    console.log('📦 Building Motif CSS with arbitrary values...');

    // Find library root (where bin/motif.js is)
    const libraryPath = path.dirname(path.dirname(__filename));

    // Read base CSS
    console.log('📚 Reading base CSS...');
    const baseCSS = await readBaseCSS(libraryPath);

    // Find content files
    console.log(`🔍 Scanning for content files: ${contentPattern}`);
    const contentFiles = await glob(contentPattern);

    if (contentFiles.length === 0) {
      console.warn('⚠️  No content files found matching pattern');
    } else {
      console.log(`   Found ${contentFiles.length} file(s)`);
    }

    // Extract arbitrary classes
    const allArbitrary = new Set();
    for (const file of contentFiles) {
      const fileContent = fs.readFileSync(file, 'utf8');
      const arbitrary = extractArbitraryClasses(fileContent);
      arbitrary.forEach(cls => allArbitrary.add(JSON.stringify(cls)));
    }

    const arbitraryClasses = Array.from(allArbitrary).map(s => JSON.parse(s));
    console.log(`⚙️  Found ${arbitraryClasses.length} arbitrary class(es)`);

    // Generate CSS
    console.log('✨ Generating CSS rules...');
    const generatedRules = arbitraryClasses.map(generateCSSRule);

    // Combine base + generated
    const finalCSS = [
      baseCSS,
      '\n\n/* ─── Arbitrary values (generated by motif build) ─────────────────────── */\n',
      generatedRules.join('\n'),
    ].join('\n');

    // Write output
    fs.writeFileSync(outputFile, finalCSS);
    console.log(`✅ Built: ${outputFile}`);
    console.log(`📊 Base CSS + ${arbitraryClasses.length} arbitrary rule(s)`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
