import { expect, test } from "./fixtures";

test.describe("Editor", () => {
	test.skip(
		true,
		"Requires authentication and CV — run manually with Clerk setup",
	);

	test("editor page loads with sidebar", async ({ page }) => {
		await page.goto("/editor/test-cv-id");
		await expect(page.getByText("Contact Information")).toBeVisible();
	});
});
