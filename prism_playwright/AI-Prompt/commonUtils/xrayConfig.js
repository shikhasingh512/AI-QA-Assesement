    /**
 * Description
 * @param {any} 'axios'
 * @returns {any}
 */
    const axios = require("axios");
    const fs = require("fs");
    const path = require("path");
    const { config } = require("../config/config");
    const { logger } = require("./Logger");
    require("dotenv").config();
    let responseData;
    async function getAuthData() {
      try {
        const response = await axios.post(`${config.xrayUrl}/api/v2/authenticate`, {
          client_id: process.env.XRAY_CLIENT_ID,
          client_secret: process.env.XRAY_CLIENT_SECRET,
        });
        console.log('response', response );
        return (responseData = response.data);
      } catch (error) {
        logger.error("Error for Xray getAuthData:", error);
      }
    }
    getAuthData().then(async () => {
      const projectKey = process.env.XRAY_PROJECT_KEY;
      const testPlanKey = process.env.XRAY_PLAN_KEY
      const junit_xml_file = path.resolve(`${process.env.XRAY_REPORT_XML}`);
      const headers = {
        "Content-Type": "text/xml",
        Authorization: `Bearer ${responseData}`,
      };
      const data = fs.readFileSync(junit_xml_file);
    console.log(`SAMPLE:  ${config.xrayUrl}/api/v1/import/execution/junit?projectKey=${projectKey}&testPlanKey=${testPlanKey}`);
      try {
        const xrayResult = await axios.post(
          `${config.xrayUrl}/api/v1/import/execution/junit?projectKey=${projectKey}&testPlanKey=${testPlanKey}`,
          data,
          { headers }
        );
        logger.info("Xray Test Results has been updated successfully and Response Status is :" + xrayResult.status);
        logger.info("Xray Test Results - Id is :" + xrayResult.data.id);
        logger.info("Xray Test Results - Key is :" + xrayResult.data.key);
      } catch (error) {
        logger.error("Error for Xray Test Execution Result Creation:", error);
        console.log();
      }
    });