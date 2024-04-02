import { Then, When } from "@cucumber/cucumber";
import { Browser, chromium, expect } from "@playwright/test";
import { type Page } from "playwright";

let page: Page;
let browser: Browser;

When("I open the TodoApp", async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:4200/");
});

Then("I should see the loaded page", async function () {
  const appRoot = await page.locator("app-root").isVisible();
  expect(appRoot).toBeTruthy();
});
