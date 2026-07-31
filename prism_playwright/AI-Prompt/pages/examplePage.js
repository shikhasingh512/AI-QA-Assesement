const { BasePage } = require('./basePage');

class ExamplePage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator('h1');
    this.button = page.locator('button');
  }

  async openHomePage() {
    await this.goto('/');
    await this.waitForPageReady();
  }

  async getTitleText() {
    return this.title.textContent();
  }
}

module.exports = { ExamplePage };
