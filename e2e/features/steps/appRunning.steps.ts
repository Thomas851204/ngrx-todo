import { AfterAll, BeforeAll, Then, When } from "@cucumber/cucumber";
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
  docker = new DockerComposeEnvironment(".", "docker-compose.yml");
  startedDocker = await docker
    .withWaitStrategy("todo-api", Wait.forListeningPorts())
    .withWaitStrategy("todo-app", Wait.forListeningPorts())
    .up();
  browser = await chromium.launch();
  page = await browser.newPage();
});

AfterAll({ timeout: 30000 }, async () => {
  await page.close();
  await browser.close();
  downedDocker = await startedDocker.down();
});

When("I open the TodoApp", async function () {
  await page.goto("http://localhost:4200/");
});

Then("I should see {string} as the title", async function (todoTitle: string) {
  await expect(page).toHaveTitle(todoTitle);
});
