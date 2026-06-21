import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/playground",
  "/work/auto-fix-prs",
  "/work/agentic-testing",
  "/work/kb-pipeline",
  "/work/support-triage",
  "/work/api-platform",
  "/work/videogen",
  "/work/icolerlaw",
  "/work/nectarstudio",
];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1280, height: 800 },
];

for (const vp of viewports) {
  for (const route of routes) {
    test(`${vp.name} ${route} has no horizontal overflow + screenshot`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow (px) on ${route} @ ${vp.name}`).toBeLessThanOrEqual(1);

      const slug = route === "/" ? "home" : route.replace(/\//g, "");
      await page.screenshot({
        path: `e2e/__screenshots__/${slug}-${vp.name}.png`,
        fullPage: true,
      });
    });
  }
}
