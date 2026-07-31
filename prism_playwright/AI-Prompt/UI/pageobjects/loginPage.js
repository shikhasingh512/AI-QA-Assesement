import { test, expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";
class loginPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.username = page.locator("input[name='email']")
    this.password = page.locator("#Password")
    this.loginbtn = page.locator(".loginButton")
    this.notification = page.locator(".Toastify__toast-body")
    this.notification_message = page.locator(".message")
    this.toastmessage = page.locator(".message");
    this.error = page.locator(".error");
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL);
    this.log.logger("Successfully launched the Application");    
  }

  async loginUser(page, username, password) {
    await this.username.click();
    await this.username.fill(username)
    await this.password.click();
    await this.password.fill(password);
    await this.loginbtn.click();
    this.log.logger("Login Successful");
    await page.context().storageState({ path: "./storeBrowserState.json" });
  }

  async verifyErrorwithInvalidEmail(username){
    await this.username.click();
    await this.username.fill(username);
    await expect(this.error).toContainText("Please enter a valid Email address.");
    this.log.logger("Verified email name is invalid ");
  }


  /*function for negative test case to verify incorrect details do not let user login*/
  async loginUser_Incorrectdetails(page, username, password) {
    await this.username.click();
    await this.username.fill(username)
    await this.password.click();
    await this.password.fill("Rsdfsfsd@123456");
    await this.loginbtn.click();
    expect(await this.notification).toBeVisible();
    await expect(this.notification_message).toContainText("The Password entered is incorrect.");
    this.log.logger("Incorrect Password Entered Verified");

  }

  /*function for negative test case to verify incorrect details do not let user login*/
  async verifyIncorrrectPass_Msg() {
    const actualerrormessage = await this.toastmessage.textContent();
    expect(actualerrormessage).toEqual("Account is either inactive or does not exist.");
    this.log.logger("Error Modal Verified Successfully");
  }

}
export default { loginPage };
