## Setting up environment

- make "e2e" directory in project root

- in terminal: npm init (default values are okay, except for test, there enter "cucumber-js")

- Then package installations in this order:
  - tsc --init
  - npm i -D @types/node ts-node
  - npm i -D @cucumber/cucumber
  - npm i -D @playwright/test@latest
  - npx playwright install --with-deps

- Create a features/steps directory structure in e2e directory

- manually create cucumber.json in e2e directory with this content:
```json
{
    "default": {
        "formatOptions": {
            "snippetInterface": "async-await"
        },
        "dryRun": false,
        "paths": ["features/"],
        "require": ["features/steps/*.steps.ts"],
        "requireModule": ["ts-node/register"]
    }
}
```
## Writing tests

- create .feature file in features directory using Gherkin syntax

- create the .steps.ts file in features/steps/ directory with the same name as the feature file, leave it empty

- run npm test in terminal, copy-paste the snippets into the step file

- write the implementation

## Links

  [Cucumber basic test writing](https://cucumber.io/docs/guides/10-minute-tutorial/?lang=javascript#write-a-scenario/)

  [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/)

  [playwright locators and its methods](https://playwright.dev/docs/api/class-locator)

  [playwright page methods](https://playwright.dev/docs/api/class-page)

  [playwright browser methods](https://playwright.dev/docs/api/class-browser)
