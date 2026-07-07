const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeSite(targetUrl) {
  if (!targetUrl) {
    console.error('Error: Please provide a target URL.');
    console.log('Usage: node scripts/scrape-site-assets.js <url>');
    process.exit(1);
  }

  // Validate URL format
  try {
    new URL(targetUrl);
  } catch (e) {
    console.error(`Error: Invalid URL "${targetUrl}". Please include protocol (e.g. https://).`);
    process.exit(1);
  }

  console.log(`Starting audit for reference site: ${targetUrl}`);
  console.log('Launching headless Chromium...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const assets = {
    scripts: [],
    stylesheets: [],
    images: [],
    fonts: [],
    media: [],
    others: []
  };

  // Track network requests
  page.on('request', request => {
    const url = request.url();
    const type = request.resourceType();

    const assetItem = {
      url,
      method: request.method(),
      headers: request.headers()
    };

    if (type === 'script') {
      assets.scripts.push(assetItem);
    } else if (type === 'stylesheet') {
      assets.stylesheets.push(assetItem);
    } else if (type === 'image') {
      assets.images.push(assetItem);
    } else if (type === 'font') {
      assets.fonts.push(assetItem);
    } else if (type === 'media') {
      assets.media.push(assetItem);
    } else {
      assets.others.push(assetItem);
    }
  });

  try {
    console.log(`Navigating to ${targetUrl} (waiting for network idle)...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
    // Additional wait to let client-side JS boot and run any canvas setups
    await page.waitForTimeout(3000);
    console.log('Navigation complete. Analyzing page environment...');

    // Extract page metadata and canvas details
    const pageAnalysis = await page.evaluate(() => {
      // Helper to detect canvas contexts
      const canvasElements = Array.from(document.querySelectorAll('canvas')).map((canvas, index) => {
        let detectedType = 'unknown';
        try {
          // Check for active or potential WebGL context
          const gl = canvas.getContext('webgl') || canvas.getContext('webgl2') || canvas.getContext('experimental-webgl');
          if (gl) {
            detectedType = 'webgl';
          } else {
            // Check for 2D context
            const ctx = canvas.getContext('2d');
            if (ctx) {
              detectedType = '2d';
            }
          }
        } catch (e) {
          detectedType = 'error_detecting';
        }

        return {
          index,
          id: canvas.id || null,
          className: canvas.className || null,
          width: canvas.width,
          height: canvas.height,
          detectedType
        };
      });

      const rootClasses = document.documentElement.className || '';
      const bodyClasses = document.body.className || '';
      const title = document.title;
      const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || null;

      // Extract details about structural sections
      const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
        tag: h.tagName.toLowerCase(),
        text: h.textContent?.trim().slice(0, 100) || ''
      }));

      return {
        title,
        viewport,
        rootClasses,
        bodyClasses,
        canvasElements,
        headings
      };
    });

    const manifest = {
      targetUrl,
      timestamp: new Date().toISOString(),
      metadata: {
        title: pageAnalysis.title,
        viewport: pageAnalysis.viewport,
        rootClasses: pageAnalysis.rootClasses,
        bodyClasses: pageAnalysis.bodyClasses,
      },
      canvases: pageAnalysis.canvasElements,
      structuralHeadings: pageAnalysis.headings,
      assetsSummary: {
        scriptsCount: assets.scripts.length,
        stylesheetsCount: assets.stylesheets.length,
        imagesCount: assets.images.length,
        fontsCount: assets.fonts.length,
        mediaCount: assets.media.length,
        othersCount: assets.others.length
      },
      assetsDetails: assets
    };

    // Save manifest report
    const outputDir = path.join(__dirname, '../.tmp/reverse-engineer');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const domainName = new URL(targetUrl).hostname.replace(/\./g, '_');
    const outputPath = path.join(outputDir, `${domainName}_manifest.json`);
    fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log('\n==================================================');
    console.log('   DECONSTRUCTION AUDIT SUMMARY (PLAYWRIGHT)');
    console.log('==================================================');
    console.log(`Target URL:        ${targetUrl}`);
    console.log(`Page Title:        ${pageAnalysis.title}`);
    console.log(`Viewport Meta:     ${pageAnalysis.viewport}`);
    console.log(`Root HTML Class:   "${pageAnalysis.rootClasses}"`);
    console.log(`Body Class:        "${pageAnalysis.bodyClasses}"`);
    console.log(`Canvas Elements:   ${pageAnalysis.canvasElements.length} detected`);

    if (pageAnalysis.canvasElements.length > 0) {
      console.log('\n--- Canvas Details ---');
      pageAnalysis.canvasElements.forEach(c => {
        console.log(`  Canvas #${c.index}: [${c.detectedType.toUpperCase()}] size=${c.width}x${c.height} id="${c.id}" class="${c.className}"`);
      });
    }

    console.log('\n--- Network Request Counts ---');
    console.log(`  Scripts:         ${assets.scripts.length}`);
    console.log(`  Stylesheets:     ${assets.stylesheets.length}`);
    console.log(`  Images:          ${assets.images.length}`);
    console.log(`  Fonts:           ${assets.fonts.length}`);
    console.log(`  Media:           ${assets.media.length}`);
    console.log(`  Others:          ${assets.others.length}`);

    console.log('\n--- Key Structural Headings ---');
    pageAnalysis.headings.slice(0, 8).forEach(h => {
      console.log(`  <${h.tag}>: ${h.text}`);
    });

    console.log('\n==================================================');
    console.log(`Manifest saved to: ${outputPath}`);
    console.log('NOTE: Proprietary asset contents have NOT been downloaded.');
    console.log('==================================================\n');

  } catch (error) {
    console.error('An error occurred during scraping:', error);
  } finally {
    await browser.close();
  }
}

// Extract target URL from CLI arguments
const targetUrl = process.argv[2];
scrapeSite(targetUrl);
