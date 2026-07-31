const { test, expect } = require("@playwright/test");
import loggerUtilities from "../../commonUtils/loggerUtil";

class districtPage {
    /**Constructor to initilize locators for the page */
    constructor(page) {
        this.page = page;
        this.log = new loggerUtilities();
        this.districtLink = page.getByRole('tab', { name: 'District' });
        this.searchDisName = page.getByPlaceholder('Search');
        this.delDisName = page.getByRole('row', { name: 'Chikago IL' }).getByRole('img').nth(1);
        this.confirmYes = page.getByRole('button', { name: 'Yes' });
        this.resultNotFound = page.locator('p.title');
        this.notification = page.locator(".Toastify__toast-body")
        this.notification_message = page.locator(".message")
    }

    async clickOnDistrictTab() {
        await this.districtLink.click();
        this.log.logger("Clicked on District tab");
    }

    async createSchlDistrict(page, name) {
        await this.clickOnDistrictTab();
        await this.searchDisName.fill('Chikago');
        await page.keyboard.press('Enter');
        this.log.logger("school District Created");
    }

    async verifyDisName(page) {
        await expect(page.locator("//td[text()='Chikago']")).toBeVisible();
        this.log.logger("Dis Name verified");
    }

    async delDistrictName(page, name) {
        await this.delDisName.click();
        await this.confirmYes.click();
        this.log.logger("District Name Deleted");
    }

    async getNoResultFoundText() {
        return await this.resultNotFound.textContent();
    }

    async getMockError() {
        expect(await this.notification).toBeVisible();
        let errorText = await this.notification_message.textContent();
        this.log.logger("Error message is -  " + errorText);
        return errorText;
    }
}

module.exports = { districtPage };