import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import { storeResponseToJsonFile } from "../../API/utilities/storeFullAPIResponse"
const { DynamicData } = require("../../API/utilities/createDynamicData");
const homeData = require("../../API/pageobjects/homePage");
const suiteInfo = require("../../API/utilities/requestToCurlLogger");

// import {get_home_page_rail_data, home_page_rail_headers} from "../../API/pages/homePage";

test.beforeAll(async () => {
  suiteInfo.suiteStarter();
});

// GET REQUEST 
test(" test 1 : Get district List request", async () => {
  test.info().annotations.push({ type: "test_key", description: "add test case id here" });
  /* method 1 - for getting home page data
  let headers = home_page_rail_headers();
   let endPoint = get_home_page_rail_data(); */


  //  method 2 - for getting home page data
  let headers = homeData.getDistrictListHeader;
  let endPoint = homeData.getDistrictListEndpoint;
  let CommonRequest = new commonMethods();
  const response = await CommonRequest.GetResponse(endPoint, headers);
  console.log(response);
  // --Serverside Validations 
  expect(response.status()).toBe(_Response.getPositive);
  expect.soft(response.ok()).toBeTruthy();

  // response level Validations
  const res = await response.json();
  expect(res.success).toBe(true);
  expect(res.code).toBe(200);
  expect.soft(res.data.pageNumber).toBe(1);
  expect.soft(res.data.pageSize).toBe(25);

  // Get data and store in getter & setter class
  const dd = new DynamicData(res.data.items[0].id);
  console.log(dd.railID);
});

// POST REQUEST
test("test 2 : Create District Request", async () => {
  test.info().annotations.push({ type: "test_key", description: "add test case id here" });
  let headers = homeData.createDistrictHeader;
  let endPoint = homeData.createDistrictEndpoint;
  let payload = homeData.createDistrictPayload;
  let CommonRequest = new commonMethods();
  const response = await CommonRequest.PostResponse(endPoint, payload, headers);

  // --Serverside Validations 
  expect(response.status()).toBe(_Response.getPositive);
  expect.soft(response.ok()).toBeTruthy();

  // response level Validations
  const res = await response.json();
  expect(res.success).toBe(true);
  expect(res.code).toBe(200);

  // Store JSON response in a file.
  let createJson = new storeResponseToJsonFile();
  createJson.storeJsonDataToFile(res, 'createDistrict');

  // Get data and store in getter & setter class.
  // const dd = new DynamicData(res.data.anonymousId);

  // Directly pass data in json object.
  homeData.deleteDistrictPayload.id = res.data.insertId;
});

test("test 3 : Delete District Request", async () => {
  test.info().annotations.push({ type: "test_key", description: "add test case id here" });
  let headers = homeData.deleteDistrictHeader;
  let endPoint = homeData.deleteDistrictEndpoint;
  let body = homeData.deleteDistrictPayload;

  let CommonRequest = new commonMethods();
  const response = await CommonRequest.DeleteResponse(endPoint, headers, body);

  //  --Serverside Validations 
  expect(response.status()).toBe(_Response.getPositive);
  expect.soft(response.ok()).toBeTruthy();

  // response level Validations
  const res = await response.json();
  expect(res.code).toBe(200);
  expect(res.success).toBe(true)

});