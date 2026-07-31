const { test, expect } = require("@playwright/test");
const { default: loggerUtilities } = require("../../commonUtils/loggerUtil");

class navigationBar {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities()
    this.navigationtab = page.locator(".navTabs");
    this.settings = page.locator("a[href='/settings'] span");
    this.myproject = page.locator("a[href='/projects'] span")
  }

  async verifyNavTabVisible() {
    await expect(this.navigationtab).toBeVisible();
    this.log.logger("Verified navigation tab visibility");
  }

  async clickOnSettings() {
    await this.navigationtab.hover();
    await this.settings.click();
    this.log.logger("Click on settings");
  }
}


module.exports = { navigationBar };
