import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import {storeResponseToJsonFile} from "../../API/utilities/storeFullAPIResponse"
const { DynamicData } = require("../../API/utilities/createDynamicData");
const loginData = require("../../API/pageobjects/loginPage");
const suiteInfo = require("../../API/utilities/requestToCurlLogger");

// import {get_home_page_rail_data, home_page_rail_headers} from "../../API/pages/homePage";

test.beforeAll(async()=>{
suiteInfo.suiteStarter();
});


// POST REQUEST
test("test 1 : Get Access Token", async () => {
  test.info().annotations.push({ type: "test_key", description: "add test case id here" });
  let headers = loginData.loginHeader;
  let endPoint = loginData.loginEndpoint;
  let payload = loginData.loginBody;
  let CommonRequest = new commonMethods();
  const response = await CommonRequest.PostResponse(endPoint,payload,headers);

  // --Serverside Validations 
  expect(response.status()).toBe(_Response.getPositive);
  expect.soft(response.ok()).toBeTruthy();

  // response level Validations
  const res = await response.json();
  expect(res.success).toBe(true);
  expect(res.code).toBe(200);

  // Store JSON response in a file.
  let createJson = new storeResponseToJsonFile();
  createJson.storeJsonDataToFile(res, 'AccessToken');

  // const token = new DynamicData(res.data.token);
  // CommonRequest.storageState.accessToken = token;
});
