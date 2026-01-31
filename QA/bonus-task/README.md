# Fulll.fr E2E Automation (Bonus Task)

## Overview
End-to-end test automation suite for the **fulll.fr** production website. Built with Cypress, Cucumber (BDD), and Allure for professional reporting.

## Tech Stack
- **Cypress** - E2E testing framework
- **Cucumber/Gherkin** - BDD test scenarios
- **TypeScript** - Type-safe code
- **Allure** - Test reporting with screenshots and videos
- **Page Object Model** - Maintainable test architecture

## Project Structure
```
cypress/
├── e2e/
│   └── fulll_site.feature       # Gherkin test scenarios
├── support/
│   ├── locators/
│   │   └── FulllSiteLocators.ts # CSS selectors
│   ├── pages/
│   │   ├── BasePage.ts          # Common actions
│   │   ├── FulllHomePage.ts     # Homepage interactions
│   │   └── FulllContactPage.ts  # Contact form interactions
│   ├── step_definitions/
│   │   └── fulll_site.steps.ts  # Step implementations
│   └── e2e.ts                   # Global config
├── videos/                      # Test recordings
└── screenshots/                 # Failure screenshots
```

## Installation
```bash
npm install
```

## Running Tests

### Headless Mode (CI/CD)
```bash
npm test
```

### Interactive Mode (Development)
```bash
npm run cypress:open
```

### With Allure Report (Recommended)
```bash
npm run test:allure
```
This command:
1. Runs all tests headlessly
2. Generates Allure report
3. Opens report in browser automatically

## Allure Commands

| Command | Description |
|---------|-------------|
| `npm run test:allure` | Run tests + generate + open report |
| `npm run allure:report` | Generate report from results |
| `npm run allure:open` | Open existing report |
| `npm run allure:clear` | Clean all report data |

## Test Scenarios

| Scenario | Description |
|----------|-------------|
| Mega Menu Navigation | Navigate to "Production comptable" via Solutions dropdown |
| Contact Form Submission | Fill and submit demo request form with HubSpot iframe |

## Key Features
- **Dynamic waits** - No static `cy.wait()`, uses visibility assertions
- **Cookie handling** - Automatic Axeptio banner dismissal
- **Iframe support** - HubSpot form interaction
- **Video recording** - All test runs are recorded
- **Screenshot on failure** - Automatic capture

## Prerequisites
- Node.js 18+
- Allure CLI (`brew install allure`)

## Jenkins CI/CD

A `Jenkinsfile` is included for pipeline integration.

### Pipeline Stages
1. **Install Dependencies** - `npm ci`
2. **Run Cypress Tests** - Executes all tests headlessly
3. **Generate Allure Report** - Creates test report

### Jenkins Requirements
- NodeJS plugin configured
- Allure plugin installed
- Pipeline project pointing to this repo

### Artifacts
- Videos: `cypress/videos/`
- Screenshots: `cypress/screenshots/`
- Allure Results: `allure-results/`
