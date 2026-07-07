const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Extract target URL from CLI arguments
const targetUrl = process.argv[2];
if (!targetUrl) {
  console.error('Error: Please provide a target URL.');
  console.log('Usage: node skills/web-reverse-engineer/scripts/scrape_site_assets.js <url>');
  process.exit(1);
}

// Validate URL format
try {
  new URL(targetUrl);
} catch (e) {
  console.error(`Error: Invalid URL "${targetUrl}". Please include protocol (e.g., https://).`);
  process.exit(1);
}

(async () => {
  console.log(`Starting clean-room deconstruction audit for: ${targetUrl}`);
  console.log('Launching headless Chromium via Playwright...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // Storage for categorized network requests
  const assets = {
    scripts: [],
    stylesheets: [],
    images: [],
    fonts: [],
    media: [],
    fetchXhr: [],
    other: []
  };

  // Track network requests and group them by type
  page.on('request', request => {
    const url = request.url();
    const type = request.resourceType();
    const method = request.method();
    
    // We only record metadata of the requests, never downloading asset contents
    const assetMeta = { url, method };

    if (type === 'script') {
      assets.scripts.push(assetMeta);
    } else if (type === 'stylesheet') {
      assets.stylesheets.push(assetMeta);
    } else if (type === 'image') {
      assets.images.push(assetMeta);
    } else if (type === 'font') {
      assets.fonts.push(assetMeta);
    } else if (type === 'media') {
      assets.media.push(assetMeta);
    } else if (type === 'fetch' || type === 'xhr') {
      assets.fetchXhr.push(assetMeta);
    } else {
      assets.other.push(assetMeta);
    }
  });

  try {
    console.log(`Navigating to ${targetUrl} (waiting for network idle)...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 35000 });
    
    // Additional wait for client-side animations and canvas setups to run
    await page.waitForTimeout(3000);
    console.log('Page loaded. Analyzing runtime elements...');

    // Run DOM audit in page context
    const auditResults = await page.evaluate(() => {
      // 1. Inspect Canvases (Best-Effort detection)
      const canvases = Array.from(document.querySelectorAll('canvas'));
      const canvasDetails = canvases.map((canvas, index) => {
        let contextType = 'unknown';
        try {
          // Attempt best-effort context detection without breaking active renderings
          // Some sites might throw if getContext is called after it's already bound to a different context, so we try-catch.
          const gl = canvas.getContext('webgl') || canvas.getContext('webgl2') || canvas.getContext('experimental-webgl');
          if (gl) {
            contextType = gl instanceof WebGL2RenderingContext ? 'webgl2' : 'webgl';
          } else {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              contextType = '2d';
            }
          }
        } catch (e) {
          contextType = 'already_bound_or_error';
        }

        const rect = canvas.getBoundingClientRect();
        const style = window.getComputedStyle(canvas);

        return {
          index,
          id: canvas.id || null,
          className: canvas.className || null,
          attributes: {
            width: canvas.getAttribute('width'),
            height: canvas.getAttribute('height')
          },
          renderedSize: {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          },
          styles: {
            display: style.display,
            position: style.position,
            transform: style.transform !== 'none' ? style.transform : null,
            filter: style.filter !== 'none' ? style.filter : null,
            opacity: style.opacity,
            zIndex: style.zIndex !== 'auto' ? style.zIndex : null
          },
          contextType
        };
      });

      // 2. Inspect likely animated elements (animations, transitions, active transforms/filters/masks)
      const allElements = Array.from(document.querySelectorAll('*'));
      const animatedElements = [];

      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        
        const hasAnim = style.animationName !== 'none' && style.animationDuration !== '0s';
        const hasTrans = style.transitionProperty !== 'none' && style.transitionDuration !== '0s';
        const hasTransform = style.transform !== 'none';
        const hasFilter = style.filter !== 'none' || style.backdropFilter !== 'none';
        const hasBlend = style.mixBlendMode !== 'normal';
        const hasMask = style.maskImage !== 'none' || style.webkitMaskImage !== 'none';

        if (hasAnim || hasTrans || hasTransform || hasFilter || hasBlend || hasMask) {
          // Construct a selector or identifier for the element
          let identifier = el.tagName.toLowerCase();
          if (el.id) {
            identifier += `#${el.id}`;
          } else if (el.className) {
            identifier += `.${Array.from(el.classList).join('.')}`;
          }

          animatedElements.push({
            tag: el.tagName.toLowerCase(),
            identifier,
            indicators: {
              animation: hasAnim ? { name: style.animationName, duration: style.animationDuration } : null,
              transition: hasTrans ? { property: style.transitionProperty, duration: style.transitionDuration } : null,
              transform: hasTransform ? style.transform : null,
              filter: hasFilter ? { filter: style.filter, backdropFilter: style.backdropFilter } : null,
              mixBlendMode: hasBlend ? style.mixBlendMode : null,
              mask: hasMask ? 'detected' : null
            }
          });
        }
      });

      // Page basic metadata
      const rootClasses = document.documentElement.className || '';
      const bodyClasses = document.body.className || '';
      const title = document.title;
      const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || null;

      return {
        metadata: {
          title,
          viewport,
          rootClasses,
          bodyClasses
        },
        canvases: canvasDetails,
        animatedElements
      };
    });

    // Helper to slice sample data and keep JSON output bounded
    const limitSample = (arr, limit = 50) => {
      if (arr.length <= limit) return arr;
      return arr.slice(0, limit);
    };

    // Construct bounded manifest
    const manifest = {
      targetUrl,
      timestamp: new Date().toISOString(),
      metadata: auditResults.metadata,
      canvases: auditResults.canvases,
      canvasCaveats: "Canvas/WebGL context detection is best-effort. Active WebGL drawing contexts may already be locked by runtime frameworks, rendering them undetectable via getContext in this script.",
      assetsSummary: {
        scriptsCount: assets.scripts.length,
        stylesheetsCount: assets.stylesheets.length,
        imagesCount: assets.images.length,
        fontsCount: assets.fonts.length,
        mediaCount: assets.media.length,
        fetchXhrCount: assets.fetchXhr.length,
        otherCount: assets.other.length,
        totalAssets: Object.values(assets).reduce((acc, curr) => acc + curr.length, 0)
      },
      // Store total counts and capped samples so the file does not grow massive
      assetsSamples: {
        scripts: limitSample(assets.scripts),
        stylesheets: limitSample(assets.stylesheets),
        images: limitSample(assets.images),
        fonts: limitSample(assets.fonts),
        media: limitSample(assets.media),
        fetchXhr: limitSample(assets.fetchXhr),
        other: limitSample(assets.other)
      },
      animatedElementsSummary: {
        totalDetected: auditResults.animatedElements.length,
        samples: limitSample(auditResults.animatedElements)
      }
    };

    // Ensure output directories exist
    const outputDir = path.join(process.cwd(), '.tmp', 'reverse-engineer');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const domainName = new URL(targetUrl).hostname.replace(/\./g, '_');
    const manifestPath = path.join(outputDir, `${domainName}_manifest.json`);
    const screenshotPath = path.join(outputDir, `${domainName}_screenshot.png`);

    // Save JSON manifest
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

    // Save screenshot
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Print summary to terminal
    console.log('\n==================================================');
    console.log('   DECONSTRUCTION AUDIT SUMMARY (PLAYWRIGHT)');
    console.log('==================================================');
    console.log(`Target URL:        ${targetUrl}`);
    console.log(`Page Title:        ${auditResults.metadata.title}`);
    console.log(`Viewport Meta:     ${auditResults.metadata.viewport}`);
    console.log(`Root HTML Class:   "${auditResults.metadata.rootClasses}"`);
    console.log(`Body Class:        "${auditResults.metadata.bodyClasses}"`);
    console.log(`Canvas Elements:   ${auditResults.canvases.length} detected`);

    if (auditResults.canvases.length > 0) {
      console.log('\n--- Canvas Details (Best-effort detection) ---');
      auditResults.canvases.forEach(c => {
        console.log(`  Canvas #${c.index}: id="${c.id}" class="${c.className}" type=${c.contextType}`);
        console.log(`    Attributes:    ${c.attributes.width || 'none'}x${c.attributes.height || 'none'}`);
        console.log(`    Rendered size: ${c.renderedSize.width}x${c.renderedSize.height}`);
        console.log(`    Positioning:   display=${c.styles.display}, position=${c.styles.position}, zIndex=${c.styles.zIndex || 'none'}`);
        if (c.styles.transform) console.log(`    Transform:     ${c.styles.transform}`);
        if (c.styles.filter) console.log(`    Filter:        ${c.styles.filter}`);
      });
    }

    console.log('\n--- Network Request Summary ---');
    console.log(`  Scripts:         ${assets.scripts.length}`);
    console.log(`  Stylesheets:     ${assets.stylesheets.length}`);
    console.log(`  Images:          ${assets.images.length}`);
    console.log(`  Fonts:           ${assets.fonts.length}`);
    console.log(`  Media:           ${assets.media.length}`);
    console.log(`  Fetch/XHR:       ${assets.fetchXhr.length}`);
    console.log(`  Others:          ${assets.other.length}`);
    console.log(`  Total Requests:  ${manifest.assetsSummary.totalAssets}`);

    console.log('\n--- Animation Indicators ---');
    console.log(`  Likely animated elements: ${auditResults.animatedElements.length} detected`);
    console.log(`  (Saved first ${manifest.animatedElementsSummary.samples.length} elements to manifest samples)`);

    console.log('\n==================================================');
    console.log(`Manifest saved to:   ${manifestPath}`);
    console.log(`Screenshot saved to: ${screenshotPath}`);
    console.log('NOTE: Proprietary asset contents have NOT been downloaded.');
    console.log('Canvas/WebGL detection is best-effort; drawing contexts may be locked.');
    console.log('==================================================\n');

  } catch (error) {
    console.error('An error occurred during deconstruction:', error);
  } finally {
    await browser.close();
  }
})();
