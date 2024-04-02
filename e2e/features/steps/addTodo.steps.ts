import { Then, When, Given, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { Browser, chromium, expect } from "@playwright/test";
import { type Page } from "playwright";

let page: Page;
let browser: Browser;
let counterBefore: number;

BeforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:4200/");
});

AfterAll(async () => {
  await page.locator("button").last().click();
  await page.close();
  await browser.close();
});

Given("I write {string} into the input field", async function (text: string) {
  counterBefore = parseInt(
    (await page.locator("mat-card-title").innerText())
      .split("")
      .filter((char) => !isNaN(Number(char)))
      .join("")
  );
  page.getByRole("textbox").fill(text);
});

When("I click on the Add button", async function () {
  await page.getByTestId("todo-add-button").click();
});

Then("the Todos to finish counter increases by one", async function () {
  let counterLine = page.locator("mat-card-title");
  let counterAfter: number = parseInt(
    (await page.locator("mat-card-title").innerText())
      .split("")
      .filter((char) => !isNaN(Number(char)))
      .join("")
  );
  expect(counterLine).toBeVisible();
  expect(counterAfter - counterBefore).toBe(1);
});

Then(
  "I should see a new task at the end of the list with {string} text",
  async function (text: string) {
    const lastTodo = page.getByTestId("todo-checkbox").last();
    await expect(lastTodo).toBeVisible();
    await expect(lastTodo).toContainText(text);
  }
);
