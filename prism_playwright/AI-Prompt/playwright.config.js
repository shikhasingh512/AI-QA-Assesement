// @ts-check
const { defineConfig } = require('@playwright/test');
const { env } = require('./utils/env');

module.exports = defineConfig({
  testDir: './tests',
  retries: 0,
  workers: 2,
  timeout: 250 * 1000,
  expect: {
    timeout: 60000,
  },
  reporter: [
    ['html', { outputFolder: './reports/html', open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: env.BASE_URL,
    headless: env.HEADLESS,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: env.TRACE === 'on' ? 'on' : 'off',
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 900 }
  },
  projects: [
    {
      name: 'prism-ui',
      testMatch: '**/tests/ui/**/*.spec.js',
      use: {
        browserName: 'chromium'
      }
    },
    {
      name: 'prism-api',
      testMatch: '**/tests/api/**/*.spec.js',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});
