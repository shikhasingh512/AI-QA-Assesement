const { test, expect } = require("@playwright/test");
import loggerUtilities from "../../commonUtils/loggerUtil";

class settingPage {
    /**Constructor to initilize locators for the page */
    constructor(page) {
        this.page = page;
        this.log = new loggerUtilities();
        this.systemlink = page.locator(".settings-tab .nav-tabs a[data-rb-event-key='system']");
        this.searchinputtxtbox = page.locator(".search-input");
        this.systemcountlist = page.locator(".System tbody tr .column-0");
        this.createsystembtn = page.locator(".create-btn");
        this.systemname = page.locator(".solution-name input");
        this.systemtype = page.locator("#system-type-dropdown div div");
        this.systemtypedropdownlist = page.locator("#system-type-dropdown li");
        this.rankingdropdown = page.locator("#ranking-dropdown div div");
        this.rankingdropdownlist = page.locator("#ranking-dropdown .selectDropdown ul li");
        this.coresystemdropdown = page.locator(".system-components div[class$='-control']");
        this.corecomponentselectdropdown = page.locator(".system-components div[class$='-control']");
        this.systemaccessoriesselectdropdown = page.locator(".name-accessories div[class$='-control']")
        this.systemdescription = page.locator(".description textarea");
        this.keyfeature = page.locator(".notranslate");
        this.solutioncompatibilityitemslist = page.locator(".solution-compatibility .label-container")
        this.solutioncompatibiltycheckbox = page.locator(".not-checked");
        this.legendicon = page.locator(".legend-selection .cursor-pointer");
        this.colorpicker = page.locator(".color-picker-icon");
        this.colorpick = page.locator(".flexbox-fix div");
        this.okbtn = page.locator(".agree-btn");
        this.savebtn = page.locator(".save-btn");
        this.toastMessageToast = page.locator(".message")
        this.pageLoader = page.locator(".loader-wrapper span")
        this.deleteIcon = page.locator(".delete-icon")
    }

    /**Check if system exists or not, if not then create system*/
    async searchCreatesystem(page, systemname, systemtype, ranking, systemdescription, keyfeatures,
        coresystemcomponents, includedsystemaccessories, solutioncompatibility) {

        /**code section to search a system */
        let searchsystemflag = false;
        await this.systemlink.click();
        await this.searchinputtxtbox.click();
        await this.searchinputtxtbox.fill(systemname);
        this.log.logger('Searched ' + `${systemname}` + 'in input box')
        await expect(this.pageLoader).toBeVisible();
        await expect(this.pageLoader).toBeHidden();
        const matchingsystemcount = await this.systemcountlist.count();
        /**below code will delete the system if already exists */
        if (matchingsystemcount > 0) {
            searchsystemflag = true;
            await this.searchinputtxtbox.fill("")
            await this.deleteSystem(systemname);
            searchsystemflag = false
        }
        /**code section to create a system conditionally */
        if (searchsystemflag == false) {
            await this.createsystembtn.click();
            await this.systemname.fill(systemname);
            await this.systemtype.click();
            let systemlistcount = await this.systemtypedropdownlist.count();
            for (let i = 0; i < systemlistcount; i++) {
                let itemname = await this.systemtypedropdownlist.nth(i).textContent();
                if (itemname == systemtype) {
                    await this.systemtypedropdownlist.nth(i).click();
                    break;
                }
            }
            await this.rankingdropdown.click();
            await this.rankingdropdownlist.nth(0).click();
            await this.systemdescription.type(systemdescription);
            await this.keyfeature.type(keyfeatures);
            await page.setInputFiles(".image-uploader label", "UI/resources/images/sample_image.png");

            const solutionlist = solutioncompatibility.split(",")
            for (let i = 0; i < solutionlist.length; i++) {
                const availableSolutions = await this.solutioncompatibilityitemslist.count();
                for (let j = 0; j < availableSolutions; j++) {
                    let solutionname = await this.solutioncompatibilityitemslist.nth(j).textContent();
                    if (solutionname.trim() == solutionlist[i]) {
                        await this.solutioncompatibiltycheckbox.nth(j).click();
                        break;
                    }
                }
            }

            for (let i = 0; i < coresystemcomponents.length; i++) {
                await this.coresystemdropdown.click();
                let coreSystemname = coresystemcomponents[i];
                let clippedname = coreSystemname.slice(0, coreSystemname.length - 1)
                await this.corecomponentselectdropdown.type(clippedname);
                await page.locator("text='" + coresystemcomponents[i] + "'").click();
            }
            await this.systemaccessoriesselectdropdown.click();
            await this.systemaccessoriesselectdropdown.type(includedsystemaccessories);
            await page.getByRole('option', { name: includedsystemaccessories}).click();

            await this.legendicon.nth(0).click();
            await this.colorpicker.click();
            await this.colorpick.nth(27).click();
            await this.okbtn.click();
            await this.savebtn.click();
            this.log.logger(`Click on save button`);
        }
    }

    async verifySystemCreation() {
        await expect(this.toastMessageToast.nth(1)).toBeVisible();
        let successMsg = await this.toastMessageToast.nth(1).textContent();
        await expect(this.toastMessageToast.nth(1)).toBeHidden();
        return successMsg;
    }

    /**Method to search and delete system */
    async deleteSystem(systemName) {
        await this.searchinputtxtbox.fill(systemName)
        await expect(this.pageLoader).toBeVisible();
        await expect(this.pageLoader).toBeHidden();
        await this.deleteIcon.click();
        await this.okbtn.click();
        this.log.logger("Deleted system",systemName);
        await expect(this.toastMessageToast.nth(1)).toBeVisible();
        const toastMessage = await this.toastMessageToast.nth(1).textContent();
        expect(toastMessage).toEqual("System deleted successfully.")
        this.log.logger("Verified toast message")
        await expect(this.toastMessageToast.nth(1)).toBeHidden();
    }
}

module.exports = { settingPage };
