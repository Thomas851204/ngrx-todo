import { AfterAll, BeforeAll, Then, When } from "@cucumber/cucumber";
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

When("I open the TodoApp", async function () {
  await page.goto("http://localhost:4200/");
});

Then("I should see {string} as the title", async function (todoTitle: string) {
  await expect(page).toHaveTitle(todoTitle);
});
