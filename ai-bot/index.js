const { chromium } = require("playwright");

async function crawlSite(url, onProgress = () => {}) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const visited = new Set();
  const baseDomain = new URL(url).hostname;

  async function visit(link) {
    if (!link || visited.has(link)) return;

    try {
      const linkUrl = new URL(link, url).href;
      const linkDomain = new URL(linkUrl).hostname;

      if (linkDomain !== baseDomain) return;

      visited.add(linkUrl);

      const response = await page.goto(linkUrl, {
        waitUntil: "domcontentloaded",
      });

      let pageErrors = [];

      // ❗ HTTP error
      if (!response || !response.ok()) {
        pageErrors.push({
          page: linkUrl,
          defect: `HTTP ${response?.status()} error`,
          severity: "high",
        });
      }

      // 📸 screenshot
      const screenshotBuffer = await page.screenshot({ fullPage: true });

      // ✅ 🔥 SEND FULL STRUCTURED DATA (THIS IS THE FIX)
      onProgress({
        url: linkUrl,
        errors: pageErrors,
        screenshot: screenshotBuffer.toString("base64"),
      });

      // 🔗 crawl links
      const anchors = await page.$$eval("a", (els) =>
        els.map((a) => a.href)
      );

      for (const a of anchors) {
        await visit(a);
      }

    } catch (err) {
      onProgress({
        url: link,
        errors: [
          {
            page: link,
            defect: err.message,
            severity: "high",
          },
        ],
        screenshot: null,
      });
    }
  }

  await visit(url);
  await browser.close();
}

async function generateTestCases(pages) {
  return pages.flatMap((p) => [
    // STATIC
    { page: p, type: "Static", category: "SEO", testCase: `Verify meta tags, title, headings, alt attributes on ${p}` },
    { page: p, type: "Static", category: "HTML", testCase: `Validate semantic HTML and broken links on ${p}` },
    // DYNAMIC
    { page: p, type: "Dynamic", category: "Functional", testCase: `Validate forms, buttons, navigation flows on ${p}` },
    { page: p, type: "Dynamic", category: "API", testCase: `Validate API responses and data rendering on ${p}` },
    // NON-FUNCTIONAL
    { page: p, type: "Non-Functional", category: "Performance", testCase: `Measure page load time, responsiveness, and resource usage on ${p}` },
    { page: p, type: "Non-Functional", category: "Accessibility", testCase: `Check ARIA roles, color contrast, alt attributes, and keyboard navigation on ${p}` },
    { page: p, type: "Non-Functional", category: "Security", testCase: `Perform XSS input validation, script injection, and form security tests on ${p}` },
  ]);
}

export async function runAITest(url, onProgress, onPartial) {
  const pages = [];
  const errors = [];
  const screenshots = [];

  await crawlSite(url, async (pageData) => {
    // ✅ HANDLE BOTH CASES (string OR object)

    let pageUrl = "";
    let pageErrors = [];
    let pageScreenshot = null;

    if (typeof pageData === "string") {
      // 👉 your OLD behavior
      pageUrl = pageData;
    } else {
      // 👉 NEW enhanced behavior
      pageUrl = pageData.url;
      pageErrors = pageData.errors || [];
      pageScreenshot = pageData.screenshot || null;
    }

    // ✅ always push page
    if (pageUrl) {
      pages.push(pageUrl);
      onProgress(pageUrl);
    }

    // ✅ collect errors
    if (pageErrors.length) {
      errors.push(...pageErrors);
    }

    // ✅ collect screenshots
    if (pageScreenshot) {
      screenshots.push({
        page: pageUrl,
        image: pageScreenshot,
      });
    }

    // ✅ SAFE PARTIAL UPDATE
    if (typeof onPartial === "function") {
      onPartial({
        pages: [...pages],
        errors: [...errors],
        screenshots: [...screenshots],
        testCases: generateTestCases(pages),
      });
    }
  });

  const testCases = generateTestCases(pages);

  return { pages, errors, testCases, screenshots };
}

module.exports = { runAITest };