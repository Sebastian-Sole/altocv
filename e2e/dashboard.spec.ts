import { expect, test } from "./fixtures";

test.describe("Dashboard", () => {
	test.skip(true, "Requires authentication — run manually with Clerk setup");

	test("dashboard page loads", async ({ page }) => {
		await page.goto("/dashboard");
		await expect(page.getByText("My CVs")).toBeVisible();
	});

	test("shows empty state when no CVs", async ({ page }) => {
		await page.goto("/dashboard");
		await expect(page.getByText("No CVs yet")).toBeVisible();
	});
});
