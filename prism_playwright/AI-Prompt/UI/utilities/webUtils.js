const { logger } = require("./logger");
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const PDF = require("sharp-pdf");
const path = require('path');

class webUtils {
  constructor(page) {
    this.page = page;
  }

  async getRandomNumber() {
    let randoNum = Math.random().toString(36).substring(2, 7);
    return randoNum;
  }

  /**Method for making the site wait for the network to idle till it loads.  */
  async waitForNetworkToIdleState() {
    await this.page.waitForLoadState("networkidle");
  }

    /**
   * Wait For Interception API response
   * @param {String} api - API Path for which interception wait response is required
   * @returns - Returns APi response
   */
    async waitForInterception(api) {
      const [response] = await Promise.all([this.page.waitForResponse(api)]);
      logger(`Waiting for Response of the Request`);
      return [response];
    }

  /**
   * Function to handle alerts and popups.
   *
   * @param {boolean} accept - Whether to accept (true) or dismiss (false) the alert/popup (optional).
   */
  async handleAlert(accept = true) {
    try {
      // Wait for the alert to appear
      const alert = await this.page.waitForAlert();
      if (accept) {
        await alert.accept();
      } else {
        await alert.dismiss();
      }
    } catch (error) {
      console.error("No alert found:", error.message);
    }
  }

  /**
   * Function to handle a prompt dialog
   *
   * @param {string} inputValue - The value to enter into the prompt (optional).
   */
  async handlePrompt(inputValue = "") {
    try {
      // Wait for the prompt to appear
      const prompt = await page.waitForEvent("dialog");

      // Enter the provided input value into the prompt
      await prompt.type(inputValue);
      await prompt.accept();

      return inputValue;
    } catch (error) {
      console.error("No prompt found:", error.message);
    }
  }

  /**
   * Function to wait for an element to be visible and interactable.
   * @param {Page} page - The Playwright page object.
   * @param {string} selector - The CSS selector of the element to wait for.
   * @param {number} timeout - The maximum time, in milliseconds, to wait for the element (default: 2000ms).
   */
  async waitForElement(selector, timeout = 2000) {
    try {
      // Use Playwright's waitForSelector to wait for the element
      await page.waitForSelector(selector, { timeout });

      // Once the element is found, return its element handle
      const elementHandle = await this.page.$(selector);
      return elementHandle;
    } catch (error) {
      // Handle any exceptions, such as a timeout or element not found
      throw new Error(
        `Element with selector "${selector}" not found within ${timeout}ms: ${error.message}`
      );
    }
  }

  // Custom function to take a screenshot
  async takeScreenshot(fileName) {
    try {
      // Take a screenshot of the page
      await this.page.screenshot({ path: fileName });

      console.log(`Screenshot saved as "${fileName}"`);
    } catch (error) {
      console.error(`Error taking screenshot: ${error}`);
    }
  }

  /**
 * Function to capture a screenshot of an element on a web page using various locator methods.
 * @param {string} locatorMethod - The method to locate the element.
 * @param {string} locatorValue - The value corresponding to the locator method.
 * @param {string} screenshotPath - The path where the screenshot should be saved.
 * @param {string} fileName - The name of the screenshot file with extension.
 */
  async takeElementScreenshot(identifierMethod, identifierValue, screenshotPath, fileName) {
    try {
      let elementHandle;

      switch (identifierMethod.toLowerCase()) {
        case "locator":
          elementHandle = await this.page.locator(identifierValue);
          break;

        case "text":
          elementHandle = await page.getByText(identifierValue);
          break;

        case "label":
          elementHandle = await page.getByLabel(identifierValue);
          break;

        case "placeholder":
          elementHandle = await page.getByPlaceholder(identifierValue);
          break;

        case "css":
          elementHandle = await page.$(identifierValue);
          break;

        default:
          throw new Error(`Unsupported locator method: ${identifierMethod}`);
      }

      if (!elementHandle) {
        throw new Error(
          `Element not found with ${locatorMethod} locator: ${identifierValue}`
        );
      }

      // Capture a screenshot of the element
      await elementHandle.screenshot({ path: `${screenshotPath}/${fileName}` });

      console.log(
        `Screenshot of element captured and saved at ${screenshotPath}/${fileName}`
      );
    } catch (error) {
      // Handle any exceptions that may occur during screenshot capture or element location
      console.error(`Error capturing element screenshot: ${error.message}`);
    }
  }

  /**function to extract images form pdf, pdfpath need to pe provided,
   * images would be extrated in path specificed in pathToExtract
   * one can change the path as to where to store images
   */
  async extractImageFromPdf(pdfPath,pathToExtractImages){
    const pathToExtract = pathToExtractImages; //folder in project where all the images from pdf would be extracted
    if (!fs.existsSync(pathToExtractImages)) {
      fs.mkdirSync(pathToExtractImages, { recursive: true });
      console.log("Created directory:", pathToExtractImages);
    }
    try {
      const images = await PDF.sharpsFromPdf(pdfPath);
      images.forEach(({ image, name, channels }) => {
        const ext = '.png'; //can be use other extensions conditionally
        const outputFilePath = path.join(pathToExtractImages, `${name}${ext}`);
         // Log the output path for debugging
        console.log(`Saving image to: ${outputFilePath}`);
        // Save the image
        image.toFile(outputFilePath)
        .then(() => {
          console.log(`Image ${name}${ext} saved successfully.`);
        })
        .catch((err) => {
          console.error(`Error saving image ${name}${ext}:`, err);
        });
      });
  
      // Progress events
      await PDF.sharpsFromPdf(pdfPath, {
        handler(event, data) {
          if (event === 'loading') {
            console.log('Loading PDF:', (data.loaded / data.total) * 100);
          } else if (event === 'loaded') {
            console.log('PDF loaded');
          } else if (event === 'image' || event === 'skip' || event === 'error') {
            console.log('Parsing images:', (data.pageIndex / data.pages) * 100);
          } else if (event === 'done') {
            console.log('Done');
          }
        },
      });
      return pathToExtract;
    } catch (error) {
      console.error('Error extracting images from PDF:', error);
    }
  }

  /**function to compare images, need to provide expected image path
   * and folder path where all the images are stored, mean square value
   * is calculated for image comparison
   */
  async compareImages(expectedImgPath, extractedImgFolderPath) {
    let flag = false;
    try {
    // Load and process the first image and resize the image to specific dimensions
    const img1 = await sharp(expectedImgPath).resize(500, 500).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { data: data1, info: info1 } = img1;
    
    // Read the directory and filter image files
    const files = fs.readdirSync(extractedImgFolderPath);
    
    const imageFiles = files.filter(file => /^img_p3_\d+\.png$/i.test(file)); //restrict search to images starting with img_p3 
    
    for (const file of imageFiles) {
    const filePath = path.join(extractedImgFolderPath, file);
    
   // Load and process the second and resize the image to specific dimensions
    const img2 = await sharp(filePath).resize(500, 500).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { data: data2, info: info2 } = img2;
    
    // Check if dimensions match
    if (info1.width !== info2.width || info1.height !== info2.height) {
    console.log(`Image dimensions do not match for file: ${file}`);
    continue;
    }
    
    // Calculate Mean Squared Error (MSE)
    let mse = 0;
    for (let i = 0; i < data1.length; i++) {
    mse += (data1[i] - data2[i]) ** 2;
    }
    mse /= data1.length;
    
    /**mean square value 550 is just an example, we can compare the two image and based 
     * on calculated we can use a value as condition. more similar the images(quality, 
     * images/data on image) mean square value would be closer to zero.
     */
    if (mse < 100) {
    flag = true;
    console.log(`Image ${file} matches with the given image.`);
    break;
    } else {
    console.log(`Image ${file} does not match.`);
    }
    }
    } catch (error) {
    console.error('Error comparing images:', error);
    }
    return flag;
    }
}


module.exports = { webUtils };
