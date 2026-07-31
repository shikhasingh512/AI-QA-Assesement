const { test, expect } = require('@playwright/test');
const path = require('path');
const { POManager } = require("../../UI/pageobjects/POManager.js");
const utils = require('../../commonUtils/utils.js');

test.describe('Pdf verification @regression', () => {
    test('Verify images from PDF file', async ({page}) => {
    await utils.addTestAnnotationsByKeyword("pdf_verification");
    const pdfPath = path.resolve(__dirname, "../../UI/resources/pdf/samplepdf.pdf");
    const expectedImgPath = path.resolve(__dirname,"../../UI/resources/images/expectedImages.png");
    const extractedImagesFolder = path.resolve(__dirname,"../../extractedImg/");
    const poManager = new POManager(page);
    const projectUtils = poManager.getWebUtils();
    /**extractImageFromPdf or compareImages can be part of projectUtils or commonUtils */
    await projectUtils.extractImageFromPdf(pdfPath,extractedImagesFolder);
    let imageCompareFlag = await projectUtils.compareImages(expectedImgPath, extractedImagesFolder);
    expect(imageCompareFlag).toBeTruthy();
    });

    test('Text verification from PDF file', async ({page}) => {
        await utils.addTestAnnotationsByKeyword("pdf_verification");
        const pdfPath = path.resolve(__dirname, "../../UI/resources/pdf/samplepdf.pdf");
        const searchText = "Vivamus dapibus sodales ex, vitae malesuada ipsum cursus";
        let textCompareFlag = await utils.checkTextInPdf(pdfPath, searchText);
        expect(textCompareFlag).toBeTruthy();
    });
});