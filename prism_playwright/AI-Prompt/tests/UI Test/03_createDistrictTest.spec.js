const { test, expect, chromium } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import * as login from "../../UI/resources/data/loginData.json";
const homeData = require("../../API/pageobjects/homePage");
import { commonMethods } from "../../API/utilities/apiHelper";
const mocker = require("../../commonUtils/mocker");
const utils = require('../../commonUtils/utils');

test.describe('Create new District, verify and delete @regression', () => {
    /**Initilizing variables to be used in different test cases*/
    let poManager = null;
    let loginPage = null;
    let districtPage = null;

    const username = login.adminlogin.username;
    const password = login.adminlogin.password;

    test.beforeEach(async ({ page }) => {
        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.loginUser(page, username, password)
        const navigationBar = poManager.getNavigationBar();
        await navigationBar.clickOnSettings();
    });

    /**test cases using both API and UI */
    test("Create new district", async ({ page }) => {
        await utils.addTestAnnotationsByKeyword("create_district");
        /** New district created by API */
        let headers = homeData.createDistrictHeader;
        let endPoint = homeData.createDistrictEndpoint;
        let payload = homeData.createDistrictPayload;
        let CommonRequest = new commonMethods();
        await CommonRequest.PostResponse(endPoint, payload, headers);

        /** Searching the created district by UI */
        districtPage = poManager.getDistrictPage();
        await districtPage.createSchlDistrict(page);
        await districtPage.verifyDisName(page)

        /** Deleting created district by UI */
        await districtPage.delDistrictName();
        await districtPage.createSchlDistrict(page);
        let noResultFound = await districtPage.getNoResultFoundText();
        expect(noResultFound).toEqual('No Records found');
        console.log('TC Passed')
    });
    test("Create mock error for new district page error code 500", async ({ page }) => {
        const mockUrl = 'https://uat-api.projects.audioenhancement.com/api/v1/users/getDetailedUser';
        await mocker.mockAPI(mockUrl, page,500);
        await page.reload();
        districtPage = poManager.getDistrictPage();
        let mockError = await districtPage.getMockError();
        expect(mockError).toEqual('Something went wrong');
        await page.waitForTimeout(10000);
    });

    test("Create mock error for new district page error code 400", async ({ page }) => {
        const mockUrl = 'https://uat-api.projects.audioenhancement.com/api/v1/users/getDetailedUser';
        await mocker.mockAPI(mockUrl, page,400);
        await page.reload();
        districtPage = poManager.getDistrictPage();
        let mockError = await districtPage.getMockError();
        expect(mockError).toEqual('Something went wrong');
        await page.waitForTimeout(10000);
    });
});