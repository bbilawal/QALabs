import { chromium } from "playwright";
import { URL } from "url";

export async function runAITest(url, progressCallback, partialCallback) {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  const base = new URL(url);
  const baseDomain = base.hostname;

  const visited = new Set();
  const pages = [];
  const errors = [];
  const screenshots = [];
  const testCases = [];

  // ✅ Capture console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push({
        page: page.url(),
        defect: msg.text(),
      });
    }
  });

  try {
    // ✅ Go to initial page
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

    // ✅ Extract links
    const links = await page.$$eval("a", (as) =>
      as.map((a) => a.href).filter(Boolean)
    );

    const filteredLinks = links.filter((link) => {
      try {
        const linkUrl = new URL(link);
        return linkUrl.hostname === baseDomain;
      } catch {
        return false;
      }
    });

    const uniqueLinks = [...new Set([url, ...filteredLinks])].slice(0, 15);

    // 🔁 Crawl pages
    for (const link of uniqueLinks) {
      if (visited.has(link)) continue;
      visited.add(link);

      try {
        await page.goto(link, { waitUntil: "networkidle", timeout: 60000 });

        // ✅ WAIT for rendering (VERY IMPORTANT)
        await page.waitForTimeout(1500);

        // ✅ Scroll to trigger lazy loading
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });

        await page.waitForTimeout(1000);

        pages.push(link);
        progressCallback(link);

        // 🔥 ✅ REAL FIX: FULL PAGE BASE64 SCREENSHOT
        const image = await page.screenshot({
          type: "png",
          encoding: "base64",
          fullPage: true,
        });

        // ✅ Ensure valid base64
        if (image && image.length > 1000) {
          screenshots.push({
            page: link,
            image: image,
          });
        }

        // 🔍 DOM analysis
        const analysis = await page.evaluate(() => ({
          buttons: document.querySelectorAll("button").length,
          inputs: document.querySelectorAll("input").length,
          forms: document.querySelectorAll("form").length,
          images: document.querySelectorAll("img").length,
          links: document.querySelectorAll("a").length,
        }));

        // 🤖 Generate test cases
        const generatedTests = [];

        if (analysis.buttons > 0) {
          generatedTests.push({
            page: link,
            type: "Functional",
            scenario: `Validate button clicks on ${link}`,
            steps: [`page.locator("button").first().click()`],
            expected: link,
          });
        }

        if (analysis.forms > 0) {
          generatedTests.push({
            page: link,
            type: "Functional",
            scenario: `Submit form on ${link}`,
            steps: [
              `page.locator("input").first().fill("test")`,
              `page.locator("button[type=submit]").click()`,
            ],
            expected: link,
          });
        }

        if (analysis.images > 0) {
          generatedTests.push({
            page: link,
            type: "Static",
            scenario: `Validate images load on ${link}`,
            steps: [],
            expected: link,
          });
        }

        testCases.push(...generatedTests);

        // 🔄 Send live updates
        partialCallback({
          pages,
          errors,
          screenshots,
          testCases,
        });
      } catch (err) {
        errors.push({
          page: link,
          defect: err.message,
        });
      }
    }

    await browser.close();

    return {
      pages,
      errors,
      screenshots,
      testCases,
    };
  } catch (err) {
    await browser.close();
    throw err;
  }
}