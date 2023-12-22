import { test, expect } from "@playwright/test";
import { getUrl } from "./utils";

test.beforeEach(async ({ page }) => {
	await page.goto(getUrl());
});

test("updating title & description works", async ({ page }) => {
	await page.getByRole("textbox", { name: "Title" }).fill("My Title");
	await page
		.getByRole("textbox", { name: "Description" })
		.fill("My Description");

	const boards = page.getByTestId("preview-boards");
	await expect(boards.getByText("My Title").all()).toHaveLength(2);
	// await expect(boards.getByText("My Description")).toBeVisible();
});

// test("get started link", async ({ page }) => {
// 	await page.goto("https://playwright.dev/");
//
// 	// Click the get started link.
// 	await page.getByRole("link", { name: "Get started" }).click();
//
// 	// Expects page to have a heading with the name of Installation.
// 	await expect(
// 		page.getByRole("heading", { name: "Installation" }),
// 	).toBeVisible();
// });
