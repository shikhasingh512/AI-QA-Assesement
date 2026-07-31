const { test, expect } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import { faker } from '@faker-js/faker/locale/en';
import * as login from "../../UI/resources/data/loginData.json";
import * as system from "../../UI/resources/data/system.json";
const utils = require('../../commonUtils/utils');

/**Using faker.js for getting random data*/
test.describe('Create System using internal user', () => {  
    /**Initilizing variables to be used in different test cases*/
    let poManager = null;
    let loginPage = null;
    let settingPage = null;
  
    const username = login.adminlogin.username;
    const password = login.adminlogin.password;
    const systemname = faker.company.catchPhrase(); // picks random buisness catch phrase
    const systemtype = system.systemdata.systemtype;
    const ranking = faker.number.int(); //picks a random number
    const systemdescription = faker.commerce.productName(); // Generates a random productName.
    const keyfeatures = faker.finance.transactionDescription() // Generates a random transaction description.
  
    const coreComponentList = [system.systemdata.coresystemcomponents]
    const coresystemcomponents = coreComponentList;
    const includedsystemaccessories = system.systemdata.includedsystemaccessories;
    const solutioncompatibility = system.systemdata.solutioncompatibility;


    test.beforeEach(async ({ page }) => {
        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.loginUser(page, username, password)
        const navigationBar = poManager.getNavigationBar();
        await navigationBar.clickOnSettings();
    });
  
    /**UI TC 02 */
    test("create system", async({ page }) => {
        await utils.addTestAnnotationsByKeyword("create_system");
        settingPage = poManager.getSettingPage();
        await settingPage.searchCreatesystem(page, systemname, systemtype, ranking, systemdescription,
            keyfeatures, coresystemcomponents, includedsystemaccessories, solutioncompatibility);
        let sucessmsg = await settingPage.verifySystemCreation();
        expect(sucessmsg).toEqual('System created successfully.');
    });
  
    test.afterEach(async() => {
        console.log("Deleting created system")
        settingPage = poManager.getSettingPage();
        await settingPage.deleteSystem(systemname);
    });
  });