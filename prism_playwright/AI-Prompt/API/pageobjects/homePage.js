const loginToken = require("../../API/testdata/AccessToken");


// For creation of Home page data
// create JSON objects for headers and endpoints corresponding to respective page.



// Method 1
// export function get_home_page_rail_data() {
//   let endpointRail = 'homescreen-client/pub/api/v3/rail?id=11811';
//   return endpointRail;
// }

// export function home_page_rail_headers() {
//   let customHeaders = {
//     "accept": "application/json" ,
//    "platform": "BINGE_ANYWHERE_WEB"
//   };
//   return customHeaders;
// }

// method 2

const homePage = {};





// Delete District Endpoint and Headers
homePage.deleteDistrictHeader = {
  accept: "application/json",
  "x-access-token": "Bearer " + loginToken.data.token,
};

homePage.deleteDistrictEndpoint = "api/v1/district";
homePage.deleteDistrictPayload = {
  
  /**
   * @param {any} id1
   */
  set id(id1) {
    this._id = id1;
  },
  id: "",
};

// Create District Endpoint and Headers
homePage.createDistrictHeader = {
  accept: "application/json",
  "x-access-token": "Bearer " + loginToken.data.token,
};

homePage.createDistrictEndpoint = "api/v1/district";

homePage.createDistrictPayload= {
  "name": "Chikago",
  "active": true,
  "preferences": "",
  "state_id": 20,
  "image": "license-articleLarge_1700300565983.jpeg",
  "price_level": 1,
  "sap_id": "12345"
};
// // Get District List Endpoint and Headers
homePage.getDistrictListHeader = {
  accept: "application/json",
  "x-access-token": "Bearer " + loginToken.data.token,
};

homePage.getDistrictListEndpoint = "api/v1/district?pageSize=25&pageNumber=1";


module.exports = homePage;
