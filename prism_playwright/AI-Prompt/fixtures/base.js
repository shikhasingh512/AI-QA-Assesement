const base = require('@playwright/test');
const { BasePage } = require('../pages/basePage');
const { SoftAssertions } = require('../utils/softAssertions');

const test = base.test.extend({
  app: async ({ page }, use) => {
    const app = new BasePage(page);
    await use(app);
  },

  softExpect: async ({}, use) => {
    const softExpect = new SoftAssertions(base.expect);
    await use(softExpect);
    await softExpect.assertAll();
  }
});

const expect = base.expect;

module.exports = { test, expect };
