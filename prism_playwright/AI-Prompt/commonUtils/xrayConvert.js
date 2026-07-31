const fs = require("fs");
const xml2js = require("xml2js");
const { logger } = require("./Logger");
require("dotenv").config();

// Read the original XML file
const xmlData = fs.readFileSync(`./${process.env.XRAY_REPORT_XML}`, "utf-8");
// Parse the XML using xml2js
xml2js.parseString(xmlData, (err, result) => {
  if (err) {
    logger.error(err);
    return;
  }
  const testSuites = result.testsuites;
  if (!testSuites) {
    logger.error('No "testsuites" element found in the XML.');
    return;
  }

  const newTestCases = [];
  testSuites.testsuite.forEach((suite) => {
    const originalTestCases = suite.testcase.slice();
    originalTestCases.forEach((testcase) => {
      if (testcase.properties && testcase.properties[0] && testcase.properties[0].property) {
        const properties = testcase.properties[0].property || [];
        properties.forEach((property) => {
          const evidence = property.$.name === "testrun_evidence";
          const evidenceItem = properties.find((property) => property.$.name === "testrun_evidence");
          const testKey = property.$.name == "test_key";
          const item = evidence ? evidenceItem["item"] : null;
          const failure = testcase.failure ? true : false;
          const skipped = testcase.skipped ? true : false;
          const systemOut = testcase["system-out"] ? true : false;

          // Remove original test case from the suite
          suite.testcase.splice(suite.testcase.indexOf(testcase), 1);

          if (testKey) {
            // Create a new test case based on test_key
            const newTestCase = {
              $: {
                name: testcase.$.name + " " + property.$.value,
                classname: testcase.$.classname,
                time: parseFloat(testcase.$.time).toFixed(3),
              },
              properties: {
                property: [property],
              },
            };

            if (evidence) {
              newTestCase.properties.property.push(evidenceItem);
            }

            if (item) {
              newTestCase.properties.property.push({ item });
            }

            if (failure) {
              newTestCase.failure = {
                $: {
                  message: `${testcase.failure[0].$.message}`,
                  type: `${testcase.failure[0].$.type}`,
                },
                _: `<![CDATA[${testcase.failure[0]._}]]>`,
              };
            }

            if (skipped) {
              newTestCase.skipped = skipped;
            }

            if (systemOut) {
              newTestCase["system-out"] = [`<![CDATA[${testcase["system-out"]}]]>`];
            }

            newTestCases.push(newTestCase);
          } else {
            logger.info("No Test Key Found for the test case." + testcase);
            newTestCases.push(testcase);
          }
        });
      } else {
        logger.info("No Property Found for the test case." + testcase);
        newTestCases.push(testcase);
      }
    });
  });
  newTestCases.forEach((newTestCase) => {
    const suite = testSuites.testsuite.find((suite) => suite.$.name === newTestCase.$.classname);
    if (suite) {
      suite.testcase.push(newTestCase);
    }
  });
  result.testsuites.$.tests = newTestCases.length;
  // Convert the modified data back to XML
  const builder = new xml2js.Builder({
    cdata: true,
    renderOpts: { pretty: true, indent: "  ", newline: "\n" },
  });
  const updatedXml = builder.buildObject(result);
  // Write the updated XML to a file
  fs.writeFileSync(`./${process.env.XRAY_REPORT_XML}`, updatedXml, "utf-8");
});