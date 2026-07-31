import fs from "fs";
import path from "path";
import { test }  from "@playwright/test";
import { parse } from "csv-parse/sync";
const pdfParse = require('pdf-parse');
import * as testCasesMeta from "../UI/resources/data/testCasesMeta.json";

/**
 * Read the csv file and return data in array
 * @param {string} dirName - directory name where csv file exists
 * @param {string} fileName - name of the csv file
 * @returns array
 */

async function readCSVFile(dirName, fileName) {
  // Declare Array to store the csv values.
  let csvFileData = [];

  // Store file data into const variable
  const records = await parse(fs.readFileSync(path.join(dirName, fileName)), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  // Add csv file data into array
  for (const record of records) {
    csvFileData.push(record);
  }

  return csvFileData;
}

/**
 * Function to read data from a JSON file.
 *
 * @param {string} filePath - The path to the JSON file.
 * @returns {object} - The parsed JSON data.
 * @throws {Error} - If the file is not found or cannot be parsed.
 */
async function readJsonFile(filePath) {
  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return await JSON.parse(jsonData);
  } catch (error) {
    throw new Error(`Error reading JSON file at ${filePath}: ${error.message}`);
  }
}

/**
 * Function to write data to a JSON file.
 *
 * @param {string} filePath - The path to the JSON file.
 * @param {object} data - The data to be written.
 * @throws {Error} - If the file can't be written.
 */
async function writeJsonFile(filePath, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
  } catch (error) {
    throw new Error(`Error writing JSON file at ${filePath}: ${error.message}`);
  }
}

/**
 * Function to generate random test data.
 *
 * @param {string} fieldType - The field type for which random data generated.
 * @param {number} min - The minimum value to generate random number only.
 * @param {number} max - The maximum value to generate random number only.
 * @throws {Error} - if the field type is unsupported.
 */
async function generateRandomData(fieldType, min = 0, max = 10) {
  try {
    switch (fieldType) {
      case "text":
        // Generate a random text with alphanumeric characters
        return Math.random().toString(36).substring(7);

      case "email":
        // Generate a random email address
        return `${Math.random().toString(36).substring(7)}@example.com`;

      case "number":
        // Generate a random number between min input value and max input value
        return Math.floor(Math.random() * (max - min)) + min;

      default:
        throw new Error("Unsupported field type");
    }
  } catch (error) {
    // Handle any exceptions and log an error message
    console.error(
      `Error while generating random data for field type - ${fieldType}: ${error.message}`
    );
  }
}

async function waitForNetworkToIdleState(page) {
  await this.page.waitForLoadState("networkidle");
  await this.page.waitForTimeout(1500);
}

/**
 * Custom function to generate the current date and time in a specified format using Moment.js.
 * @param {string} format - The desired format for the date and time.
 * @returns {string} - The current date and time in the specified format.
 */
async function getCurrentDateTime(format) {
  try {
    const formattedDateTime = moment().format(format);
    return formattedDateTime;
  } catch (error) {
    console.error(
      `Error while generating current date and time: ${error.message}`
    );
  }
}

/**
 * This fucntion get all the id from meta file and append in your test cases which then reflects in 
 * JIRA upon test cases execution, we need to add commands in our pipeline npm run post:xray:xml and 
 * npm run post:test:xray mentioned in package.json under script section
 * @param {string} keyword - Id's to read from testCasesMeta.json file based on keyword provided
 */
async function addTestAnnotationsByKeyword(keyword) {
  const testCaseIds = testCasesMeta[keyword];
  if (testCaseIds && Array.isArray(testCaseIds)) {
    testCaseIds.forEach(id => {
      test.info().annotations.push({ type: "test_key", description: id });
    });
  } else {
    console.error(`No test case IDs found for keyword: ${keyword}`);
  }
}

async function checkTextInPdf(pdfPath, searchText) {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfPath);
    // Parse the PDF
    const pdfData = await pdfParse(dataBuffer);
    // Extracted text from the PDF
    const pdfText = pdfData.text;
    // Log the extracted text (optional)
      console.log(pdfText);
    // Check if the search text exists in the extracted text
    if (pdfText.includes(searchText)) {
      console.log("Text found in PDF!");
      return true;
    } else {
      console.log("Text not found in PDF.");
      return false;
    }
  } catch (err) {
    console.error("Error reading PDF:", err);
    return false;
  }
}


module.exports = {
  readCSVFile,
  readJsonFile,
  writeJsonFile,
  generateRandomData,
  getCurrentDateTime,
  addTestAnnotationsByKeyword,
  checkTextInPdf
};
