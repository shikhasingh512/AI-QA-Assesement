const playwright = require('playwright');
const response = require("../commonUtils/mockResponses");

async function mockAPI(baseUrl, page,ErrorCode) {
  page.route(baseUrl, async route => {
    const request = route.request();
    const postData = response.mockResponses;
    console.log(postData[getErrorId(ErrorCode)]);
    await route.fulfill({
      status:postData[getErrorId(ErrorCode)].code,
      contentType: "application/json",
      body: JSON.stringify(postData[getErrorId(ErrorCode)]),
    });
  });
}

function getErrorId(ErrorCode) {
  switch (ErrorCode) {
    case 500:
      return 0;
    case 400:
      return 1;
    case 300:
      return 2;
    default:
      return 0;
  }
}
module.exports = { mockAPI };