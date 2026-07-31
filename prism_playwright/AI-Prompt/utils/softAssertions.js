class SoftAssertions {
  constructor(expect) {
    this.expect = expect;
    this.errors = [];
  }

  async run(assertion, message) {
    try {
      await assertion();
    } catch (error) {
      this.errors.push(message ? `${message}: ${error.message}` : error.message);
    }
  }

  async toBeVisible(locator, message) {
    await this.run(() => this.expect(locator).toBeVisible(), message || 'Expected element to be visible');
  }

  async toContainText(locator, expectedText, message) {
    await this.run(() => this.expect(locator).toContainText(expectedText), message || 'Expected element to contain text');
  }

  async toHaveValue(locator, expectedValue, message) {
    await this.run(() => this.expect(locator).toHaveValue(expectedValue), message || 'Expected element to have value');
  }

  async toBeEnabled(locator, message) {
    await this.run(() => this.expect(locator).toBeEnabled(), message || 'Expected element to be enabled');
  }

  async toBeHidden(locator, message) {
    await this.run(() => this.expect(locator).toBeHidden(), message || 'Expected element to be hidden');
  }

  async toHaveCount(locator, expectedCount, message) {
    await this.run(() => this.expect(locator).toHaveCount(expectedCount), message || 'Expected element count to match');
  }

  async assertAll() {
    if (this.errors.length > 0) {
      throw new Error(this.errors.map((error, index) => `${index + 1}. ${error}`).join('\n'));
    }
  }
}

module.exports = { SoftAssertions };
