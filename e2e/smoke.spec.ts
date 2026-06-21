import { test, expect } from "@playwright/test";

test("nav whoami link routes to /about", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "whoami" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: /real work/i })).toBeVisible();
});

test("terminal opens and runs whoami", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /terminal/i }).click();
  const input = page.getByRole("textbox");
  await expect(input).toBeVisible();
  await input.fill("whoami");
  await input.press("Enter");
  await expect(page.getByText(/Jestin Coler/).first()).toBeVisible();
});
