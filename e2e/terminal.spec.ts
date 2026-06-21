import { test, expect } from "@playwright/test";

test("terminal panel fits within the mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator("nav button").click();
  const dialog = page.getByRole("dialog", { name: /interactive terminal/i });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(376); // within the 375px viewport (+1px tolerance)
  // page itself must not gain horizontal overflow when the terminal is open
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
