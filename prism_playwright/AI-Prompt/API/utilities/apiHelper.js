const { page, request, expect } = require("@playwright/test");
import { _Response } from "../testdata/commonAPIResponse";
const getCurl = require("./requestToCurlLogger");

class commonMethods {
  constructor() { }

  // Use this method to fetch get response
  GetResponse = async (endPoint, headers) => {
    let context = await request.newContext({
      baseURL: process.env.URL,
    });
    const response = await context.get(`${endPoint}`, {
      headers: headers,
    });
    // This next line Logs the CURL request into api_request.log file.
    getCurl.logApiRequest("GET", endPoint, headers);
    return response;
  };

  // Use this method to fetch post response
  PostResponse = async (endPoint, payload, headers) => {
    let context = await request.newContext({
      baseURL: process.env.URL,
    });
    const response = await context.post(`/${endPoint}`, {
      headers: headers,
      data: payload,
    });

    // This next line Logs the CURL request into api_request.log file.
    getCurl.logApiRequest("POST", endPoint, headers, payload);
    return response;
  };

  // Use this method to fetch put response
  PutResponse = async (endPoint, headers, payload) => {
    let context = await request.newContext({
      baseURL: process.env.URL,
    });
    const response = await context.put(`/${endPoint}`, {
      headers: headers,
      data: payload,
    });

    // This next line Logs the CURL request into api_request.log file.
    getCurl.logApiRequest("PUT", endPoint, headers, payload);
    return response;
  };

  // Use this method to fetch patch response
  PatchResponse = async (endPoint, headers, payload) => {
    let context = await request.newContext({
      baseURL: process.env.URL,
    });
    const response = await context.patch(`/${endPoint}`, {
      headers: headers,
      data: payload,
    });
    // This next line Logs the CURL request into api_request.log file.
    getCurl.logApiRequest("PATCH", endPoint, headers, payload);
    return response;
  };

  // Use this method to fetch delete response
  DeleteResponse = async (endPoint, headers, payload) => {
    let context = await request.newContext({
      baseURL: process.env.URL,
    });
    const response = await context.delete(`/${endPoint}`, {
      headers: headers,
      data: payload,
    });

    // This next line Logs the CURL request into api_request.log file.
    getCurl.logApiRequest("DELETE", endPoint, headers, payload);
    return response;
  };
}

module.exports = { commonMethods };
