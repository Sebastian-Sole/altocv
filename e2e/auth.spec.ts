import { expect, test } from "./fixtures";

test("sign-in page loads", async ({ page }) => {
	await page.goto("/sign-in");
	await expect(page).toHaveTitle(/Alto CV/);
});

test("sign-up page loads", async ({ page }) => {
	await page.goto("/sign-up");
	await expect(page).toHaveTitle(/Alto CV/);
});
