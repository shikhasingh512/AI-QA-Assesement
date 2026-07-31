const fs = require('fs');
const path = require('path');
const { env } = require('../utils/env');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(pathname = '') {
    const targetUrl = `${env.BASE_URL}${pathname}`;
    await this.page.goto(targetUrl);
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name = 'screenshot') {
    const screenshotDir = path.join(__dirname, '..', 'reports', 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPath = path.join(screenshotDir, `${name}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }
}

module.exports = { BasePage };
