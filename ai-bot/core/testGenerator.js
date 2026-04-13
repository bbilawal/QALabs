export function toPlaywright(test) {
  return `
import { test, expect } from '@playwright/test';

test("${test.scenario}", async ({ page }) => {
  await page.goto("${test.page}");

  ${test.steps.map((s) => `await ${s};`).join("\n")}

  await expect(page).toHaveURL("${test.expected}");
});
`;
}