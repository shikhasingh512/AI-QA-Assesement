const { test ,expect} = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import * as login from "../../UI/resources/data/loginData.json";
const utils = require('../../commonUtils/utils');

test.describe('Login internal user', () => {
  /**Initilizing variables to be used in different test cases*/
  let poManager = null;
  let loginPage = null;
  const username = login.adminlogin.username;
  const password = login.adminlogin.password;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    await loginPage.goto();
  });

  /**UI TC 01 */
  test('Verify internal user login succesfully with correct credentials @sanity @regression', async ({ page }) => {
    await utils.addTestAnnotationsByKeyword("login");
    await loginPage.loginUser(page, username, password)
    const navigation = poManager.getNavigationBar();
    await navigation.verifyNavTabVisible();
    console.log('UI TC01 Passed')
  });
});