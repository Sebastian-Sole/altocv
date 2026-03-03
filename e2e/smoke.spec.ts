import { expect, test } from "./fixtures";

test("homepage loads and shows title", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Alto CV/);
});

test("homepage shows hero section", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByText("Build your perfect CV")).toBeVisible();
});

test("homepage shows get started button", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("link", { name: /get started/i })).toBeVisible();
});
