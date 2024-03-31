import { AfterAll, BeforeAll, Then, When, Given } from "@cucumber/cucumber";
import { Browser, chromium, expect } from "@playwright/test";
import { type Page } from "playwright";
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
  DownedDockerComposeEnvironment,
  Wait,
} from "testcontainers";

let page: Page;
let browser: Browser;
let docker: DockerComposeEnvironment;
let startedDocker: StartedDockerComposeEnvironment;
let downedDocker: DownedDockerComposeEnvironment;

BeforeAll({ timeout: 30000 }, async () => {
  console.log("beforeall started");
  docker = new DockerComposeEnvironment(".", "docker-compose.yml");
  console.log("docker cont created");
  startedDocker = await docker
    .withWaitStrategy("todo-api", Wait.forListeningPorts())
    .withWaitStrategy("todo-app", Wait.forListeningPorts())
    .up();
  console.log("FE+BE built");
  browser = await chromium.launch();
  page = await browser.newPage();
});

AfterAll({ timeout: 30000 }, async () => {
  await page.close();
  await browser.close();
  downedDocker = await startedDocker.down();
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
