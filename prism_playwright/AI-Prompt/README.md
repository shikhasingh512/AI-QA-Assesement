# PlayWright Prism Framework

## Framework Structure

1. **pages** - Page Object Model classes.
2. **tests/ui** - UI test files.
3. **tests/api** - API test files.
4. **fixtures** - Shared Playwright fixtures and base test setup.
5. **utils** - Reusable utilities such as environment helpers and soft assertions.
6. **data** - Test data and environment configuration.
7. **reports** - HTML reports and screenshots.

## Included capabilities

- Page Object Model foundation with a base page.
- Environment variable support via `.env`.
- Shared fixtures for app and soft assertions.
- Soft assertion helper for non-blocking checks.
- HTML reporter configuration.

## Setup

1. Copy `.env.example` to `.env` and update values.
2. Install dependencies with `npm install`.
3. Add page objects under `pages/`.
4. Add future tests under `tests/ui/` or `tests/api/`.

## Commands

- Run all tests: `npx playwright test`
- Run in UI mode: `npx playwright test --ui`
- Generate report: `npx playwright show-report`

