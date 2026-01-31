# Bank Transfer E2E Automation

## Overview
End-to-end test automation for the Bank Transfer feature. This suite validates business rules, input constraints, and access control using Cypress and Cucumber (BDD).

## Tech Stack
- **Cypress** - E2E testing framework
- **Cucumber/Gherkin** - BDD scenarios
- **TypeScript** - Type safety
- **Page Object Model** - Clean architecture

## Project Structure
```
cypress/
├── e2e/
│   └── bank_transfer.feature    # Test scenarios
└── support/
    ├── locators/
    │   └── BankTransferLocators.ts
    ├── pages/
    │   ├── BasePage.ts
    │   └── BankTransferPage.ts
    ├── step_definitions/
    │   └── bank_transfer.steps.ts
    ├── commands.ts              # Custom Cypress commands
    └── e2e.ts
```

## Installation
```bash
npm install
```

## Running Tests
```bash
# Headless
npm test

# Interactive
npm run cypress:open
```

## Test Coverage

| Category | Scenario | Validation |
|----------|----------|------------|
| Happy Path | Instant Transfer | Valid form submission |
| Happy Path | Scheduled Transfer | Future date selection |
| Boundary | Amount 0.01 - 100,000 | Min/max limits |
| Boundary | IBAN 14-34 chars | Length constraints |
| Boundary | Date tomorrow to +90 days | Date range |
| Validation | Label special chars | Alphanumeric only |
| Security | RBAC | Unauthorized role denial |

## Assumptions
- Application URL: `/transfers/create`
- Authentication handled via `cy.loginAs(role)` custom command
- Elements use `data-testid` attributes for stable selection
- Dates are generated dynamically (no hardcoded values)

## Design Decisions
- **Dynamic dates**: `setDate('tomorrow')` calculates real dates
- **Reusable steps**: Common actions in BasePage
- **Minimal locators**: Generic selector pattern for flexibility
