import { AfterAll, BeforeAll, Then, When, Given } from "@cucumber/cucumber";
import { Browser, chromium, expect } from "@playwright/test";
import { type Page } from "playwright";

let page: Page;
let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

AfterAll(async () => {
  await page.close();
  await browser.close();
});

Given(
  "I write {string} into the input field",
  async function (taskText: string) {
    await page.goto("http://localhost:4200/");
    page.getByRole("textbox").fill(taskText);
  }
);

When("I click on the Add button", async function () {
  await page.locator("button", { hasText: "Add" }).click({ button: "left" });
});

Then(
  "I should see a new task at the end of the list with {string} text",
  async function (taskText: string) {
    const lastTodo = page.getByTestId("todo-checkbox").last();

    await expect(lastTodo).toBeVisible();
    await expect(lastTodo).toContainText(taskText);
  }
);
